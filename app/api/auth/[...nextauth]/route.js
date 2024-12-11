import NextAuth from 'next-auth'
// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'
import GithubProvider from 'next-auth/providers/github'


const handler = NextAuth({
    providers: [
        GithubProvider({
            // clientId: process.env.GITHUB_ID,
            // clientSecret: process.env.GITHUB_SECRET,
            clientId: 'Ov23lib4hasb6fSETsX9',
            clientSecret: '808302495325a9db5bcdab867afbb3907e02cbef',
        }),
        GoogleProvider({
            clientId: '631324538908-3dk8i5q6797k1d19t6ot4acgl3ongbhd.apps.googleusercontent.com',
            clientSecret: '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'
        }),
    ],

})

// google client id - 631324538908-3dk8i5q6797k1d19t6ot4acgl3ongbhd.apps.googleusercontent.com
// google client secret - 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

export { handler as GET, handler as POST }