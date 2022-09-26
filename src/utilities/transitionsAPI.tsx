import { CSSTransition } from "react-transition-group";

export const FadeTransition = (props:any) => (
  <CSSTransition
    {...props}
    classNames="test"
    timeout={{appear: 1000, exit: 0, enter: 300}}
  />)
