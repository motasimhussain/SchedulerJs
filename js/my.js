
$(function(){
	$("#procPanel").addClass("hidden");
	var i=0;

	// Creating Blue Print
	var proc = {
		name: "",
		startTime: 0,
		serviceTime : 0
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
			console.log(queue[posOut]);
			posOut++;
		}else{
			console.log("Queue Empty");
		}
		
	}

	// On clicking Add

	$("#add").click(function(event) {
		// initializing array
		arr[i] = Object.create(proc);

		$("#procPanel").fadeIn('slow').removeClass("hidden");

		// Getting values and storing them in an array of objects
		arr[i].name = $("#procName").val();
		arr[i].startTime = $("#startTime").val();
		arr[i].serviceTime = $("#serviceTime").val();

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

			$("#output").append(populateTable(null,arr.length,servTime,["p1","p1","","","","","p2","p2"]));
			
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
	            row.appendChild(document.createElement('td'));
	            row.cells[j].appendChild(document.createTextNode(content[c]));
	            c++;
	        }
	        body.appendChild(row);
	    }
	    table.setAttribute('class', 'table table-bordered');

	    return table;
	}

	// First Come First Serve

	function firstServe(){

	}
});