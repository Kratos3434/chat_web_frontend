import Chat from "@/components/Chat";
import { getProfileByUsername } from "@/controller/user";
import { notFound } from "next/navigation";

const ChatPage = async ({ params }: { params: any }) => {
    const { username } = await params;

    const profile = await getProfileByUsername(username);

    if (!profile) {
        notFound();
    }

    return <Chat username={username} profile={profile} />;
}

export default ChatPage;