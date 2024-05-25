import { appRouter } from '@/trpc'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import {NextRequest, NextResponse} from "next/server";

const handler = async (req: NextRequest, res: NextResponse) => {
    fetchRequestHandler({
        endpoint: '/api/trpc',
        req,
        router: appRouter,
        // @ts-expect-error context already passed from express middleware
        createContext: () => ({}),
        onError({ error }) {
            if (error.code === 'INTERNAL_SERVER_ERROR') {
                // send to bug reporting
                console.error('Something went wrong', error);
            }
        },
    })
}

export { handler as GET, handler as POST }