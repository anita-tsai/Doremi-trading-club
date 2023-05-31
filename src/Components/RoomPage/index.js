import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment';


import { Button } from '@material-ui/core';
import _Card from '@material-ui/core/Card';
import _CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import CardActions from '@material-ui/core/CardActions';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import _ImageGallery from 'react-image-gallery';
import _Paper from '@material-ui/core/Paper';
import ShareIcon from '@material-ui/icons/Share';
import SendIcon from '@material-ui/icons/Send';
import _Typography from '@material-ui/core/Typography';
import UpdateRoom from '../Modal/UpdateRoom';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';

import {
  Link,
} from "react-router-dom";



const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > div:first-child {
    margin-bottom: 50px;
    margin-top: 100px;
  }
`
const TextWrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
`

const DateWrapper1 = styled.div`
  font-size: 15px;
  color: gray;
  margin-right: 3%;
  width: 30%;
`

const DateWrapper2 = styled.div`
  font-size: 15px;
  color: #AA0000;
  margin-right: 3%;
  width: 30%;
`

const ContentWrapper1 = styled.div`
  font-size: 15px;
  width: 70%;
`

const ContentWrapper2 = styled.div`
  font-size: 15px;
  width: 70%;
  color: #AA0000;
`

const Card = styled(_Card)`
  width: 800px;
  text-align: center;
  // height: 1000px;
`


const BackWrapper = styled.div`
  // > button {
  //   width: 100%;
    
  // }
  display: flex;
  justify-content: center;
`

const ButtonWrapper = styled.div`
  width: 200px;
  display: flex;
  justify-content: space-between;
`

const TitleWrapper = styled.div`
  display: flex;
  justify-content: left;
  margin-left: 50px;
  margin-right: 50px;

`

const Title = styled.div`
  display: flex;
  justify-content: left;
  padding-bottom: 10px;
  padding-top: 10px;
  margin-bottom: 11px;
  font-size: 30px;
`

const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  margin-left: 50px;
  margin-right: 50px;
`

const Typography = styled(_Typography)`
  display: flex;
  justify-content: left;
  font-size: 10px;
  margin-left: 50px;
  margin-right: 50px;
  color: gray;
  width: 100%;
  
`


const CardContent = styled(_CardContent)`
  width: calc(100% - 60px);
  min-height: 200px;
  padding: 50px;
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 50px;
  background-color: #f6f6f6 !important;
`

const Text = styled.div`
  line-height: 1.5;
  display: flex;
  justify-content: left;
  color: gray;
`

const CollapseWrapper = styled.div`
  border-style: groove;
  border-width: 2px;
  border-radius: 6px ;
  height: 500px !important;
  width: 600px;
  overflow-y: scroll !important;
  overflow-x: hidden;

`



const ImageGallery = styled(_ImageGallery)`
  height: 0;
  padding-top: 56.25%;
  
`

const ShareWrapper = styled.div`
`

const Paper = styled(_Paper)`
  padding: 2px 4px;
  display: flex;
  align-items: center;
  justify-content: flex-end; 
  width: 600px;
  height: 40px;
  > *:first-of-type {
    width: 100%;
  }
`

const IconWrapper = styled.div`
  padding: 10px;

`

const DeleteWrapper = styled.div`
  display: flex;
  justify-content: left;
  margin-left: 50px;
  margin-right: 50px;
  margin-bottom: 20px;
`


const RoomPage = ({ match }) => {

  const baseURL = "http://localhost:4000/dialogs";
  let history = useHistory();
  const [data, setData] = useState(undefined)
  const [contents, setContents] = useState(undefined)  
  const [dialogs, setDialogs] = useState([])
  const [on, setOn] = React.useState(false)
  const inputEl = useRef(null);
  const messagesRef = useRef(null)
  const [alter, setAlter] = React.useState(false);


  const {
    images = [],
    title,
    name,
    create_time,
    content = '',
    isOwner,
    user_id,
    isLike,
    likeAmount,
  } = (data || {})


  // to get name/token from redux
  const { token } = useSelector(state => {
    return {
      token: state.userLogin.token
    }  
  })

  // api: to get dialogs
  const fetchDialogs = async () => {
    const results = await axios.get(
      `http://localhost:4000/rooms/${match.params.id}/dialogs`,
      {
        headers: {
          "Authorization": 'Bearer ' + token
        }
      }
    );
    setDialogs(results.data);
  }

  // api: delete the room
  const onStatusChange = async() => {
    await axios.put(
      `http://localhost:4000/rooms/${match.params.id}/status`,
      {
        status: 2
      },
      {
        headers: {
          "Authorization": 'Bearer ' + token
        }
      }
    )
    history.push("/");

  }

  // type contents
  const onContentChange = (event) => {
    setContents(event.target.value)
  }

  const handleClickOpen = () => {
    setOn(true);
  };

  const handleClickClose = () => {
    setOn(false);
  };



  // alter the room
  const alterOpen = () => {
    setAlter(true);
  };

  const alterClose = () => {
    setAlter(false);
  };

  const getRoomData = async () => {
    const results = await axios.get(`http://localhost:4000/rooms/${match.params.id}` ,
      {
        headers: {
          "Authorization": 'Bearer ' + token
        }
      }
    );
    setData(results.data);
  }

  // api: to get the room
  useEffect(() => {
    getRoomData();
    fetchDialogs();
  }, [])

  

  // api: to type dialogs
  const createText = async () => {
    if (contents.trim().length === 0) {
      return
    } else {
      await axios
      .post(
        `${baseURL}`,
        {
          "content": contents,
          "room_id": match.params.id
        },
        {
          headers: {
            "Authorization": 'Bearer ' + token
          }
        }
      )
      setContents('')
      fetchDialogs();
    }
    
  };
  

  useEffect(() => {
    fetchDialogs();
  }, [])


  // to copy the room's url
  const [state, setState] = useState({
    open: false,
    Transition: Fade,
  });

  const handleClick = (Transition) => () => {
    navigator.clipboard.writeText(window.location.href)
    setState({
      open: true,
      Transition,
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };


  const onLikeChange = async() => {
    // call api
    await axios.put(
      `http://localhost:4000/rooms/${match.params.id}/like`,
      {},
      {
        headers: {
          "Authorization": 'Bearer ' + token
        }
      }
    )
    getRoomData();

  }


  // scroll to the bottom
  const scrollToBottom = () => {
    if (messagesRef && messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current?.scrollHeight;
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [JSON.stringify(dialogs)]);


  const lines = content.split("\n")
  
  if (!data) {
    return <div>Loading</div>
  }
  return(
    <Wrapper>
      <Card>
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
        
        <TitleWrapper>
          <Title>
            {title}
          </Title>
          
          <CardActions disableSpacing>
            <IconButton 
              onClick={onLikeChange}
              aria-label="add to favorites"
            >
              <FavoriteIcon
                color={isLike ? 'secondary' : 'default'}
              />
            </IconButton>
            <IconButton aria-label="share" fontSize="large">
              <ShareIcon onClick={handleClick(Fade)}/>
            </IconButton>
          </CardActions>
        </TitleWrapper>

        {isOwner
          ? <DeleteWrapper>
              <ButtonWrapper>
                <Button variant="contained" onClick={handleClickOpen}>
                  刪除房間
                </Button>
                <Button variant="contained" onClick={alterOpen} color="primary">
                  編輯房間
                </Button>
              </ButtonWrapper>
              <Dialog
                open={on}
                onClose={handleClickClose}
                aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle id="responsive-dialog-title">{"確認是否刪除此房間"}</DialogTitle>
                <DialogActions>
                  <Button autoFocus onClick={handleClickClose} color="primary">
                    取消
                  </Button>
                  <Button onClick={onStatusChange} color="primary" autoFocus>
                    確認
                  </Button>
                </DialogActions>
              </Dialog>
            </DeleteWrapper>
          : null
        }
        <InfoContent>
          <Typography>
            房主名稱:{name}
          </Typography>
          <Typography>
            按讚次數: {likeAmount}
          </Typography>
          <Typography>
            開房時間:{`${moment(create_time).format('YYYY-MM-DD HH:mm:ss')}`}
          </Typography>
          <Typography>
            房間內文:
          </Typography>
        </InfoContent> 

        <CardContent>
          {
            lines.map(d => {
              return <Text>{d}</Text>
            })
          }
        </CardContent>

      </Card>

      <ShareWrapper>
        <Snackbar
          open={state.open}
          onClose={handleClose}
          TransitionComponent={state.Transition}
          message="已成功複製網址"
          key={state.Transition.name}
          autoHideDuration={1000}
        />
      </ShareWrapper>
      
      
      <Link to="/">
        <BackWrapper>
          <Button variant="contained" color="primary">
            回到首頁
          </Button>
        </BackWrapper>
      </Link>

      


      <Collapse
        in={true}
        timeout="auto"
        unmountOnExit
        ref={inputEl}
      >
        
        <CollapseWrapper ref={messagesRef}>
          { dialogs.map(text => {
              return (
                <TextWrapper>
                  {user_id !== text.user_id
                  ? <DateWrapper1>
                      {`${moment(text.create_time).format('YYYY-MM-DD HH:mm:ss')}`}
                    </DateWrapper1>
                  : <DateWrapper2>
                      {`${moment(text.create_time).format('YYYY-MM-DD HH:mm:ss')}`}
                    </DateWrapper2>}
                  {user_id !== text.user_id
                    ? <ContentWrapper1>
                        {`${text.name} : ${text.content}`}
                      </ContentWrapper1>
                    : <ContentWrapper2>
                        {`${text.name} : ${text.content}`}
                      </ContentWrapper2>}
                </TextWrapper>
              )
            })
          }
        </CollapseWrapper>
        
      
        <br />

        <Paper component="form">
          <InputBase
            placeholder="輸入內容"
            inputProps={{ 'aria-label': '輸入內容' }}
            onChange={onContentChange}
            value={contents}
          />
          <IconWrapper>
            <IconButton aria-label="send">
              <SendIcon onClick={createText}/>
            </IconButton>
          </IconWrapper>
        </Paper>
      </Collapse>
      { alter
        ? <UpdateRoom
          handleClose={alterClose}
          data={data}
        /> : null
      }
    </Wrapper>
    
  )
}


export default RoomPage;