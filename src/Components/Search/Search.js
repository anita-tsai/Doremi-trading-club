import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';

import SearchBar from '../SearchBar';
import LabelBar from '../LabelBar';
import TagsBar from '../TagsBar';

const Title = styled.p`
  text-align: center;
  font-size: 20px;
  margin-bottom: 10px;
`

const TagWrapper = styled.div`
`

const Search = ({ setCategory, category, content, setContent, tags, setTags }) => {
  const rooms = useSelector(state => state.rooms)

  const [tag1, setTag1] = useState(null)
  const [tag2, setTag2] = useState(null)

  const onTagUpdate1 = (option1) => {
    setTag1(option1)
  }

  const onTagUpdate2 = (option2) => {
    setTag2(option2)
  }
  
  return (
    <div>
      <Title>
        在線房間：{rooms.length}
      </Title>
      <SearchBar content={content} setContent={setContent} />
      <LabelBar category={category} setCategory={setCategory} />
      <TagsBar onChange1={onTagUpdate1} onChange2={onTagUpdate2}/>
      <Button
        variant="contained"
        onClick={() => {
          console.log(tag1, tag2)
          const tag = [tag1, tag2].reduce((cal, val) => {
            if (val) {
              return [...cal, val.label]
            }
            return cal
          }, []).join(' ')
          setTags([...tags, tag]) 
          }
        }
      >
        產生標籤
      </Button>
      <TagWrapper>
        {
          tags.map((tag) => {
            return (
              <div>
                <Chip
                  label={tag}
                  variant="outlined"
                  clickable
                  onDelete={() => {
                    const newTags = tags.filter((t) => t !== tag )
                    setTags(newTags)
                  }}
                />
              </div>
            ) 
          })
        }
      </TagWrapper>

      < br />
      < br />
      < br />
    </div>
  )

}


export default Search;