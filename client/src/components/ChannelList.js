import { useChannels } from "../context/ChannelsContext";

import Spinner from "./Spinner";
import Alert from "./Alert";
import ChannelItem from "./ChannelItem";

import styles from "./ChannelList.module.css";

function ChannelList() {
  const { channels, isLoading, error } = useChannels();

  if (channels?.length === 0 && isLoading) {
    return <Spinner />;
  }

  if (error?.type === "chn-fetch") {
    return <Alert text={error?.message} isError={true} />;
  }

  if (!channels.length) {
    return <Alert text="No channels right now!" />;
  }

  return (
    <div className={styles.channels}>
      {channels.map((channel) => (
        <ChannelItem channel={channel} key={channel.id} />
      ))}
    </div>
  );
}

export default ChannelList;
