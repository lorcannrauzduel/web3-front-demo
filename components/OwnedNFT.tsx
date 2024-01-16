import { useContract } from '@/hooks/useContract';
import { useState } from 'react';

export interface OwnedNFTProps {
	id: number;
	title: string;
	description: string;
	assetUrl: string;
}

export const OwnedNFT: React.FC<OwnedNFTProps> = ({
	id,
	title,
	description,
	assetUrl,
}) => {
	const [recipient, setRecipient] = useState('');
	const { transferIsPending, transferNFT } = useContract();

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
						onClick={() => document.getElementById(id).showModal()}>
						Transfer
						{transferIsPending && (
							<span className='loading loading-spinner loading-md'></span>
						)}
					</button>
					<dialog id={id.toString()} className='modal'>
						<div className='modal-box'>
							<h3 className='font-bold text-lg'>Transfer your NFT : {title}</h3>
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
