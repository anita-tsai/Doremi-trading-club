import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import bannerImg from './banner1.png';
import _Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import _Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Button } from '@material-ui/core';


import _Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import _TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';


import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import IconButton from '@material-ui/core/IconButton';
import _ImageGallery from 'react-image-gallery';

import {
  // BrowserRouter as Router,
  // Switch,
  // Route,
  Link,
  //useHistory,
  //useLocation
} from "react-router-dom";

import SubmitBlackList from '../Modal/SubmitBlackList';

const Wrapper = styled.div`
  background-color: #E8E7D2;
  background-image: url(${bannerImg});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 90% 10%;
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

const TableContainer = styled(_TableContainer)`
  height: 440px;
`

const Paper = styled(_Paper)`
  width: 85%;
`

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Line = styled(_Divider)`
  width: 100%;
  
`

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const Card = styled(_Card)`
  width: 900px;
  background-color: #C9BA9B !important;
`

const Text = styled(Typography)`
`

const ButtonWrapper = styled.div`
  // > button {
  //   width: 100%;
    
  // }
  min-width: 220px;
  max-width: 250px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  justify-content: space-between;
`

const Reason = styled(TableCell)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-style: inset;
  width: 85vw !important;
`

const ImageGallery = styled(_ImageGallery)`
  height: 0;
  padding-top: 56.25%;
`

const ImgWrapper = styled.div`
  text-align: center; 
  z-index: 1;
  > div {
    z-index: 1;
  }
`

const Time = styled.div`
`

const Things = styled.div`
`

const Note = styled.div`
`

const columns = [
  { id: 'name', label: '被檢舉人', minWidth: 100 },
  { id: 'title', label: '檢舉事由', minWidth: 170 },
  
];

const Row = ({ row }) => {
  const [open, setOpen] = React.useState(false);
  
  return <>
    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
      <TableCell>
        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </TableCell>
      {columns.map((column) => {
        const value = row[column.id];
        return (
          <TableCell key={column.id} align={column.align}>
            {column.format && typeof value === 'number' ? column.format(value) : value}
          </TableCell>
        );
      })}
    </TableRow>
    { open ? (
      <TableRow>
        <Reason colSpan={3}>
          <ImgWrapper>
            <ImageGallery
              items={row.images.map(image => {
                const url = `http://localhost:4000/${image}`
                return {
                  original: url,
                  thumbnail: url,
                  originalHeight: 300,
                  thumbnailHeight: 50,
                }
              })}
              showThumbnails={false}
              showFullscreenButton={false}
              showIndex={true}
              showPlayButton={false}
            />
          </ImgWrapper>
          <div>
            <Time>
              {`1.發生時間:`}
              <Typography>
                {row.event_time}
              </Typography>
            </Time>
            <Things>
              {`2.事件經過:`}
              <Typography>
                {row.reason}
              </Typography>
            </Things>
            <Note>
              {`3.其他補充:`}
              <Typography>
              {row.note}
              </Typography>
            </Note>
          </div>
        </Reason>
      </TableRow>
    ) : null}
  </>
}



const BlackList = () => {
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [formOpen, setFormOpen] = React.useState(false);

  const [rows, setRows] = useState([])

  useEffect(() => {
    const fn = async () => {
      const results = await axios.get('http://localhost:4000/blacklist');
      setRows(results.data);
      // dispatch({ type: 'SET_ROOMS', payload: results.data })
    }
    fn();
  }, [])

  const handleClickOpen = () => {
    setFormOpen(true);
  };

  const handleClose = () => {
    setFormOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  // const dispatch = useDispatch();

  React.useEffect(() => {
    if (formOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [formOpen]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { login } = useSelector(state => {
    return {
      login: state.userLogin.login
    }
  })

  // const handleClick = () =>{
  //   dispatch(({ type: 'SET_USER_LOGIN', login: false }))
  // }

  console.log(rows)


  return(
    <>
      <Wrapper>
        <Typography variant="h3" component="h2" gutterBottom>
          {`違 規 名 單`}
        </Typography>
        <ButtonWrapper>
          <Link to="/">
            <Button variant="contained" color="primary">
              回到首頁
            </Button>
          </Link>
         
          { login ?
            <Link >
              <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                舉報黑名單
              </Button>
            </Link>
          :
            <Link to ="/signin">
              <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                舉報黑名單
              </Button>
            </Link>
          }
        </ButtonWrapper>
          
            
        
        
        
      </Wrapper>
      
      <Line/>
      <CardWrapper>
        <Card variant="outlined">
        <CardContent>

          <Text variant="h5" component="h2">
            本平台為無償供喜愛小魔女的粉絲使用，請大家盡量和平相處
          </Text>
          <Text>
            平台盡量不介入私人恩怨，但有發生任何可能違反法律之行為，會先予以勸導改善
          </Text>
          <Text>
            無法接受者會先停用該房間，嚴重者鎖帳號。
          </Text>
          <Text>
            若有進入司法途徑，將依法提供對話內容。
          </Text>
          <Text>
            <ol>
            <li>有發生詐騙等糾紛請寄信至作者信箱進行通報：
              <ul>
                <li>信件內容需提供對話、截圖等佐證資料不會立即公告，需經過審核後才會於下方表格提醒大家</li>
              </ul>
            </li>
            <li>被公告後有疑慮之本人可至作者信箱反饋
              <ul>
                <li>信件內容需附上完整事件經過等佐證資料，會以信件內容告知後續處理方式</li>
              </ul>
            </li>
            </ol>
          </Text>
          <Text>
            作者信箱： anitatsai@gmail.com
          </Text>
          
          
        </CardContent>
        {/* <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions> */}
      </Card>
    </CardWrapper>

    <ListWrapper>
      <Paper>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell />
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody> 
              {/* here */}
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                return (
                  <Row row={row}/>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </ListWrapper>
    
    { formOpen
        ? <SubmitBlackList
          handleClose={handleClose}
          descriptionElementRef={descriptionElementRef}
        /> : null
      }
        

    </>
  )
}


export default BlackList;