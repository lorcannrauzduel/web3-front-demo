import { alchemy } from '@/config/alchemy';
import { CONTRACT_ADDRESS } from '@/config/contract';
import { accountState } from '@/store/account';
import { nftsState } from '@/store/nfts';
import { BrowserProvider, formatEther } from 'ethers';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

export const useAccount = () => {
	const [balance, setBalance] = useState<any>(0);
	const [account, setAccount] = useRecoilState(accountState);
	const [nfts, setNfts] = useRecoilState(nftsState);

	useEffect(() => {
		const getBalance = async () => {
			const provider = new BrowserProvider(window.ethereum);
			const balance = await provider.getBalance(account);
			const formattedBalance = Number(formatEther(balance)).toFixed(2);
			setBalance(formattedBalance);
		};
		if (account) {
			getNfts();
			getBalance();
		}
	}, [account, balance]);

	const getNfts = async () => {
		const response = await alchemy.nft.getNftsForOwner(account, {
			contractAddresses: [CONTRACT_ADDRESS],
		});
		setNfts(response.ownedNfts as never[]);
	};

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

	return { nfts, account, setAccount, balance, connect, getNfts };
};
