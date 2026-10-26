"use client";

import { useState } from "react";

import type { MemoryImage as MemoryImageName } from "../model/types";
import { getCourseIllustrationUrl } from "../model/illustrations";
import styles from "./learning.module.css";

interface MemoryImageProps {
  image: MemoryImageName;
  className?: string;
  label?: string;
}

export function MemoryImage({ image, className = "", label }: MemoryImageProps) {
  const courseImageUrl = getCourseIllustrationUrl(image);
  const [failedUrl, setFailedUrl] = useState<string | null>(null);
  const imageFailed = Boolean(courseImageUrl && courseImageUrl === failedUrl);
  const showCourseImage = Boolean(courseImageUrl && !imageFailed);
  const legacyClassName = courseImageUrl ? "" : styles[`image-${image}`] ?? "";
  const fallbackText = label?.trim() || "图片暂不可用";

  return (
    <span
      aria-label={showCourseImage ? undefined : fallbackText}
      className={`${styles.memoryImage} ${legacyClassName} ${showCourseImage ? styles.courseMemoryImage : ""} ${className}`}
      role={label ? "img" : undefined}
    >
      {showCourseImage ? (
        // Files are already resized WebP assets in Supabase Storage, so optimization would only proxy them again.
        // eslint-disable-next-line @next/next/no-img-element
        <img alt={label ?? ""} onError={() => setFailedUrl(courseImageUrl)} src={courseImageUrl!} />
      ) : null}
      {(!courseImageUrl && !legacyClassName) || imageFailed ? (
        <span className={styles.imageTextFallback}>{fallbackText}</span>
      ) : null}
    </span>
  );
}
