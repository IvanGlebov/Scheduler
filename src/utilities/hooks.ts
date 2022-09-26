import { useEffect, useRef } from "react";

export const useEffectNoFirst = (action: Function, deps:Array<any>) => {
  const ref = useRef(false)
  useEffect(() => {
    if(!ref.current) {
      ref.current = true
      return
    }
    action()
  }, deps)
}

export const emptyFieldValidation = (text: string, setError: Function, setHelperText: Function) => {
  if (text.length === 0) {
    setError(true)
    setHelperText('This field must not be empty')
    return false
  } else {
    setError(false)
    setHelperText('')
    return true
  }
}
