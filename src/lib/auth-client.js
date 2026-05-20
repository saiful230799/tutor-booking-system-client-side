
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: "http://localhost:8000",
});

export const signUp = authClient.signUp;
export const signIn = authClient.signIn;
export const useSession = authClient.useSession;
export const signOut = authClient.signOut;