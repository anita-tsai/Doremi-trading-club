import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components'

import{ Button, ButtonGroup} from '@material-ui/core';
import _Divider from '@material-ui/core/Divider';

import bannerImg from './mahoheader.png';
import CreateRoom from '../Modal/CreateRoom';

const Wrapper = styled.div`
  background-color: white;
  background-image: url(${bannerImg});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: right;
  height: 15rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  > div:first-child {
    margin-bottom: 10px;
  }
  
`

const Line = styled(_Divider)`
  width: 100%;
`

const Banner = () => {
  const dispatch = useDispatch();
  const { login } = useSelector(state => {
    return {
      login: state.userLogin.login
    }
  })
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () =>{
    dispatch(({ type: 'SET_USER_LOGIN', login: false }))
  }

  
  return (
    <>
      <Wrapper>
        { login
          ? 
          <Link to="/">
            <Button 
              size="large" 
              variant="contained" 
              color="primary"
              type="button" 
              onClick={handleClickOpen}
            >
              創建新房間
            </Button>
          </Link> 
          : 
          <Link to ="/signin">
            <Button size="large" 
              variant="contained" 
              color="primary"
              type="button" 
            >
              創建新房間
            </Button>
          </Link> 
        }
            
        
        <ButtonGroup 
          size="large" 
          variant="text" 
          color="primary" 
          aria-label="text primary button group"
        >
          <Link to="blackList"><Button>黑名單</Button></Link>
          { login ? <Link to="/"><Button onClick={handleClick}>登出</Button></Link> : <Link to="/signin"><Button>登入</Button></Link> }
          { login ? <Link to="/userpage"><Button>個人頁面</Button></Link> : <Link to="/signin"><Button>個人頁面</Button></Link> }
        </ButtonGroup>
      </Wrapper>
      { open
        ? <CreateRoom
            handleClose={handleClose}
          /> 
        : null
      }
      <Line/>
    </>
  );
}




export default Banner;