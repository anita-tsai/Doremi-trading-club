import React, { useEffect } from 'react';
import Room from '../Room/Room';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';




const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 500px;
  > div {
    margin: 10px;
  }
  
`

const Lobby = ({ category, content, tags }) => {
  // api
  // const [rooms, setRooms] = useState([])
  const rooms = useSelector(state => state.rooms)
  const dispatch = useDispatch()
  let intervalTimer

  useEffect(() => {
    clearInterval(intervalTimer)
    const fn = async () => {
      const results = await axios.get('http://localhost:4000/rooms', {
        // search the room by category, content, tags
        params: {
          category,
          content,
          tags: JSON.stringify(tags)
        }
      });
      dispatch({ type: 'SET_ROOMS', payload: results.data })
    }
    fn();
    intervalTimer = setInterval(fn, 30000);
    return () => {
      clearInterval(intervalTimer)
    }
  }, [dispatch, category, content, JSON.stringify(tags)])

  return (
    <Wrapper>
      {
        rooms.map(d => {
          return <Room data={d}/>
        })
      }
    
    </Wrapper>
  )
}

  


export default Lobby;