import { useLinkAccount, useConnectOrCreateWallet, useConnectWallet, useLogin, usePrivy } from '@privy-io/react-auth';

// Use this to login/signup a user via auth methods we support trough Privy e.g. email, socials.
// This will create new embedded wallets for Solana and EVM
export function LoginButton () {
  const { connectOrCreateWallet } = useConnectOrCreateWallet();
  
  // Use this to connect metamask for example to the current account
  // const {connectWallet} = usePrivy();

  // Prompt user to connect a wallet with Privy modal
  return <button className="bg-blue-500 text-white px-4 py-2 rounded-md m-10" onClick={connectOrCreateWallet}>Login</button>;
}

// Use this to login/signup to Privy using an existing external wallet e.g. Metamask.
// Pricy will not create a new embedded wallet for this user and will rely on user's singing with metamask
export function LoginWithWalletButton () {
    const { ready, authenticated } = usePrivy();
    const { login } = useLogin();
    // Disable login when Privy is not ready or the user is already authenticated
    const disableLogin = !ready || (ready && authenticated);

    return (
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md m-10"
          disabled={disableLogin}
          onClick={() => login({
            loginMethods: ['wallet'],
            walletChainType: 'ethereum-and-solana',
            disableSignup: false
          })}
        >
          Existing Wallet
      </button>
    );

  // Prompt user to connect a wallet with Privy modal
  return 
}

// Use this to link an external wallet e.g. Metamask to the currently logged in user. This will add the metamask wallet
// to the existing embedded wallet created by Privy. That is user x will have two wallets for each network i.e. Solana and EVM
export function LinkAccountButton() {
  const {linkWallet, linkPasskey} = useLinkAccount();

  return (
    <div>
      <button onClick={linkPasskey}>Link Passkey</button>
      {/* TODO: don't use that in our App. We want users to have a single wallet address per chain. */}
      {/* <button onClick={linkWallet}>Link External Wallet</button> */}
    </div>
  );
}

// TODO: not sure why we should use shit
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
