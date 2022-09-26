import React                 from 'react';
import { Link, useLocation } from "react-router-dom";
import styles                from "./NavBar.module.css"
import { FontAwesomeIcon }   from "@fortawesome/react-fontawesome";
import { faShieldHalved }    from "@fortawesome/free-solid-svg-icons/faShieldHalved";

import classNames      from "classnames";
import { getUser }     from "../../app/features/User/selectors";
import { useSelector } from "react-redux";

function NavBar() {
  // const { enqueueSnackbar } = useSnackbar()

  const location = useLocation()

  const user = useSelector(getUser)

  return (
    <nav className={styles.nav}>
      {/*<div>Icon</div>*/}
      <FontAwesomeIcon className={styles.icon} icon={faShieldHalved} />
      <Link className={classNames({[styles.activeLink]: location.pathname === '/'})} to="/">About</Link>
      <Link className={classNames({[styles.activeLink]: location.pathname === '/user'})} to={`/user/${user?.id}`}>User</Link> {/* will be not found up to setting user id inside link */}
      <Link className={classNames({[styles.activeLink]: location.pathname === '/tasks'})} to="/tasks">Tasks</Link>
      <Link className={classNames({[styles.activeLink]: location.pathname === '/groups'})} to="/groups">Groups</Link>
      {/*<Link to="/group/:groupId">User</Link>*/}
    </nav>
  );
}

export default NavBar;
