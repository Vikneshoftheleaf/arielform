
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

/*
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
        clientId: process.env.NEXTAUTH_GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET as string,
      }),
    // ...add more providers here
  ],
}
export default NextAuth(authOptions)
*/

const handler = NextAuth({
  providers: [
      GoogleProvider({
          clientId: process.env.NEXTAUTH_GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET as string,
        })
  ],
  pages:
  {
    signIn: '/signup',

  }
})




//export { GET, POST } from "../../../authConfig";

export { handler as GET, handler as POST }