import Paper from "@mui/material/Paper";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import Row from "./Row.tsx";
import './style.sass'
import CellCursor from "./CellCursor.tsx";
import CellInput from "./cellInput.tsx";
import {createContext, useEffect, useState} from "react";

const defaultCursor ={
  rowIndex: 0,
  columnIndex: 0,
  top:0,
  left:0,
  width:0,
  height:0,
  editing:false
}

export const TableContext = createContext(null);
function FTableComponent({columns = [], rows = []}: any) {

  const [cursor, setCursor] = useState({...defaultCursor});
  const provider ={
    cursor, setCursor, rows, columns
  }
useEffect(()=>{
  console.log(cursor)
},[cursor])
  const onKeyDown=(e:any)=>{
    setCursor({
      ...cursor,
      editing:true
    })
    const input = document.querySelector('.cell-input input');
    input.focus()
  }
  return (
    <TableContext.Provider value={provider}>
      <Table className={'f-editable-table'} tabIndex={0} onKeyDown={onKeyDown}>
        <TableHead>
          <TableRow>
            {
              columns?.map((column: any) => {
                return <TableCell size={"small"} key={column.name}>{column.name}</TableCell>
              })
            }
          </TableRow>
        </TableHead>

        <TableBody>
          {
            rows?.map((row: any, rowIndex: number) => {
              return (
                <Row columns={columns} row={row} key={rowIndex} rowIndex={rowIndex}/>
              )
            })
          }
        </TableBody>
      </Table>
      <CellCursor/>
      <CellInput
      />
    </TableContext.Provider>
  )
}

export default FTableComponent