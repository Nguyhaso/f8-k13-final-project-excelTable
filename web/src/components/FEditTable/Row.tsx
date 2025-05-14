import {TableRow} from "@mui/material";
import Cell from "./Cell.tsx";

export default function ({columns, row, rowIndex}: any) {
  return (
    <TableRow key={row.item}>
      {
        columns.map((column: any, columnIndex: any) => {
          return <Cell
            column={column}
            row={row}
            key={columnIndex}
            rowIndex={rowIndex}
            columnIndex={columnIndex}
          />
        })
      }
    </TableRow>
  )
}