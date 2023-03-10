import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

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


import ImageUploader from "react-images-upload";
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
    handleClose 
  }=props
  
  const [users, setUsers] = useState([])

  
  const fn = async () => {
    const results = await axios.get('http://localhost:4000/users');
    setUsers(results.data);
    console.log('results.data', results.data)
  }

  const [titles, setTitles] = useState(null)
  const [eventTime, setEventTime] = useState(null)
  const [reasons, setReasons] = useState(null)
  const [notes, setNotes] = useState(null)
  const [reportedUser, setReported_user] = useState(null)
  const [pictures, setPictures] = useState([]);

  console.log('pic',pictures)
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
    console.log('state', state)
    console.log('state.userLogin', state.userLogin.name)
    console.log('state.login', state.userLogin.login)
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
        `$http://localhost:4000/submitblacklist`,
        {
          "user_id": '',
          "title": titles,
          "event_time": eventTime,
          "reason": reasons,
          "note": notes,
          "name": reportedUser.value,
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
    console.log(response)
    
    handleClose();
    fn();
    
    // setPictures([...pictures, ...results]);
    // console.log(results.map(d => d.dataURL));
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
          ???????????????
        </DialogTitle>
        <DialogContent dividers={true}>
        {/* <Subtitle>????????????</Subtitle>
          <ButtonGroup 
            size="large" 
            variant="contained" 
            color="default" 
            aria-label="contained primary button group"
          >
            { categories.map((c) => {
              return <Button
                color={category === c ? 'primary' : 'default'}
                onClick={() => onCategoryChange(c)}
              >{c}</Button>
            })}
          </ButtonGroup> */}
          <Subtitle>????????????</Subtitle>
          <Card variant="outlined">
            <CardContent>
              <Text variant="h6" component="h2">
                ??????????????????????????????????????????
              </Text>
              <Text variant="subtitle2">
                ??????????????????????????????????????????????????????????????????
              </Text>
              <Text variant="subtitle2">
                ?????????????????????????????????????????????
              </Text>
            </CardContent>
          </Card>
          <Subtitle>??????????????????????????????????????????????????????</Subtitle>
            <UserBar onChange={onReportedChange}></UserBar>
          <Subtitle>???????????????????????????????????????????????????????????????</Subtitle>
            <DateChooser onChange={onEventTimeChange}></DateChooser>
          <TextWrapper> 
            <TextField
              id="standard-full-width"
              label="????????????????????????"
              style={{ margin: 8 }}
              onChange={onTitleChange}
              // placeholder="Placeholder"
              // helperText="Full width!"
              fullWidth
              size='medium'
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </TextWrapper>
        
          <Subtitle>????????????</Subtitle>
            <ImgWrapper>
              <ImageUploader
                withPreview={true}
                buttonText="????????????"
                withIcon={true}
                onChange={onDrop}
                imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                maxFileSize={5242880}
                label=""
              />
              
              {/* { pictures.map((p) => {
                  return <img src={p.dataURL} />
              })} */}
            </ImgWrapper>
          <Subtitle>??????????????????</Subtitle>
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
            ????????????
          </Button>
          <Button onClick={submitBlacklist} variant="contained" color="primary">
            ????????????
          </Button>
        </DialogActions>
      </Dialog>
  )
}


export default SubmitBlackList;