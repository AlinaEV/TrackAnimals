var mappa={
	lat: 50.447300,
	lng: 30.455752
};
function loadMark() {
							      //var xhr = new XMLHttpRequest();
	var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;

	var xhr = new XHR();
	xhr.open('GET', 'http://pet-petmonitor.rhcloud.com/api/owner/deviceNewActivity/?deviceId=1', true);
	var response;
	xhr.onload = function() {
		response = JSON.parse(this.responseText);
			//alert( this.responseText );
		var new_lat=response.latG+response.latM/60+response.latMm/3600;
		new_lat*=(response.lat==1)?(-1):1;
		var new_lng=response.longG+response.longM/60+response.longMm/3600;
		new_lng*=(response.lon==1)?(-1):1;
		// console.log(new_lat);
		// console.log(new_lng);
		mappa.lat=new_lat;
		mappa.lng=new_lng;
		gmapff();
		};

	xhr.onerror = function() {
		alert( 'Ошибка ' + this.status );
		}


	xhr.send();
};

function loadRoad(){
	var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;

	var xhr = new XHR();
	xhr.open('GET', 'http://pet-petmonitor.rhcloud.com/api/owner/deviceActivity/?deviceId=1', true);
	var response;
	xhr.onload = function() {
		response = this.responseText;
		alert(response);
		for(var i=0; i<response.length; i++){
			response[i]=JSON.parse(response[i]);
			alert(response[i]);

			// var new_lat=response[i].latG+response[i].latM/60+response[i].latMm/3600;
			// 	new_lat*=(response[i].lat==1)?(-1):1;
			// var new_lng=response[i].longG+response[i].longM/60+response[i].longMm/3600;
			// 	new_lng*=(response[i].lon==1)?(-1):1;

			// map.addMarker({
			// 				  lat: new_lat,
			// 				  lng: new_lng,
			// 				  title: 'Cat1',
			// 				  click: function(e) {
			// 				    alert('You clicked in this marker');
			// 				  }
			// 				});

			// mappa.lat=new_lat;
			// mappa.lng=new_lng;
			// gmapff();
		};
	};

	xhr.onerror = function() {
		alert( 'Ошибка ' + this.status );
		}


	xhr.send();
};

function DropDown(el) {
 this.dd = el;
 this.placeholder = this.dd.children('span');
 this.opts = this.dd.find('ol.dropdown > li');
 this.val = '';
 this.index = -1;
 this.initEvents();
};
DropDown.prototype = {
 initEvents : function() {
 var obj = this;

 obj.dd.on('click', function(event){
 $(this).toggleClass('active');
 return false;
 });

 obj.opts.on('click',function(){
 var opt = $(this);
 obj.val = opt.text();
 obj.index = opt.index();
 obj.placeholder.text('Gender: ' + obj.val);
 });
 },
 getValue : function() {
 return this.val;
 },
 getIndex : function() {
 return this.index;
 }
};

// $(document).ready(function(){
//   $("#myNav").affix({
//     offset: { 
//       top: 200 
//     }
//   });
//   $("#myNav").on('affixed.bs.affix', function(){
//     alert("Меню навигации была прикреплена. Теперь она не прокручивается вместе со страницей.");
//   });
// });

function gmapff(){
	var map = new GMaps({
						      el: '#map',
						      lat: mappa.lat,
						      lng: mappa.lng
						    });
	map.addMarker({
							  lat: mappa.lat,
							  lng: mappa.lng,
							  title: 'Cat1',
							  click: function(e) {
							    alert('You clicked in this marker');
							  }
							});
							

	path = [[-12.044012922866312, -77.02470665341184], [-12.05449279282314, -77.03024273281858], [-12.055122327623378, -77.03039293652341], [-12.075917129727586, -77.02764635449216], [-12.07635776902266, -77.02792530422971], [-12.076819390363665, -77.02893381481931], [-12.088527520066453, -77.0241058385925], [-12.090814532191756, -77.02271108990476]];

	map.drawPolyline({
							  path: path,
							  strokeColor: '#131540',
							  strokeOpacity: 0.6,
							  strokeWeight: 6
							});


	var path = [[-12.040397656836609,-77.03373871559225], [-12.040248585302038,-77.03993927003302], [-12.050047116528843,-77.02448169303511],	[-12.044804866577001,-77.02154422636042]];

	polygon = map.drawPolygon({
							  paths: path, // pre-defined polygon shape
							  strokeColor: '#BBD8E9',
							  strokeOpacity: 1,
							  strokeWeight: 3,
							  fillColor: '#BBD8E9',
							  fillOpacity: 0.6
							});


	map.addControl({
						        position: 'top_center',
						        content: 'Geolocate',
						        style: {
						          margin: '5px',
						          padding: '1px 6px',
						          border: 'solid 1px #717B87',
						          background: '#fff'
						        },
						        events: {
						          click: function(){
						            GMaps.geolocate({
						              success: function(position){
						                map.setCenter(position.coords.latitude, position.coords.longitude);
						              },
						              error: function(error){
						                alert('Geolocation failed: ' + error.message);
						              },
						              not_supported: function(){
						                alert("Your browser does not support geolocation");
						              }
						            });
						          }
						        }
						      });
};