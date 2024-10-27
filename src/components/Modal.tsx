'use client'

interface Props {
    children: React.ReactNode
}

const Modal = ({children}: Props) => {
    return (
        <div className="fixed top-0 left-0 w-full h-[100dvh] bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
            {children}
        </div>
    );
}

export default Modal;