import { useChannels } from "../context/ChannelsContext";

import styles from "./SearchMessages.module.css";

function SearchMessages() {
  const { searchQuery, setSearchQuery } = useChannels();

  function handleSearch(value) {
    setSearchQuery(value);
  }

  return (
    <input
      id="search-messages"
      className={styles.searchInput}
      value={searchQuery}
      onChange={(e) => handleSearch(e.target.value)}
      placeholder="Search messages..."
    />
  );
}

export default SearchMessages;
