//步行导航
var walking;

function walk() {
	infoWindow.close();
	$('#panel').children().remove();
	AMap.plugin('AMap.Walking', function() { //异步加载插件
		if(walking) {
			walking.clear();
		}
		if(driving) {
			driving.clear();
		}
		if(transfer) {
			transfer.clear();
		}
		walking = new AMap.Walking({
			map: map,
			panel: "panel"
		});
		//根据起终点坐标规划步行路线
		walking.search([nowLng, nowLat], [endLng, endLat], function(status, result) {
			// result即是对应的步行路线数据信息，相关数据结构文档请参考  
			//https://lbs.amap.com/api/javascript-api/reference/route-search#m_WalkingResult
			if(status === 'complete') {
				//log.success('绘制步行路线完成')
			} else {
				//log.error('步行路线数据查询失败' + result)
			}
		});
	});

}

//驾车导航
var driving;

function driverCar() {
	infoWindow.close();
	$('#panel').children().remove();
	AMap.plugin('AMap.Driving', function() {
		if(walking) {
			walking.clear();
		}
		if(driving) {
			driving.clear();
		}
		if(transfer) {
			transfer.clear();
		}
		driving = new AMap.Driving({
			// 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
			policy: AMap.DrivingPolicy.LEAST_TIME,
			map: map,
			panel: "panel",
			showTraffic: true, //显示道路拥堵状况,绿色畅通，黄色轻微拥堵，红色拥堵，灰色无状况信息
			autoFitView: true, //规划路线后自动调整视野，使整个路线可见
		})
		//规划行车路线
		var startLngLat = [nowLng, nowLat];
		var endLngLat = [endLng, endLat];
		driving.search(startLngLat, endLngLat, function(status, result) {
			//result.length=0;
			// 未出错时，result即是对应的路线规划方案
			//drawRoute(result.routes[0])
			console.log(result);
		});
	});

}
//公交导航
var transfer;

function transferBus() {
	infoWindow.close();
	$('#panel').children().remove();
	AMap.plugin('AMap.Transfer', function() {
		if(walking) {
			walking.clear();
		}
		if(driving) {
			driving.clear();
		}
		if(transfer) {
			transfer.clear();
		}
		transfer = new AMap.Transfer({
			map: map,
			city: '济南市',
			panel: 'panel',
			//路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
			policy: AMap.TransferPolicy.LEAST_TIME
		})
		//规划公交路线
		var startLngLat = [nowLng, nowLat];
		var endLngLat = [endLng, endLat];
		transfer.search(startLngLat, endLngLat, function(status, result) {
			//result.length=0;
			// 未出错时，result即是对应的路线规划方案
			//drawRoute(result.routes[0])
			console.log(result);
		});
	});

}