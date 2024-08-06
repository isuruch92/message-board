import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useChannels } from "../context/ChannelsContext";

import Spinner from "./Spinner";
import Alert from "./Alert";
import EditorPanel from "./EditorPanel";
import MessageListPanel from "./MessageListPanel";
import EmptyState from "./EmptyState";
import ChannelHeader from "./ChannelHeader";
import useWindowSize from "../hooks/useWindowSize";

import styles from "./DetailsPanel.module.css";

function DetailsPanel() {
  const { id } = useParams();
  const { isLoading, error, fetchMessages } = useChannels();
  const [windowWidth] = useWindowSize();

  useEffect(
    function () {
      if (id) {
        fetchMessages(id);
      }
    },
    [id, fetchMessages]
  );

  if (error) {
    return <Alert text={error?.message} isError={true} />;
  }

  if (!id) {
    return (
      <>
        <EmptyState
          img="/landing.png"
          msgTitle="Pick a channel, boss!"
          msgSubtitle="Dive in and let the vibes flow..!"
          greeting="Hi there !"
        />
      </>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.details}>
        {windowWidth <= 768 && <ChannelHeader />}
        <div className={styles.spinner}>
          <Spinner />
        </div>
        <EditorPanel />
      </div>
    );
  }

  return (
    <div className={styles.details}>
      {windowWidth <= 768 && <ChannelHeader />}
      <MessageListPanel />
      <EditorPanel />
    </div>
  );
}

export default DetailsPanel;
