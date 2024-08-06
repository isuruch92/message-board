import { useParams, useNavigate } from "react-router-dom";

import SearchMessages from "./SearchMessages";
import Results from "./Results";
import useWindowSize from "../hooks/useWindowSize";

import styles from "./Header.module.css";

function Header() {
  const { id } = useParams();
  const [windowWidth] = useWindowSize();
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/app/channels/`);
  }

  return (
    <header className={styles.header}>
      <img
        className={styles.logo}
        src={windowWidth > 768 ? "/logo.svg" : "/logo-mobile.png"}
        alt="app logo"
        onClick={handleClick}
      />

      {id && (
        <div className={styles.search}>
          <SearchMessages />
          <Results />
        </div>
      )}

      <img src="/user.png" alt="img account" className={styles.profile}></img>
    </header>
  );
}

export default Header;
