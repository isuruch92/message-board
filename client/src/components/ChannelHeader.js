import { useNavigate } from "react-router-dom";
import { useChannels } from "../context/ChannelsContext";

import styles from "./ChannelHeader.module.css";

function ChannelHeader() {
  const { currentChannel } = useChannels();
  const navigate = useNavigate();

  return (
    <div className={styles.channelHeader}>
      <img
        className={styles.back}
        onClick={() => navigate(`/app/channels`)}
        src="/angle-left.png"
        alt="back arrow"
      />
      <span className={styles.name}>{currentChannel?.name}</span>
    </div>
  );
}

export default ChannelHeader;
