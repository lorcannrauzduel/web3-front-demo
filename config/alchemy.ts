import { Alchemy, Network } from 'alchemy-sdk';

const settings = {
	apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API key.
	network: Network.ETH_SEPOLIA, // Replace with your network.
};

export const alchemy = new Alchemy(settings);
