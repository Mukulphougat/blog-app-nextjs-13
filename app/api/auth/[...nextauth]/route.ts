import NextAuth, {AuthOptions, NextAuthOptions, User} from "next-auth";
import authOptions from "@/authoptions/AuthOptions";

const handler=NextAuth(authOptions);
export { handler as GET, handler as POST};