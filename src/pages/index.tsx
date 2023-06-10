/* eslint-disable */
import { type NextPage } from "next";
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

import { RadixDappToolkit } from "@radixdlt/radix-dapp-toolkit";
import { RdtProvider } from "./RdtProvider";

import { useAccounts } from "../hooks/useAccounts";
import { useRequestData } from "../hooks/useRequestData";
import { useSendTransaction } from "../hooks/useSendTransaction";
import { useConnected } from "../hooks/useConnected";
import { usePersona } from "../hooks/usePersona";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "radix-connect-button": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

const Home: NextPage = () => {
  const [mounted, setIsMounted] = useState(false);

  const accounts = useAccounts();
  const persona = usePersona();
  const requestData = useRequestData();
  const sendTransaction = useSendTransaction();
  const connected = useConnected();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {mounted && (
          <div>
            <RdtProvider
              value={RadixDappToolkit(
                {
                  dAppName: "Radix dApp",
                  dAppDefinitionAddress:
                    "account_tdx_b_1pzv5m8xqy39jmjkk60jluwhrctcs4qpafrxs7rr54jwq0899y3",
                },
                (requestData) => {
                  requestData({
                    accounts: { quantifier: "atLeast", quantity: 1 },
                  });
                },
                {
                  networkId: 34,
                }
              )}
            >
              <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
                <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                  <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
                    HIIII <span className="text-[hsl(280,100%,70%)]">T3</span>{" "}
                    App
                  </h1>
                  <h2 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
                    connect pls
                  </h2>
                  <div>
                    <div className="card">
                      <radix-connect-button></radix-connect-button>
                    </div>
                  </div>
                  {connected && (
                    <div style={{ marginBottom: 25 }}>
                      <h2>Persona: {persona?.label}</h2>
                    </div>
                  )}
                  {connected && (
                    <div style={{ marginBottom: 25 }}>
                      <h2>Accounts:</h2>
                      {accounts.map((account) => (
                        <div key={account.appearanceId}>{account.label}</div>
                      ))}
                    </div>
                  )}
                  <div
                    style={{
                      textAlign: "center",
                      display: "inline-block",
                      width: 200,
                    }}
                  >
                    <button
                      className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                      onClick={() =>
                        requestData({
                          accounts: {
                            quantifier: "exactly",
                            quantity: 2,
                            oneTime: true,
                          },
                        }).map(({ accounts }) => {
                          alert(`Got wallet response!
            ${JSON.stringify(accounts, null, 2)}`);
                        })
                      }
                    >
                      Request data
                    </button>

                    {connected && (
                      <button
                        style={{
                          display: "block",
                          marginBottom: 10,
                          width: "100%",
                        }}
                        onClick={() =>
                          sendTransaction(`
CREATE_FUNGIBLE_RESOURCE
    18u8
    Map<String, String>(
        "name", "MyResource",                                        # Resource Name
        "symbol", "RSRC",                                            # Resource Symbol
        "description", "A very innovative and important resource"    # Resource Description
    ) 
    Map<Enum, Tuple>(
        Enum("ResourceMethodAuthKey::Withdraw"), Tuple(Enum("AccessRule::AllowAll"), Enum("AccessRule::DenyAll")),
        Enum("ResourceMethodAuthKey::Deposit"), Tuple(Enum("AccessRule::AllowAll"), Enum("AccessRule::DenyAll"))
    )
    Some(Decimal("500000"));

  CALL_METHOD
    ComponentAddress("${accounts[0].address}") 
    "deposit_batch"
    Expression("ENTIRE_WORKTOP");
`)
                        }
                      >
                        Send transaction
                      </button>
                    )}
                  </div>
                  <div className="grid hidden grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
                    <Link
                      className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
                      href="https://create.t3.gg/en/usage/first-steps"
                      target="_blank"
                    >
                      <h3 className="text-2xl font-bold">First Steps →</h3>
                      <div className="text-lg">
                        Just the basics - Everything you need to know to set up
                        your database and authentication.
                      </div>
                    </Link>
                    <Link
                      className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
                      href="https://create.t3.gg/en/introduction"
                      target="_blank"
                    >
                      <h3 className="text-2xl font-bold">Documentation →</h3>
                      <div className="text-lg">
                        Learn more about Create T3 App, the libraries it uses,
                        and how to deploy it.
                      </div>
                    </Link>
                  </div>
                </div>
              </main>
            </RdtProvider>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
