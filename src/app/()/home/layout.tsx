import RootLayout from "@/components/RootLayout";
import { getProfileByBearerToken } from "@/controller/user";
import { cookies } from "next/headers";

interface Props {
    children: React.ReactNode
}

const HomeLayout = async ({children}: Props) => {
    const token = (await cookies()).get('token')?.value;

    const profile = await getProfileByBearerToken(token);

    return (
        <RootLayout profile={profile}>
            {children}
        </RootLayout>
    )
}

export default HomeLayout;