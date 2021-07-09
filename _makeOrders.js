


//makeOrders();

//algoLoopC();
//algoLoopD();


async function makeAllOrders() {
	var totalOrderRequests=0;
	
	var d = new Date();
	console.log('Make Orders: Time Start:'+d);
	
	var CryptoJS = require("crypto-js");
	
	var fs = require('fs');
	const fetch = require('node-fetch');
	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	
	const AbortController = require("abort-controller");
	
	var moment = require('moment');
	var now = moment();
	
	var firebase = require('firebase');
	
if (!firebase.apps.length) {
	var app = firebase.initializeApp({
		apiKey: "AIzaSyBLHqWvuqJBI2IlFbirNXZRZBO5RYXNUhg",
		authDomain: "basicbinancebot.firebaseapp.com",
		databaseURL: "https://basicbinancebot.firebaseio.com",
		projectId: "basicbinancebot",
		storageBucket: "basicbinancebot.appspot.com",
		messagingSenderId: "879608315516"
	});
}
	
	
	let counter = 0;
	let interval;
	const listOfArguments = [];
	const listOfArgumentsB = [];
	const listOfArgumentsC = [];
	const borrowArr = [];
	
	//---
	let userDet = [];
	let users = [];
	
	//--
	let snapDataOrders = [];
	var update_snapDataOrders=0;
	

	var queryBook = [];
	var qb = fs.readFileSync('1queryBook.json','utf8');
	if (qb){
		queryBook = JSON.parse(qb);
	}
	
	var recordMakeOrders = [];
	var update_recordMakeOrders = 0;
	var rmo = fs.readFileSync('json/recordMakeOrders.json','utf8');
	if (rmo){
		recordMakeOrders = JSON.parse(rmo);
	}
	
	/* console.log('recordMakeOrders A:');
	console.log(recordMakeOrders);
	console.log('_+_+_+_+_+_++__+_+_+_+_+_+_+_+_+_+_+_+_+_') */
	
	
	console.log('queryBook length:'+queryBook.length);
	
	const controllerA = new AbortController();
	setTimeout(() => controllerA.abort(), 20000);
	//controllerA.abort();
	let response = await fetch('https://www.binance.com/api/v3/time', {signal: controllerA.signal,} ).catch((error)=>console.log(error));
	
	if (response){
		///- --- - --- - ---
		let responseST = await response.json();
	console.log('SERVER TIME:'+responseST.serverTime);

	let snapDataAccounts_ = [];
	var snapshot_accounts = await firebase.database().ref('/users/').once('value').catch((error)=>console.log(error));
	snapDataAccounts_ = snapshot_accounts.val();
	
	 var sDOArr=[];
	 var snapshot_orders = await firebase.database().ref('/ordersMulti/').once('value').catch((error)=>console.log(error));
	//snapDataOrders = snapshot_orders.val() || [] ;
	var sDO = snapshot_orders.val() || [];
	
	/* console.log('below sDO');
	console.log(sDO); */
	
	let sDO_config = [];
	//let ct=0;
	for (x in sDO) {
		//sDO_config.Key = x;
		//sDO_config.Data = sDO;
		//sDO.Key = x;
		//sDO_config.push('Key':)
		//sDO_config.push({"Key":x, "Data":sDO[x]     });
		for (var a=0; a<sDO[x].length; a++){
			sDO_config.push({"Key":x, "Data":sDO[x][a]     });
		}
		
		/* 
		console.log('object below');
		console.log(sDO[x]); */
		//sDO.Data = sDO;
		//ct++; 
		//sDO.Key = x;
	} 
	
	/* console.log('beg snapDataOrders BELOW::: , ');
	 */
	snapDataOrders = sDO_config;
	/* console.log(snapDataOrders); */
	
	/* sDOArr.push(sDO)
	console.log('sDO below:');
	console.log(sDOArr); */
	
	//...
	
	//var result_OtA=[];
	//result_OtA.push(snapDataOrders);
	//var result_OtA = Object.entries(snapDataOrders);

//console.log('result_OtA :');
	//console.log(result_OtA);
	
	//console.log('snapDataOrders  for OrdersMulti BELOW: ');
	//console.log(snapDataOrders);
	
	
	let l=0;
	for (x in snapDataAccounts_) {
		if (x!='_test_'){
			snapDataAccounts_[x].username = x;
			userDet[l] = snapDataAccounts_[x];
			l++;
		}
	}
	
	//console.log(' userDet below : ');
	//console.log(userDet);
	
	
	
	
	
	//let response = await fetch('https://api.binance.com/api/v3/ticker/price').catch((error)=>console.log(error));
	//let responsePrices = await response.json();
	//console.log('responsePrices length:'+responsePrices.length);

	//listOfArgumentsB.push(['https://www.binance.com/api/v3/time', 'GET', 'SERVERTIME_TEST',  ]);		//use this...

for (let i = 0; i < queryBook.length; i++) {
  //listOfArguments.push(i);
  
  
  
  if ( (queryBook[i][0]=='LIMIT_BUY') || (queryBook[i][0]=='CANCEL_BUY') || (queryBook[i][0]=='M_LIMIT_BUY') || (queryBook[i][0]=='M_CANCEL_LIMIT_BUY') ){
	  for (u=0; u<userDet.length; u++){
		  if (userDet[u].username == queryBook[i][1]){
			  console.log('IT SYNCED THE USERNAMES '+queryBook[i][1])
			  
				var bytes_ak  = CryptoJS.AES.decrypt(userDet[u].a_k, '#yB*32_Ppz'+userDet[u].username+'gpwo12(');
				var bytes_sk  = CryptoJS.AES.decrypt(userDet[u].s_k, '#yB*32_Ppz'+userDet[u].username+'gpwo12(');
			  
			  var o_orders = queryBook[i][3];
			  console.log('o_orders below');
			  console.log(o_orders);
			  var preventBuyOrder = 0;
			  for (o=0; o<o_orders.length; o++){
				  //if ( (o_orders[o].price>queryBook[i][2][2]) && (o_orders[o].side=='BUY') && (o_orders[o].status!='PARTIALLY_FILLED') && (o_orders[o].symbol == queryBook[i][2][0]) ){
				  if (  (o_orders[o].side=='BUY') && (o_orders[o].status!='PARTIALLY_FILLED') && (o_orders[o].symbol == queryBook[i][2][0]) ){
					 // cancel it...
					 console.log('GOING TO CANCEL AN ORDER')
					var dataQueryString = 'symbol='+o_orders[o].symbol+'&orderId='+o_orders[o].orderId+'&recvWindow=20000&timestamp='+responseST.serverTime;
					var signature = CryptoJS.HmacSHA256(dataQueryString, bytes_sk.toString(CryptoJS.enc.Utf8)).toString(CryptoJS.enc.Hex);
					
					if ((queryBook[i][0]=='LIMIT_BUY') || (queryBook[i][0]=='CANCEL_BUY')){
						var url = 'https://api.binance.com/api/v3/order?'+dataQueryString+'&signature='+signature;
						listOfArguments.push([url, 'DELETE', 'CANCEL_ORDER', userDet[u].username, bytes_ak,  ]);
					}
					else if ( (queryBook[i][0]=='M_LIMIT_BUY') || (queryBook[i][0]=='M_CANCEL_LIMIT_BUY') ) {
						var url = 'https://api.binance.com/sapi/v1/margin/order?'+dataQueryString+'&signature='+signature;
						listOfArguments.push([url, 'DELETE', 'CANCEL_ORDER', userDet[u].username, bytes_ak,  ]);
					}
					
					
					
					
				  }
				  else if ((o_orders[o].side=='BUY') && (o_orders[o].status=='PARTIALLY_FILLED') && (o_orders[o].symbol == queryBook[i][2][0])){
					  preventBuyOrder=1;
				  }
			  }
			  
			  console.log('preventBuyOrder:'+preventBuyOrder);
			  if ((queryBook[i][0]=='M_LIMIT_BUY') && (queryBook[i][2][8]=='JUST_LIMIT') ) {
				  //buy it lower...
				  console.log('Buying it lower...')
					//var dataQueryString = 'symbol='+queryBook[i][2][0]+'&side=BUY&type=STOP_LOSS_LIMIT&quantity='+queryBook[i][2][1]+'&price='+parseFloat(queryBook[i][2][2])+'&stopPrice='+parseFloat(queryBook[i][2][3])+'&timeInForce=GTC&recvWindow=20000&timestamp='+responseST.serverTime;
					//var dataQueryString = 'symbol='+queryBook[i][2][0]+'&side=BUY&type=LIMIT&quantity='+queryBook[i][2][1]+'&price='+parseFloat(queryBook[i][2][2])+'&stopPrice='+parseFloat(queryBook[i][2][3])+'&timeInForce=GTC&recvWindow=20000&timestamp='+responseST.serverTime;
					var dataQueryString = 'symbol='+queryBook[i][2][0]+'&side=BUY&type=LIMIT&quantity='+queryBook[i][2][1]+'&price='+parseFloat(queryBook[i][2][2])+'&timeInForce=GTC&recvWindow=20000&timestamp='+responseST.serverTime;
					var signature = CryptoJS.HmacSHA256(dataQueryString, bytes_sk.toString(CryptoJS.enc.Utf8)).toString(CryptoJS.enc.Hex);
					var url = 'https://api.binance.com/sapi/v1/margin/order?'+dataQueryString+'&signature='+signature;
					listOfArgumentsB.push([url, 'POST', 'M_NEW_BUY_ORDER', userDet[u].username, bytes_ak, queryBook[i][2]  ]);		
			  }
			  else if ((queryBook[i][0]=='M_LIMIT_BUY')  ){  ///&& (preventBuyOrder==0)
				  //buy it lower...
				  console.log('Buying it lower...')
					var dataQueryString = 'symbol='+queryBook[i][2][0]+'&side=BUY&type=STOP_LOSS_LIMIT&quantity='+queryBook[i][2][1]+'&price='+parseFloat(queryBook[i][2][2])+'&stopPrice='+parseFloat(queryBook[i][2][3])+'&timeInForce=GTC&recvWindow=20000&timestamp='+responseST.serverTime;
					var signature = CryptoJS.HmacSHA256(dataQueryString, bytes_sk.toString(CryptoJS.enc.Utf8)).toString(CryptoJS.enc.Hex);
					var url = 'https://api.binance.com/sapi/v1/margin/order?'+dataQueryString+'&signature='+signature;
					listOfArgumentsB.push([url, 'POST', 'M_NEW_BUY_ORDER', userDet[u].username, bytes_ak, queryBook[i][2]  ]);		
			  }
			  
			  if ((queryBook[i][0]=='LIMIT_BUY') && (preventBuyOrder==0)){
				  //buy it lower...
				  console.log('Buying it lower...')
					//var dataQueryString = 'symbol='+queryBook[i][2][0]+'&side=BUY&type=STOP_LOSS_LIMIT&quantity='+Math.floor(queryBook[i][2][1])+'&price='+parseFloat(queryBook[i][2][2])+'&stopPrice='+parseFloat(queryBook[i][2][3])+'&timeInForce=GTC&recvWindow=20000&timestamp='+responseST.serverTime;
					var dataQueryString = 'symbol='+queryBook[i][2][0]+'&side=BUY&type=LIMIT&quantity='+queryBook[i][2][1]+'&price='+parseFloat(queryBook[i][2][2])+'&timeInForce=GTC&recvWindow=20000&timestamp='+responseST.serverTime;
					var signature = CryptoJS.HmacSHA256(dataQueryString, bytes_sk.toString(CryptoJS.enc.Utf8)).toString(CryptoJS.enc.Hex);
					var url = 'https://api.binance.com/api/v3/order?'+dataQueryString+'&signature='+signature;
					listOfArgumentsB.push([url, 'POST', 'NEW_BUY_ORDER', userDet[u].username, bytes_ak, queryBook[i][2]  ]);		
			  }
			  
		  }
	  }
	  //put it here...
	  queryBook.splice(i, 1);
	  i--;
  }
  else if ( (queryBook[i][0]=='MARKET_BUY') ){
	  for (u=0; u<userDet.length; u++){
		  if (userDet[u].username == queryBook[i][1]){
			  console.log('IT SYNCED THE USERNAMES '+queryBook[i][1])
			  
				var bytes_ak  = CryptoJS.AES.decrypt(userDet[u].a_k, '#yB*32_Ppz'+userDet[u].username+'gpwo12(');
				var bytes_sk  = CryptoJS.AES.decrypt(userDet[u].s_k, '#yB*32_Ppz'+userDet[u].username+'gpwo12(');
			  
			 
			  
			  
			 
			  
			  if ((queryBook[i][0]=='MARKET_BUY') ){
				  //buy it lower...
				  console.log('Buying it lower...')
					//var dataQueryString = 'symbol='+queryBook[i][2][0]+'&side=BUY&type=STOP_LOSS_LIMIT&quantity='+Math.floor(queryBook[i][2][1])+'&price='+parseFloat(queryBook[i][2][2])+'&stopPrice='+parseFloat(queryBook[i][2][3])+'&timeInForce=GTC&recvWindow=20000&timestamp='+responseST.serverTime;
					var dataQueryString = 'symbol='+queryBook[i][2][0]+'&side=BUY&type=MARKET&quantity='+queryBook[i][2][1]+'&recvWindow=20000&timestamp='+responseST.serverTime;
					var signature = CryptoJS.HmacSHA256(dataQueryString, bytes_sk.toString(CryptoJS.enc.Utf8)).toString(CryptoJS.enc.Hex);
					var url = 'https://api.binance.com/api/v3/order?'+dataQueryString+'&signature='+signature;
					listOfArgumentsB.push([url, 'POST', 'NEW_BUY_ORDER', userDet[u].username, bytes_ak, queryBook[i][2]  ]);		
			  }
			  
		  }
	  }
	  //put it here...
	  queryBook.splice(i, 1);
	  i--;
  }
  else if  ( (queryBook[i][0]=='LIMIT_SELL') || (queryBook[i][0]=='CANCEL_LIMIT_SELL') || (queryBook[i][0]=='LIMIT_SELL_M') || (queryBook[i][0]=='CANCEL_LIMIT_SELL_M')  ) {   //CANCEL_LIMIT_SELL_M
	  for (u=0; u<userDet.length; u++){
		  if (userDet[u].username == queryBook[i][1]){
			  console.log('IT SYNCED THE USERNAMES '+queryBook[i][1])
			  
				var bytes_ak  = CryptoJS.AES.decrypt(userDet[u].a_k, '#yB*32_Ppz'+userDet[u].username+'gpwo12(');
				var bytes_sk  = CryptoJS.AES.decrypt(userDet[u].s_k, '#yB*32_Ppz'+userDet[u].username+'gpwo12(');
			  
			  var o_orders = queryBook[i][3];
			  for (o=0; o<o_orders.length; o++){
				  if (   (o_orders[o].side=='SELL')  && (o_orders[o].symbol == queryBook[i][2][0]) ){ //&& (o_orders[o].status!='PARTIALLY_FILLED') //(o_orders[o].price<queryBook[i][2][2])
					 // cancel it...
					 console.log('CANCELLING IT (LIMIT_SELL)')
					
					
					if ((queryBook[i][0]=='LIMIT_SELL') || (queryBook[i][0]=='CANCEL_LIMIT_SELL') ){
						var dataQueryString = 'symbol='+o_orders[o].symbol+'&orderId='+o_orders[o].orderId+'&recvWindow=20000&timestamp='+responseST.serverTime;
						var signature = CryptoJS.HmacSHA256(dataQueryString, bytes_sk.toString(CryptoJS.enc.Utf8)).toString(CryptoJS.enc.Hex);
						var url = 'https://api.binance.com/api/v3/order?'+dataQueryString+'&signature='+signature;
						listOfArguments.push([url, 'DELETE', 'CANCEL_ORDER', userDet[u].username, bytes_ak,  ]);
					}
					else if ((queryBook[i][0]=='LIMIT_SELL_M') || (queryBook[i][0]=='CANCEL_LIMIT_SELL_M') ) {
						var dataQueryString = 'symbol='+o_orders[o].symbol+'&orderId='+o_orders[o].orderId+'&recvWindow=20000&timestamp='+responseST.serverTime;
						var signature = CryptoJS.HmacSHA256(dataQueryString, bytes_sk.toString(CryptoJS.enc.Utf8)).toString(CryptoJS.enc.Hex);
						var url = 'https://api.binance.com/sapi/v1/margin/order?'+dataQueryString+'&signature='+signature;
						listOfArguments.push([url, 'DELETE', 'CANCEL_ORDER', userDet[u].username, bytes_ak,  ]);
					}
					
					
				  }
			  }
			  
			  
				  //SELL IT HIGHER...
				  console.log('SELLING IT HIGHER...');
					
					if ((queryBook[i][0]=='LIMIT_SELL') && (queryBook[i][2][7]=='JUST_LIMIT') ) {
						var dataQueryString = 'symbol='+queryBook[i][2][0]+'&side=SELL&type=LIMIT&quantity='+queryBook[i][2][1]+'&price='+parseFloat(queryBook[i][2][2])+'&timeInForce=GTC&recvWindow=20000&timestamp='+responseST.serverTime;
						var signature = CryptoJS.HmacSHA256(dataQueryString, bytes_sk.toString(CryptoJS.enc.Utf8)).toString(CryptoJS.enc.Hex);
						var url = 'https://api.binance.com/api/v3/order?'+dataQueryString+'&signature='+signature;
						listOfArgumentsB.push([url, 'POST', 'NEW_SELL_ORDER', userDet[u].username, bytes_ak, queryBook[i][2]  ]);		
					}
					else if (queryBook[i][0]=='LIMIT_SELL'){
						var dataQueryString = 'symbol='+queryBook[i][2][0]+'&side=SELL&type=STOP_LOSS_LIMIT&quantity='+queryBook[i][2][1]+'&price='+parseFloat(queryBook[i][2][2])+'&stopPrice='+parseFloat(queryBook[i][2][3])+'&timeInForce=GTC&recvWindow=20000&timestamp='+responseST.serverTime;
						var signature = CryptoJS.HmacSHA256(dataQueryString, bytes_sk.toString(CryptoJS.enc.Utf8)).toString(CryptoJS.enc.Hex);
						var url = 'https://api.binance.com/api/v3/order?'+dataQueryString+'&signature='+signature;
						listOfArgumentsB.push([url, 'POST', 'NEW_SELL_ORDER', userDet[u].username, bytes_ak, queryBook[i][2]  ]);		
					}
					else if (queryBook[i][0]=='LIMIT_SELL_M') {
						//var dataQueryString = 'symbol='+queryBook[i][2][0]+'&side=SELL&type=STOP_LOSS_LIMIT&quantity='+Math.floor(queryBook[i][2][1])+'&price='+parseFloat(queryBook[i][2][2])+'&stopPrice='+parseFloat(queryBook[i][2][3])+'&timeInForce=GTC&recvWindow=20000&timestamp='+responseST.serverTime;
						var dataQueryString = 'symbol='+queryBook[i][2][0]+'&side=SELL&type=LIMIT&quantity='+queryBook[i][2][1]+'&price='+parseFloat(queryBook[i][2][2])+'&timeInForce=GTC&recvWindow=20000&timestamp='+responseST.serverTime;
						var signature = CryptoJS.HmacSHA256(dataQueryString, bytes_sk.toString(CryptoJS.enc.Utf8)).toString(CryptoJS.enc.Hex);
						var url = 'https://api.binance.com/sapi/v1/margin/order?'+dataQueryString+'&signature='+signature;
						listOfArgumentsB.push([url, 'POST', 'NEW_SELL_ORDER_M', userDet[u].username, bytes_ak, queryBook[i][2]  ]);		
					}
					
					
			 
			  
		  }
	  }
	  //put it here...
	  queryBook.splice(i, 1);
	  i--;
  }
   else if  ( (queryBook[i][0]=='MARKET_SELL_M')  ) {   //CANCEL_LIMIT_SELL_M
	  for (u=0; u<userDet.length; u++){
		  if (userDet[u].username == queryBook[i][1]){
			  console.log('IT SYNCED THE USERNAMES '+queryBook[i][1])
			  
				var bytes_ak  = CryptoJS.AES.decrypt(userDet[u].a_k, '#yB*32_Ppz'+userDet[u].username+'gpwo12(');
				var bytes_sk  = CryptoJS.AES.decrypt(userDet[u].s_k, '#yB*32_Ppz'+userDet[u].username+'gpwo12(');
			  
			
			  
			  
				  //SELL IT HIGHER...
				  console.log('SELLING IT HIGHER...');
					
					
					if (queryBook[i][0]=='LIMIT_SELL_M') {
						//var dataQueryString = 'symbol='+queryBook[i][2][0]+'&side=SELL&type=STOP_LOSS_LIMIT&quantity='+Math.floor(queryBook[i][2][1])+'&price='+parseFloat(queryBook[i][2][2])+'&stopPrice='+parseFloat(queryBook[i][2][3])+'&timeInForce=GTC&recvWindow=20000&timestamp='+responseST.serverTime;
						//var dataQueryString = 'symbol='+queryBook[i][2][0]+'&side=SELL&type=LIMIT&quantity='+queryBook[i][2][1]+'&price='+parseFloat(queryBook[i][2][2])+'&timeInForce=GTC&recvWindow=20000&timestamp='+responseST.serverTime;
						var dataQueryString = 'symbol='+queryBook[i][2][0]+'&side=SELL&type=MARKET&quantity='+queryBook[i][2][1]+'&recvWindow=20000&timestamp='+responseST.serverTime;
						var signature = CryptoJS.HmacSHA256(dataQueryString, bytes_sk.toString(CryptoJS.enc.Utf8)).toString(CryptoJS.enc.Hex);
						var url = 'https://api.binance.com/sapi/v1/margin/order?'+dataQueryString+'&signature='+signature;
						listOfArgumentsB.push([url, 'POST', 'NEW_SELL_ORDER_M', userDet[u].username, bytes_ak, queryBook[i][2]  ]);		
					}
					
					
			 
			  
		  }
	  }
	  //put it here...
	  queryBook.splice(i, 1);
	  i--;
  }
  else if ( queryBook[i][0]=='M_MARKET_BUY') {
	  for (u=0; u<userDet.length; u++){
		  if (userDet[u].username == queryBook[i][1]){
			  console.log('IT SYNCED THE USERNAMES '+queryBook[i][1])
			  
				var bytes_ak  = CryptoJS.AES.decrypt(userDet[u].a_k, '#yB*32_Ppz'+userDet[u].username+'gpwo12(');
				var bytes_sk  = CryptoJS.AES.decrypt(userDet[u].s_k, '#yB*32_Ppz'+userDet[u].username+'gpwo12(');
			  
			  var o_orders = queryBook[i][3];
			  for (o=0; o<o_orders.length; o++){
				  if (  (o_orders[o].side=='BUY') &&  (o_orders[o].symbol == queryBook[i][2][0]) ){
					 // cancel it...
					var dataQueryString = 'symbol='+o_orders[o].symbol+'&orderId='+o_orders[o].orderId+'&recvWindow=20000&timestamp='+responseST.serverTime;
					var signature = CryptoJS.HmacSHA256(dataQueryString, bytes_sk.toString(CryptoJS.enc.Utf8)).toString(CryptoJS.enc.Hex);
					var url = 'https://api.binance.com/sapi/v1/margin/order?'+dataQueryString+'&signature='+signature;
					listOfArguments.push([url, 'DELETE', 'CANCEL_ORDER', userDet[u].username, bytes_ak,  ]);
				  }
			  }
			  
			  
				  //MARKET BUY IT...
					var dataQueryString = 'symbol='+queryBook[i][2][0]+'&side=BUY&type=MARKET&quantity='+queryBook[i][2][1]+'&recvWindow=20000&timestamp='+responseST.serverTime;
					var signature = CryptoJS.HmacSHA256(dataQueryString, bytes_sk.toString(CryptoJS.enc.Utf8)).toString(CryptoJS.enc.Hex);
					var url = 'https://api.binance.com/sapi/v1/margin/order?'+dataQueryString+'&signature='+signature;
					listOfArgumentsB.push([url, 'POST', 'M_NEW_BUY_ORDER_MARKET', userDet[u].username, bytes_ak, queryBook[i][2]  ]);		
			 
			  
		  }
	  }
	  //put it here...
	  queryBook.splice(i, 1);
	  i--;
  }
  else if ( queryBook[i][0]=='MARKET_SELL') {
	  for (u=0; u<userDet.length; u++){
		  if (userDet[u].username == queryBook[i][1]){
			  console.log('IT SYNCED THE USERNAMES '+queryBook[i][1])
			  
				var bytes_ak  = CryptoJS.AES.decrypt(userDet[u].a_k, '#yB*32_Ppz'+userDet[u].username+'gpwo12(');
				var bytes_sk  = CryptoJS.AES.decrypt(userDet[u].s_k, '#yB*32_Ppz'+userDet[u].username+'gpwo12(');
			  
			  var o_orders = queryBook[i][3];
			  for (o=0; o<o_orders.length; o++){
				  if (  (o_orders[o].side=='SELL') &&  (o_orders[o].symbol == queryBook[i][2][0]) ){
					 // cancel it...
					var dataQueryString = 'symbol='+o_orders[o].symbol+'&orderId='+o_orders[o].orderId+'&recvWindow=20000&timestamp='+responseST.serverTime;
					var signature = CryptoJS.HmacSHA256(dataQueryString, bytes_sk.toString(CryptoJS.enc.Utf8)).toString(CryptoJS.enc.Hex);
					var url = 'https://api.binance.com/api/v3/order?'+dataQueryString+'&signature='+signature;
					listOfArguments.push([url, 'DELETE', 'CANCEL_ORDER', userDet[u].username, bytes_ak,  ]);
				  }
			  }
			  
			  
				  //MARKET SELL IT...
					var dataQueryString = 'symbol='+queryBook[i][2][0]+'&side=SELL&type=MARKET&quantity='+queryBook[i][2][1]+'&recvWindow=20000&timestamp='+responseST.serverTime;
					var signature = CryptoJS.HmacSHA256(dataQueryString, bytes_sk.toString(CryptoJS.enc.Utf8)).toString(CryptoJS.enc.Hex);
					var url = 'https://api.binance.com/api/v3/order?'+dataQueryString+'&signature='+signature;
					listOfArgumentsB.push([url, 'POST', 'NEW_SELL_ORDER_MARKET', userDet[u].username, bytes_ak, queryBook[i][2]  ]);		
			 
			  
		  }
	  }
	  //put it here...
	  queryBook.splice(i, 1);
	  i--;
  }
  else if  (queryBook[i][0]=='STOP_LOSS_SELL'){
	  for (u=0; u<userDet.length; u++){
		  if (userDet[u].username == queryBook[i][1]){
			  console.log('IT SYNCED THE USERNAMES '+queryBook[i][1])
			  
				var bytes_ak  = CryptoJS.AES.decrypt(userDet[u].a_k, '#yB*32_Ppz'+userDet[u].username+'gpwo12(');
				var bytes_sk  = CryptoJS.AES.decrypt(userDet[u].s_k, '#yB*32_Ppz'+userDet[u].username+'gpwo12(');
				
				//MARKET SELL IT...
					//var dataQueryString = 'symbol='+queryBook[i][2][0]+'&side=SELL&type=STOP_LOSS&quantity='+Math.floor(queryBook[i][2][1])+'&stopPrice='+queryBook[i][2][2]+'&recvWindow=20000&timestamp='+responseST.serverTime;
					
				var dataQueryString = 'symbol='+queryBook[i][2][0]+'&side=SELL&type=STOP_LOSS_LIMIT&quantity='+queryBook[i][2][1]+'&price='+parseFloat(queryBook[i][2][2])+'&stopPrice='+parseFloat(queryBook[i][2][3])+'&timeInForce=GTC&recvWindow=20000&timestamp='+responseST.serverTime;
				//var dataQueryString = 'symbol='+queryBook[i][2][0]+'&side=SELL&type=STOP_LOSS&quantity='+queryBook[i][2][1]+'&price='+parseFloat(queryBook[i][2][2])+'&stopPrice='+parseFloat(queryBook[i][2][3])+'&timeInForce=GTC&recvWindow=20000&timestamp='+responseST.serverTime;
				//var dataQueryString = 'symbol='+queryBook[i][2][0]+'&side=SELL&type=STOP_LOSS&quantity='+queryBook[i][2][1]+'&stopPrice='+parseFloat(queryBook[i][2][3])+'&recvWindow=20000&timestamp='+responseST.serverTime;
				var signature = CryptoJS.HmacSHA256(dataQueryString, bytes_sk.toString(CryptoJS.enc.Utf8)).toString(CryptoJS.enc.Hex);
				var url = 'https://api.binance.com/api/v3/order?'+dataQueryString+'&signature='+signature;
				listOfArgumentsB.push([url, 'POST', 'NEW_SELL_ORDER', userDet[u].username, bytes_ak, queryBook[i][2]  ]);
				
		  }
	  }
	  
	  queryBook.splice(i, 1);
	  i--;
  }
  else if  (queryBook[i][0]=='STOP_LOSS_BUY'){
	  for (u=0; u<userDet.length; u++){
		  if (userDet[u].username == queryBook[i][1]){
			  console.log('IT SYNCED THE USERNAMES '+queryBook[i][1])
			  
				var bytes_ak  = CryptoJS.AES.decrypt(userDet[u].a_k, '#yB*32_Ppz'+userDet[u].username+'gpwo12(');
				var bytes_sk  = CryptoJS.AES.decrypt(userDet[u].s_k, '#yB*32_Ppz'+userDet[u].username+'gpwo12(');
				
				//MARKET SELL IT...
				///var dataQueryString = 'symbol='+queryBook[i][2][0]+'&side=BUY&type=STOP_LOSS&quantity='+queryBook[i][2][1]+'&stopPrice='+queryBook[i][2][2]+'&recvWindow=20000&timestamp='+responseST.serverTime;
					/* var dataQueryString = 'symbol='+queryBook[i][2][0]+'&side=BUY&type=STOP_LOSS&quantity='+Math.floor(queryBook[i][2][1])+'&stopPrice='+queryBook[i][2][2]+'&recvWindow=20000&timestamp='+responseST.serverTime;
					var signature = CryptoJS.HmacSHA256(dataQueryString, bytes_sk.toString(CryptoJS.enc.Utf8)).toString(CryptoJS.enc.Hex);
					var url = 'https://api.binance.com/sapi/v1/margin/order?'+dataQueryString+'&signature='+signature;
					listOfArgumentsB.push([url, 'POST', 'M_NEW_BUY_ORDER_MARKET', userDet[u].username, bytes_ak, queryBook[i][2]  ]);	 */
					
				var dataQueryString = 'symbol='+queryBook[i][2][0]+'&side=BUY&type=STOP_LOSS_LIMIT&quantity='+queryBook[i][2][1]+'&price='+parseFloat(queryBook[i][2][2])+'&stopPrice='+parseFloat(queryBook[i][2][3])+'&timeInForce=GTC&recvWindow=20000&timestamp='+responseST.serverTime;
				//var dataQueryString = 'symbol='+queryBook[i][2][0]+'&side=BUY&type=STOP_LOSS&quantity='+queryBook[i][2][1]+'&price='+parseFloat(queryBook[i][2][2])+'&stopPrice='+parseFloat(queryBook[i][2][3])+'&timeInForce=GTC&recvWindow=20000&timestamp='+responseST.serverTime;
					var signature = CryptoJS.HmacSHA256(dataQueryString, bytes_sk.toString(CryptoJS.enc.Utf8)).toString(CryptoJS.enc.Hex);
					var url = 'https://api.binance.com/sapi/v1/margin/order?'+dataQueryString+'&signature='+signature;
					listOfArgumentsB.push([url, 'POST', 'M_NEW_BUY_ORDER', userDet[u].username, bytes_ak, queryBook[i][2]  ]);			
				
		  }
	  }
	  
	  queryBook.splice(i, 1);
	  i--;
  }
  else if ( queryBook[i][0]=='BORROW_LIMIT_SELL') {
	   for (u=0; u<userDet.length; u++){
			if (userDet[u].username == queryBook[i][1]){
				
				var bytes_ak  = CryptoJS.AES.decrypt(userDet[u].a_k, '#yB*32_Ppz'+userDet[u].username+'gpwo12(');
				var bytes_sk  = CryptoJS.AES.decrypt(userDet[u].s_k, '#yB*32_Ppz'+userDet[u].username+'gpwo12(');
				
				
				console.log('IT SYNCED THE USERNAMES '+queryBook[i][1]);
				
				///IT MUST NOW BORROW>>>>...
				console.log('queryBook[i] BORROW BELOW:')
				console.log(queryBook[i]);
				
				//var borrowAmount = Math.floor(queryBook[i][2][1]);
				var borrowAmount = parseFloat(queryBook[i][2][1]);//*1.025;
				
				if (queryBook[i][2][0].substr(-4) == 'USDT'){
					var asset = queryBook[i][2][0].substring(0, queryBook[i][2][0].length - 4);
				}
				
				console.log('ASSET: '+asset+'borrowAmount is: '+borrowAmount);
				
				//var asset = queryBook[i][2][0];
				var dataQueryString = 'asset='+asset+'&amount='+borrowAmount+'&recvWindow=20000&timestamp='+responseST.serverTime;
				var signature = CryptoJS.HmacSHA256(dataQueryString, bytes_sk.toString(CryptoJS.enc.Utf8)).toString(CryptoJS.enc.Hex);
				var url = 'https://api.binance.com/sapi/v1/margin/loan?'+dataQueryString+'&signature='+signature;
				listOfArgumentsB.push([url, 'POST', 'BORROW', userDet[u].username, bytes_ak,  ]);
			
				//SELL IT HIGHER...
				console.log('SELLING IT HIGHER...');
				//var dataQueryString = 'symbol='+queryBook[i][2][0]+'&side=SELL&type=STOP_LOSS_LIMIT&quantity='+Math.floor(queryBook[i][2][1])+'&price='+parseFloat(queryBook[i][2][2])+'&stopPrice='+parseFloat(queryBook[i][2][3])+'&timeInForce=GTC&recvWindow=20000&timestamp='+responseST.serverTime;
				//var dataQueryString = 'symbol='+queryBook[i][2][0]+'&side=SELL&type=LIMIT&quantity='+borrowAmount+'&price='+parseFloat(queryBook[i][2][2])+'&timeInForce=GTC&recvWindow=20000&timestamp='+responseST.serverTime;
				var dataQueryString = 'symbol='+queryBook[i][2][0]+'&side=SELL&type=MARKET&quantity='+borrowAmount+'&recvWindow=20000&timestamp='+responseST.serverTime;
				var signature = CryptoJS.HmacSHA256(dataQueryString, bytes_sk.toString(CryptoJS.enc.Utf8)).toString(CryptoJS.enc.Hex);
				var url = 'https://api.binance.com/sapi/v1/margin/order?'+dataQueryString+'&signature='+signature;
				listOfArgumentsC.push([url, 'POST', 'NEW_SELL_ORDER_M', userDet[u].username, bytes_ak, queryBook[i][2]  ]);	
				
				//if (queryBook[i][3].substr(-4) == 'USDT'){
				//	var assetOfPair = queryBook[i][3].substring(0, queryBook[i][3].length - 4);
				//	var dataQueryStringB = 'asset='+assetOfPair+'&recvWindow=20000&timestamp='+responseST.serverTime;
				//	var signatureB = CryptoJS.HmacSHA256(dataQueryStringB, bytes_sk.toString(CryptoJS.enc.Utf8)).toString(CryptoJS.enc.Hex);
				//	var urlB = 'https://api.binance.com/sapi/v1/margin/maxBorrowable?'+dataQueryStringB+'&signature='+signatureB;
				//	listOfArgumentsB.push([urlB, 'GET', 'MAX_BORROW', userDet[u].username, bytes_ak, queryBook[i][3]  ]);
				//}
				
			}
	   }
	 queryBook.splice(i, 1);
	  i--;
  }
  else if ( queryBook[i][0]=='TRANSFER_TO_MARGIN') {
	   for (u=0; u<userDet.length; u++){
			if (userDet[u].username == queryBook[i][1]){
				
				var bytes_ak  = CryptoJS.AES.decrypt(userDet[u].a_k, '#yB*32_Ppz'+userDet[u].username+'gpwo12(');
				var bytes_sk  = CryptoJS.AES.decrypt(userDet[u].s_k, '#yB*32_Ppz'+userDet[u].username+'gpwo12(');
				
				console.log('TRANSFER_TO_MARGIN BELOW');
				console.log('IT SYNCED THE USERNAMES '+queryBook[i][1]);
				
				//var amountToTransfer = (parseFloat((queryBook[i][2]*1.03)*(0.1/0.4))).toFixed(2);
				var amountToTransfer = (parseFloat((queryBook[i][2]*1.04)*(0.1/0.2))).toFixed(2);
				console.log('amountToTransfer is: '+amountToTransfer)
				var asset='USDT';
				var type = 1;
				var dataQueryString = 'asset='+asset+'&amount='+amountToTransfer+'&type='+type+'&recvWindow=20000&timestamp='+responseST.serverTime;
				var signature = CryptoJS.HmacSHA256(dataQueryString, bytes_sk.toString(CryptoJS.enc.Utf8)).toString(CryptoJS.enc.Hex);
				var url = 'https://api.binance.com/sapi/v1/margin/transfer?'+dataQueryString+'&signature='+signature;
				listOfArguments.push([url, 'POST', 'TRANSFER_TO_MARGIN', userDet[u].username, bytes_ak,  ]);
				
				//if (queryBook[i][3].substr(-4) == 'USDT'){
				//	var assetOfPair = queryBook[i][3].substring(0, queryBook[i][3].length - 4);
				//	var dataQueryStringB = 'asset='+assetOfPair+'&recvWindow=20000&timestamp='+responseST.serverTime;
				//	var signatureB = CryptoJS.HmacSHA256(dataQueryStringB, bytes_sk.toString(CryptoJS.enc.Utf8)).toString(CryptoJS.enc.Hex);
				//	var urlB = 'https://api.binance.com/sapi/v1/margin/maxBorrowable?'+dataQueryStringB+'&signature='+signatureB;
				//	listOfArgumentsB.push([urlB, 'GET', 'MAX_BORROW', userDet[u].username, bytes_ak, queryBook[i][3]  ]);
				//}
				
			}
	   }
	  queryBook.splice(i, 1);
	  i--;
  }
  else if ( queryBook[i][0]=='REPAY_AND_TRANSFER_TO_MAIN') {
	  for (u=0; u<userDet.length; u++){
			if (userDet[u].username == queryBook[i][1]){
				
				var bytes_ak  = CryptoJS.AES.decrypt(userDet[u].a_k, '#yB*32_Ppz'+userDet[u].username+'gpwo12(');
				var bytes_sk  = CryptoJS.AES.decrypt(userDet[u].s_k, '#yB*32_Ppz'+userDet[u].username+'gpwo12(');
				console.log('IT SYNCED THE USERNAMES TO REPAY A'+queryBook[i][1]);
				
				//var asset='USDT';
				if (queryBook[i][2][0].substr(-4) == 'USDT'){
					var asset = queryBook[i][2][0].substring(0, queryBook[i][2][0].length - 4);
				
					var amount = queryBook[i][2][1];
					var dataQueryString = 'asset='+asset+'&amount='+amount+'&recvWindow=20000&timestamp='+responseST.serverTime;
					var signature = CryptoJS.HmacSHA256(dataQueryString, bytes_sk.toString(CryptoJS.enc.Utf8)).toString(CryptoJS.enc.Hex);
					var url = 'https://api.binance.com/sapi/v1/margin/repay?'+dataQueryString+'&signature='+signature;
					listOfArguments.push([url, 'POST', 'REPAY_MARGIN', userDet[u].username, bytes_ak,  ]);
				}
		///----------------------------------------------------------------------------------------------------
				/* var amountB = queryBook[i][2][2];
				console.log('queryBook[i][2][2]'+queryBook[i][2][2]);
				var assetB='USDT';
				var type = 2;
				var dataQueryStringB = 'asset='+assetB+'&amount='+amountB+'&type='+type+'&recvWindow=20000&timestamp='+responseST.serverTime;
				var signatureB = CryptoJS.HmacSHA256(dataQueryStringB, bytes_sk.toString(CryptoJS.enc.Utf8)).toString(CryptoJS.enc.Hex);
				var urlB = 'https://api.binance.com/sapi/v1/margin/transfer?'+dataQueryStringB+'&signature='+signatureB;
				listOfArgumentsB.push([urlB, 'POST', 'TRANSFER_TO_MAIN', userDet[u].username, bytes_ak,  ]); */
				
			}
	  }
		queryBook.splice(i, 1);
		i--;
  }
   else if ( queryBook[i][0]=='TRANSFER_TO_MAIN') {
	  for (u=0; u<userDet.length; u++){
			if (userDet[u].username == queryBook[i][1]){
				
				var bytes_ak  = CryptoJS.AES.decrypt(userDet[u].a_k, '#yB*32_Ppz'+userDet[u].username+'gpwo12(');
				var bytes_sk  = CryptoJS.AES.decrypt(userDet[u].s_k, '#yB*32_Ppz'+userDet[u].username+'gpwo12(');
				console.log('IT SYNCED THE USERNAMES TO REPAY B'+queryBook[i][1]);
				
				//var asset='USDT';
				/* if (queryBook[i][2][0].substr(-4) == 'USDT'){
					var asset = queryBook[i][2][0].substring(0, queryBook[i][2][0].length - 4);
				} */
		///----------------------------------------------------------------------------------------------------------------------		
		//		var amount = queryBook[i][2][1];
		//		var dataQueryString = 'asset='+asset+'&amount='+amount+'&recvWindow=20000&timestamp='+responseST.serverTime;
		//		var signature = CryptoJS.HmacSHA256(dataQueryString, bytes_sk.toString(CryptoJS.enc.Utf8)).toString(CryptoJS.enc.Hex);
		//		var url = 'https://api.binance.com/sapi/v1/margin/repay?'+dataQueryString+'&signature='+signature;
		//		listOfArguments.push([url, 'POST', 'REPAY_MARGIN', userDet[u].username, bytes_ak,  ]);
		///----------------------------------------------------------------------------------------------------
				var amountB = parseFloat(queryBook[i][2][1]);
				//var amountB = (parseFloat((queryBook[i][2][1]*1.03)*(0.1/0.4))).toFixed(2);
				//var amountB = (parseFloat((queryBook[i][2][1]*1.03)*(0.1/0.4))).toFixed(2);
				
				console.log('queryBook[i][2][1]'+queryBook[i][2][1]);
				var assetB='USDT';
				var type = 2;
				var dataQueryStringB = 'asset='+assetB+'&amount='+amountB+'&type='+type+'&recvWindow=20000&timestamp='+responseST.serverTime;
				var signatureB = CryptoJS.HmacSHA256(dataQueryStringB, bytes_sk.toString(CryptoJS.enc.Utf8)).toString(CryptoJS.enc.Hex);
				var urlB = 'https://api.binance.com/sapi/v1/margin/transfer?'+dataQueryStringB+'&signature='+signatureB;
				listOfArgumentsB.push([urlB, 'POST', 'TRANSFER_TO_MAIN', userDet[u].username, bytes_ak,  ]);
				
			}
	  }
		queryBook.splice(i, 1);
		i--;
  }
  else if ( queryBook[i][0]=='TRANSFER_AND_PAY_BNB_INT') {
	  for (u=0; u<userDet.length; u++){
			if (userDet[u].username == queryBook[i][1]){
				
				var bytes_ak  = CryptoJS.AES.decrypt(userDet[u].a_k, '#yB*32_Ppz'+userDet[u].username+'gpwo12(');
				var bytes_sk  = CryptoJS.AES.decrypt(userDet[u].s_k, '#yB*32_Ppz'+userDet[u].username+'gpwo12(');
				console.log('IT SYNCED THE USERNAMES TO REPAY C'+queryBook[i][1]);
				
				//var asset='USDT';
				//if (queryBook[i][2][0].substr(-4) == 'USDT'){
				//	var asset = queryBook[i][2][0].substring(0, queryBook[i][2][0].length - 4);
				//}
				
				var amountB = queryBook[i][2][1];
				console.log('queryBook[i][2][2]'+queryBook[i][2][1]);
				if (amountB >0){
					var assetB='BNB';
					var type = 1;
					var dataQueryStringB = 'asset='+assetB+'&amount='+amountB+'&type='+type+'&recvWindow=20000&timestamp='+responseST.serverTime;
					var signatureB = CryptoJS.HmacSHA256(dataQueryStringB, bytes_sk.toString(CryptoJS.enc.Utf8)).toString(CryptoJS.enc.Hex);
					var urlB = 'https://api.binance.com/sapi/v1/margin/transfer?'+dataQueryStringB+'&signature='+signatureB;
					listOfArguments.push([urlB, 'POST', 'TRANSFER_TO_MARGIN', userDet[u].username, bytes_ak,  ]);
				}
				
		///----------------------------------------------------------------------------------------------------		
				var amount = queryBook[i][2][2];
				var dataQueryString = 'asset='+assetB+'&amount='+amount+'&recvWindow=20000&timestamp='+responseST.serverTime;
				var signature = CryptoJS.HmacSHA256(dataQueryString, bytes_sk.toString(CryptoJS.enc.Utf8)).toString(CryptoJS.enc.Hex);
				var url = 'https://api.binance.com/sapi/v1/margin/repay?'+dataQueryString+'&signature='+signature;
				listOfArgumentsB.push([url, 'POST', 'REPAY_MARGIN', userDet[u].username, bytes_ak,  ]);
		
				
			}
	  }
		queryBook.splice(i, 1);
		i--;
  }
  
  
  
  
  
  
  
  

}
		///- --- - --- - ---
	}
	else {
		console.log('NO INTERNET CONNECTION')
	}
	
	

var fs_p = require('fs').promises;
	try {
		await fs_p.writeFile('1queryBook.json', JSON.stringify(queryBook));
		//console.info("File created successfully with Node.js v13 fs_p.promises!");
	} catch (error){
		console.error(error);
	}
	
	//console.log('-   -   -   -   -   -   -')
console.log('-      -      -      -      -      -      -')
console.log('Make orders: listOfArguments LENGTH:'+listOfArguments.length);
console.log('Make orders: listOfArgumentsB LENGTH:'+listOfArgumentsB.length);
console.log('Make orders: listOfArgumentsC LENGTH:'+listOfArgumentsC.length);
console.log('-      -      -      -      -      -      -')
totalOrderRequests = listOfArguments.length + listOfArgumentsB.length + listOfArgumentsC.length;
console.log('-      -      -      -      -      -      -')
console.log('Make orders: TOTAL REQUESTS::'+totalOrderRequests);
console.log('-      -      -      -      -      -      -')
//console.log('-   -   -   -   -   -   -')

//console.log('listOfArgumentsB below:');
//console.log(listOfArgumentsB);
//console.log(listOfArgumentsB.length);

/* console.log('recordMakeOrders B:');
	console.log(recordMakeOrders);
	console.log('_+_+_+_+_+_++__+_+_+_+_+_+_+_+_+_+_+_+_+_') */

/*  recordMakeOrders.push({
						
						date: now.format('YYYY-MM-DD HH:mm:ss'),
						orderPrice: 'index[5][2]',
						orderQty:'index[5][1]',
						orderStopPrice: 'index[5][3]',
						orderType:'SELL',
						symbol: 'index[5][0]',
						system:'_makeOrders.js',
						orderId:'orderResponseBuy.orderId',
						discountPercent: 'index[5][4]',
						model: 'index[5][5]',
						chart: 'index[5][6]',
					})
					update_recordMakeOrders=1;   */

/* console.log('recordMakeOrders C:');
	console.log(recordMakeOrders[0].symbol);
	console.log('_+_+_+_+_+_++__+_+_+_+_+_+_+_+_+_+_+_+_+_') */

var promList = [];

// Fake async: resolve an array through arbitrary delay
// Increase a counter in order to watch amount of Promises executed
const asyncOperation = index => {
  counter++;
  return new Promise((resolve, reject) => {
  
  
  ///------------------------------------------------------------
		// console.log('MakeOrders: index[0] sent:'+index[0]);
		 
		 const controller = new AbortController();
		setTimeout(() => controller.abort(), 20000);
	  
		
		//var fetchVar;
		var initObject={};
		//let reqHeader = new Headers();
		
		if (index[2]!='SERVERTIME_TEST'){  //SERVERTIME_TEST COMMENT EVERYTHING OUT... 
			initObject = {
				method: index[1], headers: {'X-MBX-APIKEY': index[4].toString(CryptoJS.enc.Utf8)}, signal: controller.signal,
			}; 
		}
		else {
			initObject = {
				method: index[1],
			}; 
		} 
		
		
		fetch( index[0], initObject )
			.then((response)=> {
				return response.json();
			})
			.then(function (data) {
				console.log('----------------------');
			//	console.log('result. below. ...')
				//console.log(data);
				
				console.log('Operation performed:', index[0]);
				counter--;
				
						///    =-=-=--=-=--=-=-=--=
						
				promList.push([index[0],  index[2], index[3], data]);
				//j_prom.push(data);
				var orderResponseBuy = data;
				
				
	  
				
	  
				if ( (index[2]=='M_NEW_BUY_ORDER') && (orderResponseBuy.orderId) ) {
					
					recordMakeOrders.push({
						date: now.format('YYYY-MM-DD HH:mm:ss'),
						orderPrice: index[5][2],
						orderQty:index[5][1],
						orderStopPrice: index[5][3],
						orderType:'SHORT_BUY',
						symbol: index[5][0],
						system:'_makeOrders.js',
						orderId:orderResponseBuy.orderId,
						initialPrice: index[5][4],
						discountPercent: index[5][5],
						model: index[5][6],
						chart: index[5][7],
					})
					update_recordMakeOrders=1;
					
					console.log({
						date: now.format('YYYY-MM-DD HH:mm:ss'),
						orderPrice: index[5][2],
						orderQty:index[5][1],
						orderStopPrice: index[5][3],
						orderType:'SHORT_BUY',
						symbol: index[5][0],
						system:'_makeOrders.js',
						orderId:orderResponseBuy.orderId,
						initialPrice: index[5][4],
						discountPercent: index[5][5],
						model: index[5][6],
						chart: index[5][7],
						
					})

					snapDataOrders.push({"Key":index[3], 
					"Data":{
						date: now.format('YYYY-MM-DD HH:mm:ss'),
						orderPrice: index[5][2],
						orderQty:index[5][1],
						orderStopPrice: index[5][3],
						orderType:'SHORT_BUY',
						symbol: index[5][0],
						system:'_makeOrders.js',
						orderId:orderResponseBuy.orderId,
						initialPrice: index[5][4],
						discountPercent: index[5][5],
						model: index[5][6],
						chart: index[5][7],
						
					}  
					})
					update_snapDataOrders=1;
				}
	  
				if ((index[2]=='M_NEW_BUY_ORDER_MARKET') && (orderResponseBuy.orderId) ){
					
					recordMakeOrders.push({
						date: now.format('YYYY-MM-DD HH:mm:ss'),
						orderPrice: index[5][2],
						orderQty:index[5][1],
						orderType:'SHORT_BUY MARKET',
						symbol: index[5][0],
						system:'_makeOrders.js',
						orderId:orderResponseBuy.orderId,
						initialPrice: index[5][3],
						model: index[5][5],
						chart: index[5][6],
						discountPercent: index[5][4],
					})
					update_recordMakeOrders=1;
					
					console.log({
						date: now.format('YYYY-MM-DD HH:mm:ss'),
						orderPrice: index[5][2],
						orderQty:index[5][1],
						orderType:'SHORT_BUY MARKET',
						symbol: index[5][0],
						system:'_makeOrders.js',
						orderId:orderResponseBuy.orderId,
						initialPrice: index[5][3],
						model: index[5][5],
						chart: index[5][6],
						discountPercent: index[5][4],
						
					})

					snapDataOrders.push({"Key":index[3], 
					"Data":{
						date: now.format('YYYY-MM-DD HH:mm:ss'),
						orderPrice: index[5][2],
						orderQty:index[5][1],
						orderType:'SHORT_BUY MARKET',
						symbol: index[5][0],
						system:'_makeOrders.js',
						orderId:orderResponseBuy.orderId,
						initialPrice: index[5][3],
						model: index[5][5],
						chart: index[5][6],
						discountPercent: index[5][4],
					}  
					})
					update_snapDataOrders=1;
				}
	  
				if ( (index[2]=='NEW_SELL_ORDER_MARKET') && (orderResponseBuy.orderId) ){
					
					recordMakeOrders.push({
						date: now.format('YYYY-MM-DD HH:mm:ss'),
						orderPrice: index[5][2],
						orderQty:index[5][1],
						orderStopPrice: index[5][3],
						orderType:'SELL',
						symbol: index[5][0],
						system:'_makeOrders.js',
						orderId:orderResponseBuy.orderId,
						discountPercent: index[5][4],
						model: index[5][5],
						chart: index[5][6],
					})
					update_recordMakeOrders=1;

					snapDataOrders.push({"Key":index[3], 
					"Data":{
						date: now.format('YYYY-MM-DD HH:mm:ss'),
						orderPrice: index[5][2],
						orderQty:index[5][1],
						orderType:'MARKET SELL',
						symbol: index[5][0],
						system:'_makeOrders.js',
						orderId:orderResponseBuy.orderId,
						discountPercent: index[5][3],
						model: index[5][4],
						chart: index[5][5],
						}  
					})		
					update_snapDataOrders=1;
				}
	  
				if ((index[2]=='NEW_SELL_ORDER') && (orderResponseBuy.orderId) ){
					
					recordMakeOrders.push({
						date: now.format('YYYY-MM-DD HH:mm:ss'),
						orderPrice: index[5][2],
						orderQty:index[5][1],
						orderStopPrice: index[5][3],
						orderType:'SELL',
						symbol: index[5][0],
						system:'_makeOrders.js',
						orderId:orderResponseBuy.orderId,
						discountPercent: index[5][4],
						model: index[5][5],
						chart: index[5][6],
					})
					update_recordMakeOrders=1;

					snapDataOrders.push({"Key":index[3], 
					"Data":{
						date: now.format('YYYY-MM-DD HH:mm:ss'),
						orderPrice: index[5][2],
						orderQty:index[5][1],
						orderStopPrice: index[5][3],
						orderType:'SELL',
						symbol: index[5][0],
						system:'_makeOrders.js',
						orderId:orderResponseBuy.orderId,
						discountPercent: index[5][4],
						model: index[5][5],
						chart: index[5][6],
						}  
					})
					update_snapDataOrders=1;
				}
				
				if (!(orderResponseBuy.orderId)){
					console.log('NOTE: INVALID ORDER ID...__-->')
				}
	  
				
	  
				if (index[2]=='MAX_BORROW'){
					borrowArr.push([ index[3], index[5], data ])
		  
					//j_prom.push(data);
				}
						
						////  -=-==-=-=-==-=-
								
				
				resolve();
				
				console.log('=====================')
			})
			.catch(function (err) {
				console.log('X X X X X X X X X X X X X X X X X X X X');
				console.log('Operation REJECTED below:', index[0]);
				console.log("Something went wrong!", err);
				
				console.log('X X X X X X X X X X X X X X X X X X X X')
				
				resolve();
			});
  ///-----------------------------------------------------------
  
		
});

console.log('ORDERS: Asynchronous request made.');


   
   
  
	
 
	
};

// Helper funtion to see the amount of running Promises each second
const watchCounter = () => {
  console.log('Promises running in the beginning:', counter);

  if (interval) {
    clearInterval(interval);
  }
  
 

  interval = setInterval(() => console.log('-----------Promises running:', counter), 1000);
  
	
		
	
  
   
  
};



async function take3subtake1part0() {
  const concurrencyLimit = 10;
  const argsCopy = listOfArguments.slice();
  const promises = new Array(concurrencyLimit).fill(Promise.resolve());
  // Recursively chain the next Promise to the currently executed Promise
  function chainNext(p) {
    if (argsCopy.length) {
      const arg = argsCopy.shift();
      return p.then(() => {
        const operationPromise = asyncOperation(arg);
        return chainNext(operationPromise);
      })
    }
    return p;
  }

  await Promise.all(promises.map(chainNext));
}

async function take3subtake1part0B() {
  const concurrencyLimit = 10;
  const argsCopy = listOfArgumentsB.slice();
  const promises = new Array(concurrencyLimit).fill(Promise.resolve());
  // Recursively chain the next Promise to the currently executed Promise
  function chainNext(p) {
    if (argsCopy.length) {
      const arg = argsCopy.shift();
      return p.then(() => {
        const operationPromise = asyncOperation(arg);
        return chainNext(operationPromise);
      })
    }
    return p;
  }

  await Promise.all(promises.map(chainNext));
}

async function take3subtake1part0C() {
  const concurrencyLimit = 10;
  const argsCopy = listOfArgumentsC.slice();
  const promises = new Array(concurrencyLimit).fill(Promise.resolve());
  // Recursively chain the next Promise to the currently executed Promise
  function chainNext(p) {
    if (argsCopy.length) {
      const arg = argsCopy.shift();
      return p.then(() => {
        const operationPromise = asyncOperation(arg);
        return chainNext(operationPromise);
      })
    }
    return p;
  }

  await Promise.all(promises.map(chainNext));
}







//setTimeout( watchCounter, 1000*3);

/* console.log('listOfArguments below:');
console.log(listOfArguments);
var promList = await take3subtake1part1();
console.log('----promList Below:---- ');
console.log(promList); */

console.log('About to run promises...');
 await take3subtake1part0();
 console.log('listOfArguments #: '+listOfArguments.length);
console.log('promList #: '+promList.length);
console.log('----promList Below:---- ');
	console.log(promList);

console.log('borrowArr is below:');
console.log(borrowArr);



/* console.log('First PromList completed... Moving on...')
console.log('listOfArgumentsB below:');
console.log(listOfArgumentsB);
 */


	const controllerB = new AbortController();
	setTimeout(() => controllerB.abort(), 20000);
	//controllerB.abort();
	 response = await fetch('https://www.binance.com/api/v3/time', {signal: controllerB.signal,} ).catch((error)=>console.log(error));
	 
	 if (response){
		 // // // // //
		 responseST = await response.json();




		var date_A = new Date();
		console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXX__________________XXXXXXXXXXXXXXXXXXXXXX')
		console.log('WAITING TO START makeOrders B: '+date_A)

		async function go_ () {
			
			console.log('About to run promisesB...');
			await take3subtake1part0B();
				console.log('listOfArguments #: '+listOfArgumentsB.length);
				console.log('promList #: '+promList.length);
			
			var date_B = new Date();
			console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXX__________________XXXXXXXXXXXXXXXXXXXXXX')
			console.log('FINISHED makeOrders B: '+date_B)
			
			console.log('----promListB Below:---- ');
			console.log(promList);
			
			
			
			
			
			
			
			console.log('-------------- NEW : NOW FOR promises C');
			console.log('About to run promisesC...');
			await take3subtake1part0C();
				console.log('listOfArguments #: '+listOfArgumentsC.length);
				console.log('promList #: '+promList.length);
				console.log('-------------- NEW end : NOW FOR promises C');
			
			
			
	
				console.log('//0--------------------------------////0--------------------------------');
				console.log('update_snapDataOrders --> '+update_snapDataOrders);
				console.log('//0--------------------------------////0--------------------------------');
				/* console.log('snapDataOrders ARRAY BELOW:');
				console.log(snapDataOrders); */
				console.log('----------')
				 if (update_snapDataOrders==1){
					 
					
					
					
					 
					 
					let groupedData = snapDataOrders.reduce((results, item) => {
						results[item.Key] = results[item.Key] || [];
						results[item.Key].push(item.Data);

						return results;
					}, {});
					
					
					
					//snapDataOrders.push(sDO)

					/* console.log('REAL groupedData BELOW....');
					console.log(groupedData); */
					
					/* console.log('COMBINED BELOW:::... ');
					sDOArr.push(groupedData);
					console.log(sDOArr); */
					
					
					
					console.log('.. .. .. ..')

					firebase.database().ref('/ordersMulti/').set(groupedData);
					firebase.database().ref('/ordersMultiB/').set(groupedData);
					/* firebase.database().ref('/Ins/'+queryBook[i][1]+'_B').set({
													ws_key_B: JSON.parse( JSON.stringify(ws_json_B) ),
												}) */
												
				} 

   //TOLoopA = setTimeout(go, timeBreak); // callback
		   return;
		}
//go();//here and bove

/* var partTwo_B = setTimeout(go_, 20000); //20 seconds... */

//console.log('??? BTHIS ////___')

await new Promise((resolve)=>setTimeout(() => {
        console.log("timeout ? ???? ?????????");
        go_();
		resolve();
    }, 2000)); 
		 // // // // //
		 
		 
		// console.log('??? THIS ////')
		 
	 }
	 else {
		 console.log('NO INTERNET CONNECTION to run part B of Make Orders')
	 }
	 

//if (counter==0){	
//	clearInterval(interval);
//}



//console.log(promList)

/* console.log('recordMakeOrders below');
console.log(recordMakeOrders); */

console.log('update_recordMakeOrders....: '+update_recordMakeOrders)
	if (update_recordMakeOrders==1){
			try {
				await fs_p.writeFile('json/recordMakeOrders.json', JSON.stringify(recordMakeOrders));
				console.info("File created successfully with Node.js v13 fs_p.promises!");
			} catch (error){
				console.error(error);
			} 
		}


var d = new Date();
	console.log('Time End:'+d);

	return totalOrderRequests;

}

module.exports ={
        makeAllOrders
    }