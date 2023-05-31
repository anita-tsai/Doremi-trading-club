import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const Label = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
`

const categories = [
  '交換',
  '出售',
  '徵求',
  '聊天',
  '競標',
]


const LabelBar = ({ category, setCategory }) => {

  // click category
  const onCategoryChange = (category) => {
    setCategory(category)
  }

  return(
    <Label>
      <ButtonGroup 
        size="large" 
        variant="contained" 
        color="default" 
        aria-label="contained primary button group"
      >
        { categories.map((c, index) => {
          console.log(category)
          return <Button
            color={category === c ? 'primary' : 'default'}
            onClick={() => {
              onCategoryChange(category === c ? undefined : c)
            }}
          >{c}</Button>
        })}
      </ButtonGroup>
    </Label>
  )
}

export default LabelBar;