import VerifyOtp from "@/components/VerifyOtp";
import { verifyBearerToken } from "@/controller/auth";
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

const VerifyPage = async () => {
    const verifyToken = (await cookies()).get('verifyToken')?.value;

    const verifyResult = await verifyBearerToken(verifyToken);

    if (!verifyResult) {
        redirect('/signin');
    }

    return <VerifyOtp email={verifyResult} token={verifyToken} />;
}

export default VerifyPage;