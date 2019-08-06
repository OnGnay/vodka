//定位
AMap.plugin('AMap.Geolocation', function() {
	var geolocation = new AMap.Geolocation({
		enableHighAccuracy: true, //是否使用高精度定位，默认:true
		timeout: 10000, //超过10秒后停止定位，默认：5s
		buttonPosition: 'RB', //定位按钮的停靠位置
		buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
		zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点
	});
	map.addControl(geolocation);
	geolocation.getCurrentPosition(function(status, result) {
		if(status == 'complete') {
			onComplete(result)
		} else {
			onError(result)
		}
	});
});

var nowLng, nowLat;
//解析定位结果
function onComplete(data) {
	nowLng = data.position.lng;
	nowLat = data.position.lat;
	//定位当前城市
	AMap.plugin('AMap.Geocoder', function() {
		var geocoder = new AMap.Geocoder();
		geocoder.getAddress([nowLng, nowLat], function(status, result) {
			if(status === 'complete' && result.regeocode) {
				nowCity = result.regeocode.addressComponent.city;
				console.log(nowCity);
			} else {
				console.error('根据经纬度查询地址失败')
			}
		});

	});
}

//解析定位错误信息
function onError(data) {
	data.message;
}

//为地图注册click事件获取鼠标点击出的经纬度坐标
var endLng, endLat;
//逆向地理编码 经纬度->地点名称
function regeoCode() {
	//查询坐标地点名称
	AMap.plugin('AMap.Geocoder', function() {
		var geocoder = new AMap.Geocoder();
		geocoder.getAddress(lnglat, function(status, result) {
			if(status === 'complete' && result.regeocode) {
				district = result.regeocode.addressComponent.district;
				//查询天气
				AMap.plugin('AMap.Weather', function() {
					var weather = new AMap.Weather();
					//查询实时天气信息, 查询的城市到行政级别的城市
					weather.getLive(district, function(err, data) {
						if(!err) {
							//			        天气：data.weather
							//             温度：data.temperature
							//             风向：data.windDirection 
							//             风力： data.windPower 
							//             空气湿度 data.humidity 
							//             发布时间data.reportTime 
							$('#weather').text("天气：" + data.weather);
							$('#temperature').text("温度：" + data.temperature + "℃");
							$('#windDirection').text("风向：" + data.windDirection);
							$('#windPower').text("风力：" + data.windPower + "级");
							$('#humidity').text("空气湿度：" + data.humidity);
							$('#reportTime').text("发布时间：" + data.reportTime);

						}
					});
				});

				var address = result.regeocode.formattedAddress;
				$('#address').text(address);
			} else {
				log.error('根据经纬度查询地址失败')
			}
		});

	});
}