import { Outlet } from "react-router-dom";

import styles from "./NavigationPanel.module.css";

function NavigationPanel() {
  return (
    <div className={styles.nav}>
      <Outlet />
    </div>
  );
}

export default NavigationPanel;
