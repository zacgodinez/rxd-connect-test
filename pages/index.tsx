/* eslint-disable */
import React, { useState, useEffect } from "react";
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

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NextLink from "next/link";
import * as styles from "@/styles/page.css";

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

export default function App() {
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
    <main className={styles.page}>
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/topics">Topics</Link>
            </li>
            <li>
              <NextLink href="/settings">Settings (SSR)</NextLink>
            </li>
            <li>
              <NextLink href="/terms">Terms (SSR)</NextLink>
            </li>
          </ul>
          <div
            style={{
              paddingTop: "30px",
              paddingBottom: "30px",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <h2 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
              Theme
            </h2>
            <Button onClick={() => setTheme("light")}>Theme light</Button>
            <Button onClick={() => setTheme("dark")}>Theme dark</Button>
            <Button onClick={() => setTheme("system")}>Theme system</Button>
          </div>
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
                <div>
                  <div className="card">
                    <radix-connect-button></radix-connect-button>
                  </div>
                </div>
                <div>
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
              </RdtProvider>
            </div>
          )}

          <Routes>
            <Route path="/about" element={<h1>About</h1>} />
            <Route path="/topics" element={<h1>Topics</h1>} />
            <Route path="/" element={<h1>Home</h1>} />
          </Routes>
        </div>
      </Router>
    </main>
  );
}
