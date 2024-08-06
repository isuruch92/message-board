import styles from "./MessageItem.module.css";

function getTimeString(inputDate) {
  if (!inputDate) {
    return "";
  }

  let date = new Date(inputDate);
  return date.toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function MessageItem({ message }) {
  return (
    <div className={styles.message}>
      <div className={styles.header}>
        <img className={styles.avatar} src="/user.png" alt="avatar img" />
        <span className={styles.author}>{message?.author}</span>
        <span className={styles.time}>{getTimeString(message?.timestamp)}</span>
      </div>

      <div className={styles.body}>
        <p>{message?.text}</p>
      </div>
    </div>
  );
}

export default MessageItem;
