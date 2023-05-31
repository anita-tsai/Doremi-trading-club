import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
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
import _TextField from '@material-ui/core/TextField';

import TagsBar from '../TagsBar';
import './picture.css';  // for ImageUploader

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

const TextField = styled(_TextField)`
  input {
    height: 30px;
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

const CreateRoom = ({ handleClose }) => { 
  const dispatch = useDispatch()
  // when create a new room, in order to get the room just created
  const fn = async () => {
    const results = await axios.get('http://localhost:4000/rooms');
    dispatch({ type: 'SET_ROOMS', payload: results.data })
  }

  const baseURL = "http://localhost:4000/room";

  const [tag1, setTag1] = useState(null)
  const [tag2, setTag2] = useState(null)
  const [tags, setTags] = useState([])
  const [titles, setTitles] = useState(null)
  const [contents, setContents] = useState(null)
  const [category, setCategory] = useState(null)
  const [pictures, setPictures] = useState([]);

  const onTagUpdate1 = (option1) => {
    setTag1(option1)
  }

  const onTagUpdate2 = (option2) => {
    setTag2(option2)
  }

  // choose picture
  const onDrop = (pictureList) => {
    setPictures([...pictures, ...pictureList]);
  };

  // type contents
  const onContentChange = (event) => {
    setContents(event.target.value)
  }

  // type titles
  const onTitleChange = (event) => {
    setTitles(event.target.value)
  }

  // click category
  const onCategoryChange = (category) => {
    setCategory(category)
  }



  // to get name/token from redux
  const { username, token } = useSelector(state => {
    return {
      username: state.userLogin.name,
      token: state.userLogin.token
    }
    
  })

  const createRoom = async () => {
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
    
    // api
    const response = await axios
      .post(
        `${baseURL}`,
        {
          "user_id": '',
          "title": titles,
          "category": category,
          "content": contents,
          "tags": tags,
          "images": results.map((img) => {
            return img.dataURL
            
          })
        },
        {
          headers: {
            "Authorization": 'Bearer ' + token
          }
        }
    )
        
    handleClose();
    fn();
  };

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
          創建新房間
        </DialogTitle>
        <DialogContent dividers={true}>
          <Subtitle>房間類別</Subtitle>
            <ButtonGroup 
              size="large" 
              variant="contained" 
              color="default" 
              aria-label="contained primary button group"
            >
              { categories.map((c) => {
                return (
                  <Button
                    color={category === c ? 'primary' : 'default'}
                    onClick={() => onCategoryChange(c)}
                  >
                    {c}
                  </Button>
                )
                })
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
              style={{ margin: 8 }}
              disabled={true}
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
                  const newTag = [...tags, tag]
                  setTags(newTag)
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
                imgExtension={[".jpg","jpeg",  ".gif", ".png", ".gif"]}
                maxFileSize={5242880}
                label=""
              />
            </ImgWrapper>
          <Subtitle>房間內文</Subtitle>
            <TextField
              id="filled-multiline-static"
              multiline
              rows={15}
              variant="filled"
              fullWidth
              // Todo: text wrap
              onChange={onContentChange}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="secondary">
            取消建立
          </Button>
          <Button onClick={createRoom} variant="contained" color="primary">
            確認建立
          </Button>
        </DialogActions>
      </Dialog>
  )
}


export default CreateRoom;