import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import Collapse from '@material-ui/core/Collapse';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import TextSmsIcon from '@material-ui/icons/Textsms';
import _TextField from '@material-ui/core/TextField';
import _Popover from '@material-ui/core/Popover';
import _Typography from '@material-ui/core/Typography';

import {
  FacebookShareButton as _FacebookShareButton,
  LineShareButton,
  FacebookMessengerIcon,
  LineIcon,
} from "react-share";

const Detail = styled.div`
  transform: rotate(0deg);
  margin-left: auto;
`



const CollapseWrapper = styled.div`
  border-style: groove;
  border-width: 2px;
  border-radius: 6px ;
  height: 130px !important;
  overflow-y: scroll !important;
  overflow-x: hidden;

`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 16px;
  width: 100%;
  justify-content: space-between;
  margin-left: 2%;
`

const WrapperDate = styled.div`
  font-size: 8px;
  color: gray;
  margin-right: 3%;
  
`

const TextField = styled(_TextField)`
  margin: 8;
  width: 100%;
  position: absolute;
  bottom: 0;
  > div {
    height: 50px !important;
  }
`

const Typography = styled(_Typography)`
  height: 60px !important;
  border-width: 0;
  display: flex;
  justify-content: center;
  padding: 8px;
`

const Popover = styled(_Popover)`
  > div {
    border-radius: 60px !important;
    border-width: 0;
  }
`



const FacebookShareButton = styled(_FacebookShareButton)`
  margin-right: 10px;
`

const textList = [{
  username: 'Anna',
  text: 'hi',
  date: '2020/12/13 10:10:10'
}, {
  username: 'Jeno',
  text: '求售～',
  date: '2020/12/13 10:10:12'
}, {
  username: 'Didi',
  text: '請問預算多少可接受',
  date: '2020/12/13 10:10:13'
}, {
  username: 'cc',
  text: '有提供面交嗎',
  date: '2020/12/13 10:13:12'
}, {
  username: 'Donna',
  text: '哇',
  date: '2020/12/13 10:14:12'
}, {
  username: 'Cindy',
  text: '請問數量？',
  date: '2020/12/13 10:15:12'
}, {
  username: 'Minmin',
  text: '請問樓主可以用其他角色跟你交換嗎？',
  date: '2020/12/13 10:15:17'
}, {
  username: 'Kyla',
  text: '可以等我領貨之後再跟您討論嗎 謝謝',
  date: '2020/12/13 10:16:12'
}, {
  username: 'Lam',
  text: '排售',
  date: '2020/12/13 10:16:19'
}, {
  username: 'Fifi',
  text: '＋1',
  date: '2020/12/13 10:18:12'
}, {
  username: 'Bibi',
  text: '想等樓主趴斯',
  date: '2020/12/13 10:18:15'
}, {
  username: 'Minmin',
  text: '請問樓主可以用其他角色跟你交換嗎？',
  date: '2020/12/13 10:15:17'
}, {
  username: 'Kyla',
  text: '可以等我領貨之後再跟您討論嗎 謝謝',
  date: '2020/12/13 10:16:12'
}, {
  username: 'Lam',
  text: '排售',
  date: '2020/12/13 10:16:19'
}, {
  username: 'Fifi',
  text: '＋1',
  date: '2020/12/13 10:18:12'
}, {
  username: 'Bibi',
  text: '想等樓主趴斯',
  date: '2020/12/13 10:18:15'
}, {
  username: 'Minmin',
  text: '請問樓主可以用其他角色跟你交換嗎？',
  date: '2020/12/13 10:15:17'
}, {
  username: 'Kyla',
  text: '可以等我領貨之後再跟您討論嗎 謝謝',
  date: '2020/12/13 10:16:12'
}, {
  username: 'Lam',
  text: '排售',
  date: '2020/12/13 10:16:19'
}, {
  username: 'Fifi',
  text: '＋1',
  date: '2020/12/13 10:18:12'
}, {
  username: 'Bibi',
  text: '想等樓主趴斯',
  date: '2020/12/13 10:18:15'
}]

const CardActs = () => {

  const inputEl = useRef(null);

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  useEffect(() => {
    console.log(inputEl.current)

  }, [expanded])

  const [myText, setMyText] = useState('')
  console.log(myText)

  return(
    <>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon onClick={handleClick}/>
        </IconButton>
        
        <Detail>
          <IconButton
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <TextSmsIcon />
          </IconButton>
        </Detail>
      </CardActions>

      <>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Typography>
            <FacebookShareButton>
              <FacebookMessengerIcon size={42} round={true} />
            </FacebookShareButton>
            <LineShareButton>
              <LineIcon size={42} round={true} />
            </LineShareButton>
          </Typography>
        </Popover>
      </>

      <Collapse
        in={expanded}
        timeout="auto"
        unmountOnExit
        ref={inputEl}
      >
        <CollapseWrapper>
          { textList.map(text => {
              return (
                <Wrapper>
                  {text.username}:
                  {text.text}
                  <WrapperDate>
                    {text.date}
                  </WrapperDate>
                </Wrapper>
              )
          })}
          <div style={{ display: 'flex', flexDirection: 'columns' }}>{ myText }</div>
        </CollapseWrapper>
        <br />
        <TextField
          multiline
          id="filled-basic"
          label="輸入內容"
          variant="filled"
          onChange={(e) => setMyText(e.target.value)}
        />
      </Collapse>
     
    </>
  )
}


export default CardActs;