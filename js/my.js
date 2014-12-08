									/*UI Design and IO By Motasim Hussain, Algorithms By Usman Shaheen*/
$(function(){
	$("#procPanel").addClass("hidden");
	$("#quanta").addClass('hidden');
	$("#output").hide();
	var i=0;

	// Creating Blue Print
	var proc = {
		init:function(){
			this.name = "";
			this.startTime = 0;
			this.servTime = 0;
			this.counter = 0;
			this.waitingTime=0;
			this.dat = [];
			return this;
		},

		name: "",
		startTime: 0,
		serviceTime: 0,
		counter: 0,
		queueNumber:1,
		waitingTime:0,
		dat: []
		
	}

	/////// Array That Holds the object instances ///////
	var arr = [];

	// Creating Queue

	
	var posOut = 0;
	var posOut1 = 0;
	var posOut2 = 0;
	var posOut3 = 0;
	
	var posIn = 0;
	var posIn1 = 0;
	var posIn2 = 0;
	var posIn3 = 0;
	var queue = [];
	function enQueue (a) {
		queue[posIn] = a;
		posIn++; 		
	}

	function deQueue () {
		if (posOut<posIn) {
			var temp = queue[posOut];
			posOut++;
			return temp;
		}else{
			console.log("Queue Empty");
		}
		
	}
	function getLenQueue(){
	return (posIn-posOut);
	}
	var queue1 = [];
	function enQueue1 (a) {
		queue1[posIn1] = a;
		posIn1++; 		
	}

	function deQueue1 () {
		if (posOut1<posIn1) {
			var temp = queue1[posOut1];
			posOut1++;
			return temp;
		}else{
			console.log("Queue 1 Empty");
		}
		
	}
	
	function getLenQueue1(){
	return ((posIn1)-(posOut1));
	}
	var queue2 = [];
	function enQueue2 (a) {
		queue2[posIn2] = a;
		posIn2++; 		
	}
	
	
	function deQueue2 () {
		if (posOut2<posIn2) {
			var temp = queue2[posOut2];
			posOut2++;
			return temp;
		}else{
			console.log("Queue 2 Empty");
		}
		
	}
	
	
	function getLenQueue2(){
	return ((posIn2)-(posOut2));
	}	
	var queue3 = [];
	function enQueue3 (a) {
		queue3[posIn3] = a;
		posIn3++; 		
	}

	function deQueue3 () {
		if (posOut3<posIn3) {
			var temp = queue3[posOut3];
			posOut3++;
			return temp;
		}else{
			console.log("Queue 3 Empty");
		}
		
	}
	function getLenQueue3(){
	return ((posIn3)-(posOut3));
	}
	
	

	var tempStart = 0;
	var qSize = 1;

	////////// Checkig to see if qunta is needed or not //////////
	$("#choice").change(function(){
   		switch($("#choice").val()){
   			case "rrb":
   				$("#quanta").fadeIn('slow').removeClass('hidden');
   				
   			break;
   			default:
   				qSize = 1;
   				$("#quanta").val("");
   				$("#quanta").fadeOut('slow');
   		}
	});

	//////////// On clicking Add  /////////////////

	$("#add").click(function(event) {
		// initializing array

		arr[i] = Object.create(proc).init();

		

		// Getting values from form
		var name= $("#procName").val();
		var st= $("#startTime").val();
		var servt= $("#serviceTime").val();

		if(name != "" && $.isNumeric(st) && $.isNumeric(servt)){
			

			if(Number(st) >= tempStart){
				//Displaying Process Table
				$("#procPanel").fadeIn('slow').removeClass("hidden");

				//Storing process info in array of objects
				arr[i].name = name;
				arr[i].startTime = Number(st);
				arr[i].serviceTime = Number(servt);

				//Displaying the Process info in Process Panel  << Also Applying Swag!

				var row = $('<tr><td>'+ arr[i].name +'</td><td>'+ arr[i].startTime +'</td><td>'+ arr[i].serviceTime +'</td></tr>');
				row.hide();
				$('#procPanel tr:last').after(row);
				row.fadeIn("slow");
				i++;

				//Clearing form after storing values
				$("#procName").val("");
				$("#startTime").val("");
				$("#serviceTime").val("");
				//Returning focus to process name
				$("#procName").focus();
			
				//Keeping track of current start time
				tempStart = Number(st);
			}else{
				$('#inpErr').modal();
			}

			
		}else{
			if(name == ""){
				$("#procName").parent().addClass('has-error');
			}
			if(!$.isNumeric(st)){
				$("#startTime").parent().addClass('has-error');
			}
			if(!$.isNumeric(servt)){
				$("#serviceTime").parent().addClass('has-error');
			}
		}
		
		
		console.log(arr);
	});

	
	var servTime = 0;
////////////////////////// On clicking start ////////////////////////////////////
	$("#start").click(function(event) {
		qSize = Number($("#quanta").val());
		$("#formPanel").fadeOut('slow');
		$("#output").fadeIn('slow');
		
		if(arr.length > 0){
			for (var i = 0; i < arr.length; i++) {
				servTime += Number(arr[i].serviceTime);
			};

///////////////////// Choosing the algo to be applied ////////////////////////////

			switch($("#choice").val()){
				case 'ffs':
					$("#output").append(populateTable(null,arr.length,servTime,firstServe(arr,servTime)));
				break;
				case 'rrb':
					$("#output").append(populateTable(null,arr.length,servTime,roundRobin(arr,servTime,qSize)));
				break;
				case 'sf':
					$("#output").append(populateTable(null,arr.length,servTime,shortestFirst(arr,servTime)));
				break;
				case 'str':
					$("#output").append(populateTable(null,arr.length,servTime,shortestTimeRemaining(arr,servTime)));
				break;
				case 'hrr':
					$("#output").append(populateTable(null,arr.length,servTime,highestResponse(arr,servTime)));
				break;						
				case 'fb':
					$("#output").append(populateTable(null,arr.length,servTime,feedBack(arr,servTime)));
				break;					
				
			}

			
			$("#start").addClass('disabled');
			
		}
	});

	var k=0;
	function popRows(len){
		setTimeout(function(){
			if(k<len){
				var row = $('<tr></tr>');
				$('#output tbody').append(row);
				reDisp(servTime,len);
				
				k++;
			}

		},0);

	}

	var j =0;
	function reDisp(count,len){
		setTimeout(function(){
			if(j<count){
				var row = $('<td>hi</td>');
				$('#output tr:last').append(row);
				reDisp(count);
				j++;
			}
		},0);
		popRows(len);
	}


	function populateTable(table, rows, cells, content) {
	    if (!table) table = document.createElement('table');
	    var head = document.createElement('thead');
	    var row = document.createElement('tr');
	    for (var i = 0; i <= cells; i++) {
	    	row.appendChild(document.createElement('th'));
	    	row.cells[i].appendChild(document.createTextNode(i));
	    };


	    head.appendChild(row);
	    table.appendChild(head);

	    var body = document.createElement('tbody');
	    table.appendChild(body);
	    var c = 0;
	    for (var i = 0; i < rows; ++i) {
	        var row = document.createElement('tr');
	        for (var j = 0; j <= cells; ++j) {
	        	var td = document.createElement('td');
	        	td.setAttribute('class','text-center');
	            row.appendChild(td);

	            row.cells[j].appendChild(document.createTextNode(content[c]));
	            c++;
	        }
	        body.appendChild(row);
	    }
	    table.setAttribute('class', 'table table-hover');

	    return table;
	}

	// First Come First Serve

	function firstServe(prInfo,tTime){
		var prFlag = false;
		var currProc;

		for (var i = 0; i < prInfo.length; i++) {
			for (var j = 0; j <= tTime; j++) {
				prInfo[i].dat[j] = "-";
			};
		}

		for (var i = 0; i <= tTime; i++) {

			for (var j = 0; j < prInfo.length; j++) {
				if(prInfo[j].startTime === i){
					enQueue(prInfo[j]);
				}
			};
			if(i!=0){
			
				if(prFlag){
					currProc.dat[i] = currProc.name;
					currProc.counter++;
					if(currProc.serviceTime === currProc.counter){
						prFlag = false;
					}

				}else{
					if(queue.length > 0){
						currProc = deQueue();
						prFlag = true;
						currProc.dat[i] = currProc.name;
						currProc.counter++;
						if(currProc.serviceTime === currProc.counter){
							prFlag = false;
						}
					}
				}
			}
		};
		var outArr = [];
		count = 0;
		for (var i = 0; i < prInfo.length; i++) {
			for (var j = 0; j < prInfo[i].dat.length; j++) {
				outArr[count] = prInfo[i].dat[j];
				count++;
			};
		};

		return outArr;
	}

	function roundRobin(prInfo,tTime,qSize){

		var prFlag = false;
		var currProc;
		var num=0;// for quantum size chking
		for (var i = 0; i < prInfo.length; i++) {
			for (var j = 0; j <= tTime; j++) {
				prInfo[i].dat[j] = "-";
			};
		}

		for (var i = 0; i <= tTime; i++) {

			for (var j = 0; j < prInfo.length; j++) {
				if(prInfo[j].startTime === i){
					enQueue(prInfo[j]);
				}
			};
			if(i!=0){
			
			
				if(prFlag){
					currProc.dat[i] = currProc.name;
					currProc.counter++;
					num++;
					if(currProc.serviceTime === currProc.counter){
						prFlag = false;
						num=0;
					}
						
					else if(num == qSize){
						
					prFlag=false;
					num=0;
					enQueue(currProc);
					}					
				}
				else{
					if(queue.length > 0){
						currProc = deQueue();
						prFlag = true;
						currProc.dat[i] = currProc.name;
						currProc.counter++;
						num++;
						if(currProc.serviceTime === currProc.counter){
							prFlag = false;
							num=0;
						}
						//Agar whether we reached the quantum size..Over here this else break will hit only when quantum size is 1
						else if(num == qSize){
						
						prFlag=false;
						num=0;
						enQueue(currProc);
						}
					}
				}
			}
		};
		var outArr = [];
		count = 0;
		for (var i = 0; i < prInfo.length; i++) {
			for (var j = 0; j < prInfo[i].dat.length; j++) {
				outArr[count] = prInfo[i].dat[j];
				count++;
			};
		};

		return outArr;
	}

	function getShortestProc(){
	var shorestProcIndex=0;
	var shorestProcTime=-1;
	var remainingTime;
		for (var i = 0; i < queue.length; i++) {
			if(queue[i].counter!=-1){
				remainingTime=queue[i].serviceTime-queue[i].counter;
				//This "if" is for initializing shorestProcTime to the first value.We can also initialize this outsize for loop
				if(shorestProcTime==-1){
					shorestProcTime=remainingTime;
					shorestProcIndex=i;
				}
				else if(remainingTime<shorestProcTime){
					shorestProcTime=remainingTime;
					shorestProcIndex=i;
				}
			}
		};
	return shorestProcIndex;
	}


	function shortestFirst(prInfo,tTime){
		var prFlag = false;
		var currProc;

		for (var i = 0; i < prInfo.length; i++) {
			for (var j = 0; j <= tTime; j++) {
				prInfo[i].dat[j] = "-";
			};
		}

		for (var i = 0; i <= tTime; i++) {

			for (var j = 0; j < prInfo.length; j++) {
				if(prInfo[j].startTime === i){
					enQueue(prInfo[j]);
				}
			};
			
			if(i!=0){
				if(prFlag){
					currProc.dat[i] = currProc.name;
					currProc.counter++;
					if(currProc.serviceTime === currProc.counter){
						prFlag = false;
						currProc.counter=-1;
					}
						
						
				}else{
					if(queue.length > 0){
						index=getShortestProc();
						if(index!=-1){
							currProc = queue[index];
							prFlag = true;
							currProc.dat[i] = currProc.name;
							currProc.counter++;
							if(currProc.serviceTime === currProc.counter){
								currProc.counter=-1;
								prFlag = false;
							}
						}

					}
				}
			}
		};
		var outArr = [];
		count = 0;
		for (var i = 0; i < prInfo.length; i++) {
			for (var j = 0; j < prInfo[i].dat.length; j++) {
				outArr[count] = prInfo[i].dat[j];
				count++;
			};
		};

		return outArr;
	}
		function shortestTimeRemaining(prInfo,tTime){
		var prFlag = false;
		var currProc;

		for (var i = 0; i < prInfo.length; i++) {
			for (var j = 0; j <= tTime; j++) {
				prInfo[i].dat[j] = "-";
			};
		}

		for (var i = 0; i <= tTime; i++) {

			for (var j = 0; j < prInfo.length; j++) {
				if(prInfo[j].startTime === i){
					enQueue(prInfo[j]);
					prFlag=false;
				}
			};
			if(i!=0){
			
				if(prFlag){
					currProc.dat[i] = currProc.name;
					currProc.counter++;
					if(currProc.serviceTime === currProc.counter){
						prFlag = false;
						currProc.counter=-1;
					}
						
						
				}else{
					if(queue.length > 0){
						index=getShortestProc();
						if(index!=-1){
							currProc = queue[index];
							prFlag = true;
							currProc.dat[i] = currProc.name;
							currProc.counter++;
							if(currProc.serviceTime === currProc.counter){
								currProc.counter=-1;
								prFlag = false;
							}
						}

					}
				}
			}
		};
		var outArr = [];
		count = 0;
		for (var i = 0; i < prInfo.length; i++) {
			for (var j = 0; j < prInfo[i].dat.length; j++) {
				outArr[count] = prInfo[i].dat[j];
				count++;
			};
		};

		return outArr;
	}
	
		function highestResponse(prInfo,tTime){
		var prFlag = false;
		var currProc;

		for (var i = 0; i < prInfo.length; i++) {
			for (var j = 0; j <= tTime; j++) {
				prInfo[i].dat[j] = "-";
			};
		}

		for (var i = 0; i <= tTime; i++) {

			for (var j = 0; j < prInfo.length; j++) {
				if(prInfo[j].startTime === i){
					enQueue(prInfo[j]);
					
				}
			};
			if(i!=0){
			
				if(prFlag){
					currProc.dat[i] = currProc.name;
					currProc.counter++;
					if(currProc.serviceTime === currProc.counter){
						prFlag=false;
						currProc.counter=-1;
					}
					for(k=0;k<getLenQueue();k++){
						if(queue[k].name != currProc.name){
							if(queue[k].counter!=-1){	
							queue[k].waitingTime++;
							}
						}
							
					}				
						
						
				}
				else{
					if(queue.length > 0){
						index=getHighestResponse();
						if(index!=-1){
							currProc = queue[index];
							prFlag = true;
							currProc.dat[i] = currProc.name;
							currProc.counter++;
							if(currProc.serviceTime === currProc.counter){
								currProc.counter=-1;
								prFlag = false;
							}
							//Here we have to increase the waiting time of other processes in queue by 1
							
							for(k=0;k<getLenQueue();k++){
								if(queue[k].name != currProc.name){
									if(queue[k].counter!=-1){	
										queue[k].waitingTime++;
									}
								}
							
							}
							
						}

					}
				}
			}
		};
		var outArr = [];
		count = 0;
		for (var i = 0; i < prInfo.length; i++) {
			for (var j = 0; j < prInfo[i].dat.length; j++) {
				outArr[count] = prInfo[i].dat[j];
				count++;
			};
		};

		return outArr;
	}
	function getHighestResponse(){
	var shorestProcIndex=0;
	var shorestProcTime=-1;
	var remainingTime;
		for (var i = 0; i < getLenQueue(); i++) {
			if(queue[i].counter!=-1){
				remainingTime=parseFloat((queue[i].waitingTime+queue[i].serviceTime)/queue[i].serviceTime);
				//This "if" is for initializing shorestProcTime to the first value.We can also initialize this outsize for loop
				if(shorestProcTime==-1){
					shorestProcTime=remainingTime;
					shorestProcIndex=i;
				}
				else if(remainingTime>shorestProcTime){
					shorestProcTime=remainingTime;
					shorestProcIndex=i;
				}
			}
		};
	return shorestProcIndex;
	}
	
	
		function feedBack(prInfo,tTime){

		var prFlag = false;
		var currProc;
		var num=0;// for quantum size chking
		for (var i = 0; i < prInfo.length; i++) {
			for (var j = 0; j <= tTime; j++) {
				prInfo[i].dat[j] = "-";
			};
		}

		for (var i = 0; i <= tTime; i++) {

			for (var j = 0; j < prInfo.length; j++) {
				if(prInfo[j].startTime === i){
					enQueue1(prInfo[j]);
				}
			};
			if(i!=0){
			
			
				if(prFlag){
					currProc.dat[i] = currProc.name;
					currProc.counter++;
					num++;
					if(currProc.serviceTime === currProc.counter){
						prFlag = false;
						num=0;
					}
						
					else if(num == qSize){
						
					prFlag=false;
					num=0;
					insertProc(currProc);
					}					
				}
				else{
					
						currProc = getProc();
						prFlag = true;
						currProc.dat[i] = currProc.name;
						currProc.counter++;
						num++;
						if(currProc.serviceTime === currProc.counter){
							prFlag = false;
							num=0;
						}
						//Agar whether we reached the quantum size..Over here this else break will hit only when quantum size is 1
						else if(num == qSize){
						
						prFlag=false;
						num=0;
						insertProc(currProc);
						}
					
				}
			}
		};
		var outArr = [];
		count = 0;
		for (var i = 0; i < prInfo.length; i++) {
			for (var j = 0; j < prInfo[i].dat.length; j++) {
				outArr[count] = prInfo[i].dat[j];
				count++;
			};
		};

		return outArr;
	}
	
	function getProc(){
	var tmpProc;
		if(getLenQueue1() > 0){
			tmpProc=deQueue1();
			qSize=1;
			tmpProc.queueNumber++;
		}
		
		else if(getLenQueue2() > 0){
			tmpProc=deQueue2();
			qSize=2;
			tmpProc.queueNumber++;
		}
		
		else if(getLenQueue3() >0 ){
			tmpProc= deQueue3();
			qSize=4;
			tmpProc.queueNumber=1;
		}
	
	return tmpProc;
	}
	
	function insertProc(tmpProc){
		
		if(tmpProc.queueNumber==1){
			enQueue1(tmpProc);
		}
		
		else if(tmpProc.queueNumber==2){
			enQueue2(tmpProc);
		}
		
		else if(tmpProc.queueNumber==3){
			enQueue3(tmpProc);
		}
	
	}
	
	
	
	
	
	
});