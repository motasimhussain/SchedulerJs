
$(function(){
	$("#procPanel").addClass("hidden");
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

	var out = {
    	name: "",
    	time: 0
    };

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

	// On clicking Add

	$("#add").click(function(event) {
		// initializing array

		arr[i] = Object.create(proc).init();

		$("#procPanel").fadeIn('slow').removeClass("hidden");

		// Getting values and storing them in an array of objects
		arr[i].name = $("#procName").val();
		arr[i].startTime = Number($("#startTime").val());
		arr[i].serviceTime = Number($("#serviceTime").val());

		//Displaying the Process info in Process Panel  << Also Applying Swag!

		var row = $('<tr><td>'+ arr[i].name +'</td><td>'+ arr[i].startTime +'</td><td>'+ arr[i].serviceTime +'</td></tr>');
		row.hide();
		$('#procPanel tr:last').after(row);
		row.fadeIn("slow");

		//Clearing form after storing values
		$("#procName").val("");
		$("#startTime").val("");
		$("#serviceTime").val("");
		$("#procName").focus();

		i++;
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

			// for (var i = 1; i <= servTime; i++) {
			// 	var row = $('<th>'+ i+'</th>');
			// 	row.hide();
			// 	$('#output thead').append(row);
			// 	row.fadeIn("slow");
			// };

			// popRows(arr.length);

			$("#output").append(populateTable(null,arr.length,servTime,firstServe(arr,servTime)));
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
});