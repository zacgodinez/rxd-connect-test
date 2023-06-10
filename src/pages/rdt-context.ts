import { createContext } from "react";
import { type Rdt } from "./types";

export const RdtContext = createContext<Rdt | null>(null);
