/* eslint-disable */
"use client";

import { block } from "million/react";

import * as styles from "./Button.css";

const ButtonComp = ({ children, onClick }: { children: any; onClick: any }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};

const Button = block(ButtonComp);

export default Button;
