"use client";

import { block } from "million/react";

import * as styles from "./Button.css";

const ButtonComp = ({ children, ...rest }: any) => {
  return (
    <button className={styles.button} {...rest}>
      {children}
    </button>
  );
};

const Button = block(ButtonComp);

export default Button;
