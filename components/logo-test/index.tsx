import Image from "next/image";
import * as styles from "./logo-test.css";

export default function LogoTest() {
  return (
    <div className={styles.container}>
      <Image
        priority
        src="/logo.webp"
        width={100}
        height={120}
        alt="Vanilla Extract logo"
      />
    </div>
  );
}
