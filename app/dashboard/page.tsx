'use client';
import { OwnedNFT } from '@/components/OwnedNFT';
import { alchemy } from '@/constantes/alchemy';
import { CONTRACT_ADDRESS } from '@/constantes/contract';
import { accountState } from '@/store/account';
import { BrowserProvider, formatEther, parseEther } from 'ethers';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

export default function DashboardPage() {
	const [account] = useRecoilState(accountState);
	const [balance, setBalance] = useState<any>(0);
	const [items, setItems] = useState<any>([]);

	useEffect(() => {
		const getBalance = async () => {
			const provider = new BrowserProvider(window.ethereum);
			const balance = await provider.getBalance(account);
			// console.log({ balance });
			const formattedBalance = Number(formatEther(balance)).toFixed(2);
			console.log({ formattedBalance });
			setBalance(formattedBalance);
		};

		const getNFTs = async () => {
			const response = await alchemy.nft.getNftsForOwner(account, {
				contractAddresses: [CONTRACT_ADDRESS],
			});
			setItems(response.ownedNfts);
		};

		if (account) {
			getBalance();
			getNFTs();
		}
	}, [account, balance]);

	return (
		<>
			<h1 className='text-6xl font-bold mb-5'>Dashboard</h1>
			<div className='stats shadow mb-10'>
				<div className='stat'>
					<div className='stat-figure text-secondary'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							className='inline-block w-8 h-8 stroke-current'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
						</svg>
					</div>
					<div className='stat-title'>Balance</div>
					<div className='stat-value'>{balance} ETH</div>
				</div>
			</div>
			{items.length > 0 ? (
				<div className='grid grid-cols-3 gap-4'>
					{items.map((item: any, index: number) => (
						<OwnedNFT
							key={index}
							id={item.tokenId}
							title={item.name}
							description={item.description}
                            assetUrl={item.image.originalUrl}
                            
						/>
					))}
				</div>
			) : (
				<div className='text text-center'>
					<p className='text-2xl'>You don't have any NFT yet</p>
				</div>
			)}
		</>
	);
}
