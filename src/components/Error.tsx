import React from "react";

import styles from "../styles/Layout.module.scss";

type ErrorProps = {
  error: string;
};

const Error: React.FC<ErrorProps> = ({ error }) => {
  return <div className={styles.error}>An error occurred 😔 ➡️ {error}</div>;
};
export default Error;
