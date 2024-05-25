
import { User } from '../payload-types';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { NextRequest } from 'next/server';


export const getServerSideUser = async (
    cookies: NextRequest['cookies'] | ReadonlyRequestCookies
) => {
    const token = cookies.get('payload-token')?.value;

    if (!token) {
        return { user: null };
    }

    try {
        const meRes = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`,
            {
                headers: {
                    Authorization: `JWT ${token}`,
                },
            }
        );

        // Check if response is ok
        if (!meRes.ok) {
            const errorText = await meRes.text(); // Capture error response text
            console.error('Failed to fetch user:', meRes.status, meRes.statusText, errorText);
            return { user: null };
        }

        // Parse response
        const responseJson = await meRes.json();

        const { user } = responseJson as { user: User };


        return { user };
    } catch (error) {
        console.error('Error fetching user:', error);
        return { user: null };
    }
};
