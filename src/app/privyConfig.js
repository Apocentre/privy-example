import {base, berachain, mainnet, sepolia, berachainBepolia, baseSepolia} from 'wagmi/chains';
import {toSolanaWalletConnectors} from '@privy-io/react-auth/solana';

export const privyConfig = {
  loginMethods: ['passkey', "email"],
  supportedChains: [base, berachain, mainnet, sepolia, berachainBepolia, baseSepolia],
  appearance: {
    showWalletLoginFirst: true,
    walletChainType: 'ethereum-and-solana',
  },
  solanaClusters: [
    {name: 'mainnet-beta', rpcUrl: 'https://api.mainnet-beta.solana.com'},
    {name: 'devnet', rpcUrl: 'https://api.devnet.solana.com'}
  ],
  embeddedWallets: {
    ethereum:  {createOnLogin: 'users-without-wallets'},
    solana:  {createOnLogin: 'users-without-wallets'}
  },
  externalWallets: {
    solana: {
      connectors: toSolanaWalletConnectors() // For detecting EOA browser wallets
    }
  },
};
