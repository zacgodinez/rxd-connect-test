import { useContext } from "react";
import { RdtContext } from "../pages/rdt-context";

export const useRdt = () => {
  const rdt = useContext(RdtContext);

  return rdt;
};
