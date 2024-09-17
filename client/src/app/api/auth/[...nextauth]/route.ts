import { optionAuth } from "@/lib/nextAuth"
import NextAuth from "next-auth"

const handler = NextAuth(optionAuth)

export { handler as GET, handler as POST }