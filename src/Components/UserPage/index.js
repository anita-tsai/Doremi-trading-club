import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import _Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import _ButtonBase from '@material-ui/core/ButtonBase';
import { Button } from '@material-ui/core';


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  // align-items: center;
  justify-content: center;
  width: 600px;
  
  > div {
    margin: 10px;
    margin-left: 100px;
  }
  
`

const Card = styled(_Card)`
  width: 900px;
  background-color: #e0f7fa !important;
`

const OwnerWrapper = styled.div`
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 600px;
    margin: 10px;
    margin-left: 20px;
  }
`

const CateWrapper = styled.div`
  margin: 0px 15px;
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 12px;
  }
`

const ButtonWrapper = styled.div`
  margin-bottom: 5px;
`

const ButtonBase = styled(_ButtonBase)`
  height: 80px;
  width: 80px;
`

const UserPage = () => {
  // api
  const [rooms, setRooms] = useState([])
  const [profile, setProfile] = useState([])
  
  // to get name/token from redux
  const { token } = useSelector(state => {
    return {
      token: state.userLogin.token
    }  
  })

  // when render this component
  useEffect(() => {
    const fn = async () => {
      const results = await axios.get(
        'http://localhost:4000/user' ,
        {
          headers: {
            "Authorization": 'Bearer ' + token
          }
        }
      );
      setRooms(results.data.rooms);
      setProfile(results.data.profile);
    }
    fn();
    setInterval(fn, 30000);
  }, [])

 
  
  return (
    <Wrapper>
      <Card variant="outlined">
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            個人資料
          </Typography>
          <Typography variant="h5" component="h2">
            {`名稱: ${profile.name}`}
          </Typography>
          <Typography color="textSecondary">
            {`e-mail: ${profile.google_email || profile.facebook_email}`}
          </Typography>
          <Typography color="textSecondary"> 
            {`創立時間: ${moment(profile.create_time).format('YYYY-MM-DD HH:mm:ss')}`}
          </Typography>
        </CardContent>
        <CardActions>
          <Link to="/"> 
            <Button variant="contained" color="primary">
              回到首頁
            </Button>
          </Link>
        </CardActions>
      </Card>
      
      {
        rooms.map(room => {
          return (
            <OwnerWrapper>
              <Paper>
                <Grid container spacing={2}>
                  <Grid item>
                    <ButtonBase>
                      <img alt="complex" src={`http://localhost:4000/${room.images[0]}`} />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography gutterBottom variant="h5">
                          {room.title}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          {room.content}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Link to={`/rooms/${room.id}`}>
                          <ButtonWrapper>
                            <Button variant="contained" color="default">
                              加入房間
                            </Button>
                          </ButtonWrapper>
                        </Link> 
                      </Grid>
                    </Grid>
                    <Grid item>
                      <CateWrapper>
                        <Typography variant="h5" color="primary">
                          {room.category_name}
                        </Typography>
                      </CateWrapper>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </OwnerWrapper>
          )
        })
      }

    </Wrapper>
  )
}

  


export default UserPage;