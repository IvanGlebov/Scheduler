import React, { useEffect, useState }            from 'react';
import { useSelector }                           from "react-redux";
import { fakeFetch }                             from '../../app/features/Groups/groupsSlice';
import { getAllGroupsEntities, getGroupsStatus } from "../../app/features/Groups/selectors";
import { useAppDispatch }                        from '../../app/store';
import styles                                    from './Groups.module.css'
import SearchBar                                 from "../../components/SearchBar/SearchBar";

function Groups() {

  let groupsEntities = useSelector(getAllGroupsEntities)
  const groupsStatus = useSelector(getGroupsStatus)
  const dispatch = useAppDispatch()

  let [rows, setRows] = useState<Array<Group>>([{ id: 0, name: 'test name', usersNumber: 1 }])

  useEffect(() => {
    console.log(groupsStatus)
    if (groupsStatus === 'initial') {
      console.log('Fetch groups from server')
      // TODO Create async thunk to fetch groups
    }
    if (groupsStatus !== 'fetched') {
      console.log('fetch one')
      dispatch(fakeFetch())
    }
  }, [groupsStatus, groupsEntities])

  type Group = {
    id: number | undefined,
    name: string | undefined,
    usersNumber: number | undefined
  }

  useEffect(() => {
    console.log('Groups entities')
    // console.log(Object.values(groupsEntities))

    let groups: Array<Group> = []

    Object.values(groupsEntities).forEach(group => {
      let newGroup: Group = { id: group?.id, name: group?.name, usersNumber: group?.usersIds?.length }
      groups.push(newGroup)
    })
    console.log(groups)
    setRows(groups)
  }, [groupsEntities])

  return (
    <div className={styles.container}>
      {/*<h1>Groups</h1>*/}
      {groupsStatus === 'fetched' && (
        <>
          <h1>Groups list</h1>
          <div className={styles.filters}>
            <SearchBar/>
          </div>

          <div className={styles.gridContainer}>
            {rows.length > 0 && (
              <div className={styles.tableContainer}>
                <div className={styles.tableHeaderRow}>
                  {/*<td>Id</td>*/}
                  <div className={styles.tableCol}>Name</div>
                  <div className={styles.tableCol}>Users number</div>
                  <div className={styles.tableCol}>Faculty</div>
                </div>
                {rows.map((el) => (
                  <div className={styles.tableContentRow}>
                    <div className={styles.tableCol}>{el.name}</div>
                    <div className={styles.tableCol}>{el.usersNumber}</div>
                    <div className={styles.tableCol}></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
      {groupsStatus === 'rejected' && (
        <div>Error fetching groups</div>
      )}
      {groupsStatus === 'initial' && (
        <div>Initial state</div>
      )}
      {groupsStatus === 'updateOne' && (
        <div>Update one</div>
      )}
      {groupsStatus === 'updatePrivileges' && (
        <div>Updated privileges</div>
      )}
      <div>{groupsStatus}</div>
    </div>

  );
}

export default Groups;
