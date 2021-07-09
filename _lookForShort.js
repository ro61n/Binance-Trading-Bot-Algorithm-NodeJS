



//lookForCoin();

//algoLoopC();
//algoLoopD();
//var timeVar = 61500*16; 
//var myVarC = setInterval(everything, timeVar);//16 minutes.

async function lookForShortFunc() {
	
	var d = new Date();
	console.log('look for short Time Start:'+d);
	
	var fs = require('fs');
	const fetch = require('node-fetch');
	var CryptoJS = require("crypto-js");
	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	
	const AbortController = require("abort-controller");
	
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
	
	
	
	
	var moment = require('moment');
	var now = moment();
	
	let counter = 0;
	let interval;
	const listOfArguments = [];
	
	let userDet = [];
	
	var fJ = fs.readFileSync('flipped.json','utf8');
			//if (tcp){
				var flippedJSON = JSON.parse(fJ);
				var l_flipA = flippedJSON.l_flipA;
				var l_flipB = flippedJSON.l_flipB;
				var s_flipA = flippedJSON.s_flipA;
				var s_flipB = flippedJSON.s_flipB;
	
	const controllerA = new AbortController();
	setTimeout(() => controllerA.abort(), 20000);
	//controllerA.abort();
	let response = await fetch('https://www.binance.com/api/v3/time', {signal: controllerA.signal,} ).catch((error)=>console.log(error));
	
	if (response){
		/// --- --- --- 
		
		let responseST = await response.json();
	console.log('SERVER TIME:'+responseST.serverTime);

	var queryBook = [];
	var qb = fs.readFileSync('1queryBook.json','utf8');
	if (qb){
		queryBook = JSON.parse(qb);
	}
	
	console.log('queryBook length:'+queryBook.length);
	console.log(queryBook);
	

	let snapDataAccounts_ = [];
		var snapshot_accounts = await firebase.database().ref('/users/').once('value').catch((error)=>console.log(error));
		snapDataAccounts_ = snapshot_accounts.val();
	
		
		let l=0;
		for (x in snapDataAccounts_) {
			if (x!='_test_'){
				snapDataAccounts_[x].username = x;
				userDet[l] = snapDataAccounts_[x];
				l++;
			}
		}



/* var doCoinAnalysis = '0';
for (let i = 0; i < queryBook.length; i++) {
  if (queryBook[i][0]=='SHORT_COIN'){
	  //console.log(' it will look for another coin...');
	  doCoinAnalysis='1';
  }
} */


	
	snapshot_X = await firebase.database().ref('/Ins/_test__S/').once('value').catch((error)=>console.log(error));
	var ws_ws_json_Sim = (snapshot_X.val() && snapshot_X.val().ws_key) || [];
	ws_ws_json_Sim = ws_ws_json_Sim.filter(function(x){return x !== null});
	
	snapshot_XB = await firebase.database().ref('/Ins/_testACC__S/').once('value').catch((error)=>console.log(error));
	var ws_ws_json_AT = (snapshot_XB.val() && snapshot_XB.val().ws_key) || [];
	ws_ws_json_AT = ws_ws_json_AT.filter(function(x){return x !== null});
	
	snapshot_W = await firebase.database().ref('/general/').once('value').catch((error)=>console.log(error));
	//(snapshot_W.val() && snapshot_W.val().usdt_activateSimulation) || [];
	//var snapActSim = (snapshot_W.val() && snapshot_W.val().usdt_activateSimulation) || [];
	var s_snapActSim = (snapshot_W.val() && snapshot_W.val().short_usdt_activateSimulation) || [];
	var s_snapSimBusy = (snapshot_W.val() && snapshot_W.val().short_usdt_simulationBusy) || [];
	
	//var short_long = (snapshot_W.val() && snapshot_W.val().short_long) || [];
	var short_long = 'short';
	
	if (short_long=='short'){
		
		
		
		
		var foundSpecUser = '';
		for (fsu=0; fsu<userDet.length; fsu++){
				if (userDet[fsu].username=='oJhPznC7LyXGnbnFYLxiTUBbudF3'){
					foundSpecUser=userDet[fsu];
			}
		}
		
		// var bytes_ak  = CryptoJS.AES.decrypt(userDet[0].a_k, '#yB*32_Ppz'+userDet[0].username+'gpwo12(');
		// var bytes_sk  = CryptoJS.AES.decrypt(userDet[0].s_k, '#yB*32_Ppz'+userDet[0].username+'gpwo12(');
		
		var bytes_ak  = CryptoJS.AES.decrypt(foundSpecUser.a_k, '#yB*32_Ppz'+foundSpecUser.username+'gpwo12(');
		var bytes_sk  = CryptoJS.AES.decrypt(foundSpecUser.s_k, '#yB*32_Ppz'+foundSpecUser.username+'gpwo12(');
	
		var dataQueryString = 'recvWindow=20000&timestamp='+responseST.serverTime;
		//var signature = CryptoJS.HmacSHA256(dataQueryString, bytes_sk.toString(CryptoJS.enc.Utf8)).toString(CryptoJS.enc.Hex);
		//var url = 'https://api.binance.com/sapi/v1/margin/allPairs?'+dataQueryString+'&signature='+signature;
		var url = 'https://api.binance.com/sapi/v1/margin/allPairs?'+dataQueryString;
		listOfArguments.push([url, 'GET', 'NEW_SHORT_PAIRS', userDet[0].username, bytes_ak,   ]);
		/////
	}
	
	
	
	
	

		
		/// --- --- ---
	}
	else {
		console.log('NO INTERNET CONNECTION')
	}
		

//console.log('listOfArguments below:');
//console.log(listOfArguments);
//console.log(listOfArguments.length);

console.log('-      -      -      -      -      -      -')
console.log('LookFor->SHORT<-: listOfArguments LENGTH:'+listOfArguments.length);
console.log('-      -      -      -      -      -      -')


// Fake async: resolve an array through arbitrary delay
// Increase a counter in order to watch amount of Promises executed

var depthArr=[];
var klines30mArr=[];
var klines1hArr=[];
var marginCoins=[];


var promList = [];

const asyncOperation = index => {
  counter++;
  return new Promise((resolve, reject) => {
	  
	  ///--------------------------------------------------
	  // console.log('lookForShort: index[0] sent:'+index[0]);
	   
	   const controller = new AbortController();
		setTimeout(() => controller.abort(), 20000);
	  
		
		//var fetchVar;
		var initObject={};
		//let reqHeader = new Headers();
		if (index[2]=='NEW_SHORT_PAIRS'){
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
				//console.log('result. below. ...')
				//console.log(data);
				
				//console.log('Operation performed:', index[0]);
				counter--;
				
						///    =-=-=--=-=--=-=-=--=
						
				if ( index[2]=='depth' ){
					//var j_prom = [index[3].symbol, index[2] ];
			
					//accBal.push(j_prom)
					//var accBal = [index[3], index[2], index[5] ];
					//var promV = data;
					depthArr.push([index[3], data,  ]);
				}
				else if ( index[2]=='klines1h' ){
					//var j_prom = [index[3].symbol, index[2] ];
					
					//accOrders.push(j_prom)
						//var accOrders = [index[3], index[2], index[5] ];
					//var promV = data;
					klines1hArr.push([index[3],  data ]);
				}
				else if (index[2]=='klines30m') {
					//var j_prom = [index[3].symbol, index[2] ];
			
					//j_prom.push(JSON.parse(request.responseText));
			
					//var promV = data;
					klines30mArr.push([index[3],  data ]);
				}
				else if (index[2]=='NEW_SHORT_PAIRS'){
					//var j_prom = [index[2] ];
					//var promV = data;
					marginCoins.push(data);
				}
		
						
						////  -=-==-=-=-==-=-
								
				
				resolve();
				
				//console.log('=====================')
			})
			.catch(function (err) {
				console.log('X X X X X X X X X X X X X X X X X X X X');
				console.log('Operation REJECTED below:', index[0]);
				console.log("Something went wrong!", err);
				
				console.log('X X X X X X X X X X X X X X X X X X X X')
				
				resolve();
			});
	  ///------------------------------------------------///
  
  
		
});

console.log('Asynchronous request made.');


   
   
  
	
 
	
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






//setTimeout( watchCounter, 1000*3);
//watchCounter();



//var promList = await take3subtake1part1();
console.log(' About to run promises...');
 await take3subtake1part0();
 console.log('listOfArguments #: '+listOfArguments.length);
console.log('promList #: '+promList.length);

if (counter==0){	
	clearInterval(interval);
}


//console.log('----promList Below:---- NOT ANYMORE');
//console.log(promList);

var klines30mArr = [];
	var eL = fs.readFileSync('efficientList30m.json','utf8');
	if (eL){
		klines30mArr = JSON.parse(eL);
	}

/* console.log('klines30mArr below:');
console.log(klines30mArr); */

//console.log('depth below:');
//console.log(depthArr.length);

let filteredList = [];
var countS = 0;

for (s=0; s<klines30mArr.length; s++) {
	 //klines30mArr[s][0];
	 //if ((klines30mArr[s][0].price>0.0000011) && (klines30mArr[s][0].vol>0) && (klines30mArr[s][0].vol_BTC>300) && (klines30mArr[s][0].chart =='30m') ) {
		 var addToFilteredList = 1;
		 
		 //var orderBook_D = depthArr[s][1];
		// console.log('=====')
		
		//console.log('COIN:'+klines30mArr[s][0].symbol);
		 
		 //if ((typeof orderBook_D !== 'undefined') && (typeof orderBook_D.asks[0] !== 'undefined') && (typeof orderBook_D.bids[0] !== 'undefined') ){
			 
			
		 
		 // klines30mArr[s][0].lP_ = lP_;
								
								// klines30mArr[s][0].lP_B = lP_B;
								
		 //var lP_Opposite = parseFloat(orderBook_D.asks[1][0]);
		// console.log('lP_: :'+lP_)
		 
		//console.log('sourceData:'+sourceData);
		 
		 
		 
		 var candlesForCoin_ = klines30mArr[s][1];
		 
		 if (candlesForCoin_.length>200){
			 //var revKlines = candlesForCoin_.reverse();
		 
		
								
								
								// klines30mArr[s][0].asks = orderBook_D.asks[0][0];
								// klines30mArr[s][0].bids = orderBook_D.bids[0][0];
								
								//map data...
								var closeData = candlesForCoin_.map(d=>d[4]);
								
								var tulind = require('tulind');
								
								
							/* //-------------------------------- - - - - - - - - -----------------
								var tMACD = 0;			var tMACDB = 0;				var tMACDC = 0;
								var tM_Signal = 0;		var tM_SignalB = 0;			var tM_SignalC = 0;
								var tM_Histogram = 0;	var tM_HistogramB = 0;		var tM_HistogramC = 0;
								tulind.indicators.macd.indicator([closeData],[12,26,9],(err, res)=>{
									if (err) return console.log(err);
									tMACD = res[0].slice(-1)[0];
									tMACDB = res[0].slice(-2)[0];
									tMACDC = res[0].slice(-3)[0];
						
									tM_Signal = res[1].slice(-1)[0];
									tM_SignalB = res[1].slice(-2)[0];
									tM_SignalC = res[1].slice(-3)[0];
						
									tM_Histogram = res[2].slice(-1)[0];
									tM_HistogramB = res[2].slice(-2)[0];
									tM_HistogramC = res[2].slice(-3)[0];
									//console.log(tMACD);
								});
								
								klines30mArr[s][0].tMACD = tMACD;					klines30mArr[s][0].tMACDB = tMACDB;						klines30mArr[s][0].tMACDC = tMACDC;
								klines30mArr[s][0].tM_Signal = tM_Signal;			klines30mArr[s][0].tM_SignalB = tM_SignalB;				klines30mArr[s][0].tM_SignalC = tM_SignalC;
								klines30mArr[s][0].tM_Histogram = tM_Histogram;		klines30mArr[s][0].tM_HistogramB = tM_HistogramB;		klines30mArr[s][0].tM_HistogramB = tM_HistogramB;
								
							//------------------------------------------------------------------
								
								
								var tRSI =0;
								tulind.indicators.rsi.indicator([closeData],[14],(err, res)=>{
									if (err) return console.log(err);
									tRSI = res[0].slice(-1)[0];
								});
								klines30mArr[s][0].calc_RSITwo_ = tRSI;
									var inverseRSI = 1/(tRSI);
								klines30mArr[s][0].calc_inverseRSI = inverseRSI;
								
								var tPPO = 0;
								var tPPO_B = 0;
								var tPPO_C = 0;
								tulind.indicators.ppo.indicator([closeData],[12, 26],(err, res)=>{
									if (err) return console.log(err);
									tPPO = res[0].slice(-1)[0];
									tPPO_B = res[0].slice(-2)[0];
									tPPO_C = res[0].slice(-3)[0];
								});
								klines30mArr[s][0].calc_ppo = tPPO;
								klines30mArr[s][0].calc_ppo_B = tPPO_B;
								klines30mArr[s][0].calc_ppo_C = tPPO_C;
								
								
								
								
								var tSMA =0;
								var tSMA_B =0;
								var tSMA_C =0;
								var res_O_SMA20 = [];
								tulind.indicators.sma.indicator([closeData],[20],(err, res)=>{
									if (err) return console.log(err);
									tSMA_C = res[0].slice(-3)[0];
									tSMA_B = res[0].slice(-2)[0];
									tSMA = res[0].slice(-1)[0];
									//console.log('20 day:'+tSMA);
									res_O_SMA20 = res[0];
								});
								klines30mArr[s][0].sma20_C = tSMA_C;
								klines30mArr[s][0].sma20_B = tSMA_B;
								klines30mArr[s][0].sma20 = tSMA;
								
								 var tROCR =0;
								var ROCR_B =0;
								var ROCR_C =0;
								
								tulind.indicators.rocr.indicator([res_O_SMA20],[9],(err, res)=>{
									if (err) return console.log(err);
									//console.log(res[0].slice(-1)[0]);
								//	console.log('RSI 1: '+res[0].slice(-1)[0])
									//console.log('RSI 2: '+RSITwo)
									tROCR_C = res[0].slice(-3)[0];
									tROCR_B = res[0].slice(-2)[0];
									tROCR = res[0].slice(-1)[0];
									//console.log('20 day:'+tSMA);
								});
								klines30mArr[s][0].ROCR_C = tROCR_C;
								klines30mArr[s][0].ROCR_B = tROCR_B;
								klines30mArr[s][0].ROCR = tROCR; 
								 */
								
								
			///........................................................................................................
					///........................................................................................................
							///........................................................................................................
							
							//-----------------------------------------------------------------------------------
			//-----------------------------------------------------------------------------------
						//-----------------------------------------------------------------------------------
						
						
						var rocPriceArr = [];
							tulind.indicators.roc.indicator([closeData],[9],(err, res)=>{
								if (err) return console.log(err);
									rocPriceArr = [res[0].slice(-1)[0], res[0].slice(-2)[0], res[0].slice(-3)[0]];
							});
							klines30mArr[s][0].rocPriceArr = rocPriceArr;
					//.......
						
							var res_O_SMA20 = []; 
							var ma20=0;
							var ma20B=0;
							var ma20C=0;
							tulind.indicators.sma.indicator([closeData],[20],(err, res)=>{
								if (err) return console.log(err);
									res_O_SMA20 = res[0];
									ma20 = res[0].slice(-1)[0];
									ma20B = res[0].slice(-2)[0];
									ma20C = res[0].slice(-3)[0];
							});
							klines30mArr[s][0].ma20 = ma20;
							klines30mArr[s][0].ma20B = ma20B;
							klines30mArr[s][0].ma20C = ma20C;
						//-----------------------------------------------------------------------------------
							var res_O_SMA50 = []; 
							var ma50=0;
							tulind.indicators.sma.indicator([closeData],[50],(err, res)=>{
								if (err) return console.log(err);
									res_O_SMA50 = res[0];
									ma50 = res[0].slice(-1)[0];
							});
							klines30mArr[s][0].ma50 = ma50;
						//-----------------------------------------------------------------------------------
							var res_O_SMA100 = []; 
							var ma100=0;
							tulind.indicators.sma.indicator([closeData],[100],(err, res)=>{
								if (err) return console.log(err);
									res_O_SMA100 = res[0];
									ma100 = res[0].slice(-1)[0];
							});
							klines30mArr[s][0].ma100 = ma100;
						//-----------------------------------------------------------------------------------
							var res_O_SMA200 = []; 
							var ma200=0;
							tulind.indicators.sma.indicator([closeData],[200],(err, res)=>{
								if (err) return console.log(err);
									res_O_SMA200 = res[0];
									ma200 = res[0].slice(-1)[0];
							});
							klines30mArr[s][0].ma200 = ma200;
						//-----------------------------------------------------------------------------------
							var roc20Arr = [];
							tulind.indicators.roc.indicator([res_O_SMA20],[9],(err, res)=>{
								if (err) return console.log(err);
									roc20Arr = [res[0].slice(-1)[0], res[0].slice(-2)[0]];
							});
							klines30mArr[s][0].roc20Arr = roc20Arr;
						//-----------------------------------------------------------------------------------
							var roc50Arr = [];
							tulind.indicators.roc.indicator([res_O_SMA50],[9],(err, res)=>{
								if (err) return console.log(err);
									roc50Arr = [res[0].slice(-1)[0], res[0].slice(-2)[0]];
							});
							klines30mArr[s][0].roc50Arr = roc50Arr;
						//-----------------------------------------------------------------------------------
							var roc100Arr = [];
							tulind.indicators.roc.indicator([res_O_SMA100],[9],(err, res)=>{
								if (err) return console.log(err);
									roc100Arr = [res[0].slice(-1)[0], res[0].slice(-2)[0]];
							});
							klines30mArr[s][0].roc100Arr = roc100Arr;
						//-----------------------------------------------------------------------------------
							var roc200Arr = [];
							tulind.indicators.roc.indicator([res_O_SMA200],[9],(err, res)=>{
								if (err) return console.log(err);
									roc200Arr = [res[0].slice(-1)[0], res[0].slice(-2)[0]];
							});
							klines30mArr[s][0].roc200Arr = roc200Arr;
						//-----------------------------------------------------------------------------------
							var rsi=0;
							tulind.indicators.rsi.indicator([closeData],[14],(err, res)=>{
								if (err) return console.log(err);
									rsi = res[0].slice(-1)[0];
							});
							klines30mArr[s][0].rsi = rsi;
						//-----------------------------------------------------------------------------------
							var ppo=[];
							tulind.indicators.ppo.indicator([closeData],[12, 26],(err, res)=>{
								if (err) return console.log(err);
									ppo = [res[0].slice(-1)[0], res[0].slice(-2)[0], res[0].slice(-3)[0]];
							});
							klines30mArr[s][0].ppo = ppo;
						//-----------------------------------------------------------------------------------	
							var flipCFC = candlesForCoin_.reverse();
							
							klines30mArr[s][0].openPrice = flipCFC[0][1];
							klines30mArr[s][0].highPrice = flipCFC[0][2];
							klines30mArr[s][0].lowPrice = flipCFC[0][3];
							klines30mArr[s][0].closePrice = flipCFC[0][4];
							
							//console.log('RECENT TIME S: '+ moment(flipCFC[0][6]).format('YYYY-MM-DD HH:mm:ss') );
							//console.log('2nd RECENT TIME S: '+ moment(flipCFC[1][6]).format('YYYY-MM-DD HH:mm:ss') );
							
							klines30mArr[s][0].closePriceFour = flipCFC[4][4];
							klines30mArr[s][0].closePriceEight = flipCFC[8][4];
							
							klines30mArr[s][0].prevHighPrice = flipCFC[1][2];
							klines30mArr[s][0].prevClosePrice = flipCFC[1][4];
							klines30mArr[s][0].prevOpenPrice = flipCFC[1][1];
							
							
							var canShort=0;
							for (r=0; r<marginCoins[0].length; r++){
								if ( (marginCoins[0][r].symbol==klines30mArr[s][0].symbol) && (marginCoins[0][r].isBuyAllowed==true) && (marginCoins[0][r].isMarginTrade==true) && (marginCoins[0][r].isSellAllowed==true) ) {
									canShort=1;
									//console.log('1. FOUND COIN ON MARGIN LIST');
									
								}
							}
							
							//if (canShort==1){
								candlesForCoin_.reverse();
								var holdingCoin=0;
								var initPrice=0;
								var initDate=0;
								var exitPrice=0;
								var exitDate=0
								var expectedProfitPerc = 0
								var biggestLoss=0
								
								//var testTradesJson=[];
								var numTrades=0;
								var numProfits=0;
								var netPerRet=0;
								
								for (var u=0; u<candlesForCoin_.length; u++){// oldest time is [0]
									/* console.log('*****************************************')	
									console.log('time'+moment(candlesForCoin_[u][6]).format('YYYY-MM-DD HH:mm:ss'));
									console.log('MOST RECENT TIME S: '+ moment(candlesForCoin_[0][6]).format('YYYY-MM-DD HH:mm:ss') );
									console.log('MOST OLDEST TIME S: '+ moment(candlesForCoin_[candlesForCoin_.length-1][6]).format('YYYY-MM-DD HH:mm:ss') );
									console.log('*****************************************')
									console.log('*****************************************')
									console.log('*****************************************') */
									
									
									
									
									 var candlesCropped=[];
									 for (var b=0; b<=u; b++){
										 candlesCropped.push(candlesForCoin_[b]);
									 }
									 
									 var closeDataCropped = candlesCropped.map(d=>d[4]);
									 
									
									
									/* console.log('candlesForCoin_ :');
									console.log(candlesForCoin_);
									
									console.log('candlesCropped below');
									console.log(candlesCropped); */
									
									
									/* console.log('--> '+candlesCropped.length);
									for (var e=0; e<candlesCropped.length; e++){
										console.log(candlesCropped[e][4]);
									} */
									
									var ma20TestA=0;
									var ma20TestB=0;
									tulind.indicators.sma.indicator([closeDataCropped],[20],(err, res)=>{
									if (err) return console.log(err);
										//res_O_SMA20 = res[0];
										ma20TestA = res[0].slice(-1)[0];
										ma20TestB = res[0].slice(-2)[0];
										//ma20C = res[0].slice(-3)[0];
									});
								//...................................
									var ppoTestA=[];
									tulind.indicators.ppo.indicator([closeDataCropped],[12, 26],(err, res)=>{
										if (err) return console.log(err);
											ppoTestA = [res[0].slice(-1)[0], res[0].slice(-2)[0], res[0].slice(-3)[0]];
									});
								//....................................
									var rocTestA = [];
									tulind.indicators.roc.indicator([closeDataCropped],[9],(err, res)=>{
										if (err) return console.log(err);
											rocTestA = [res[0].slice(-1)[0], res[0].slice(-2)[0], res[0].slice(-3)[0]];
									});
								//.....................................
								

								
									//klines30mArr[s][0].rocPriceArr = rocPriceArr;
									
									
									/* if (ma20TestA>0){
										console.log('ma20TestA:'+ma20TestA);
									}  */
									
									//console.log('holdingCoin:'+holdingCoin);
									// if ((candlesForCoin_[u][4]>ma20TestA) && ((((candlesForCoin_[u][4]/ma20TestA)-1)*100)<5) && (holdingCoin==0)) {
									if (
										//(ppoTestA[0]>ppoTestA[1]) && (ppoTestA[1]>ppoTestA[2])
										// (ma20TestA>ma20TestB)
										 //(rocTestA[0]>rocTestA[1]) && (rocTestA[1]>rocTestA[2])
										 (holdingCoin==0)
									//	&& ((((candlesForCoin_[u][4]/ma20TestA)-1)*100)<5)
										&& (candlesForCoin_[u][4]<ma20TestA)
										&& (candlesForCoin_[u-1][4]>ma20TestB)
									){
										holdingCoin=1;
										initPrice = candlesForCoin_[u][4];
										initDate = candlesForCoin_[u][6];
										//console.log('short Entered Long Position at '+moment(candlesForCoin_[u][6]).format('YYYY-MM-DD HH:mm:ss') );
									}
									
									var ma20TestA_HighBar = ma20TestA*(1.02);
									if (  ((candlesForCoin_[u][4]>ma20TestA_HighBar) && (holdingCoin==1))    ) { // || ((holdingCoin==1) && (u==candlesForCoin_.length-1) )
										
										if ((holdingCoin==1) && (u==candlesForCoin_.length-1) ) {
											//console.log('_______________________________________________-')
										}
										
										holdingCoin=0;
										exitPrice = candlesForCoin_[u][4];
										exitDate = candlesForCoin_[u][6];
										var perRet = (((exitPrice/initPrice)-1)*100).toFixed(2);
										perRet = (perRet*(-1)).toFixed(2);
										//console.log('short LEAVING Position at '+perRet+'% at '+moment(candlesForCoin_[u][6]).format('YYYY-MM-DD HH:mm:ss') );
										
										//testTradesJson.push({'symbol':})
										numTrades++;
										if (perRet>=2){
											numProfits++
										}
										
										if (parseFloat(perRet)<parseFloat(biggestLoss)){
											//console.log('PR:'+perRet+' & bL:'+biggestLoss);
											//console.log(perRet<biggestLoss);
											biggestLoss = perRet;
											//console.log('New biggest loss:'+biggestLoss)
										}
										netPerRet += parseFloat(perRet);
										
									}   
									
									
								}
								expectedProfitPerc = ((numProfits/numTrades)*100).toFixed(2);
								// console.log('-x-x-x-x-')
								// console.log('numTrades:'+numTrades);
								// console.log('numProfits:'+numProfits);
								// console.log('% profit:'+expectedProfitPerc+'%');
								// console.log('biggest loss:'+biggestLoss+'%');
								// console.log('netPerRet:'+netPerRet.toFixed(2)+'%')
								// console.log('____________________________________________')
								// console.log('-x-x-x-x--x-x-x-x--x-x-x-x--x-x-x-x--x-x-x-x-')
								
								klines30mArr[s][0]._numTrades = numTrades;
								klines30mArr[s][0]._numProfits = numProfits;
								klines30mArr[s][0]._expectedProfitPerc = expectedProfitPerc;
								klines30mArr[s][0]._biggestLoss = biggestLoss;
								klines30mArr[s][0]._netPerRet = netPerRet.toFixed(2);
								
								
								
								
								
								
							//-----------------------------------------------------------------------------------		
									
									
									if (addToFilteredList==1){
										filteredList[countS] = klines30mArr[s][0];
										countS++;
									}
							//}//can short if
		 }
		 
		 
		 
		 
		 
								
								//console.log('symbol:'+klines30mArr[s][0].symbol+'calc_rsiTwo:'+klines30mArr[s][0].calc_RSITwo_+' & calc_ppo:'+klines30mArr[s][0].calc_ppo)
								
									
							//}
		 
	 //}
}

//console.log(filteredList);
filteredList.sort(orderByProperty('_numProfits', '_expectedProfitPerc', '_netPerRet','_biggestLoss', ));

for (var r=0; r<filteredList.length; r++){
	console.log(filteredList[r].symbol+' numTrades:'+filteredList[r]._numTrades+' _numProfits:'+filteredList[r]._numProfits+' _expectedProfitPerc'+filteredList[r]._expectedProfitPerc+' _biggestLoss:'+filteredList[r]._biggestLoss+' _netPerRet'+filteredList[r]._netPerRet)
	console.log('...')
}

						
						
						
						//filteredList.sort(orderByProperty('rsi', 'chart_c'));
						
							
								
								function orderByProperty(prop) {
									var args = Array.prototype.slice.call(arguments, 1);
									return function (a, b) {
										//var equality = a[prop] - b[prop];
										var equality = b[prop] - a[prop];
										if (equality === 0 && arguments.length > 1) {
											return orderByProperty.apply(null, args)(a, b);
										}
										return equality;
									};
								}
								
								var ReverseData = filteredList;
						//var ReverseData = filteredList.reverse();
						console.log('Short list: '+ReverseData.length)
						
						
									
						
						

//------------------------------------------------------------------------------------------						


var queryBook = [];
	var qb = fs.readFileSync('1queryBook.json','utf8');
	if (qb){
		queryBook = JSON.parse(qb);
	}
	
	//console.log('queryBook length:'+queryBook.length);
	
	//console.log('ReverseData below:');
		//							console.log(ReverseData);
									

									//console.log('2. queryBook length:'+queryBook.length);

	console.log('DATE:'+now.format('YYYY-MM-DD HH:mm:ss'));
	console.log('SHORT ReverseData below:');
	console.log(ReverseData.length);
	//console.log(ReverseData);
									

for (let i = 0; i < queryBook.length; i++) {
  //listOfArguments.push(i);
  if (queryBook[i][0]=='SHORT_COIN'){
	  //console.log('console.log... it will look for another coin...');
	  //doCoinAnalysis='1';
	  
	  if (ReverseData.length>=1) {
		  
		  
		  
			var count_B = 1;
			var selectedCoin ='';
			var selectCoinForTestAccount='';
								
			while((count_B<ReverseData.length) && (selectedCoin=='') ){
				var rDSym = ReverseData[count_B].symbol;
				
				var baseMatch = rDSym.substr(-queryBook[i][3].length);
				//var firstSymB = rDSym.substring(0, rDSym.length - 4);
										//console.log('queryBook[i][3] length:'+queryBook[i][3].length+' :'+queryBook[i][3]+' ->: '+baseMatch);
										
										
										if (baseMatch==queryBook[i][3]){
										//	console.log('MATCH:: symbol:'+rDSym+' '+ReverseData[count_B].calc_macd+' '+ReverseData[count_B].calc_RSITwo_);
											//console.log(ReverseData[count_B]);
										}
										
				//var lP___ = parseFloat(orderBook_D.asks[0][0])
				var lP___ = ReverseData[count_B].asks;
				
				
				
				
				
				
				
				/* var oneUnitTest=100;
				for (u=0; u<userDet.length; u++){
					if (userDet[u].username==queryBook[i][1]){
						oneUnitTest=((1*parseFloat(ReverseData[count_B].lP_B))/parseFloat(userDet[u].usdBal))*100;//*parseFloat(queryBook[i][2]);
					}
				} */
				
				var conditionsMet=0;
				
				//var spreadBA = (((parseFloat(ReverseData[count_B].asks)/parseFloat(ReverseData[count_B].bids))-1)*100);
				
				if (  //___ (parseFloat(ReverseData[count_B].roc20Arr[0])<parseFloat(ReverseData[count_B].roc20Arr[1])) &&  (parseFloat(ReverseData[count_B].roc50Arr[0])<parseFloat(ReverseData[count_B].roc50Arr[1]))   &&  (parseFloat(ReverseData[count_B].roc100Arr[0])<parseFloat(ReverseData[count_B].roc100Arr[1])) &&  (parseFloat(ReverseData[count_B].roc200Arr[0])<parseFloat(ReverseData[count_B].roc200Arr[1]))
						//&& (!((parseFloat(ReverseData[count_B].ma20)>parseFloat(ReverseData[count_B].ma50)) && (parseFloat(ReverseData[count_B].ma50)>parseFloat(ReverseData[count_B].ma100)))) 
						
						//___ && (parseFloat(ReverseData[count_B].ppo[0])<parseFloat(ReverseData[count_B].ppo[1])) && (parseFloat(ReverseData[count_B].ppo[1])<parseFloat(ReverseData[count_B].ppo[2]))
						//___ && (parseFloat(ReverseData[count_B].ma20)<parseFloat(ReverseData[count_B].ma20B)) 
						//___ && (parseFloat(ReverseData[count_B].rocPriceArr[0])<parseFloat(ReverseData[count_B].rocPriceArr[1])) && (parseFloat(ReverseData[count_B].rocPriceArr[1])<parseFloat(ReverseData[count_B].rocPriceArr[2]))
						
						//&& (parseFloat(ReverseData[count_B].closePrice)<parseFloat(ReverseData[count_B].ma20)) && (parseFloat(ReverseData[count_B].prevClosePrice)>=parseFloat(ReverseData[count_B].ma20B))
						//&& (parseFloat(ReverseData[count_B]._numProfits)>=3) && (parseFloat(ReverseData[count_B]._expectedProfitPerc)>=60) && (parseFloat(ReverseData[count_B]._biggestLoss)>-8) && (parseFloat(ReverseData[count_B]._netPerRet)>parseFloat(ReverseData[count_B]._biggestLoss) && (parseFloat(ReverseData[count_B]._netPerRet)>3)  )
						//...&& (parseFloat(ReverseData[count_B]._expectedProfitPerc)>=60) && (parseFloat(ReverseData[count_B]._biggestLoss)>-8) && (parseFloat(ReverseData[count_B]._netPerRet)>parseFloat(ReverseData[count_B]._biggestLoss) && (parseFloat(ReverseData[count_B]._netPerRet)>3)  )
						//___ && (parseFloat(ReverseData[count_B]._expectedProfitPerc)>65) && (parseFloat(ReverseData[count_B]._biggestLoss)>-8) && (parseFloat(ReverseData[count_B]._netPerRet)>parseFloat(ReverseData[count_B]._biggestLoss)*(-1)) && (parseFloat(ReverseData[count_B]._netPerRet)>5)  
						//___ && ((((parseFloat(ReverseData[count_B].closePrice)/parseFloat(ReverseData[count_B].ma20))-1)*100) >=-3 )
						
					((parseFloat(ReverseData[count_B].closePrice)<parseFloat(ReverseData[count_B].ma20)) && (parseFloat(ReverseData[count_B].prevClosePrice)>=parseFloat(ReverseData[count_B].ma20B)))
						&& (parseFloat(ReverseData[count_B]._expectedProfitPerc)>65) && (parseFloat(ReverseData[count_B]._biggestLoss)>-8) && (parseFloat(ReverseData[count_B]._netPerRet)>parseFloat(ReverseData[count_B]._biggestLoss)*(-1)) && (parseFloat(ReverseData[count_B]._netPerRet)>5)  
						
						&& ((((parseFloat(ReverseData[count_B].closePrice)/parseFloat(ReverseData[count_B].ma20))-1)*100) >=-5 )
						
						
				){
					conditionsMet=1;
				}
				//&& (spreadBA<0.3)
				
				
				//console.log(ReverseData[count_B].symbol+' chart: '+ReverseData[count_B].chart+' RSI::'+ReverseData[count_B].calc_RSITwo_+' PPO::'+goodPPO+' Type:'+short_long+' oneUnitTest::'+oneUnitTest+' goodPriceRange:'+goodPriceRange+' ('+((((ReverseData[count_B].lP_B/ReverseData[count_B].price)-1)*100))+')  & goodROCR:'+goodROCR);
				//console.log('S: '+ReverseData[count_B].symbol+' RSI:'+ReverseData[count_B].rsi+' conditionsMet:'+conditionsMet+'  --- A:'+((parseFloat(ReverseData[count_B].roc20Arr[0])<parseFloat(ReverseData[count_B].roc20Arr[1])) &&  (parseFloat(ReverseData[count_B].roc50Arr[0])<parseFloat(ReverseData[count_B].roc50Arr[1]))   &&  (parseFloat(ReverseData[count_B].roc100Arr[0])<parseFloat(ReverseData[count_B].roc100Arr[1])) &&  (parseFloat(ReverseData[count_B].roc200Arr[0])<parseFloat(ReverseData[count_B].roc200Arr[1]))) +' B:'+((!((parseFloat(ReverseData[count_B].ma20)>parseFloat(ReverseData[count_B].ma50)) && (parseFloat(ReverseData[count_B].ma50)>parseFloat(ReverseData[count_B].ma100))))) +' C:'+((((parseFloat(ReverseData[count_B].closePrice)/parseFloat(ReverseData[count_B].lowPrice))-1)*100) > -1 )+' D:'+(((((parseFloat(ReverseData[count_B].closePrice)/parseFloat(ReverseData[count_B].lowPriceEight))-1)*100) <= 1 ) && ((((parseFloat(ReverseData[count_B].closePrice)/parseFloat(ReverseData[count_B].lowPriceFour))-1)*100) <= 0.5 ))  )
				console.log('S: '+ReverseData[count_B].symbol+' RSI:'+ReverseData[count_B].rsi+' conditionsMet:'+conditionsMet+'  --- A:'+((parseFloat(ReverseData[count_B].roc20Arr[0])<parseFloat(ReverseData[count_B].roc20Arr[1])) &&  (parseFloat(ReverseData[count_B].roc50Arr[0])<parseFloat(ReverseData[count_B].roc50Arr[1]))   &&  (parseFloat(ReverseData[count_B].roc100Arr[0])<parseFloat(ReverseData[count_B].roc100Arr[1])) &&  (parseFloat(ReverseData[count_B].roc200Arr[0])<parseFloat(ReverseData[count_B].roc200Arr[1])))+' & B:'+(!((parseFloat(ReverseData[count_B].ma20)>parseFloat(ReverseData[count_B].ma50)) && (parseFloat(ReverseData[count_B].ma50)>parseFloat(ReverseData[count_B].ma100))))+' & C:'+((((parseFloat(ReverseData[count_B].closePrice)/parseFloat(ReverseData[count_B].lowPrice))-1)*100) > -1 )+' & D:'+(((((parseFloat(ReverseData[count_B].closePrice)/parseFloat(ReverseData[count_B].closePriceEight))-1)*100) <= 1 ) && ((((parseFloat(ReverseData[count_B].closePrice)/parseFloat(ReverseData[count_B].closePriceFour))-1)*100) <= 0.5 ))+' & E:'+((parseFloat(ReverseData[count_B].ppo[0])<parseFloat(ReverseData[count_B].ppo[1])) && (parseFloat(ReverseData[count_B].ppo[1])<parseFloat(ReverseData[count_B].ppo[2])))+' & F:'+(((((parseFloat(ReverseData[count_B].prevClosePrice))/(parseFloat(ReverseData[count_B].prevOpenPrice)))-1)*100)<2) )
				
				//&&  (oneUnitTest<3)
				var closePriceLess = parseFloat(ReverseData[count_B].closePrice)*0.99;
				if (  ( (closePriceLess>1.02) || (closePriceLess<0.98) ) && (ReverseData[count_B].MA_200 != 0)   && (baseMatch=='USDT')   && (baseMatch==queryBook[i][3])  && (conditionsMet==1) && (ReverseData[count_B].symbol!= 'SUSDUSDT') &&  (ReverseData[count_B].symbol!= 'RVNUSDT') &&  (ReverseData[count_B].symbol!= 'DREPUSDT') &&  (ReverseData[count_B].symbol!= 'SUSHIUSDT') && (ReverseData[count_B].symbol.includes("UPUSDT") == false ) && (ReverseData[count_B].symbol.includes("DOWN") == false ) && (ReverseData[count_B].symbol.includes("OGUSDT") == false )    ) {
					
			  
				
					//console.log('DOES ANYTHING GET HERE ??????????????????????????????????????????????????????????????????????????????????????????????????????');
					discountPercent = 0;
					//selectedCoin =ReverseData[count_B].symbol;									
					console.log('COUNT___>'+count_B+' & SYMBOL: +'+ReverseData[count_B].symbol);
					
					
					var addCoinWs = 1;
					var stopCoin = 1;
					
					//im repeating in the other page.... to save bandwitdth
					var ws_json_B = queryBook[i][4];
					ws_json_B = ws_json_B.filter(function(x){return x !== null});
					for (k=0; k<ws_json_B.length; k++){
						if ((ws_json_B[k].date) && (ws_json_B[k].monitorButtonText == 'Stop Monitoring') ){
													
													//var nowB = moment();
													var dateDur = moment(ws_json_B[k].date);
													var duration = moment.duration(now.diff(dateDur));
													var durationHrs = duration.asHours();
													
													if (durationHrs>0.6){
														//if (durationHrs>1.7){//it will come here if there is something if more than 20 minutes
													
														if (ws_json_B[k].symB == ReverseData[count_B].symbol ){
															addCoinWs=0;
														}
													
													}
													else {
														addCoinWs=0;
													}
													
													
						}
					}
					
					//console.log(' : : addCoinWs: : '+addCoinWs);
					
					
					
					if ((addCoinWs==1) && (short_long=='short') ){
						console.log('DOES IT GET HERE TO ADD???')
						
						//console.log('marginCoins[0].length:'+marginCoins[0].length);
						
						/* var canShort=0;
						for (r=0; r<marginCoins[0].length; r++){
							if ( (marginCoins[0][r].symbol==ReverseData[count_B].symbol) && (marginCoins[0][r].isBuyAllowed==true) && (marginCoins[0][r].isMarginTrade==true) && (marginCoins[0][r].isSellAllowed==true) ) {
								canShort=1;
								console.log('FOUND COIN ON MARGIN LIST');
								
							}
						} */
						
						
						
						
					if (s_snapActSim==0){
						// if (canShort==1){
								//simple fix is that if activate simulation is 1 then break after adding something to the test array.
								
								var addThisToAcc_=1;
								
								console.log(':addThisToAcc A ... _:'+addThisToAcc_);
								
								var ws_ws_json = queryBook[i][5];
								ws_ws_json = ws_ws_json.filter(function(x){return x !== null});
								for (a=0; a<ws_ws_json.length; a++){
									if ( ReverseData[count_B].symbol == ws_ws_json[a].symB ){
										addThisToAcc_=0;
										console.log('SIM UPDATE::: '+ReverseData[count_B].symbol+' Matched so not adding it again..');
										selectedCoin ='';
									}
								}
								
								console.log(':addThisToAcc B ... _:'+addThisToAcc_);
								
								/* if ((((parseFloat(ReverseData[count_B].closePrice)/parseFloat(ReverseData[count_B].openPrice))-1)*100)<-2){//last conditions lnly for acc not test
									addThisToAcc_=0;
									console.log('SHORT Not considering::: '+ReverseData[count_B].symbol+' 2% diff close/open..');
									selectedCoin ='';
								} */
								
								var canShort=0;
								for (r=0; r<marginCoins[0].length; r++){
									if ( (marginCoins[0][r].symbol==ReverseData[count_B].symbol) && (marginCoins[0][r].isBuyAllowed==true) && (marginCoins[0][r].isMarginTrade==true) && (marginCoins[0][r].isSellAllowed==true) ) {
										canShort=1;
										console.log('FOUND COIN ON MARGIN LIST');
										
									}
								}
								
								console.log(':addThisToAcc C ... _:'+addThisToAcc_);
								
								if ((canShort!=1) && (s_flipA==1) ){
									addThisToAcc_=0;
								}
							
								//if (addThisToAcc_==1){
									console.log(':addThisToAcc_ D :'+addThisToAcc_);
								if ((addThisToAcc_==1) && (ws_ws_json.length<2)) {
									selectedCoin =ReverseData[count_B].symbol;
									
									if (s_flipA==1){
										ws_json_B.push({'symB':ReverseData[count_B].symbol,  'monitorButtonText':'Stop Monitoring', 'initialPrice':closePriceLess, 'discountPercent':discountPercent.toString(), 'baseBalance':queryBook[i][2], 'date':now.format('YYYY-MM-DD HH:mm:ss'), 'chart':ReverseData[count_B].chart, 'chart_c':ReverseData[count_B].chart_c,  'model':ReverseData[count_B].model,  'type':'SHORT_SELL',      'closePrice':ReverseData[count_B].closePrice, 'lowPrice':ReverseData[count_B].lowPrice, 'highPrice':ReverseData[count_B].highPrice,   'rsi':ReverseData[count_B].rsi,  'flipped':'no'  });
										firebase.database().ref('/Ins/'+queryBook[i][1]+'_B').set({
											ws_key_B: JSON.parse( JSON.stringify(ws_json_B) ),
										})
										queryBook.push(['TRANSFER_TO_MARGIN', queryBook[i][1], queryBook[i][2], ReverseData[count_B].symbol    ]); //queryBook[i][1] --> Username & queryBook[i][2] --> base balance. ... it needs an accBal...  queryBook[i][6]-->  
									}
									else if (s_flipA==-1){
										ws_json_B.push({'symB':ReverseData[count_B].symbol,  'monitorButtonText':'Stop Monitoring', 'initialPrice':closePriceLess, 'discountPercent':discountPercent.toString(), 'baseBalance':queryBook[i][2], 'date':now.format('YYYY-MM-DD HH:mm:ss'), 'chart':ReverseData[count_B].chart, 'chart_c':ReverseData[count_B].chart_c,  'model':ReverseData[count_B].model,  'type':'SHORT_SELL',      'closePrice':ReverseData[count_B].closePrice, 'lowPrice':ReverseData[count_B].lowPrice, 'highPrice':ReverseData[count_B].highPrice,   'rsi':ReverseData[count_B].rsi,  'flipped':'true'  });
										firebase.database().ref('/Ins/'+queryBook[i][1]+'_B').set({
											ws_key_B: JSON.parse( JSON.stringify(ws_json_B) ),
										})
									}
									
									
								
								
								}
						//}//end of can short if
						/* else {
							console.log('::: '+ReverseData[count_B].symbol+' Cannot be shorted so looking for another coin..');
							selectedCoin ='';
						}  */
						
						 //-------------------------------------------------------------------------
						/// start of TEST ACCOUNT
						//ws_ws_json_AT 
						if (queryBook[i][1] == 'oJhPznC7LyXGnbnFYLxiTUBbudF3'){
							//if (canShort==1){
							
							
								var addThistoSim=1;
								if (ws_ws_json_AT.length<2){
									for (a=0; a<ws_ws_json_AT.length; a++){
										if (( ReverseData[count_B].symbol == ws_ws_json_AT[a].symB )  ){
											addThistoSim=0;
											console.log('short ACCTEST UPDATE::: '+ReverseData[count_B].symbol+' Matched so not adding it again..');
											selectedCoin ='';
										}
									} 
								}
								else {
									addThistoSim=0;
								}
								
								var canShort=0;
								for (r=0; r<marginCoins[0].length; r++){
									if ( (marginCoins[0][r].symbol==ReverseData[count_B].symbol) && (marginCoins[0][r].isBuyAllowed==true) && (marginCoins[0][r].isMarginTrade==true) && (marginCoins[0][r].isSellAllowed==true) ) {
										canShort=1;
										console.log('FOUND COIN ON MARGIN LIST');
										
									}
								}
								
								if ((canShort!=1) && (s_flipA==1) ){
									addThistoSim=0;
								}
								
								console.log('addThistoSim:'+addThistoSim+' & canShort:'+canShort+' & s_snapSimBusy:'+s_snapSimBusy)
								
								if ((addThistoSim==1)   && (ws_ws_json_AT.length<2) && (selectCoinForTestAccount=='') ){ //&& (s_snapSimBusy!='1')
									
									selectedCoin =ReverseData[count_B].symbol;
									selectCoinForTestAccount = ReverseData[count_B].symbol;
								
									var _ws_json_=[];
									snapshot = await firebase.database().ref('/Ins/_testACC__S').once('value').catch((error)=>console.log(error));
									_ws_json_ = (snapshot.val() && snapshot.val().ws_key) || [];
									_ws_json_ = _ws_json_.filter(function(x){return x !== null});
									console.log('short SIM UPDATE::: '+ReverseData[count_B].symbol+' Doesnt exist in array so adding.....');
									//_ws_json_.push({'symB':ReverseData[count_B].symbol,  'monitorButtonText':'Stop Monitoring', 'initialPrice':ReverseData[count_B].closePrice, 'discountPercent':'2', 'premiumPercent':'2.9', 'baseBalance':queryBook[i][2], 'chart':ReverseData[count_B].chart, 'chart_c':ReverseData[count_B].chart_c, 'model':ReverseData[count_B].model, date:now.format('YYYY-MM-DD HH:mm:ss'), 'type':'SHORT_BUY',  origPrice:ReverseData[count_B].price,  'closePrice':ReverseData[count_B].closePrice, 'lowPrice':ReverseData[count_B].lowPrice, 'highPrice':ReverseData[count_B].highPrice, 'canShort':canShort, 'rsi':ReverseData[count_B].rsi,   });
									
									if (s_flipA==1){
										_ws_json_.push({'symB':ReverseData[count_B].symbol,  'monitorButtonText':'Stop Monitoring', 'initialPrice':ReverseData[count_B].closePrice, 'discountPercent':'2', 'premiumPercent':'2.9', 'baseBalance':queryBook[i][2], 'chart':ReverseData[count_B].chart, 'chart_c':ReverseData[count_B].chart_c,  'macd':'N/A', 'model':ReverseData[count_B].model,   'date':now.format('YYYY-MM-DD HH:mm:ss'), 'origPrice':ReverseData[count_B].price, 'rsi':ReverseData[count_B].rsi, '_numTrades':ReverseData[count_B]._numTrades, '_numProfits':ReverseData[count_B]._numProfits, '_expectedProfitPerc':ReverseData[count_B]._expectedProfitPerc, '_biggestLoss':ReverseData[count_B]._biggestLoss, '_netPerRet':ReverseData[count_B]._netPerRet, 'type':'SHORT_BUY', 'flipped':'no' });
										ws_ws_json_AT.push({'symB':ReverseData[count_B].symbol,  'monitorButtonText':'Stop Monitoring', 'initialPrice':ReverseData[count_B].closePrice, 'discountPercent':'2', 'premiumPercent':'2.9', 'baseBalance':queryBook[i][2], 'chart':ReverseData[count_B].chart, 'chart_c':ReverseData[count_B].chart_c,  'macd':'N/A', 'model':ReverseData[count_B].model,   'date':now.format('YYYY-MM-DD HH:mm:ss'), 'origPrice':ReverseData[count_B].price, 'rsi':ReverseData[count_B].rsi, '_numTrades':ReverseData[count_B]._numTrades, '_numProfits':ReverseData[count_B]._numProfits, '_expectedProfitPerc':ReverseData[count_B]._expectedProfitPerc, '_biggestLoss':ReverseData[count_B]._biggestLoss, '_netPerRet':ReverseData[count_B]._netPerRet, 'type':'SHORT_BUY', 'flipped':'no'  });
										console.log('::: '+ReverseData[count_B].symbol+' SHORTING IT..');
										firebase.database().ref('/Ins/_testACC__S').set({
											ws_key: JSON.parse( JSON.stringify(_ws_json_) ),
										})
									
									}
									else if (s_flipA==-1){
										_ws_json_.push({'symB':ReverseData[count_B].symbol,  'monitorButtonText':'Stop Monitoring', 'initialPrice':ReverseData[count_B].closePrice, 'discountPercent':'2', 'premiumPercent':'2.9', 'baseBalance':queryBook[i][2], 'chart':ReverseData[count_B].chart, 'chart_c':ReverseData[count_B].chart_c,  'macd':'N/A', 'model':ReverseData[count_B].model,   'date':now.format('YYYY-MM-DD HH:mm:ss'), 'origPrice':ReverseData[count_B].price, 'rsi':ReverseData[count_B].rsi, '_numTrades':ReverseData[count_B]._numTrades, '_numProfits':ReverseData[count_B]._numProfits, '_expectedProfitPerc':ReverseData[count_B]._expectedProfitPerc, '_biggestLoss':ReverseData[count_B]._biggestLoss, '_netPerRet':ReverseData[count_B]._netPerRet, 'type':'SHORT_BUY', 'flipped':'true'  });
										ws_ws_json_AT.push({'symB':ReverseData[count_B].symbol,  'monitorButtonText':'Stop Monitoring', 'initialPrice':ReverseData[count_B].closePrice, 'discountPercent':'2', 'premiumPercent':'2.9', 'baseBalance':queryBook[i][2], 'chart':ReverseData[count_B].chart, 'chart_c':ReverseData[count_B].chart_c,  'macd':'N/A', 'model':ReverseData[count_B].model,   'date':now.format('YYYY-MM-DD HH:mm:ss'), 'origPrice':ReverseData[count_B].price, 'rsi':ReverseData[count_B].rsi, '_numTrades':ReverseData[count_B]._numTrades, '_numProfits':ReverseData[count_B]._numProfits, '_expectedProfitPerc':ReverseData[count_B]._expectedProfitPerc, '_biggestLoss':ReverseData[count_B]._biggestLoss, '_netPerRet':ReverseData[count_B]._netPerRet, 'type':'SHORT_BUY', 'flipped':'true' });
										console.log('::: '+ReverseData[count_B].symbol+' SHORTING IT..');
										firebase.database().ref('/Ins/_testACC__S').set({
											ws_key: JSON.parse( JSON.stringify(_ws_json_) ),
										})
									}
									
									
									
									
									
								}
								
								
							//}// end of if (canShort==1){
							// else {
								// console.log('::: '+ReverseData[count_B].symbol+'__ Cannot be shorted so looking for another coin..');
								// selectedCoin ='';
							// }
						}
						
						
						///end of TEST ACCOUNT
						//-------------------------------------------------------------------------- 
							
					}
					else {
						//-----------------------------------------
						if (queryBook[i][1] == 'oJhPznC7LyXGnbnFYLxiTUBbudF3'){
							var addThistoSim=1;
							 
							if (ws_ws_json_Sim.length<4){
								var countShorts=0;
								for (a=0; a<ws_ws_json_Sim.length; a++){
									//if (( ReverseData[count_B].symbol == ws_ws_json_Sim[a].symB ) && (ws_ws_json_Sim[a].type=='SHORT_BUY') ){
									if (( ReverseData[count_B].symbol == ws_ws_json_Sim[a].symB )  ){
										addThistoSim=0;
										console.log('short SIM UPDATE::: '+ReverseData[count_B].symbol+' Matched so not adding it again..');
										selectedCoin ='';
									}
									
									if (ws_ws_json_Sim[a].type=='SHORT_BUY'){
										countShorts++;
									}
									
								}

								
								
							}
							else {
								addThistoSim=0;
							}
							
							
							console.log('addThistoSim:'+addThistoSim+' & canShort:'+canShort+' & s_snapSimBusy:'+s_snapSimBusy)
						
							if ((addThistoSim==1) && (countShorts<2)   ){ //&& (s_snapSimBusy!='1')
								
								var _ws_json_=[];
								snapshot = await firebase.database().ref('/Ins/_test__S').once('value').catch((error)=>console.log(error));
								_ws_json_ = (snapshot.val() && snapshot.val().ws_key) || [];
								_ws_json_ = _ws_json_.filter(function(x){return x !== null});
								
								//if (canShort==1){
								//if ((canShort==1) || (canShort==0) ){
														
									console.log('short SIM UPDATE::: '+ReverseData[count_B].symbol+' Doesnt exist in array so adding.....');
												
									
								
									//_ws_json_ = (snapshot.val() && snapshot.val().ws_key_short_B) || [];
									//_ws_json_.push({'symB':ReverseData[count_B].symbol,  'monitorButtonText':'Stop Monitoring', 'initialPrice':(ReverseData[count_B].lP_).toString(), 'discountPercent':'2', 'premiumPercent':'2.9', 'baseBalance':queryBook[i][2], 'chart':ReverseData[count_B].chart, 'chart_c':ReverseData[count_B].chart_c, 'model':ReverseData[count_B].model, date:now.format('YYYY-MM-DD HH:mm:ss'), 'type':'SHORT_BUY',  origPrice:ReverseData[count_B].price,  'closePrice':ReverseData[count_B].closePrice, 'lowPrice':ReverseData[count_B].lowPrice, 'highPrice':ReverseData[count_B].highPrice, 'canShort':canShort, 'rsi':ReverseData[count_B].rsi,   });
									_ws_json_.push({'symB':ReverseData[count_B].symbol,  'monitorButtonText':'Stop Monitoring', 'initialPrice':ReverseData[count_B].closePrice, 'discountPercent':'2', 'premiumPercent':'2.9', 'baseBalance':queryBook[i][2], 'chart':ReverseData[count_B].chart, 'chart_c':ReverseData[count_B].chart_c, 'model':ReverseData[count_B].model, date:now.format('YYYY-MM-DD HH:mm:ss'), 'type':'SHORT_BUY',  origPrice:ReverseData[count_B].price,  'closePrice':ReverseData[count_B].closePrice, 'lowPrice':ReverseData[count_B].lowPrice, 'highPrice':ReverseData[count_B].highPrice, 'canShort':canShort, 'rsi':ReverseData[count_B].rsi,   });
									//extra for this .js page so that it does not repeat the coin twice in the sim... 
									
									//ws_ws_json_Sim.push({'symB':ReverseData[count_B].symbol,  'monitorButtonText':'Stop Monitoring', 'initialPrice':(ReverseData[count_B].lP_).toString(), 'discountPercent':'2', 'premiumPercent':'2.9', 'baseBalance':queryBook[i][2], 'chart':ReverseData[count_B].chart, 'chart_c':ReverseData[count_B].chart_c,  'model':ReverseData[count_B].model,   date:now.format('YYYY-MM-DD HH:mm:ss'), 'type':'SHORT_BUY',  origPrice:ReverseData[count_B].price,  'closePrice':ReverseData[count_B].closePrice, 'lowPrice':ReverseData[count_B].lowPrice, 'highPrice':ReverseData[count_B].highPrice, 'canShort':canShort, 'rsi':ReverseData[count_B].rsi,  });
									ws_ws_json_Sim.push({'symB':ReverseData[count_B].symbol,  'monitorButtonText':'Stop Monitoring', 'initialPrice':ReverseData[count_B].closePrice, 'discountPercent':'2', 'premiumPercent':'2.9', 'baseBalance':queryBook[i][2], 'chart':ReverseData[count_B].chart, 'chart_c':ReverseData[count_B].chart_c,  'model':ReverseData[count_B].model,   date:now.format('YYYY-MM-DD HH:mm:ss'), 'type':'SHORT_BUY',  origPrice:ReverseData[count_B].price,  'closePrice':ReverseData[count_B].closePrice, 'lowPrice':ReverseData[count_B].lowPrice, 'highPrice':ReverseData[count_B].highPrice, 'canShort':canShort, 'rsi':ReverseData[count_B].rsi,  });
									console.log('::: '+ReverseData[count_B].symbol+' SHORTING IT..');
									
									firebase.database().ref('/Ins/_test__S').set({
										ws_key: JSON.parse( JSON.stringify(_ws_json_) ),
									})
								//}
								 //else {
								//	console.log('::: '+ReverseData[count_B].symbol+' Cannot be shorted so looking for another coin..');
								//	selectedCoin ='';
								//} 
								
								
								
								
								if (ws_ws_json_Sim.length<2){
									if (baseMatch == 'BTC'){
										firebase.database().ref('/general/').update({
											btc_simulationBusy: '1',
										})
									}
									else if (baseMatch == 'USDT'){
										firebase.database().ref('/general/').update({
											short_usdt_simulationBusy: '1',
										})
									}
								}
								
							}
						}

							
					}
						
						
							
							
						
					
								//
						
						
						
												
						
					}
					

				}				
										
										count_B++;
			}
			
			//if ((selectedCoin=='') && ((s_snapSimBusy!='1') || ((s_snapSimBusy=='1') && (s_snapActSim=='0') ) ) ){
			//	console.log('__________________________________________________')
			//	console.log('IT WAS STILL EMPTY SO IT WILL SHORT...');
			//	queryBook.push(['SHORT_COIN', queryBook[i][1], queryBook[i][2], queryBook[i][3], queryBook[i][4], queryBook[i][5],   ]); //7 & 8..///queryBook[i][8]
			//}
			
	  }
	  
	   queryBook.splice(i, 1);
		i--;
  }
  
 
  //delete queryBook[i];
}

//console.log(' marginCoins:: ');
//console.log(marginCoins);
//console.log(marginCoins[0].length);

	//fs.writeFile('1queryBook.json', JSON.stringify(queryBook), 'utf8', function (err) {
	//	if (err) {
	//		console.log("An error occured while writing JSON Object to File.");
	//		return console.log(err);
	//	}	
	//	//console.log("FINAL JSON file has been saved.");
	//});
	
	var fs_p = require('fs').promises;
	try {
		await fs_p.writeFile('1queryBook.json', JSON.stringify(queryBook));
		//console.info("File created successfully with Node.js v13 fs_p.promises!");
	} catch (error){
		console.error(error);
	}


	var d = new Date();
	console.log('Time End:'+d);
	
	return listOfArguments.length;
}

module.exports ={
        lookForShortFunc
    }