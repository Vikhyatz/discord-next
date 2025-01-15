import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import User from '@/app/models/User'
import connectDB from '@/app/db/connectDb'

const handler = NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
    ],
    callbacks: {
        // async redirect({ url, baseUrl }) {
        //     if (url === `${baseUrl}/api/auth/signin`) {
        //       return `${baseUrl}/friends`; // Default post-login redirection
        //     }
        //     return url.startsWith(baseUrl) ? url : baseUrl;
        //   },
        async signIn({user , account, profile, email, credentials}){
            console.log(`heyy this is the ${email}`)
            // if(account.provider == 'github'){
                try{
                    await connectDB();
                }catch{
                    console.log("database connection failed")
                }
                const currentUser = await User.findOne({email: profile.email});
                if(!currentUser){
                    const newUser = await User.create({
                        email: profile.email,
                        name: profile.email.split("@")[0],
                    })
                }
                return true
            // }
        },
        async session({ session, user, token }) {
            const dbUser = await User.findOne({email: session.user.email});
            session.user.name = dbUser.name;
            return session
          },
    }

})

export { handler as GET, handler as POST }