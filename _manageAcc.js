


//loadAccounts();

//algoLoopC();
//algoLoopD();
//var timeVar = 61500*16; 
//var myVarC = setInterval(loadAccounts, timeVar);//16 minutes.

async function loadAccounts() {
	
	var d = new Date();
	console.log('Manage Acc Time Start:'+d);
	
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

/* const configT = require('./configB');
const twit = require('twit');
const T = new twit(configT); */

/* T.post('statuses/update', { status: 'FIRST BOT TWEET: Hello world!' }, function(err, data, response) {
  console.log(data)
}) */
	
	const fetch = require('node-fetch');
	
	var CryptoJS = require("crypto-js");
	const AbortController = require("abort-controller");
	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	
	var moment = require('moment');
	var now = moment();
	
	var fs = require('fs');
	
	var fJ = fs.readFileSync('flipped.json','utf8');
			//if (tcp){
				var flippedJSON = JSON.parse(fJ);//its okay for it to be here, it does get updated all the time...
				
				/* var l_flipA = flippedJSON.l_flipA;
				var l_flipB = flippedJSON.l_flipB;
				var s_flipA = flippedJSON.s_flipA;
				var s_flipB = flippedJSON.s_flipB; */
				//console.log('snapActSim:'+snapActSim+' & s_snapSimBusy:'+s_snapSimBusy)
			//} 
			
	/* var fJ = fs.readFileSync('flipped.json','utf8');
	var flippedJSON = JSON.parse(fJ); */
	
	var recordCoinPerformance = [];
	var update_recordCoinPerformance = 0;
	var qc = fs.readFileSync('json/recordCoinPerformance.json','utf8');
	if (qc){
		recordCoinPerformance = JSON.parse(qc);
	}
	
	var tallyCoinPerformance = {};
	var update_tallyCoinPerformance = 0;
	var tcp = fs.readFileSync('json/tallyCoinPerformance.json','utf8');
	if (tcp){
		tallyCoinPerformance = JSON.parse(tcp);
	} 
	
	var tallyCoinPerformance_S = {};
	var update_tallyCoinPerformance_S = 0;
	var tcps = fs.readFileSync('json/tallyCoinPerformance_S.json','utf8');
	if (tcps){
		tallyCoinPerformance_S = JSON.parse(tcps);
	} 
	
	var recordTestAccount = [];
	var update_recordTestAccount = 0;
	var rtc = fs.readFileSync('json/recordTestAccount.json','utf8');
	if (rtc){
		recordTestAccount = JSON.parse(rtc);
	}
	
	var recordSimAccount = [];
	var update_recordSimAccount = 0;
	var rsc = fs.readFileSync('json/recordSimAccount.json','utf8');
	if (rsc){
		recordSimAccount = JSON.parse(rsc);
	}
	
	var update_updateAgain=0;
	var updateAgain=0;
	var upAg = fs.readFileSync('json/updateTimeAgain.txt','utf8');
	if (upAg){
		updateAgain=upAg;
	}
	console.log('updateAgain ___:'+updateAgain)
	
	
	//import { promises as fs } from 'fs';
	//import {default as fsWithCallbacks} from 'fs'
	//const fs = fsWithCallbacks.promises
	//import {readFile} from 'fs/promise;
	
	const controllerA = new AbortController();
	setTimeout(() => controllerA.abort(), 20000);
	//controllerA.abort();
	let response = await fetch('https://www.binance.com/api/v3/time', {signal: controllerA.signal,} ).catch((error)=>console.log(error));
	
	let counter = 0;
	let interval;
	const numberOfOperations = 0;
	var snapshot_W = [];

	const listOfArguments = [];
	
	const controllerA_P = new AbortController();
		setTimeout(() => controllerA_P.abort(), 20000);
		let responseA_P = await fetch('https://www.binance.com/api/v3/ticker/price', {signal: controllerA_P.signal,} ).catch((error)=>console.log(error));
	
	let responseAP_ = []
	if (responseA_P){
		responseAP_ = await responseA_P.json();	
		//console.log('responseAP_ below:');
		//console.log(responseAP_);
	}
	
	
	
	let snapDataAccounts_ = [];
	var snapshot_accounts = await firebase.database().ref('/users/').once('value').catch((error)=>console.log(error));
	snapDataAccounts_ = snapshot_accounts.val() || [];
	
	let userDet = [];
	let users = [];
	let l=0;
	for (x in snapDataAccounts_) {
		userDet[l] = snapDataAccounts_[x];
		users[l] = x;
		l++;
	}
	
	
	if (response){
		
		/// | | | | | | | | | | | | | | | | | | | | |
		let responseST = await response.json();	
		console.log('SERVER TIME:'+responseST.serverTime);
		
		
		
		
		
	
	snapshot_X = await firebase.database().ref('/Ins/_test__S/').once('value').catch((error)=>console.log(error));
	var ws_ws_json_Sim = (snapshot_X.val() && snapshot_X.val().ws_key) || [];
	ws_ws_json_Sim = ws_ws_json_Sim.filter(function(x){return x !== null});
	
	snapshot_XB = await firebase.database().ref('/Ins/_testACC__S/').once('value').catch((error)=>console.log(error));
	var ws_ws_json_AT = (snapshot_XB.val() && snapshot_XB.val().ws_key) || [];
	ws_ws_json_AT = ws_ws_json_AT.filter(function(x){return x !== null});
	
	
	//var s_ws_ws_json_Sim = (snapshot_X.val() && snapshot_X.val().ws_key_short_B) || [];
	snapshot_W = await firebase.database().ref('/general/').once('value').catch((error)=>console.log(error));

	
	
	//console.log(' userDet below : ');
	//console.log(userDet);
	
	//console.log(' users below : '+users.length);
	//console.log(users);
	
	
	
	



//const argumentSymbol = [];
// Delays per operation to fake async request

//const argumentsAccBalance = [];
	

// Fill delays in order to use the same array between all invocations
// Single delay is a value in milliseconds from 1000 to 10000
for (let i = 0; i < users.length; i++) {
  //listOfArguments.push(i);
  
	var ws_user = users[i];
	
	
  
	var ws_json_S=[];
	snapshot_Sell = await firebase.database().ref('/Ins/'+ws_user+'_S').once('value').catch((error)=>console.log(error));
	ws_json_S = (snapshot_Sell.val() && snapshot_Sell.val().ws_key) || [];
	ws_json_S = ws_json_S.filter(function(x){return x !== null});
	var short_B = (snapshot_Sell.val() && snapshot_Sell.val().ws_key_short_B) || [];
	//console.log('ws_json_S below:');
	//console.log(ws_json_S);
	ws_json_S = ws_json_S.filter(function(x){return x !== null});
	//console.log('NEW LIST ws_json_S below:');
	//console.log(ws_json_S);
	//for looop for selling queries
	
	var ws_json_B=[];
	snapshot_Buy = await firebase.database().ref('/Ins/'+ws_user+'_B').once('value').catch((error)=>console.log(error));
	ws_json_B = (snapshot_Buy.val() && snapshot_Buy.val().ws_key_B) || [];
	ws_json_B = ws_json_B.filter(function(x){return x !== null});
	
	var short_S = (snapshot_Buy.val() && snapshot_Buy.val().ws_key_short_S) || [];
	
	if ((ws_user!='_test_') && (ws_user!='_testACC_')) {
		//userDet[i].a_k;
		//userDet[i].s_k;
		//var keys = { 'akey' : userDet[i].a_k, 'skey' : userDet[i].s_k }
		
		//var dataQueryString = 'recvWindow=20000&timestamp=' + Date.now();
		var dataQueryString = 'recvWindow=20000&timestamp='+responseST.serverTime;
		var bytes_ak  = CryptoJS.AES.decrypt(userDet[i].a_k, '#yB*32_Ppz'+ws_user+'gpwo12(');
		var bytes_sk  = CryptoJS.AES.decrypt(userDet[i].s_k, '#yB*32_Ppz'+ws_user+'gpwo12(');
		
		var signature = CryptoJS.HmacSHA256(dataQueryString, bytes_sk.toString(CryptoJS.enc.Utf8)).toString(CryptoJS.enc.Hex);
		var url = 'https://api.binance.com/api/v3/account?'+dataQueryString+'&signature='+signature;
		listOfArguments.push([url, 'GET', 'S_REST', ws_user, bytes_ak, 'accBal', [userDet[i].baseProfit, userDet[i].btcBal, userDet[i].usdBal, userDet[i].btcQty, ws_json_B, ws_json_S, userDet[i].toggleSwitch, short_S, short_B, userDet[i].toggleSwitchShort, userDet[i].hoursBT,  ]  ]); 
		
		var signatureB = CryptoJS.HmacSHA256(dataQueryString, bytes_sk.toString(CryptoJS.enc.Utf8)).toString(CryptoJS.enc.Hex);
		var urlB = 'https://api.binance.com/api/v3/openOrders?'+dataQueryString+'&signature='+signatureB;
		listOfArguments.push([urlB, 'GET', 'S_REST', ws_user, bytes_ak, 'openOrders' ]);
		
		//if (users[i] == 'oJhPznC7LyXGnbnFYLxiTUBbudF3'){
		if (userDet[i].toggleSwitchShort==1){
			
			var signatureD = CryptoJS.HmacSHA256(dataQueryString, bytes_sk.toString(CryptoJS.enc.Utf8)).toString(CryptoJS.enc.Hex);
			var urlD = 'https://api.binance.com/sapi/v1/margin/account?'+dataQueryString+'&signature='+signatureD;
			listOfArguments.push([urlD, 'GET', 'S_REST', ws_user, bytes_ak, 'M_accBal', [userDet[i].baseProfit, userDet[i].btcBal, userDet[i].usdBal, userDet[i].btcQty, ws_json_B, ws_json_S, userDet[i].toggleSwitch, short_S, short_B, ]  ]); 
			
			var signatureC = CryptoJS.HmacSHA256(dataQueryString, bytes_sk.toString(CryptoJS.enc.Utf8)).toString(CryptoJS.enc.Hex);
			var urlC = 'https://api.binance.com/sapi/v1/margin/openOrders?'+dataQueryString+'&signature='+signatureC;
			listOfArguments.push([urlC, 'GET', 'S_REST', ws_user, bytes_ak, 'openOrdersMargin' ]);
		}
		
		
		
	}
	
	for (k=0; k<ws_json_S.length; k++){
		// console.log('ws_json_S symbol:: below...');
		// console.log(ws_json_S[k].symB);
		
		if (ws_json_S[k].monitorButtonText =='Stop Monitoring'){
			listOfArguments.push(['https://api.binance.com/api/v3/depth?symbol='+ws_json_S[k].symB+'&limit=5', 'GET', 'SELL', ws_user, ws_json_S, k, short_B, ws_json_S[k].symB]);
			
			var chartParam ='30m';
			/* if (ws_json_S[k].chart_c){
				var chartNum = parseFloat(ws_json_S[k].chart_c)-1;
				if (chartNum==0){
					chartParam ='30m';
				}
				if (chartNum==1){
					chartParam ='1h';
				}
				if (chartNum==2){
					chartParam ='2h';
				}
				if (chartNum==3){
					chartParam ='4h';
					//chartParam ='2h';
				}
				if (chartNum==4){
					chartParam ='1d';
					//chartParam ='4h';
				}
			} */
			
			console.log('listOfArguments.push SYM:'+ws_json_S[k].symB+' & CHART:'+chartParam);
			
			//listOfArguments.push(['https://api.binance.com/api/v3/klines?symbol='+ws_json_S[k].symB+'&interval='+chartParam+'&limit=60', 'GET', 'SELL_KLINES', ws_user, ws_json_S, k, short_B ]);
			listOfArguments.push(['https://api.binance.com/api/v3/klines?symbol='+ws_json_S[k].symB+'&interval='+chartParam+'&limit=60', 'GET', 'SELL_KLINES', ws_user, ws_json_S, k, short_B ]);
		}
	}
	
	
	
	for (k=0; k<ws_json_B.length; k++){
		if (ws_json_B[k].monitorButtonText =='Stop Monitoring'){
			listOfArguments.push(['https://api.binance.com/api/v3/depth?symbol='+ws_json_B[k].symB+'&limit=5', 'GET', 'BUY', ws_user, ws_json_B, k, short_S ]);
			listOfArguments.push(['https://api.binance.com/api/v3/klines?symbol='+ws_json_B[k].symB+'&interval=30m&limit=30', 'GET', 'BUY_KLINES', ws_user, ws_json_B[k], k, short_S ]);
		}
	}
	
  
  //if (promList[y][2].symB.substr(-4) == 'USDT' )
  
  //if (responsePrices[i].symbol.substr(-4) == 'USDT'){
		//listOfArguments.push([responsePrices[i].symbol, '30m', responsePrices[i].price]);
		//listOfArguments.push([responsePrices[i].symbol, '1h', responsePrices[i].price]);
		//listOfArguments.push([]);
 // }
  
  //argumentSymbol.push(responsePrices[i].symbol);
  
  //__listOfArguments.push('https://api.binance.com/api/v3/klines?symbol='+responsePrices[i].symbol+'&interval=30m&limit=200');
  //listOfArguments.push('https://api.binance.com/api/v3/klines?symbol='+responsePrices[i].symbol+'&interval=30m&limit=200');
}
		/// | | || | | | || | | | | | | | ||  | | | | | 
		
	}
	else {
		console.log('NO INTERNET CONNECTION...')
	}
	
	
//console.log('-   -   -   -   -   -   -')
console.log('-      -      -      -      -      -      -')
console.log('listOfArguments FOR B #: '+listOfArguments.length);
console.log('-      -      -      -      -      -      -')
//console.log('-   -   -   -   -   -   -')
//console.log(listOfArguments);
//console.log(listOfArguments.length);

// Fake async: resolve an array through arbitrary delay
// Increase a counter in order to watch amount of Promises executed

var accBal = [];
var M_accBal=[];
var accOrders = [];
var marginAccOrders = [];


var promList = [];

const asyncOperation = index => {
  counter++;
  return new Promise((resolve, reject) => {
	  
	  //console.log('manageAcc: index[0] sent:'+index[0]);
	  
	  const controller = new AbortController();
		setTimeout(() => controller.abort(), 20000);
		//controller.abort()
		
		//var fetchVar;
		var initObject={};
		//let reqHeader = new Headers();
		if (index[2]=='S_REST'){
			initObject = {
				method: index[1], headers: {'X-MBX-APIKEY': index[4].toString(CryptoJS.enc.Utf8)}, signal: controller.signal,
			}; 
		}
		else {
			initObject = {
				method: index[1], signal: controller.signal,
			}; 
		}
		
		
		fetch( index[0], initObject )
			.then((response)=> {
				return response.json();
			})
			.then(function (data) {
				//console.log('----------------------');
			//	console.log('result. below. ...')
				//console.log(data);
				
				//console.log('Operation performed:', index[0]);
				counter--;
				
						///    =-=-=--=-=--=-=-=--=
						
				if ( (index[2]=='S_REST') && (index[5]=='accBal')  ){
					accBal.push([index[3], index[2], index[5], data, index[6] ]);
				}
				else if ( (index[2]=='S_REST') && (index[5]=='M_accBal')  ){
					M_accBal.push([index[3], index[2], index[5], data, index[6] ]);
				}
				else if ( (index[2]=='S_REST') && (index[5]=='openOrders')  ){
					accOrders.push([index[3], index[2], index[5], data ]);
				}
				else if ( (index[2]=='S_REST') && (index[5]=='openOrdersMargin')  ){
					marginAccOrders.push([index[3], index[2], index[5], data]);
				}
				else {
					promList.push([index[3], index[2], index[4], index[5], index[6], data, index[7] ]);
				}
						
						////  -=-==-=-=-==-=-
								
				
				resolve();
				
				//console.log('=====================')
			})
			.catch(function (err) {
				console.log('ERROR Below: '+index[0])
				console.log("Something went wrong!", err);
				resolve();
			});
  
	
  
});

//console.log('Asynchronous request made.');


   
   
  
	
 
	
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





//watchCounter();
//setTimeout( watchCounter, 1000*3);

//var promList = await take3subtake1part1();
//console.log('----promList Below:---- YES BELOW');
console.log('ManageAcc: About to run promises...');
 await take3subtake1part0();
 console.log('listOfArguments #: '+listOfArguments.length);
console.log('promList #: '+promList.length);




if (counter==0){	
	clearInterval(interval);
}



//console.log(' promList: '+promList.length);
//console.log(promList);
//console.log(promList.length);

console.log('OPEN ORDERS BELOW:::');
//console.log(accOrders);
for (i=0; i<accOrders.length; i++){
	
	console.log(accOrders[i][3]);
	//console.log('... ... ... .');
}
console.log(' x x x x ')
//marginAccOrders

//console.log('ACC BAL BELOW:::');
//console.log(accBal.length);
//console.log(accBal.length);

//0--------------------------------
	//const queryBook = [];
	
	
	
		var queryBook = [];
	var qb = fs.readFileSync('1queryBook.json','utf8');
	if (qb){
		queryBook = JSON.parse(qb);
	}
	
	
	/////----------------------------------------------------------------
	
	var M_accInfo_A = [];
			
			for (t=0; t<M_accBal.length; t++){
				//if (M_accBal[t][0]==ws_user){
					M_accInfo_A = M_accBal[t][3];
					
					
					
					
					
					//get for loop of ws_key... [4][4]buy    [4][5]sell
					
					//get balance of marign usdt and only bother if there is an total and free amount...
					//var activeShortPositions=0;
					var activeShortPositionsToBuy=0;
					var countShortBuy=0;
					var activeShortPositionsToSell=0;
					
					//console.log(M_accBal[t][4][3]);
					
					var qtyBal_ = M_accBal[t][4][3];
					
					var snapValVarB = M_accBal[t][4][5];
					for (var v=0; v<snapValVarB.length; v++){
						if ( ((snapValVarB[v].type=='SHORT_BUY') && (snapValVarB[v].flipped=='no')) || ((snapValVarB[v].type!='SHORT_BUY') && (snapValVarB[v].flipped=='true')) ) {
							activeShortPositionsToBuy=1;
							console.log('SHORT POSITION FOUND AT SELL');
							countShortBuy++;
							//console.log(M_accBal[t][4][3]);
						}
					}
				
					var snapValVarC = M_accBal[t][4][4];
					for (var v=0; v<snapValVarC.length; v++){
						if ( ((snapValVarC[v].type=='SHORT_SELL') && (snapValVarC[v].flipped=='no')) || ((snapValVarC[v].type!='SHORT_SELL') && (snapValVarC[v].flipped=='true')) ) {
							activeShortPositionsToSell=1;
							console.log('SHORT POSITION FOUND AT BUY');
						}
					} 
					
					/* if ((activeShortPositionsToSell==0) && (activeShortPositionsToBuy==1)) {
						var totUSDTQty = (countShortBuy*(qtyBal_*1.04));
						console.log('totUSDTQty:'+totUSDTQty);
						
						
						if (typeof M_accInfo_A.userAssets!== 'undefined'){		
							for (p=0; p<M_accInfo_A.userAssets.length; p++){
								if (M_accInfo_A.userAssets[p].asset == 'USDT') {
										console.log('MARGIN USDT 1 : Borrowed:'+M_accInfo_A.userAssets[p].borrowed+' & FREE'+M_accInfo_A.userAssets[p].free+' & interest:'+M_accInfo_A.userAssets[p].interest+' & locked:'+M_accInfo_A.userAssets[p].locked+' & netAsset'+M_accInfo_A.userAssets[p].netAsset);
										var math_ = parseFloat(M_accInfo_A.userAssets[p].free) - totUSDTQty;
										console.log('math_= '+math_);
								}
							}
						}
						
						
					} */
					//if ((activeShortPositionsToSell==0) && (activeShortPositionsToBuy==1)) {
					if ((activeShortPositionsToSell==0) && (activeShortPositionsToBuy==1) && (countShortBuy>1) ) {
						//console.log('countShortBuy::'+countShortBuy);
						var totUSDTQty = (countShortBuy*qtyBal_);
						//console.log('*^*^*^*^*^**^*^*^*^*^'+totUSDTQty);
						
						if (typeof M_accInfo_A.userAssets!== 'undefined'){		
							for (p=0; p<M_accInfo_A.userAssets.length; p++){
								if (M_accInfo_A.userAssets[p].asset == 'USDT') {
								
									//console.log('A PPPPPPPPPPPPPPPPPP')
									console.log('MARGIN USDT 1 : Borrowed:'+M_accInfo_A.userAssets[p].borrowed+' & FREE'+M_accInfo_A.userAssets[p].free+' & interest:'+M_accInfo_A.userAssets[p].interest+' & locked:'+M_accInfo_A.userAssets[p].locked+' & netAsset'+M_accInfo_A.userAssets[p].netAsset);
									//console.log('A LLLLLLLLLLLLLLLLLLLLLLLL')
									
									if   (  ( parseFloat(M_accInfo_A.userAssets[p].netAsset) == parseFloat(M_accInfo_A.userAssets[p].free)  ) && (parseFloat(M_accInfo_A.userAssets[p].free)>3)  ) {
										//if (parseFloat(M_accInfo_A.userAssets[p].free)>totUSDTQty){
											
											
											
											var freeBal_ = parseFloat((M_accInfo_A.userAssets[p].free)*(0.1/0.2));
											var freeDiff_ = freeBal_-totUSDTQty;
											
										//	console.log('___________________________')
										//	console.log(freeBal_+' > '+totUSDTQty);
											
											
										//if (freeBal_ >  totUSDTQty){
										if ((((freeBal_/totUSDTQty)-1)*100) > 2){
											
											console.log('TRANSFER_TO_MAIN : Diff .... '+freeDiff_);
											
											queryBook.push(['TRANSFER_TO_MAIN', M_accBal[t][0], ['USDT', freeDiff_, ] ]);
										}
										//console.log('MOVE '+M_accInfo_A.userAssets[p].free+' USDT TO SPOT ACCOUNT');
										//queryBook.push(['TRANSFER_TO_MAIN', M_accBal[t][0], ['USDT', M_accInfo_A.userAssets[p].free, ] ]);
									}
									
								}
							
							}
						}
						
					}
					else  if ((activeShortPositionsToBuy==0) && (activeShortPositionsToSell==0) ){
						if (typeof M_accInfo_A.userAssets!== 'undefined'){		
							for (p=0; p<M_accInfo_A.userAssets.length; p++){
								if (M_accInfo_A.userAssets[p].asset == 'USDT') {
								
									//console.log('B PPPPPPPPPPPPPPPPPP')
									console.log('MARGIN USDT 2 : Borrowed:'+M_accInfo_A.userAssets[p].borrowed+' & FREE'+M_accInfo_A.userAssets[p].free+' & interest:'+M_accInfo_A.userAssets[p].interest+' & locked:'+M_accInfo_A.userAssets[p].locked+' & netAsset'+M_accInfo_A.userAssets[p].netAsset);
									//console.log('B LLLLLLLLLLLLLLLLLLLLLLLL')
									
									if   (  ( parseFloat(M_accInfo_A.userAssets[p].netAsset) == parseFloat(M_accInfo_A.userAssets[p].free)  ) && (parseFloat(M_accInfo_A.userAssets[p].free)>3)  ) {
										console.log('TRANSFER_TO_MAIN: MOVE '+M_accInfo_A.userAssets[p].free+' USDT TO SPOT ACCOUNT');
										var transferOut = parseFloat(M_accInfo_A.userAssets[p].free)-2;
										queryBook.push(['TRANSFER_TO_MAIN', M_accBal[t][0], ['USDT', transferOut, ] ]);
									}
									
								}
							
							}
						}
					}
					
					
				//}// end of if (M_accBal[t][0]==ws_user){
			}
	
	//----------------------------------------------------
						for (t=0; t<M_accBal.length; t++){
							console.log('SHH ;.;.;.;.;.')
							
							var M_accInfo_A = M_accBal[t][3];
							//... M_accBal[t][0]//user
							var amountQty = M_accBal[t][4][3];
							var buyArrayU = M_accBal[t][4][4];
							var sellArrayU = M_accBal[t][4][5];
							
							//console.log('amountQty:'+amountQty);
							
							 if (M_accInfo_A.userAssets){
									for (p=0; p<M_accInfo_A.userAssets.length; p++){
										var totBalFreeLock = parseFloat(M_accInfo_A.userAssets[p].borrowed);
										//var totBalFreeLock = parseFloat(M_accInfo_A.userAssets[p].locked)+parseFloat(M_accInfo_A.userAssets[p].free);// in future market buy when this is > .borrowed
										
										
										
										if (totBalFreeLock>0){
											//console.log(M_accInfo_A.userAssets[p].asset+' SHORT totBalFreeLock:'+totBalFreeLock);
											for (var a=0; a<responseAP_.length; a++){
												if (responseAP_[a].symbol.substr(-4) == 'USDT' ){
													var justSymResponse = responseAP_[a].symbol.substring(0, responseAP_[a].symbol.length - 4);
													//console.log('justSymResponse: '+justSymResponse);
													if ((M_accInfo_A.userAssets[p].asset==justSymResponse) && (justSymResponse!='BNB') && (justSymResponse!='USDT') ){
														//console.log('it mathced the asests.... '+justSymResponse);
														var dollarPrice = totBalFreeLock*responseAP_[a].price;
														//console.log('it mathced the asests.... '+justSymResponse+' dollarPrice:'+dollarPrice+' -->'+(((dollarPrice/amountQty)-1)*100));
														var portionOfAmQty = amountQty*0.15;
														
														
														
														if (dollarPrice>portionOfAmQty){
															console.log(justSymResponse+' dP:'+dollarPrice+' & pOQ'+portionOfAmQty);
															var foundCorrectSymbol =0;
															for (var y=0; y<sellArrayU.length; y++){
																//console.log('symB below');
																//console.log(sellArrayU[y].symB);
																	
																var justSymB = sellArrayU[y].symB.substring(0, sellArrayU[y].symB.length - 4);
																//console.log('justSymB:'+justSymB)
																if (justSymB == M_accInfo_A.userAssets[p].asset){
																	//console.log('found match so dont add '+M_accInfo_A.userAssets[p].asset);
																	foundCorrectSymbol=1;
																}
															}
															
															//if (snapValVarC[v].type=='SHORT_SELL'){
															
															var preventFromAddingToSell=0;
															for (var y=0; y<buyArrayU.length; y++){
																var justSymB = buyArrayU[y].symB.substring(0, buyArrayU[y].symB.length - 4);
																if ((justSymB == M_accInfo_A.userAssets[p].asset) && (  ((buyArrayU[y].type=='SHORT_SELL') && (buyArrayU[y].flipped=='no')) || ((buyArrayU[y].type!='SHORT_SELL') && (buyArrayU[y].flipped=='true'))  ) ){
																	preventFromAddingToSell=1;
																}
															}
															
															if ((foundCorrectSymbol==0) && (preventFromAddingToSell==0) ){
																console.log('SHORT SYM NOT FOUNDL:: M_ADD_TO_SELL_SIDE '+accBal[t][0]+' '+M_accInfo_A.userAssets[p].asset)
																
																var flipDec ='';
																if (flippedJSON.s_flipA==1){
																	flipDec='no';
																	queryBook.push(['M_ADD_TO_SELL_SIDE', M_accBal[t][0],  M_accInfo_A.userAssets[p].asset+'USDT', amountQty, '30m', 'RSI model', '0', , flipDec, ]);
																}
																else if (flippedJSON.s_flipA==-1){
																	flipDec='true';
																	queryBook.push(['ADD_TO_SELL_SIDE', M_accBal[t][0],  M_accInfo_A.userAssets[p].asset+'USDT', amountQty, '30m', 'RSI model', '0', , flipDec,  ]);
																}
																
																
																
																
																
																//queryBook.push(['ADD_TO_SELL_SIDE', accBal[t][0],  M_accInfo_A.userAssets[p].asset+'USDT', amountQty, '30m', 'RSI model', '0', ,   ]);
															}
														}
														
													}// end of something
												}
											}
										}
									}
							 }
							
							 /* if (M_accInfo_A.userAssets){
								for (p=0; p<M_accInfo_A.userAssets.length; p++){
									//var totBalFreeLock = parseFloat(M_accInfo_A.balances[p].locked)+parseFloat(M_accInfo_A.balances[p].free);
									var totBalBorr = parseFloat(M_accInfo_A.userAssets[p].borrowed);//+parseFloat(M_accInfo_A.balances[p].free);
											///.... total balance borrowed divided by /usdt price...;
									
									
									//console.log('totBalBorr:'+totBalBorr);
										
									if (((((totBalBorr/amountQty)-1)*100)>0) && (M_accInfo_A.userAssets[p].asset!='USDT') ){
										console.log('SHHORT BALANCE OUTSTANDING '+accBal[t][0]+' '+M_accInfo_A.userAssets[p].asset+' '+totBalBorr);
									}
									
									
								}
							 } */
							
						}
	
						for (t=0; t<accBal.length; t++){
							//if (accBal[t][0]==accBal[t][0]){
								 //= [];
								 console.log(';.;.;.;.;.')
								 //console.log(accBal[t])
								var accInfo  = accBal[t][3];
								
								//... accBal[t][0]//user
								
								var amountQty = accBal[t][4][3];
								var buyArrayU = accBal[t][4][4];
								var sellArrayU = accBal[t][4][5];
								
								//console.log(accBal[t][0]+' QTY:'+amountQty)
								//console.log('sellArrayU below');
								//console.log(sellArrayU);
								
								
								// console.log(' userDet below : ');
								// console.log(userDet);
								
								//userDet...
								
								  if (accInfo.balances){
									for (p=0; p<accInfo.balances.length; p++){
										
										
										var totBalFreeLock = parseFloat(accInfo.balances[p].locked)+parseFloat(accInfo.balances[p].free);
										
										
										
										if (totBalFreeLock>0){
											//console.log('totBalFreeLock:'+totBalFreeLock);
											
											for (var a=0; a<responseAP_.length; a++){
												if (responseAP_[a].symbol.substr(-4) == 'USDT' ){
													//console.log('justSymResponse:'+responseAP_[a].symbol);
													var justSymResponse = responseAP_[a].symbol.substring(0, responseAP_[a].symbol.length - 4);
													//console.log('justSymResponse: '+justSymResponse);
													if ((accInfo.balances[p].asset==justSymResponse) && (justSymResponse!='BNB') && (justSymResponse!='USDT') ){
														//console.log('it mathced the asests.... '+justSymResponse);
														
														
														var dollarPrice = totBalFreeLock*responseAP_[a].price;
														
														//console.log('it mathced the asests.... '+justSymResponse+' dollarPrice:'+dollarPrice+' -->'+(((dollarPrice/amountQty)-1)*100));
														
														var portionOfAmQty = amountQty*0.15;
														//console.log('portionOfAmQty:: '+portionOfAmQty);
														
														if (dollarPrice>portionOfAmQty){
															var foundCorrectSymbol =0;
															for (var y=0; y<sellArrayU.length; y++){
																//console.log('symB below');
																//console.log(sellArrayU[y].symB);
																	
																var justSymB = sellArrayU[y].symB.substring(0, sellArrayU[y].symB.length - 4);
																//console.log('justSymB:'+justSymB)
																if (justSymB == accInfo.balances[p].asset){
																	//console.log('found match so dont add '+accInfo.balances[p].asset);
																	foundCorrectSymbol=1;
																}
															}
															
															//if (snapValVarC[v].type=='SHORT_SELL'){
															
															var preventFromAddingToSell=0;
															for (var y=0; y<buyArrayU.length; y++){
																var justSymB = buyArrayU[y].symB.substring(0, buyArrayU[y].symB.length - 4);
																if ((justSymB == accInfo.balances[p].asset) && (((buyArrayU[y].type!='SHORT_SELL') && (buyArrayU[y].flipped=='no')) || ((buyArrayU[y].type=='SHORT_SELL') && (buyArrayU[y].flipped=='true')) ) ){
																	preventFromAddingToSell=1;
																}
															}
															
															if ((foundCorrectSymbol==0) && (preventFromAddingToSell==0) ){
																console.log('SYM NOT FOUNDL:: ADD_TO_SELL_SIDE '+accBal[t][0]+' '+accInfo.balances[p].asset)
																
																var flipDec ='';
																if (flippedJSON.l_flipA==1){
																	flipDec='no';
																	queryBook.push(['ADD_TO_SELL_SIDE', accBal[t][0],  accInfo.balances[p].asset+'USDT', amountQty, '30m', 'RSI model', '0', , flipDec,  ]);
																}
																else if (flippedJSON.l_flipA==-1){
																	flipDec='true';
																	queryBook.push(['M_ADD_TO_SELL_SIDE', accBal[t][0],  accInfo.balances[p].asset+'USDT', amountQty, '30m', 'RSI model', '0', , flipDec, ]);
																}
																
																
																
																
																
															}
														}
														
														//(((dollarPrice/amountQty)-1)*100)
														
														//if (((((dollarPrice/amountQty)-1)*100)>0) && (accInfo.balances[p].asset!='USDT') ){
														//	
														//}
														
													}
												}
												
												//if (responseAP_responseAP_[a].symbol){
													
												//}
											}
											
										}
										
										
										
									}
								}  
							//}
						}
	
	
	///-----------------------------------------------
	
	
var cs_Time = fs.readFileSync('2_analyseTime.txt','utf8');
				if (cs_Time){
					var duration = moment.duration(now.diff(cs_Time));
					var durationMins = duration.asMinutes();
				}
				else {
					try {
						var fs_p = require('fs').promises;
						await fs_p.writeFile('2_analyseTime.txt', now.format('YYYY-MM-DD HH:mm:ss'));
					} catch (error){
						console.error(error);
					}
					
					var durationMins=0;
				}
				//console.log('Long 2% Check Duration Mins: '+durationMins+' (>20)');
				var runTwoPercentProfitChecks=0; // should be 0 to use it...
				if (durationMins>20){
					//console.log('It should check for 2% profits...');
					try {
						var fs_p = require('fs').promises;
						await fs_p.writeFile('2_analyseTime.txt', now.format('YYYY-MM-DD HH:mm:ss'));
					console.info("File TIME UPDATED!");
					} catch (error){
						console.error(error);
					}
					
					runTwoPercentProfitChecks=1;
				}

console.log('-----------------------------------')
	for (y=0; y<promList.length; y++){
		
		
		
		var ws_user = promList[y][0];
		
		/* console.log('_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_')
		console.log('TRYING TO FIND TOKEN KEY BELOW.... . . . . . .')
		console.log('USERS BELOW');
		console.log(userDet);
		console.log('_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_') */
		
		
		//if (ws_user=='_test_'){
			
			///var numPositions=promList[y][2].length;
			//console.log('promList[y][2] TEST BELOW:'+numPositions);
			//console.log(promList[y][2])
			///for (y=0; y<numPositions; y++){//number of thingys...
				//initialPrice:...
				//if (numPositions[y].model=='RSI model'){
				//	console.log('FOUND AN RSI MODEL...')
				//}
				//var initPriceOfTrade
			///}
			
			//console.log(promList[y][2] );
		//}
		
		var responseJsonOpenOrders = [];
		for (r=0; r<accOrders.length; r++){
			if (accOrders[r][0] == ws_user){
				responseJsonOpenOrders = accOrders[r][3];
				//console.log('OPEN ORDERS FOR '+accOrders[r][0]+' below:');
				//console.log(responseJsonOpenOrders);
			}
		}
		
		var M_responseJsonOpenOrders = [];
		for (r=0; r<marginAccOrders.length; r++){
			if (marginAccOrders[r][0] == ws_user){
				M_responseJsonOpenOrders = marginAccOrders[r][3];
				//console.log('OPEN ORDERS FOR '+marginAccOrders[r][0]+' below:');
				//console.log(responseJsonOpenOrders);
			}
		}
		
			
			
							
							//console.log('responseJsonOpenOrders:');
							//console.log(responseJsonOpenOrders);
		
		
	if (promList[y][1]=='SELL'){
		/* console.log('promList[y] below:');
		console.log(promList[y][2]); */
		
			//console.log('_______________________________________________________________________')
			//console.log('NEXT ACCOUNT :: ::'+promList[y][0]);
			
			/* 
			console.log('SEEING SOMETHING quick...');
			console.log(promList[y]);
			console.log('SEEING SOMETHING I I I above...')
			
			 */
			
			
			
			
			
			var ws_json = promList[y][2];
			var i;
			//var i = promList[y][3];
			
			var o__=0;
			var foundSymB = 0;
			while ((o__<ws_json.length) && (foundSymB!=1)) {
				if (ws_json[o__]){
					if (ws_json[o__].symB == promList[y][6]){
						foundSymB=1;
						i = o__;
						//console.log('FOUND SYMBOL AT '+o__);
					}
				}
				
				o__++;
			}
			
			//console.log('foundSymB:'+foundSymB+' & ws_json[i].sym: '+ws_json[i].symB+' & spotSym:'+ws_json[promList[y][3]].symB);
		if (foundSymB==1){
		//		ws_json[i] = null;
			var orderBook = promList[y][5];
			
			var oV = 0;
			const oVB = oV+1;
			
			console.log(orderBook);
			var highestNumberOfDecimals=0;
			var price_highestNumberOfDecimals=0;
			for (t=0; t<orderBook.bids.length; t++){
				//...qty
				if (parseFloat(orderBook.bids[t][1]).toString().split(".")[1]){
					var numOfDecimals = parseFloat(orderBook.bids[t][1]).toString().split(".")[1].length;
					//console.log('qty: '+t+' '+orderBook.bids[t][1]+' NumDec:'+numOfDecimals);
					if (numOfDecimals>highestNumberOfDecimals){
						highestNumberOfDecimals = numOfDecimals;
						//console.log('qty... REPLACED Highest Decimal...');
					}
				}
				
				//...price
				if (parseFloat(orderBook.bids[t][0]).toString().split(".")[1]){
					var numOfDecimals = parseFloat(orderBook.bids[t][0]).toString().split(".")[1].length;
					//console.log('price: '+t+' '+orderBook.bids[t][0]+' NumDec:'+numOfDecimals);
					if (numOfDecimals>price_highestNumberOfDecimals){
						price_highestNumberOfDecimals = numOfDecimals;
						//console.log('price... REPLACED Highest Decimal...');
					}
				}
			}
			
			for (t=0; t<orderBook.asks.length; t++){
				//...qty
				if (parseFloat(orderBook.asks[t][1]).toString().split(".")[1]){
					var numOfDecimals = parseFloat(orderBook.asks[t][1]).toString().split(".")[1].length;
					//console.log('qty: '+t+' '+orderBook.asks[t][1]+' NumDec:'+numOfDecimals);
					if (numOfDecimals>highestNumberOfDecimals){
						highestNumberOfDecimals = numOfDecimals;
					//	console.log('qty... REPLACED Highest Decimal...');
					}
				}
				
				//...price
				if (parseFloat(orderBook.asks[t][0]).toString().split(".")[1]){
					var numOfDecimals = parseFloat(orderBook.asks[t][0]).toString().split(".")[1].length;
					//console.log('price: '+t+' '+orderBook.asks[t][0]+' NumDec:'+numOfDecimals);
					if (numOfDecimals>price_highestNumberOfDecimals){
						price_highestNumberOfDecimals = numOfDecimals;
					//	console.log('price... REPLACED Highest Decimal...');
					}
				}
				
			}
			//console.log('......');
			//console.log('SELL: highestNumberOfDecimals:'+highestNumberOfDecimals);
			var powVar = Math.pow(10, highestNumberOfDecimals);
			var price_powVar = Math.pow(10, price_highestNumberOfDecimals);
			
			var priceLevel = (parseFloat(orderBook.asks[0][0])+parseFloat(orderBook.bids[0][0]))/2;
			var priceLevelFloored = Math.floor(priceLevel * price_powVar) /price_powVar;
			
			
			
			
			
			
		///[part 1 here]	
		
		
			
		///	[part 2]	
		if ((typeof ws_json[i] !=='undefined') && (typeof promList[y][2][promList[y][3]] !=='undefined') ){
			
			//console.log('_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_')
			
							var candlesForCoin = [];
							for (yB=0; yB<promList.length; yB++){
								
								/* console.log('promList[yB] below ');
								console.log(promList[yB]); */
								
								//console.log(promList[yB][2][0].symB);
								//console.log(promList[yB][2][0]); 
								
								//console.log('promList[yB] symB: '+promList[yB][2][0].symB);
								
								//console.log(' & Matching below...'+ws_json[i].symB);
								if (promList[yB][2][0]){
									
									//console.log('yb:'+yB);
									
									//console.log('promList[yB][2][0].symB:'+promList[yB][2][0].symB);
									
									//console.log('symA:'+promList[yB][2][promList[y][3]].symB);
									if ((promList[yB][2][promList[yB][3]]) && (ws_json[i])) {
										if ((promList[yB][1]=='SELL_KLINES') && (promList[yB][2][promList[yB][3]].symB == ws_json[i].symB) ){
											console.log('IT ACTUALLY FOUND SELL KLINES FOR '+promList[yB][2][promList[yB][3]].symB);
										//	//console.log(promList[yB]);
											//console.log(promList);
											candlesForCoin = promList[yB][5]//.reverse();
											
											console.log('Latest Price c :'+candlesForCoin[candlesForCoin.length-1][4]);
											
										}
									}
									
								}
								
							}
							
							//map data...
							if (candlesForCoin){
								if (candlesForCoin[0]){
									var closeData = candlesForCoin.map(d=>d[4]);
								var highData = candlesForCoin.map(d=>d[2]);
								var lowData = candlesForCoin.map(d=>d[3]);
								var tulind = require('tulind');
								
								//console.log('...');
							
							var obSpread = (((orderBook.asks[0][0]/orderBook.bids[0][0])-1)*100);
							
							
								
								var rsiA = 0;
								tulind.indicators.rsi.indicator([closeData],[14],(err, res)=>{
									if (err) return console.log(err);
										rsiA = res[0].slice(-1)[0];
								});
								
								//console.log(' . ')
								console.log('rsiA ::'+rsiA)
								
							
								
						//.......................................................................
								var res_O_SMA20 = []; 
								//var sma20 = 0;
								var sma20Arr = [];
								tulind.indicators.sma.indicator([closeData],[20],(err, res)=>{
									if (err) return console.log(err);
										res_O_SMA20 = res[0];
										//sma20 = res[0].slice(-1)[0];
										sma20Arr = [res[0].slice(-1)[0], res[0].slice(-2)[0]];
								});
								
								var res_O_SMA50 = []; 
								//var sma50 = 0;
								var sma50Arr = [];
								tulind.indicators.sma.indicator([closeData],[50],(err, res)=>{
									if (err) return console.log(err);
										res_O_SMA50 = res[0];
										//sma50 = res[0].slice(-1)[0];
										sma50Arr = [res[0].slice(-1)[0], res[0].slice(-2)[0]];
								});
								
								var roc20Arr = [];
								tulind.indicators.roc.indicator([res_O_SMA20],[9],(err, res)=>{
									if (err) return console.log(err);
										roc20Arr = [res[0].slice(-1)[0], res[0].slice(-2)[0]];
								});
								
								var roc50Arr = [];
								tulind.indicators.roc.indicator([res_O_SMA50],[9],(err, res)=>{
									if (err) return console.log(err);
										roc50Arr = [res[0].slice(-1)[0], res[0].slice(-2)[0]];
								});
								
								var ppoArr = [];
								tulind.indicators.ppo.indicator([closeData],[12, 26],(err, res)=>{
									if (err) return console.log(err);
										ppoArr = [res[0].slice(-1)[0], res[0].slice(-2)[0], res[0].slice(-3)[0]];
										// ppoA = res[0].slice(-1)[0];
										// ppoB = res[0].slice(-2)[0];
										// ppoC = res[0].slice(-3)[0];
								});
								
								var tPSAR = 0;
									tulind.indicators.psar.indicator([highData, lowData],[0.02, 0.2],(err, res)=>{
										if (err) return console.log(err);
										console.log('psar 1: '+res[0].slice(-1)[0])
										//console.log('RSI 2: '+RSITwo)
										tPSAR = res[0].slice(-1)[0];
									});
								
								
								
								//console.log('ppoA:'+ppoA+' & ppoB:'+ppoB+' & ppoC:'+ppoC);
								}
								
								
							}
							
							//time hour...
							
							var minuteNumber = parseFloat(now.format('mm'));
							//console.log(' minuteNumber:'+minuteNumber);
							//console.log('ws_user::.. '+ws_user);
							
							
							var coinQtyFloored=0;
							var borrowedQuantity = 0;
							
							console.log('coinQtyFloored 2. : '+coinQtyFloored);
							console.log('borrowedQuantity 2. :'+borrowedQuantity);
							//xoxoxoxoxoxoxoxoxoxox
						if ((ws_user!='_test_') && (ws_user!='_testACC_')) { //still test everything inside this bracket...
						
							if ( ((ws_json[i].type!='SHORT_BUY') && (ws_json[i].flipped=='no')) || ((ws_json[i].type=='SHORT_BUY') && (ws_json[i].flipped=='true')) ) {
								var coinQty = ws_json[i].baseBalance;
								coinQtyFloored = Math.floor(coinQty * powVar) / powVar;
								console.log('COIN QUANTITY CHANGED...1');
								console.log('XXXXXXXXXXXXXXXXXXXXXXXXX_____________________');
								var sellOpenOrders = 0;
								for (y_=0; y_<responseJsonOpenOrders.length; y_++){
									if ((responseJsonOpenOrders[y_].side=='SELL') && (ws_json[i].symB==responseJsonOpenOrders[y_].symbol) ){
										sellOpenOrders=1;
									}
									console.log(responseJsonOpenOrders[y_].side+' ws_json[i].symB:'+ws_json[i].symB+' & order symbol'+responseJsonOpenOrders[y_].symbol );
								}
								
								console.log('sellOpenOrders below');
								console.log(sellOpenOrders);
								
								
								
							  
								
								if (sellOpenOrders==0){
									var accInfo_ = [];
									
									for (t=0; t<accBal.length; t++){
										if (accBal[t][0]==ws_user){
											accInfo_ = accBal[t][3];
										}
									}
									
								 
									//accInfo_ = await client2.accountInfo({useServerTime:true,}).catch((error)=>console.log(error));
									
									//baseSymB_ = ws_json[i].symB.substr(0,4).toUpperCase();
									//baseSym_ = ws_json[i].symB.substr(0,3).toUpperCase();
									
		 
									//baseSymB_ = sym.substring(0, sym.length - 4);
									//baseSym_ = sym.substring(0, sym.length - 3);
									
									baseSymB_ = ws_json[i].symB.substring(0, ws_json[i].symB.length - 4);
												baseSym_ = ws_json[i].symB.substring(0, ws_json[i].symB.length - 3);
												//console.log('baseSymB_:'+baseSymB_+' & baseSym_:'+baseSym_);
									
									var x_B='two';
								//if ((accInfo_.balances) && (x_B=='ONE') ){
								if (accInfo_.balances){
									for (p=0; p<accInfo_.balances.length; p++){
										if (((accInfo_.balances[p].asset == baseSymB_) || (accInfo_.balances[p].asset == baseSym_) )  ){ //&& (ws_json[i].type!='SHORT_BUY') old
											//console.log('SELL BALANCE -- :'+accInfo_.balances[p].free);
											//console.log('MUST BE < 4:: '+  parseFloat(accInfo_.balances[p].free)*parseFloat(orderBook.bids[oV][0])+'USDT')
											
											//if (parseFloat(coinQty)>parseFloat(accInfo_.balances[p].free)){
											if (parseFloat(coinQty)!=parseFloat(accInfo_.balances[p].free)){
												console.log('THERE IS A DIFFERENCE BETWEEN INS QTY AND ACCOUNT BALANCE');
												console.log('coinQty:'+coinQty+' & accBal:'+accInfo_.balances[p].free);
												coinQty = parseFloat(accInfo_.balances[p].free);
												coinQtyFloored = Math.floor(coinQty * powVar) / powVar;
												
												console.log('COIN QUANTITY CHANGED...2');
												console.log('XXXXXXXXXXXXXXXXXXXXXXXXX_____________________');
												
												ws_json[i].baseBalance = coinQtyFloored;
												ws_jsonFilter = ws_json.filter(function(x){return x !== null});
												firebase.database().ref('/Ins/'+ws_user+'_S').set({
													ws_key: JSON.parse( JSON.stringify(ws_jsonFilter) ),
												}) 
											}
					
											//if (accInfo_.balances[p].free <1){
											 if (  (  parseFloat(accInfo_.balances[p].free)*parseFloat(orderBook.bids[oV][0])  ) < 4) {
												//for (v=0; v<ws_ws_json.length; v++){
													//console.log('Okay, so it comes here...'+v);
													console.log(' BALANCE LEFT: '+parseFloat(accInfo_.balances[p].free)*parseFloat(orderBook.bids[oV][0]))
												
												
												
												
												//if (ws_user == '_test_'){
												/* if (ws_user == 'oJhPznC7LyXGnbnFYLxiTUBbudF3'){
													if (ws_json[i].symB.substr(-4) == 'USDT' ){
									
														var moment = require('moment');
														var now = moment();
									
														console.log('LONG TWITTER MESSAGE BELOW:');
														console.log('--------')
														var longPerRet = (perRet).toFixed(2);
									
														var typeRet='profit';
														if (longPerRet<0){
															typeRet='loss';
														}
									
															
												
														 T.post('statuses/update', { status: '[BOT] Closed long position: $'+baseSymB_+' / $USDT at '+orderBook.bids[oV][0]+' ('+longPerRet+'% '+typeRet+'). \n'+now.format('YYYY-MM-DD HH:mm')+' \n[Not financial advice]' }, function(err, data, response) {
															console.log(data)
														}) 
													}
												} */
												
												
												
												
												
												 delete ws_json[i];
												ws_jsonFilter = ws_json.filter(function(x){return x !== null});
												firebase.database().ref('/Ins/'+ws_user+'_S').set({
													ws_key: JSON.parse( JSON.stringify(ws_jsonFilter) ),
												}) 
												
												//it removes the coin here from the sell
												var tallyTVar = moment().format('YYYY-MM-DD');
												var runLoopAgain = '1';
												
												var addTally=1;
												for (p_=0; p_<queryBook.length; p_++){
													if ( (queryBook[p_][0]=='TALLY_TRADES') && (queryBook[p_][1]==promList[y][0]) && (queryBook[p_][2][0]==tallyTVar) ){
														addTally=0;
														console.log('TALLY_TRADES already exists')
													}
												}
												
												if (addTally==1){
													queryBook.push(['TALLY_TRADES', promList[y][0], [tallyTVar, runLoopAgain] ]);
												}
												
												
												
											}
										}
									}
								}
									
								}//end of if sellOpenOrders==0
							} //end of new long loop for lookForCoin.1.
							
							
						//ws_json[i]
						if (ws_json[i]){
							if ( ((ws_json[i].type=='SHORT_BUY') && (ws_json[i].flipped=='no')) || ((ws_json[i].type!='SHORT_BUY') && (ws_json[i].flipped=='true')) ) {
								
								var M_accInfo = [];
									for (t=0; t<M_accBal.length; t++){
										if (M_accBal[t][0]==ws_user){
											M_accInfo = M_accBal[t][3];
										}
									}
									
									
									baseSymB = ws_json[i].symB.substring(0, ws_json[i].symB.length - 4);
									baseSym = ws_json[i].symB.substring(0, ws_json[i].symB.length - 3);
									var payBNBInt = 0;
								
								if (typeof M_accInfo.userAssets!== 'undefined'){
									for (p=0; p<M_accInfo.userAssets.length; p++){
										if ( ((M_accInfo.userAssets[p].asset == baseSym) || (M_accInfo.userAssets[p].asset == baseSymB)  )   ) {//&& (ws_json[i].type=='SHORT_BUY') old
											///borrowedQuantity = parseFloat(M_accInfo.userAssets[p].netAsset);
											//borrowedQuantity = (parseFloat(M_accInfo.userAssets[p].borrowed) + parseFloat(M_accInfo.userAssets[p].interest) - parseFloat(M_accInfo.userAssets[p].free))*1.01; //adding 1% extra becaues
											borrowedQuantity = ((parseFloat(M_accInfo.userAssets[p].borrowed)) + parseFloat(M_accInfo.userAssets[p].interest) - parseFloat(M_accInfo.userAssets[p].free))*1.0015; //adding 1% extra becaues
											
											console.log('ASSET BORROWED>>>>>>'+M_accInfo.userAssets[p].asset);
											console.log('BORRWED::>>>>'+borrowedQuantity);
											console.log('VS BORR:>>>'+M_accInfo.userAssets[p].borrowed);
											console.log('VS NET ASSET:>>>'+M_accInfo.userAssets[p].netAsset);
											
											//check if difference between free funds and borrowed funds is less than 5 percent...
											var fundsDiff = 0;
											var fundsDiffConfirm=0;
											if (parseFloat(M_accInfo.userAssets[p].free)!=0){
												var fundsDiff = (( (parseFloat(M_accInfo.userAssets[p].borrowed) + parseFloat(M_accInfo.userAssets[p].interest)) / parseFloat(M_accInfo.userAssets[p].free) )-1)*100;
												//var fundsDiff =  (parseFloat(M_accInfo.userAssets[p].borrowed) + parseFloat(M_accInfo.userAssets[p].interest))*(parseFloat(orderBook.asks[oV][0]));
												console.log('fundsDiff:::'+fundsDiff+' &  borrowed:'+parseFloat(M_accInfo.userAssets[p].borrowed)+' & interest:'+parseFloat(M_accInfo.userAssets[p].interest)+' & free:'+parseFloat(M_accInfo.userAssets[p].free) + ' && -->'+( (parseFloat(M_accInfo.userAssets[p].borrowed) + parseFloat(M_accInfo.userAssets[p].interest)) / parseFloat(M_accInfo.userAssets[p].free) ));
												fundsDiffConfirm = 1;
											}
											
											//console.log('fundsDiff:::+ '+fundsDiff+' & fundsDiffConfirm:'+fundsDiffConfirm);
											
											if ((fundsDiff<5) && (fundsDiffConfirm==1) ){
												
												//var repaidAmount = parseFloat(M_accInfo.userAssets[p].borrowed) + parseFloat(M_accInfo.userAssets[p].interest);
												var repaidAmount = parseFloat(M_accInfo.userAssets[p].free);//free
												var amountToMainAccount = ((parseFloat(M_accInfo.userAssets[p].borrowed) + parseFloat(M_accInfo.userAssets[p].interest))*(0.1/0.4)*parseFloat(orderBook.asks[oV][0])).toFixed(4); //for now leave this as is...
												//var amountToMainAccount = (parseFloat((ws_json_B[i].baseBalance*1.00)*(0.1/0.2))).toFixed(2);
												//var amountToMainAccount = ((parseFloat(M_accInfo.userAssets[p].borrowed) + parseFloat(M_accInfo.userAssets[p].interest))*(0.1/0.2)*parseFloat(orderBook.asks[oV][0])).toFixed(4); //I MADE IT THIS NOW 04/01/2021
												console.log('REPAY_AND_TRANSFER_TO_MAIN '+'repaidAmount:'+repaidAmount+' & amountToMainAccount:'+amountToMainAccount)
												queryBook.push(['REPAY_AND_TRANSFER_TO_MAIN', promList[y][0], [ws_json[i].symB, repaidAmount, amountToMainAccount, ] ]); // AMOUNT TO MAIN ACCOUNT DOES NOT EVEN MATTER BECAUSE IT JUST REPAYS
														
												payBNBInt =1;
												//queryBook.push(['PAY_BNB_INTEREST', promList[y][0] ]);//NEW
												
												/* if (ws_user == 'oJhPznC7LyXGnbnFYLxiTUBbudF3'){
													if (ws_json[i].symB.substr(-4) == 'USDT' ){
												
														var moment = require('moment');
														var now = moment();
												
														console.log('TWITTER MESSAGE BELOW:');
														console.log('--------')
														var shortPerRet = (perRet*(-1)).toFixed(2);
												
														var typeRet='profit';
														if (shortPerRet<0){
															typeRet='loss';
														}
												
														 T.post('statuses/update', { status: '[BOT] Closed short position: $'+baseSymB+' / $USDT at '+orderBook.asks[oV][0]+' ('+shortPerRet+'% '+typeRet+'). \n'+now.format('YYYY-MM-DD HH:mm')+' \n[Not financial advice]' }, function(err, data, response) {
															console.log(data)
														}) 
													}
												} */
												
												
												
												  delete ws_json[i];
												ws_jsonFilter = ws_json.filter(function(x){return x !== null});
												firebase.database().ref('/Ins/'+ws_user+'_S').set({
													ws_key: JSON.parse( JSON.stringify(ws_jsonFilter) ),
												})//only uncomment this ----------------------------  
														
												//it removes the coin here from the sell
												var tallyTVar = moment().format('YYYY-MM-DD');
												var runLoopAgain = '1';
												//await _tallyTrades(tallyTVar, runLoopAgain);
												//queryBook.push(['TALLY_TRADES', promList[y][0], [tallyTVar, runLoopAgain] ]);
												
												var addTally=1;
														for (p_=0; p_<queryBook.length; p_++){
															if ( (queryBook[p_][0]=='TALLY_TRADES') && (queryBook[p_][1]==promList[y][0]) && (queryBook[p_][2][0]==tallyTVar) ){
																addTally=0;
																console.log('TALLY_TRADES already exists')
															}
														}
														
														if (addTally==1){
															queryBook.push(['TALLY_TRADES', promList[y][0], [tallyTVar, runLoopAgain] ]);
														}
														
														
												
												
												
											}
										}
										
										//payBNBInt=1;//for testing
										if ( (M_accInfo.userAssets[p].asset == 'BNB')   && (payBNBInt==1) ) {
											//if ( (M_accInfo.userAssets[p].asset == 'BNB')    ) {
												var amountToTransfer = (parseFloat(M_accInfo.userAssets[p].interest)+parseFloat(M_accInfo.userAssets[p].borrowed)-parseFloat(M_accInfo.userAssets[p].free))*1.01; //adding 1% extra 
													//var amountToTransfer = (parseFloat(M_accInfo.userAssets[p].interest)+parseFloat(M_accInfo.userAssets[p].borrowed)-parseFloat(M_accInfo.userAssets[p].free))*1.01; //adding 1% extra 
													
													console.log('amountToTransfer (TRANSFER_AND_PAY_BNB_INT:_______ '+amountToTransfer);
											queryBook.push(['TRANSFER_AND_PAY_BNB_INT', promList[y][0], ['BNB', amountToTransfer, M_accInfo.userAssets[p].interest, ] ]);
										}
										
									//	if ( ((M_accInfo.userAssets[p].asset == baseSym) || (M_accInfo.userAssets[p].asset == baseSymB)  ) && (parseFloat(M_accInfo.userAssets[p].borrowed) > parseFloat(M_accInfo.userAssets[p].free) ) && (ws_json_B[i].type=='SHORT_SELL') ) {
									//		borrowedQuantity = parseFloat(M_accInfo.userAssets[p].netAsset);
									//	}
									}
								}
							}//end of new long loop for 2. lookForShort.2.
						}
							
							
							console.log('coinQtyFloored 3. : '+coinQtyFloored);
							console.log('borrowedQuantity 3. :'+borrowedQuantity);
							
							//-/-/-/-/-/--/-/-/-/-/--/-/-/-/-/---/-/-/-/--/-/-/-/--/-/-/-/--
						}
							//xoxoxoxoxoxoxoxoxoxoxoxoxoxo
							
							
							
						
		if (ws_json[i]){
		if (ws_json[i].type !='SHORT_BUY'){
				//console.log('YAPPPPPP!!!!!');
				//long begin --
				const discountedPrice = parseFloat(ws_json[i].initialPrice* (1-((ws_json[i].discountPercent)*0.01))).toFixed(8);
			
			
			//const premiumPrice = parseFloat(ws_json[i].initialPrice* (1+((ws_json[i].premiumPercent)*0.01))).toFixed(8);
			
			
			
			//console.log('oV___:'+oV);
			
			var perRet = ((parseFloat(orderBook.bids[oV][0])/parseFloat(ws_json[i].initialPrice))-1)*100;
			
			
			
			var priceSold_ = parseFloat(orderBook.bids[oV][0]);
			console.log(ws_json[i].symB+' - Percentage Return: '+perRet+'%');
			
			if (ws_json[i].flipped=='true'){
					console.log('THIS IS A FLIPPED COIN ');
			}
			
			console.log('DISCOUNT PRICE :::::'+discountedPrice);
			
			
			
			
			var conditionsToCheckProfitMet_LONG=0;
							var reasonsForLongCheck = '';
							/* if ( (  (rsiA>68)   ||  ( ((minuteNumber>=26) && (minuteNumber<=29)) || (((minuteNumber>=56) && (minuteNumber<=59))) ) ) && (ws_user=='_test_') && (perRet>2) ) { //(ws_user=='_test_')
								conditionsToCheckProfitMet_LONG=1;
								reasonsForLongCheck='Reason for Long Check: _test_ account';
								console.log(reasonsForLongCheck);
							} */
							
							/* if (      ( ((minuteNumber>=26) && (minuteNumber<=29)) || (((minuteNumber>=56) && (minuteNumber<=59))) )   && ((perRet>2) && (perRet<4) )  ) { //(ws_user=='_test_')
								conditionsToCheckProfitMet_LONG=1;
								reasonsForLongCheck='Reason for Long Check: MINUTE NUMBER TIME';
								console.log(reasonsForLongCheck);
							}  */  
							
							//roc20Arr
							/* if ((rsiA>67) && (perRet>2) && (!( (roc20Arr[0]>=roc20Arr[1]) && (roc50Arr[0]>=roc50Arr[1]) ))  ){
								conditionsToCheckProfitMet_LONG=1;
								reasonsForLongCheck='Reason for Long Check: HIGH RSI WITH ROC';
								console.log(reasonsForLongCheck);
							} */
							
							/* if ( (ppoArr[0]<ppoArr[1]) && (ppoArr[1]<ppoArr[2]) && (tPSAR>parseFloat(orderBook.bids[0][0])) && (tPSAR>parseFloat(orderBook.asks[0][0])) && (perRet>2) ){
								conditionsToCheckProfitMet_LONG=1;
								reasonsForLongCheck='Reason for Long Check: PPO met';
								console.log(reasonsForLongCheck);
							} */
							
							var conditionsToExit=0;
							//if ( ( ((minuteNumber>=26) && (minuteNumber<=29)) || (((minuteNumber>=56) && (minuteNumber<=59))) ) && (perRet<0) ) {
							if ( ( ((minuteNumber>27) && (minuteNumber<=29)) || (((minuteNumber>57) && (minuteNumber<=59))) ) && (perRet<0) ) {
								console.log('Looking for losses since time is correct_______...._____....');
								conditionsToExit=1;
							}
							if ( ( ((minuteNumber>27) && (minuteNumber<=29)) || (((minuteNumber>57) && (minuteNumber<=59))) ) && (perRet>0)){
								console.log('Normal Profit Check');
								conditionsToExit=1;
							}
							
			
			
			
			
			/* if ( (perRet<-1.8) && (ws_user!='_testACC_') ) {
				
				firebase.database().ref('/general/').update({
					usdt_activateSimulation:'1',
					usdt_simulationBusy: '1',
				})
				
			} */
			
			
		
			
			if (ws_json[i].exitPricePlaced){
				var marketSellPrice = ws_json[i].exitPricePlaced*(1-((ws_json[i].discountPercent)*0.01));//used to be 2
				//var marketSellPrice = discountedPrice*2;//used to be 2
				console.log('marketSellPrice:'+marketSellPrice+'& ws_json[i].exitPricePlaced:'+ws_json[i].exitPricePlaced);
			}
			
			
			
			
			//_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
			
			//_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
		//if (typeof ws_json[i] !=='undefined'){
		
		
			
			
			
		
			
			
			/*  if (ws_json[i].symB=='AUDUSDT'){
				///queryBook.push(['LIMIT_SELL', promList[y][0], [ws_json[i].symB, coinQty, orderBook.bids[oV][0], orderBook.bids[oVB][0], ws_json[i].discountPercent, ws_json[i].model, ws_json[i].chart, ], responseJsonOpenOrders ]);
				queryBook.push(['MARKET_SELL', promList[y][0], [ws_json[i].symB, coinQty, orderBook.bids[0][0],  ws_json[i].discountPercent, ws_json[i].model, ws_json[i].chart, ], responseJsonOpenOrders  ]);				
									ws_json[i].orderPricePlaced = parseFloat(orderBook.bids[oV][0]);
									ws_json[i].exitPricePlaced = parseFloat(orderBook.bids[oV][0]); //NEW@!!!
									firebase.database().ref('/Ins/'+ws_user+'_S').set({
										ws_key: JSON.parse( JSON.stringify(ws_json) ),
									})
			}  */
			
			
			
		if (ws_json[i]){
				/* if   ( ws_json[i].orderPricePlaced)  {  
				//if 	(((ws_json[i].orderPricePlaced)*1.003  < (parseFloat(orderBook.bids[oV][0])) )  && (global_PSAR<parseFloat(orderBook.bids[oV][0])) && (global_PSAR<parseFloat(orderBook.asks[oV][0]))   && (ws_json[i].ignorePSAR!=1)    ){//used to be 0.01  //&& (latestPSAR>= parseFloat(orderBook.bids[oV][0]) )
				if 	( (((	(ws_json[i].orderPricePlaced)/(parseFloat(orderBook.bids[oV][0])))-1) < -0.3    )        ){//used to be 0.01  //&& (latestPSAR>= parseFloat(orderBook.bids[oV][0]) )   //&& (global_PSAR<parseFloat(orderBook.bids[oV][0])) && (global_PSAR<parseFloat(orderBook.asks[oV][0]))  //&& (ws_json[i].ignorePSAR!=1) 
					//const coinQty = ws_json[i].baseBalance;
					//0-- _sellBackground(ws_json[i].symB, coinQty, orderBook.bids[oV][0], orderBook.bids[oVB][0], ws_json[i].discountPercent,  );										
					console.log('ORDER TO SELL WILL BE CANCELLED : 256');						
					
					queryBook.push(['CANCEL_LIMIT_SELL', promList[y][0], [ws_json[i].symB, coinQty, orderBook.bids[oV][0], orderBook.bids[oVB][0], ws_json[i].discountPercent, ws_json[i].model, ws_json[i].chart, ], responseJsonOpenOrders ]);
					
					ws_json[i].orderPricePlaced = null;
					ws_json[i].orderPricePlaced_Market = null;
					ws_json[i].orderCancelled = "YES";
					
					firebase.database().ref('/Ins/'+ws_user+'_S').set({
						ws_key: JSON.parse( JSON.stringify(ws_json) ),
					}) // --  this needs to happen in a different place now...
				
				}
				
			} */
			
			//console.log('NEW CALC: '+(((parseFloat(orderBook.bids[oV][0])/ws_json[i].orderPricePlaced)-1)*100)    );
			
			if   ( ws_json[i].orderPricePlaced) { 
				//if  (	(ws_json[i].orderPricePlaced)*1.003  < (parseFloat(orderBook.bids[oV][0])) )       {//used to be 0.01  //&& (latestPSAR>= parseFloat(orderBook.bids[oV][0]) )
					//if  (((	(ws_json[i].orderPricePlaced)/(parseFloat(orderBook.bids[oV][0])))-1) < -0.3    )       {//used to be 0.01  //&& (latestPSAR>= parseFloat(orderBook.bids[oV][0]) )
					if  ( (((parseFloat(orderBook.bids[oV][0])/ws_json[i].orderPricePlaced)-1)*100)>0.3   )       {
						//4.__
						
						
						
						if (ws_json[i].flipped=='no'){
							console.log('ORDER TO SELL WILL BE INITIATED: 01A');						
						//	queryBook.push(['LIMIT_SELL', promList[y][0], [ws_json[i].symB, coinQtyFloored, orderBook.bids[oV][0], orderBook.bids[oVB][0], ws_json[i].discountPercent, ws_json[i].model, ws_json[i].chart, ], responseJsonOpenOrders ]);
							
							ws_json[i].orderPricePlaced = parseFloat(orderBook.bids[oV][0]);
							ws_json[i].orderPricePlaced_Market = parseFloat(orderBook.bids[oV][0]);
							firebase.database().ref('/Ins/'+ws_user+'_S').set({
								ws_key: JSON.parse( JSON.stringify(ws_json) ),
							}) // --  this needs to happen in a different place now...
						}
						else if (ws_json[i].flipped=='true'){
							const coinQty = borrowedQuantity; //ws_json[i].baseBalance;
							var coinQtyFloored = Math.floor(coinQty * powVar) / powVar;
							
							//0-- _sellBackground(ws_json[i].symB, coinQty, orderBook.asks[oV][0], orderBook.asks[oVB][0], ws_json[i].discountPercent,  );										
							console.log('ORDER TO SELL WILL BE INITIATED??: 01');						
							
						//	queryBook.push(['M_LIMIT_BUY', promList[y][0], [ws_json[i].symB, coinQtyFloored, orderBook.asks[oV][0], orderBook.asks[oVB][0], ws_json[i].initialPrice, ws_json[i].discountPercent, ws_json[i].model, ws_json[i].chart, ], M_responseJsonOpenOrders ]);
							
							ws_json[i].orderPricePlaced = parseFloat(orderBook.asks[oV][0]);
							ws_json[i].orderPricePlaced_Market = parseFloat(orderBook.asks[oV][0]);
							firebase.database().ref('/Ins/'+ws_user+'_S').set({
								ws_key: JSON.parse( JSON.stringify(ws_json) ),
							}) // --  this needs to happen in a different place now...
							
						}
						
					}
				
			}
			
			if ( ws_json[i].orderPricePlaced_Market) {
				if ( parseFloat(orderBook.asks[3][0]) <= ws_json[i].orderPricePlaced_Market   )   {				
				//3.__
				
					if (ws_json[i].flipped=='no'){
						console.log('ORDER TO MARKET - SELL WILL BE INITIATED: 02');						
						queryBook.push(['MARKET_SELL', promList[y][0], [ws_json[i].symB, coinQtyFloored, orderBook.bids[0][0],  ws_json[i].discountPercent, ws_json[i].model, ws_json[i].chart, ], responseJsonOpenOrders  ]);
					}
					else if (ws_json[i].flipped=='true'){
						console.log('ORDER TO MARKET - SELL WILL BE INITIATED: 02');						
						const coinQty = borrowedQuantity; //ws_json[i].baseBalance;
						var coinQtyFloored = Math.floor(coinQty * powVar) / powVar;
						
						//_cancelAndMarketSellB_(ws_json[i].symB, coinQty, orderBook.asks[0][0],  ws_json[i].discountPercent,  );
						queryBook.push(['M_MARKET_BUY', promList[y][0], [ws_json[i].symB, coinQtyFloored, orderBook.asks[0][0], ws_json[i].initialPrice, ws_json[i].discountPercent, ws_json[i].model, ws_json[i].chart, ], M_responseJsonOpenOrders  ]);
						
						//temporary fix ... problem is that it does not update the orderPricePlacedMarket variable so it everytime tries to market buy the coin even though it already did so.
						///solution --> in the future first check the balance before market buying....
						
					}
				
				
				}
				
			}
			
			console.log('BIDS:'+orderBook.bids[0][0]+' & MSP:'+marketSellPrice+' EPP:'+ws_json[i].exitPricePlaced);
			
			if ( (ws_json[i].exitPricePlaced ) && ( parseFloat(orderBook.bids[0][0])  < marketSellPrice  )  ){
				//2.__
				
				if (ws_json[i].flipped=='no'){
					console.log('ORDER TO MARKET - SELL WILL BE INITIATED: 03');						
					queryBook.push(['MARKET_SELL', promList[y][0], [ws_json[i].symB, coinQtyFloored, orderBook.bids[0][0],  ws_json[i].discountPercent, ws_json[i].model, ws_json[i].chart,], responseJsonOpenOrders ]);
				}
				else if (ws_json[i].flipped=='true'){
					console.log('ORDER TO MARKET - SELL WILL BE INITIATED: 03');						
					const coinQty = borrowedQuantity; //ws_json[i].baseBalance;
					var coinQtyFloored = Math.floor(coinQty * powVar) / powVar;
					//_cancelAndMarketSellB_(ws_json[i].symB, coinQty, orderBook.bids[0][0],  ws_json[i].discountPercent,  );	
					queryBook.push(['M_MARKET_BUY', promList[y][0], [ws_json[i].symB, coinQtyFloored, orderBook.bids[0][0], ws_json[i].initialPrice, ws_json[i].discountPercent, ws_json[i].model, ws_json[i].chart, ], M_responseJsonOpenOrders ]);
					
				}
				
				
				
				
				
			}
			
			
			
			//candlesForCoin
			//var editedCandles = candlesForCoin;
			//editedCandles.reverse();
			
			var my_below20MA = 0;
			
			var editedCandles = candlesForCoin.slice().reverse();
			
			if (editedCandles[0]){
				var latestPriceEC = editedCandles[0][4];
				var latestDateEC = editedCandles[0][6];
				console.log('eC date:'+moment(latestDateEC).format('YYYY-MM-DD HH:mm:ss')+' &&  price eC :'+latestPriceEC); 
				
				
				console.log('MA: sma20Arr[0]:'+sma20Arr[0]);
				var below20MA = parseFloat(sma20Arr[0])*0.98;
				console.log('old Lowest -->'+below20MA)
				
				console.log('- --- --- -- ----  -- -----')
				
				var totNumerator = 0;
				for (var a=0; a<20; a++){
					totNumerator += parseFloat(editedCandles[a][4]);
				}
				var my_calcMA20 = totNumerator/20;
				console.log('my_calcMA20:'+my_calcMA20);
				my_below20MA = parseFloat(my_calcMA20)*0.98;
				console.log('my_Lowest -->'+my_below20MA)
			}
			
			
			
			/*  var latestPriceB = candlesForCoin[candlesForCoin.length-1][4];
			var latestDateB = candlesForCoin[candlesForCoin.length-1][6];
			console.log('B date:'+moment(latestDateB).format('YYYY-MM-DD HH:mm:ss')+' && price:'+latestPriceB);  */
			
			if ((perRet>=5) && (ws_json[i].flipped=='no') && (flippedJSON.l_flipA==-1)  ) {
				flippedJSON.l_flipA = flippedJSON.l_flipA*(-1);
				console.log('XX>X>X>X>X>X>X>>>X>>X>X>X> CHANGE TO >1<');
				var fs_p = require('fs').promises;
											try {
												await fs_p.writeFile('flipped.json', JSON.stringify(flippedJSON));
											} catch (error){
												console.error(error);
											}
			}
			
			if ((ws_json[i].initialPrice) && (ws_json[i].flipped=='true') && (perRet>=4.9) && (!ws_json[i].orderPricePlaced)      ){// this solves 2 problems, immediately chanigng back to normal system and getting rid of flip loss reducing exposure to jump
				console.log('ORDER TO SELL WILL BE INITIATED: XXB');	
				
				invPR = perRet*(-1);
				
				console.log('invPR:'+invPR);
				
										if (flippedJSON.l_flipA==-1){
											flippedJSON.l_flipA = flippedJSON.l_flipA*(-1);
										
											var fs_p = require('fs').promises;
											try {
												await fs_p.writeFile('flipped.json', JSON.stringify(flippedJSON));
											} catch (error){
												console.error(error);
											}
										}
										
										
				if ((ws_user!='_test_') && (ws_user!='_testACC_')) {
									console.log('MARKET _BUY (flipped so short) exit______________________________________________________________--------');
									
									const coinQty = borrowedQuantity; //ws_json[i].baseBalance;
									var coinQtyFloored = Math.floor(coinQty * powVar) / powVar;
									//_cancelAndMarketSellB_(ws_json[i].symB, coinQty, orderBook.bids[0][0],  ws_json[i].discountPercent,  );	
									queryBook.push(['M_MARKET_BUY', promList[y][0], [ws_json[i].symB, coinQtyFloored, orderBook.bids[0][0], ws_json[i].initialPrice, ws_json[i].discountPercent, ws_json[i].model, ws_json[i].chart, ], M_responseJsonOpenOrders ]);
									
									ws_json[i].orderPricePlaced = parseFloat(priceLevelFloored);
									//ws_json[i].exitPricePlaced = parseFloat(priceLevelFloored); //NEW@!!!
									firebase.database().ref('/Ins/'+ws_user+'_S').set({
										ws_key: JSON.parse( JSON.stringify(ws_json) ),
									})  //--  this needs to happen in a different place now...
									
				}
				else if (ws_user!='_test_'){
					recordTestAccount.push({
										date: now.format('YYYY-MM-DD HH:mm:ss'),
										orderType: 'SELL',
										symbol: ws_json[i].symB,
										system: 'Long Sell Loss',
										_return: invPR,
										priceSold: priceSold_,
										priceBought: parseFloat(ws_json[i].initialPrice),
										dateBought: ws_json[i].date,
										_numTrades: ws_json[i]._numTrades,
										_numProfits: ws_json[i]._numProfits,
										_expectedProfitPerc: ws_json[i]._expectedProfitPerc,
										_biggestLoss: ws_json[i]._biggestLoss,
										_netPerRet: ws_json[i]._netPerRet,
										_flipped: ws_json[i].flipped,
									})
									update_recordTestAccount=1;
									
									
										
										delete ws_json[i];
										ws_jsonFilter = ws_json.filter(function(x){return x !== null}); //commented this... 
									
										firebase.database().ref('/Ins/_testACC__S').set({
											ws_key: JSON.parse( JSON.stringify(ws_jsonFilter) ),
										}) 
				
				}
										
				
				
			}
			
			console.log('coinQtyFloored 1. : '+coinQtyFloored);
			console.log('borrowedQuantity 1. :'+borrowedQuantity);
			
			
			//if ((ws_json[i].initialPrice) &&  (parseFloat(orderBook.bids[oVB][0]) < discountedPrice) && (!ws_json[i].orderPricePlaced)      ){//should be <=  
			if (ws_json[i]){
			if ((ws_json[i].initialPrice) &&  (parseFloat(orderBook.bids[oVB][0]) <= my_below20MA) && (!ws_json[i].orderPricePlaced)      ){//should be <=   && (conditionsToExit==1)
			//1.__
				console.log('ORDER TO SELL @ a loss WILL BE INITIATED: 04');	
				
								var invPR=0
									if (ws_json[i].flipped!='true'){
										invPR = perRet;
									}
									else if (ws_json[i].flipped=='true'){
										invPR = perRet*(-1);
									}
									console.log('invPR:'+invPR);
									
									if (invPR<-1){ // room for error
										// var fJ = fs.readFileSync('flipped.json','utf8');
										// var flippedJSON = JSON.parse(fJ);
										
										if ((ws_json[i].flipped!='true') && (flippedJSON.l_flipA==1)) {
											flippedJSON.l_flipA = flippedJSON.l_flipA*(-1);
											var fs_p = require('fs').promises;
											try {
												await fs_p.writeFile('flipped.json', JSON.stringify(flippedJSON));
											} catch (error){
												console.error(error);
											}
										}
										if ((ws_json[i].flipped=='true') && (flippedJSON.l_flipA==-1)) {
											flippedJSON.l_flipA = flippedJSON.l_flipA*(-1);
											var fs_p = require('fs').promises;
											try {
												await fs_p.writeFile('flipped.json', JSON.stringify(flippedJSON));
											} catch (error){
												console.error(error);
											}
										}
										
									}
									
									
				
				if (ws_json[i].flipped=='no'){
					if ((ws_user!='_test_') && (ws_user!='_testACC_')) {
									
									console.log('LIMIT_SELL exit______________________________________________________________--------');
									//queryBook.push(['LIMIT_SELL', promList[y][0], [ws_json[i].symB, coinQtyFloored, priceLevelFloored, orderBook.bids[oVB][0], ws_json[i].discountPercent, ws_json[i].model, ws_json[i].chart, 'JUST_LIMIT' ], responseJsonOpenOrders ]);
									queryBook.push(['MARKET_SELL', promList[y][0], [ws_json[i].symB, coinQtyFloored, orderBook.bids[0][0],  ws_json[i].discountPercent, ws_json[i].model, ws_json[i].chart,], responseJsonOpenOrders ]);
									
									ws_json[i].orderPricePlaced = parseFloat(priceLevelFloored);
									ws_json[i].exitPricePlaced = parseFloat(priceLevelFloored); //NEW@!!!
									firebase.database().ref('/Ins/'+ws_user+'_S').set({
										ws_key: JSON.parse( JSON.stringify(ws_json) ),
									})  //--  this needs to happen in a different place now...
								}
								else if (ws_user!='_test_'){
									
									recordTestAccount.push({
										date: now.format('YYYY-MM-DD HH:mm:ss'),
										orderType: 'SELL',
										symbol: ws_json[i].symB,
										system: 'Long Sell Loss',
										_return: perRet,
										priceSold: priceSold_,
										priceBought: parseFloat(ws_json[i].initialPrice),
										dateBought: ws_json[i].date,
										_numTrades: ws_json[i]._numTrades,
										_numProfits: ws_json[i]._numProfits,
										_expectedProfitPerc: ws_json[i]._expectedProfitPerc,
										_biggestLoss: ws_json[i]._biggestLoss,
										_netPerRet: ws_json[i]._netPerRet,
									})
									update_recordTestAccount=1;
									
									
										
										delete ws_json[i];
										ws_jsonFilter = ws_json.filter(function(x){return x !== null}); //commented this... 
									
										firebase.database().ref('/Ins/_testACC__S').set({
											ws_key: JSON.parse( JSON.stringify(ws_jsonFilter) ),
										}) 
										
											
								}
				}
				else if (ws_json[i].flipped=='true'){
					if ((ws_user!='_test_') && (ws_user!='_testACC_')) {
									const coinQty = borrowedQuantity;//ws_json[i].baseBalance;
									var coinQtyFloored = Math.floor(coinQty * powVar) / powVar;
									console.log('M_LIMIT_BUY exit______________________________________________________________--------');
										queryBook.push(['M_LIMIT_BUY', promList[y][0], [ws_json[i].symB, coinQtyFloored, priceLevelFloored, orderBook.asks[oVB][0], ws_json[i].initialPrice, ws_json[i].discountPercent, ws_json[i].model, ws_json[i].chart, 'JUST_LIMIT' ], M_responseJsonOpenOrders ]);
									ws_json[i].orderPricePlaced = parseFloat(priceLevelFloored);
									ws_json[i].exitPricePlaced = parseFloat(priceLevelFloored); //NEW@!!!
									firebase.database().ref('/Ins/'+ws_user+'_S').set({
										ws_key: JSON.parse( JSON.stringify(ws_json) ),
									})  //--  this needs to happen in a different place now...
								
								}
								else if (ws_user!='_test_'){
									var invPR = perRet*(-1);
									
									recordTestAccount.push({
										date: now.format('YYYY-MM-DD HH:mm:ss'),
										orderType: 'BUY (short)',
										symbol: ws_json[i].symB,
										system: 'Short Buy Loss',
										_return: invPR,
										priceSold: priceSold_,
										priceBought: parseFloat(ws_json[i].initialPrice),
										dateBought: ws_json[i].date,
										_numTrades: ws_json[i]._numTrades,
										_numProfits: ws_json[i]._numProfits,
										_expectedProfitPerc: ws_json[i]._expectedProfitPerc,
										_biggestLoss: ws_json[i]._biggestLoss,
										_netPerRet: ws_json[i]._netPerRet,
									})
									update_recordTestAccount=1;
									
										
										
									delete ws_json[i];
									ws_jsonFilter = ws_json.filter(function(x){return x !== null}); // commented this... 
									
									firebase.database().ref('/Ins/_testACC__S').set({
										ws_key: JSON.parse( JSON.stringify(ws_jsonFilter) ),
									}) 
								}
				}
							
								
								
								
								

																
			}
			}
			
			//.....
			
		} // end of if (ws_json[i]){
			
			
		
	
			
			
			
		//--------------------------------------------------------------------------------------------------------------------------						
								
			
			
			console.log('_______________________________________________________________________')
			
			
				//long end --
			}
			else {
				console.log('!!!! !!!!! !!!! !!!!!');
				console.log('SHORT buy begin!!!! !!!!!');
				////////////////////////////////////////////////////////////////////////////////////////
				////////////////////////////////////////////////////////////////////////////////////////
				
				//long begin --
				const discountedPrice = parseFloat(ws_json[i].initialPrice* (1+((ws_json[i].discountPercent)*0.01))).toFixed(8);//+ so its actually a premium now...
			
			
				//const premiumPrice = parseFloat(ws_json[i].initialPrice* (1+((ws_json[i].premiumPercent)*0.01))).toFixed(8);
			
				var oV = 0;
				/* if (discountedPrice < 0.0000035){//350 sats
					oV = 0;
				} */
				const oVB = oV+1;
			
				//console.log('oV___:'+oV);
			
				var perRet = ((parseFloat(orderBook.asks[oV][0])/parseFloat(ws_json[i].initialPrice))-1)*100;
				
				
				
				var priceSold_ = parseFloat(orderBook.asks[oV][0]);
				console.log(ws_json[i].symB+' - SHORT Percentage Return: '+perRet+'%');
				
				if (ws_json[i].flipped=='true'){
					console.log('THIS IS A FLIPPED COIN ');
				}
				
				console.log('DISCOUNT (PREM) PRICE :::::'+discountedPrice);
				
				
				
				
				/* var half_PriceLevelA = (1+((perRet)/100))*parseFloat(ws_json[i].initialPrice);  //parseFloat(orderBook.bids[0][0])/2;
				var half_PriceLevelB = (1+((perRet/2)/100))*parseFloat(ws_json[i].initialPrice);  //parseFloat(orderBook.bids[0][0])/2;
				var half_PriceLevel__SL = half_PriceLevelB*(1+0.0001);
				//var half_priceLevelFloored = Math.floor(half_PriceLevel * price_powVar) /price_powVar;
				console.log('SHORT half_PriceLevelA __ : '+half_PriceLevelA);
				console.log('SHORT half_PriceLevelB __ : '+half_PriceLevelB); */
				
				
				
				var conditionsToCheckProfitMet_SHORT=0;
				// if (  (rsiA<32)    ||  ( ((minuteNumber>=26) && (minuteNumber<=29)) || (((minuteNumber>=56) && (minuteNumber<=59))) ) ){
					// conditionsToCheckProfitMet_SHORT=1;
				// } 
				var reasonsForShortCheck = '';
							/* if ( (  (rsiA<32)   ||  ( ((minuteNumber>=26) && (minuteNumber<=29)) || (((minuteNumber>=56) && (minuteNumber<=59))) ) ) && (ws_user=='_test_') && (perRet<-2) ) { //(ws_user=='_test_')
								conditionsToCheckProfitMet_SHORT=1;
								reasonsForShortCheck='Reason for SHORT Check: _test_ account';
								console.log(reasonsForShortCheck);
							} */
							
							/* if (      ( ((minuteNumber>=26) && (minuteNumber<=29)) || (((minuteNumber>=56) && (minuteNumber<=59))) )   && ((perRet<-2) && (perRet>-4) )  ) { //(ws_user=='_test_')
								conditionsToCheckProfitMet_SHORT=1;
								reasonsForShortCheck='Reason for Long Check: MINUTE NUMBER TIME';
								console.log(reasonsForShortCheck);
							}   */
							
							//roc20Arr
							/* if ((rsiA<33) && (perRet<-2) && (!( (roc20Arr[0]<=roc20Arr[1]) && (roc50Arr[0]<=roc50Arr[1]) ))  ){
								conditionsToCheckProfitMet_SHORT=1;
								reasonsForShortCheck='Reason for SHORT Check: HIGH RSI WITH ROC';
								console.log(reasonsForShortCheck);
							} */
														
							/* if ( (ppoArr[0]>ppoArr[1]) && (ppoArr[1]>ppoArr[2]) && (tPSAR<parseFloat(orderBook.bids[0][0])) && (tPSAR<parseFloat(orderBook.asks[0][0])) && (perRet<-2) ){
								conditionsToCheckProfitMet_SHORT=1;
								reasonsForShortCheck='Reason for SHORT Check: PPO met';
								console.log(reasonsForShortCheck);
							} */
				
				var conditionsToExit=0;
							if ( ( ((minuteNumber>27) && (minuteNumber<=29)) || (((minuteNumber>57) && (minuteNumber<=59))) ) && (perRet>0) ) {
								console.log('Looking for losses since time is correct_______...._____....');
								conditionsToExit=1;
							}
							if ( ( ((minuteNumber>27) && (minuteNumber<=29)) || (((minuteNumber>57) && (minuteNumber<=59))) ) && (perRet<0)){
								console.log('Normal Profit Check');
								conditionsToExit=1;
							}
				
				/* if ((perRet>1.8) && (ws_user!='_testACC_') ){
					firebase.database().ref('/general/').update({
						short_usdt_activateSimulation:'1',
						short_usdt_simulationBusy: '1',
					})
				} */
				
				/* var latestData = ws_json[i].tradingData.reverse();
								var latestPSAR = latestData[0].tPSAR;
								console.log('latestPSAR:-->'+latestPSAR); */
			
				if (ws_json[i].exitPricePlaced){
					var marketSellPrice = ws_json[i].exitPricePlaced*(1+((ws_json[i].discountPercent)*0.01));//used to be 2
					//var marketSellPrice = discountedPrice*2;//used to be 2
					console.log('marketSellPrice:'+marketSellPrice+'& ws_json[i].exitPricePlaced:'+ws_json[i].exitPricePlaced);
				}
			
			
			//_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
			
			//_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
			
				
			
							
							
							
							
							
						
			
						
						
					//if ((typeof M_accInfo.userAssets!== 'undefined') && (x_B=='ONE') ){
					
						
						
						//console.log('net asset----------------->:'+borrowedQuantity)
			///////////
			
		if (typeof ws_json[i] !=='undefined'){
			
			
			
			
			
			
			
			
			
			
		if (ws_json[i]){
			if   (ws_json[i].orderPricePlaced) {
				//	if  (	(ws_json[i].orderPricePlaced)*1.003  > (parseFloat(orderBook.asks[oV][0])) ) {//used to be 0.01  //&& (latestPSAR<(parseFloat(orderBook.asks[oV][0]))) 
				if  ( (((parseFloat(orderBook.asks[oV][0])/ws_json[i].orderPricePlaced)-1)*100)<-0.3   )       {
					//4.__
					
					if (ws_json[i].flipped=='no'){
						const coinQty = borrowedQuantity; //ws_json[i].baseBalance;
						var coinQtyFloored = Math.floor(coinQty * powVar) / powVar;
						
						//0-- _sellBackground(ws_json[i].symB, coinQty, orderBook.asks[oV][0], orderBook.asks[oVB][0], ws_json[i].discountPercent,  );										
						console.log('ORDER TO SELL WILL BE INITIATED??: 01');						
						
						//queryBook.push(['M_LIMIT_BUY', promList[y][0], [ws_json[i].symB, coinQtyFloored, orderBook.asks[oV][0], orderBook.asks[oVB][0], ws_json[i].initialPrice, ws_json[i].discountPercent, ws_json[i].model, ws_json[i].chart, ], M_responseJsonOpenOrders ]);
						
						ws_json[i].orderPricePlaced = parseFloat(orderBook.asks[oV][0]);
						ws_json[i].orderPricePlaced_Market = parseFloat(orderBook.asks[oV][0]);
						firebase.database().ref('/Ins/'+ws_user+'_S').set({
							ws_key: JSON.parse( JSON.stringify(ws_json) ),
						}) // --  this needs to happen in a different place now...
					}
					else if (ws_json[i].flipped=='true'){
						console.log('ORDER TO SELL WILL BE INITIATED: 01A');						
							//queryBook.push(['LIMIT_SELL', promList[y][0], [ws_json[i].symB, coinQtyFloored, orderBook.bids[oV][0], orderBook.bids[oVB][0], ws_json[i].discountPercent, ws_json[i].model, ws_json[i].chart, ], responseJsonOpenOrders ]);
							
							ws_json[i].orderPricePlaced = parseFloat(orderBook.bids[oV][0]);
							ws_json[i].orderPricePlaced_Market = parseFloat(orderBook.bids[oV][0]);
							firebase.database().ref('/Ins/'+ws_user+'_S').set({
								ws_key: JSON.parse( JSON.stringify(ws_json) ),
							}) // --  this needs to happen in a different place now...
					}
					
					
				
				
				}
			}
			
			if (ws_json[i].orderPricePlaced_Market) { 
				if ( parseFloat(orderBook.bids[3][0]) >= ws_json[i].orderPricePlaced_Market   ) {	
					//3.__
					
					if (ws_json[i].flipped=='no'){
						console.log('ORDER TO MARKET - SELL WILL BE INITIATED: 02');						
						const coinQty = borrowedQuantity; //ws_json[i].baseBalance;
						var coinQtyFloored = Math.floor(coinQty * powVar) / powVar;
						
						//_cancelAndMarketSellB_(ws_json[i].symB, coinQty, orderBook.asks[0][0],  ws_json[i].discountPercent,  );
						queryBook.push(['M_MARKET_BUY', promList[y][0], [ws_json[i].symB, coinQtyFloored, orderBook.asks[0][0], ws_json[i].initialPrice, ws_json[i].discountPercent, ws_json[i].model, ws_json[i].chart, ], M_responseJsonOpenOrders  ]);
						
						//temporary fix ... problem is that it does not update the orderPricePlacedMarket variable so it everytime tries to market buy the coin even though it already did so.
						///solution --> in the future first check the balance before market buying....
						
					}
					else if (ws_json[i].flipped=='true'){
						console.log('ORDER TO MARKET - SELL WILL BE INITIATED: 02');						
						queryBook.push(['MARKET_SELL', promList[y][0], [ws_json[i].symB, coinQtyFloored, orderBook.bids[0][0],  ws_json[i].discountPercent, ws_json[i].model, ws_json[i].chart, ], responseJsonOpenOrders  ]);
					}
				
				
				}
			}
			
			if ( (ws_json[i].exitPricePlaced ) && ( parseFloat(orderBook.asks[0][0])  > marketSellPrice  )  ){
				//2.__
				
				if (ws_json[i].flipped=='no'){
					console.log('ORDER TO MARKET - SELL WILL BE INITIATED: 03');						
					const coinQty = borrowedQuantity; //ws_json[i].baseBalance;
					var coinQtyFloored = Math.floor(coinQty * powVar) / powVar;
					//_cancelAndMarketSellB_(ws_json[i].symB, coinQty, orderBook.bids[0][0],  ws_json[i].discountPercent,  );	
					queryBook.push(['M_MARKET_BUY', promList[y][0], [ws_json[i].symB, coinQtyFloored, orderBook.bids[0][0], ws_json[i].initialPrice, ws_json[i].discountPercent, ws_json[i].model, ws_json[i].chart, ], M_responseJsonOpenOrders ]);
				}
				else if (ws_json[i].flipped=='true'){
					console.log('ORDER TO MARKET - SELL WILL BE INITIATED: 03');						
					queryBook.push(['MARKET_SELL', promList[y][0], [ws_json[i].symB, coinQtyFloored, orderBook.bids[0][0],  ws_json[i].discountPercent, ws_json[i].model, ws_json[i].chart,], responseJsonOpenOrders ]);
				}
				
				
			}
			
			
			var my_above20MA = 0;
			
			
			
			var editedCandles = candlesForCoin.slice().reverse();
			
			if (editedCandles[0]){
				var latestPriceEC = editedCandles[0][4];
				var latestDateEC = editedCandles[0][6];
				console.log('eC date:'+moment(latestDateEC).format('YYYY-MM-DD HH:mm:ss')+' &&  price eC :'+latestPriceEC); 
				
				var above20MA = parseFloat(sma20Arr[0])*1.02;
				console.log('old HIGHEST -->'+above20MA)
				
				var totNumerator = 0;
				for (var a=0; a<20; a++){
					totNumerator += parseFloat(editedCandles[a][4]);
				}
				var my_calcMA20 = totNumerator/20;
				console.log('my_calcMA20:'+my_calcMA20);
				my_above20MA = parseFloat(my_calcMA20)*1.02;
				console.log('my_Highest -->'+my_above20MA)
			}
			
			if ((perRet<=-5) && (ws_json[i].flipped=='no') && (flippedJSON.s_flipA==-1)  ) {
				flippedJSON.s_flipA = flippedJSON.s_flipA*(-1);
				console.log('SS_S_S_____ XX>X>X>X>X>X>X>>>X>>X>X>X> CHANGE TO >-1 <');
				var fs_p = require('fs').promises;
											try {
												await fs_p.writeFile('flipped.json', JSON.stringify(flippedJSON));
											} catch (error){
												console.error(error);
											}
			}
			
			if ((ws_json[i].initialPrice) && (ws_json[i].flipped=='true') && (perRet<=-4.9) && (!ws_json[i].orderPricePlaced)      ){
				console.log('ORDER TO BUY _S WILL BE INITIATED: XXB');	
				
				invPR = perRet;
				
				console.log('invPR:'+invPR);
									
										// var fJ = fs.readFileSync('flipped.json','utf8');
										// var flippedJSON = JSON.parse(fJ);
										
										if (flippedJSON.s_flipA==-1){
											flippedJSON.s_flipA = flippedJSON.s_flipA*(-1);
											
											var fs_p = require('fs').promises;
											try {
												await fs_p.writeFile('flipped.json', JSON.stringify(flippedJSON));
											} catch (error){
												console.error(error);
											}
										}
										
				if ((ws_user!='_test_') && (ws_user!='_testACC_')) {
									console.log('MARKET _BUY (flipped so short) exit______________________________________________________________--------');
									
									//const coinQty = borrowedQuantity; //ws_json[i].baseBalance;
									//var coinQtyFloored = Math.floor(coinQty * powVar) / powVar;
									//queryBook.push(['M_MARKET_BUY', promList[y][0], [ws_json[i].symB, coinQtyFloored, orderBook.bids[0][0], ws_json[i].initialPrice, ws_json[i].discountPercent, ws_json[i].model, ws_json[i].chart, ], M_responseJsonOpenOrders ]);
									queryBook.push(['MARKET_SELL', promList[y][0], [ws_json[i].symB, coinQtyFloored, orderBook.bids[0][0],  ws_json[i].discountPercent, ws_json[i].model, ws_json[i].chart,], responseJsonOpenOrders ]);
								
									ws_json[i].orderPricePlaced = parseFloat(priceLevelFloored);
									//ws_json[i].exitPricePlaced = parseFloat(priceLevelFloored); //NEW@!!!
									firebase.database().ref('/Ins/'+ws_user+'_S').set({
										ws_key: JSON.parse( JSON.stringify(ws_json) ),
									})  //--  this needs to happen in a different place now...
									
				}
				else if (ws_user!='_test_'){
					recordTestAccount.push({
										date: now.format('YYYY-MM-DD HH:mm:ss'),
										orderType: 'SELL',
										symbol: ws_json[i].symB,
										system: 'MARKET SELL',
										_return: invPR,
										priceSold: priceSold_,
										priceBought: parseFloat(ws_json[i].initialPrice),
										dateBought: ws_json[i].date,
										_numTrades: ws_json[i]._numTrades,
										_numProfits: ws_json[i]._numProfits,
										_expectedProfitPerc: ws_json[i]._expectedProfitPerc,
										_biggestLoss: ws_json[i]._biggestLoss,
										_netPerRet: ws_json[i]._netPerRet,
										_flipped: ws_json[i].flipped,
									})
									update_recordTestAccount=1;
									
										
										
									delete ws_json[i];
									ws_jsonFilter = ws_json.filter(function(x){return x !== null}); // commented this... 
									
									firebase.database().ref('/Ins/_testACC__S').set({
										ws_key: JSON.parse( JSON.stringify(ws_jsonFilter) ),
									}) 
				}
										
				
				
									
			}
			
				console.log('coinQtyFloored S_. : '+coinQtyFloored);
			console.log('borrowedQuantity S_. :'+borrowedQuantity);
			
			//if ((ws_json[i].initialPrice) &&  (parseFloat(orderBook.asks[oVB][0]) > discountedPrice) && (!ws_json[i].orderPricePlaced)   ){//should be > (SHORT) //&& (parseFloat(ws_json[i].discountPercent)<2)
			if (ws_json[i]){
			if ((ws_json[i].initialPrice) &&  (parseFloat(orderBook.asks[oVB][0]) >= my_above20MA) && (!ws_json[i].orderPricePlaced)   ){ //&& (conditionsToExit==1)
			// >
			//1.__
				console.log('ORDER TO SHORT BUY @ a loss WILL BE INITIATED: 04');	
				
				

				var invPR=0
									if (ws_json[i].flipped!='true'){
										invPR = perRet*(-1);
									}
									else if (ws_json[i].flipped=='true'){
										
										invPR = perRet;
									}
									
									console.log('invPR:'+invPR);
									//if (invPR<0){
									if (invPR<-1){ // room for error
										// var fJ = fs.readFileSync('flipped.json','utf8');
										// var flippedJSON = JSON.parse(fJ);
										
										if ((ws_json[i].flipped!='true') && (flippedJSON.s_flipA==1)) {
											flippedJSON.s_flipA = flippedJSON.s_flipA*(-1);
											
											var fs_p = require('fs').promises;
											try {
												await fs_p.writeFile('flipped.json', JSON.stringify(flippedJSON));
											} catch (error){
												console.error(error);
											}
											
										}
										
										if ((ws_json[i].flipped=='true') && (flippedJSON.s_flipA==-1)) {
											flippedJSON.s_flipA = flippedJSON.s_flipA*(-1);
											
											var fs_p = require('fs').promises;
											try {
												await fs_p.writeFile('flipped.json', JSON.stringify(flippedJSON));
											} catch (error){
												console.error(error);
											}
											
										}
										
										
										
										
										
									}
									
									

									if (ws_json[i].flipped=='no'){
										if ((ws_user!='_test_') && (ws_user!='_testACC_')) {
											const coinQty = borrowedQuantity;//ws_json[i].baseBalance;
											var coinQtyFloored = Math.floor(coinQty * powVar) / powVar;
											console.log('M_LIMIT_BUY exit______________________________________________________________--------');
												//queryBook.push(['M_LIMIT_BUY', promList[y][0], [ws_json[i].symB, coinQtyFloored, priceLevelFloored, orderBook.asks[oVB][0], ws_json[i].initialPrice, ws_json[i].discountPercent, ws_json[i].model, ws_json[i].chart, 'JUST_LIMIT' ], M_responseJsonOpenOrders ]);
												queryBook.push(['M_MARKET_BUY', promList[y][0], [ws_json[i].symB, coinQtyFloored, orderBook.bids[0][0], ws_json[i].initialPrice, ws_json[i].discountPercent, ws_json[i].model, ws_json[i].chart, ], M_responseJsonOpenOrders ]);
											ws_json[i].orderPricePlaced = parseFloat(priceLevelFloored);
											ws_json[i].exitPricePlaced = parseFloat(priceLevelFloored); //NEW@!!!
											firebase.database().ref('/Ins/'+ws_user+'_S').set({
												ws_key: JSON.parse( JSON.stringify(ws_json) ),
											})  //--  this needs to happen in a different place now...
										
										}
										else if (ws_user!='_test_'){
											var invPR = perRet*(-1);
											
											recordTestAccount.push({
												date: now.format('YYYY-MM-DD HH:mm:ss'),
												orderType: 'BUY (short)',
												symbol: ws_json[i].symB,
												system: 'Short Buy Loss',
												_return: invPR,
												priceSold: priceSold_,
												priceBought: parseFloat(ws_json[i].initialPrice),
												dateBought: ws_json[i].date,
												_numTrades: ws_json[i]._numTrades,
												_numProfits: ws_json[i]._numProfits,
												_expectedProfitPerc: ws_json[i]._expectedProfitPerc,
												_biggestLoss: ws_json[i]._biggestLoss,
												_netPerRet: ws_json[i]._netPerRet,
											})
											update_recordTestAccount=1;
											
												
												
											delete ws_json[i];
											ws_jsonFilter = ws_json.filter(function(x){return x !== null}); // commented this... 
											
											firebase.database().ref('/Ins/_testACC__S').set({
												ws_key: JSON.parse( JSON.stringify(ws_jsonFilter) ),
											}) 
										}
									}
									else if (ws_json[i].flipped=='true'){
										if ((ws_user!='_test_') && (ws_user!='_testACC_')) {
									
											console.log('LIMIT_SELL exit______________________________________________________________--------');
											//queryBook.push(['LIMIT_SELL', promList[y][0], [ws_json[i].symB, coinQtyFloored, priceLevelFloored, orderBook.bids[oVB][0], ws_json[i].discountPercent, ws_json[i].model, ws_json[i].chart, 'JUST_LIMIT' ], responseJsonOpenOrders ]);
											queryBook.push(['MARKET_SELL', promList[y][0], [ws_json[i].symB, coinQtyFloored, orderBook.bids[0][0],  ws_json[i].discountPercent, ws_json[i].model, ws_json[i].chart,], responseJsonOpenOrders ]);
											
											ws_json[i].orderPricePlaced = parseFloat(priceLevelFloored);
											ws_json[i].exitPricePlaced = parseFloat(priceLevelFloored); //NEW@!!!
											firebase.database().ref('/Ins/'+ws_user+'_S').set({
												ws_key: JSON.parse( JSON.stringify(ws_json) ),
											})  //--  this needs to happen in a different place now...
										}
										else if (ws_user!='_test_'){
											
											recordTestAccount.push({
												date: now.format('YYYY-MM-DD HH:mm:ss'),
												orderType: 'SELL',
												symbol: ws_json[i].symB,
												system: 'Long Sell Loss',
												_return: perRet,
												priceSold: priceSold_,
												priceBought: parseFloat(ws_json[i].initialPrice),
												dateBought: ws_json[i].date,
												_numTrades: ws_json[i]._numTrades,
												_numProfits: ws_json[i]._numProfits,
												_expectedProfitPerc: ws_json[i]._expectedProfitPerc,
												_biggestLoss: ws_json[i]._biggestLoss,
												_netPerRet: ws_json[i]._netPerRet,
											})
											update_recordTestAccount=1;
											
											
												
												delete ws_json[i];
												ws_jsonFilter = ws_json.filter(function(x){return x !== null}); //commented this... 
											
												firebase.database().ref('/Ins/_testACC__S').set({
													ws_key: JSON.parse( JSON.stringify(ws_jsonFilter) ),
												}) 
												
													
										}
									}
				
				
				
				
				
								
								
								
								
							
								
								
							
									
								
			}
			}
		
		
		
		//console.log('confirm conditionsToCheckProfitMet_SHORT:'+conditionsToCheckProfitMet_SHORT)
			//.... +2% short start
			//if ((ws_json[i]) && ((runTwoPercentProfitChecks==1) || (perRet<-2) )  ) { //(perRet<-4)
			/* if ((ws_json[i]) && (perRet<-2) && (conditionsToCheckProfitMet_SHORT==1)  ) {
				
				console.log('IT RAN the 2% profit rule for short positions....');
				
				if ((ws_json[i].initialPrice) &&  (perRet<-2) && (!ws_json[i].orderPricePlaced)   ){//should be > (SHORT) //&& (parseFloat(ws_json[i].discountPercent)<2)
			// >
				console.log('ORDER TO SHORT BUY @ +2% profit WILL BE INITIATED...');	
				
									
									
									
									
				
				//.... coinPerformance below
					if ((ws_user=='_test_') || (ws_user=='_testACC_')) { //oJhPznC7LyXGnbnFYLxiTUBbudF3
						update_recordCoinPerformance=1;
						var hasC=0;
						for (h=0; h<recordCoinPerformance.length; h++){
							if (ws_json[i].symB==recordCoinPerformance[h].symbol){
								hasC=1;
								var addToShort_P = parseFloat(recordCoinPerformance[h].short_P)+1;
								recordCoinPerformance[h].short_P = addToShort_P;
							}
						}
						if (hasC==0){
							recordCoinPerformance.push({'symbol':ws_json[i].symB, 'long_P':0, 'long_L':0, 'short_P':1, 'short_L':0, });
						}
						
						var invPR = perRet*(-1);
						update_tallyCoinPerformance_S = 1;
						if (!tallyCoinPerformance_S[ws_json[i].symB]){
							tallyCoinPerformance_S[ws_json[i].symB] = [];
						}
						tallyCoinPerformance_S[ws_json[i].symB].push({'date':now.format('YYYY-MM-DD HH:mm:ss'), 'type':'SHORT_P', 'perRet':invPR.toFixed(2), 'user': ws_user, });
						console.log('ADDED AN ENTRY TO tallyCoinPerformance_S (short) json');
						// console.log('tallyCoinPerformance_S below');
						// console.log(tallyCoinPerformance_S); 
						
					}
				//.... coinPerformance above
				
								
								
								
								
							
								if ((ws_user!='_test_') && (ws_user!='_testACC_')) {
									
									
									
									
									const coinQty = borrowedQuantity;//ws_json[i].baseBalance;
									var coinQtyFloored = Math.floor(coinQty * powVar) / powVar;
									
									//if (parseFloat(ws_json[i].discountPercent)<2){
										//queryBook.push(['M_LIMIT_BUY', promList[y][0], [ws_json[i].symB, coinQty, orderBook.asks[oV][0], orderBook.asks[oVB][0], ws_json[i].initialPrice, ws_json[i].discountPercent, ws_json[i].model, ws_json[i].chart, 'JUST_LIMIT' ], M_responseJsonOpenOrders ]);
										  queryBook.push(['M_LIMIT_BUY', promList[y][0], [ws_json[i].symB, coinQtyFloored, priceLevelFloored, orderBook.asks[oVB][0], ws_json[i].initialPrice, ws_json[i].discountPercent, ws_json[i].model, ws_json[i].chart, 'JUST_LIMIT' ], M_responseJsonOpenOrders ]);
									//}
						
								
									ws_json[i].orderPricePlaced = parseFloat(priceLevelFloored);
									ws_json[i].exitPricePlaced = parseFloat(priceLevelFloored); //NEW@!!!
									firebase.database().ref('/Ins/'+ws_user+'_S').set({
										ws_key: JSON.parse( JSON.stringify(ws_json) ),
									})  //--  this needs to happen in a different place now...
								
								}
								else if (ws_user!='_test_'){
									
									var invPR = perRet*(-1);
									
									recordTestAccount.push({
										date: now.format('YYYY-MM-DD HH:mm:ss'),
										orderType: 'BUY',
										symbol: ws_json[i].symB,
										system: 'Short Buy +2% profit',
										_return: invPR,
										priceSold: priceSold_,
										priceBought: parseFloat(ws_json[i].initialPrice),
										dateBought: ws_json[i].date
									})
									update_recordTestAccount=1;
									
										
										
									delete ws_json[i];
									ws_jsonFilter = ws_json.filter(function(x){return x !== null}); // commented this... 
									
									
									firebase.database().ref('/Ins/_testACC__S').set({
										ws_key: JSON.parse( JSON.stringify(ws_jsonFilter) ),
									}) 
								}
								else {
									
									var invPR = perRet*(-1);
									
									recordSimAccount.push({
										date: now.format('YYYY-MM-DD HH:mm:ss'),
										orderType: 'BUY (short)',
										symbol: ws_json[i].symB,
										system: 'Short Buy +2% profit',
										_return: invPR,
										priceSold: priceSold_,
										priceBought: parseFloat(ws_json[i].initialPrice),
										dateBought: ws_json[i].date
									})
									update_recordSimAccount=1;
									
											 
										
									delete ws_json[i];
									ws_jsonFilter = ws_json.filter(function(x){return x !== null}); // commented this... 
									
									
									firebase.database().ref('/Ins/_test__S').set({
										ws_key: JSON.parse( JSON.stringify(ws_jsonFilter) ),
									}) 
									//break; // --  
									
									//promList.splice(y, 1);//experimenting...
									//y--;
									
							
									
								}
								
								
									
								
			}
			} */
			
			//...+2% short end
		
		
		} // end of if (ws_json[i])
			
			
									
									
			
									
			
		}
	
			
			
			
		//--------------------------------------------------------------------------------------------------------------------------						
								
			
			
			console.log('_______________________________________________________________________')
			
			
				///////////////////////////////////////////////////////////////////////////////////////
				///////////////////////////////////////////////////////////////////////////////////////
				console.log('SHORT e!!!! !!!!!');
				console.log('!!!! !!!!!');
			}
			}//end if if ws_....
		
		}// end of 		if (foundSymB==1)
			
			
			
			
	}
			
			
			
			
			
			
			
		}//end bracket for 'sell'
		//._______________________________________.________________________.___________________________.//
		//._______________________________________.________________________.___________________________.//
		//._______________________________________.________________________.___________________________.//
		
		
		
		
		
		
		
		
		
		
		
		//beginniing of buy part...
	if (promList[y][1]=='BUY'){
			console.log('_______________________________________________________________________')
			console.log('NEXT ACCOUNT :: ::'+promList[y][0]);
			
			//console.log(accOrders);
			
			var ws_json_B = promList[y][2];
			var orderBook_B = promList[y][5];
			var i = promList[y][3];
			
			var highestNumberOfDecimals=0;
			var price_highestNumberOfDecimals=0;
			for (t=0; t<orderBook_B.bids.length; t++){
				// --- qty ---
				if (parseFloat(orderBook_B.bids[t][1]).toString().split(".")[1]){
					var numOfDecimals = parseFloat(orderBook_B.bids[t][1]).toString().split(".")[1].length;
					//console.log('t:'+t+' '+orderBook_B.bids[t][1]+' NumDec:'+numOfDecimals);
					if (numOfDecimals>highestNumberOfDecimals){
						highestNumberOfDecimals = numOfDecimals;
						//console.log('qty... REPLACED Highest Decimal...');
					}
				}
				
				// --- price ---
				if (parseFloat(orderBook_B.bids[t][0]).toString().split(".")[1]){
					var numOfDecimals = parseFloat(orderBook_B.bids[t][0]).toString().split(".")[1].length;
					//console.log('t:'+t+' '+orderBook_B.bids[t][0]+' NumDec:'+numOfDecimals);
					if (numOfDecimals>price_highestNumberOfDecimals){
						price_highestNumberOfDecimals = numOfDecimals;
						//console.log('price... REPLACED Highest Decimal...');
					}
				}
				
			}
			
			for (t=0; t<orderBook_B.asks.length; t++){
				// --- qty ---
				if (parseFloat(orderBook_B.asks[t][1]).toString().split(".")[1]){
					var numOfDecimals = parseFloat(orderBook_B.asks[t][1]).toString().split(".")[1].length;
					//console.log('t:'+t+' '+orderBook_B.asks[t][1]+' NumDec:'+numOfDecimals);
					if (numOfDecimals>highestNumberOfDecimals){
						highestNumberOfDecimals = numOfDecimals;
						//console.log('REPLACED Highest Decimal...');
					}
				}
				
				// --- price ---
				if (parseFloat(orderBook_B.asks[t][0]).toString().split(".")[1]){
					var numOfDecimals = parseFloat(orderBook_B.asks[t][0]).toString().split(".")[1].length;
					//console.log('t:'+t+' '+orderBook_B.asks[t][0]+' NumDec:'+numOfDecimals);
					if (numOfDecimals>price_highestNumberOfDecimals){
						price_highestNumberOfDecimals = numOfDecimals;
						//console.log('price... REPLACED Highest Decimal...');
					}
				}
				
			}
			//console.log('......');
			//console.log('BUY: highestNumberOfDecimals:'+highestNumberOfDecimals);
			var powVar = Math.pow(10, highestNumberOfDecimals);
			var price_powVar = Math.pow(10, price_highestNumberOfDecimals);
			
			var priceLevel = (parseFloat(orderBook_B.asks[0][0])+parseFloat(orderBook_B.bids[0][0]))/2;
			var priceLevelFloored = Math.floor(priceLevel * price_powVar) /price_powVar;
			var priceLevelCeil = Math.ceil(priceLevel * price_powVar) /price_powVar;
			
			//console.log('qty: highestNumberOfDecimals:'+highestNumberOfDecimals);
		//	console.log('price_highestNumberOfDecimals:'+price_highestNumberOfDecimals);
			//console.log('priceLevelCeil:'+priceLevelCeil);
			
		if (ws_json_B[i]){
				console.log('BUY: Dealing with JSON: '+ws_json_B[i].symB);
			
				baseSymB = ws_json_B[i].symB.substring(0, ws_json_B[i].symB.length - 4);
				baseSym = ws_json_B[i].symB.substring(0, ws_json_B[i].symB.length - 3);
				
				
							
				//console.log('baseSym:'+baseSym+' & baseSymB:'+baseSymB);
							
				const discountedPrice_ = parseFloat(ws_json_B[i].initialPrice)* (1-((parseFloat(ws_json_B[i].discountPercent))*0.01));
				const discountedPrice = parseFloat(discountedPrice_).toFixed(8);
				
				const premiumPrice_ = parseFloat(ws_json_B[i].initialPrice)* (1+((parseFloat(ws_json_B[i].discountPercent))*0.01));
				const premiumPrice = parseFloat(premiumPrice_).toFixed(8);
							
				var oV_B = 0;
				var oVB_B = oV_B+1;
				
				var changePremium = 1.003;
				
				console.log('ws_json_B[i].initialPrice:'+ws_json_B[i].initialPrice+' & parseFloat(orderBook_B.asks[oV_B][0]:'+parseFloat(orderBook_B.asks[oV_B][0])+' & parseFloat(discountedPrice):'+parseFloat(discountedPrice)+' & ws_json_B[i].orderPricePlaced_B:'+ws_json_B[i].orderPricePlaced_B);
				console.log('OPP:'+ws_json_B[i].orderPricePlaced_B+' & changePremium:'+changePremium);
							
							
					
					//=---=----=-------=---=-=---------=----=----=---=---=-=------=-----=-
						var M_accInfo = [];
						for (t=0; t<M_accBal.length; t++){
							if (M_accBal[t][0]==ws_user){
								M_accInfo = M_accBal[t][3];
							}
						}
						
									//look for response open sell orders for this specific asset
							var marginSellOrdersOfAsset=1;
							console.log('M_responseJsonOpenOrders');
							console.log(M_responseJsonOpenOrders);
							for (qr=0; qr<M_responseJsonOpenOrders.length; qr++){
								if ((M_responseJsonOpenOrders[qr].symbol==ws_json_B[i].symB) && (M_responseJsonOpenOrders[qr].side=='SELL')) {
									marginSellOrdersOfAsset=0;
								}
							} 	
						
					if (typeof M_accInfo.userAssets !== 'undefined'){
						for (p=0; p<M_accInfo.userAssets.length; p++){
							
							
							
								/* //&& open orders ==0
								if  (((M_accInfo.userAssets[p].asset == baseSym) || (M_accInfo.userAssets[p].asset == baseSymB) )  )  {
									console.log('***&&&***&&&***&&&&***')
									console.log('B... M_accInfo.userAssets[p].asset....; '+M_accInfo.userAssets[p].asset+' ????? ????? BORROWED:'+M_accInfo.userAssets[p].borrowed+' &  free:'+M_accInfo.userAssets[p].free+'& M_responseJsonOpenOrders.length:'+M_responseJsonOpenOrders.length);
									console.log('***&&&***&&&***&&&&***')
								}  */
								
								//cheating slightly... for XRP, it borrowed 135 coins and left 136 free. therefore borrow*1.01>free ?? MAYBE DO THIS...
								//if ( ((M_accInfo.userAssets[p].asset == baseSym) || (M_accInfo.userAssets[p].asset == baseSymB)  ) && (parseFloat(M_accInfo.userAssets[p].borrowed) > parseFloat(M_accInfo.userAssets[p].free) ) && ( ( (parseFloat(M_accInfo.userAssets[p].borrowed)) * (parseFloat(ws_json_B[i].initialPrice)) ) >1) && (ws_json_B[i].type=='SHORT_SELL') &&  (marginSellOrdersOfAsset==1) ) { //==  //(M_responseJsonOpenOrders.length==0)
								
								var corrrectForBal=0;
								if (ws_json_B[i]){
									if (((ws_json_B[i].type=='SHORT_SELL') && (ws_json_B[i].flipped=='no')) || ((ws_json_B[i].type!='SHORT_SELL') && (ws_json_B[i].flipped=='true'))) {
										corrrectForBal=1;
									}
									else {
										corrrectForBal=0;
									}
								}
								
								
								if ( ((M_accInfo.userAssets[p].asset == baseSym) || (M_accInfo.userAssets[p].asset == baseSymB)  ) && (parseFloat(M_accInfo.userAssets[p].borrowed) > parseFloat(M_accInfo.userAssets[p].free) ) && ( ( (parseFloat(M_accInfo.userAssets[p].borrowed)) * (parseFloat(ws_json_B[i].initialPrice)) ) >10) && (corrrectForBal==1) &&  (marginSellOrdersOfAsset==1) ) { //==  //(M_responseJsonOpenOrders.length==0)
								
										console.log('M_accInfo.userAssets[p].asset....; '+M_accInfo.userAssets[p].asset+' ????? ?????');
										
										/* //if (ws_user == '_test_'){
											if (ws_user == 'oJhPznC7LyXGnbnFYLxiTUBbudF3'){
												if (ws_json_B[i].symB.substr(-4) == 'USDT' ){
													var moment = require('moment');
													var now = moment();
													T.post('statuses/update', { status: '[BOT - delete] Opened short position: $'+baseSymB+' / $USDT at '+orderBook_B.bids[oV_B][0]+'. \n'+now.format('YYYY-MM-DD HH:mm')+' \n[Not financial advice]' }, function(err, data, response) {
														console.log(data)
													})
												}
											} */
										
									//movetosellside
									var baseBalanceParseFloat = parseFloat(M_accInfo.userAssets[p].borrowed) + parseFloat(M_accInfo.userAssets[p].interest) - parseFloat(M_accInfo.userAssets[p].free); // /price?
									queryBook.push(['M_ADD_TO_SELL_SIDE', promList[y][0],  ws_json_B[i].symB, baseBalanceParseFloat, ws_json_B[i].chart, ws_json_B[i].model, ws_json_B[i].chart_c, ws_json_B[i].rsi, ws_json_B[i].flipped, ]);
									console.log('M_ADD_TO_SELL_SIDE::::::::________________');
									
											
									
									
									//ws_json_B.splice(i,1);
									//	i--;
									delete ws_json_B[i];
									ws_json_B = ws_json_B.filter(function(x){return x !== null});
									//ws_json_B = ws_json_B.filter(function (el) { return el != null; });
									//var ws_json_B = ws_json_B.filter(value => Object.keys(value).length !== 0);
										firebase.database().ref('/Ins/'+ws_user+'_B').set({
											ws_key_B: JSON.parse( JSON.stringify(ws_json_B) ),
										})
									//	break;
										
								}
								
							if (ws_json_B[i]){
								
								/* if (){
									console.log('ANYTHING HERE?'+'baseSymB:'+baseSymB)
								} */
								
								/* if ( ((M_accInfo.userAssets[p].asset == baseSym) || (M_accInfo.userAssets[p].asset == baseSymB)  )){
									console.log('Looking for something below this...');
									console.log('borrow:'+M_accInfo.userAssets[p].borrowed+' & free:'+M_accInfo.userAssets[p].free);
									console.log('marginSellOrdersOfAsset:'+marginSellOrdersOfAsset)
								} */
								
								var corrrectForBal=0;
								if (((ws_json_B[i].type=='SHORT_SELL') && (ws_json_B[i].flipped=='no')) || ((ws_json_B[i].type!='SHORT_SELL') && (ws_json_B[i].flipped=='true'))) {
									corrrectForBal=1;
									//console.log('corrrectForBal...:'+corrrectForBal);
								}
								/* else {
										//corrrectForBal=0;
									} */
								
								if ( ((M_accInfo.userAssets[p].asset == baseSym) || (M_accInfo.userAssets[p].asset == baseSymB)  ) && (parseFloat(M_accInfo.userAssets[p].borrowed) == parseFloat(M_accInfo.userAssets[p].free) ) && (parseFloat(M_accInfo.userAssets[p].free)==0) && (corrrectForBal==1) && (marginSellOrdersOfAsset==1) ) { //prob: make borrowed percentage wise instead of 0.
									//just check duration hrs
								//console.log('ANYTHING HERE BBB?')	
									//dont need to worry about open orders because if there were open orders then the balances would not be equal to each other...
									
									//console.log('borrowed:: '+parseFloat(M_accInfo.userAssets[p].borrowed) + ' && interest:: '+ parseFloat(M_accInfo.userAssets[p].interest)+ ' & asks...'+ parseFloat(orderBook_B.asks[oV][0]))
									
									
									if (ws_json_B[i].date){
										var dateDur = moment(ws_json_B[i].date);
										var duration = moment.duration(now.diff(dateDur));
										var durationHrs = duration.asHours();
										console.log('SHORT_SELL durationHrs for '+M_accInfo.userAssets[p].asset+' is '+durationHrs);
										if (durationHrs>0.4){
											
											//var amountToTransfer = (parseFloat((queryBook[i][2]*1.03)*(0.1/0.4))).toFixed(2);
											///(parseFloat((queryBook[i][2]*1.03)*(0.1/0.2))).toFixed(2);
											//var amountToMainAccount = ws_json_B[i].baseBalance;     ///((parseFloat(M_accInfo.userAssets[p].borrowed) + parseFloat(M_accInfo.userAssets[p].interest))*(0.1/0.4) * parseFloat(orderBook_B.asks[oV][0]) ).toFixed(4);
									
											var amountToMainAccount = (parseFloat((ws_json_B[i].baseBalance*1.00)*(0.1/0.2))).toFixed(2);
											//queryBook.push(['TRANSFER_TO_MAIN', promList[y][0], [ws_json_B[i].symB, ws_json_B[i].baseBalance, ] ]);// used to be this... */
											console.log('TRANSFER_TO_MAIN amountToMainAccount:'+amountToMainAccount)
											queryBook.push(['TRANSFER_TO_MAIN', promList[y][0], [ws_json_B[i].symB, amountToMainAccount, ] ]);// used to be this... */
											
											console.log('HEEEY IT STOPPED SOMETHING HERE 2 !!!');
											//ws_json_B.splice(i,1);
											//i--;
											delete ws_json_B[i];
											ws_json_B = ws_json_B.filter(function(x){return x !== null});
											//ws_json_B = ws_json_B.filter(value => Object.keys(value).length !== 0);
											//ws_json_B = ws_json_B.filter(function (el) { return el != null; });
											//var ws_json_B = ws_json_B.filter(value => Object.keys(value).length !== 0);
											firebase.database().ref('/Ins/'+ws_user+'_B').set({
												ws_key_B: JSON.parse( JSON.stringify(ws_json_B) ),
											})
										}
									}
									
									
									
								}
								else if ( ((M_accInfo.userAssets[p].asset == baseSym) || (M_accInfo.userAssets[p].asset == baseSymB)  ) && (parseFloat(M_accInfo.userAssets[p].borrowed) == parseFloat(M_accInfo.userAssets[p].free) )  && (corrrectForBal==1) && (marginSellOrdersOfAsset==1) ){
									console.log('it definitely fits the profile...')
									
									if (ws_json_B[i].date){
										var dateDur = moment(ws_json_B[i].date);
										var duration = moment.duration(now.diff(dateDur));
										var durationHrs = duration.asHours();
										console.log('SHORT_SELL durationHrs for '+M_accInfo.userAssets[p].asset+' is '+durationHrs);
										if (durationHrs>0.4){
											
											//..first pay back borrowed...
											var repaidAmount = parseFloat(M_accInfo.userAssets[p].free);//free
											var amountToMainAccount = ((parseFloat(M_accInfo.userAssets[p].borrowed) + parseFloat(M_accInfo.userAssets[p].interest))*(0.1/0.4)*parseFloat(orderBook_B.asks[oV_B][0])).toFixed(4); //for now leave this as is...
											//var amountToMainAccount = (parseFloat((ws_json_B[i].baseBalance*1.00)*(0.1/0.2))).toFixed(2);
											//var amountToMainAccount = ((parseFloat(M_accInfo.userAssets[p].borrowed) + parseFloat(M_accInfo.userAssets[p].interest))*(0.1/0.2)*parseFloat(orderBook.asks[oV][0])).toFixed(4); //I MADE IT THIS NOW 04/01/2021
											console.log('REPAY_AND_TRANSFER_TO_MAIN '+'repaidAmount:'+repaidAmount+' & amountToMainAccount:'+amountToMainAccount)
											queryBook.push(['REPAY_AND_TRANSFER_TO_MAIN', promList[y][0], [ws_json_B[i].symB, repaidAmount, amountToMainAccount, ] ]); // AMOUNT TO MAIN ACCOUNT DOES NOT EVEN MATTER BECAUSE IT JUST REPAYS
													
											//payBNBInt =1; commenitng it out here since the interest won't be significant
											//queryBook.push(['PAY_BNB_INTEREST', promList[y][0] ]);//NEW NO OTHER PLACE BELOW
											
											
											var amountToMainAccount = (parseFloat((ws_json_B[i].baseBalance*1.00)*(0.1/0.2))).toFixed(2);
											console.log('TRANSFER_TO_MAIN amountToMainAccount:'+amountToMainAccount)
											 queryBook.push(['TRANSFER_TO_MAIN', promList[y][0], [ws_json_B[i].symB, amountToMainAccount, ] ]);// used to be this...
											console.log('HEEEY IT STOPPED SOMETHING HERE 2B !!!');
											delete ws_json_B[i];
											ws_json_B = ws_json_B.filter(function(x){return x !== null});
											firebase.database().ref('/Ins/'+ws_user+'_B').set({
												ws_key_B: JSON.parse( JSON.stringify(ws_json_B) ),
											}) 
										}
										
									}
								}
								
								/* if ( (M_accInfo.userAssets[p].asset == 'BNB')   && (payBNBInt==1) ) {
									//if ( (M_accInfo.userAssets[p].asset == 'BNB')    ) {
										var amountToTransfer = (parseFloat(M_accInfo.userAssets[p].interest)+parseFloat(M_accInfo.userAssets[p].borrowed)-parseFloat(M_accInfo.userAssets[p].free))*1.01; //adding 1% extra 
											//var amountToTransfer = (parseFloat(M_accInfo.userAssets[p].interest)+parseFloat(M_accInfo.userAssets[p].borrowed)-parseFloat(M_accInfo.userAssets[p].free))*1.01; //adding 1% extra 
											
											console.log('amountToTransfer (TRANSFER_AND_PAY_BNB_INT:_______ '+amountToTransfer);
									queryBook.push(['TRANSFER_AND_PAY_BNB_INT', promList[y][0], ['BNB', amountToTransfer, M_accInfo.userAssets[p].interest, ] ]);
								} */
								
							}
								
							
						}
					}
						
					//console.log(' NEW TWITTER FUNCTION TO BE BELOW THIS ............. ... ................. ... .......... ... .... ... .')
					if (ws_json_B[i]){
						
						
						
											
						
						
						
						/// ----------------------------------
						
						
						
							var accInfo = [];
						for (t=0; t<accBal.length; t++){
							if (accBal[t][0]==ws_user){
								accInfo = accBal[t][3];
							}
						}
						
						
						if ((accInfo)) {
							if (accInfo.balances){
								for (p=0; p<accInfo.balances.length; p++){
								
									if (ws_json_B[i]){
										var corrrectForBal=0;
										if (((ws_json_B[i].type!='SHORT_SELL') && (ws_json_B[i].flipped=='no')) || ((ws_json_B[i].type=='SHORT_SELL') && (ws_json_B[i].flipped=='true'))) {
											corrrectForBal=1;
										}								
											
										if (((accInfo.balances[p].asset == baseSym) || (accInfo.balances[p].asset == baseSymB) ) && (corrrectForBal==1)) {
											//const flipAns = ((parseFloat(ws_json_B[i].baseBalance)/parseFloat(ws_json_B[i].initialPrice))*(0.9));
											const flipAns = ((parseFloat(ws_json_B[i].baseBalance)/parseFloat(ws_json_B[i].initialPrice))*(1));
											console.log('flipAns below:\|/');
											console.log(flipAns);
											console.log('accInfo.balances[p].asset:-->'+accInfo.balances[p].asset+' accInfo.balances[p].free:-->'+accInfo.balances[p].free);
											var fAPerc = (parseFloat(accInfo.balances[p].free)/parseFloat(flipAns))*100;
											console.log('flipansPercentage:'+fAPerc)
										
											//if (accInfo.balances[p].free >=  flipAns){//here is still a problem... it logs the higher buying price...
											if (fAPerc >=  30){	
												
										
												var __ws_json=[];
												//var __ws_ws_json=[];
												 snapshot = await firebase.database().ref('/Ins/'+ws_user+'_S').once('value').catch((error)=>console.log(error));
												//__ws_json = snapshot.val().ws_key;
												__ws_json = (snapshot.val() && snapshot.val().ws_key) || [];
												//__ws_ws_json = snapshot.val().ws_ws_key;
												//__ws_ws_json = (snapshot.val() && snapshot.val().ws_ws_key) || [];
												
												__ws_json = __ws_json.filter(function(x){return x !== null});
												//console.log('__ws_json below:');
												//console.log(__ws_json);
												//console.log('__ws_ws_json below:');
												//console.log(__ws_ws_json);
												
												var addToAsyncB = 1;
												for (u=0; u<__ws_json.length; u++){
													//if (__ws_json[u].symB == ws_json_B[i].symB){
													if ( (__ws_json[u].symB == ws_json_B[i].symB) && (__ws_json[u].type != 'SHORT_BUY') ) {
														addToAsyncB = 0;
													}
												}
												if (addToAsyncB==1){
													
													var baseBalanceParseFloat = parseFloat(accInfo.balances[p].free);
													
													//... add here...
													
													//if open buy order still exists then market buy maybe... (or cancel order)...
													
													/* //if (ws_user == '_test_'){
													if (ws_user == 'oJhPznC7LyXGnbnFYLxiTUBbudF3'){
														if (ws_json_B[i].symB.substr(-4) == 'USDT' ){
															var moment = require('moment');
															var now = moment();
															T.post('statuses/update', { status: '[BOT - delete] Opened long position: $'+baseSymB+' / $USDT at '+orderBook_B.asks[oV_B][0]+'. \n'+now.format('YYYY-MM-DD HH:mm')+' \n[Not financial advice]' }, function(err, data, response) {
																console.log(data)
															})
														}
													} */
													
													queryBook.push(['ADD_TO_SELL_SIDE', promList[y][0],  ws_json_B[i].symB, baseBalanceParseFloat, ws_json_B[i].chart, ws_json_B[i].model, ws_json_B[i].chart_c, ws_json_B[i].rsi, ws_json_B[i].flipped,   ]);
													
													
													
												//	
												//	var _responseJsonB = await client2.myTrades({ symbol: (ws_json_B[i].symB).toUpperCase(), useServerTime:true,  }).catch((error)=>console.log(error));
												//var _responseJsonB = 
												//	var r=0;
												//	while(r<_responseJsonB.length){
												//		if (_responseJsonB[r].isBuyer == true){
												//			_outputB_price = _responseJsonB[r].price;
												//		}
												//		r++;
												//	}
												//	var baseBalanceParseFloat = parseFloat(accInfo.balances[p].free);
												//	if (_outputB_price){
												//		__ws_json.push({'symB':ws_json_B[i].symB.toUpperCase(), 'monitorButtonColor':'rgba(82, 208, 23, 1)', 'monitorButtonColorB':'#8E0E0A', 'monitorButtonText':'Stop Monitoring', 'initialPrice':_outputB_price, 'discountPercent':'2', 'premiumPercent':'2.9', 'baseBalance':baseBalanceParseFloat, 'chart':ws_json_B[i].chart, date:now.format('YYYY-MM-DD HH:mm:ss'),      });
												//		firebase.database().ref('/Ins/'+ws_user+'_S').set({
												//			ws_key: JSON.parse( JSON.stringify(__ws_json) ),
												//		})	
												//	}
												}
												
											//	console.log('-----1-----');
												
												//ws_json_B.splice(i,1);
												//i--;
												delete ws_json_B[i];
												ws_json_B = ws_json_B.filter(function(x){return x !== null});
												//ws_json_B = ws_json_B.filter(value => Object.keys(value).length !== 0);
												//ws_json_B = ws_json_B.filter(function (el) { return el != null; });
												//var ws_json_B = ws_json_B.filter(value => Object.keys(value).length !== 0);
												firebase.database().ref('/Ins/'+ws_user+'_B').set({
													ws_key_B: JSON.parse( JSON.stringify(ws_json_B) ),
												})
											}
											
											//------ something else....
											if (typeof ws_json_B[i] !=='undefined'){
											//if (accInfo.balances[p].free  <1){
												if (fAPerc <  3){	
												console.log('--------------- the BALANCE for '+accInfo.balances[p].asset+' is less than one')
												//stopCoin=1;
												if (ws_json_B[i].date){
													var dateDur = moment(ws_json_B[i].date);
													var duration = moment.duration(now.diff(dateDur));
													var durationHrs = duration.asHours();
													console.log('BUY durationHrs for '+accInfo.balances[p].asset+' is '+durationHrs);
													if (durationHrs>0.4){
														//if (durationHrs>0.000006){
														//i think check for open orders...
															var responseJsonOpenOrders = [];
															for (r=0; r<accOrders.length; r++){
																if (accOrders[r][0] == ws_user){
																	responseJsonOpenOrders = accOrders[r][3];
																	//console.log('OPEN ORDERS FOR '+accOrders[r][0]+' below:');
																}
															}
													//	console.log('???responseJsonOpenOrders:');
													//	console.log(responseJsonOpenOrders);
														
														var buyOpenOrders = 0;
														for (y_=0; y_<responseJsonOpenOrders.length; y_++){
															if ((responseJsonOpenOrders[y_].side=='BUY') && (ws_json_B[i].symB==responseJsonOpenOrders[y_].symbol) ){
																buyOpenOrders=1;
															}
															console.log(responseJsonOpenOrders[y_].side+' --?> ws_json_B[i].symB:'+ws_json_B[i].symB+' & order symbol'+responseJsonOpenOrders[y_].symbol );
														}
														
														console.log('buyOpenOrders:'+buyOpenOrders)
									
														console.log(buyOpenOrders);
														if (buyOpenOrders==0){
															console.log('HEEEY IT STOPPED SOMETHING HERE 1 !!!');
															
															//ws_json_B.splice(i,1);
															//i--;
															delete ws_json_B[i];
															ws_json_B = ws_json_B.filter(function(x){return x !== null});
															//ws_json_B = ws_json_B.filter(value => Object.keys(value).length !== 0);
															//var ws_json_B = ws_json_B.filter(value => Object.keys(value).length !== 0);
															//ws_json_B = ws_json_B.filter(function (el) { return el != null; });
															
															firebase.database().ref('/Ins/'+ws_user+'_B').set({
																ws_key_B: JSON.parse( JSON.stringify(ws_json_B) ),
															})
														}
														
														
														//////
														
													}
												}
											}
											else {
												console.log('SOMEHOW IT IS NOT LESS THAN ONE///');
												//stopCoin=0;
											}
											}
												
											
										}
									}//end of if (ws_json_B[i])
								
								}
							}//end of if (accInfo.Balances)
						}// end of if (accInfo)
							
						
					}

						
							//*-------------------------------------------------------------------------------------
							
							//_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
						if (ws_json_B[i]){
							/* console.log('_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_')
							var candlesForCoin = [];
							for (yB=0; yB<promList.length; yB++){
								//if (promList[yB][1]=='BUY_KLINES'){
									//var b = promList[yB];
									//console.log(b);
									//console.log(b.symB);
								//}
								if ((promList[yB][1]=='BUY_KLINES') && (promList[yB][2].symB == ws_json_B[i].symB) ){
									console.log('IT ACTUALLY FOUND KLINES FOR '+promList[yB][2].symB);
								//	//console.log(promList[yB]);
									//console.log(promList);
									candlesForCoin = promList[yB][5];
								}
							} */
							
							
									
					///===========================================================================				
									//map data...
					
						 
						
							
							
						
			
			
						if (ws_json_B[i].type!='SHORT_SELL'){
								//normal
								console.log(orderBook_B);
								console.log('discountedPrice:'+discountedPrice+' ws_json_B[i].initialPrice:'+ws_json_B[i].initialPrice+' & oV_B-->:'+oV_B);
		
								console.log(' OB:::'+orderBook_B.asks[oV_B][0]);
								//console.log('RSI:'+RSITwo+' & MACD:'+macd);
							//********************************
							
							/* if ( (  ( (macd> (-4.5)*Math.pow(10, -8) ) && (ws_json_B[i].symB.substr(-3) == 'BTC') ) || ((ws_json_B[i].symB.substr(-4) == 'USDT') && (macd> (-6.5)*Math.pow(10, -5) ) ) )  && (RSITwo>0)) {
											console.log('...MACD is good...');
							}
							else {
								console.log('...MACD needs to be higher...');
							} */
							
							//if (tPSAR<orderBook_B.asks[oV_B][0]){
							//	console.log('--== PSAR is good ==--');
							//	console.log('tPSAR:'+tPSAR+' & ask:'+orderBook_B.asks[oV_B][0]);
							//}
							//else {
								//console.log('--== PSAR is above ==--');
							//}
							
							//_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
							
						//queryBook.push(['CANCEL_BUY', promList[y][0], [ws_json_B[i].symB, parseFloat(orderBook_B.asks[2][0]) ]  , responseJsonOpenOrders ]);
							
							if (  (parseFloat(ws_json_B[i].orderPricePlaced_B)) &&  (parseFloat(ws_json_B[i].orderPricePlaced_B) <= parseFloat(orderBook_B.bids[2][0]) )  ){
								//1...
								
								if (ws_json_B[i].flipped=='no'){
									console.log('Going to cancel order now...');
									queryBook.push(['CANCEL_BUY', promList[y][0], [ws_json_B[i].symB, parseFloat(orderBook_B.asks[2][0]) ]  , responseJsonOpenOrders ]);
									ws_json_B[i].orderPricePlaced_B = null;
									ws_json_B[i].orderPricePlacedMSG = 'CANCELLED_01';
									firebase.database().ref('/Ins/'+ws_user+'_B').set({
										ws_key_B: JSON.parse( JSON.stringify(ws_json_B) ),
									})
								}
								else if (ws_json_B[i].flipped=='true'){
									console.log('Going to cancel order now...');
									queryBook.push(['CANCEL_LIMIT_SELL_M', promList[y][0], [ws_json_B[i].symB, parseFloat(orderBook_B.bids[2][0]) ]  , M_responseJsonOpenOrders ]);
									ws_json_B[i].orderPricePlaced_B = null;
									ws_json_B[i].orderPricePlacedMSG = 'CANCELLED_01';
									firebase.database().ref('/Ins/'+ws_user+'_B').set({
										ws_key_B: JSON.parse( JSON.stringify(ws_json_B) ),
									})
								}
								
								
							}
							else if  ( (ws_json_B[i].orderPricePlaced_B > ( parseFloat(orderBook_B.asks[oV_B][0]) )*changePremium )  && (ws_json_B[i].orderPricePlaced_B)   ){
								//2...
								
								if (ws_json_B[i].flipped=='no'){
									const coinQty = ws_json_B[i].baseBalance/parseFloat(orderBook_B.asks[oV_B][0]);
									var coinQtyFloored = Math.floor(coinQty * powVar) / powVar;
									console.log('buy: it wanted to come here 3');
									console.log('orderPricePlaced_B: '+ ws_json_B[i].orderPricePlaced_B +' > ask0: '+parseFloat(orderBook_B.asks[oV_B][0]) );
									ws_json_B[i].orderPricePlaced_B = parseFloat(orderBook_B.asks[oV_B][0]);
									firebase.database().ref('/Ins/'+ws_user+'_B').set({
										ws_key_B: JSON.parse( JSON.stringify(ws_json_B) ),
									})
									//queryBook.push(['LIMIT_BUY', promList[y][0], [ ws_json_B[i].symB, coinQtyFloored, orderBook_B.asks[oV_B][0], orderBook_B.asks[oVB_B][0], ws_json_B[i].initialPrice, ws_json_B[i].discountPercent], responseJsonOpenOrders   ]);
								}
								else if (ws_json_B[i].flipped=='true'){
									const coinQty = ws_json_B[i].baseBalance/parseFloat(orderBook_B.bids[oV_B][0]);///probably neeed to change this...
									var coinQtyFloored = Math.floor(coinQty * powVar) / powVar;
									console.log('buy: it wanted to come here 4');
									console.log('orderPricePlaced_B: '+ ws_json_B[i].orderPricePlaced_B +' > bid0: '+parseFloat(orderBook_B.bids[oV_B][0]) );
									ws_json_B[i].orderPricePlaced_B = parseFloat(orderBook_B.bids[oV_B][0]);
									firebase.database().ref('/Ins/'+ws_user+'_B').set({
										ws_key_B: JSON.parse( JSON.stringify(ws_json_B) ),
									})
									//queryBook.push(['LIMIT_SELL_M', promList[y][0], [ ws_json_B[i].symB, coinQtyFloored, orderBook_B.bids[oV_B][0], orderBook_B.bids[oVB_B][0], ws_json_B[i].initialPrice, ws_json_B[i].discountPercent], M_responseJsonOpenOrders   ]);									
								}
								
									
							}
							else if ((ws_json_B[i].initialPrice) &&  (parseFloat(priceLevelFloored) <= ws_json_B[i].initialPrice) && (!ws_json_B[i].orderPricePlaced_B)  ){//should be <
								//3...
								
								if (ws_json_B[i].flipped=='no'){
									console.log('buy now because current price: '+priceLevelFloored + ' & initialPrice: '+ws_json_B[i].initialPrice);
									const coinQty = ws_json_B[i].baseBalance/parseFloat(priceLevelFloored);
									var coinQtyFloored = Math.floor(coinQty * powVar) / powVar;
									ws_json_B[i].orderPricePlaced_B = parseFloat(priceLevelFloored);
									firebase.database().ref('/Ins/'+ws_user+'_B').set({
										ws_key_B: JSON.parse( JSON.stringify(ws_json_B) ),
									})
									//queryBook.push(['LIMIT_BUY', promList[y][0], [ ws_json_B[i].symB, coinQtyFloored, priceLevelFloored, orderBook_B.asks[oVB_B][0], ws_json_B[i].initialPrice, ws_json_B[i].discountPercent], responseJsonOpenOrders   ]);
									queryBook.push(['MARKET_BUY', promList[y][0], [ ws_json_B[i].symB, coinQtyFloored, priceLevelFloored, orderBook_B.asks[oVB_B][0], ws_json_B[i].initialPrice, ws_json_B[i].discountPercent], responseJsonOpenOrders   ]);
								}
								else if (ws_json_B[i].flipped=='true'){
									console.log('buy now because current price: '+priceLevelCeil + ' & initialPrice : '+ws_json_B[i].initialPrice);
									const coinQty = ws_json_B[i].baseBalance/parseFloat(priceLevelCeil);
									var coinQtyFloored = Math.floor(coinQty * powVar) / powVar;
									ws_json_B[i].orderPricePlaced_B = parseFloat(priceLevelCeil);
									if (!ws_json_B[i].alreadyBorrowed){
										ws_json_B[i].alreadyBorrowed = 'YES';
										queryBook.push(['BORROW_LIMIT_SELL', promList[y][0], [ ws_json_B[i].symB, coinQtyFloored, priceLevelCeil, orderBook_B.bids[oVB_B][0], ws_json_B[i].initialPrice, ws_json_B[i].discountPercent], M_responseJsonOpenOrders   ]);
									}
									else {
										queryBook.push(['MARKET_SELL_M', promList[y][0], [ ws_json_B[i].symB, coinQtyFloored, priceLevelCeil, orderBook_B.bids[oVB_B][0], ws_json_B[i].initialPrice, ws_json_B[i].discountPercent], M_responseJsonOpenOrders   ]);
									}
									firebase.database().ref('/Ins/'+ws_user+'_B').set({
										ws_key_B: JSON.parse( JSON.stringify(ws_json_B) ),
									})
								}
								
								
									
								
								
									
							}
								//normal end
						}
						else {
								console.log('***********')
								console.log('SHORT SELL TO LATER BUY')
								
								
								console.log(orderBook_B);
								console.log('premiumPrice:'+premiumPrice+' ws_json_B[i].initialPrice:'+ws_json_B[i].initialPrice+' & oV_B-->:'+oV_B);
		
								console.log(' OB:::'+orderBook_B.asks[oV_B][0]);
						
							
							if (  (parseFloat(ws_json_B[i].orderPricePlaced_B)) &&  (parseFloat(ws_json_B[i].orderPricePlaced_B) >= parseFloat(orderBook_B.asks[2][0]) )  ){
								//1...
								
								if (ws_json_B[i].flipped=='no'){
									//cancel
									console.log('Going to cancel order now...');
									queryBook.push(['CANCEL_LIMIT_SELL_M', promList[y][0], [ws_json_B[i].symB, parseFloat(orderBook_B.bids[2][0]) ]  , M_responseJsonOpenOrders ]);
									ws_json_B[i].orderPricePlaced_B = null;
									ws_json_B[i].orderPricePlacedMSG = 'CANCELLED_01';
									firebase.database().ref('/Ins/'+ws_user+'_B').set({
										ws_key_B: JSON.parse( JSON.stringify(ws_json_B) ),
									})
								}
								else if (ws_json_B[i].flipped=='true'){
									console.log('Going to cancel order now...');
									queryBook.push(['CANCEL_BUY', promList[y][0], [ws_json_B[i].symB, parseFloat(orderBook_B.asks[2][0]) ]  , responseJsonOpenOrders ]);
									ws_json_B[i].orderPricePlaced_B = null;
									ws_json_B[i].orderPricePlacedMSG = 'CANCELLED_01';
									firebase.database().ref('/Ins/'+ws_user+'_B').set({
										ws_key_B: JSON.parse( JSON.stringify(ws_json_B) ),
									})
								}
								
								
							}
							else if  ( (ws_json_B[i].orderPricePlaced_B < ( parseFloat(orderBook_B.bids[oV_B][0]) )*changePremium )  && (ws_json_B[i].orderPricePlaced_B)   ){
								//2...
								
								if (ws_json_B[i].flipped=='no'){
									const coinQty = ws_json_B[i].baseBalance/parseFloat(orderBook_B.bids[oV_B][0]);///probably neeed to change this...
									var coinQtyFloored = Math.floor(coinQty * powVar) / powVar;
									console.log('buy: it wanted to come here 1');
									console.log('orderPricePlaced_B: '+ ws_json_B[i].orderPricePlaced_B +' > bid0: '+parseFloat(orderBook_B.bids[oV_B][0]) );
									ws_json_B[i].orderPricePlaced_B = parseFloat(orderBook_B.bids[oV_B][0]);
									firebase.database().ref('/Ins/'+ws_user+'_B').set({
										ws_key_B: JSON.parse( JSON.stringify(ws_json_B) ),
									})
									//queryBook.push(['LIMIT_SELL_M', promList[y][0], [ ws_json_B[i].symB, coinQtyFloored, orderBook_B.bids[oV_B][0], orderBook_B.bids[oVB_B][0], ws_json_B[i].initialPrice, ws_json_B[i].discountPercent], M_responseJsonOpenOrders   ]);									
								}
								else if (ws_json_B[i].flipped=='true'){
									const coinQty = ws_json_B[i].baseBalance/parseFloat(orderBook_B.asks[oV_B][0]);
									var coinQtyFloored = Math.floor(coinQty * powVar) / powVar;
									console.log('buy: it wanted to come here 2');
									console.log('orderPricePlaced_B: '+ ws_json_B[i].orderPricePlaced_B +' > ask0: '+parseFloat(orderBook_B.asks[oV_B][0]) );
									ws_json_B[i].orderPricePlaced_B = parseFloat(orderBook_B.asks[oV_B][0]);
									firebase.database().ref('/Ins/'+ws_user+'_B').set({
										ws_key_B: JSON.parse( JSON.stringify(ws_json_B) ),
									})
									//queryBook.push(['LIMIT_BUY', promList[y][0], [ ws_json_B[i].symB, coinQtyFloored, orderBook_B.asks[oV_B][0], orderBook_B.asks[oVB_B][0], ws_json_B[i].initialPrice, ws_json_B[i].discountPercent], responseJsonOpenOrders   ]);
								}
								
									
										
							}
							else if ((ws_json_B[i].initialPrice) &&  (parseFloat(priceLevelCeil) >= ws_json_B[i].initialPrice ) && (!ws_json_B[i].orderPricePlaced_B)  ){//should be >
								//3...
								
								if (ws_json_B[i].flipped=='no'){
									console.log('buy now because current price: '+priceLevelCeil + ' & initialPrice : '+ws_json_B[i].initialPrice);
									const coinQty = ws_json_B[i].baseBalance/parseFloat(priceLevelCeil);
									var coinQtyFloored = Math.floor(coinQty * powVar) / powVar;
									ws_json_B[i].orderPricePlaced_B = parseFloat(priceLevelCeil);
									if (!ws_json_B[i].alreadyBorrowed){
										ws_json_B[i].alreadyBorrowed = 'YES';
										queryBook.push(['BORROW_LIMIT_SELL', promList[y][0], [ ws_json_B[i].symB, coinQtyFloored, priceLevelCeil, orderBook_B.bids[oVB_B][0], ws_json_B[i].initialPrice, ws_json_B[i].discountPercent], M_responseJsonOpenOrders   ]);
									}
									else {
										queryBook.push(['MARKET_SELL_M', promList[y][0], [ ws_json_B[i].symB, coinQtyFloored, priceLevelCeil, orderBook_B.bids[oVB_B][0], ws_json_B[i].initialPrice, ws_json_B[i].discountPercent], M_responseJsonOpenOrders   ]);
									}
									firebase.database().ref('/Ins/'+ws_user+'_B').set({
										ws_key_B: JSON.parse( JSON.stringify(ws_json_B) ),
									})
								}
								else if (ws_json_B[i].flipped=='true'){
									console.log('buy now because current price: '+priceLevelFloored + ' & initialPrice: '+ws_json_B[i].initialPrice);
									const coinQty = ws_json_B[i].baseBalance/parseFloat(priceLevelFloored);
									var coinQtyFloored = Math.floor(coinQty * powVar) / powVar;
									ws_json_B[i].orderPricePlaced_B = parseFloat(priceLevelFloored);
									firebase.database().ref('/Ins/'+ws_user+'_B').set({
										ws_key_B: JSON.parse( JSON.stringify(ws_json_B) ),
									})
									queryBook.push(['MARKET_BUY', promList[y][0], [ ws_json_B[i].symB, coinQtyFloored, priceLevelFloored, orderBook_B.asks[oVB_B][0], ws_json_B[i].initialPrice, ws_json_B[i].discountPercent], responseJsonOpenOrders   ]);
								}
								
									
										
						
							}
								
								
								console.log('e SHORT SELL TO LATER BUY')
								console.log('**************')
						}
								
							
							
							
							console.log('-------------------------------------------------------------------------------')
							
						}
							
			}
			
			
							
		}
		//end of buy part...
		
		
		
	}
	
	console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
	console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
	
	
	
	///get test here...
	//setTimeout(() => controllerA.abort(), 20000);
	console.log('XXX listOfArguments:'+listOfArguments.length);
if (listOfArguments.length!=0){
		snapTest = await firebase.database().ref('/Ins/_test__S/').once('value').catch((error)=>console.log(error));
	var ws_TEST = (snapTest.val() && snapTest.val().ws_key) || [];
	ws_TEST = ws_TEST.filter(function(x){return x !== null});
	
	//======put it here avg...
							var longModelNum=0;
							var longModelNumGeo=1;
							var longModelCount=0;
							var numberOfHighReturns = 0;
							
							var shortModelNum=0;
							var shortModelNumGeo=1;
							var shortModelCount=0;
							var numberOfHighReturns_S = 0;
							
							var wordsCount='';
							var wordsCountB='';
							
									//console.log('ws_TEST details below:'+ws_TEST.length);
									//console.log(ws_json);
								for (n=0; n<ws_TEST.length; n++){
									if (typeof ws_TEST[n] !== 'undefined'){
										if ( (ws_TEST[n].type!='SHORT_BUY') ){
											if (typeof ws_TEST[n].tradingData !== "undefined"){
												var currentBid=parseFloat(ws_TEST[n].tradingData[ws_TEST[n].tradingData.length-1].bidPrice);
												var initPriceOpen = parseFloat(ws_TEST[n].initialPrice);
												var returnTrade = (((currentBid/initPriceOpen)-1)*100).toFixed(2);
												//console.log(ws_TEST[n].symB+' '+returnTrade);
												longModelNum += parseFloat(returnTrade);
												longModelNumGeo *= parseFloat(returnTrade);
												longModelCount++;
												//wordsCount += ws_TEST[n].symB+' '+returnTrade+'% '+' cBid:'+currentBid+' iP:'+initPriceOpen;
												wordsCount += ws_TEST[n].symB+' '+returnTrade+'% ';
												if (parseFloat(returnTrade)>1.5){
													numberOfHighReturns++;
												}
											}
										}
									
										if ( (ws_TEST[n].type=='SHORT_BUY') ){
											if (typeof ws_TEST[n].tradingData !== "undefined"){
												var currentAsk=parseFloat(ws_TEST[n].tradingData[ws_TEST[n].tradingData.length-1].askPrice);
												var initPriceOpen = parseFloat(ws_TEST[n].initialPrice);
												var returnTrade = (((currentAsk/initPriceOpen)-1)*100).toFixed(2);
												//console.log(ws_TEST[n].symB+' '+returnTrade);
												shortModelNum += parseFloat(returnTrade);
												shortModelNumGeo *= parseFloat(returnTrade);
												shortModelCount++;
												wordsCountB += ws_TEST[n].symB+' '+returnTrade+'% ';
												
												if (returnTrade<-1.5){
													numberOfHighReturns_S++;
												}
												
											}
										}
									}
									
									
									
								}
								
								
									
										var avgReturn = (longModelNum/longModelCount).toFixed(2);
										//var geoMeanReturn = Math.pow(longModelNumGeo, 1/longModelCount);
										//console.log('Long Positions:'+wordsCount)
										//console.log('Num LONG Positions:'+longModelCount+' & avgReturn:'+avgReturn);
										if ((longModelCount>2) && (avgReturn>2) && (snapshot_W.val().usdt_activateSimulation=='1') && (numberOfHighReturns>=2) ){
											//if ((longModelCount>2) && (avgReturn>-2) && (snapshot_W.val().usdt_activateSimulation=='1') ){///temp
											//console.log('Enabling Accounts for trading...');
											//firebase.update
											/* firebase.database().ref('/general/').update({
												usdt_activateSimulation:'0',
												usdt_simulationBusy: '0',
												
												short_usdt_activateSimulation:'1',
												short_usdt_simulationBusy: '0',
												
											}) */
											
											
											/* firebase.database().ref('AboveAverage/' +ws_user+'/'+now).set({
													date: now.format('YYYY-MM-DD HH:mm:ss'),
													_longModelCount:longModelCount,
													_avgReturn:avgReturn,
													_wordsCount:wordsCount,
												}) */
											
											//snapActSim = snapshot_W.val().usdt_activateSimulation;
										}
										
										/* if ( (longModelCount<1) && (snapshot_W.val().usdt_activateSimulation=='0') ){
											firebase.database().ref('/general/').update({
												usdt_activateSimulation:'1',
												usdt_simulationBusy: '0',
											})
										} */
										
									
		//	console.log('________________________________________________________________________');		
		//	console.log('________________________________________________________________________');		
									
										var avgReturnShort = (shortModelNum/shortModelCount).toFixed(2);
										//var geoMeanReturn = Math.pow(shortModelNumGeo, 1/shortModelCount);
									//	console.log('Num SHORT Positions:'+shortModelCount+' & avgReturnShort:'+avgReturnShort);
									//	console.log('Short Positions:'+wordsCountB)
										if ((shortModelCount>=2) && (avgReturnShort<-2) && (snapshot_W.val().short_usdt_activateSimulation=='1') && (numberOfHighReturns_S>=2) ){
											//console.log('Enabling Short Accounts for trading...');
											
											/* firebase.database().ref('/general/').update({
												usdt_activateSimulation:'1',
												usdt_simulationBusy: '0',
											}) */
											
											/* firebase.database().ref('/general/').update({
												usdt_activateSimulation:'1',
												usdt_simulationBusy: '0',
												
												short_usdt_activateSimulation:'0',
												short_usdt_simulationBusy: '0',
												
											})
											 */
											
											/* firebase.database().ref('AboveAverage/' +ws_user+'/'+now).set({
													date: now.format('YYYY-MM-DD HH:mm:ss'),
													_longModelCount:longModelCount,
													_avgReturn:avgReturn,
													_wordsCount:wordsCount,
												}) */
											
										}
										
										/* if ( (shortModelCount<1) && (snapshot_W.val().short_usdt_activateSimulation=='0') ){
											firebase.database().ref('/general/').update({
												short_usdt_activateSimulation:'1',
												short_usdt_simulationBusy: '0',
											})
										} */
										
									
								
								/* if (  (snapshot_W.val().short_usdt_activateSimulation=='0') && (snapshot_W.val().usdt_activateSimulation=='0') ){
									firebase.database().ref('/general/').update({
										usdt_activateSimulation:'1',
										usdt_simulationBusy: '0',
										short_usdt_activateSimulation:'1',
										short_usdt_simulationBusy: '0',
									})
									
									snapshot_W = await firebase.database().ref('/general/').once('value').catch((error)=>console.log(error));
								}
								 */
								
	
	//console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
	//console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');						
	
	
	
	
	
	//console.log('ACC BAL BELOW:::');
	//console.log(accBal);
	
	//console.log(':::::::::::::::::::::::::::::')
	//console.log('M_accBal BELOW:');
	//console.log(M_accBal);




	
	for (f=0; f<accBal.length; f++){
	//	console.log('-------------------------')
	//	console.log(accBal[f][4][5].length);
		//var sellingArray = accBal[f][4][5][0] // 0 or length
		var sellingArray = accBal[f][4][5][accBal[f][4][5].length-1];
		
		var finalDurationHours = 0; // the hours on the sell side...
		if (typeof sellingArray !=='undefined'){
			if (sellingArray.date){
				var dateForDuration = sellingArray.date;
				//console.log('dateForDuration ++++++')
				//console.log(dateForDuration);
				var timeInvested = moment(dateForDuration); 
				var duration = moment.duration(now.diff(timeInvested));
				var durationHrs = duration.asHours();
					finalDurationHours = durationHrs;
			}
			
			
		}
		else {
			//console.log('YEAH NOTHINGS GONNA HAPPENNOW>')
		}
		
		
		//var timeInvested = moment(dateForDuration); 
		//				var duration = moment.duration(now.diff(timeInvested));
		//				var durationHrs = duration.asHours();
		////console.log(sellingArray);
		
		//newSnapData[e].sort(function(a, b){return b.dateNum - a.dateNum});
		
		var balBase = 0;
		if (accBal[f][4][0] == 'USDT'){
			balBase = accBal[f][4][2];
		}
		else if (accBal[f][4][0] == 'BTC'){
			balBase = accBal[f][4][1];
		}
		
		baseMatch = accBal[f][4][0];
		
var snapActSim;
var snapSimBusy;
var s_snapActSim;
var s_snapSimBusy;
//var short_long;
				
				//var date_durationHrs=10;
				
				if (snapshot_W.val()){
					//snapActSim = snapshot_W.val().activateSimulation;
					//snapSimBusy = snapshot_W.val().simulationBusy;
					if (baseMatch == 'BTC'){
						snapActSim = (snapshot_W.val().btc_activateSimulation) || '';
						snapSimBusy = (snapshot_W.val().btc_simulationBusy) || '';
						
						
						
						
						if (!snapActSim){
							/* firebase.database().ref('/general/').update({
								btc_activateSimulation:'1',
							}) */
						}
						
						if ((!snapSimBusy) || (ws_ws_json_Sim.length<5) ){
							/* firebase.database().ref('/general/').update({
								btc_simulationBusy: '0',
							}) */
						}
						
						//console.log('BTC if');
					}
					else if (baseMatch == 'USDT'){
						//console.log('USDT if');
						snapActSim = snapshot_W.val().usdt_activateSimulation;
						snapSimBusy = snapshot_W.val().usdt_simulationBusy;
						s_snapActSim = snapshot_W.val().short_usdt_activateSimulation;
						s_snapSimBusy = snapshot_W.val().short_usdt_simulationBusy;
						
						//short_long = snapshot_W.val().short_long;
						//if (!short_long){
						//	firebase.database().ref('/general/').update({
						//		short_long:'long',
						//	})
						//}
						
						
						if (!snapActSim){
							/* firebase.database().ref('/general/').update({
								usdt_activateSimulation:'1',
							}) */
						}
						
						var totalLongs = 0;
						var totalShorts = 0;
						//var totalTrades=0;
						for (m_ = 0; m_<ws_ws_json_Sim.length; m_++){
							if ( (ws_ws_json_Sim[m_].type != 'SHORT_BUY') ){
								totalLongs++;
							}
							else if ( (ws_ws_json_Sim[m_].type == 'SHORT_BUY') ){
								totalShorts++;
							}
							//totalTrades++;
						}
						//console.log('totalLongs:'+totalLongs+' && totalShorts:'+totalShorts)
						
						/* if ((!snapSimBusy) || (totalLongs<2) ){ //usdt_simulationBusy: '1', if I want it to temporarily stop buying something... 
							firebase.database().ref('/general/').update({
								usdt_simulationBusy: '0',
							})
						}
						
						if (totalLongs>=2){
							firebase.database().ref('/general/').update({
								usdt_simulationBusy: '1',
							})
						} */
						
						
						
						//short_snapActSim = snapshot_W.val().short_usdt_activateSimulation;
						//short_snapSimBusy = snapshot_W.val().short_usdt_simulationBusy;
						if (!s_snapActSim){
							/* firebase.database().ref('/general/').update({
								short_usdt_activateSimulation:'1',
							}) */
						}
						
						/* if ((!s_snapSimBusy) || (totalShorts<2) ){
							firebase.database().ref('/general/').update({
								short_usdt_simulationBusy: '0',
							})
						}
						
						if (totalShorts>=2){
							firebase.database().ref('/general/').update({
								short_usdt_simulationBusy: '1',
							})
						} */
						
						if (ws_ws_json_Sim.length<2){
							firebase.database().ref('/general/').update({
								usdt_simulationBusy: '0',
								short_usdt_simulationBusy: '0',
							})
						}
						
						if (ws_ws_json_Sim.length>=2){
							firebase.database().ref('/general/').update({
								usdt_simulationBusy: '1',
								short_usdt_simulationBusy: '1',
							})
						}
						
						
						
					}
					
					//console.log('ANYTHING???');
					
					//simulationBusy
					
					//snapValDate = snapshot_W.val().dateDelay;
					//double_snapVal = parseFloat(snapshot_P.val().btcQty)*2;
				//	var moment = require('moment');
				//	var nowB = moment();
				//	var dateDur = moment(snapValDate);
				//	var duration_Date = moment.duration(nowB.diff(dateDur));
				//	date_durationHrs = duration_Date.asHours();
				}
				else {
					firebase.database().ref('/general/').update({
						btc_activateSimulation:'1',
						btc_simulationBusy: '0',
						usdt_activateSimulation:'1',
						usdt_simulationBusy: '0',
						
						short_btc_activateSimulation:'1',
						short_btc_simulationBusy: '0',
						short_usdt_activateSimulation:'1',
						short_usdt_simulationBusy: '0',
					})
					
					///console.log('12 ANYTHING???');
				}
		
		
		
		var investQty = parseFloat(accBal[f][4][3]);
		
		var firstQty = balBase - investQty;
		
		console.log('ACC BAL LOOP'+balBase+' & invst qty '+investQty+' firstQty: '+firstQty);
		
		var accInfo = accBal[f][3];
		var balancesFree = 0;
		if (accInfo){
			if (accInfo.balances){
				for (w=0; w<accInfo.balances.length; w++){
					//console.log('ASSET: '+accInfo.balances[w].asset);
					if ( accInfo.balances[w].asset == accBal[f][4][0] ){
						//console.log('balance of USDT '+accInfo.balances[w].free);
						balancesFree = parseFloat(accInfo.balances[w].free);
					}
				}
			}
		}
		
		console.log(' balancesFree :  : '+balancesFree)
		
		//if (  (accBal[f][3][)     ){
		//	
		//}
		
		var addCoinWs = 1;
		//var addCoinWs = 0;//should be 1;
		var ws_json_B_ = accBal[f][4][4];
		var ws_json_S_ = accBal[f][4][5];
		ws_json_B_ = ws_json_B_.filter(function(x){return x !== null});
		ws_json_S_ = ws_json_S_.filter(function(x){return x !== null});
		
		/* for (k=0; k<ws_json_B_.length; k++){
			if ((ws_json_B_[k].date) && (ws_json_B_[k].monitorButtonText == 'Stop Monitoring') && (ws_json_B_[k].type!='SHORT_BUY') ){
				var dateDur = moment(ws_json_B_[k].date);
				var duration = moment.duration(now.diff(dateDur));
				var durationHrs = duration.asHours();						
				if (durationHrs<=0.6){
					addCoinWs=0;
				}
			}
		} */
		
		for (k=0; k<ws_json_B_.length; k++){
			if ((ws_json_B_[k].date) && (ws_json_B_[k].monitorButtonText == 'Stop Monitoring') ){
				var dateDur = moment(ws_json_B_[k].date);
				var duration = moment.duration(now.diff(dateDur));
				var durationHrs = duration.asHours();						
				if (durationHrs<=0.6){
					addCoinWs=0;
				}
			}
		}
		
		// temporary measure... for shorting... because it struggles to calculate balance...
		 if (ws_json_S_.length >=2){
			console.log('X*X*X*X*X*X*X* TOO MANY INVESTMENTS>>>>>')
			addCoinWs=0;
		} 
		
		/* for (k=0; k<ws_json_S_.length; k++){
			if ((ws_json_S_[k].date) && (ws_json_S_[k].monitorButtonText == 'Stop Monitoring') && (ws_json_S_[k].type=='SHORT_SELL') ){
				var dateDur = moment(ws_json_S_[k].date);
				var duration = moment.duration(now.diff(dateDur));
				var durationHrs = duration.asHours();						
				if (durationHrs<=0.6){
					addCoinWs=0;
				}
			}
		} */
		
		
		//M_ADD_TO_SELL_SIDE   //...||  (queryBook[p_][0]=='SHORT_COIN')
		for (p_=0; p_<queryBook.length; p_++){
			if ( (  (queryBook[p_][0]=='ADD_TO_SELL_SIDE')  ||  (queryBook[p_][0]=='M_ADD_TO_SELL_SIDE')  ) && (queryBook[p_][1]==accBal[f][0]) ){
				addCoinWs=0;
				console.log('A request to add the coin already exists, so not adding it again.')
			}
		}
		
		if (typeof accBal[f][4][6] ==='undefined' ){
			firebase.database().ref('/users/'+accBal[f][0]).update({
				toggleSwitch: 1,
			})
		}
		
		//if ((accBal[f][4][6] ==0 ) || ((snapSimBusy==1) && (snapActSim==1) ) ) { // snapsimbusy
		//	console.log('NOT SEARCHING FOR ACCOUNT:'+accBal[f][0]);
		//	addCoinWs =0;
		//}
		
		
		
		console.log(' : : addCoinWs: : '+addCoinWs +' & snapSimBusy:'+snapSimBusy+' & finalDurationHours:'+finalDurationHours);
		
		//if (((snapSimBusy!='1') || ((snapSimBusy=='1') && (snapActSim=='0') ) )  && (accBal[f][4][6] !=0 ) && (addCoinWs==1)   ){
			//console.log('______________________________')
			//console.log('______________________________')
		//	console.log('THIS PART IS GOOD...')
		//}
		//else {
		//	console.log('Not going to add more')
			//console.log('NAH HERES THE PROBLEM...')
			/* console.log(accBal[f][4]); */
		//}
		
	//	console.log('balancesFree>firstQty');
	//	console.log(balancesFree+' > '+firstQty)
	//	console.log('.')
		
	//	console.log('balBase>investQty');
	//	console.log(balBase+' > '+investQty);
		
	//	console.log('.')
	//	console.log('balancesFree>investQty::')
	//	console.log(balancesFree+' > '+investQty);
		
		
		//if (   ((snapSimBusy!='1') || ((snapSimBusy=='1') && (snapActSim=='0') ) ) && (accBal[f][4][6] !=0 ) && (addCoinWs==1) &&  (  (balancesFree>firstQty) && (balBase>investQty)      ||  ( (investQty) && (balancesFree>investQty) && ((finalDurationHours>6)||(finalDurationHours==0))     )     ) ){   // ||  ( (investQty) && (balancesFree>investQty) && (finalDurationHours>6)     )
			//console.log('Is Balance high enough?')
		/* if (   ((snapSimBusy!='1') || ((snapSimBusy=='1') && (snapActSim=='0') ) ) && (accBal[f][4][6] !=0 ) && (addCoinWs==1) &&  (  ((balancesFree>firstQty) && (balBase>investQty) )      ||  ( (investQty) && (balancesFree>investQty)       )     )  ){   //       //if (   ((snapSimBusy!='1') || ((snapSimBusy=='1') && (snapActSim=='0') ) ) && (accBal[f][4][6] !=0 ) && (addCoinWs==1) &&  (  ((balancesFree>firstQty) && (balBase>investQty) && (finalDurationHours==0))      ||  ( (investQty) && (balancesFree>investQty)    && ((finalDurationHours>6))   )     )  )
			console.log('Balance high enough for another investment...');
			queryBook.push(['ADD_COIN', accBal[f][0], investQty, accBal[f][4][0], accBal[f][4][4], accBal[f][4][5],  accBal[f][4][7], accBal[f][4][8], accBal[f][4][9]  ]); //accBal[f][3]  //it IS CORRECT!!!! THINK
		}
		else if (   ((s_snapSimBusy!='1') || ((s_snapSimBusy=='1') && (s_snapActSim=='0') ) ) && (accBal[f][4][9] !=0 ) && (addCoinWs==1) &&  (  ((balancesFree>firstQty) && (balBase>investQty)  )    ||  ( (investQty) && (balancesFree>investQty)       )     )   ) { //&& ((finalDurationHours>6))  //
			console.log('SHORT -- Balance high enough for another investment...');
			queryBook.push(['SHORT_COIN', accBal[f][0], investQty, accBal[f][4][0], accBal[f][4][4], accBal[f][4][5], accBal[f][3]  ]); //accBal[f][3]
		} */
		
		
		 ///original one that you must uncomment
		if ((ws_json_S_.length <2) && (addCoinWs==1)  ){ //&& (accBal[f][0] == 'oJhPznC7LyXGnbnFYLxiTUBbudF3')
			console.log('Balance high enough for another investment...');
			
			var addCoinFinal=1;
			for (p_=0; p_<queryBook.length; p_++){
				if ( (queryBook[p_][0]=='ADD_COIN')    && (queryBook[p_][1]==accBal[f][0]) ){
					addCoinFinal=0;
					console.log('A request to add the coin already exists, so not adding it again.')
				}
			}
			
			if (addCoinFinal==1){
				queryBook.push(['ADD_COIN', accBal[f][0], investQty, accBal[f][4][0], accBal[f][4][4], accBal[f][4][5],  accBal[f][4][7], accBal[f][4][8], accBal[f][4][9], ws_json_S_.length  ]); //accBal[f][3]  //it IS CORRECT!!!! THINK
			}
			
			
			if (accBal[f][4][9]=='1') {
				
				var shortCoinFinal=1;
				for (p_=0; p_<queryBook.length; p_++){
					if ( (queryBook[p_][0]=='SHORT_COIN') && (queryBook[p_][1]==accBal[f][0]) ){
						shortCoinFinal=0;
						console.log('A request to add the coin already exists, so not adding it again.')
					}
				}
				
				if (shortCoinFinal==1){
					queryBook.push(['SHORT_COIN', accBal[f][0], investQty, accBal[f][4][0], accBal[f][4][4], accBal[f][4][5],  accBal[f][4][7], accBal[f][4][8], accBal[f][4][9], ws_json_S_.length  ]); //accBal[f][3]  //it IS CORRECT!!!! THINK
				}
				
			}
			
		} 
		/* ///New one for testing purposes...
		if ((ws_ws_json_AT.length <2) && (addCoinWs==1) && (accBal[f][0] == 'oJhPznC7LyXGnbnFYLxiTUBbudF3')  ){  
			console.log('Balance high enough for another investment...');
			queryBook.push(['ADD_COIN', accBal[f][0], investQty, accBal[f][4][0], accBal[f][4][4], accBal[f][4][5],  accBal[f][4][7], accBal[f][4][8], accBal[f][4][9], ws_ws_json_AT.length  ]); //accBal[f][3]  //it IS CORRECT!!!! THINK
		} */
		
		//console.log('queryBook below');
		//console.log(queryBook);
		 
		
		//console.log(accBal[f][4][1]);
	}
		
		///
		
} //end of promList.length >0
	
	
	
	
	/* var snapshotBM = await firebase.database().ref('/ordersB/').once('value');
	var tradeDataBM = snapshotBM.val() || [] ;
			
			console.log(' tradeDataBM :::::')
			console.log(tradeDataBM);
			
		firebase.database().ref('/ordersC/').update(tradeDataBM)	; */
		
		
	/* var snapshotBM = await firebase.database().ref('/trades/').once('value');
	var tradeDataBM = snapshotBM.val() || [] ;
			
			console.log(' tradeDataBM :::::')
			console.log(tradeDataBM);
			
		firebase.database().ref('/tradesB/').update(tradeDataBM)	; 	 */
	
	
	//foor loop that groups the shit together and updates the stuff..
	console.log('XXXXXXXXXX')
	console.log('queryBook below:');
	console.log(queryBook);
	
	//fs.writeFile('1queryBook.json', JSON.stringify(queryBook), 'utf8', function (err) {
	//	if (err) {
	//		console.log("An error occured while writing JSON Object to File.");
	//		return console.log(err);
	//	}	
	//	//console.log("FINAL JSON file has been saved.");
	//});
	
	//var testArr = [];
	//testArr.push({YO:[{'symB':'APPL',  'monitorButtonText':'Stop Monitoring', 'initialPrice':12345, }],});
	//testArr.push({YO:[{'symB':'BBBL',  'monitorButtonText':'Stop Monitoring', 'initialPrice':543, }],});
	//console.log('TEST ARR:: BELOW:');
	//console.log(testArr);
	//console.log('GETTING YO DATA... --> ');
	//console.log(testArr.YO]);
	
	///---------
	/* let data = [];
	data.push({"Key":"A", "Data":{'symB':'APPL',  'monitorButtonText':'Stop Monitoring', 'initialPrice':12345, }  });
	data.push({"Key":"B", "Data":{'symB':'BB',  'monitorButtonText':'Stop Monitoring', 'initialPrice':12345, }  });
	data.push({"Key":"C", "Data":{'symB':'C1',  'monitorButtonText':'Stop Monitoring', 'initialPrice':12345, }  });
	data.push({"Key":"A", "Data":{'symB':'D2',  'monitorButtonText':'Stop Monitoring', 'initialPrice':12345, }  });
	data.push({"Key":"C", "Data":{'symB':'E222',  'monitorButtonText':'Stop Monitoring', 'initialPrice':12345, }  }); */
	/* let data = [{
    "Key":"A",
    "Data":{'symB':'APPL',  'monitorButtonText':'Stop Monitoring', 'initialPrice':12345, }  
},
{
    "Key":"B",
    "Data":{'symB':'BBBB',  'monitorButtonText':'Stop Monitoring', 'initialPrice':2355, }  
},
{
    "Key":"C",
    "Data":{'symB':'CC',  'monitorButtonText':'Stop Monitoring', 'initialPrice':242, } 
},
{
    "Key":"A",
    "Data":{'symB':'D',  'monitorButtonText':'Stop Monitoring', 'initialPrice':1, }  
},
{
    "Key":"B",
    "Data":{'symB':'EEEE',  'monitorButtonText':'Stop Monitoring', 'initialPrice':12, }    
}]; */

/* let groupedData = data.reduce((results, item) => {
    results[item.Key] = results[item.Key] || [];
    results[item.Key].push(item.Data);

    return results;
}, {});

console.log(groupedData); */

//firebase.database().ref('modA/TESTING_/').set(groupedData);
	///----------
	
	
	var fs_p = require('fs').promises;
	try {
		await fs_p.writeFile('1queryBook.json', JSON.stringify(queryBook));
		//console.info("File created successfully with Node.js v13 fs_p.promises!");
	} catch (error){
		console.error(error);
	}
	
		// var fs_p = require('fs').promises;
		if (update_tallyCoinPerformance==1){
			try {
				await fs_p.writeFile('json/tallyCoinPerformance.json', JSON.stringify(tallyCoinPerformance));
				console.info("tallyCoinPerformance.json created successfully with Node.js v13 fs_p.promises!");
			} catch (error){
				console.error(error);
			}
		}
		
		if (update_tallyCoinPerformance_S==1){
			try {
				await fs_p.writeFile('json/tallyCoinPerformance_S.json', JSON.stringify(tallyCoinPerformance_S));
				console.info("tallyCoinPerformance_S.json created successfully with Node.js v13 fs_p.promises!");
			} catch (error){
				console.error(error);
			}
		}
		
		if (update_recordCoinPerformance==1){
			try {
				await fs_p.writeFile('json/recordCoinPerformance.json', JSON.stringify(recordCoinPerformance));
				//console.info("File created successfully with Node.js v13 fs_p.promises!");
			} catch (error){
				console.error(error);
			} 
		}
		
		if (update_recordTestAccount==1){
			try {
				await fs_p.writeFile('json/recordTestAccount.json', JSON.stringify(recordTestAccount));
				//console.info("File created successfully with Node.js v13 fs_p.promises!");
			} catch (error){
				console.error(error);
			} 
		}
		
		if (update_recordSimAccount==1){
			try {
				await fs_p.writeFile('json/recordSimAccount.json', JSON.stringify(recordSimAccount));
				//console.info("File created successfully with Node.js v13 fs_p.promises!");
			} catch (error){
				console.error(error);
			} 
		}
		
		if (update_updateAgain==1){
			/* try {
				await fs_p.writeFile('json/updateTimeAgain.txt', updateAgain);
				console.info("01 TIME UPDATED FOR ENTERING POS!");
			} catch (error){
				console.error(error);
			}
		
			try {
				await fs_p.writeFile('1_analyseTime.txt', now.format('YYYY-MM-DD HH:mm:ss'));
				console.info("02 TIME UPDATED FOR ENTERING POS!");
			} catch (error){
				console.error(error);
			}  */
		}
		
		//console.log('recordTestAccount.length:::____');
		//console.log(recordTestAccount.length)
		
		var totRetP = 0;
		for (p=0; p<recordTestAccount.length; p++){
			
			//if (parseFloat(recordTestAccount[p]._return)<-2){
			//	totRetP += -2;
			//}
			//else {
				totRetP += parseFloat(recordTestAccount[p]._return);
			//}
			
			
		}
		var halfTotRetP = totRetP/2;
		
		 console.log('-----------------------------')
		console.log(' ')
		console.log('-----------------------------')
		console.log('A Test Account RETURN BELOW...')
		console.log(halfTotRetP.toFixed(2)+'%');
		console.log('_____________________________') 
		
	/* firebase.database().ref('/general/').update({
					usdt_activateSimulation:'0',
					short_usdt_activateSimulation: '0',
				}) */	
		

var d = new Date();
	console.log('Time End:'+d);

return listOfArguments.length;

}

module.exports ={
        loadAccounts
    }