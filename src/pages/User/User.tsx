import React           from 'react';
import { useSelector } from 'react-redux';
import { selectById }  from "../../app/features/usersSlice"
import { useParams }   from "react-router-dom";
import { RootState }   from "../../app/store";
import styles          from './User.module.css'

function User() {
  const params = useParams()
  // const navigate = useNavigate()

  let user = useSelector((state: RootState) => selectById(state, parseInt(params.userId ? params.userId : '1')))

  return (
    <div className={styles.wrapper}>
      <div>User</div>
      <div>Name: {user && user?.name}</div>
      <div>Email: {user && user?.email}</div>
      <div>Id: {user && user?.id}</div>

    </div>
  );
}

export default User;
