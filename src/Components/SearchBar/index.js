import React from 'react';
import styled from 'styled-components';

import _Paper from '@material-ui/core/Paper';
import _InputBase from '@material-ui/core/InputBase';
import _IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


const Paper = styled(_Paper)`
  padding: 2px 4px;
  display: flex;
  align-items: center;
  width: 400px;
  margin-bottom: 10px;
`

const InputBase = styled(_InputBase)`
  margin-left: auto;
  flex: 1; 
`

const IconButton = styled(_IconButton)`
  padding: 10;
`



const SearchBar = ({ setContent, content }) => {
  return(
    <Paper component="form">
        <IconButton aria-label="menu">
          <MenuIcon />
        </IconButton>
        <InputBase 
          placeholder="搜尋關鍵字"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
    </Paper>
  )
}

export default SearchBar;