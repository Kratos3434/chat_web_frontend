import Home from "@/components/Home";
import { cookies } from "next/headers";

const HomePage = async () => {
    const token = (await cookies()).get('token')?.value;

    return <Home token={token} />;
}

export default HomePage;