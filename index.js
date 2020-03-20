var center = SMap.Coords.fromWGS84(14.41790, 50.12655);
var m = new SMap(JAK.gel("m"), center, 13);
m.addDefaultLayer(SMap.DEF_BASE).enable();
m.addDefaultControls();

var layer = new SMap.Layer.Marker();
m.addLayer(layer);
layer.enable();

var options = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 0
};

function success(pos) {
	var coords = SMap.Coords.fromWGS84(pos.coords.longitude, pos.coords.latitude);

	var marker = new SMap.Marker(coords, "myMarker", {});
	layer.addMarker(marker);

	console.log(`Plus minus ${crd.accuracy} metrů.`);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);

/*
var options = {};
var marker = new SMap.Marker(center, "myMarker", options);
layer.addMarker(marker);
*/