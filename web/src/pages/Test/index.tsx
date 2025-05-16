import {FEditable} from "../../components";
import {useState} from "react";

const columns = [
  {
    name: 'assign_type',
    header: true,
    items: [
      {id: 1, name: '注文', code: 1, search_str: '注文|1'},
      {id: 2, name: 'セリ', code: 2, search_str: 'セリ|2'},
      {id: 3, name: '依頼', code: 2, search_str: '依頼|3'},
      {id: 4, name: '定期', code: 2, search_str: '定期|4'},
      {id: 5, name: '買付', code: 2, search_str: '買付|5'},
      {id: 6, name: '卸', code: 2, search_str: '卸|6'},
      {id: 7, name: '小売', code: 2, search_str: '小売|7'}
    ],
    dropdown: true, // true: dropdown box, false: input
  },
  {
    name: 'buyer_info',
    isActive: true,
    enterSkip: false,
    showTooltip: false,
    showLess: false
  },
  {
    name: 'item',
    header: true,
    items: [
      {id: 1, name: 'カトレア 切', code: 1, search_str: 'カトレア 切|1'},
      {id: 2, name: 'カトレア 鉢', code: 2, search_str: 'カトレア 鉢|2'},
      {id: 3, name: 'ファレノ 切', code: 3, search_str: 'ファレノ 切|3'},
      {id: 4, name: 'ファレノ ツマミ', code: 4, search_str: 'ファレノ ツマミ|4'},
      {id: 5, name: 'ファレノ 大輪鉢', code: 5, search_str: 'ファレノ 大輪鉢|5'},
      {id: 6, name: 'ファレノ ミディ鉢', code: 6, search_str: 'ファレノ ミディ鉢|6'},
      {id: 7, name: 'その他の属', code: 7, search_str: 'その他の属|7'},
      {id: 8, name: 'ファレノブシス苗', code: 8, search_str: 'ファレノブシス苗|8'},
      {id: 9, name: 'フラスコ苗', code: 9, search_str: 'フラスコ苗|9'},
      {id: 10, name: '諸経費', code: 10, search_str: '諸経費|10'},
      {id: 11, name: '温室燃料費', code: 11, search_str: '温室燃料費|11'},
      {id: 12, name: '資材', code: 12, search_str: '資材|12'},
      {id: 13, name: '各種賃貸料', code: 13, search_str: '各種賃貸料|13'},
      {id: 14, name: '調整額', code: 14, search_str: '調整額|14'}
    ],
    dropdown: true,
  },
  {
    name: 'variety',
    header: true,
    items: [
      {id: 1, name: 'ハッピーストリーム', code: 1, search_str: 'ハッピーストリーム|1'},
      {id: 2, name: 'ハニールージュ', code: 2, search_str: 'ハニールージュ|2'},
      {id: 3, name: 'おぼろ月', code: 3, search_str: 'おぼろ月|3'},
      {id: 4, name: 'ビックリップ', code: 4, search_str: 'ビックリップ|4'},
      {id: 5, name: 'ハッピーライフ', code: 5, search_str: 'ハッピーライフ|5'},
      {id: 6, name: 'W', code: 6, search_str: 'W|6'},
      {id: 7, name: 'WR', code: 7, search_str: 'WR|7'},
      {id: 8, name: '花+宅配OP+運賃', code: 8, search_str: '花+宅配OP+運賃|8'},
      {id: 9, name: 'グリーン', code: 9, search_str: 'グリーン|9'},
      {id: 10, name: '濃ピンク', code: 10, search_str: '濃ピンク|10'},
      {id: 11, name: 'グリーンアース', code: 11, search_str: 'グリーンアース|11'},
      {id: 12, name: '黄大輪', code: 12, search_str: '黄大輪|12'},
      {id: 13, name: 'MIX', code: 13, search_str: 'MIX|13'},
      {id: 14, name: 'ハッピータイム', code: 14, search_str: 'ハッピータイム|14'},
      {id: 15, name: 'P', code: 15, search_str: 'P|15'},
      {id: 16, name: 'キャンディーピンク', code: 16, search_str: 'キャンディーピンク|16'},
      {id: 17, name: 'ホンリンローズ', code: 17, search_str: 'ホンリンローズ|17'},
      {id: 18, name: '桜姫', code: 18, search_str: '桜姫|18'}
    ],
    dropdown: true
  },
  {
    name: 'color',
    header: true,
    items: [
      {id: 1, name: '白', code: 1, search_str: '白|1'},
      {id: 2, name: 'ピンク', code: 2, search_str: 'ピンク|2'},
      {id: 3, name: '黄', code: 3, search_str: '黄|3'},
      {id: 4, name: '複色', code: 4, search_str: '複色|4'},
      {id: 5, name: 'ナシ', code: 5, search_str: 'ナシ|5'},
      {id: 6, name: '緑', code: 6, search_str: '緑|6'},
      {id: 7, name: 'グリーン', code: 7, search_str: 'グリーン|7'},
      {id: 8, name: '淡いピンク', code: 8, search_str: '淡いピンク|8'},
      {id: 9, name: 'オレンジ', code: 9, search_str: 'オレンジ|9'},
      {id: 10, name: '濃赤', code: 10, search_str: '濃赤|10'},
      {id: 11, name: '赤リップ', code: 11, search_str: '赤リップ|11'}
    ],
    dropdown: true
  },
  {
    name: 'quality',
    header: true,
    items: [
      {id: 1, name: 'A', code: 1, search_str: 'A|1'},
      {id: 2, name: 'B', code: 2, search_str: 'B|2'},
      {id: 3, name: 'C', code: 3, search_str: 'C|3'},
      {id: 4, name: 'D', code: 4, search_str: 'D|4'},
      {id: 5, name: '6号', code: 5, search_str: '6号|5'},
      {id: 6, name: '7号', code: 6, search_str: '7号|6'},
      {id: 7, name: 'サンクスポット', code: 7, search_str: 'サンクスポット|7'},
      {id: 8, name: '2.5号', code: 8, search_str: '2.5号|8'},
      {id: 9, name: 'ポット', code: 9, search_str: 'ポット|9'},
      {id: 10, name: '凛鉢', code: 10, search_str: '凛鉢|10'},
      {id: 11, name: 'まどか', code: 11, search_str: 'まどか|11'},
      {id: 12, name: 'かぐや', code: 12, search_str: 'かぐや|12'},
      {id: 13, name: '切り花BOX', code: 13, search_str: '切り花BOX|13'},
      {id: 14, name: 'ヴィーナスポット', code: 14, search_str: 'ヴィーナスポット|14'},
      {id: 15, name: '平鉢', code: 15, search_str: '平鉢|15'}
    ],
    dropdown: true
  },
  {
    name: 'size',
    header: true,
    items: [
      {id: 1, name: '7cm', code: 1, search_str: '7cm|1'},
      {id: 2, name: '8cm', code: 2, search_str: '8cm|2'},
      {id: 3, name: '9cm', code: 3, search_str: '9cm|3'},
      {id: 4, name: '10cm', code: 4, search_str: '10cm|4'},
      {id: 5, name: '11cm', code: 5, search_str: '11cm|5'},
      {id: 6, name: '12cm', code: 6, search_str: '12cm|6'},
      {id: 7, name: '13cm', code: 7, search_str: '13cm|7'},
      {id: 8, name: '8~9cm', code: 8, search_str: '8~9cm|8'},
      {id: 9, name: '10~11cm', code: 9, search_str: '10~11cm|9'},
    ]
  }
  ]
export default function () {

const [rows, setRows] = useState( [
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
])
const onInput =(value:any)=>{
  console.log(value)
}


  return (
    <>
      <FEditable columns={columns} rows={rows} onInput={onInput}/>
    </>
  )
}