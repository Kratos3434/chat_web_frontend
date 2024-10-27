'use client'
import { getSocket } from '@/socket/socket';
import { userAtom } from '@/store';
import { ProfileProps } from '@/types';
import { useHydrateAtoms } from 'jotai/utils';
import { useEffect } from 'react';
import Navbar from './Navbar';

interface Props {
    children: React.ReactNode,
    profile: ProfileProps
}

const RootLayout = ({ children, profile }: Props) => {
    useHydrateAtoms([[userAtom, profile]]);

    useEffect(() => {
        if (profile) {
            const socket = getSocket();

            return () => {
                socket.disconnect();
            }
        }
    }, []);

    return (
        <main className='mt-[70px] px-[8px] bg-indigo-500'>
            <Navbar />
            {children}
        </main>
    )
}

export default RootLayout;