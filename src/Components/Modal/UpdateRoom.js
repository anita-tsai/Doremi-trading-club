import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import ImageUploader from "react-images-upload";

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


import TagsBar from '../TagsBar';
import './picture.css'; 

const Text = styled(Typography)`
`
const Subtitle = styled.p`
  font-size: 10px;
  color: rgba(0, 0, 0, 0.54);
`

const TextWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  *{
    width: 100%;
  }  
`

const Tags = styled.div`
`

const TagWrapper = styled.div`
`

const ImgWrapper = styled.div`
  *{
    width: 375px;
  }
`

const categories = [
  '交換',
  '出售',
  '徵求',
  '聊天',
  '競標',
]

const categoryMap = {
  1: "出售",
  2: "徵求",
  3: "交換",
  4: "聊天",
  5: "競標"
}

const UpdateRoom = (props) => { 
  const { 
    handleClose,
    data,  // from RoomPage -> setData: call getRoomById
  }=props
  
  let history = useHistory()

  const [tag1, setTag1] = useState(null)
  const [tag2, setTag2] = useState(null)
  const [tags, setTags] = useState(data.tags)
  const [titles, setTitles] = useState(data.title)
  const [contents, setContents] = useState(data.content)


  const onTagUpdate1 = (option1) => {
    setTag1(option1)
  }

  const onTagUpdate2 = (option2) => {
    setTag2(option2)
  }

  const [pictures, setPictures] = useState([]);
  const [base64Pictures, setBase64Pictures] = useState([]);

  
  const onDrop = pictureList => {
    // todo: enhance check if delete or not

    if(pictureList.length < pictures.length) {
      // delete case
      setPictures(pictureList)
    } else {
      // add case
      setPictures([...pictures, ...pictureList]);
    }
    
  };

  // type contents
  const onContentChange = (event) => {
    setContents(event.target.value)
  }

  // type titles
  const onTitleChange = (event) => {
    setTitles(event.target.value)
  }

  // to get name/token from redux
  const { username, token } = useSelector(state => {
    return {
      username: state.userLogin.name,
      token: state.userLogin.token
    }
  })

  
  useEffect(() => {
    // url -> file
    const createFile = async (url) => {
      let response = await fetch(url);
      let data = await response.blob();
      let metadata = {
        type: 'image/jpeg'
      };
      let file = new File([data], "test.jpg", metadata);
      return file
    }
    const fn = async () => {
      const tasks = data.images.map(async (url) => {
        const file = await createFile(`http://localhost:4000/${url}`);
        return file
      });
      const result = await Promise.all(tasks)
      setPictures(result)
    }
    fn();
  }, [data.images])

  useEffect(() => {
    // file -> base64
    const fn = async () => {
      const tasks = pictures.map((file) => {
        // transform file to image base64
        return new Promise((resolve, reject) => {
          const reader = new FileReader();

          reader.onload = function (e) {
            let dataURL = e.target.result;
            resolve({file, dataURL});
          };
          reader.readAsDataURL(file);
        })
      });
      const results = await Promise.all(tasks);
      setBase64Pictures(results.map(d => d.dataURL))
    }
    fn();
  }, [pictures])


  // update the room
  const onRoomChange = async() => {
    await axios.put(
      `http://localhost:4000/rooms/${data.id}`,
      {
        content: contents,
        title: titles,
        images: base64Pictures,
        tags: tags
      },
      {
        headers: {
          "Authorization": 'Bearer ' + token
        }
      }
    )
    history.push("/");

    handleClose();

  }


  return(
      <Dialog
        keepMounted={false}
        open={true}
        onClose={handleClose}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle 
          id="scroll-dialog-title"
        >
          編輯房間
        </DialogTitle>
        <DialogContent dividers={true}>
        <Subtitle>房間類別(要修改類別請重新開立新房間）</Subtitle>
          <ButtonGroup 
            size="large" 
            variant="contained" 
            color="default" 
            aria-label="contained primary button group"
          >
            { categories.map((c) => {
              return (
              <Button
                color={categoryMap[data.category_id] === c ? 'primary' : 'default'}
              >
                {c}
              </Button>
              )})
            }            
          </ButtonGroup>
          <Subtitle>房間規範</Subtitle>
          <Card variant="outlined">
            <CardContent>
              <Text variant="h6" component="h2">
                使用本工具請遵守「平台規範」
              </Text>
              <Text variant="subtitle2">
                設置聊天標籤的房間，禁止以任何形式進行交易
              </Text>
              <Text variant="subtitle2">
                需詳細寫出品項、交易金額、交易方式（是否收包材）
              </Text>
            </CardContent>
          </Card>
          <TextWrapper> 
            <TextField
              id="standard-full-width"
              label="房主名稱"
              defaultValue={username}
              disabled={true}
              style={{ margin: 8 }}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </TextWrapper>
          <TextWrapper> 
            <TextField
              id="standard-full-width"
              label="房間標題"
              value={titles}
              style={{ margin: 8 }}
              onChange={onTitleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </TextWrapper>
          <Subtitle>房間標籤：可下拉選單亦可自行輸入</Subtitle>
            <Tags>
              <TagsBar onChange1={onTagUpdate1} onChange2={onTagUpdate2} />
              <Button
                variant="contained"
                onClick={() => {
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
              
            </Tags>
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
          
          <Subtitle>項目圖片</Subtitle>
            <ImgWrapper>
              <ImageUploader
                withPreview={true}
                buttonText="選擇圖片"
                withIcon={true}
                onChange={onDrop}
                imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                maxFileSize={5242880}
                label=""
                defaultImages={base64Pictures}
              />
              
            </ImgWrapper>
          <Subtitle>房間內文</Subtitle>
            <TextField
              id="filled-multiline-static"
              multiline
              rows={15}
              variant="filled"
              fullWidth
              onChange={onContentChange}
              value={contents}
            />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="secondary">
            取消編輯
          </Button>
          <Button onClick={onRoomChange} variant="contained" color="primary">
            確認編輯
          </Button>
        </DialogActions>
      </Dialog>
  )
}


export default UpdateRoom;