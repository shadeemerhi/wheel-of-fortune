import React from "react";

import styles from "../../styles/Layout.module.scss";

const Navbar: React.FC = () => {
  return (
    <div className={`${styles.navbar} heavy_text logo_text md_text`}>
      Intellicents
    </div>
  );
};
export default Navbar;
