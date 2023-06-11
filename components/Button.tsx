"use client";

import { block } from "million/react";

import * as styles from "./Button.css";

const ButtonComp = ({ children }: any) => {
  return (
    <button onClick={() => console.log("click")} className={styles.button}>
      {children}
    </button>
  );
};

const Button = block(ButtonComp);

export default Button;
