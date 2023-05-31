import React from "react";
import styled from "styled-components";

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import _CardHeader from '@material-ui/core/CardHeader';
import _Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';



const Avatar = styled(_Avatar)`
  background-color: #d32f2f !important ;
`

const CardHeader = styled(_CardHeader)`
> div > span {
  font-size: 16px ;
}
 
`

const options = [
  '房主：Anita',
  '開房次數： 5',
  '黑單次數：0'
]

const ITEM_HEIGHT = 30;


const Header = ({ avatar, name, publishDate }) => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  
  return(
    <div>
      <CardHeader
          avatar={
            <Avatar aria-label="recipe">
              <img src={avatar} alt=''/>
            </Avatar>
          }
          action={
            <IconButton 
              // aria-label="settings" 
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            
          }
          title={name}
          subheader={publishDate}
        />

      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '15ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
            {option}
          </MenuItem>
        ))}
      </Menu>

    </div>
    
  )
}


export default Header;