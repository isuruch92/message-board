import styles from "./Alert.module.css";

function Alert({ text, isError }) {
  return (
    <p className={styles.text}>
      <span role="img">{isError ? <span>⛔️</span> : <span>📜</span>}</span>{" "}
      {text}
    </p>
  );
}

export default Alert;
