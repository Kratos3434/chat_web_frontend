import AddFriend from "@/components/AddFriend";
import { cookies } from "next/headers";

const AddFriendPage = async () => {
    const token = (await cookies()).get('token')?.value;

    return <AddFriend token={token} />;
}

export default AddFriendPage;