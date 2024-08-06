import { useChannels } from "../context/ChannelsContext";
import styles from "./Results.module.css";

function Results() {
  const { filteredMessages } = useChannels();
  const messagesCount = filteredMessages.length;

  return (
    <p className={styles.resultsContainer}>
      <img
        src={messagesCount === 0 ? "/message-empty.png" : "/message-found.png"}
        alt="msg empty"
      />
      <span>
        {messagesCount}
        <span className={styles.resultText}> Message(s) found</span>
      </span>
    </p>
  );
}

export default Results;
