/* eslint-disable */
"use client";

import * as styles from "./page.css";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

import Logo from "@/components/Logo";
import Button from "@/components/Button";
import Footer from "@/components/Footer";

import { RdtProvider } from "@/components/RdtProvider";

import { RadixDappToolkit } from "@radixdlt/radix-dapp-toolkit";
import { useAccounts } from "@/hooks/useAccounts";

import { useRequestData } from "@/hooks/useRequestData";
import { useSendTransaction } from "@/hooks/useSendTransaction";
import { useConnected } from "@/hooks/useConnected";
import { usePersona } from "@/hooks/usePersona";

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

export default function Home() {
  const { setTheme } = useTheme();
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
      <main className={styles.page}>
        <Logo />
        <div>
          {mounted && (
            <div>
              <RdtProvider
                value={RadixDappToolkit(
                  {
                    dAppName: "zgod",
                    dAppDefinitionAddress:
                      "account_tdx_c_1pxdceeqqfh9m4mt45cc0tqntyc5n87y4ze02p002yweq2y94zg",
                  },
                  (requestData) => {
                    requestData({
                      accounts: { quantifier: "atLeast", quantity: 1 },
                    });
                  },
                  {
                    networkId: 12,
                  }
                )}
              >
                <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
                  <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                    <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
                      HIIII <span className="text-[hsl(280,100%,70%)]">T3</span>{" "}
                      App
                    </h1>
                    <div style={{ paddingTop: "30px", paddingBottom: "30px" }}>
                      <h2 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
                        Theme
                      </h2>
                      <Button onClick={() => setTheme("light")}>
                        Theme light
                      </Button>
                      <Button onClick={() => setTheme("dark")}>
                        Theme dark
                      </Button>
                      <Button onClick={() => setTheme("system")}>
                        Theme system
                      </Button>
                    </div>
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
    ComponentAddress("${
      accounts && accounts[0]?.address ? accounts[0]?.address : ""
    }")
    "deposit_batch"
    Expression("ENTIRE_WORKTOP");
`)
                          }
                        >
                          Send transaction
                        </button>
                      )}
                    </div>
                    <div className="grid hidden grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8"></div>
                  </div>
                </main>
              </RdtProvider>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
