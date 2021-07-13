import './App.css';
import { useState } from 'react';
import Notice from './Components/Notice/Notice';
import Banner from './Components/Banner/Banner';
import Search from './Components/Search/Search';
import Lobby from './Components/Lobby';
import styled from 'styled-components';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";

import Signin from './Components/Signin';
import RoomPage from './Components/RoomPage';
import UserPage from './Components/UserPage';
import BlackList from './Components/BlackList';
import SubmitBlackList from './Components/Modal/SubmitBlackList';



const Wrapper = styled.div`
  font-family: 'Noto Sans TC', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fefffb;
`

const Home = () => {
  const [category, setCategory] = useState(undefined)
  const [content, setContent] = useState(undefined)
  const [tags, setTags] = useState([])
  return <div>
    <Wrapper>

      <Banner />
      <Notice />
      <Search category={category} setCategory={setCategory} content={content} setContent={setContent} tags={tags} setTags={setTags}/>
      <Lobby category={category} content={content} tags={tags} setTags={setTags} />
    </Wrapper>
  </div>
}

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/signin">
          <Signin />
        </Route>
        <Route path="/blackList">
          <BlackList />
        </Route>
        <Route path="/submitblacklist">
          <SubmitBlackList />
        </Route>
        <Route path="/topics">
          {/* <Topics /> */}
        </Route>
        <Route path="/rooms/:id" component={RoomPage} />
        <Route path="/userpage" component={UserPage} />
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
