


//makeOrders();

//algoLoopC();
//algoLoopD();


async function moveAllToSellSide() {
	
/* 	const configT = require('./configB');
	const twit = require('twit');
	const T = new twit(configT); */
	
	var d = new Date();
	console.log('MoveToSellSide Start:'+d);
	
	var CryptoJS = require("crypto-js");
	
	var fs = require('fs');
	const fetch = require('node-fetch');
	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	
	const AbortController = require("abort-controller")
	
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
	
	var queryBook = [];
	var qb = fs.readFileSync('1queryBook.json','utf8');
	if (qb){
		queryBook = JSON.parse(qb);
	}
	
	const controllerA = new AbortController();
	setTimeout(() => controllerA.abort(), 20000);
	//controllerA.abort();
	let response = await fetch('https://www.binance.com/api/v3/time', {signal: controllerA.signal,} ).catch((error)=>console.log(error));
	if (response){
		// , , , ,
		let responseST = await response.json();
	console.log('SERVER TIME:'+responseST.serverTime);

	let snapDataAccounts_ = [];
	var snapshot_accounts = await firebase.database().ref('/users/').once('value').catch((error)=>console.log(error));
	snapDataAccounts_ = snapshot_accounts.val();
	
	let userDet = [];
	let users = [];
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
	
	
	
	
	
	//console.log('queryBook length:'+queryBook.length);
	
//let response = await fetch('https://api.binance.com/api/v3/ticker/price').catch((error)=>console.log(error));
		//let responsePrices = await response.json();
//console.log('responsePrices length:'+responsePrices.length);

// Used to watch amount of Promises executing in a single moment of time

//const listOfArgumentsB = [];

//const argumentSymbol = [];
// Delays per operation to fake async request




// Fill delays in order to use the same array between all invocations
// Single delay is a value in milliseconds from 1000 to 10000
for (let i = 0; i < queryBook.length; i++) {
  //listOfArguments.push(i);
  
  if ((queryBook[i][0]=='ADD_TO_SELL_SIDE') || (queryBook[i][0]=='M_ADD_TO_SELL_SIDE')  ){
	  for (u=0; u<userDet.length; u++){
		  if (userDet[u].username == queryBook[i][1]){
			  console.log('NEW - ADDING COIN TO SELL');
			  console.log(' ADD COIN: IT SYNCED THE USERNAMES '+queryBook[i][1]);
			  
				var bytes_ak  = CryptoJS.AES.decrypt(userDet[u].a_k, '#yB*32_Ppz'+userDet[u].username+'gpwo12(');
				var bytes_sk  = CryptoJS.AES.decrypt(userDet[u].s_k, '#yB*32_Ppz'+userDet[u].username+'gpwo12(');
			  
					var dataQueryString = 'symbol='+queryBook[i][2]+'&limit=10&recvWindow=20000&timestamp='+responseST.serverTime;
					var signature = CryptoJS.HmacSHA256(dataQueryString, bytes_sk.toString(CryptoJS.enc.Utf8)).toString(CryptoJS.enc.Hex);
					//var url = 'https://api.binance.com/api/v3/myTrades?'+dataQueryString+'&signature='+signature;
					
					if ( ((queryBook[i][0]=='ADD_TO_SELL_SIDE') && (queryBook[i][8]=='no') ) || ((queryBook[i][0]=='M_ADD_TO_SELL_SIDE') && (queryBook[i][8]=='true') ) ) {
						var url = 'https://api.binance.com/api/v3/myTrades?'+dataQueryString+'&signature='+signature;
						listOfArguments.push([url, 'GET', 'MY_TRADES', userDet[u].username, bytes_ak, queryBook[i]  ]);	
					}
					if ( ((queryBook[i][0]=='M_ADD_TO_SELL_SIDE') && (queryBook[i][8]=='no') ) || ((queryBook[i][0]=='ADD_TO_SELL_SIDE') && (queryBook[i][8]=='true') ) ) {
						var url = 'https://api.binance.com/sapi/v1/margin/myTrades?'+dataQueryString+'&signature='+signature;
						listOfArguments.push([url, 'GET', 'MY_TRADES', userDet[u].username, bytes_ak, queryBook[i]  ]);	
					}
						
		   }
			  
		}
		
		//put it here...
	  queryBook.splice(i, 1);
	  i--;
		
   }
	  
  
  
  
  
  

}
		//, , , , 
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

//console.log('listOfArguments below:');
//console.log(listOfArguments);
//console.log(listOfArguments.length);
//console.log('-   -   -   -   -   -   -')
console.log('-      -      -      -      -      -      -')
console.log('move to sell side_ : Requests LENGTH:'+listOfArguments.length);
console.log('-      -      -      -      -      -      -')
//console.log('-   -   -   -   -   -   -')


var promList = [];

// Fake async: resolve an array through arbitrary delay
// Increase a counter in order to watch amount of Promises executed
const asyncOperation = index => {
  counter++;
  return new Promise((resolve, reject) => {
  
  
  ///-----------------------------------------
	//	 console.log('moveToSellSide: index[0] sent:'+index[0]);
		 
		 const controller = new AbortController();
		setTimeout(() => controller.abort(), 20000);
	  
		
		//var fetchVar;
		var initObject={};
		//let reqHeader = new Headers();
	//	if (index[2]=='S_REST'){
			initObject = {
				method: index[1], headers: {'X-MBX-APIKEY': index[4].toString(CryptoJS.enc.Utf8)}, signal: controller.signal,
			}; 
	//	}
	//	else {
	//		initObject = {
	//			method: index[1],
	//		}; 
	//	}
		
		
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
						
				 //var j_prom = [index[3],  index[5], data ];
				promList.push([index[3],  index[5], data ]);
						
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
  ///---------------------------------------
  
		
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

//console.log(listOfArguments);
/* var promList = await take3subtake1part1();
console.log('----promList Below:---- NEW BELOW:');
console.log(promList); */

console.log('About to run promises...');
 await take3subtake1part0();
 console.log('listOfArguments #: '+listOfArguments.length);
console.log('promList #: '+promList.length);

for (g=0; g<promList.length; g++){
	var _responseJsonB = promList[g][2];
	
	console.log('----promList[g][2] Below:---- :');
console.log(promList[g][2]);
	
	var r=0;
	var _outputB_price = null;
	while(r<_responseJsonB.length){
		if ((_responseJsonB[r].isBuyer == true) && (  ((promList[g][1][0]=='ADD_TO_SELL_SIDE') && (promList[g][1][8]=='no') ) || ((promList[g][1][0]=='M_ADD_TO_SELL_SIDE') && (promList[g][1][8]=='true') )  )  ){
			_outputB_price = _responseJsonB[r].price;
		}
		if ((_responseJsonB[r].isBuyer == false) && (  ((promList[g][1][0]=='M_ADD_TO_SELL_SIDE') && (promList[g][1][8]=='no') ) || ((promList[g][1][0]=='ADD_TO_SELL_SIDE') && (promList[g][1][8]=='true') )  )  ){
			_outputB_price = _responseJsonB[r].price;
			//console.log('IT DEFINITELY FOUND THE PRICE....')
		}
		r++;
	}
	var baseBalanceParseFloat = parseFloat(promList[g][1][3]);
	if (_outputB_price){
		var __ws_json=[];								
		snapshot = await firebase.database().ref('/Ins/'+promList[g][0]+'_S').once('value').catch((error)=>console.log(error));
		__ws_json = (snapshot.val() && snapshot.val().ws_key) || [];
		
		var symbolVar = promList[g][1][2];
		
		//if (promList[g][1][0]=='ADD_TO_SELL_SIDE'){
		if (  ((promList[g][1][0]=='ADD_TO_SELL_SIDE') && (promList[g][1][8]=='no') ) || ((promList[g][1][0]=='M_ADD_TO_SELL_SIDE') && (promList[g][1][8]=='true') )  ){
			
			
			
			var dec_ = '';						
			if (promList[g][1][0]=='ADD_TO_SELL_SIDE'){
				dec_='LONG';
			}
			else if (promList[g][1][0]=='M_ADD_TO_SELL_SIDE'){
				dec_='SHORT_BUY';
			}
			
			
			__ws_json.push({'symB':promList[g][1][2], 'monitorButtonColor':'rgba(82, 208, 23, 1)', 'monitorButtonColorB':'#8E0E0A', 'monitorButtonText':'Stop Monitoring', 'initialPrice':_outputB_price, 'discountPercent':'2', 'premiumPercent':'2.9', 'baseBalance':baseBalanceParseFloat, 'chart':promList[g][1][4], 'chart_c':promList[g][1][6], 'rsi':promList[g][1][7], 'date':now.format('YYYY-MM-DD HH:mm:ss'), 'type':dec_, 'model':promList[g][1][5], 'flipped':promList[g][1][8],   });
			firebase.database().ref('/Ins/'+promList[g][0]+'_S').set({
				ws_key: JSON.parse( JSON.stringify(__ws_json) ),
			})
		}
		
		//if (promList[g][1][0]=='M_ADD_TO_SELL_SIDE'){
		if (  ((promList[g][1][0]=='M_ADD_TO_SELL_SIDE') && (promList[g][1][8]=='no') ) || ((promList[g][1][0]=='ADD_TO_SELL_SIDE') && (promList[g][1][8]=='true') )  ){
			
			
			var dec_ = '';						
			if (promList[g][1][0]=='ADD_TO_SELL_SIDE'){
				dec_='LONG';
			}
			else if (promList[g][1][0]=='M_ADD_TO_SELL_SIDE'){
				dec_='SHORT_BUY';
			}
			
			__ws_json.push({'symB':promList[g][1][2], 'monitorButtonColor':'rgba(82, 208, 23, 1)', 'monitorButtonColorB':'#8E0E0A', 'monitorButtonText':'Stop Monitoring', 'initialPrice':_outputB_price, 'discountPercent':'2', 'premiumPercent':'2.9', 'baseBalance':baseBalanceParseFloat, 'chart':promList[g][1][4], 'chart_c':promList[g][1][6], 'rsi':promList[g][1][7], 'date':now.format('YYYY-MM-DD HH:mm:ss'), 'type':dec_, 'model':promList[g][1][5], 'flipped':promList[g][1][8],  });
			firebase.database().ref('/Ins/'+promList[g][0]+'_S').set({
				ws_key: JSON.parse( JSON.stringify(__ws_json) ),
			})
		}
		
		
	}
	
}



//if (counter==0){	
//	clearInterval(interval);
//}



//console.log(promList)

//0--------------------------------
	


var d = new Date();
	console.log('Time End:'+d);

 return listOfArguments.length;
 
}

module.exports ={
        moveAllToSellSide
    }