import React from 'react';
import styled from 'styled-components';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';


const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  > * {
    margin-right: 10px;
    margin-top: 5px;
    margin-bottom: 2px;
  }
`

const ContentWrapper = styled.div`
  
`


const Category = ({ text }) => {
  
  return (
    <div>
    <Chip
        icon={<FaceIcon />}
        label={text}
        color="primary"
        variant="outlined"
      />
  </div>
  )
}

const Tag = ({ data }) => {
  return (
    <div>
      <Chip
        label={data}
        variant="outlined"
      />
  </div>
  )
}

const Content = ({ data }) => {
  console.log(data) // full content string
  // todo: split the string to array by '\n'
  const lines = data.split("\n")
  // console.log(lines)
  return (
    <>
      {
        lines.map(d => {
          // console.log('d'+d)
          return <Typography>{d}</Typography>
        })
      }
    
      {/* <Typography>
        {lines[0]}
      </Typography>
      <Typography>
        {lines[1]}
      </Typography>
      <Typography>
        {lines[2]}
      </Typography> */}
    </>
  )
}

const CardContents = ({ data }) => {
  const {
    tags,
    content,
    category_name
  }=data

  return(
    <>
      <CardContent>
        <Category text={category_name}/>
        <TagWrapper>
          {
          tags.map((tag) => {
            return <Tag data={tag}/>
          })
        }
        </TagWrapper>
        <ContentWrapper>
          <Content data={content} />
        </ContentWrapper>
      </CardContent>
    </>
  )
}


export default CardContents;