var center = SMap.Coords.fromWGS84(14.41790, 50.12655);
var m = new SMap(JAK.gel("m"), center, 13);
m.addDefaultLayer(SMap.DEF_BASE).enable();
m.addDefaultControls();

var layer = new SMap.Layer.Marker();
m.addLayer(layer);
layer.enable();

var options = {
	enableHighAccuracy: true,
	timeout: 60000,
	maximumAge: 0
};

function success(pos) {
	var coords = SMap.Coords.fromWGS84(pos.coords.longitude, pos.coords.latitude);

	var marker = new SMap.Marker(coords, undefined, {});
	layer.addMarker(marker);

	var radLat = pos.coords.latitude * Math.PI / 180;
	var circle = 6371009 * 2 * Math.PI * Math.cos(radLat);
	var frac = 15000 / circle * 360;
	var c2 = SMap.Coords.fromWGS84(coords.longitude + frac, coords.latitude);
	var cz = m.computeCenterZoom([center, c2], true);

	m.setCenterZoom(coords, Math.min(cz[1] - 1, 18));

	console.log(`Plus minus ${pos.coords.accuracy} metrů.`);
}

function error(err) {
	console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);
