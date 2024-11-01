import { USER_BASE_URL } from "@/env"

export const verifyBearerToken = async (token?: string) => {
    const res = await fetch(`${USER_BASE_URL}/auth/authenticate`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await res.json();

    if (data.status) {
        if (data.data.email) {
            return data.data.email;
        }
        return true;
    }

    return false;
}