'use client'
import Friends from "./Friends";

interface Props {
    token?: string
}

const Home = ({token}: Props) => {
    return (
        <div>
            {/* <Friends token={token} /> */}
        </div>
    );
}

export default Home;