import styles from "./EmptyState.module.css";

function EmptyState({ img, msgTitle, msgSubtitle, greeting }) {
  return (
    <div
      className={`${styles.emptyStateContainer} ${
        !greeting ? styles.emptyStateFillHeight : ""
      }`}
    >
      {greeting && <span className={styles.greetingText}>Hi there !</span>}
      <img src={img} alt={`${img} img`} />
      <span className={styles.emptyStateTitle}>{msgTitle}</span>
      <span className={styles.emptyStateSubtitle}>{msgSubtitle}</span>
    </div>
  );
}

export default EmptyState;
