import { RdtContext } from "@/components/rdt-context";
import { type Rdt } from "./types";

export const RdtProvider = (
  input: React.PropsWithChildren<{
    value: Rdt;
  }>
) => (
  <RdtContext.Provider value={input.value}>
    {input.children}
  </RdtContext.Provider>
);
