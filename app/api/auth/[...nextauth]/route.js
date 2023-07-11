import NextAuth, {NextAuthOptions, User} from "next-auth";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import prismadb from "@/utils/prismadb";


// const handler= NextAuth({
//
// })
// const handler=NextAuth(authOptions);
export const authOptions=NextAuth({
    adapter: PrismaAdapter(prismadb),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "text", placeholder: "mukulphoughat@gmail.com"},
                password: {label: "Password", type: "Password"},
                username: {label: "Username", type: "text", placeholder: "Mukul Phougat"}
            },
            async authorize(credentials){
                // const user:User = { name: "J Smith", email: "jsmith@example.com", id: "1"};
                // return user
                if ( !credentials.email || !credentials.password ) {
                    throw new Error('Please enter a valid email and password');
                }
                const user=await prismadb.user.findUnique({
                    where: {
                        email: credentials.email,
                    }
                });
                if ( !user || !user ) throw new Error("User not found")
                if ( user.password !== credentials.password ) {
                    throw new Error("Password doesn't match")
                }
                const authenticatedUser={id: user.id,name: user.name, email: user.email};
                return authenticatedUser;
            }
        }),
    ],
    secret: process.env.SECRET,
    session: {
        strategy: "jwt"
    },
    debug: process.env.NODE_ENV === "development",
});
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST};