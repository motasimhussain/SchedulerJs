
$(function(){
	$("#procPanel").addClass("hidden");
	$("#quanta").addClass('hidden');
	var i=0;

	// Creating Blue Print
	var proc = {
		init:function(){
			this.name = "";
			this.startTime = 0;
			this.servTime = 0;
			this.counter = 0;
			this.dat = [];
			return this;
		},

		name: "",
		startTime: 0,
		serviceTime: 0,
		counter: 0,
		dat: []
		
	}

	/////// Array That Holds the object instances ///////
	var arr = [];

	// Creating Queue

	var queue = [];
	var posOut = 0;
	var posIn = 0;

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

	var tempStart = 0;
	var qSize = 1;

	////////// Checkig to see if qunta is needed or not //////////
	$("#choice").change(function(){
   		switch($("#choice").val()){
   			case "rrb":
   				$("#quanta").fadeIn('slow').removeClass('hidden');
   				qSize = Number($("#quanta").val());
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

	// On clicking start
	var servTime = 0;
	$("#start").click(function(event) {
		$("#formPanel").fadeOut('slow');
		
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
	    for (var i = 0; i < cells; i++) {
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
	        for (var j = 0; j < cells; ++j) {
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
			for (var j = 0; j < tTime; j++) {
				prInfo[i].dat[j] = "-";
			};
		}

		for (var i = 0; i < tTime; i++) {

			for (var j = 0; j < prInfo.length; j++) {
				if(prInfo[j].startTime === i){
					enQueue(prInfo[j]);
				}
			};
			
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
		if(!qSize) var qSize = 1;

		var prFlag = false;
		var currProc;

		for (var i = 0; i < prInfo.length; i++) {
			for (var j = 0; j < tTime; j++) {
				prInfo[i].dat[j] = "-";
			};
		}

		for (var i = 0; i < tTime; i++) {

			for (var j = 0; j < prInfo.length; j++) {
				if(prInfo[j].startTime === i){
					enQueue(prInfo[j]);
				}
			};
			
			if(prFlag){
				currProc.dat[i] = currProc.name;
				currProc.counter++;
				if(currProc.serviceTime === currProc.counter){
					prFlag = false;
				}
					
				else if(currProc.counter == qSize){
					
				prFlag=false;
				enQueue(currProc);
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
					//Agar whether we reached the quantum size..Over here this else break will hit only when quantum size is 1
					else if(currProc.counter == qSize){
					
					prFlag=false;
					enQueue(currProc);
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
			for (var j = 0; j < tTime; j++) {
				prInfo[i].dat[j] = "-";
			};
		}

		for (var i = 0; i < tTime; i++) {

			for (var j = 0; j < prInfo.length; j++) {
				if(prInfo[j].startTime === i){
					enQueue(prInfo[j]);
				}
			};
			
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
			for (var j = 0; j < tTime; j++) {
				prInfo[i].dat[j] = "-";
			};
		}

		for (var i = 0; i < tTime; i++) {

			for (var j = 0; j < prInfo.length; j++) {
				if(prInfo[j].startTime === i){
					enQueue(prInfo[j]);
					prFlag=false;
				}
			};
			
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
	

});