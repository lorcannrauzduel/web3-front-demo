'use client';
import { accountState } from '@/store/account';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

declare global {
	interface Window {
		ethereum: any;
	}
}

export const Navbar = () => {
	const [account, setAccount] = useRecoilState(accountState);

	const connect = async () => {
		if (window.ethereum) {
			try {
				const accounts = await window.ethereum.request({
					method: 'eth_requestAccounts',
				});
				setAccount(accounts[0]);
			} catch (error) {
				console.error(error);
			}
		}
	};

	const formatAddress = (address: string) => {
		return `${address.slice(0, 6)}...${address.slice(-4)}`;
	};

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
