"use server";

import {
  OpenAiResponse,
  Question,
  open_ai_responses,
  questions,
} from "@/db/schema";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { db } from "../db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

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

export async function get_questions(id: string) {
  try {
    const getQuestions = await db
      .select()
      .from(open_ai_responses)
      .where(eq(open_ai_responses.id, id))
      .limit(1);
    return getQuestions[0];
  } catch (e: any) {
    console.log(e);
    throw e;
  }
}
