
// import { createAuthClient } from "better-auth/react";

// export const authClient = createAuthClient({
//     baseURL: "http://localhost:3000",
// });

// export const signUp = authClient.signUp;
// export const signIn = authClient.signIn;
// export const useSession = authClient.useSession;
// export const signOut = authClient.signOut;



import { jwtClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [
    jwtClient()
  ]
});
export const {useSession, signIn, signUp} = authClient