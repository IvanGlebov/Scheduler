import { createAsyncThunk }  from "@reduxjs/toolkit"
import { credentials, User } from "./types"
import { fakeDelay }         from '../../../utilities/fakeLoads'
import { getRandInt }        from '../../../utilities/numbers'


export const fetchUser = createAsyncThunk<User,
  number>(
  'user/fetch',
  async (userId: number) => {
    console.log('fetch user')
    await fakeDelay(5000, true, 'OK')
    const status = getRandInt(0, 1) ? 'fetched' : 'deprecated'
    const user: User = { id: userId, name: 'Fetched user', status: status, loggedIn: true }

    return user
  })


export const logIn = createAsyncThunk<User, credentials>(
  'user/login',
  async (credentials: credentials) => {
    // TODO make login request here
    if (credentials.password === 'pass' && credentials.login === 'iota')
      await fakeDelay(5000, true, ``)
    else
      // await fakeDelay(5000, false, `Incorrect login or password ${credentials.login} | ${credentials.password}`)
      await fakeDelay(5000, false, `Incorrect login or password`)

    const user: User = { id: 10, name: 'LoggedIn user', status: 'fetched', loggedIn: true }
    return user
  }
)

export const createUser = createAsyncThunk<string, User>(
  'user/new',
  async (userInfo: User) => {
    const message = "User created successfully"
    await fakeDelay(5000, true, message)
    // TODO Make user register request here
    return message
  }
)
