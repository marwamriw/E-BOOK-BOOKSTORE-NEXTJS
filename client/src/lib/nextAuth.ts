import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

export const optionAuth: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session:{
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. 'Sign in with...')
        name: 'Credentials',
          // The credentials is used to generate a suitable form on the sign in page.
          // You can specify whatever fields you are expecting to be submitted.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
            email: { },
            password: { }
        },
        async authorize(credentials, req) {
            // You need to provide your own logic here that takes the credentials
            // submitted and returns either a object representing a user or value
            // that is false/null if the credentials are invalid.
            // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
            // You can also use the `req` object to obtain additional parameters
            // (i.e., the request IP address)

            const res = await fetch("http://localhost:4000/api/login", {
                method: 'POST',
                body: JSON.stringify(credentials),
                headers: { "Content-Type": "application/json" }
            });
            const user = await res.json();
            // If no error and we have user data, return it
            if (user) {
                return user
            }
            // Return null if user data could not be retrieved
            throw new Error("error login");
        }
        })
    ],
    callbacks:{
        async jwt({ token, user, trigger, session }) {
            if(user) {
                token = {...token, ...user};
                    
            }
            if(trigger === "update" && session?.user.user.name && session?.user.user.email){
                token.name = session.user.name;
                token.email = session.user.email;
                token.password = session.user.password
            }
        
            // console.log("jwt callback:::", {session, token, user})
            return token;
        },
        async session({ session, token, user }) {
            if(token){
                session.user = {...token}
            }
            

            // console.log("szssioncallback:::", {session, token, user})
            return session;
        },
        
    },
    pages:{
        signIn: "/auth/login",
        signOut: "/"
    }
}