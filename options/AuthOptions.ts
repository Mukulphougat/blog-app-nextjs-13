import {PrismaClient} from "@prisma/client";
import {NextAuthOptions, User} from "next-auth";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import client from "@/utils/prismadb";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const prismaClient=new PrismaClient()
export const authOptions:NextAuthOptions={
    adapter: PrismaAdapter(client),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID! as string,
            clientSecret: process.env.GITHUB_SECRET! as string,
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
                const user=await prismaClient.user.findUnique({
                    where: {
                        email: credentials.email,
                    }
                });
                if ( !user || !user ) throw new Error("User not found")
                if ( user.password !== credentials.password ) {
                    throw new Error("Password doesn't match")
                }
                const authenticatedUser:User={id: <unknown>user.id as string,name: user.name, email: user.email};
                return authenticatedUser;
            }
        }),
    ],
    secret: process.env.SECRET,
    session: {
        strategy: "jwt"
    },
    callbacks: {
        session({ session, token, user }) {
            return session // The return type will match the one returned in `useSession()`
        },
    },
    debug: process.env.NODE_ENV === "development",
}
