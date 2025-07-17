import NextAuth, { SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import CustomerServices from "@/app/_services/CustomerServices";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const userInfo = await CustomerServices.loginCustomer(credentials);
            return userInfo;

        } catch (error) {
          let message = "Login failed! Please try again.";
          if (error && typeof error === "object" && "response" in error) {
            const err = error as { response?: { data?: { message?: string } } };
            message = err.response?.data?.message || message;
          }
          throw new Error(message); 
        }
      }
    })
  ],
  
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  
  callbacks: {
    async jwt({ token, user, trigger, session }: { 
      token: any; 
      user?: any; 
      trigger?: "signIn" | "signUp" | "update"; 
      session?: any; 
    }) {
      // Initial sign in
      if (user) {
        token.id = user._id;
        token.name = user.name;
        token.lastName = user.lastName;
        token.email = user.email;
        token.streetAddress = user.streetAddress;
        token.cityAddress = user.cityAddress;
        token.phone = user.phone;
        token.image = user.image;
        token.token = user.token;
      }

      // Handle session updates
      if (trigger === "update" && session) {
        // Update the token with new data
        token = { ...token, ...session.user };
      }

      return token;
    },
    async session({ session, token }: { session: any, token: any }) {
      session.user = {
        id: token.id,
        name: token.name,
        lastName: token.lastName,
        email: token.email,
        cityAddress: token.cityAddress,
        streetAddress: token.streetAddress,
        phone: token.phone,
        image: token.image,
        token: token.token
      };
      return session;
    },
  },
  
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  secret: process.env.NEXTAUTH_SECRET,
}
