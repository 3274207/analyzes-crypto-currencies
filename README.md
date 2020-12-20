# analyzes-crypto-currencies
需求：分析加密货币数据，要求处理货币交易所提供的货币历史价目表，并按要求将分析结果显示
解决：
1.系统架构：本系统分为前端（界面部分ReactJS）+ 后端（路由和逻辑部分NestJS+graphQL）+ 数据库（数据存取部分MongoDB）；
2.工作流：前端收到用户请求（http://hostname:3000)后启动定时器，每隔1秒向后端服务器请求最新分析数据（http://hostname:8000/graphQL)，刷新页面显示
