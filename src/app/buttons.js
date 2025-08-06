import { useLinkAccount, useConnectOrCreateWallet, useConnectWallet } from '@privy-io/react-auth';

export function LinkAccountButton() {
  const {linkWallet, linkPasskey} = useLinkAccount();

  return (
    <div>
      <button onClick={linkWallet}>Link External Wallet</button>
      <button onClick={linkPasskey}>Link Passkey</button>
    </div>
  );
}

export function ConnectWalletButton () {
  const { connectOrCreateWallet } = useConnectOrCreateWallet();
  
  // Use this to connect metamask for example to the current account
  // const {connectWallet} = usePrivy();

  // Prompt user to connect a wallet with Privy modal
  return <button className="bg-blue-500 text-white px-4 py-2 rounded-md m-10" onClick={connectOrCreateWallet}>Login</button>;
}

// Use this to connect metamask (phantom or any other wallet) for example to the current account.
// Once connected the metamask wallet will be linked to the logged user. Next time that user logs in
// it will appear in the list of wallets (i.e. useWallets or useSolanaWallets)
export function ConnectExternalWalletButton () {  
  const {connectWallet} = useConnectWallet({
    onSuccess: ({wallet}) => {
    },
    onError: (error) => {
      console.log("Error connecting wallet: ", error);
    },
  });

  // Prompt user to connect a wallet with Privy modal
  return <button className="bg-blue-500 text-white px-4 py-2 rounded-md m-10" onClick={connectWallet}>Connect wallet</button>;
}
