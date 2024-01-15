import { ABI } from '@/constantes/abi';
import { CONTRACT_ADDRESS } from '@/constantes/contract';
import { accountState } from '@/store/account';
import { Contract } from 'ethers';
import { BrowserProvider } from 'ethers';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRecoilState } from 'recoil';

export const OwnedNFT = ({ id, title, description, assetUrl }) => {
	const [loading, setLoading] = useState(false);
	const [account, setAccount] = useRecoilState(accountState);
	const [recipient, setRecipient] = useState('');

	const transferNFT = async (tokenId: number, recipient: string) => {
		const provider = new BrowserProvider(window.ethereum);
		const signer = await provider.getSigner();
		const contract = new Contract(CONTRACT_ADDRESS, ABI, signer);
		const tx = await contract.safeTransferFrom(account, recipient, id);
		setLoading(true);
		await tx.wait();
		setLoading(false);
		toast.success('You have successfully transferred this NFT');
	};

	return (
		<div className='card w-96 bg-base-100 shadow-xl'>
			<figure>
				<video autoPlay loop muted src={assetUrl} />
			</figure>
			<div className='card-body'>
				<h2 className='card-title'>
					{title}
					<div className='badge badge-accent'>UNIQUE</div>
				</h2>
				<p>{description}</p>
				<div className='card-actions justify-end'>
					{/* Open the modal using document.getElementById('ID').showModal() method */}
					<button
						className='btn btn-info'
						onClick={() => document.getElementById('my_modal_1').showModal()}>
						Transfer
					</button>
					<dialog id='my_modal_1' className='modal'>
						<div className='modal-box'>
							<h3 className='font-bold text-lg'>Transfer your NFT</h3>
							<p className='py-4'>
								Enter the public address of the recipient to transfer your NFT
							</p>
							<input
								type='text'
								placeholder='Recipient Public Address'
								className='input input-bordered w-full max-w-xs'
								onChange={(e) => setRecipient(e.target.value)}
							/>
							<div className='modal-action'>
								<form method='dialog'>
									{/* if there is a button in form, it will close the modal */}
									<button
										className='btn btn-info'
										onClick={() => transferNFT(id, recipient)}>
										Transfer
										{loading && (
											<span className='loading loading-spinner loading-md'></span>
										)}
									</button>
								</form>
							</div>
						</div>
					</dialog>
				</div>
			</div>
		</div>
	);
};
