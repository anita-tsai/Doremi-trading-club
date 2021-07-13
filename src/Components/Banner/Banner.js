import React from 'react';
import{ Button, ButtonGroup} from '@material-ui/core';
import styled from 'styled-components'
import bannerImg from './mahoheader.png';
import _Divider from '@material-ui/core/Divider';
import { useDispatch, useSelector } from 'react-redux';

import CreateRoom from '../Modal/CreateRoom';


import {
  // BrowserRouter as Router,
  // Switch,
  // Route,
  Link,
  // useRouteMatch,
  // useParams
} from "react-router-dom";


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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { login } = useSelector(state => {
    return {
      login: state.userLogin.login
    }
  })

  const handleClick = () =>{
    dispatch(({ type: 'SET_USER_LOGIN', login: false }))
  }

  const descriptionElementRef = React.useRef(null);

  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  
  return (
    <>
      <Wrapper>
        { login? 
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
          </Link> }
            
        {/* <Button 
          size="large" 
          variant="contained" 
          color="primary"
          type="button" 
          onClick={handleClickOpen}
        >
          創建新房間
        </Button> */}
        
        <ButtonGroup size="large" variant="text" color="primary" aria-label="text primary button group">
          <Link to="blackList"><Button>黑名單</Button></Link>
          { login ? <Link to="/"><Button onClick={handleClick}>登出</Button></Link> : <Link to="/signin"><Button>登入</Button></Link> }
          {/* <Link to="/signin"><Button>登入</Button></Link>
          <Link to="/"><Button>登出</Button></Link> */}
          { login ? <Link to="/userpage"><Button>個人頁面</Button></Link> : <Link to="/signin"><Button>個人頁面</Button></Link>}
        </ButtonGroup>
      </Wrapper>
      { open
        ? <CreateRoom
          handleClose={handleClose}
          descriptionElementRef={descriptionElementRef}
        /> : null
      }
      <Line/>
    </>
  );
}




export default Banner;