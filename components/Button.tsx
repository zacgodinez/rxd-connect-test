"use client";

import * as styles from "./Button.css";

export default function Button({ children }: any) {
  return (
    <button onClick={() => console.log("click")} className={styles.button}>
      {children}
    </button>
  );
}
