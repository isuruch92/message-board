import { useNavigate, useParams } from "react-router-dom";
import { useChannels } from "../context/ChannelsContext";

import styles from "./ChannelItem.module.css";

function ChannelItem({ channel }) {
  const { navPanelSize } = useChannels();
  const navigate = useNavigate();
  const { id } = useParams();

  function handleNavigation() {
    if (Number(id) === channel.id) {
      return;
    }
    navigate(`/app/channels/${channel.id}`);
  }

  return (
    <button
      className={`${styles.channel} ${
        Number(id) === channel.id ? styles["channel--active"] : ""
      } ${navPanelSize < 5 ? styles["channel--collapsed"] : ""}`}
      onClick={handleNavigation}
    >
      <div className={styles.title}>
        <span>{channel.emoji}</span>
        {navPanelSize > 6 && (
          <span className={navPanelSize > 18 ? styles.name : styles.nameClip}>
            {channel.name}
          </span>
        )}
      </div>
      {navPanelSize > 20 && (
        <span className={styles.description}>{channel?.details}</span>
      )}
    </button>
  );
}

export default ChannelItem;
