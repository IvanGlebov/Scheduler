import React, { useState }                        from 'react';
import styles                                     from './Register.module.css'
import TextField                                  from "@mui/material/TextField";
import LoadingButton                              from "@mui/lab/LoadingButton";
import { useAppDispatch }                         from '../../app/store';
import { emptyFieldValidation, useEffectNoFirst } from "../../utilities/hooks";
import { createUser }                             from "../../app/features/User/thunks";
import { getUserStatus }                          from "../../app/features/User/selectors";
import { useSelector }                            from "react-redux";

function Register() {

  const dispatch = useAppDispatch()
  const userStatus = useSelector(getUserStatus)

  const [name, setName] = useState('')
  const [nameError, setNameError] = useState(false)
  const [nameHelperText, setNameHelperText] = useState('')

  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [emailHelperText, setEmailHelperText] = useState('')

  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [passwordHelperText, setPasswordHelperText] = useState('')

  const [group, setGroup] = useState(0)

  const registerUser = () => {
    dispatch(createUser({id: 10, name, email, status: 'initial', groupId: group}))
  }

  const validateMail = (email: string) => {
    const emailRegexp = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    return email.match(emailRegexp);
  }

  // Email watcher
  useEffectNoFirst(() => {
    console.log('email validation')
    if (validateMail(email)) {
      setEmailError(false)
      setEmailHelperText('')
    } else {
      setEmailError(true)
      setEmailHelperText('Invalid email')
    }
  }, [email])
  // Password watcher
  useEffectNoFirst(() => {
    emptyFieldValidation(password, setPasswordError, setPasswordHelperText)
    if (password.length < 8) {
      setPasswordError(true)
      setPasswordHelperText('At least 8 symbols')
    }
  }, [password])

  return (
    <div className={styles.wrapper}>
      <h1>New user</h1>
      <div className={styles.formWrapper}>
        <div className={styles.formElement}>
          <TextField onChange={(e) => setName(e.target.value)} label="Your name" required={true} />
        </div>
        <div className={styles.formElement}>
          <TextField onChange={(e) => setEmail(e.target.value)} error={emailError} helperText={emailHelperText} label="Email" required={true} />
        </div>
        <div className={styles.formElement}>
          <TextField onChange={(e) => setPassword(e.target.value)} error={passwordError} helperText={passwordHelperText} label="Password" required={true} />
        </div>
        <div className={styles.formElement}>
          <TextField onChange={(e) => setGroup(parseInt(e.target.value))} label="Group" required={false} helperText="If you already know your group id - specify it here. But you can always do it later."/>
        </div>
        <div className={styles.controlsContainer}>
          <LoadingButton loading={userStatus === 'fetching'} onClick={registerUser} variant="contained" color="primary">Register</LoadingButton>
          <LoadingButton variant="outlined" color="primary" href="/login">Log in</LoadingButton>
        </div>
      </div>
    </div>
  );
}

export default Register;
