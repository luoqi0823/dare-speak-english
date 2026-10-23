import Image from "next/image";

import styles from "./brand-logo.module.css";

interface BrandLogoProps {
  compactOnSmall?: boolean;
  priority?: boolean;
  size?: "small" | "medium" | "large";
  tagline?: string;
}

export function BrandLogo({
  compactOnSmall = false,
  priority = false,
  size = "medium",
  tagline,
}: BrandLogoProps) {
  return (
    <span
      className={`${styles.logo} ${compactOnSmall ? styles.compactOnSmall : ""}`}
      data-size={size}
    >
      <Image
        aria-hidden="true"
        alt=""
        className={styles.mark}
        height={56}
        priority={priority}
        src="/mark.svg"
        unoptimized
        width={56}
      />
      <span className={styles.copy}>
        <strong>敢说英语</strong>
        {tagline ? <small>{tagline}</small> : null}
      </span>
    </span>
  );
}
