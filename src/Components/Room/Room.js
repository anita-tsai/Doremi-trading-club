import React from 'react';
import styled from 'styled-components';
import _Card from '@material-ui/core/Card';
import _ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import Header from '../Header';
import CardContents from '../CardContents';


import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Card = styled(_Card)`
  width: 100%;
`

const ImageGallery = styled(_ImageGallery)`
  height: 0;
  padding-top: 56.25%;
  
`

const ButtonWrapper = styled.div`
  > button {
    width: 90%;
    
  }
  display: flex;
  justify-content: center;
`

const Title = styled.div`
  display: flex;
  justify-content: center;
  background-color: #403d3d;
  color: #fff;
  padding-bottom: 10px;
  padding-top: 10px;
  margin-bottom: 11px;
  font-size: 20px;
`

const Room = ({ data }) => {
  const {
    avatar,
    name,
    publishDate,
    images,
    id,
    title,
  } = data

  const { login } = useSelector(state => {
    return {
      login: state.userLogin.login
    }
  })
  return (
    <Card>
      
      <Header
        avatar={avatar}
        name={name}
        publishDate={publishDate}
      />

      <Title>
        {title}
      </Title>

      <ImageGallery
        items={images.map(image => {
          const url = `http://localhost:4000/${image}`
          return {
            original: url,
            thumbnail: url,
            originalHeight: 300,
            thumbnailHeight: 50,
          }
        })}
        showFullscreenButton={false}
        showIndex={true}
        showPlayButton={false}
      />
      
      <CardContents data={data} />
      { login ? 
        <Link to={`/rooms/${id}`}>
          <ButtonWrapper>
            <Button 
              variant="contained" 
              color="primary" 
            >
              加入房間
            </Button>
          </ButtonWrapper>
        </Link> 
        : 
        <Link to="/signin">
          <ButtonWrapper>
            <Button 
              variant="contained" 
              color="primary"
            >
              加入房間
            </Button>
          </ButtonWrapper>
        </Link> 
      }
      {/* <CardActs /> */}
      
      <br />
      <br />
      <br />
    </Card>
  );
}


export default Room;