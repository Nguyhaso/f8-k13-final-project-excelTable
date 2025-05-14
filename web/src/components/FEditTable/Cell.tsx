import {TableCell} from "@mui/material";
import {useContext, useRef} from "react";
import {TableContext} from "./index.tsx";

  export default function ({column, row, rowIndex, columnIndex}:any) {
    const cell = row[column.name] || ''
    const injector =useContext(TableContext);
    const {cursor, setCursor} = injector
    const cellRef = useRef(null);
    const onClick=()=> {
      if (cellRef.current) {
        const width = cellRef.current.offsetWidth
        const height = cellRef.current.offsetHeight
        const top = cellRef.current.offsetTop
        const left = cellRef.current.offsetLeft

        setCursor({
          ...cursor,
          rowIndex,
          columnIndex,
          width,
          height,
          top,
          left,
        })
      }
    }
    return (
    <TableCell
      ref={cellRef}
      className={`cell-${rowIndex}-${columnIndex}`}
      onClick={onClick}

    >{cell} </TableCell>
  )
}