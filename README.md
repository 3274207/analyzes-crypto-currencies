# analyzes-crypto-currencies
需求：分析加密货币数据，要求处理货币交易所提供的货币历史价目表，并按要求将分析结果显示

解决：

1.系统架构：本系统分为前端（界面部分ReactJS）+ 后端（路由和逻辑部分NestJS+graphQL）+ 数据库（数据存取部分MongoDB）；

2.工作流：
2.1前端收到用户请求（http://hostname:3000) 后启动定时器，每隔1秒向后端服务器请求最新分析数据（http://hostname:8000/graphQL) ；
2.2后端查询MongoDB数据库，返回请求数据；
2.3前端收到数据后，刷新页面显示

3.utu-codetest-front目录存储前端代码，在该目录下运行$npm start即可启动http://localhost:3000 服务；utu-codetest-back目录存储后端代码，在该目录下运行$nest start即可启动http://localhost:8000 服务；

4.数据准备：在后台服务所在主机上安装MongoDB，然后导入数据文件（.CSV）生成数据集(exchanges)

5.create new branch
