import Image from "next/image";
import * as styles from "./logo-test.css";

export default function LogoTest() {
  return (
    <div className={styles.container}>
      <Image
        priority
        src="/logo.png"
        width={152}
        height={180}
        alt="Vanilla Extract logo"
      />
    </div>
  );
}
