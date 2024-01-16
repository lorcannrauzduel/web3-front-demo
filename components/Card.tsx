'use client';
import { useContract } from '@/hooks/useContract';
import { useEffect, useState } from 'react';

export interface CardProps {
	id: number;
	title: string;
	description: string;
	assetUrl: string;
	price: string;
}

export const Card: React.FC<CardProps> = ({
	id,
	title,
	description,
	assetUrl,
	price,
}) => {
	const { mint, mintIsPending, checkIfNftSold } = useContract();
	const [isSold, setIsSold] = useState(false);

	useEffect(() => {
		const checkIfSold = async () => {
			const isSold = await checkIfNftSold(id);
			setIsSold(isSold);
		};
		checkIfSold();
	}, []);

	return (
		<div className='card w-96 bg-base-100 shadow-xl'>
			<figure>
				<video autoPlay loop muted src={assetUrl} />
			</figure>
			<div className='card-body'>
				<h2 className='card-title'>
					{title}
					<div className='badge badge-accent'>{price} ETH + gas fees</div>
				</h2>
				<p>{description}</p>
				<div className='card-actions justify-end'>
					<button
						className='btn btn-primary'
						disabled={isSold}
						onClick={() => mint(id, price)}>
						{isSold ? 'Sold' : 'Buy now'}
						{mintIsPending && (
							<span className='loading loading-spinner loading-md'></span>
						)}
					</button>
				</div>
			</div>
		</div>
	);
};
