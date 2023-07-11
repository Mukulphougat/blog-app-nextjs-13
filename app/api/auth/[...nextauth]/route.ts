import NextAuth, {NextAuthOptions, User} from "next-auth";

import authOptions from "@/options/AuthOptions";

const handler=NextAuth(authOptions);
export { handler as GET, handler as POST};
