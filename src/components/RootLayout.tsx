'use client'
import { getSocket } from '@/socket/socket';
import { onlineUsersAtom, userAtom } from '@/store';
import { ProfileProps } from '@/types';
import { useHydrateAtoms } from 'jotai/utils';
import { useEffect } from 'react';
import SideNav from './SideNav';
import { useSetAtom } from 'jotai';

interface Props {
    children: React.ReactNode,
    profile: ProfileProps
}

const RootLayout = ({ children, profile }: Props) => {
    useHydrateAtoms([[userAtom, profile]]);
    const setOnlineUsers = useSetAtom(onlineUsersAtom);

    useEffect(() => {
        if (profile) {
            getSocket().connect();
            getSocket().emit('join', {
                email: profile.user.email
            });

            getSocket().on('onlineUsers', (data: string[]) => {
                const onlineUsers = new Map<string, string>();
                data.map(e => {
                    onlineUsers.set(e, e);
                });
                setOnlineUsers(onlineUsers);
            });

            return () => {
                getSocket().off('join');
            }
        }
    }, []);

    return (
        <main className='bg-indigo-500 ml-[88px]'>
            <SideNav />
            {children}
        </main>
    )
}

export default RootLayout;