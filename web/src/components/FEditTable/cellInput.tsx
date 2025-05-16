import {Autocomplete, TextField} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {TableContext} from "./index.tsx";

export default function () {
  const injector = useContext(TableContext);
  const {cursor, setCursor, rows, columns, onInput} = injector;
  const cursorBorderWidth = 2
  const style = {
    top: `${cursor.top + cursorBorderWidth}px`,
    left: `${cursor.left + cursorBorderWidth}px`,
    width: `${cursor.width - cursorBorderWidth * 2}px`,
    height: `${cursor.height - cursorBorderWidth * 2}px`,
  }

  const [cell, setCell] = useState('');
  const defaultCellValue = rows[cursor.rowIndex][columns[cursor.columnIndex].name]
  useEffect(() => {
    setCell(defaultCellValue || '')
  }, [defaultCellValue])

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      let columnIndex = cursor.columnIndex;
      let rowIndex = cursor.rowIndex;

      if (cursor.columnIndex === columns.length - 1) {
        columnIndex = 0
        rowIndex += 1
      } else {
        columnIndex += 1
      }
      const nextCell: any = document.querySelector(`.cell-${rowIndex}-${columnIndex}`)
      setCursor({
        ...cursor,
        columnIndex,
        rowIndex,
        top: nextCell.offsetTop,
        left: nextCell.offsetLeft,
        width: nextCell.offsetWidth,
      })
    }
  }
  const onChange = (value: string) => {
    setCell(value)
    rows[cursor.rowIndex][columns[cursor.columnIndex].name] = value
    onInput(value)
  }

  return (
    <span style={style} className={`cell-input ${cursor.editing ? 'editing' : ''}`}>
      {
        columns[cursor.columnIndex].dropdown
          ? <Autocomplete
            fullWidth
            options={columns[cursor.columnIndex].items}
            getOptionLabel={(option) => option.name}
            getOptionKey={(option) => option.name}
            renderInput={params =>
              <TextField
                {...params}
                variant={"standard"}
                sx={{
                  padding: 0,
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
              />}
            onChange={(_, newValue:any) => onChange(newValue.name)}
            onKeyDown={onKeyDown}
          />
          : <TextField
            sx={{
              padding: 0,
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
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={onKeyDown}
          />
      }

    </span>
  )
}