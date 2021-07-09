
//mainBox();

var fs = require('fs');
	var fs_p = require('fs').promises;
	
	 /* var originalLog = console.log;
	console.log = function(str){
		originalLog(str);
		// Your extra code
		
			//await fs_p.writeFile('log-file.txt', str);
		 fs.appendFile('_main log-file.txt', '\n'+str, 'utf8', function (err) {
										if (err) {
											console.log("An error occured while writing JSON Object to File.");
											return console.log(err);
										}	
										//console.log("FINAL JSON file has been saved.");
									}); 
	  
	}   
	 
	 */


var TOLoopA;

var timeBreak = 1000*60;//3.5 minutes...
//var timeBreak = 1000*180;//3.5 minutes...
async function go () {
	await mainBox();
   TOLoopA = setTimeout(go, timeBreak); // callback
}
go();//here and bove







async function mainBox() {
	
	
	
	
	var totalNumberOfRequests=0;
	var runAnalysisAndSelection = 0;
	var p_runAnalysisAndSelection = 0;
	
	var date_ = new Date();
	console.log('____________________________________________________________________________________')
	console.log('MAIN BOX ACTIVATED'+date_);
	
	
	var moment = require('moment');
	var now = moment();
	var minuteNumber = parseFloat(now.format('mm'));
	//console.log('minuteNumber:'+minuteNumber);
	
	fs.writeFile('time_LoopA.json', now.format('YYYY-MM-DD HH:mm:ss'), 'utf8', function (err) {
										if (err) {
											console.log("An error occured while writing JSON Object to File.");
											return console.log(err);
										}	
										//console.log("FINAL JSON file has been saved.");
									});
	
	
	
	var startTime = moment();//start time...
	
	
	
	const analysis = require("./_analysis.js")
	//const censor_analysis = require("./_analysis200d.js")
	const manageAcc = require("./_manageAcc.js")
	const makeOrders = require("./_makeOrders.js")
	const lookForCoin = require("./_lookForCoin.js")
	const lookForShortCoin = require("./_lookForShort.js")
	const tallyTrades = require("./_tallyTrades.js")
	const moveToSellSide = require("./_moveToSellSide.js")
	//const modA_main = require("../V2.1_desktopNode/_main.js")
	
	const parallel_analysis = require("./parallelTest/_parallel_analysis.js")
	const parallel_lookForCoin = require("./parallelTest/_parallel_lookForCoin.js")
	const parallel_lookForShort = require("./parallelTest/_parallel_lookForShort.js")
	const parallel_manageAcc = require("./parallelTest/_parallel_manageAcc.js")
	
	const pReal_analysis = require("./parallelReal/_pReal_analysis.js")
	const pReal_lookForCoin = require("./parallelReal/_pReal_lookForCoin.js")
	const pReal_lookForShort = require("./parallelReal/_pReal_lookForShort.js")
	const pReal_manageAcc = require("./parallelReal/_pReal_manageAcc.js")
	
	const pVALR_lookForCoin = require("./parallelVALR/_pVALR_lookForCoin.js")
	const pVALR_manageAcc = require("./parallelVALR/_pVALR_manageAcc.js")
	
	
	
	
	var cs_Time = fs.readFileSync('1_analyseTime.txt','utf8');
	if (cs_Time){
		var duration = moment.duration(now.diff(cs_Time));
		var durationMins = duration.asMinutes();
		//console.log('it came here 1');
	}
	
	console.log('Duration Mins: '+durationMins+' (A>26)');
	
	
	/* var cs_TimeB = fs.readFileSync('1_analyseTime200d.txt','utf8');
	if (cs_TimeB){
		var durationB = moment.duration(now.diff(cs_TimeB));
		var durationHrsB = durationB.asHours();
	}
	else {
		
		try {
			await fs_p.writeFile('1_analyseTime200d.txt', now.format('YYYY-MM-DD HH:mm:ss'));
			console.info("File created successfully with Node.js v13 fs_p.promises!");
		} catch (error){
			console.error(error);
		}
	}
	console.log('DurationB Hrs: '+durationHrsB+' (>24)'); */
	
	
	
/* 	if (durationHrsB>24) {
		
		try {
			await fs_p.writeFile('1_analyseTime200d.txt', now.format('YYYY-MM-DD HH:mm:ss'));
		console.info("File TIME UPDATED! for 200d ma");
		} catch (error){
			console.error(error);
		}
		
		console.log('__________________________________________________________________');   
		console.log('RUNNING THE DAILY ANALYSIS TO CHECK THE 200d MA....');
		console.log('__________________________________________________________________');   
		var a_b = await censor_analysis.analyseAllCoins();
		console.log('a_b is done. Total Requests:'+a_b);
		totalNumberOfRequests = totalNumberOfRequests+a_b;
		console.log('__________________________________________________________________');   
		console.log('__________________________________________________________________');   
		console.log('END OF : RUNNING THE DAILY ANALYSIS TO CHECK THE 200d MA....');
		console.log('__________________________________________________________________');   	
		
	}
	else */ 
	
	
	
	if ((durationMins>24) && ( ((minuteNumber>=26) && (minuteNumber<29)) || (((minuteNumber>=56) && (minuteNumber<59))) ) ){
		runAnalysisAndSelection=1;
		var updateAgain=0;
		try {
				await fs_p.writeFile('json/updateTimeAgain.txt', updateAgain);
				console.info("File TIME UPDATED!");
			} catch (error){
				console.error(error);
			}
	}
	
	if ( ((minuteNumber>=26) && (minuteNumber<29)) || (((minuteNumber>=56) && (minuteNumber<59))) ) {
		console.log('it came here 3');
		try {
			await fs_p.writeFile('1_analyseTime.txt', now.format('YYYY-MM-DD HH:mm:ss'));
		console.info("File TIME UPDATED!");
		} catch (error){
			console.error(error);
		}
	}
	
	
	
	
	
	
		
	
	
	    if (runAnalysisAndSelection==1){
		
		 var a = await analysis.analyseAllCoins();
		console.log('A is done. Total Requests:'+a);
		totalNumberOfRequests = totalNumberOfRequests+a;
		console.log('__________________________________________________________________');   
		
			 var c = await lookForCoin.lookForCoinFunc();
			console.log('B is done!!! Total Requests:'+c);
			totalNumberOfRequests=totalNumberOfRequests+c;
			console.log('__________________________________________________________________');
			
			var d = await lookForShortCoin.lookForShortFunc();
			console.log('C is done!!! Total Requests:'+d);
			totalNumberOfRequests=totalNumberOfRequests+d;
			console.log('__________________________________________________________________');       
		
	}   
	
	

	 
	

		
		
 	      var b = await manageAcc.loadAccounts();
	console.log('D is done. Total Requests::->'+b);
	totalNumberOfRequests=totalNumberOfRequests+b;
	console.log('__________________________________________________________________');  
	
	
	 
 	var e = await makeOrders.makeAllOrders();
	console.log('E is done!!! Total Requests:'+e);
	totalNumberOfRequests=totalNumberOfRequests+e;
	console.log('__________________________________________________________________');  
	  var f = await tallyTrades.tallyAllTrades();
	console.log('F is done!!! Total Requests:'+f);
	totalNumberOfRequests=totalNumberOfRequests+f;
	console.log('__________________________________________________________________');  
	var g = await moveToSellSide.moveAllToSellSide();
	console.log('G is done!!! Total Requests:'+g);
	totalNumberOfRequests=totalNumberOfRequests+g;
	console.log('__________________________________________________________________');  
	
	console.log('=============================================================')
	
	//var date_modA_S = new Date();
	//console.log('moving onto the next model now... DELAY START: '+date_modA_S)
	//console.log('=============================================================')
	
	
	var p_cs_Time = fs.readFileSync('parallelTest/1_analyseTime.txt','utf8');
	if (p_cs_Time){
		var p_duration = moment.duration(now.diff(p_cs_Time));
		var p_durationMins = p_duration.asMinutes();
		//console.log('it came here 1');
	}
	
	console.log('parallel Duration Mins: '+p_durationMins+' (P_>26)');
	
	if ((p_durationMins>24) && ( ((minuteNumber>=26) && (minuteNumber<29)) || (((minuteNumber>=56) && (minuteNumber<59))) ) ){
		p_runAnalysisAndSelection=1;
		var updateAgain=0;
		try {
				await fs_p.writeFile('parallelTest/json/updateTimeAgain.txt', updateAgain);
				console.info("parallelTest/json/updateTimeAgain.txt UPDATED!");
			} catch (error){
				console.error(error);
			}
	}
	
	if ( ((minuteNumber>=26) && (minuteNumber<29)) || (((minuteNumber>=56) && (minuteNumber<59))) ) {
		//console.log('it came here 3');
		try {
			await fs_p.writeFile('parallelTest/1_analyseTime.txt', now.format('YYYY-MM-DD HH:mm:ss'));
		console.info("File TIME UPDATED!");
		} catch (error){
			console.error(error);
		}
	}
	
	if (p_runAnalysisAndSelection==1){
		if (runAnalysisAndSelection!=1){
			console.log('DID NOT RUN ANALYSIS INITIALLY SO DOING IT NOW...')
			 var p_a = await analysis.analyseAllCoins();
			console.log('p_ A is done. Total Requests:'+p_a);
			totalNumberOfRequests = totalNumberOfRequests+p_a;
			console.log('__________________________________________________________________');   
		}
		
			var p2 = await parallel_lookForCoin.lookForCoinFunc();
			  console.log('P2 is done. Total Requests:'+p2);
			  totalNumberOfRequests = totalNumberOfRequests+p2;
			  console.log('__________________________________________________________________');   
		
			var p3 = await parallel_lookForShort.lookForShortFunc();
			  console.log('P3 is done. Total Requests:'+p3);
			  totalNumberOfRequests = totalNumberOfRequests+p3;
			  console.log('__________________________________________________________________');     
		  
	}  
	
	    var p4 = await parallel_manageAcc.loadAccounts();
		console.log('P4 is done. Total Requests:'+p4);
		 totalNumberOfRequests = totalNumberOfRequests+p4;
		 console.log('__________________________________________________________________');      	 
	  
	 
	
	
	//.... end of parallel test
	
	
	if (p_runAnalysisAndSelection==1){
		if (runAnalysisAndSelection!=1){
			console.log('DID NOT RUN ANALYSIS INITIALLY SO DOING IT NOW...')
			 var p_aR = await analysis.analyseAllCoins();
			console.log('p_ AR is done. Total Requests:'+p_aR);
			totalNumberOfRequests = totalNumberOfRequests+p_aR;
			console.log('__________________________________________________________________');   
		}
		
			var pR2 = await pReal_lookForCoin.lookForCoinFunc();
			  console.log('PR2 is done. Total Requests:'+p2);
			  totalNumberOfRequests = totalNumberOfRequests+pR2;
			  console.log('__________________________________________________________________');   
		
			var pR3 = await pReal_lookForShort.lookForShortFunc();
			  console.log('PR3 is done. Total Requests:'+pR3);
			  totalNumberOfRequests = totalNumberOfRequests+pR3;
			  console.log('__________________________________________________________________');     
		  
	}  
	
	    var pR4 = await pReal_manageAcc.loadAccounts();
		console.log('PR4 is done. Total Requests:'+pR4);
		 totalNumberOfRequests = totalNumberOfRequests+pR4;
		 console.log('__________________________________________________________________');      
	
	// end of pREAL TEST
	
	
	
//.................................................................	
	// start of valR test....
	//runAnalysisAndSelection=1;
	/* if (runAnalysisAndSelection==1){
		console.log('VALR TESTING BEGIN');
		
		var pV2 = await pVALR_lookForCoin.lookForCoinFunc();
		console.log('pV2 is done. Total Requests:'+pV2);
		totalNumberOfRequests = totalNumberOfRequests+pV2;
		console.log('__________________________________________________________________');    
		
		
		 var pV4 = await pVALR_manageAcc.loadAccounts();
		 console.log('pV4 is done. Total Requests:'+pV4);
		  totalNumberOfRequests = totalNumberOfRequests+pV4;
		  console.log('__________________________________________________________________');      
		
		console.log('VALR TESTING END');
		
		//console.log()
	} */
	
	
	
	
	
	
	
	
	
	
//..........................................................................................................	
	var endTime = moment();//start time...
	var date_B = new Date();
	console.log('____________________________________________________________________________________')
	console.log('MAIN ENDED: '+date_B)
	console.log('Total Requests made:'+totalNumberOfRequests);
	console.log(endTime.from(startTime));
	console.log('____________________________________________________________________________________')
	
}







  
