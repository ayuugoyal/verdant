"use server";

import { db } from "@/db";
import { User, users } from "@/db/schema";
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

    const gbtcontentdata = `1. What's your hustle - profession?
2. What's your moment to be break free? (Specify the time of day)
3. Days of the week you're available for exercise? (e.g., Mon, Tue, etc.)
4. How active are you? (sedentary, low, moderate, high)

User: ${getQuestions.question1}
User: ${getQuestions.question2}
User: ["monday", "tuesday", "wednesday"]
User: ${getQuestions.question4}

Please generate the events on today and tomorrow according to the user's input. and return the INITIAL_EVENTS array.

type of the INITIAL_EVENTS is [
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: new Date().toISOString().replace(/T.*$/, '') + 'T12:00:00'
  }
]

createEventId() function returns the string of the event id. It should be unique.

todayStr is the current date in the format of YYYY-MM-DD and should be today's date or tommorrow's ONLY.

The title of the event should be according to the user's input.

i have given an expample of the INITIAL_EVENTS array. You can return the array according to the user's input.

id always should be unique. You can use the createEventId() function to generate the id.

give me ONLY the INITIAL_EVENTS array of the events in JSON format.


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
      throw new Error("No response from GPT-3");
    }
  } catch (e: any) {
    console.log(e);
    throw e;
  }
}
