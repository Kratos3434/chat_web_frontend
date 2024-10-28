'use client'
import { getSocket } from '@/socket/socket';
import { userAtom } from '@/store';
import { ProfileProps } from '@/types';
import { useHydrateAtoms } from 'jotai/utils';
import { useEffect } from 'react';

interface Props {
    children: React.ReactNode,
    profile: ProfileProps
}

const RootLayout = ({ children, profile }: Props) => {
    useHydrateAtoms([[userAtom, profile]]);

    useEffect(() => {
        if (profile) {
            getSocket().connect();
        }
    }, []);

    return (
        <main>
            {/* <Navbar /> */}
            {children}
        </main>
    )
}

export default RootLayout;