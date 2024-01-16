import { Card } from '@/components/Card';
import { assets } from '@/mock/assets';

export default function Home() {
	return (
		<>
			<h1 className='text-6xl font-bold'>Become a legend with PokerPass</h1>
			<div className='grid grid-cols-3 gap-8'>
				{assets.map((asset, index) => (
					<Card
						key={index}
						id={asset.id}
						title={asset.title}
						description={asset.description}
						assetUrl={asset.assetUrl}
						price={asset.price}
					/>
				))}
			</div>
		</>
	);
}
