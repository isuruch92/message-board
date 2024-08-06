import { useParams } from "react-router-dom";
import { useChannels } from "../context/ChannelsContext";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import Alert from "../components/Alert";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NavigationPanel from "../components/NavigationPanel";
import DetailsPanel from "../components/DetailsPanel";
import useWindowSize from "../hooks/useWindowSize";

import styles from "./AppLayout.module.css";

function AppLayout() {
  const { setNavPanelSize, error } = useChannels();
  const [windowWidth] = useWindowSize();
  const { id } = useParams();

  if (error?.type === "chn-fetch") {
    return (
      <div className={styles.app}>
        <Header />
        <Alert text={error?.message} isError={true} />
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <Header />

      <div className={styles.main}>
        {/* Desktop view */}
        {windowWidth > 768 && (
          <>
            <PanelGroup direction="horizontal">
              <Panel
                defaultSize={32}
                minSize={4}
                maxSize={35}
                style={{
                  boxShadow: "rgba(225, 225, 225, 0.79) 1px 0px 4px 1px",
                }}
                onResize={(size) => setNavPanelSize(size)}
              >
                <NavigationPanel />
              </Panel>
              <PanelResizeHandle className={styles.ResizeHandleOuter}>
                <div className={styles.ResizeHandleInner}>
                  <svg className={styles.Icon} viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M8,18H11V15H2V13H22V15H13V18H16L12,22L8,18M12,2L8,6H11V9H2V11H22V9H13V6H16L12,2Z"
                    />
                  </svg>
                </div>
              </PanelResizeHandle>

              <Panel minSize={30}>
                <DetailsPanel />
              </Panel>
            </PanelGroup>
          </>
        )}

        {/* Mobile view */}
        {windowWidth <= 768 && !id && <NavigationPanel />}
        {windowWidth <= 768 && id && <DetailsPanel />}
      </div>

      <Footer />
    </div>
  );
}

export default AppLayout;
