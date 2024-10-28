'use client'
import { getSocket } from '@/socket/socket';
import { userAtom } from '@/store';
import { ProfileProps } from '@/types';
import { useHydrateAtoms } from 'jotai/utils';
import { useEffect } from 'react';
import SideNav from './SideNav';

interface Props {
    children: React.ReactNode,
    profile: ProfileProps
}

const RootLayout = ({ children, profile }: Props) => {
    useHydrateAtoms([[userAtom, profile]]);

    useEffect(() => {
        if (profile) {
            getSocket().connect();
            getSocket().emit('join', {
                email: profile.user.email
            });

            return () => {
                getSocket().off('join');
            }
        }
    }, []);

    return (
        <main className='bg-indigo-500 h-[2000px]'>
            <SideNav />
            {children}
        </main>
    )
}

export default RootLayout;