import { useEffect, useRef } from "react";
import { useChannels } from "../context/ChannelsContext";

import MessageItem from "./MessageItem";
import EmptyState from "./EmptyState";

import styles from "./MessageListPanel.module.css";

function MessageListPanel() {
  const { filteredMessages, searchQuery } = useChannels();
  const messageListPanelEl = useRef(null);

  useEffect(function () {
    if (messageListPanelEl && messageListPanelEl.current) {
      messageListPanelEl.current.scrollTop =
        messageListPanelEl.current.scrollHeight;
    }
  }, []);

  if (searchQuery.length === 0 && filteredMessages.length === 0) {
    return (
      <EmptyState
        img="/empty-state.png"
        msgTitle="Empty zone, boss!"
        msgSubtitle="Break the ice, drop a line. You're up...!"
      />
    );
  }

  if (searchQuery.length > 0 && filteredMessages.length === 0) {
    return (
      <EmptyState
        img="/no-results-state.png"
        msgTitle="Uh-oh! No traces here, boss!"
        msgSubtitle="Shake it up with a new search, let's find your groove!"
      />
    );
  }

  if (!filteredMessages || !Array.isArray(filteredMessages)) {
    return null;
  }

  return (
    <div
      ref={messageListPanelEl}
      id="message-list-panel"
      className={styles.messages}
    >
      {filteredMessages.map((message) => (
        <MessageItem message={message} key={message.id} />
      ))}
    </div>
  );
}

export default MessageListPanel;
