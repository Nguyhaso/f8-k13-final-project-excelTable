import {TableContext} from "./index.tsx";
import {useContext} from "react";
import './style.sass'

export default function () {
  const injector = useContext(TableContext);
  const {cursor} = injector;


  return (
    <>
      {
        <span
          className={'cursor'}
          style={{
          top: `${cursor.top}px`,
          left: `${cursor.left}px`,
          width: `${cursor.width}px`,
          height: `${cursor.height}px`
          }}
        ></span>
      }
    </>
  )
}