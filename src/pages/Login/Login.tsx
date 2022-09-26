import React, { useEffect, useState }             from 'react';
import { emptyFieldValidation, useEffectNoFirst } from "../../utilities/hooks";
import TextField                                  from "@mui/material/TextField";
import LoadingButton                              from '@mui/lab/LoadingButton';
import styles                                     from './Login.module.css'
import { useAppDispatch }                         from "../../app/store";
import { logIn }                                  from '../../app/features/User/thunks'
import { getUserMessage, getUserStatus }          from "../../app/features/User/selectors";
import { useSelector }                            from "react-redux";
import { useNavigate }                            from "react-router-dom";
import classNames                                 from "classnames";

import { TransitionGroup } from 'react-transition-group';
import { FadeTransition }  from "../../utilities/transitionsAPI";
import { useSnackbar }     from "notistack";

function Login() {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState(false)
  const [passError, setPasswordError] = useState(false)
  const [loginHelperText, setLoginHelperText] = useState('')
  const [passHelperText, setPasswordHelperText] = useState('')
  const [validationLoading, setValidationLoading] = useState(false)

  const [validationError, setValidationError] = useState(false)

  const userStatus = useSelector(getUserStatus)
  const message = useSelector(getUserMessage)

  const validate = () => {
    setValidationLoading(true)
    let flag = true

    flag = !flag && loginValidation()
    flag = !flag && passwordValidation()

    // if (password !== 'test') {
    //   flag = false
    //   setValidationError(true)
    //   setValidationLoading(false)
    //   setPasswordError(true)
    //   setLoginError(true)
    //   enqueueSnackbar("Incorrect login or password", {
    //     variant: "error",
    //     action: (
    //       <div>cl</div>
    //     )})
    // }

    if (flag)
      dispatch(logIn({ login, password }))
    if (!flag)
      setValidationLoading(false)
  }

  const loginValidation = () => emptyFieldValidation(login, setLoginError, setLoginHelperText)
  const passwordValidation = () => emptyFieldValidation(password, setPasswordError, setPasswordHelperText)

  useEffect(() => {
    if (userStatus === "fetched") {
      console.log('user authorized')
      setValidationLoading(false)
      setTimeout(() => {
        navigate('/')
      }, 500)
    }
    if (userStatus === "rejected") {
      setValidationLoading(false)
      setValidationError(true)
      enqueueSnackbar(message, { variant: 'error'})
      setLoginHelperText(message || '')
      setLoginError(true)
      setPasswordHelperText(message || '')
      setPasswordError(true)
    }
  }, [userStatus, message])

  useEffectNoFirst(loginValidation, [login])
  useEffectNoFirst(passwordValidation, [password])
  
  return (
    <div className={styles.loginWrapper}>
      <div>
        <h1>Login</h1>
        <div className={styles.textFields}>
          <div className={styles.loginButtonWrapper}>
            <TextField
              id="aefraw4fasdfasrktiogajlksdnfguaisldk"
              autoComplete="off"
              error={loginError}
              helperText={loginHelperText}
              label="Login"
              className={classNames({
                [styles.textField]: true,
                [styles.textFieldActive]: validationError
              })}
              onChange={(e) => {
                setLogin(e.target.value.trim())
              }}
            />
            <TransitionGroup component={null}>
              {validationError && (
                <FadeTransition key="loginErrorButton">
                  <LoadingButton
                    className={classNames({
                      [styles.loadingButton]: true,
                      [styles.recoveryButton]: validationError
                    })}
                    color="secondary"
                    variant="outlined"
                    onClick={() => setValidationError(false)}
                  >Recover password</LoadingButton>
                </FadeTransition>
              )}
            </TransitionGroup>
          </div>
          <div className={styles.loginButtonWrapper}>
            <TextField
              error={passError}
              helperText={passHelperText}
              label="Password"
              className={classNames({
                [styles.textField]: true,
                [styles.textFieldActive]: (password.length > 0 && login.length > 0)
              })}
              onChange={(e) => {
                setPassword(e.target.value.trim())
              }}
              onKeyDown={(e) => {
                if (e.code === 'Enter') validate()
              }}
              type="password"/>
            <TransitionGroup component={null}>
              {(password.length > 0 && login.length > 0) && (
                <FadeTransition key="innerFade_2">
                  <LoadingButton
                    className={classNames({
                      [styles.loadingButton]: true,
                      [styles.loadingButtonActive]: (password.length > 0 && login.length > 0)
                    })}
                    color={userStatus === 'fetched' ? "success" : "primary"}
                    variant="outlined"
                    loading={validationLoading}
                    onClick={validate}
                  >{userStatus === 'fetched' ? "Success" : "Log In"}</LoadingButton>
                </FadeTransition>
              )}

            </TransitionGroup>
          </div>
        </div>
        <div className={styles.afterForm}>
          <p>Does not have account yet?</p>
          <LoadingButton href="/register">Create one!</LoadingButton>
        </div>
      </div>
    </div>
  );
}

export default Login;
