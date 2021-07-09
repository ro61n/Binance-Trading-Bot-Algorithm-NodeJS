


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
	
	var cs_T_30m = parseFloat(fs.readFileSync('__30m_a.txt','utf8'));
	var cs_T_1h = parseFloat(fs.readFileSync('__1h_a.txt','utf8'));
	var cs_T_2h = parseFloat(fs.readFileSync('__2h_a.txt','utf8'));
	var cs_T_4h = parseFloat(fs.readFileSync('__4h_a.txt','utf8'));
	var cs_T_1d = parseFloat(fs.readFileSync('__1d_a.txt','utf8'));
	
	var cs_arr = [[cs_T_30m, '30m', '__30m_a.txt',], [cs_T_1h, '1h', '__1h_a.txt',], [cs_T_2h, '2h', '__2h_a.txt'], [cs_T_4h, '4h', '__4h_a.txt'], [cs_T_1d, '1d', '__1d_a.txt'], ];
	
	/* console.log('cs_arr BEFORE:');
	console.log(cs_arr);
	console.log('=-=-=-=-='); */
	
	cs_arr.sort(sortFunction);
	
	/* console.log('cs_arr AFTER:');
	console.log(cs_arr); */
	
	//var chartAnalysis = cs_arr[0][1];
	var chartAnalysis = '30m'; //changing back to old version
	
		//console.log('it came here 2');
		try {
			await fs_p.writeFile(cs_arr[0][2], now);
			//console.info("File created successfully -->"+cs_arr[0][2]);
		} catch (error){
			console.error(error);
		}
	
	//console.log('chartAnalysis:'+chartAnalysis);
	

	function sortFunction(a, b) {
		if (a[0] === b[0]) {
			return 0;
		}
		else {
			return (a[0] < b[0]) ? -1 : 1;
		}
	}






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
		
		
		
		if ((parseFloat(responsePrices[i].quoteVolume) != 0 ) && (responsePrices[i].symbol.includes("UPUSDT") == false ) && (responsePrices[i].symbol.includes("DOWN") == false ) && (responsePrices[i].symbol.includes("USDS") == false ) && (responsePrices[i].symbol.includes("TUSD") == false ) && (responsePrices[i].symbol.includes("PAX") == false )  && (responsePrices[i].symbol.includes("EUR") == false )   && (responsePrices[i].symbol.includes("BUSD") == false )  &&  (responsePrices[i].symbol.includes("USDC") == false )  &&  (responsePrices[i].symbol.includes("GBP") == false ) &&  (responsePrices[i].symbol.includes("DAI") == false )     ) {  //responsePrices[i].symbol
			listOfArguments.push([responsePrices[i].symbol, chartAnalysis, responsePrices[i].lastPrice]); //.get date of chart and analyse the oldest first...
		}
		//listOfArguments.push([responsePrices[i].symbol, '1h', responsePrices[i].price]);
  }
  
  //argumentSymbol.push(responsePrices[i].symbol);
  
  //__listOfArguments.push('https://api.binance.com/api/v3/klines?symbol='+responsePrices[i].symbol+'&interval=30m&limit=200');
  //listOfArguments.push('https://api.binance.com/api/v3/klines?symbol='+responsePrices[i].symbol+'&interval=30m&limit=200');
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
				
				promList.push([index[0], index[1], index[2], data]);
					
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
//console.log(promList);
//console.log('----promList Below:---- NOT ANYMORE');

if (counter==0){	
	clearInterval(interval);
}



//console.log(promList)

//0--------------------------------
	var fs = require('fs');
	
	if (chartAnalysis=='30m'){
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
	}
	
	if (chartAnalysis=='1h'){
		var data1h = {};
		var text1h = fs.readFileSync('potentialCoins1h.json','utf8');
		if (text1h){	
			data1h = JSON.parse(text1h);
			var m=0;
			var specificSnapData1h=[];
			for (x in data1h) {
				data1h[x].sym = x;
				specificSnapData1h[m] = data1h[x];
				m++;
			}
		}
	}
	
	if (chartAnalysis=='2h'){
		var data2h = {};
		var text2h = fs.readFileSync('potentialCoins2h.json','utf8');
		if (text2h){	
			data2h = JSON.parse(text2h);
			var m=0;
			var specificSnapData2h=[];
			for (x in data2h) {
				data2h[x].sym = x;
				specificSnapData2h[m] = data2h[x];
				m++;
			}
		}
	}
	
	if (chartAnalysis=='4h'){
		var data4h = {};
		var text4h = fs.readFileSync('potentialCoins4h.json','utf8');
		if (text4h){	
			data4h = JSON.parse(text4h);
			var m=0;
			var specificSnapData4h=[];
			for (x in data4h) {
				data4h[x].sym = x;
				specificSnapData4h[m] = data4h[x];
				m++;
			}
		}
	}
	
	if (chartAnalysis=='1d'){
		var data1d = {};
		var text1d = fs.readFileSync('potentialCoins1d.json','utf8');
		if (text1d){	
			data1d = JSON.parse(text1d);
			var m=0;
			var specificSnapData1d=[];
			for (x in data1d) {
				data1d[x].sym = x;
				specificSnapData1d[m] = data1d[x];
				m++;
			}
		}
	}
	
	
	
	//console.log('30m list:');
	//console.log(specificSnapData30m);
	
	//console.log('1h list:');
	//console.log(specificSnapData1h);
	
	
	
	
//0-----------------------------------

for (y=0; y<promList.length; y++){
	//console.log('_______________________________________');
	
	intervalParam = promList[y][1];
	
	var lP = promList[y][2];
	
	candlesForCoin = promList[y][3];
	
	if (typeof candlesForCoin[candlesForCoin.length-1] !== 'undefined'){
	
				
					
					
					
	
					//map data...
					var closeData = candlesForCoin.map(d=>d[4]);
					var highData = candlesForCoin.map(d=>d[2]);
					var lowData = candlesForCoin.map(d=>d[3]);
					//console.log('closeData below-=-=-=-=- :')
					//console.log(closeData);
					
					var tulind = require('tulind');
					
					/* var tROC = 0;
					tulind.indicators.roc.indicator([closeData],[9],(err, res)=>{
						if (err) return console.log(err);
						//console.log(res[0].slice(-1)[0]);
						//console.log('ROC 1: '+res[0].slice(-1)[0])
						//console.log('RSI 2: '+RSITwo)
						tROC = res[0].slice(-1)[0];
					});
					
					var tPPO = 0;
					tulind.indicators.ppo.indicator([closeData],[12, 26],(err, res)=>{
						if (err) return console.log(err);
						//console.log(res[0].slice(-1)[0]);
						
						//console.log('RSI 2: '+RSITwo)
						//console.log(res);
						//console.log('PPO 1: '+res[0].slice(-1)[0]);
						//console.log('PPO 2: '+res[0].slice(-2)[0]);
						tPPO = res[0].slice(-1)[0];
					});
					
					var tPSAR = 0;
					tulind.indicators.psar.indicator([highData, lowData],[0.02, 0.2],(err, res)=>{
						if (err) return console.log(err);
						//console.log(res[0].slice(-1)[0]);
						//console.log('res')
						//console.log(res)
						//console.log('psar 1: '+res[0].slice(-1)[0])
						//console.log('RSI 2: '+RSITwo)
						tPSAR = res[0].slice(-1)[0];
					});
					
					var tRSI =0;
					tulind.indicators.rsi.indicator([closeData],[14],(err, res)=>{
						if (err) return console.log(err);
						//console.log(res[0].slice(-1)[0]);
						//console.log('RSI 1: '+res[0].slice(-1)[0])
						//console.log('RSI 2: '+RSITwo)
						tRSI = res[0].slice(-1)[0];
					}); */
					
		//---------------------------------------------------------------------------------	
			var res_O_SMA20 = []; 
			var sma20 = 0;
			tulind.indicators.sma.indicator([closeData],[20],(err, res)=>{
				if (err) return console.log(err);
					res_O_SMA20 = res[0];
					sma20 = res[0].slice(-1)[0];
			});
			
			// if (promList[y][0]=='BTCUSDT'){
				// console.log(res_O_SMA20)
				// console.log('..')
				// console.log(sma20);
			// }
		
		//-----------------------------------------------------------------
		
			var res_O_SMA50 = []; 
			var sma50 = 0;
			tulind.indicators.sma.indicator([closeData],[50],(err, res)=>{
				if (err) return console.log(err);
					res_O_SMA50 = res[0];
					sma50 = res[0].slice(-1)[0];
			});
			
		//-----------------------------------------------------------------
		
			var res_O_SMA100 = []; 
			var sma100 = 0;
			tulind.indicators.sma.indicator([closeData],[100],(err, res)=>{
				if (err) return console.log(err);
					res_O_SMA100 = res[0];
					sma100 = res[0].slice(-1)[0];
			});
			
		//-----------------------------------------------------------------
		
			var res_O_SMA200 = []; 
			var sma200 = 0;
			tulind.indicators.sma.indicator([closeData],[200],(err, res)=>{
				if (err) return console.log(err);
					res_O_SMA200 = res[0];
					sma200 = res[0].slice(-1)[0];
			});
			
		//-----------------------------------------------------------------
		
			var roc20Arr = [];
			tulind.indicators.roc.indicator([res_O_SMA20],[9],(err, res)=>{
				if (err) return console.log(err);
					roc20Arr = [res[0].slice(-1)[0], res[0].slice(-2)[0]];
			});
								
		//------------------------------------------------------------------
		
			var roc50Arr = [];
			tulind.indicators.roc.indicator([res_O_SMA50],[9],(err, res)=>{
				if (err) return console.log(err);
					roc50Arr = [res[0].slice(-1)[0], res[0].slice(-2)[0]];
			});
								
		//------------------------------------------------------------------
		
			var roc100Arr = [];
			tulind.indicators.roc.indicator([res_O_SMA100],[9],(err, res)=>{
				if (err) return console.log(err);
					roc100Arr = [res[0].slice(-1)[0], res[0].slice(-2)[0]];
			});
								
		//------------------------------------------------------------------
			
			var roc200Arr = [];
			tulind.indicators.roc.indicator([res_O_SMA200],[9],(err, res)=>{
				if (err) return console.log(err);
					roc200Arr = [res[0].slice(-1)[0], res[0].slice(-2)[0]];
			});
								
		//------------------------------------------------------------------
					
				
	
	
	
	var chartCode=0;
	//--------------------------------------------------------------------------------------------
	var chosenJsonFile = [];
	var chosenData = '';
	if (promList[y][1] == '30m'){
		//console.log('it is a 30 minute thing');
		chosenJsonFile = specificSnapData30m;
		chosenData = data30m;
	}
	else if (promList[y][1] == '1h'){
		//console.log('it is an hour thing...');
		chosenJsonFile = specificSnapData1h;
		chosenData = data1h;
		chartCode = 1;//....
	}
	else if (promList[y][1] == '2h'){
		//console.log('it is an hour thing...');
		chosenJsonFile = specificSnapData2h;
		chosenData = data2h;
		chartCode = 2;//....
	}
	else if (promList[y][1] == '4h'){
		//console.log('it is an hour thing...');
		chosenJsonFile = specificSnapData4h;
		chosenData = data4h;
		chartCode = 3;//....
	}
	else if (promList[y][1] == '1d'){
		//console.log('it is an hour thing...');
		chosenJsonFile = specificSnapData1d;
		chosenData = data1d;
		chartCode = 4;//....
	}
	
	
	var pushToJSON = 1;
	
	for (w=0; w<chosenJsonFile; w++){
		if (chosenJsonFile[w].symbol==promList[y][0]){
			//
					//if ( (specificSnapData[0][specificSnapData[0].length-1].MACD != macd ) && (specificSnapData[0][specificSnapData[0].length-1].RSI != RSITwo) ){
			
				if ( (chosenJsonFile[w][chosenJsonFile[w].length-1]._tPPO == tPPO) && (chosenJsonFile[w][chosenJsonFile[w].length-1]._tRSI == tRSI) ){
					pushToJSON = 0;
				}
			//
		}
	}
	
	if (pushToJSON == 1){
		//add it to the data30m or Data1h
		
		tableSym = promList[y][0];
		if (!Array.isArray(chosenData[tableSym])) {
			chosenData[tableSym] = [];
		}
		
		var obj = {
			date: now.format('YYYY-MM-DD HH:mm:ss'),
			dateNum: parseFloat(now.format('x')),
			symbol:promList[y][0],
			price: parseFloat(promList[y][2]),
			vol_BTC: parseFloat(candlesForCoin[candlesForCoin.length-1][7]),
			vol: parseFloat(candlesForCoin[candlesForCoin.length-1][5]),
			chart : intervalParam,
			chart_c:chartCode,
			sma20: sma20,
			sma50: sma50,
			sma100: sma100,
			sma200: sma200,
			roc20Arr: roc20Arr,
			roc50Arr: roc50Arr,
			roc100Arr: roc100Arr,
			roc200Arr: roc200Arr,
			
			
		};
		
		//console.log(obj);
		//console.log('The above has been added to the JSON------------------')
		
		if (promList[y][1] == '30m'){
			data30m[tableSym].push(obj)
		}
		else if (promList[y][1] == '1h'){
			data1h[tableSym].push(obj)
		}
		else if (promList[y][1] == '2h'){
			data2h[tableSym].push(obj)
		}
		else if (promList[y][1] == '4h'){
			data4h[tableSym].push(obj)
		}
		else if (promList[y][1] == '1d'){
			data1d[tableSym].push(obj)
		}
		
		//chosenData[tableSym].push(obj);	
	}
	
	
	
	
	//------------------------------------------------------------------------------------------
	}
	
	//console.log('sym:'+promList[y][0]+' & Chart:'+promList[y][1]+' & ma20:'+ma20+' & ma50:'+ma50+' & ma100:'+ma100+' & ma200:'+ma200);
	//console.log('sym:'+promList[y][0]+' & Chart:'+promList[y][1]+' MACD'+macd+' & RSI:'+RSITwo);
	
	//console.log('_______________________________________');
}

//console.log('so the new 30 m thing below:');
//console.log(data30m);

//console.log('so the new 1hr thing below:');
//console.log(data1h);

	var fs_p = require('fs').promises;
	
	console.log('chartAnalysis LAST : LAST::::'+chartAnalysis);
	
	if (chartAnalysis=='30m'){
		try {
			await fs_p.writeFile('potentialCoins30m.json', JSON.stringify(data30m));
			//console.info("File created successfully with Node.js v13 fs_p.promises!");
		} catch (error){
			console.error(error);
		}
	}
	
	if (chartAnalysis=='1h'){
		try {
			await fs_p.writeFile('potentialCoins1h.json', JSON.stringify(data1h));
			console.info("File created successfully with Node.js v13 fs_p.promises!");
		} catch (error){
			console.error(error);
		}
	}
	
	if (chartAnalysis=='2h'){
		try {
			await fs_p.writeFile('potentialCoins2h.json', JSON.stringify(data2h));
			console.info("File created successfully with Node.js v13 fs_p.promises!");
		} catch (error){
			console.error(error);
		}
	}
	
	if (chartAnalysis=='4h'){
		try {
			await fs_p.writeFile('potentialCoins4h.json', JSON.stringify(data4h));
			console.info("File created successfully with Node.js v13 fs_p.promises!");
		} catch (error){
			console.error(error);
		}
	}
	
	if (chartAnalysis=='1d'){
		try {
			await fs_p.writeFile('potentialCoins1d.json', JSON.stringify(data1d));
			console.info("File created successfully with Node.js v13 fs_p.promises!");
		} catch (error){
			console.error(error);
		}
	}
	
	

	

console.log('ABOUT TO RUN ALGO_LOOP_D');
await algoLoopD();

var d = new Date();
	console.log('Time End:'+d);

return listOfArguments.length;

}

module.exports ={
        analyseAllCoins
    }