import { useContext } from "react";
import { RdtContext } from "../components/rdt-context";

export const useRdt = () => {
  const rdt = useContext(RdtContext);

  return rdt;
};
