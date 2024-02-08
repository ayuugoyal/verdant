"use server"
import { cookies } from 'next/headers'

const getToken = (): string | undefined => {
    return cookies().get('token')?.value;
}

const removeToken = (): void => {
    cookies().delete('token');
}

export const isAuthenticated = (): boolean  => {
    const token = cookies().get('token')?.value;
    if (!token) {
        return false;
    }
    return true;
}
