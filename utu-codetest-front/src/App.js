/********
 *View of UTU_Code_Test
 *writed by Robin at 15/12/2020 
********/
import React, { Component } from "react";
import logo from "./label.png";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      tableHead: ['#', 'Coin', '', 'Price','24h','7d','1m','24h Volume','Mkt Cap'],
      resultList:[],
      date: new Date(),
    };
  }
//获取数据
componentDidMount()
{ 
  //组件装载后每秒刷新一次，更新界面数据
  this.timerID = setInterval(
    () => this.tick(),
    1000
  );
}

componentWillUnmount() {
  //组件删除后清除计时器
  clearInterval(this.timerID);
}

tick() {
  this.setState({
    date: new Date()
  });
  //调用后台服务器8000端口的graphQL服务，获得交易历史数据
  var gqlReturn = [];
  var returnItem = [];
  var returnArr = [];
  var difftemp = 0;
  var dateNew = '2019-12-04';
  var date7 = '2019-11-27';
  var date30 = '2019-11-04';

  var query = '{getHistory(exchangeDate:"2019-12-04")  {coinName,exchangeDate,priceOpen,priceHigh,priceLow,priceClose,Volume,marketCap}}';
  
  fetch('http://localhost:8000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query
    })
  })
    .then(r => r.json())
    .then(returnData => {
      //对graphql回传的交易记录按日期倒序排列
      gqlReturn = returnData.data.getHistory.sort(function(a,b){return (b.exchangeDate - a.exchangeDate)}) ;
      console.log(gqlReturn);
      // 遍历处理change difference
      gqlReturn.map( (item, index)  => {
        if (item.exchangeDate === dateNew) {
          returnItem = [];
          console.log(item.priceClose*1);
          console.log(item.priceOpen*1);
          difftemp = (item.priceClose*1 - item.priceOpen*1)/(item.priceOpen*1);
          console.log(difftemp);
          returnItem.push(item.coinName, item.priceClose*1, difftemp, 0, 0, item.Volume*1, item.marketCap*1);
          returnArr.push(returnItem);
        }
        if (item.exchangeDate === date7) {
          returnItem = returnArr.filter(element => {return(element[0] === item.coinName);});
          difftemp = (returnItem[0][1] - item.priceOpen*1)/(item.priceOpen*1);
          returnArr.map((arritem, arrIndex) => {
            if (arritem[0] === item.coinName ) {
              arritem[3] = difftemp;
              console.log('this.is date7::'+arritem[3]);
            }
          }); 
        }
        if (item.exchangeDate === date30) {
          returnItem = returnArr.filter(element => {return(element[0] === item.coinName);});
          difftemp = (returnItem[0][1] - item.priceOpen*1)/(item.priceOpen*1);
          returnArr.map((arritem, arrIndex) => {
            if (arritem[0] === item.coinName ) {
              arritem[4] = difftemp;
              console.log('this is date30::'+arritem[4]);
            }
          }); 
        }
    });
  //按cap递减排序
    var ds = returnArr.sort(function(a, b) {
      return (b[6]*1 - a[6]*1);
    });
    console.log('this is ds');
    console.log(ds);
    this.setState({resultList: ds });
  });

}

//将处理结果渲染成表格显示
  render() {
    return (
      <div className="UTUCase">
        <div>
        <h1>Hi, Guys!</h1>
        <h2>Here are the hot data at {this.state.date.toLocaleTimeString()}.</h2>
        <h2>We get it from GRAPHQL.</h2>
        </div>
        <div className="UTUData">
          <table id='resulttable' className='tabel'>
            {//遍历表头信息，显示标题栏 
            }
            <thead>
              <tr>
                {
                  this.state.tableHead.map( (head, index) => 
                    {
                      return(<th key={head}>{head}</th>);
                    }
                  )
                }
              </tr>
            </thead>
            <tbody>
            {
              this.state.resultList.map( (item, index) => 
              { 
                var d1dclass = 'datashow_positive';
                var d7dclass = 'datashow_positive';
                var d30dclass = 'datashow_positive';
                if (item[2] < 0) {
                  d1dclass = 'datashow_minus';               
                } 
                if (item[3] < 0) {
                  d7dclass = 'datashow_minus';               
                }
                if (item[4] < 0) {
                  d30dclass = 'datashow_minus';               
                } 
                return(
                <tr>
                  <td className='datashow_dollar'>
                    <img src={logo} alt="标签" width='20'/>
                  </td>
                  <td>{index+1}</td>
                  <td className='coinname'>{item[0]}</td>
                  <td className='datashow_dollar'>{item[1]}</td>
                  <td className={d1dclass}>{(item[2]*100).toFixed(2) + '%'}</td>
                  <td className={d7dclass}>{(item[3]*100).toFixed(2) + '%'}</td>
                  <td className={d30dclass}>{(item[4]*100).toFixed(2) + '%'}</td>
                  <td className='datashow_dollar'>${(item[5]*1).toLocaleString()}</td>
                  <td className='datashow_dollar'>${(item[6]*1).toLocaleString()}</td>
                </tr>
                );
              }
            )
            }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
