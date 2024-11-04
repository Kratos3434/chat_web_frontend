import { atom } from "jotai";
import { ProfileProps } from "./types";


export const userAtom = atom<ProfileProps | undefined>();

export const onlineUsersAtom = atom<Map<string, string>>(new Map<string, string>());