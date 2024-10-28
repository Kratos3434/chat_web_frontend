import Navbar from "@/components/Navbar";

interface Props {
    children: React.ReactNode
}

const LandingPageLayout = ({children}: Props) => {
    return (
        <div className='mt-[70px] px-[8px] bg-indigo-500'>
            <Navbar />
            {children}
        </div>
    );
}

export default LandingPageLayout;