import { useState } from "react";
import { useParams } from "react-router-dom";
import { useChannels } from "../context/ChannelsContext";

import styles from "./EditorPanel.module.css";

function EditorPanel() {
  const [text, setText] = useState("");

  const { id } = useParams();
  const { createMessage, isLoading } = useChannels();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text) return;

    const newMessage = {
      id: new Date().getTime(),
      text,
      timestamp: new Date().toISOString(),
      author: "Anonymous",
      title: "New Message",
    };

    await createMessage(newMessage, id);
    setText("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        id="enter-message-text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message here"
      />
      <button
        style={{ backgroundImage: "url(/send.png)" }}
        className={isLoading || text.length === 0 ? styles.disabled : ""}
        disabled={isLoading || text.length === 0}
      ></button>
    </form>
  );
}

export default EditorPanel;
