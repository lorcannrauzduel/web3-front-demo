'use client';
import { ABI } from '@/constantes/abi';
import { CONTRACT_ADDRESS } from '@/constantes/contract';
import { Contract, parseEther } from 'ethers';
import { BrowserProvider } from 'ethers';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export const Card = ({ id, title, description, assetUrl, price }) => {
	const [isSold, setIsSold] = useState(false);
	const [loading, setLoading] = useState(false);

	const checkIfSold = async (tokenId: number) => {
		try {
			const provider = new BrowserProvider(window.ethereum);
			const contract = new Contract(CONTRACT_ADDRESS, ABI, provider);
			const owner = await contract.ownerOf(tokenId);
			const isSold = owner !== CONTRACT_ADDRESS;
			setIsSold(isSold);
        } catch (error) {
            setIsSold(false);
        }
	};

	const handleBuy = async () => {
		try {
			const provider = new BrowserProvider(window.ethereum);
			const signer = await provider.getSigner();
			const contract = new Contract(CONTRACT_ADDRESS, ABI, signer);
			const priceInWei = parseEther(price).toString();

			const tx = await contract.mint(id, {
				value: priceInWei,
			});
			setLoading(true);

			await tx.wait();
			toast.success('You have successfully purchased this NFT');
			setIsSold(true);
		} catch (error) {
			console.log({ error });
			toast.error('Please try again later');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		checkIfSold(id);
	}, [id]);

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
						onClick={handleBuy}>
						{isSold ? 'Sold' : 'Buy now'}
						{loading && (
							<span className='loading loading-spinner loading-md'></span>
						)}
					</button>
				</div>
			</div>
		</div>
	);
};
