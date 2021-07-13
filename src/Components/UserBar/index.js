import React, { Fragment } from 'react';
import Select from 'react-select';




const RoleOptions = [
  {
    label: '變身器類',
    options: [
      { value: 'userId1', label: 'Anita' },
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

const UserBar = ({ onChange }) => {

  return (
    <Fragment>
      <Select
        className="basic-single"
        classNamePrefix="對象名稱"
        placeholder="對象名稱"
        onChange={onChange}
        //defaultValue={RoleOptions[0]}
        isClearable={true}
        isSearchable={true}
        name="color"
        options={RoleOptions}
        noOptionsMessage={() => '查無此名稱'}
      />
    </Fragment>
  );
}

export default UserBar;