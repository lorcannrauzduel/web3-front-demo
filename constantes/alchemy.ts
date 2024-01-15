import { Alchemy, Network } from 'alchemy-sdk';

// Optional config object, but defaults to the API key 'demo' and Network 'eth-mainnet'.
const settings = {
	apiKey: 'h5DGz8h2hf2mI8WPeoE_zKFMUBBotnHN', // Replace with your Alchemy API key.
	network: Network.ETH_SEPOLIA, // Replace with your network.
};

export const alchemy = new Alchemy(settings);
