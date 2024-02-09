"use server";

import { db } from "@/db";
import { OpenAiResponse, User, users } from "@/db/schema";
import { encode, decode } from "jwt-simple";
import { cookies } from "next/headers";
import crypto from "crypto";
import { eq, and } from "drizzle-orm";
import { Question, open_ai_responses, questions } from "@/db/schema";
import OpenAI from "openai";

export async function signup(data: {
  email: string;
  password: string;
  name: string;
}) {
  try {
    const cookieStore = cookies();
    data.password = crypto
      .createHash("sha256")
      .update(data.password)
      .digest("hex");

    const user = await db
      .insert(users)
      .values(data)
      .returning({ name: users.name, email: users.email, id: users.id })
      .then((res) => res[0]);

    const fifteenMinutesInMs = 15 * 60 * 1000;

    const token = encode(
      {
        ...user,
        issued: Date.now(),
        expires: Date.now() + fifteenMinutesInMs,
      },
      process.env.SALT_KEY!,
      "HS512"
    );

    cookieStore.set({
      name: "token",
      httpOnly: true,
      path: "/",
      value: token,
    });

    return token;
  } catch (e: any) {
    console.log(e);
    throw e;
  }
}

export async function login(data: { email: string; password: string }) {
  try {
    const cookieStore = cookies();
    const fifteenMinutesInMs = 15 * 60 * 1000;

    data.password = crypto
      .createHash("sha256")
      .update(data.password)
      .digest("hex");

    const result = await db
      .select()
      .from(users)
      .where(
        and(eq(users.password, data.password), eq(users.email, data.email))
      )
      .limit(1);

    if (result.length == 0) {
      console.log("Incorrect Username and password");
      throw "Incorrect Username and password";
    }

    const user = result[0];

    const token = encode(
      {
        ...user,
        issued: Date.now(),
        expires: Date.now() + fifteenMinutesInMs,
      },
      process.env.SALT_KEY!,
      "HS512"
    );

    cookieStore.set({
      name: "token",
      path: "/",
      value: token,
    });

    return token;
  } catch (e: any) {
    console.log(e);
    throw e;
  }
}

export async function getUser() {
  try {
    const cookieStore = cookies();
    const tokenString = cookieStore.get("token")?.value;
    if (!tokenString) {
      return undefined;
    }
    const result: User = decode(
      tokenString,
      process.env.SALT_KEY!,
      false,
      "HS512"
    );
    return result;
  } catch (e: any) {
    console.log(e);
    throw e;
  }
}

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

export async function add_questions(data: Question) {
  try {
    const getQuestions = await db
      .insert(questions)
      .values(data)
      .returning()
      .then((res) => res[0]);
    const gbtcontentdata = `
"Prepare and submit your fitness event information using the provided JSON structure. Each event should include a numeric ID, a title reflecting the event's name incorporating a specific example of a physical exercise, and a start date in the given format. Ensure the output is in JSON format, adhering strictly to the specified structure without additional commentary."
Here's the structure example incorporating your requirements, including example names in the titles:
[
  {
    "id": 1,
    "title": "Morning Yoga Retreat",
    "start": "2024-02-09"
  },
  {
    "id": 2,
    "title": "Afternoon Strength Training Workshop",
    "start": "2024-02-09T12:00:00"
  }
]
IMPORTANT:
    1. Dates should be in the format "YYYY-MM-DD" or "YYYY-MM-DDTHH:MM:SS".
    2. Date Should be current date or future date and Year Should be 2024 and Month Should be February.
    3. generate at least 3 events and Spread the events over the current week.
`;
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: gbtcontentdata }],
    });
    console.log(completion.choices[0].message);

    if (completion.choices[0].message) {
      const insertData = {
        question_id: getQuestions.id,
        response: JSON.parse(completion.choices[0].message.content as string),
      };

      console.log(insertData);
      const addResponse = await db
        .insert(open_ai_responses)
        .values(insertData)
        .returning()
        .then((res) => res[0]);
      console.log(addResponse);
      console.log(addResponse.response);
      return addResponse;
    } else {
      throw "No response from GPT-3";
    }
  } catch (e: any) {
    console.log(e);
    throw e;
  }
}

export async function get_events(id: string) {
  try {
    const res: OpenAiResponse[] = await db
      .select()
      .from(open_ai_responses)
      .where(eq(open_ai_responses.id, id))
      .limit(1);

    if (res.length == 0) {
      throw "No response found";
    }

    return res[0].response;
  } catch (e: any) {
    console.log(e);
    throw e;
  }
}
