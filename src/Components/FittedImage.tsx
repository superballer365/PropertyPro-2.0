import React from "react";
import styles from "./FittedImage.module.scss";
import classNames from "classnames";

export default function FittedImage(
  props: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >
) {
  const className = props.className ?? "";

  return (
    <div className={classNames(className, styles.imageContainer)}>
      <img {...props} className={styles.image} />
    </div>
  );
}
