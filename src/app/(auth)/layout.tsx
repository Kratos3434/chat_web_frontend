import { verifyBearerToken } from "@/controller/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface Props {
    children: React.ReactNode
}

const AuthLayoutPage = async ({children}: Props) => {
    //Check if user is logged in
    const token = (await cookies()).get('token')?.value;

    if (token) {
        const res = await verifyBearerToken(token);
        if (res) {
            redirect("/home");
        }
    }

    return (
        <main>
            {children}
        </main>
    );
}

export default AuthLayoutPage;