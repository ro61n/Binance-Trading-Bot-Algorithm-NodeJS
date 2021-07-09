


async function algoLoopD(){
	

	
	//console.log('loop D');
	//console.log('___________________________________________________');
	
	var moment = require('moment');
		var now = moment();
		
		var fs = require('fs');
		
		//loop here...
		
		var finalListJson = [];
		//var finalListJsonB = [];
		var finalListJsonB = [];
		
		var snapTextFinal = fs.readFileSync('finalPotentialCoins.json','utf8');
		if (snapTextFinal){
			finalListJson = JSON.parse(snapTextFinal);
		}
		
		var snapTextFinalB = fs.readFileSync('short_list.json','utf8');
		if (snapTextFinalB){
			finalListJsonB = JSON.parse(snapTextFinalB);
		}
		
		
		//for (h=0; h<5; h++){
		for (h=0; h<1; h++){
			var filePath = '';
			if (h==0){
				filePath='30m';
			}
			else if (h==1){
				filePath='1h';
			}
			else if (h==2){
				filePath='2h';
			}
			else if (h==3){
				filePath='4h';
			}
			else if (h==4){
				filePath='1d';
			}
			
			var snapJson = {};
			//var snapJson = []
			
			
		
		var snapText = fs.readFileSync('potentialCoins'+filePath+'.json','utf8');
		if (snapText){
			
			snapJson = JSON.parse(snapText);
		}
		
		let p=0;
		let newSnapData = [];
		//let newSnapDataB = [];
		let newSnapDataC = [];
		
		for (x in snapJson) {
			newSnapData[p] = snapJson[x];
			p++;
		}
		
		//var freshArray = [];
		var finalDelArr = {};
		
		
		for (e=0; e<newSnapData.length; e++){
			
			newSnapData[e].sort(function(a, b){return b.dateNum - a.dateNum});
			 
			var _ReverseData = newSnapData[e].reverse();
			
			var catchUp =0;
			if (_ReverseData.length>5){
				var diff = _ReverseData.length-5;
				while (catchUp<diff){
					_ReverseData.shift();
					
					catchUp++;
				}
			}
			
			newSnapData[e] = _ReverseData;
			newSnapDataC[e]=_ReverseData;
			
			//----------------------------------------------------------------
				var newObj = newSnapData[e][newSnapData[e].length-1].symbol;
				if (!Array.isArray(finalDelArr[newObj])) {
					finalDelArr[newObj] = {}; //testing
				}
				finalDelArr[newObj] = newSnapData[e];
			///----------------------------------------------------------
			
			
		}
		
		var fs_p = require('fs').promises;
	
			try {
				await fs_p.writeFile('potentialCoins'+filePath+'.json', JSON.stringify(finalDelArr));
				//console.info("................////////////should be right but isnt...!"+'potentialCoins'+filePath+'.json');
			} catch (error){
				console.error(error);
			}
		
		var totUSDT_RSI = 0;
		var count_averageUSDT_RSI = 0;
		
		//----------------------- --    original below
		
		for (e=0; e<newSnapData.length; e++){
			
			
			
			
			const _ReverseData = newSnapData[e].reverse();
		//	console.log('latest reversedata below:');
		//	console.log(_ReverseData[0]);
			//const _ReverseData = newSnapData[e]; // it is no longer reversed... 
			
			
			
			//if ((_ReverseData.length>1) && (filePath=='30m') ){
				//console.log(' D PART: _ReverseData.length: '+_ReverseData.length)
				
			if (_ReverseData.length>=1){
				
				//&& (_ReverseData[0].symbol.includes("VEN") == false ) && (_ReverseData[0].symbol.includes("BEAR") == false ) && (_ReverseData[0].symbol.includes("BULL") == false ) && (_ReverseData[0].symbol.includes("BCHABC") == false )       && (_ReverseData[0].symbol.includes("BCHSV") == false )
				
				if (  ((_ReverseData[0].roc20Arr[0]>_ReverseData[0].roc20Arr[1]) && (_ReverseData[0].roc50Arr[0]>_ReverseData[0].roc50Arr[1])  && (_ReverseData[0].roc100Arr[0]>_ReverseData[0].roc100Arr[1]) && (_ReverseData[0].roc200Arr[0]>_ReverseData[0].roc200Arr[1]))
					&& (_ReverseData[0].sma20>0) && (_ReverseData[0].sma50>0) && (_ReverseData[0].sma100>0) && (_ReverseData[0].sma200>0)
					&& (_ReverseData[0].symbol.includes("AUD") == false ) && (_ReverseData[0].symbol.includes("USDS") == false ) && (_ReverseData[0].symbol.includes("TUSD") == false ) && (_ReverseData[0].symbol.includes("PAX") == false )  && (_ReverseData[0].symbol.includes("EUR") == false )   && (_ReverseData[0].symbol.includes("BUSD") == false )  &&  (_ReverseData[0].symbol.includes("USDC") == false )  &&  (_ReverseData[0].symbol.includes("GBP") == false ) &&  (_ReverseData[0].symbol.includes("DAI") == false )       
					
				
				) {
				
						console.log('LONG: FOUND SOMETHING>>>'+_ReverseData[0].symbol+' '+filePath);
					
					//just add to potential coins...
					
					if (!Array.isArray(finalListJson)) {
						finalListJson = [];
					}
				
					
					
					var addIt = 'YES';
					if (finalListJson.length>0){
						for (var w=0; w<finalListJson.length; w++){
							
							if ((finalListJson[w].symbol==_ReverseData[0].symbol) && (filePath=='30m') && (_ReverseData[0].MA_200!=0) ){  ///  (finalListJson[w].chart==_ReverseData[0].chart)
								addIt='NO';
								
								//console.log('Replacing variables for '+_ReverseData[0].symbol+' '+_ReverseData[0].chart+' because it already exists...');
								
								//replace it here...
								finalListJson[w].date=now.format('YYYY-MM-DD HH:mm:ss');
								finalListJson[w].price=parseFloat(_ReverseData[0].price);
								finalListJson[w].vol = parseFloat(_ReverseData[0].vol);
								finalListJson[w].vol_BTC = parseFloat(_ReverseData[0].vol_BTC);
								
								finalListJson[w].model = 'RSI model';
								
								
							}
							
							
							
							//if ((filePath=='1h') && (finalListJson[w].symbol==_ReverseData[0].symbol)){
							//	console.log('1 hour ACTUALLY WORKS...+: '+finalListJson[w].symbol);
							//}
							
							
							
							/* if ((finalListJson[w].symbol==_ReverseData[0].symbol) && (finalListJson[w].chart=='30m') && (filePath=='1h') && (_ReverseData[0].MA_200!=0) ){
								addIt='NO';
								
								finalListJson[w].chart ='1h';
								finalListJson[w].chart_c = 1;
								
								console.log('================================================================')
								console.log('CHANGED TO AN HOUR... _ReverseData[0].symbol: '+_ReverseData[0].symbol);
							} */
							
							/* if ((finalListJson[w].symbol==_ReverseData[0].symbol) && (finalListJson[w].chart=='1h') && (filePath=='2h') && (_ReverseData[0].MA_200!=0) ){
								addIt='NO';
								
								finalListJson[w].chart ='2h';
								finalListJson[w].chart_c = 2;
								
								console.log('==============================    ==================================')
								console.log('CHANGED TO AN 2 HOURS... _ReverseData[0].symbol: '+_ReverseData[0].symbol);
							} */
							
							/* if ((finalListJson[w].symbol==_ReverseData[0].symbol) && (finalListJson[w].chart=='2h') && (filePath=='4h') && (_ReverseData[0].MA_200!=0) ){
								addIt='NO';
								
								finalListJson[w].chart ='4h';
								finalListJson[w].chart_c = 3;
								
								console.log('============  ==================    ==================   ================')
								console.log('CHANGED TO 4 HOURS... _ReverseData[0].symbol: '+_ReverseData[0].symbol);
							} */
							
							/* if ((finalListJson[w].symbol==_ReverseData[0].symbol) && (finalListJson[w].chart=='4h') && (filePath=='1d') && (_ReverseData[0].MA_200!=0) ){
								addIt='NO';
								
								finalListJson[w].chart ='1d';
								finalListJson[w].chart_c = 4;
								
								console.log('==== ==== ==== ==== ===== ==== ==== ====== ==')
								console.log('X(X(X(X(X(X(X(X(X(X(X     (X(X(X(X(X(X(X')
								console.log('CHANGED TO 1 day ... _ReverseData[0].symbol: '+_ReverseData[0].symbol);
							} */
							
							
							
							
						}
				
						if ((addIt =='YES') && (filePath=='30m') && (_ReverseData[0].MA_200!=0) ){
							//console.log('BEFORE :Final Potential Coins File....');
							//console.log(finalListJson);
					
							var obj = {
								date: now.format('YYYY-MM-DD HH:mm:ss'),
								symbol:_ReverseData[0].symbol,
								price: parseFloat(_ReverseData[0].price),
								vol:parseFloat(_ReverseData[0].vol),
								vol_BTC:parseFloat(_ReverseData[0].vol_BTC),
								chart : '30m',
								chart_c:0,
								model:'RSI model',
								
							};
							//chart : _ReverseData[0].chart,
					
							finalListJson.push(obj);
					
							//console.log('AFTER :Final Potential Coins File....');
							//console.log(finalListJson);
						}
						//else {
						//	console.log('Replacing variables for '+_ReverseData[0].symbol+' '+_ReverseData[0].chart+' because it already exists...')
						//}
					

			
					}
					else if ((filePath=='30m') && (_ReverseData[0].MA_200!=0) ) {
						//console.log('BEFORE :Final Potential Coins File....');
						//console.log(finalListJson);
						
						
					
						var obj = {
							date: now.format('YYYY-MM-DD HH:mm:ss'),
								symbol:_ReverseData[0].symbol,
								price: parseFloat(_ReverseData[0].price),
								vol:parseFloat(_ReverseData[0].vol),
								vol_BTC:parseFloat(_ReverseData[0].vol_BTC),
								chart : '30m',
								chart_c:0,
								
								model:'RSI model',
								
						};
					//chart : _ReverseData[0].chart,
						finalListJson.push(obj);
					
						//console.log('AFTER :Final Potential Coins File....');
						//console.log(finalListJson);
					}
			
					
					
					
					//c++;
				}
				
				//......................................
				if ( ((_ReverseData[0].roc20Arr[0]<_ReverseData[0].roc20Arr[1]) && (_ReverseData[0].roc50Arr[0]<_ReverseData[0].roc50Arr[1])  && (_ReverseData[0].roc100Arr[0]<_ReverseData[0].roc100Arr[1]) && (_ReverseData[0].roc200Arr[0]<_ReverseData[0].roc200Arr[1]))
					&& (_ReverseData[0].sma20>0) && (_ReverseData[0].sma50>0) && (_ReverseData[0].sma100>0) && (_ReverseData[0].sma200>0)
				
					&& (_ReverseData[0].symbol.includes("AUD") == false ) && (_ReverseData[0].symbol.includes("USDS") == false ) && (_ReverseData[0].symbol.includes("TUSD") == false ) && (_ReverseData[0].symbol.includes("PAX") == false )  && (_ReverseData[0].symbol.includes("EUR") == false )   && (_ReverseData[0].symbol.includes("BUSD") == false )  &&  (_ReverseData[0].symbol.includes("USDC") == false )  &&  (_ReverseData[0].symbol.includes("GBP") == false ) &&  (_ReverseData[0].symbol.includes("DAI") == false )   
					
				) {
				//if ( (_ReverseData[0]._tRSI>=70) && (_ReverseData[0].symbol.includes("AUD") == false ) && (_ReverseData[0].symbol.includes("USDS") == false ) && (_ReverseData[0].symbol.includes("TUSD") == false ) && (_ReverseData[0].symbol.includes("PAX") == false )  && (_ReverseData[0].symbol.includes("EUR") == false )   && (_ReverseData[0].symbol.includes("BUSD") == false )  &&  (_ReverseData[0].symbol.includes("USDC") == false )  &&  (_ReverseData[0].symbol.includes("GBP") == false ) &&  (_ReverseData[0].symbol.includes("DAI") == false )   ) {
						
						/* console.log('UN_REVERSED ');
						console.log(_ReverseData[0]);
						console.log(_ReverseData[1]);
						console.log(_ReverseData[2]);
						console.log('Latest date')
						console.log(_ReverseData[0].date); */
						
				
						console.log('SHORT: FOUND SOMETHING>>>'+_ReverseData[0].symbol);
						
					
					
					//just add to potential coins...
					
					if (!Array.isArray(finalListJsonB)) {
						finalListJsonB = [];
					}
				
					
					
					var addIt = 'YES';
					if (finalListJsonB.length>0){
						for (var w=0; w<finalListJsonB.length; w++){
							//if ((finalListJsonB[w].symbol==_ReverseData[0].symbol) && (finalListJsonB[w].chart==_ReverseData[0].chart) ){
							if ((finalListJsonB[w].symbol==_ReverseData[0].symbol) && (filePath=='30m') && (_ReverseData[0].MA_200!=0) ){  ///  (finalListJson[w].chart==_ReverseData[0].chart)
								addIt='NO';
								
									//console.log('Replacing variables for '+_ReverseData[0].symbol+' '+_ReverseData[0].chart+' because it already exists...')
								
								//replace it here...
								finalListJsonB[w].date=now.format('YYYY-MM-DD HH:mm:ss');
								finalListJsonB[w].price=parseFloat(_ReverseData[0].price);
								finalListJsonB[w].vol = parseFloat(_ReverseData[0].vol);
								finalListJsonB[w].vol_BTC = parseFloat(_ReverseData[0].vol_BTC);
								
								finalListJsonB[w].model = 'RSI model';
								
								
							}
							
							///---
							/* if ((finalListJsonB[w].symbol==_ReverseData[0].symbol) && (finalListJsonB[w].chart=='30m') && (filePath=='1h') && (_ReverseData[0].MA_200!=0) ){
								addIt='NO';
								
								finalListJsonB[w].chart ='1h';
								finalListJsonB[w].chart_c = 1;
								
								console.log('================================================================')
								console.log('CHANGED TO AN HOUR... _ReverseData[0].symbol: '+_ReverseData[0].symbol);
							} */
							
							/* if ((finalListJsonB[w].symbol==_ReverseData[0].symbol) && (finalListJsonB[w].chart=='1h') && (filePath=='2h') && (_ReverseData[0].MA_200!=0) ){
								addIt='NO';
								
								finalListJsonB[w].chart ='2h';
								finalListJsonB[w].chart_c = 2;
								
								console.log('==============================    ==================================')
								console.log('CHANGED TO AN 2 HOURS... _ReverseData[0].symbol: '+_ReverseData[0].symbol);
							} */
							
							/* if ((finalListJsonB[w].symbol==_ReverseData[0].symbol) && (finalListJsonB[w].chart=='2h') && (filePath=='4h') && (_ReverseData[0].MA_200!=0) ){
								addIt='NO';
								
								finalListJsonB[w].chart ='4h';
								finalListJsonB[w].chart_c = 3;
								
								console.log('============  ==================    ==================   ================')
								console.log('CHANGED TO 4 HOURS... _ReverseData[0].symbol: '+_ReverseData[0].symbol);
							} */
							
							/* if ((finalListJsonB[w].symbol==_ReverseData[0].symbol) && (finalListJsonB[w].chart=='4h') && (filePath=='1d') && (_ReverseData[0].MA_200!=0) ){
								addIt='NO';
								
								finalListJsonB[w].chart ='1d';
								finalListJsonB[w].chart_c = 4;
								
								console.log('==== ==== ==== ==== ===== ==== ==== ====== ==')
								console.log('X(X(X(X(X(X(X(X(X(X(X     (X(X(X(X(X(X(X')
								console.log('CHANGED TO 1 day ... _ReverseData[0].symbol: '+_ReverseData[0].symbol);
							}
							 */
							///---
							
							
						}
				
						if ((addIt =='YES') && (filePath=='30m') && (_ReverseData[0].MA_200!=0) ){
							//console.log('BEFORE :Final Potential Coins File....');
							//console.log(finalListJsonB);
					
							var obj = {
								date: now.format('YYYY-MM-DD HH:mm:ss'),
								symbol:_ReverseData[0].symbol,
								price: parseFloat(_ReverseData[0].price),
								vol:parseFloat(_ReverseData[0].vol),
								vol_BTC:parseFloat(_ReverseData[0].vol_BTC),
								chart : '30m',
								chart_c:0,
								
								model:'SHORT_MODEL',
								
							};
					//chart : _ReverseData[0].chart,
							finalListJsonB.push(obj);
							//console.log('ADDING A COIN TO SHORT: '+_ReverseData[0].symbol);
					
							//console.log('AFTER :Final Potential Coins File....');
							//console.log(finalListJsonB);
						}
						//else {
						//	console.log('Not adding '+_ReverseData[0].symbol+' '+_ReverseData[0].chart+' because it already exists...')
						//}
					

			
					}
					else if ((filePath=='30m') && (_ReverseData[0].MA_200!=0)) {
						//console.log('BEFORE :Final Potential Coins File....');
						//console.log(finalListJsonB);
					
						var obj = {
							date: now.format('YYYY-MM-DD HH:mm:ss'),
								symbol:_ReverseData[0].symbol,
								price: parseFloat(_ReverseData[0].price),
								vol:parseFloat(_ReverseData[0].vol),
								vol_BTC:parseFloat(_ReverseData[0].vol_BTC),
								chart : '30m',
								chart_c:0,
								
								model:'SHORT_MODEL',
								
						};
					//chart : _ReverseData[0].chart,
						finalListJsonB.push(obj);
						
						//console.log('ADDING A COIN TO SHORT: '+_ReverseData[0].symbol);
					
						//console.log('AFTER :Final Potential Coins File....');
						//console.log(finalListJsonB);
					}
			
				}
				//....................................
				
				if ( !((_ReverseData[0].roc20Arr[0]>_ReverseData[0].roc20Arr[1]) && (_ReverseData[0].roc50Arr[0]>_ReverseData[0].roc50Arr[1])  && (_ReverseData[0].roc100Arr[0]>_ReverseData[0].roc100Arr[1]) && (_ReverseData[0].roc200Arr[0]>_ReverseData[0].roc200Arr[1]))  ) {
				//if (_ReverseData[0]._tRSI>=60){
					if (finalListJson.length>0){
						for (var w=0; w<finalListJson.length; w++){
							if ((finalListJson[w].symbol==_ReverseData[0].symbol) && (finalListJson[w].chart==_ReverseData[0].chart) ){  ///  
								//...delete and filter....
								console.log('LONG: REMOVED '+finalListJson[w].symbol+' BECAUSE OF HIGH RSI:'+finalListJson[w].symbol+' RSI:'+_ReverseData[0]._tRSI+' CHART:'+finalListJson[w].chart);
								
								delete finalListJson[w];
								
							}
						}
						finalListJson = finalListJson.filter(function (el) { return el != null; });
					}
				}
				
				if (_ReverseData[0].MA_200==0){
					if (finalListJson.length>0){
						for (var w=0; w<finalListJson.length; w++){
							if ((finalListJson[w].symbol==_ReverseData[0].symbol)  ){  ///  
								//...delete and filter....
								//console.log('REMOVED '+finalListJson[w].symbol+' BECAUSE OF No 200D MA:'+_ReverseData[0].MA_200+' chart:'+finalListJson[w].chart);
								delete finalListJson[w];
							}
						}
						finalListJson = finalListJson.filter(function (el) { return el != null; });
					}
					
					if (finalListJsonB.length>0){
						for (var w=0; w<finalListJsonB.length; w++){
							if ((finalListJsonB[w].symbol==_ReverseData[0].symbol)  ){  ///  
								//...delete and filter....
								//console.log('REMOVED '+finalListJsonB[w].symbol+' BECAUSE OF No 200D MA:'+_ReverseData[0].MA_200+' chart:'+finalListJsonB[w].chart);
								delete finalListJsonB[w];
							}
						}
						finalListJsonB = finalListJsonB.filter(function (el) { return el != null; });
					}
				}
				
				
				
				if (  !((_ReverseData[0].roc20Arr[0]<_ReverseData[0].roc20Arr[1]) && (_ReverseData[0].roc50Arr[0]<_ReverseData[0].roc50Arr[1])  && (_ReverseData[0].roc100Arr[0]<_ReverseData[0].roc100Arr[1]) && (_ReverseData[0].roc200Arr[0]<_ReverseData[0].roc200Arr[1]))  ){
					if (finalListJsonB.length>0){
						for (var w=0; w<finalListJsonB.length; w++){
							if ((finalListJsonB[w].symbol==_ReverseData[0].symbol) && (finalListJsonB[w].chart==_ReverseData[0].chart) ){  ///  
								//...delete and filter....
								console.log('SHORT: REMOVED SOMETHING BECAUSE OF LOW RSI:'+finalListJsonB[w].symbol+' RSI:'+_ReverseData[0]._tRSI+' CHART:'+finalListJsonB[w].chart);
								
								delete finalListJsonB[w];
								
							}
							
							
						}
						finalListJsonB = finalListJsonB.filter(function (el) { return el != null; });
					}
				}
				
				
				//&& (_ReverseData[0].symbol.includes("BEAR") == false ) && (_ReverseData[0].symbol.includes("BULL") == false ) && (_ReverseData[0].symbol.includes("BCHABC") == false ) && (_ReverseData[0].symbol.includes("TUSD") == false ) && (_ReverseData[0].symbol.includes("PAX") == false ) && (_ReverseData[0].symbol.includes("USDC") == false ) && (_ReverseData[0].symbol.includes("USDS") == false ) && (_ReverseData[0].symbol.includes("BUSD") == false ) && (_ReverseData[0].symbol.includes("EUR") == false ) && (_ReverseData[0].symbol.includes("BCHSV") == false ) && (_ReverseData[0].symbol.includes("CTSI") == false ) && (_ReverseData[0].symbol.includes("HIVE") == false )
				
				
				
				
				
				
				
			}
			
		}
		
		//----original above-----
		
/// ////////////////////////////////////////////////////////////////////////////////////
/// ////////////////////////////////////////////////////////////////////////////////////		
/// ////////////////////////////////////////////////////////////////////////////////////
		
		
		
		
		////////////////////////////////////////////////////////////////////////////////////
		
			//console.log('3...:...');
			//console.log(finalListJson);
	
			
		
					
			
			
		}//the h=2 loop ends here...
		
		//console.log('potentialCoins:...');
		//console.log(finalListJson);
		
			var fs_p = require('fs').promises;
	
			try {
				await fs_p.writeFile('finalPotentialCoins.json', JSON.stringify(finalListJson));
				//console.info("File created successfully with Node.js v13 fs_p.promises!");
			} catch (error){
				console.error(error);
			}
		
		
			 try {
				await fs_p.writeFile('short_list.json', JSON.stringify(finalListJsonB));
				//console.info("File created successfully with Node.js v13 fs_p.promises!");
			} catch (error){
				console.error(error);
			}		 // REMEMBER TO ENABLE THIS IN ORDER TO SHORT AGAIN!!!!!
		

		
		
		
		//-------------------------------------
			//gonna try put it in here...
		//---------------------------------------
		
		
		//var d = new Date();
	//console.log('Time End LOOP D:'+d);		
		
	
	//console.log('Opportunities:'+c+' & original length:'+newData.length);
	
	//algoLoopBTCUSDT();
}


//analyseAllCoins();



//algoLoopC();
//algoLoopD();
//var timeVar = 61500*16; 
//var myVarC = setInterval(analyseAllCoins, timeVar);//16 minutes.

//async function everything() {
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
const analyseAllCoins = async function(){
	
	var d = new Date();
	console.log('Anlysis Time Start:'+d);
	
	const AbortController = require("abort-controller");
	
	
	
	const fetch = require('node-fetch');
	
	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	 const request = new XMLHttpRequest();
	
	
	
	var moment = require('moment');
	var now = moment();
	
	const listOfArguments = [];
	let counter = 0;
let interval;


var fs = require('fs');
	var fs_p = require('fs').promises;
	
	
	var chartAnalysis = '30m'; //changing back to old version
	
	





	//let response = await fetch('https://api.binance.com/api/v3/ticker/price').catch((error)=>console.log(error));
	
	const controllerA = new AbortController();
	setTimeout(() => controllerA.abort(), 20000);
	//controllerA.abort();
	let response = await fetch('https://api.binance.com/api/v3/ticker/24hr', {signal: controllerA.signal,} ).catch((error)=>console.log(error));
	
	let responsePrices = []
	if (response){
		responsePrices = await response.json();
		console.log('responsePrices length:'+responsePrices.length);
	}
	
	
	if (responsePrices.length >0){
		
		
		
		//console.log('Somehting found......');
		///---- ---- ---- ---- --- ---- ---- ---- 
		
		


// Used to watch amount of Promises executing in a single moment of time

// Overall amount of operations
const numberOfOperations = responsePrices.length;
// Arguments per operation


//const argumentSymbol = [];
// Delays per operation to fake async request


	


// Fill delays in order to use the same array between all invocations
// Single delay is a value in milliseconds from 1000 to 10000
for (let i = 0; i < numberOfOperations; i++) {
//for (let i = 0; i < 100; i++) {
  //listOfArguments.push(i);
  
  //if (ws_json[i].symB.substr(-4) == 'USDT' )
  
  if (responsePrices[i].symbol.substr(-4) == 'USDT'){
		//listOfArguments.push([responsePrices[i].symbol, '30m', responsePrices[i].price]); //.get date of chart and analyse the oldest first...
		
		
		
		if ((parseFloat(responsePrices[i].volume) > 0 ) && (parseFloat(responsePrices[i].quoteVolume) > 300 ) && (responsePrices[i].symbol.includes("UPUSDT") == false ) && (responsePrices[i].symbol.includes("DOWN") == false ) && (responsePrices[i].symbol.includes("USDS") == false ) && (responsePrices[i].symbol.includes("TUSD") == false ) && (responsePrices[i].symbol.includes("PAX") == false )  && (responsePrices[i].symbol.includes("EUR") == false )   && (responsePrices[i].symbol.includes("BUSD") == false )  &&  (responsePrices[i].symbol.includes("USDC") == false )  &&  (responsePrices[i].symbol.includes("GBP") == false ) &&  (responsePrices[i].symbol.includes("DAI") == false )     ) {  //responsePrices[i].symbol
			listOfArguments.push([responsePrices[i].symbol, chartAnalysis, responsePrices[i].lastPrice, responsePrices[i].volume, responsePrices[i].quoteVolume]); //.get date of chart and analyse the oldest first...
		}
		//listOfArguments.push([responsePrices[i].symbol, '1h', responsePrices[i].price]);
  }
  
  //argumentSymbol.push(responsePrices[i].symbol);
  
  //__listOfArguments.push('https://api.binance.com/api/v3/klines?symbol='+responsePrices[i].symbol+'&interval=30m&limit=210');
  //listOfArguments.push('https://api.binance.com/api/v3/klines?symbol='+responsePrices[i].symbol+'&interval=30m&limit=210');
}
		
		/// --- ---- ---- ---- ---- ----
		
		
	}else {
		console.log('No internet connection...')
	}
	
		

console.log('=============================================================');
console.log('Analysis: # of requests:'+listOfArguments.length);
console.log('=============================================================');
//console.log(listOfArguments);
//console.log(listOfArguments.length);

// Fake async: resolve an array through arbitrary delay
// Increase a counter in order to watch amount of Promises executed


var promList = [];


const asyncOperation = index => {
  counter++;
  return new Promise((resolve, reject) => {
  
		///---
		//console.log('index[0] sent:'+index[0]);
		
		
		const controller = new AbortController();
		setTimeout(() => controller.abort(), 20000);
		//controller.abort();
		fetch('https://api.binance.com/api/v3/klines?symbol='+index[0]+'&interval='+index[1]+'&limit=210', { signal: controller.signal })
			.then((response)=> {
				return response.json();
			})
			.then(function (data) {
				//console.log('----------------------');
				//console.log('result. below. ...')
				//console.log(data);
				
				
				console.log('Operation performed:', index[0]);
				//var j_prom = [index[0], index[1], index[2]];
				//j_prom.push(data);  
				
				//&& (index[0].includes("VEN") == false ) && (index[0].includes("BEAR") == false ) && (index[0].includes("BULL") == false ) && (index[0].includes("BCHABC") == false )       && (index[0].includes("BCHSV") == false )
				//&& (index[0].includes("AUD") == false ) && (index[0].includes("USDS") == false ) && (index[0].includes("TUSD") == false ) && (index[0].includes("PAX") == false )  && (index[0].includes("EUR") == false )   && (index[0].includes("BUSD") == false )  &&  (index[0].includes("USDC") == false )  &&  (index[0].includes("GBP") == false ) &&  (index[0].includes("DAI") == false )       
				
				if ( (index[0].includes("VEN") == false ) && (index[0].includes("BEAR") == false ) && (index[0].includes("BULL") == false ) && (index[0].includes("BCHABC") == false )       && (index[0].includes("BCHSV") == false ) 
					&& (index[0].includes("AUD") == false ) && (index[0].includes("USDS") == false ) && (index[0].includes("TUSD") == false ) && (index[0].includes("PAX") == false )  && (index[0].includes("EUR") == false )   && (index[0].includes("BUSD") == false )  &&  (index[0].includes("USDC") == false )  &&  (index[0].includes("GBP") == false ) &&  (index[0].includes("DAI") == false )
				){
					promList.push([{symbol: index[0], price: index[2], vol:index[3], vol_BTC:index[4]}, data]);
				}
				
					
				counter--;
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
			
		
		///----

  /* request.open('GET', 'https://api.binance.com/api/v3/klines?symbol='+index[0]+'&interval='+index[1]+'&limit=200');//,true
  request.onload = () => {
    if (request.status === 200) {
      
	  console.log('Operation performed:', index[0]);
	  var j_prom = [index[0], index[1], index[2]];
	 // if (index[1]=='30m'){
		j_prom.push(JSON.parse(request.responseText));  
	//  }
	  
	  // if (index[1]=='30m'){
		 //  var j_prom_B = [index[0], index[1], index[2], JSON.parse(request.responseText), ];
		//	//j_prom.push(JSON.parse(request.responseText));  
		//}
	  
	   counter--;
	  resolve(j_prom);
	  
    } else {
      reject(Error(request.statusText)); // status is not 200 OK, so reject
	  //reject(Error(request.responseText+' : ->'+index[0])); // status is not 200 OK, so reject
	  console.log('REJECTED OPERATION BELOW ->:');
	  console.log(index[0]);
    }
  };

  request.onerror = () => {
    //reject(Error('Error fetching data.')); // error occurred, reject the  Promise
	reject(Error(request.statusText)); // status is not 200 OK, so reject
	  //reject(Error(request.responseText+' : ->'+index[0])); // status is not 200 OK, so reject
	  console.log('REJECTED OPERATION BELOW ->:');
	  console.log(index[0]);
  };

  request.send(); // send the request */
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



/* async function take3subtake1part1() {
  const concurrencyLimit = 10;
  // Enhance arguments array to have an index of the argument at hand
  const argsCopy = [].concat(listOfArguments.map((val, ind) => ({ val, ind })));
  const result = new Array(listOfArguments.length);
  const promises = new Array(concurrencyLimit).fill(Promise.resolve());
  // Recursively chain the next Promise to the currently executed Promise
  function chainNext(p) {
    if (argsCopy.length) {
      const arg = argsCopy.shift();
      return p.then(() => {
        // Store the result into the array upon Promise completion
        const operationPromise = asyncOperation(arg.val).then(r => { result[arg.ind] = r; console.log('+_+_+_+ r below:'); console.log(r); });
        return chainNext(operationPromise);
      });
    }
    return p;
  }

  await Promise.all(promises.map(chainNext));
  return result;
} */

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

//var promList = await take3subtake1part1();
console.log('About to run promises...');
 await take3subtake1part0();
 console.log('--------')
 console.log('listOfArguments #: '+listOfArguments.length);
console.log('promList #: '+promList.length);
//console.log('----promList Below:---- NOT ANYMORE');
//console.log(promList);

if (counter==0){	
	clearInterval(interval);
}



//console.log(promList)

//0--------------------------------
	var fs = require('fs');
	
	/* if (chartAnalysis=='30m'){
		var data30m = {};
		var text30m = fs.readFileSync('potentialCoins30m.json','utf8');
		if (text30m){	
			data30m = JSON.parse(text30m);
			var m=0;
			var specificSnapData30m=[];
			for (x in data30m) {
				data30m[x].sym = x;
				specificSnapData30m[m] = data30m[x];
				m++;
			}
		}
	} */
	
	
	
	
	
	//console.log('30m list:');
	//console.log(specificSnapData30m);
	
	//console.log('1h list:');
	//console.log(specificSnapData1h);
	
	
	
	
//0-----------------------------------

/* for (y=0; y<promList.length; y++){
	//console.log('_______________________________________');
	
	intervalParam = promList[y][1];
	
	var lP = promList[y][2];
	
	candlesForCoin = promList[y][3];
	
	if (typeof candlesForCoin[candlesForCoin.length-1] !== 'undefined'){
	
				
					//map data...
					var closeData = candlesForCoin.map(d=>d[4]);
					var highData = candlesForCoin.map(d=>d[2]);
					var lowData = candlesForCoin.map(d=>d[3]);
					
					
					var tulind = require('tulind');
					
					 var tROC = 0;
					tulind.indicators.roc.indicator([closeData],[9],(err, res)=>{
						if (err) return console.log(err);
						
						tROC = res[0].slice(-1)[0];
					});
					
					
					
		
	
	
	
	
	
	
	
	
	
	
	
	//------------------------------------------------------------------------------------------
	}
	
	//console.log('sym:'+promList[y][0]+' & Chart:'+promList[y][1]+' & ma20:'+ma20+' & ma50:'+ma50+' & ma100:'+ma100+' & ma200:'+ma200);
	//console.log('sym:'+promList[y][0]+' & Chart:'+promList[y][1]+' MACD'+macd+' & RSI:'+RSITwo);
	
	//console.log('_______________________________________');
} */

//console.log('so the new 30 m thing below:');
//console.log(data30m);

//console.log('so the new 1hr thing below:');
//console.log(data1h);

	var fs_p = require('fs').promises;
	
	console.log('chartAnalysis LAST : LAST::::'+chartAnalysis);
	
	//if (chartAnalysis=='30m'){
		try {
			await fs_p.writeFile('efficientList30m.json', JSON.stringify(promList));
			//console.info("File created successfully with Node.js v13 fs_p.promises!");
		} catch (error){
			console.error(error);
		}
	//}
	
	
	

	

//console.log('ABOUT TO RUN ALGO_LOOP_D');
//await algoLoopD();

var d = new Date();
	console.log('Time End:'+d);

return listOfArguments.length;

}

module.exports ={
        analyseAllCoins
    }