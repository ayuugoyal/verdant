'use server';

import { db } from "@/db";
import { User, users } from "@/db/schema";
import { encode, decode } from 'jwt-simple'
import { cookies } from "next/headers";
import crypto from "crypto";
import { eq, and } from "drizzle-orm";

export async function signup(data: { email: string, password: string, name: string }) {
    try {
        const cookieStore = cookies();
        data.password = crypto
            .createHash("sha256")
            .update(data.password)
            .digest("hex");

        const user = await db.insert(users)
            .values(data)
            .returning({ name: users.name, email: users.email, id: users.id})
            .then((res) => res[0]);

        const fifteenMinutesInMs = 15 * 60 * 1000;

        const token = encode({
            ...user,
            issued: Date.now(),
            expires: Date.now() + fifteenMinutesInMs,
        }, process.env.SALT_KEY!, "HS512")

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

export async function login(data: { email: string, password: string }) {
    try {
        const cookieStore = cookies();
        const fifteenMinutesInMs = 15 * 60 * 1000;

        data.password = crypto
            .createHash("sha256")
            .update(data.password)
            .digest("hex");

        const result = await db
            .select().
            from(users)
            .where(
                and(
                    eq(users.password, data.password),
                    eq(users.email, data.email))
            ).limit(1);

        if (result.length == 0) {
            console.log('Incorrect Username and password');
            throw "Incorrect Username and password";
        }

        const user = result[0];

        const token = encode({
            ...user,
            issued: Date.now(),
            expires: Date.now() + fifteenMinutesInMs,
        }, process.env.SALT_KEY!, "HS512")

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
        const tokenString = cookieStore.get('token')?.value;
        if (!tokenString) {
            return undefined;
        }
        const result: User = decode(tokenString, process.env.SALT_KEY!, false, "HS512");
        return result;
    } catch (e: any) {
        console.log(e);
        throw e;
    }
}