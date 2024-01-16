'use client';
import { OwnedNFT } from '@/components/OwnedNFT';
import { useAccount } from '@/hooks/useAccount';

export default function DashboardPage() {
	const { balance, nfts } = useAccount();

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
			{nfts.length > 0 ? (
				<div className='grid grid-cols-3 gap-4'>
					{nfts.map((item: any, index: number) => (
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
					<p className='text-2xl'>You don&apos;t own any NFTs yet</p>
				</div>
			)}
		</>
	);
}
