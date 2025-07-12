import NextAuth, { SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import CustomerServices from "@/app/_services/CustomerServices";
import { authOptions } from "./auth.config"

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };