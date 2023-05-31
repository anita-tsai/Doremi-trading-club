import React, {useState} from 'react';
import styled from 'styled-components'

import _Card from '@material-ui/core/Card';
import Collapse from '@material-ui/core/Collapse';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const Card = styled(_Card)`
  width: 100%;
  max-width: 900px;
  background-color: #e0f7fa !important;
`

const Text = styled(Typography)`
`


const Notice = () => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Text variant="h5" component="h2">
          使用本工具請遵守「平台規範」
        </Text>
        <Text>
          本平台是為方便交流所設立，無償提供喜愛小魔女的粉絲使用，若私下交易請謹慎
        </Text>
        <Text>
          嚴重情節使用者名單：有誤會者請至客服房留言並來信說明，三天後未出現則帳號封鎖並設黑名單
        </Text>
        <Text>  
          <ol>
            <li>如何登入與創建房間：
              <ul>
                <li>登入方式目前提供Google與FB登入</li>
                <li>登入後可開始創立房間，房間內每項都需填入後才可送出</li>
              </ul>
            </li>
            
            <li>如何聯繫對方：
              <ul>
                <li>若雙方需要交易等，建議直接在房內留下聯絡資訊</li>
                <li>為保障雙方權益，建議於房內談妥條件再私訊對方</li>
              </ul>
            </li>

            <li>房間類型與標籤：
              <ul>
                <li>類型：交換、出售、徵求、聊天、競標</li>
                <li>標籤可使用已設置好的文字或是自行創立</li>
                <li>類型與標籤可方便大家辨認與搜尋有興趣的房間內容</li>
              </ul>
            </li>
          </ol>
        </Text>
        <Text>
          作者信箱：anitatsai@gmail.com
        </Text>
        
      </CardContent>
      <CardActions>
        <Button 
          size="small"
          onClick={handleExpandClick}
        >
          更多說明
        </Button>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Text>
            標籤說明
          </Text>
          <Text>  
            <ol>
              <li>交換標籤：
                <ul>
                  <li>需詳細列出每一品項所要交換之物品，並列出交換比例</li>
                  <li>不得要求直接金錢交易</li>
                </ul>
              </li>
              <li>出售標籤：
                <ul>
                  <li>需列出詳細品項及該品項出售金額</li>
                  <li>不得私下要求追加價格</li>
                </ul>
              </li>
              <li>徵求標籤：
                <ul>
                  <li>須列出詳細品項及預算範圍，此為以金額作為交易方式</li>
                  <li>若有物品作為補充條件，需移至交換房</li>
                  <li>尋找物品、尋人、尋求協助皆屬於該房範圍</li>
                </ul>
              </li>
              <li>聊天標籤：
                <ul>
                  <li>房主設定主題供大家聊天，房內不作任何交易</li>
                </ul>
              </li>
              <li>競標標籤：
                <ul>
                  <li>須列出品項狀況、起標金額、起標與截止時間</li>
                  <li>建議一間房間競標一樣商品較不產生糾紛</li>
                </ul>
              </li>
            </ol>
          </Text>
        </CardContent>
      </Collapse>
    </Card>
  );
}


export default Notice;