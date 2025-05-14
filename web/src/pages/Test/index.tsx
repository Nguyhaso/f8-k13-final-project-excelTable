import {FEditable} from "../../components";

const columns = [
  {name: 'buyer_infor'},
  {name: 'item'},
  {name: 'variety'},
  {name: 'quality'},
  {name: 'size'},
]

const rows = [
  {
    item: 'item_1',
    variety: 'level_1',
    size: 'size_1',
    quality: 'A'
  },
  {
    item: 'item_2',
    variety: 'level_2',
    size: 'size_2',
    quality: 'B'
  },
  {
    item: 'item_3',
    variety: 'level_3',
    size: 'size_3',
    quality: 'C'
  },
]

export default function () {

  return (
    <>
      <FEditable columns={columns} rows={rows}/>
    </>
  )
}