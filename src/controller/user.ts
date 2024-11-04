import { PROXY_USER_BASE_URL, USER_BASE_URL } from "@/env";
import { FriendProps, FriendRequestProps, ProfileProps } from "@/types";

export const getProfileByBearerToken = async (token?: string) => {
    const res = await fetch(`${USER_BASE_URL}/private/user/profile`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        cache: 'no-store'
    });

    const data = await res.json();

    return data.data;
}

export const signin = async (emailOrUsername: string, password: string) => {
    if (!emailOrUsername) throw "Email or username is required";
    if (!password) throw "Password is required";

    const res = await fetch(`${PROXY_USER_BASE_URL}/public/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            emailOrUsername,
            password
        })
    });
    
    const data = await res.json();

    if (data.status) {
        return data.data;
    } else {
        throw data.error;
    }
}

export const signup = async (user: {
    email: string,
    username: string,
    password: string,
    password2: string
}) => {
    if (!user.email) throw "Email is required";
    if (!user.username) throw "Username is required";
    if (!user.password) throw "Password is required";
    if (!user.password2) throw "Please confirm your password";
    if (user.password !== user.password2) throw "Passwords do not match"; 

    const res = await fetch(`${PROXY_USER_BASE_URL}/public/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: user.email,
            username: user.username,
            password: user.password,
            password2: user.password2
        })
    });

    const data = await res.json();

    if (data.status) {
        return true;
    } else {
        throw data.error;
    }
}

export const resendOtp = async (token?: string) => {
    const res = await fetch(`${PROXY_USER_BASE_URL}/auth/user/resend/otp`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await res.json();

    if (data.status) {
        return true;
    } else {
        throw data.error;
    }
}

export const verify = async (otp: string, token?: string) => {
    if (!otp) throw "Otp is required";
    if (otp.length !== 6) throw "Otp length must be 6";

    const res = await fetch(`${PROXY_USER_BASE_URL}/auth/user/verify/${otp}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await res.json();

    if (data.status) {
        return true;
    } else {
        throw data.error;
    }
}

export const sendFriendRequest = async (username: string, token?: string) => {
    if (!username) throw "Please enter a username!";

    const res = await fetch(`${PROXY_USER_BASE_URL}/private/user/add-friend/${username}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await res.json();

    if (data.status) {
        return true;
    } else {
        throw data.error;
    }
}

export const getAllFriends = async (token?: string): Promise<FriendProps[]> => {
    const res = await fetch(`${PROXY_USER_BASE_URL}/private/user/friends`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await res.json();

    return data.data;
}

export const getAllFriendRequests = async (token?: string): Promise<FriendRequestProps[]> => {
    const res = await fetch(`${PROXY_USER_BASE_URL}/private/user/friend-requests`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await res.json();

    return data.data;
}

export const acceptFriendRequest = async (senderId: number, token?: string) => {
    if (!senderId) throw "Sender id is missing";
    if (!token) throw "Token is missing";

    const res = await fetch(`${PROXY_USER_BASE_URL}/private/user/friend/accept/${senderId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await res.json();

    if (data.status) {
        return true;
    } else {
        throw data.error;
    }
}

export const getProfileByUsername = async (username: string): Promise<ProfileProps | null> => {
    if (!username) throw "Username is missing";
    
    const res = await fetch(`${USER_BASE_URL}/public/user/profile/username/${username}`);
    const data = await res.json();

    if (!data.status) {
        throw data.error;
    }

    return data.data;
}