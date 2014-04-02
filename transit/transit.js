//javascript file for assignment 3 - transit project
var data;
var myLat = 0;
var myLng = 0;
var me = new google.maps.LatLng(myLat, myLng);

var request = new XMLHttpRequest();


var myOptions = {
	center: me, 
	zoom: 14,
	mapTypeId: google.maps.MapTypeId.ROADMAP
};


function init()
{	
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

	request.open("GET", "http://mbtamap.herokuapp.com/mapper/rodeo.json", true);
	request.send(null);
	request.onreadystatechange = callback;
}

function callback() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			myLat = position.coords.latitude;
			myLng = position.coords.longitude;
			me = new google.maps.LatLng(myLat, myLng);
			renderMap();

			if(request.readyState == 4 && request.status == 200) {
				data = JSON.parse(request.responseText);
				if((data["line"] == "red") || (data["line"] == "orange") || (data["line"] == "blue")){
		 			loadStations(capitalize(data["line"]));
				}
			}
		});
	}
	
}

function renderMap()
{				
	// Update map and go there...
	map.panTo(me);	
	var content = "No line Loaded";
	createMarker(me, content);

}

function createMarker(latlng, info){
	var marker = new google.maps.Marker({
		position: latlng,
		map: map
	});
	var infowindow = new google.maps.InfoWindow({
		content: info
	});
	google.maps.event.addListener(marker, "click", function(){
		infowindow.open(map, marker);
	});
}



function loadStations(color){
	var stopPositions = new Array();
	var stops = new Array();
	for(var i=0; i<lineData.length; i++){
		
		if(lineData[i][0] == color)
		{ 
			var position = new google.maps.LatLng(lineData[i][2], lineData[i][3]);
			createMarker(position, lineData[i][1]);
			stopPositions.push(position);
			stops.push(lineData[i]);
		}
	}
	makePolyline(stopPositions, color);
	findClosestStation(stops);
}

function findClosestStation(list){
	var closestStop;
	var d = 1000000000;
	for(var i=0; i<list.length; i++){
		if(distance(me.k, me.A, list[i][2], list[i][3]) < d){
			d = distance(me.k, me.A, list[i][2], list[i][3]);
			closestStop = list[i][1];
		}
	}
	createMarker(me, "closest stop is " + closestStop + " and distance from you is " + d + " miles");
	
}

function makePolyline(positions, color){
	if(color == "Blue"){
		polyColor = "#0000FF";
		console.log("blue");
	}
	if(color == "Red"){
		polyColor = "#FF0000";
		console.log("red");
	}
	if(color == "Orange"){
		polyColor = "#FF6600";
		console.log("orange");
	}
	var polyline = new google.maps.Polyline({
    	path: positions,
    	geodesic: true,
    	strokeColor: polyColor,
    	strokeOpacity: 1.0,
    	strokeWeight: 2
  	});
  	polyline.setMap(map);
  	console.log(positions);
}


function distance(lat1, lon1, lat2, lon2)
{
	var R = 6378.1;
	Number.prototype.toRad = function() {
   		return this * Math.PI / 180;
	}

	var dLat = (lat2-lat1).toRad();  
    var dLon = (lon2-lon1).toRad(); 
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; 
    return d;
}

function capitalize(s)
{
    return s[0].toUpperCase() + s.slice(1);
}

google.maps.event.addDomListener(window, 'load', init);
