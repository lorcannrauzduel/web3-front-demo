'use client';
import { useAccount } from '@/hooks/useAccount';
import { formatAddress } from '@/utils/format-address';
import Link from 'next/link';
import { useEffect } from 'react';

declare global {
	interface Window {
		ethereum: any;
	}
}

export const Navbar = () => {
	const { account, setAccount, connect } = useAccount();

	useEffect(() => {
		if (window.ethereum) {
			if (window.ethereum.selectedAddress) {
				setAccount(window.ethereum.selectedAddress);
			}

			window.ethereum.on('accountsChanged', (accounts: any) => {
				setAccount(accounts[0]);
			});
		}
	}, []);

	return (
		<div className='navbar bg-base-100'>
			<div className='flex-1'>
				<Link className='btn btn-ghost text-xl' href='/'>
					PokerPass
				</Link>
			</div>
			<div className='flex-none'>
				<Link
					className='btn btn-ghost'
					onClick={connect}
					href={account ? '/dashboard' : '#'}>
					{account ? formatAddress(account) : 'Connect Wallet'}
				</Link>
			</div>
		</div>
	);
};
