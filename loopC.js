//import * as firebase from 'firebase';
//import {firebaseConfig} from './config';
//if (!firebase.apps.length) {
 //   firebase.initializeApp(firebaseConfig);
//}

var firebase = require('firebase');
var Binance = require('binance-api-node').default
//const { setIntervalAsync } = require('set-interval-async/fixed')





var app = firebase.initializeApp({
    apiKey: "AIzaSyBLHqWvuqJBI2IlFbirNXZRZBO5RYXNUhg",
    authDomain: "basicbinancebot.firebaseapp.com",
    databaseURL: "https://basicbinancebot.firebaseio.com",
    projectId: "basicbinancebot",
    storageBucket: "basicbinancebot.appspot.com",
    messagingSenderId: "879608315516"
  });
  
  
var moment = require('moment');
var now = moment();



//return firebase.database().ref('/BOT-BUY/' +now.format('YYYY-MM-DD HH')+  ).once('value').then(function(snapshot) {
//		var symB = (snapshot.val(). && snapshot.val().username) || 'Anonymous';
  // ...
//});

 



//var myVarA = setInterval(algoLoopA, 60000);//1 minutes.

//algoLoopB();

//var myVarB = setInterval(algoLoopB, 451000);//7 minutes.

algoLoopC();
var timeVar = 61500*16; 
var myVarC = setInterval(algoLoopC, timeVar);//16 minutes.
//var myVarD = setInterval(algoLoopD, 451000);//7 minutes.

//var timeVar = 1000*5;
//var myVarC = setIntervalAsync(algoLoopC, timeVar);//2 minutes.

//var timeBreak = 1000*10;
//async function go () {
//	await algoLoopC();
//    setTimeout(go, timeBreak); // callback
//}
//go();






















async function algoLoopD(){
	
	console.log('loop D');
	console.log('___________________________________________________');
	
	var moment = require('moment');
		var now = moment();
		var client = Binance();
		
		//snapJson = 
		var fs = require('fs');
		
		//loop here...
		
		var finalListJson = {};
		
		var snapTextFinal = fs.readFileSync('finalPotentialCoins.json','utf8');
		if (snapTextFinal){
			finalListJson = JSON.parse(snapTextFinal);
			console.log('Final Potential Coins File....');
			console.log(finalListJson);
		}
		
		
		for (h=0; h<2; h++){
			var filePath = '';
			if (h==0){
				filePath='30m';
			}
			else if (h==1){
				filePath='1h';
			}
			
			//var snapJson = {};
			var snapJson = []
			
			
		
		var snapText = fs.readFileSync('potentialCoins'+filePath+'.json','utf8');
		if (snapText){
			//console.log(text)
			//var jsonText = JSON.parse(snapText);
		//	console.log(jsonText);
			snapJson = JSON.parse(snapText);
		}
		
		let p=0;
		let newSnapData = [];
		for (x in snapJson) {
			//snapJson[x]['dateNum'] = snapJson[x].date;
			newSnapData[p] = snapJson[x];
			//newSnapData[p].dateNum = snapJson[x].date;
			p++;
		}
		
		//console.log('newSnapData---');
		//console.log(newSnapData);
		
		//var freshArray = [];
		var finalDelArr = {};
		
		
		for (e=0; e<newSnapData.length; e++){
			
			//console.log('OLD newSnapData[e]');
			//console.log(newSnapData[e]);
			//var sorted = newSnapData[e].sort();
			
			 newSnapData[e].sort(function(a, b){return b.dateNum - a.dateNum});
			 
			//console.log('Fixed newSnapData[e]');
			//console.log(newSnapData[e]);

			var _ReverseData = newSnapData[e].reverse();
			
			var catchUp =0;
			if (_ReverseData.length>5){
				var diff = _ReverseData.length-5;
				while (catchUp<diff){
					_ReverseData.shift();
					
					catchUp++;
				}
			}
			
			//console.log('Fixed _ReverseData--');
			//console.log(_ReverseData)
			
			newSnapData[e] = _ReverseData;
		}
		
		for (e=0; e<newSnapData.length; e++){
			
			//console.log('newSnapData[e] below:');
				var newObj = newSnapData[e][newSnapData[e].length-1].symbol;
				//freshArray[newObj] = newSnapData[e];
				//console.log(freshArray);
				//console.log(newSnapData[e].length);
				
				
				if (!Array.isArray(finalDelArr[newObj])) {
					finalDelArr[newObj] = [];
				}
				//push into finalDelArr here...
				//finalDelArr[newObj].push(newSnapData[e]);	
				finalDelArr[newObj] = newSnapData[e];	
			
			//console.log('Selected One:...');
			//console.log(newSnapData[e][newSnapData[e].length-1]);
			//console.log(newSnapData[e]);
			//console.log(newSnapData[e].length);
			const _ReverseData = newSnapData[e].reverse();
			//console.log(_ReverseData);
			//console.log(_ReverseData.length);
			
			if (_ReverseData.length>2){
				if ((_ReverseData[0].MACD>_ReverseData[1].MACD>_ReverseData[2].MACD) && ((_ReverseData[0].RSI<18) || (_ReverseData[1].RSI<18))   ){
					console.log('OMG IT FOUND SOMETHING>>>'+_ReverseData[0].symbol);
					
					//just add to potential coins...
					//var pNewObj = _ReverseData[0].symbol;
					if (!Array.isArray(finalListJson)) {
						finalListJson = [];
					}
				//	//push into finalDelArr here...
					//finalListJson[pNewObj] = newSnapData[e];
					
					//
					
					//
					
					
					var addIt = 'YES';
					if (finalListJson.length>0){
						for (var w=0; w<finalListJson.length; w++){
							if ((finalListJson[w].symbol==_ReverseData[0].symbol) && (finalListJson[w].chart==_ReverseData[0].chart) ){
								addIt='NO';
							}
						}
				
						if (addIt =='YES'){
							console.log('BEFORE :Final Potential Coins File....');
							console.log(finalListJson);
					
							var obj = {
								date: now.format('YYYY-MM-DD HH:mm:ss'),
								symbol:_ReverseData[0].symbol,
									price: parseFloat(_ReverseData[0].price),
								vol:parseFloat(_ReverseData[0].vol),
								chart : _ReverseData[0].chart,
								chart_c:0,
								RSI_Two:_ReverseData[0].RSI,
								macd: _ReverseData[0].MACD
							};
					
							finalListJson.push(obj);
					
							console.log('AFTER :Final Potential Coins File....');
							console.log(finalListJson);
						}
						else {
							console.log('Not adding '+_ReverseData[0].symbol+' '+_ReverseData[0].chart+' because it already exists...')
						}
					

			
					}
					else {
						console.log('BEFORE :Final Potential Coins File....');
						console.log(finalListJson);
					
						var obj = {
							date: now.format('YYYY-MM-DD HH:mm:ss'),
							symbol:_ReverseData[0].symbol,
							price: parseFloat(_ReverseData[0].price),
							vol:parseFloat(_ReverseData[0].vol),
							chart : _ReverseData[0].chart,
							chart_c:0,
							RSI_Two:_ReverseData[0].RSI,
							macd: _ReverseData[0].MACD
						};
					
						finalListJson.push(obj);
					
						console.log('AFTER :Final Potential Coins File....');
						console.log(finalListJson);
					}
			
					
					
					
					//c++;
				}
				
				
				if ((_ReverseData[0].MACD>_ReverseData[1].MACD>_ReverseData[2].MACD) && ((_ReverseData[0].RSI<18) || (_ReverseData[1].RSI<18)) && (_ReverseData[0].symbol=='BTCUSDT')   ){
					
					var s__finalListJson = {};
					
					if (!Array.isArray(s__finalListJson)) {
						s__finalListJson = [];
					}
					
					var obj = {
							date: now.format('YYYY-MM-DD HH:mm:ss'),
							symbol:_ReverseData[0].symbol,
							price: parseFloat(_ReverseData[0].price),
							vol:parseFloat(_ReverseData[0].vol),
							chart : _ReverseData[0].chart,
							chart_c:0,
							RSI_Two:_ReverseData[0].RSI,
							macd: _ReverseData[0].MACD
						};
					
						s__finalListJson.push(obj);
						
						fs.writeFile('final_btcUSDT20.json', JSON.stringify(s__finalListJson), 'utf8', function (err) {
						if (err) {
							console.log("An error occured while writing JSON Object to File.");
							return console.log(err);
						}	
						console.log("BTCUSDT20 JSON file has been saved.");
					});
					
				}
				
				
				if ((_ReverseData[0].MACD<_ReverseData[1].MACD<_ReverseData[2].MACD) && ((_ReverseData[0].RSI>80) || (_ReverseData[1].RSI>80)) && (_ReverseData[0].symbol=='BTCUSDT')   ){
					
					var s__finalListJson = {};
					
					if (!Array.isArray(s__finalListJson)) {
						s__finalListJson = [];
					}
					
					var obj = {
							date: now.format('YYYY-MM-DD HH:mm:ss'),
							symbol:_ReverseData[0].symbol,
							price: parseFloat(_ReverseData[0].price),
							vol:parseFloat(_ReverseData[0].vol),
							chart : _ReverseData[0].chart,
							chart_c:0,
							RSI_Two:_ReverseData[0].RSI,
							macd: _ReverseData[0].MACD
						};
					
						s__finalListJson.push(obj);
						
					fs.writeFile('final_btcUSDT80.json', JSON.stringify(s__finalListJson), 'utf8', function (err) {
						if (err) {
							console.log("An error occured while writing JSON Object to File.");
							return console.log(err);
						}	
						console.log("BTCUSDT80 JSON file has been saved.");
					});
					
				}
				
				
			}
			
		}
		
			//console.log('3...:...');
			//console.log(finalListJson);
		
					fs.writeFile('potentialCoins'+filePath+'.json', JSON.stringify(finalDelArr), 'utf8', function (err) {
						if (err) {
							console.log("An error occured while writing JSON Object to File.");
							return console.log(err);
						}	
						console.log("BIG JSON file has been saved.");
					});
			
			
		}
		
		//console.log('potentialCoins:...');
		//console.log(finalListJson);
		fs.writeFile('finalPotentialCoins.json', JSON.stringify(finalListJson), 'utf8', function (err) {
						if (err) {
							console.log("An error occured while writing JSON Object to File.");
							return console.log(err);
						}	
						console.log("FINAL JSON file has been saved.");
					});
		
		
		
		
		
		
		
		
	
	//console.log('Opportunities:'+c+' & original length:'+newData.length);
	
	//algoLoopBTCUSDT();
}




async function algoLoopC(){
	
	algoLoopD();
	
	
	
	console.log('loop C');
	var d = new Date();
	console.log('Time Start:'+d);
	
	var moment = require('moment');
		var now = moment();
		
		firebase.database().ref('/Background_TaskB/' +now.format('YYYY-MM-DD')+'/'+now).set({
			date: now.format('YYYY-MM-DD HH:mm:ss'),
			msg:'A - SCHEDULED NODE TASK',
			
		})
	
	
		console.log('___________________________________________________');
		//var ws_user = kSnapData[j___];
		var moment = require('moment');
		var now = moment();
		var client = Binance();
		
		
		const responsePrices = await client.dailyStats().catch((error)=>console.log(error));
		//console.log(responsePrices);
		for (i=0; i<responsePrices.length; i++){
			if ( ((responsePrices[i].symbol.substr(-4).toUpperCase()=='USDT') || (responsePrices[i].symbol.substr(-3).toUpperCase()=='BTC') ) && (responsePrices[i].symbol!='VENBTC') ){
				//console.log(responsePrices[i].symbol);
				
				for (j=0; j<2; j++){
					let intervalParam = '';
					if (j==0){ 	intervalParam = '30m';}
					if (j==1){ 	intervalParam = '1h'; }
					
					let candlesForCoin = await client.candles({ symbol: responsePrices[i].symbol, interval:intervalParam, limit:28 }).catch((error)=>console.log(error));
					//console.log('---'+responsePrices[i].symbol);
					//console.log(candlesForCoin);
					
					var latestPrices = await client.prices().catch((error)=>console.log(error));
					if (latestPrices[responsePrices[i].symbol]){
						var lP = latestPrices[responsePrices[i].symbol];
					}
					else {
						var lP=0;
					}
					
					var ma12Period = 0;
									for (q=1; q<=12; q++){//2-13
										if (candlesForCoin[candlesForCoin.length-q]){
											ma12Period += +candlesForCoin[candlesForCoin.length-q].close;
										}
									}
									var initialEMA12 = ma12Period/12;
									var smoothingConstant12 = 2/(12+1);
									var EMA12 = (lP-initialEMA12)*smoothingConstant12+initialEMA12;
									var ma26Period = 0;
									for (q=1; q<=26; q++){//correct used fingers 2-27
										if (candlesForCoin[candlesForCoin.length-q]){
											ma26Period += +candlesForCoin[candlesForCoin.length-q].close;
										}
									}
									var initialEMA26 = ma26Period/26;
									var smoothingConstant26 = 2/(26+1);
									var EMA26 = (lP-initialEMA26)*smoothingConstant26+initialEMA26;
									var macd = EMA12-EMA26;
									
									var adva=0;
									var decl=0;
									for (r=1; r<=14; r++){
										if (candlesForCoin[candlesForCoin.length-r]){
											var s=r+1
											var chg= parseFloat(candlesForCoin[candlesForCoin.length-r].close) - parseFloat(candlesForCoin[candlesForCoin.length-s].close);
											if (chg>0){
												adva=adva+chg;
												var t=r-1;
											//	console.log('For '+t+' gain of '+chg);
											}
											if (chg<0){
												decl=decl+chg;//+ - makes a - so this is right;
												var t=r-1;
											//	console.log('For '+t+' loss of '+chg);
											}
											
										}
									}
									var absDecl=decl*(-1);
									var avgGain=adva/14;
									var avgLoss=absDecl/14;
									var firstRS=avgGain/avgLoss;
									var RSIOne = 100-(100/(1+firstRS));
									var recentChange = lP - parseFloat(candlesForCoin[candlesForCoin.length-1].close);
									var recentAdva=0;
									var recentDecl=0;
									if (recentChange>0){
										recentAdva=recentChange;
									}
									if (recentChange<0){
										recentDecl=recentChange*(-1);
									}
									
									var smoothedRS =  (((avgGain*13)+recentAdva)/14) / (((avgLoss*13)+recentDecl)/14);
									var RSITwo = 100-(100/(1+smoothedRS));
									
									
									var moment = require('moment');
										var now = moment();
										var chartCode=0;
										
										if ( (intervalParam=='30m') || (intervalParam=='1h')   ) {
											
											//console.log('--------------- '+responsePrices[i].symbol+' at '+ intervalParam +'RSITwo:'+RSITwo);
											
											if (intervalParam=='1h'){
												chartCode=1;
											}
									
											if ( (parseFloat(responsePrices[i].lastPrice) >0) && (parseFloat(responsePrices[i].volume)>0)   ){
												//firebase.database().ref('/TrackingData/'+responsePrices[i].symbol+'/'+intervalParam).once('value').then( snapshot => {
												//	if (!snapshot.val()){
												//		firebase.database().ref('/TrackingData/'+now.format('YYYY-MM-DD')+'/'+responsePrices[i].symbol+'/'+intervalParam+'/'+now.format('YYYY-MM-DD HH:mm:ss')).set({
												//			date: now.format('YYYY-MM-DD HH:mm:ss'),
												//			symbol:responsePrices[i].symbol,
												//			price: parseFloat(responsePrices[i].lastPrice),
												//			vol:parseFloat(responsePrices[i].volume),
												//			chart : intervalParam,
												//			chart_c:chartCode,
												//			RSI:RSITwo,
												//			MACD:macd	
												//		})
												//		
												//	}
												//})
												
												//from here/
												var fs = require('fs');
												var data = []
												//var data = []
												var text = fs.readFileSync('potentialCoins'+intervalParam+'.json','utf8');
														if (text){	
														//console.log(text)
															var jsonText = JSON.parse(text);
															//console.log(jsonText);
															data = jsonText;
														}
														
														//wont add to a  coin if its exactly the same as old one...
														//console.log('extracted data...');
														//console.log(data);
														let p=0;
														let specificSnapData = [];
														for (x in data) {
															if (x == responsePrices[i].symbol){
																data[x].sym = x;
																specificSnapData[p] = data[x];
																p++;
															}
														}
														//console.log('specificSnapData below:');
														//console.log(specificSnapData);
														
														//console.log(newSnapData[newSnapData.length-1]);
			
														//for (e=0; e<specificSnapData.length; e++){
														//	if (specificSnapData[e].length>2){
																//console.log('specificSnapData[e] below:');
																//console.log(specificSnapData[e][specificSnapData[e].length-1]);
																//console.log(specificSnapData[e].length);		
														//	}
														//}
														if (specificSnapData[0] ===undefined){
																tableSym = responsePrices[i].symbol;
																if (!Array.isArray(data[tableSym])) {
																	data[tableSym] = [];
																}
																
																var moment = require('moment');
																var now = moment();
																
																var obj = {
																	date: now.format('YYYY-MM-DD HH:mm:ss'),
																	dateNum: parseFloat(now.format('x')),
																	symbol:responsePrices[i].symbol,
																	price: parseFloat(responsePrices[i].lastPrice),
																	vol:parseFloat(responsePrices[i].volume),
																	chart : intervalParam,
																	chart_c:chartCode,
																	RSI:RSITwo,
																	MACD:macd	
																};
																	data[tableSym].push(obj);	
																	
																//	console.log('1...:...');
																//	console.log(data);
																	
																	fs.writeFile('potentialCoins'+intervalParam+'.json', JSON.stringify(data), 'utf8', function (err) {
																		if (err) {
																			console.log("An error occured while writing JSON Object to File.");
																			return console.log(err);
																		}	
																		console.log("1 JSON file has been saved.");//was an error here....
																	});
																//
														}
														else if (specificSnapData[0] !==undefined){
															if ( (specificSnapData[0][specificSnapData[0].length-1].MACD != macd ) && (specificSnapData[0][specificSnapData[0].length-1].RSI != RSITwo) ){//this is correct
															
																//console.log(specificSnapData[0][specificSnapData[0].length-1]);
																//console.log(specificSnapData[0].length);
																
																tableSym = responsePrices[i].symbol;
																if (!Array.isArray(data[tableSym])) {
																	data[tableSym] = [];
																}
																
																var moment = require('moment');
																var now = moment();
																
																var obj = {
																	date: now.format('YYYY-MM-DD HH:mm:ss'),
																	dateNum: parseFloat(now.format('x')),
																	symbol:responsePrices[i].symbol,
																	price: parseFloat(responsePrices[i].lastPrice),
																	vol:parseFloat(responsePrices[i].volume),
																	chart : intervalParam,
																	chart_c:chartCode,
																	RSI:RSITwo,
																	MACD:macd	
																};
																
																console.log(obj);
																
																
																	data[tableSym].push(obj);	
																	
															//		console.log('2...:...');
																//	console.log(data);
																	fs.writeFile('potentialCoins'+intervalParam+'.json', JSON.stringify(data), 'utf8', function (err) {
																		if (err) {
																			console.log("An error occured while writing JSON Object to File.");
																			return console.log(err);
																		}	
																		console.log("2 JSON file has been saved.");
																	});
																//
															}
														}
														//else {
															//console.log(specificSnapData[0][specificSnapData[0].length-1]);
															//console.log(specificSnapData[0].length);
															//console.log('It matches so not adding...')
														//}
														
														
														
														
														
														
															
													//above here
															
														
														
												
												
											}
										}
									
					
					//-//
				}
				
				
			}
		}
		
						

var d = new Date();
	console.log('Time End:'+d);		
		
}













//uploadKeys();
async function uploadKeys(){
	var moment = require('moment');
	var now = moment();
	var fs = require('fs');
	
	var text = fs.readFileSync('wallets/BitcoinKeys.csv','utf8')
	console.log(text);
	
	var textArr = text.split('\n');
	
	for (s=0; s<textArr.length-1; s++){
		var lineArr = textArr[s].split(',');
		var lineArrSlice = (lineArr[1]).slice(1, -2);
		
		console.log('lS:...'+lineArrSlice);
		
		firebase.database().ref('availableKeys/'+lineArrSlice).set({
			date: now.format('YYYY-MM-DD HH:mm:ss'),
			key: lineArrSlice,
			index:lineArr[0]
		})
	}
	
	
	
	
	
	
}

//removeOtherKey();
async function removeOtherKey(){
	var fs = require('fs');
	
	console.log('New Function Ran...');
	//it must delete btckeys after uploading...
	//it must list the date uploaded...
	
	
		var text = fs.readFileSync('wallets/BitcoinKeys.csv','utf8')
		console.log(text);
		
		var textArr = text.split('\n');
		
		console.log(textArr);
		
		var newLine ='';
		//fs.writeFile('wallets/BitcoinKeys.csv', '', function(err) {});
		
		for (s=0; s<textArr.length; s++){
			var lineArr = textArr[s].split(',');
			//for (r=0; r<lineArr.length; r++){
				//console.log('r:'+r+' & strings'+lineArr[r]);
				newLine=newLine+lineArr[0]+','+lineArr[1]+'\r\n';
				
				//fs.appendFile('wallets/BitcoinKeys.csv', lineArr[0]+','+lineArr[1]+'\n', function (err) {
				//	if (err) throw err;
				//	//console.log('Saved!');
				//});
				
			//}
			
		}
		
		console.log('newLine Below:');
		console.log(newLine);
		
		fs.writeFile('wallets/BitcoinKeys.csv', newLine, function(err) {})
		//fs.writeFile('wallets/BitcoinKeys.csv', newLine, function (err) {if (err) throw err;});
		
		//for (s=0; s<textArr.length; s++){
			//var s=0;
			//while(s<textArr.length){
			//	if (s % 2 == 0){
			//		//add to database.... s & s+1;
			//		s=s+2;
			//	}
			//}
	
	
}

//AI();
async function AI() {
	console.log('AI function is running');
	
	var client = Binance();
	const brain = require('brain.js');//console.log(await client.candles({ symbol: 'YOYOBTC' })).catch((error)=>console.log(error));
	var responseJson = await client.candles({ symbol: 'YOYOBTC', interval:'30m' }).catch((error)=>console.log(error));
	var closingPrices = [];
	var j=0;
	for (i=0; i<responseJson.length; i++){
		//console.log(responseJson[i].close);
		closingPrices[i]=parseFloat(responseJson[i].close);
	}
	//console.log('Closing Prices below:');
	//console.log(closingPrices);
	const net = new brain.recurrent.RNNTimeStep();
	net.train([
		[2,4,6,8,10,12,14]
	]);
	//const output = net.run([1, 2]);  // 3
	const forcastOutput = net.forecast([22,24], 3);
	//console.log('prob: '+output);
	console.log('forecast below:');
	console.log(forcastOutput);
	var d = new Date();
	console.log(d.toLocaleTimeString());
	
	
	
	
	var d = new Date();
	console.log(d.toLocaleTimeString());
}