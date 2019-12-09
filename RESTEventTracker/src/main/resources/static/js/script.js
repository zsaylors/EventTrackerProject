window.addEventListener('load', function(event) {
	console.log("Loaded");
	init();
});

function init() {
	getEvent();
	
    document.createEvent.addEvent.addEventListener('click', function(event) {
    	event.preventDefault();
    	postEvent();
    });
    
    document.updateEvent.putEvent.addEventListener('click', function(event) {
    	event.preventDefault();
    	updateEvent();
    });
    

    document.deleteForm.deleteEvent.addEventListener('click', function(event) {
    	event.preventDefault();
    	removeEvent();
    });
}

function getEvent() {
	var xhr = new XMLHttpRequest();

	xhr.open('GET', 'api/events/', true);

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status < 400) {
			var data = JSON.parse(xhr.responseText);
			displayEvent(data);
			timeToNextEvent(data);
		}

		if (xhr.readyState === 4 && xhr.status >= 400) {
			console.error(xhr.status + ': ' + xhr.responseText);
		}
	};

	xhr.send(null);
}

function displayEvent(events) {
	
	let tableDiv = document.querySelector('#tableDiv');
	
	while (tableDiv.firstElementChild) {
		tableDiv.removeChild(tableDiv.firstElementChild);
	}
	
	// CREATES TABLE, TABLE HEAD / ROW
	let table = document.createElement('table');
	tableDiv.appendChild(table);
	table.setAttribute('class', 'table table-light table-hover table-bordered table-striped container');
	table.setAttribute('id', 'eventList');
	let tableHead = document.createElement('thead');
	table.appendChild(tableHead);
	let tableHeadRow = document.createElement('tr');
	tableHeadRow.setAttribute('class', 'table-primary');
	tableHead.appendChild(tableHeadRow);

	// TABLE HEADERS
	var name = tableHeadRow.appendChild(document.createElement('th'));
	name.textContent = "Name";
	var location = tableHeadRow.appendChild(document.createElement('th'));
	location.textContent = "Location";
	var description = tableHeadRow.appendChild(document.createElement('th'));
	description.textContent = "Description";
	var time = tableHeadRow.appendChild(document.createElement('th'));
	time.textContent = "Time";
	var daysbetween = tableHeadRow.appendChild(document.createElement('th'));
	daysbetween.textContent = "Days Between";

	let tableBody = document.createElement('tbody');
	table.appendChild(tableBody);

	// GENERATES ROWS
	for (let i = 0; i < events.length; i++) {
		let tableRow = document.createElement('tr');
		tableBody.appendChild(tableRow);
		tableRow.setAttribute('class', 'table-hover');

		// CLICK EVENTS FOR DETAIL VIEW
	    tableRow.addEventListener('click', function(event) {
	    	event.preventDefault();
	    	openDetailView(events[i]);
	    });
		
		// Individual TD's
		var eventName = tableRow.appendChild(document.createElement('td'));
		eventName.textContent = events[i].name;
		var eventLocation = tableRow.appendChild(document.createElement('td'));
		eventLocation.textContent = events[i].location;
		var eventDescription = tableRow.appendChild(document
				.createElement('td'));
		eventDescription.textContent = events[i].description;
		var eventTime = tableRow.appendChild(document.createElement('td'));
		eventTime.textContent = events[i].date;
		
		if (i != events.length - 1) {
			dataAggregation(events[i], events[i+1], tableRow);
		} else {
			tableRow.appendChild(document.createElement('td'));
		}
	}
}



function postEvent() {
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/post/', true);

	xhr.setRequestHeader("Content-type", "application/json"); 

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status == 200 || xhr.status == 201) { 
				var data = JSON.parse(xhr.responseText);
				getEvent();
			} else {
				console.log("POST request failed.");
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	};

	var userObject = {
		name : document.createEvent.name.value,
		location : document.createEvent.location.value,
		description : document.createEvent.description.value,
		date : document.createEvent.date.value,
	};
	var userObjectJson = JSON.stringify(userObject); 

	xhr.send(userObjectJson);
}


function openDetailView(event) {
	putEvent(event);
	delEvent(event);
}

function putEvent(event) {
	updateDiv = document.querySelector('#update');
	updateDiv.style.cssText = 'visibility: visible';
	document.updateEvent.idUpdate.value = event.id;
	document.updateEvent.nameUpdate.value = event.name;
	document.updateEvent.locationUpdate.value = event.location;
	document.updateEvent.descriptionUpdate.value = event.description;
	document.updateEvent.dateUpdate.value = event.date;	
}

function updateEvent() {
	var xhr = new XMLHttpRequest();
	xhr.open('PUT', 'api/event/' + document.updateEvent.idUpdate.value, true);

	xhr.setRequestHeader("Content-type", "application/json"); 

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status == 200 || xhr.status == 201) { 
				var data = JSON.parse(xhr.responseText);
				getEvent()
			} else {
				console.log("PUT request failed.");
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	};

	var userObject = {
		id: document.updateEvent.idUpdate.value,
		name : document.updateEvent.nameUpdate.value,
		location : document.updateEvent.locationUpdate.value,
		description : document.updateEvent.descriptionUpdate.value,
		date : document.updateEvent.dateUpdate.value
	};
	var userObjectJson = JSON.stringify(userObject); 

	xhr.send(userObjectJson);
}

function delEvent(event) {
	deleteDiv = document.querySelector('#delete');
	deleteDiv.style.cssText = 'visibility: visible';
	document.deleteForm.idDel.value = event.id;
}

function removeEvent() {
	var xhr = new XMLHttpRequest();

	xhr.open('DELETE', 'api/event/' + document.deleteForm.idDel.value, true);

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status < 400) {
//			var data = JSON.parse(xhr.responseText);
//			displayEvent(data);
			getEvent();
		}

		if (xhr.readyState === 4 && xhr.status >= 400) {
			console.error(xhr.status + ': ' + xhr.responseText);
		}
	};

	xhr.send(null);
}

function dataAggregation(event1, event2, tableRow) {
	var eventName = tableRow.appendChild(document.createElement('td'));
	var firstDate = new Date(event2.date)
	var secondDate = new Date(event1.date);
	var diff = firstDate - secondDate;
	eventName.textContent = diff/(1000*60*60*24);	
}

function timeToNextEvent(events) {
	var nextEventTime = 0;
	var nextEvent = null;
	for (let i = 0; i < events.length; i++) {
		var date = new Date(events[i].date)
		var timeBetween = date - currentDate;
		var currentDate = new Date();
		
		if (nextEventTime == 0 && timeBetween > 0) {
			nextEventTime = timeBetween
			nextEvent = events[i];
		}
		if (nextEventTime >= timeBetween && timeBetween > 0) {
			nextEventTime = timeBetween
			nextEvent = events[i];
		}
	}

	if (nextEventTime != 0) {
		document.querySelector('#nextEventDiv').textContent = nextEvent.name;
		document.querySelector('#nextEventDiv').append(document.createElement('br'));
		var days = 'Days: ' + Math.round(nextEventTime/(1000*60*60*24));
		document.querySelector('#nextEventDiv').append(days);
	} else {
		document.querySelector('#nextEventDiv').textContent = 'Currently no future launches.';
	}
}
