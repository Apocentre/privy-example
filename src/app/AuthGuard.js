import React, { useEffect } from "react";
import {usePrivy, useWallets} from "@privy-io/react-auth";
import {useSolanaWallets, useSignMessage} from '@privy-io/react-auth/solana';
import {LoginButton, LoginWithWalletButton} from "./buttons";

export const AuthGuard = ({children}) => {
  const { authenticated, user, signMessage } = usePrivy();
  const { ready: evmReady, wallets: evmWallet } = useWallets();
  const { wallets: solanaWallets, ready: solanaReady } = useSolanaWallets();
  const {signMessage: solanaSignMessage} = useSignMessage();

  console.log("EVM wallets: ", evmWallet)
  console.log("Solana wallets: ", solanaWallets)

  useEffect(() => {
    const selectedChain = "solana";

    const run = async () => {
      let wallet;

      if(selectedChain === "solana") {
        wallet = solanaWallets[0];
      } else if (selectedChain === "ethereum") {
        wallet = evmWallet[0];
        wallet.switchChain(1);
      } else if (selectedChain === "berachain") {
        wallet = evmWallet[0];
        wallet.switchChain(80094);
      }

      if (authenticated) {
        const ts = Date.now();
        const message = `Liquidos Auth:${ts}`;

        let sig = "";

        if(selectedChain === "solana") {
          const signature = await solanaSignMessage({
            message,
            options: {
              address: wallet.address,
              uiOptions: {
                title: 'Login'
              }
            }
          });

          sig = Buffer.from(signature).toString("hex")
        } else {
          const { signature } = await signMessage(
            { message },
            {
              address: wallet.address,
              uiOptions: {
                title: 'Login'
              }
            }
          );
          sig = signature;
        }

        console.log("wallet address:", wallet)
        console.log("Signature:", sig)
      }
    };

    run()
      .then(() => {})
      .catch((e) => console.log(`Error authenticating user: ${e}`));
  }, [evmReady, solanaReady, authenticated]);

  if (!authenticated) {
    return (
      <div className="h-fullitems-center flex flex-1 justify-center">
        <LoginButton />
        <p>Or use existing wallet</p>
        <LoginWithWalletButton/>
      </div>
    );
  }

  return children
};
