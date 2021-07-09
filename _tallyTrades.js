


//tallyAllTrades();

//algoLoopC();
//algoLoopD();


async function tallyAllTrades() {
	
	var totalOrderRequests=0;
	
	var d = new Date();
	console.log('TallyTrades: Time Start:'+d);
	
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

let userDet = [];
	let users = [];
	

	var queryBook = [];
	var qb = fs.readFileSync('1queryBook.json','utf8');
	if (qb){
		queryBook = JSON.parse(qb);
	}
	console.log('queryBook length:'+queryBook.length);
	
	const controllerA = new AbortController();
	setTimeout(() => controllerA.abort(), 20000);
	//controllerA.abort();
	let response = await fetch('https://www.binance.com/api/v3/time', {signal: controllerA.signal,} ).catch((error)=>console.log(error));
	let responseST;
	if (response){
		//. . . . . .
		responseST = await response.json();
	console.log('SERVER TIME:'+responseST.serverTime);

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
	
	//console.log(' userDet below : ');
	//console.log(userDet);
	
	
	

	
	//let response = await fetch('https://api.binance.com/api/v3/ticker/price').catch((error)=>console.log(error));
		//let responsePrices = await response.json();
	//console.log('responsePrices length:'+responsePrices.length);
	
	let snapDataA = [];


const snapshotA = await firebase.database().ref('/ordersMulti/').once('value').catch((error)=>console.log(error));
				snapDataA = snapshotA.val() || [];
				
				/* console.log('snapData BELOW DEFS THIS>>>');
				console.log(snapDataA); */
	
				
				/* let p=0;
				for (x in snapData) {
					snapData[x].key = x;
					newData[p] = snapData[x];
					p++;
				}
				var ReverseDataB = newData.reverse();
				console.log('ReverseDataB');
				console.log(ReverseDataB); */


for (let i = 0; i < queryBook.length; i++) {
  //listOfArguments.push(i);
  
  if (queryBook[i][0]=='TALLY_TRADES'){
	  for (u=0; u<userDet.length; u++){
		  if (userDet[u].username == queryBook[i][1]){
			  var ws_user = userDet[u].username;
			  
			 var tV = queryBook[i][2][0];
			 var rLA = queryBook[i][2][1];
			  
			  console.log('TALLY TRADES TV:'+tV+' & rLA:'+rLA);
			  
			  //--------------------------------------------------------------------------------
				var tVa = moment(tV, 'YYYY-MM-DD');
				var b = moment().format('YYYY-MM-04');
	
				console.log('tVa DIFFERENCE::::'+tVa.diff(b, 'days'));
	
				var tVMonth = moment(tV).format('MM');
				console.log('tVMonth:: : : '+tVMonth);
	
				/* if (( tVa.diff(b, 'days') <0) && (rLA=='1') ){
					//var prevM = moment(tV).subtract(1, 'months').format('YYYY-MM-DD');
					var prevM = moment().subtract(1, 'months').format('YYYY-MM-DD');
					console.log('PREV TV MONTH::'+prevM);
					var runPrevMAgain='0';
					console.log('-------------------------------------------');
					//await _tallyTrades(prevM, runPrevMAgain);
					queryBook[i][2][1] ='0';
					queryBook.push(['TALLY_TRADES', queryBook[i][1], [prevM, runPrevMAgain] ]);
				} */
				//-----------------------------------------------------------------------------
				
				
				//var moment = require('moment');
	
				/* let snapData = [];
				let newData = [];
				const ndCount =0;
				const snapshotB = await firebase.database().ref('/ordersMulti/' + ws_user).once('value').catch((error)=>console.log(error));
				snapData = snapshotB.val() || [];
				
				console.log('snapData BELOW DEFS THIS>>>');
				console.log(snapData);
	
				let p=0;
				for (x in snapData) {
					//snapData[x].key = x;
					newData[p] = snapData[x];
					p++;
				}
				var ReverseData = newData.reverse(); */
				
				
						var irData_ = snapDataA[userDet[u].username];
					  /* console.log('irData_: below: ');
					  console.log(irData_[0]); */
					  //console.log('vsvsvsvsvsvsvsvsvsvsvsvsvsvsvsvsvsvsvsvsvsvsv')
					 
						let newData = [];
						let p=0;
						for (x in irData_) {
							newData[p] = irData_[x];
							p++;
						}
						var ReverseData = newData.reverse();
						//console.log('ReverseData ::')
						//console.log(ReverseData);
					//	console.log('0--------0------0-------0-------')
	
				// console.log('THE FUNCTION FOR TALLY TRADES>>>');
				// console.log(ReverseData);
				
			  
			  var y=0;
				var AllTradeData=[];
				var z=0;
				
				//...
				/* var new_snapDataList=[];
				var sd___= snapData; */
				//...
				
				while ( (z<ReverseData.length)   ){
					if ((ReverseData[z].orderType=='SELL') || (ReverseData[z].orderType=='MARKET SELL')  ){
						var timeSold = moment(ReverseData[z].date, 'YYYY-MM-DD HH:mm:ss');
						if (ReverseData[z].orderId){
							//orderStatus = await client2.getOrder({symbol:ReverseData[z].symbol, orderId:ReverseData[z].orderId, useServerTime:true, }).catch((error)=>console.log(error));
							/////
							var bytes_ak  = CryptoJS.AES.decrypt(userDet[u].a_k, '#yB*32_Ppz'+userDet[u].username+'gpwo12(');
							var bytes_sk  = CryptoJS.AES.decrypt(userDet[u].s_k, '#yB*32_Ppz'+userDet[u].username+'gpwo12(');
							//buy it lower...
							var dataQueryString = 'symbol='+ReverseData[z].symbol+'&orderId='+ReverseData[z].orderId+'&recvWindow=20000&timestamp='+responseST.serverTime;
							var signature = CryptoJS.HmacSHA256(dataQueryString, bytes_sk.toString(CryptoJS.enc.Utf8)).toString(CryptoJS.enc.Hex);
							var url = 'https://api.binance.com/api/v3/order?'+dataQueryString+'&signature='+signature;
							//listOfArguments.push([url, 'GET', 'TALLY_TRADES', userDet[u].username, bytes_ak, queryBook[i][2]  ]);
							listOfArguments.push([url, 'GET', 'TALLY_TRADES', bytes_ak, queryBook[i], ReverseData[z], 'LONG', z,  ]);
							
						//	ReverseData.splice(z, 1);
						//	z--; 
			
						}
					}
					else if ((ReverseData[z].orderType=='SHORT_BUY' ) || (ReverseData[z].orderType=='SHORT_BUY MARKET' )){
						var timeSold = moment(ReverseData[z].date, 'YYYY-MM-DD HH:mm:ss');
						if (ReverseData[z].orderId){
							var bytes_ak  = CryptoJS.AES.decrypt(userDet[u].a_k, '#yB*32_Ppz'+userDet[u].username+'gpwo12(');
							var bytes_sk  = CryptoJS.AES.decrypt(userDet[u].s_k, '#yB*32_Ppz'+userDet[u].username+'gpwo12(');
							var dataQueryString = 'symbol='+ReverseData[z].symbol+'&orderId='+ReverseData[z].orderId+'&recvWindow=20000&timestamp='+responseST.serverTime;
							var signature = CryptoJS.HmacSHA256(dataQueryString, bytes_sk.toString(CryptoJS.enc.Utf8)).toString(CryptoJS.enc.Hex);
							var url = 'https://api.binance.com/sapi/v1/margin/order?'+dataQueryString+'&signature='+signature;
							listOfArguments.push([url, 'GET', 'TALLY_TRADES', bytes_ak, queryBook[i], ReverseData[z], 'SHORT', z, ]);
							
						//	ReverseData.splice(z, 1);
						//	z--; 
							
						}
					}
					
					z++;
				}
				
				//console.log('ReverseData :: :: :: ');
				//console.log(ReverseData.reverse());
				//firebase.database().ref('/ordersMulti/'+queryBook[i][1]+'/').set(ReverseData.reverse());  ///take away this comment... // this one...
			  
			  console.log('TALLY TRADES: IT SYNCED THE USERNAMES '+queryBook[i][1])
			  
			//	var bytes_ak  = CryptoJS.AES.decrypt(userDet[u].a_k, '#yB*32_Ppz'+userDet[u].username+'gpwo12(');
			//	var bytes_sk  = CryptoJS.AES.decrypt(userDet[u].s_k, '#yB*32_Ppz'+userDet[u].username+'gpwo12(');
			  //buy it lower...
					//var dataQueryString = 'symbol='+queryBook[i][2][0]+'&side=BUY&type=STOP_LOSS_LIMIT&quantity='+Math.floor(queryBook[i][2][1])+'&price='+parseFloat(queryBook[i][2][2])+'&stopPrice='+parseFloat(queryBook[i][2][3])+'&timeInForce=GTC&recvWindow=20000&timestamp='+responseST.serverTime;
					//var signature = CryptoJS.HmacSHA256(dataQueryString, bytes_sk.toString(CryptoJS.enc.Utf8)).toString(CryptoJS.enc.Hex);
					//var url = 'https://api.binance.com/api/v3/order?'+dataQueryString+'&signature='+signature;
					//listOfArguments.push([url, 'POST', 'NEW_BUY_ORDER', userDet[u].username, bytes_ak, queryBook[i][2]  ]);
			
			
					
				
					
		  }
	  }
	  //put it here...
	  //queryBook.splice(i, 1);
	  //i--;
  }
  
  //if (responsePrices[i].symbol.substr(-4) == 'USDT'){
		//listOfArguments.push([responsePrices[i].symbol, '30m', responsePrices[i].price]);
		//listOfArguments.push([responsePrices[i].symbol, '1h', responsePrices[i].price]);
//  }

}

		//. . . . . . 
	}
	else {
		console.log('NO INTERNET CONNECTION')
	}
	
	
//var fs_p = require('fs').promises;
//	try {
//		await fs_p.writeFile('1queryBook.json', JSON.stringify(queryBook));
//		console.info("File created successfully with Node.js v13 fs_p.promises!");
//	} catch (error){
//		console.error(error);
//	}

/* console.log('listOfArguments below:');
console.log(listOfArguments);
console.log(listOfArguments.length); */
/* console.log('-   -   -   -   -   -   -')
console.log('-      -      -      -      -      -      -')
console.log('Tally Trades: LENGTH:'+listOfArguments.length);
console.log('-      -      -      -      -      -      -')
console.log('-   -   -   -   -   -   -') */

// Fake async: resolve an array through arbitrary delay
// Increase a counter in order to watch amount of Promises executed



var promList = [];

const asyncOperation = index => {
  counter++;
  return new Promise((resolve, reject) => {
	  
	  ///----------------------------------
	 //  console.log('TallyTrades: index[0] sent:'+index[0]);
	   
	   const controller = new AbortController();
		setTimeout(() => controller.abort(), 20000);
	  
		
		//var fetchVar;
		var initObject={};
		//let reqHeader = new Headers();
	//	if (index[2]=='S_REST'){
			initObject = {
				method: index[1], headers: {'X-MBX-APIKEY': index[3].toString(CryptoJS.enc.Utf8)}, signal: controller.signal,
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
						
				if (index[2]=='TALLY_TRADES'){
					promList.push([index[4], index[5], data, index[6], index[7]  ]);
				}
				else if (index[2]=='QUERY_TRADES'){
					promList.push([index[4], index[5], index[6], data, index[7], ]);
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
	  ///----------------------------------\\
  
  
		
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









//setTimeout( watchCounter, 1000*3);

//console.log(listOfArguments);
/* var promList = await take3subtake1part1();
console.log('----promList Below:---- NOT ANYMORE');
console.log(promList); */

console.log('About to run promises...');
 await take3subtake1part0();
 console.log('listOfArguments #: '+listOfArguments.length);
console.log('promList #: '+promList.length);


/* for (k=0; k<promList.length; k++){
	var reverseDataZ = promList[k][2];
	var revData_ = promList[k][1];
	var pl_LongShort = promList[k][3];
	var z_ = promList[k][4];
	
	var tVMonthVar = moment(promList[k][0][2][0]).format('MM');
	//console.log(': tVMonthVar : '+tVMonthVar+' date:'+revData_.date);
	
	if (reverseDataZ.status=='FILLED') {
		
		
		
		ReverseData.splice(z_, 1);
		
		
		for (u=0; u<userDet.length; u++){
		  if (userDet[u].username == promList[k][0][1]){
			  console.log(' IT ONCE AGAIN MATCHED USERS:'+promList[k][0][1]);
			  
				var bytes_ak  = CryptoJS.AES.decrypt(userDet[u].a_k, '#yB*32_Ppz'+userDet[u].username+'gpwo12(');
				var bytes_sk  = CryptoJS.AES.decrypt(userDet[u].s_k, '#yB*32_Ppz'+userDet[u].username+'gpwo12(');
				
				var dataQueryString = 'symbol='+revData_.symbol+'&limit=15&recvWindow=20000&timestamp='+responseST.serverTime;
				var signature = CryptoJS.HmacSHA256(dataQueryString, bytes_sk.toString(CryptoJS.enc.Utf8)).toString(CryptoJS.enc.Hex);
				
				if (pl_LongShort=='LONG'){
					var url = 'https://api.binance.com/api/v3/myTrades?'+dataQueryString+'&signature='+signature;
					listOfArgumentsB.push([url, 'GET', 'QUERY_TRADES', bytes_ak, promList[k][0], promList[k][1], promList[k][2], promList[k][3]   ]);
				}
				else if (pl_LongShort=='SHORT') {
					var url = 'https://api.binance.com/sapi/v1/margin/myTrades?'+dataQueryString+'&signature='+signature;
					listOfArgumentsB.push([url, 'GET', 'QUERY_TRADES', bytes_ak, promList[k][0], promList[k][1], promList[k][2], promList[k][3]   ]);
				}
				
			  
			  
		  }
		}
		//B . push
		
		
		
	}
} */



 
	
	
for (u=0; u<userDet.length; u++){
	for (k=0; k<promList.length; k++){
		
		if (userDet[u].username == promList[k][0][1]){
			var reverseDataZ = promList[k][2];
			var revData_ = promList[k][1];
			var pl_LongShort = promList[k][3];
			var z_ = promList[k][4];
			var tVMonthVar = moment(promList[k][0][2][0]).format('MM');
			
			if (reverseDataZ.status=='FILLED') {
				
				
				var bytes_ak  = CryptoJS.AES.decrypt(userDet[u].a_k, '#yB*32_Ppz'+userDet[u].username+'gpwo12(');
				var bytes_sk  = CryptoJS.AES.decrypt(userDet[u].s_k, '#yB*32_Ppz'+userDet[u].username+'gpwo12(');
				
				var dataQueryString = 'symbol='+revData_.symbol+'&limit=15&recvWindow=20000&timestamp='+responseST.serverTime;
				var signature = CryptoJS.HmacSHA256(dataQueryString, bytes_sk.toString(CryptoJS.enc.Utf8)).toString(CryptoJS.enc.Hex);
				
				if (pl_LongShort=='LONG'){
					var url = 'https://api.binance.com/api/v3/myTrades?'+dataQueryString+'&signature='+signature;
					listOfArgumentsB.push([url, 'GET', 'QUERY_TRADES', bytes_ak, promList[k][0], promList[k][1], promList[k][2], promList[k][3]   ]);
				}
				else if (pl_LongShort=='SHORT') {
					var url = 'https://api.binance.com/sapi/v1/margin/myTrades?'+dataQueryString+'&signature='+signature;
					listOfArgumentsB.push([url, 'GET', 'QUERY_TRADES', bytes_ak, promList[k][0], promList[k][1], promList[k][2], promList[k][3]   ]);
				}
				
			}
			
		}
		
	}
	//console.log('ReverseData :: :: :: ');
	//console.log(ReverseData.reverse());
	//console.log('ADDING TO '+userDet[u].username);
	//firebase.database().ref('/ordersMulti/'+userDet[u].username+'/').set(ReverseData.reverse());  ///take away this comment... // this one...
}  


let snapData = [];


const snapshotB = await firebase.database().ref('/ordersMulti/').once('value').catch((error)=>console.log(error));
				snapData = snapshotB.val() || [];
				
				/* console.log('snapData BELOW DEFS THIS>>>');
				console.log(snapData); */
	
				
				/* let p=0;
				for (x in snapData) {
					snapData[x].key = x;
					newData[p] = snapData[x];
					p++;
				}
				var ReverseDataB = newData.reverse();
				console.log('ReverseDataB');
				console.log(ReverseDataB); */


for (u=0; u<userDet.length; u++){
	/*  console.log('user:'+userDet[u].username);
	 console.log('details for user below:__'); */
	 //console.log(snapData[userDet[u].username])
	 var rData_ = snapData[userDet[u].username];
	  /* console.log('rData_: below: ');
	  console.log(rData_[0]); */
	  //console.log('vsvsvsvsvsvsvsvsvsvsvsvsvsvsvsvsvsvsvsvsvsvsv')
	 
		let newData = [];
		let p=0;
		for (x in rData_) {
			newData[p] = rData_[x];
			p++;
		}
		var rData_B = newData.reverse();
		/* console.log('rData_B ::')
		console.log(rData_B);
		console.log('0--------0------0-------0-------') */
		
		for (var a=0; a<rData_B.length; a++){
			//console.log(rData_B[a]);
			//console.log('909090909090909099')
			for (k=0; k<promList.length; k++){
				if (userDet[u].username == promList[k][0][1]){
					var reverseDataZ = promList[k][2];
					var revData_ = promList[k][1];
					var pl_LongShort = promList[k][3];
					var z_ = promList[k][4];
					var tVMonthVar = moment(promList[k][0][2][0]).format('MM');
					
					// console.log('username matched:'+userDet[u].username);
					//console.log(JSON.stringify(rData_B[a]));
					
					//console.log('reverseDataZ.status:'+reverseDataZ.status);
					
					if ((reverseDataZ.status=='FILLED') || (reverseDataZ.status=='CANCELED') ) {
						
						/* console.log('rData_B[a] below');
						console.log(rData_B[a]);
						console.log('. vs .');
						console.log('revData_ below:');
						console.log(revData_); */
						
						if (JSON.stringify(rData_B[a]) === JSON.stringify(revData_)){
							console.log('THE FILLED ORDER MATCHED...');
							console.log(rData_B[a]);
							rData_B.splice(a, 1);
							a--; 
						} 
					}
					
					
					
					
					
					
					
				}
			}
			
			//console.log('_______________')
		}
		
		/* console.log('NEW rData_B');
			console.log(rData_B); */
		
		snapData[userDet[u].username] = rData_B.reverse();
	 //console.log('X_X_X__X_X_X__X_X_X_X_');
	 
	 
	 
 }
 
 /* console.log('NEW UPDATED snapData')
 console.log(snapData); */
 firebase.database().ref('/ordersMulti/').set(snapData);  //take away this comment... // this one...


//console.log('listOfArgumentsB below:');
//console.log(listOfArgumentsB);

	//console.log('-   -   -   -   -   -   -')
console.log('-      -      -      -      -      -      -')
console.log('Make orders: listOfArguments LENGTH:'+listOfArguments.length);
console.log('Make orders: listOfArgumentsB LENGTH:'+listOfArgumentsB.length);
console.log('-      -      -      -      -      -      -')
totalOrderRequests = listOfArguments.length + listOfArgumentsB.length;
console.log('-      -      -      -      -      -      -')
console.log('Make orders: TOTAL REQUESTS::'+totalOrderRequests);
console.log('-      -      -      -      -      -      -')
//console.log('-   -   -   -   -   -   -')

/* var promListB = await take3subtake1part1B();
console.log('----promList Below:---- NOT ANYMORE');
console.log(promListB); */
console.log('About to run promisesB...');
promList = [];
 await take3subtake1part0B();
 console.log('listOfArgumentsB #: '+listOfArgumentsB.length);
 var promListB = promList;//?????????????????????????
console.log('promListB #: '+promList.length);
//console.log(promListB);

//console.log('promListB: '+promListB.length);
//console.log(promListB);


for (let i = 0; i < queryBook.length; i++) {
  //listOfArguments.push(i);
  
	if (queryBook[i][0]=='TALLY_TRADES'){
		var tVMonthVar_A = moment(queryBook[i][2][0]).format('MM');
		var userSpecificTallyTrades = [];
		var snapshotKL = await firebase.database().ref('/trades/'+queryBook[i][1]+'/'+now.format('YYYY '+tVMonthVar_A)).once('value');
		userSpecificTallyTrades = snapshotKL.val() || [] ;
		///console.log('EARLY: userSpecificTallyTrades:: '+userSpecificTallyTrades.length)
		///console.log(userSpecificTallyTrades);
		
	  for (f=0; f<promListB.length; f++){
		  if  ( (queryBook[i][1]==promListB[f][0][1]) && (promListB[f].includes(queryBook[i]))  ){
			 // console.log('DEFS FOUND SOMETHING... '+promListB[f][4])
			  
			  
				var revDataA = promListB[f][1];/// order from database
				//console.log('revDataA below:'); /// key is by A.
				//console.log(revDataA);
				
				var revDataB = promListB[f][2]
				//console.log('revDataB below:'); //order from exchange
				//console.log(revDataB);
	
				var _responseJsonB = promListB[f][3];
				
				var longOrShort = promListB[f][4];
				//console.log('longOrShort:'+longOrShort);
	
				var timeSold = moment(revDataA.date, 'YYYY-MM-DD HH:mm:ss');
	
				let r=0;
				while(r<_responseJsonB.length){
					var timeBought = moment(_responseJsonB[r].time);
					var diffSoldBought = timeSold.diff(timeBought);
					
					if ((_responseJsonB[r].isBuyer == true) && (diffSoldBought>0) && (longOrShort=='LONG') ){
					//if ((_responseJsonB[r].isBuyer == true) && (diffSoldBought>0)  ){
						_outputB_price = _responseJsonB[r].price;
					}
					
					if ((_responseJsonB[r].isBuyer == false) && (diffSoldBought>0) && (longOrShort=='SHORT') ){
						_outputB_price = _responseJsonB[r].price;
					}
					
					
					r++
				}
				//console.log('revDataA'+revDataA.orderPrice);
				var priceBought = _outputB_price;
				var per_ret = (((parseFloat(revDataA.orderPrice)/parseFloat(priceBought))-1)*100).toFixed(2);
	
				//ReverseData[z].btcFee = ReverseData[z].usdtProfit*0.028;
				var usdtProfit = revDataA.orderQty * ( parseFloat(revDataA.orderPrice) -  parseFloat(priceBought)  );
				var btcFee = usdtProfit*0.028;
				//ReverseData[z].usdtProfit*0.028,
				
				///temporarily doing this (reverse system)...
				if (longOrShort=='SHORT'){
					per_ret = per_ret*(-1);
					usdtProfit = usdtProfit*(-1);
					userSpecificTallyTrades.push({'date':revDataA.date, 'priceBought':revDataA.orderPrice, 'orderPrice':priceBought, 'perc_return':per_ret, 'symbol':promListB[f][1].symbol, 'discountPercent':'2', 'btcFee':btcFee, 'orderId':revDataB.orderId, 'orderQty':revDataA.orderQty, 'orderType':revDataA.orderType, 'status':revDataB.status, 'system':'algo ver. 2', 'usdtProfit':usdtProfit, 'method':'SHORT', 'model':'Retrace', 'chart':'30m',    });
				}
				else if (longOrShort=='LONG'){
					userSpecificTallyTrades.push({'date':revDataA.date, 'priceBought':priceBought, 'orderPrice':revDataA.orderPrice, 'perc_return':per_ret, 'symbol':promListB[f][1].symbol, 'discountPercent':'2', 'btcFee':btcFee, 'orderId':revDataB.orderId, 'orderQty':revDataA.orderQty, 'orderType':revDataA.orderType, 'status':revDataB.status, 'system':'algo ver. 2', 'usdtProfit':usdtProfit, 'method':'LONG', 'model':'Retrace', 'chart':'30m',   });
					//revDataB
					//firebase.database().ref('/ordersB/' + queryBook[i][1]+'/').remove();
					//firebase.database().ref('/ordersMulti/' + queryBook[i][1]+'/').remove();
				}
	
		  }
	  }
		
	
	var tVMonthVar_ = moment(queryBook[i][2][0]).format('MM');
	
	// console.log('userSpecificTallyTrades:__');
	//console.log(userSpecificTallyTrades); 
		    
		firebase.database().ref('/trades/'+queryBook[i][1]+'/'+now.format('YYYY '+tVMonthVar_)).set(
										userSpecificTallyTrades
								) 	// this one... defs this one 
		
		 queryBook.splice(i, 1);
		i--;   //AND THIS... 
		
		//firebase.database().ref('/trades/'+queryBook[i][1]+'/'+now.format('YYYY '+tVMonthVar_)).update(
		//								userSpecificTallyTrades
		//						) 
								
		//firebase.database().ref('/ordersB/' + queryBook[i][1]).remove();
		//firebase.database().ref('/ordersMulti/' + queryBook[i][1]).remove();
		
		
		
		console.log('IT WILL PUT IT IN :'+now.format('YYYY '+tVMonthVar_));
		
		
	///	console.log('LATER: userSpecificTallyTrades: '+userSpecificTallyTrades.length);
	///	console.log(userSpecificTallyTrades);
		
		
	  
	  
	}
	
}

 var fs_p = require('fs').promises;
	try {
		await fs_p.writeFile('1queryBook.json', JSON.stringify(queryBook));
		console.info("File created successfully with Node.js v13 fs_p.promises!");
	} catch (error){
		console.error(error);
	} 

	/* var snapshotBM = await firebase.database().ref('/ordersMulti/').once('value');
	var tradeDataBM = snapshotBM.val() || [] ;
			
			console.log(' tradeDataBM :::::')
			console.log(tradeDataBM);
			
		firebase.database().ref('/ordersMultiB/').update(tradeDataBM);  */


var d = new Date();
	console.log('Time End:'+d);

	return totalOrderRequests;

}

module.exports ={
        tallyAllTrades
    }