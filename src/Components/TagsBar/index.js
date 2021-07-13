import React from 'react';
import styled from 'styled-components';
import _CreatableSelect from 'react-select/creatable';



const RoleOptions = [
  {
    label: '變身器類',
    options: [
      { value: 'Transformer1', label: '一代變身器' },
      { value: 'Transformer2', label: '二代變身器' },
      { value: 'Transformer3', label: '三代變身器' },
      { value: 'Transformer4', label: '四代變身器' },
      { value: 'Transformer5', label: '小花變身器' },
    ]
  },
  {
    label: '人物類',
    options: [
      { value: 'Doremi', label: 'Doremi' },
      { value: 'Hazuki', label: '羽月' },
      { value: 'Aiko', label: '小愛' },
      { value: 'Onpu', label: '音符' },
      { value: 'Momoko', label: '小桃子' },
      { value: 'Hana', label: '小花' },
      { value: 'Bobo', label: '泡泡' },
      { value: 'Group', label: '全員' },
      { value: 'MajoRika', label: '魔女莉卡' },
      { value: 'Magician', label: '老頭阿迪' },
    ]
  },
  {
    label: '精靈類',
    options: [
      { value: 'dodo', label: '多多' },
      { value: 'rere', label: '蕾蕾' },
      { value: 'mimi', label: '咪咪' },
      { value: 'lolo', label: '樂樂' },
      { value: 'nini', label: '妮妮' },
      { value: 'bean', label: '豆豆' },
      { value: 'fafa', label: '發發' },
      { value: 'lala', label: '拉拉' },
    ]
  },
  {
    label: '波隆類',
    options: [
      { value: 'Pron1', label: '貝貝魯多' },
      { value: 'Pron2', label: '克魯魯' },
      { value: 'Pron3', label: '皇家使者' },
      { value: 'Pron4', label: '花香' },
      { value: 'Pron5', label: '寶石' },
    ]
  }
]

const ItemOptions = [
  {
    label: '贈品類',
    options: [
      { value: 'Freebie', label: '滿額' },
      { value: 'stage', label: '魔幻舞台' },
      { value: 'hanaStandee', label: '小花健康檢查立牌' },
      { value: 'magicFolder', label: '五人滿額資料夾' },
      { value: 'hanaManual', label: '小花健康檢查手冊' },
    ]
  },
  {
    label: '壓克力類',
    options: [
      { value: '99standee', label: '99立牌' },
      { value: '99chain', label: '99壓克力吊飾' },
      { value: '99theme', label: '99場景吊飾' },
      { value: 'phoneStand', label: '壓克力手機架' },
      { value: 'combination stand', label: '組合立牌' },
    ]
  },
  {
    label: '絨毛布偶類',
    options: [
      { value: 'rikadoll', label: '莉卡大娃娃' },
      { value: 'fairy', label: '精靈娃娃吊飾' },
      { value: 'magicHat', label: '魔法帽小吊飾' },
      { value: 'wallet', label: '絨毛零錢包' },
      { value: 'headPillow', label: '大頭抱枕' },
      { value: 'clothdPillow', label: '便服變身服兩面抱枕' },
      { value: 'TransformerPillow', label: '變身器抱枕' },
      { value: 'PronPillow', label: '波隆抱枕' },
      { value: 'HatPillow', label: '魔法帽抱枕' },
      { value: 'NeckPillow', label: '頸枕' },
      
    ]
  },
  {
    label: '金屬吊飾及飾品類',
    options: [
      { value: 'metalPin', label: 'Demo 金屬胸章' },
      { value: 'keyChain', label: '金屬透明鑰匙圈' },
      { value: 'metalChain1', label: '金屬吊飾（佛牌）' },
      { value: 'metalChain2', label: '日本妖精金屬吊飾' },
      { value: 'magicBall', label: '魔法球吊飾' },
      { value: '99badge', label: '99隨機胸章' },
      { value: 'hairpin', label: '髮夾' },
      { value: 'bracelet', label: '手鍊' },
      { value: 'necklace', label: '項鍊' },
      { value: 'earring', label: '耳環' },
    ]
  },
  {
    label: '3C產品類',
    options: [
      { value: 'charging board', label: '充電盤' },
      { value: 'portable charger', label: '行動電源' },
      { value: 'usb', label: '波隆造型USB' },
    ]
  },
  {
    label: '文具用品、紙製品類',
    options: [
      { value: 'collectionCard', label: '集章卡' },
      { value: 'character card', label: '角色卡片' },
      { value: 'stamp', label: '郵票' },
      { value: 'passport', label: '證件套' },
      { value: 'clip', label: '文具夾' },
      { value: 'notebook', label: '筆記本' },
      { value: 'memo', label: '便條紙' },
      { value: 'postcard', label: '明信片' },
      { value: 'redEnvelop', label: '紅包袋' },
      { value: 'poker', label: '撲克牌' },
      { value: 'sticker', label: '防水貼紙' },
      { value: 'folder', label: '資料夾' },
      { value: 'puzzle', label: '拼圖' },
      { value: 'poster', label: '海報' },
      { value: 'calender', label: '手帳行事曆' },
      { value: 'magnet', label: '磁鐵' },
      
    ]
  },
  {
    label: '生活用品類',
    options: [
      { value: 'mask', label: '口罩' },
      { value: 'blanket', label: '冷氣毯' },
      { value: 'umbrella', label: '雨傘' },
      { value: 'mirror', label: '鏡子' },
      { value: 'fragrance', label: '擴香棒' },
      { value: 'plate', label: '盤子' },
      { value: 'mug', label: '馬克杯' },
      { value: 'putin cup', label: '布丁杯' },
      { value: 'thermos', label: '保溫瓶' },
      { value: 'coaster', label: '杯墊' },
      { value: 'straw', label: '玻璃吸管' },
      { value: 'paperCover', label: '面紙套' },
      { value: 'carpet', label: '地墊' },
      { value: 'tower', label: '毛巾' },
      { value: 'bath tower', label: '浴巾' },
      { value: 'laundry bag', label: '洗衣袋' },
      { value: 'apron', label: '圍裙' },
      { value: 'slippers', label: '拖鞋' },
      { value: 'blindfold', label: '眼罩' },

    ]
  },
  {
    label: '服飾配件類',
    options: [
      { value: 'baby clothes', label: '包屁衣' },
      { value: 'hat', label: '老帽' },
      { value: 't-shirt', label: 'Ｔ恤' },
      { value: 'circle bag', label: '圓形側背包' },
      { value: 'metal bag', label: '側背鍊條包' },
      { value: 'beverage bag', label: '飲料袋' },
      { value: 'shopping bag', label: '購物袋' },
      { value: 'cosmetic bag', label: '化妝包' },
    ]
  },
 
]

const CreatableSelect = styled(_CreatableSelect)`
  width: 50%;
`



const TagsBar = ({ onChange1, onChange2 }) => {
  
  return(
    <>
      <CreatableSelect
        isClearable
        onChange={onChange1}
        // onInputChange={this.handleInputChange}
        options={RoleOptions}
        placeholder="角色類別"
      />
      <CreatableSelect
        isClearable
        onChange={onChange2}
        // onInputChange={this.handleInputChange}
        options={ItemOptions}
        placeholder="品項類別"
      />
       
    </>
  )
}


export default TagsBar;