
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


		i++;
		console.log(arr);
	});

	// On clicking start

	$("#start").click(function(event) {

		servTime = 0;
		if(arr.length > 0){
			for (var i = 0; i < arr.length; i++) {
				servTime += Number(arr[i].serviceTime);
			};

			for (var i = 0; i <= servTime; i++) {
				var row = $('<th>'+ i+'</th>');
				row.hide();
				$('#output thead').append(row);
				row.fadeIn("slow");
			};

			for (var i = 0; i < arr.length; i++) {
				var row = $('<tr></tr>');
				row.hide();
				$('#output tbody').append(row);
				row.fadeIn("slow");

				for (var i = 0; i < serviceTime; i++) {
					
				};
			};
			
		}
	});

	// First Come First Serve

	function firstServe(){

	}
});