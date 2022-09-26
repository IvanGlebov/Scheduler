import React, { useEffect }                                   from 'react';
import { useSelector }                                        from 'react-redux';
import './App.scss';
import './Typography.scss'
import { Route, Routes, useLocation, useNavigate }            from "react-router-dom";
import { About, Group, Groups, Login, Register, Tasks, User } from "./pages";
import NavBar                                                 from "./components/NavBar/NavBar";
import { usersSet }                                           from "./app/features/usersSlice";
import { groupAdded, groupSetPrivileges, groupsSet }          from "./app/features/Groups/groupsSlice";
import { getUserStatus, isLoggedIn }                          from "./app/features/User/selectors"
import { useAppDispatch }                                     from "./app/store";

function App() {

  const dispatch = useAppDispatch()
  // const loggedIn = useSelector(isLoggedIn)
  const loggedIn = useSelector(isLoggedIn)
  const userStatus = useSelector(getUserStatus)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (userStatus !== 'fetched') {
      //TODO add check if there is something in LocalStorage
      if (location.pathname !== '/login' && location.pathname !== '/register') {
        navigate('/login')
      }
    }
    // if (location.pathname !== '/login')
    //   navigate('/login')
    // console.log(location)
  })
  // Fetch user information
  // useEffect(() => {
  //   if (userStatus !== 'fetched' && userStatus !== 'rejected') {
  //     console.log('user information is old. Trying to fetch it.')
  //     dispatch(logOut)
  //     dispatch(fetchUser(1))
  //   } else if (userStatus === 'rejected') {
  //     console.log('User already fetched')
  //   }
  // }, [userStatus])

  // Set testing initial state
  useEffect(() => {
    // console.log(loggedIn ? "LOGGED" : "UNAUTHORIZED")
    dispatch(usersSet([{ id: 1, name: "test" }]))
    dispatch(groupsSet([{
      id: 1,
      name: "k3221",
      usersIds: [1],
      ownersIds: [1],
      groupsTasksIds: [],
      usersPrivileges: { ids: [], entities: {} }
    }]))
    dispatch(groupAdded({
      id: 2,
      name: 'k3222',
      usersIds: [1, 2],
      ownersIds: [2],
      groupsTasksIds: [],
      usersPrivileges: { ids: [], entities: {} }
    }))
    dispatch(groupSetPrivileges({ groupId: 1, userId: 1, privileges: ['view'] }))
  }, [])


  return (
    <div className="App">
      {location.pathname !== '/login' && location.pathname !== '/register' && (<NavBar/>)}
      <Routes>
        <Route path='/' element={<About/>}/>
        <Route path='/user/:userId' element={<User/>}/>
        <Route path='/tasks' element={<Tasks/>}/>
        <Route path='/groups' element={<Groups/>}/>
        <Route path='/group/:groupId' element={<Group/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path="*" element={<div>not found</div>}/>
      </Routes>
    </div>
  );
}

export default App;
