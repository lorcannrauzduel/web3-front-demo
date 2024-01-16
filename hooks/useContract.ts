import { ABI } from '@/config/abi';
import { CONTRACT_ADDRESS } from '@/config/contract';
import { Contract } from 'ethers';
import { BrowserProvider, parseEther } from 'ethers';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAccount } from './useAccount';

export const useContract = () => {
	const [transferIsPending, setTransferIsPending] = useState(false);
	const [mintIsPending, setMintIsPending] = useState(false);
	const [isSold, setIsSold] = useState(false);
	const { account, getNfts } = useAccount();

	const transferNFT = async (id: number, recipient: string) => {
		try {
			const provider = new BrowserProvider(window.ethereum);
			const signer = await provider.getSigner();
			const contract = new Contract(CONTRACT_ADDRESS, ABI, signer);
			const tx = await contract.safeTransferFrom(account, recipient, id);
			setTransferIsPending(true);
			await tx.wait();
			toast.success('You have successfully transferred this NFT');
			getNfts();
		} catch (error) {
			console.error({ error });
			toast.error('Please try again later');
		} finally {
			setTransferIsPending(false);
		}
	};

	const mint = async (id: number, price: string) => {
		try {
			const provider = new BrowserProvider(window.ethereum);
			const signer = await provider.getSigner();
			const contract = new Contract(CONTRACT_ADDRESS, ABI, signer);
			const priceInWei = parseEther(price).toString();

			const tx = await contract.mint(id, {
				value: priceInWei,
			});
			setMintIsPending(true);

			await tx.wait();
			toast.success('You have successfully purchased this NFT');
			setIsSold(true);
		} catch (error) {
			console.error({ error });
			toast.error('Please try again later');
		} finally {
			setMintIsPending(false);
		}
	};

	const checkIfNftSold = async (tokenId: number) => {
		try {
			const provider = new BrowserProvider(window.ethereum);
			const contract = new Contract(CONTRACT_ADDRESS, ABI, provider);
			const owner = await contract.ownerOf(tokenId);
			const isSold = owner !== CONTRACT_ADDRESS;
			return isSold;
		} catch (error) {
			return false;
		}
	};

	return {
		transferNFT,
		mint,
		checkIfNftSold,
		isSold,
		transferIsPending,
		mintIsPending,
	};
};
