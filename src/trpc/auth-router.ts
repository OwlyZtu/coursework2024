import {router, publicProcedure} from "../trpc/trpc";
import {AuthCredentialsValidator} from "../lib/validators/account-credentials-validator";
import {getPayloadClient} from "../get-payload";
import {TRPCError} from "@trpc/server";


export const authRouter = router({
    createPayloadUser: publicProcedure
        .input(AuthCredentialsValidator)
        .mutation(async ({input}) => {
            const {email, password} = input
            const payload = await getPayloadClient()
            console.log("input", input)
            // check if user already exists
            const {docs: users} = await payload.find({
                collection: 'users',
                where: {
                    email: {
                        equals: email,
                    },
                },
            })
            console.log("smth", users)
            if (users.length !== 0) {
                throw new TRPCError({code: 'CONFLICT', message:"User already exists"})
            }

            await payload.create({
                collection: 'users',
                data: {
                    email,
                    password,
                    role: 'user',
                },
            })

            return {success: true, sentToEmail: email}
        })
})