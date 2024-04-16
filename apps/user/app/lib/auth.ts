import db from "@repo/prisma/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        number: { label: "Phone number", type: "text", placeholder: "1231231231" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials : any) {
        console.log("cred",credentials.number,credentials.password)
        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        console.log("hashedPassword",hashedPassword)
        const existingUser = await db.user.findFirst({
          where: {
            number: credentials.number
          }
        });
          console.log("existingUser",existingUser)
        if (existingUser) {
          console.log(`User exists ${existingUser}`);
          const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
          console.log("passwordValidation",passwordValidation)
          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              number: existingUser.number,
            };
          }
          return null;
        }

        try {
          const user = await db.user.create({
            data: {
              // userId : Number(user.id),
              number: credentials.number,
              password: hashedPassword
            }
          });
          console.log(`User creating ${user}`);
          return {
            id: +user.id,
            number: user.number,
          };
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    })
  ],
  // session callbacks
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    async session({ token, session }) {
      session.user.id = token.sub;
      return session;
    }
  }
};

export default authOptions;
