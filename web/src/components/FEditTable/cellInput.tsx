import {TextField} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {TableContext} from "./index.tsx";

export default function (){
  const injector = useContext(TableContext);
  const {cursor, rows, columns} = injector;
  const cursorBorderWidth = 2
  const style = {
    top: `${cursor.top + cursorBorderWidth}px`,
    left: `${cursor.left + cursorBorderWidth}px`,
    width: `${cursor.width - cursorBorderWidth * 2}px`,
    height: `${cursor.height - cursorBorderWidth * 2}px`,
  }

  const [cell, setCell] = useState('');
  const defaultCell =rows[cursor.rowIndex][columns[cursor.columnIndex].name]
  useEffect(()=>{
    setCell(defaultCell)
  },[defaultCell])

  return (
    <span style={style} className={`cell-input ${cursor.editing ? 'editing' : ''}`}>
      <TextField
        sx={{
          padding:0,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: 'none',
            },
            '&:hover fieldset': {
              border: 'none',
            },
            '&.Mui-focused fieldset': {
              border: 'none',
            },
          },
          '& .MuiInputBase-root': {
            padding: '4px',
          },
        }}
      value={cell}
        onChange={(e) => setCell(e.target.value)}
      />
    </span>
  )
}