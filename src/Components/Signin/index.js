import React from 'react';
import styled from 'styled-components';
import _Button from '@material-ui/core/Button';
import _Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import GoogleLogin from 'react-google-login';
// import FacebookLogin from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

import axios from 'axios';

import { useDispatch } from 'react-redux';
import {  } from '../../actions';


import {
  // BrowserRouter as Router,
  // Switch,
  // Route,
  Link,
  useHistory,
  useLocation
} from "react-router-dom";



const baseURL = "http://localhost:4000";



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
const Card = styled(_Card)`
  width: 500px;
  text-align: center;
`

const Button = styled(_Button)`
  width: 300px;
  height: 50px;
  font-size: 16px !important;
`

const ButtonWrapper = styled.div`
  > * {
      margin-bottom: 30px;
    }
`


const Signin = () => {
  let history = useHistory();
  let location = useLocation();

  const dispatch = useDispatch();

  const responseGoogle =  async response => { 
    console.log(response); 
    const results = await axios
      .post(`${baseURL}/signin`, {
        "external_id": response.profileObj.googleId,
        "name": response.profileObj.name,
        "email": response.profileObj.email,
        "avatar": response.profileObj.imageUrl,
        "type": 'google'
    })
    console.log('results', results)
    console.log('results.data', results.data)
    dispatch(({ type: 'SET_USER_LOGIN', login: true, token: results.data.token, name: results.data.name }))
    
    let { from } = location.state || { from: { pathname: "/" } };
    history.replace(from);
  };

  const responseFacebook = async (response) => {
    console.log('abc', response);
    const results = await axios
      .post(`${baseURL}/signin`, {
        "external_id": response.id,
        "name": response.name,
        "email": response.email,
        "avatar": response.picture.data.url,
        "type": 'facebook'
    })
    dispatch(({ type: 'SET_USER_LOGIN', login: true, token: results.data.token, name: results.data.name }))

    let { from } = location.state || { from: { pathname: "/" } };
    history.replace(from);
  };

  return(



    <Wrapper>
      <Card>
        <CardContent>
          <Typography variant="h5">
            小魔女Doremi 在線交易工具登入
          </Typography>
          <Typography variant="body2">
            目前登入方式分為
            <br/>
            Google登入及FB登入
          </Typography>
        </CardContent>
      </Card>
      <ButtonWrapper>
        <Typography>
          <GoogleLogin
            clientId="1049640154623-mps5c4bflebq1n3omfo4jijoamgodtk3.apps.googleusercontent.com"
            render={renderProps => (
              <Button
                variant="contained"
                color="secondary"
                startIcon={<AccountCircleIcon />}
                onClick={renderProps.onClick}
              >
                GOOGLE 登入
              </Button>
              
            )}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
  
        </Typography>
        <Typography>
        <FacebookLogin
          appId="1186471925483905"
          autoLoad={true}
          fields="name,email,picture"
          //onClick={componentClicked}
          callback={responseFacebook} 
          render={renderProps => (
            <Button
            variant="contained"
            color="primary"
            startIcon={<AccountCircleIcon />}
            onClick={renderProps.onClick}
          >
            FaceBook 登入
          </Button>
          )}
        />
          
        </Typography>
        <Typography>
          <Link to="/">
            <Button
              variant="contained"
              color="default"
              startIcon={<HomeIcon />}
            >
              回首頁
            </Button>
          </Link>
        </Typography>
      </ButtonWrapper>
    </Wrapper>
  )
}


export default Signin;