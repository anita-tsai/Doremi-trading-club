import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ImageUploader from "react-images-upload";

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import _TextField from '@material-ui/core/TextField';
import UserBar from '../UserBar';

import DateChooser from '../DateChooser';
import './picture.css'; 

const TextField = styled(_TextField)`
  input {
    height: 30px;
  }
`

const Text = styled(Typography)`
`
const Subtitle = styled.p`
  font-size: 10px;
  color: rgba(0, 0, 0, 0.54);
`

const TextWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  // *{
  //   width: 100%;
  // }  
`


const ImgWrapper = styled.div`
  
  *{
    width: 375px;
  }
`



const SubmitBlackList = (props) => { 
  const { 
    handleClose,
    onSubmit,
  }=props
  
  const [users, setUsers] = useState([])

  
  const fn = async () => {
    const results = await axios.get('http://localhost:4000/users');
    setUsers(results.data);
    console.log('results.data', results.data)
  }

  const [titles, setTitles] = useState(null)
  const [eventTime, setEventTime] = useState(new Date())
  const [reasons, setReasons] = useState(null)
  const [notes, setNotes] = useState(null)
  const [reportedUser, setReported_user] = useState(null)
  const [pictures, setPictures] = useState([]);

  const onDrop = pictureList => {
    setPictures([...pictures, ...pictureList]);
  };

  // type titles
  const onTitleChange = (event) => {
    setTitles(event.target.value)
  }

  // type event_time
  const onEventTimeChange = (time) => {
    setEventTime(time)
  }

  // type reasons
  const onReasonChange = (event) => {
    setReasons(event.target.value)
  }

  // type note
  const onNoteChange = (event) => {
    setNotes(event.target.value)
  }

  // choose reported user
  const onReportedChange = (reported) => {
    setReported_user(reported)
  }
  

  // to get name/token from redux
  const { username, token } = useSelector(state => {
    return {
      username: state.userLogin.name,
      token: state.userLogin.token
    }
    
  })

  const submitBlacklist = async () => {
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
    console.log(results)
    
    // api
    console.log('token', token)
    const response = await axios
      .post(
        `http://localhost:4000/submitblacklist`,
        {
          "user_id": '',
          "title": titles,
          "event_time": eventTime,
          "reason": reasons,
          "note": notes,
          "reported_user_id": reportedUser.value,
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
    onSubmit();
  };

  
  useEffect(() => {
    fn();
  }, [])
  

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
          檢舉黑名單
        </DialogTitle>
        <DialogContent dividers={true}>
          <Subtitle>房間規範</Subtitle>
          <Card variant="outlined">
            <CardContent>
              <Text variant="h6" component="h2">
                使用本工具請遵守「平台規範」
              </Text>
              <Text variant="subtitle2">
                舉報內容請如實並詳細填寫，審核通過才予以發布
              </Text>
              <Text variant="subtitle2">
                不會於詐騙名單中公開舉報者姓名
              </Text>
            </CardContent>
          </Card>
          <Subtitle>檢舉對象：可下拉選單亦可輸入進行搜尋</Subtitle>
            <UserBar onChange={onReportedChange} data={users}></UserBar>
          <Subtitle>發生日期：若有先後順序可於下方事件經過詳述</Subtitle>
            <DateChooser onChange={onEventTimeChange} eventTime={eventTime}></DateChooser>
          <TextWrapper> 
            <TextField
              id="standard-full-width"
              label="簡短敘述檢舉原因"
              style={{ margin: 8 }}
              onChange={onTitleChange}
              fullWidth
              size='medium'
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </TextWrapper>
        
          <Subtitle>佐證圖片</Subtitle>
            <ImgWrapper>
              <ImageUploader
                withPreview={true}
                buttonText="選擇圖片"
                withIcon={true}
                onChange={onDrop}
                imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                maxFileSize={5242880}
                label=""
              />
            </ImgWrapper>
          <Subtitle>詳述事件經過</Subtitle>
            <TextField
            id="filled-multiline-static"
            multiline
            rows={12}
            variant="filled"
            fullWidth
            // Todo: text wrap
            onChange={onReasonChange}
            />

          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="secondary">
            取消建立
          </Button>
          <Button onClick={submitBlacklist} variant="contained" color="primary">
            確認建立
          </Button>
        </DialogActions>
      </Dialog>
  )
}


export default SubmitBlackList;