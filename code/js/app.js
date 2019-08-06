var map = new AMap.Map('container', {
	resizeEnable: true,
	zoom: 12,
	viewMode: '2D'
});
map.on('click', function(e) {
	if(walking || driving || transfer) {
		//单击关闭导航
		$('#panel').children().remove();
		if(walking) {
			walking.clear();
			walking = '';
		}
		if(driving) {
			driving.clear();
			driving = '';
		}
		if(transfer) {
			transfer.clear();
			transfer = '';
		}
	} else {
		//关闭搜索框
		$('#panel2').children().remove();
		endLng = e.lnglat.getLng();
		endLat = e.lnglat.getLat();
		lnglat = [endLng, endLat];
		map.setCenter(lnglat);
		openInfo();
		regeoCode();
	}
});

//添加卫星图层
var satelliteLayer = new AMap.TileLayer.Satellite();
//var buildingslayer = new AMap.Buildings();

$('#add-satellite-layer').click(function() {
	map.add(satelliteLayer);
	//map.remove(buildingslayer);
});

//				$('#add-buildings-layer').click(function(){
//					map.add(buildingslayer);
//					map.remove(satelliteLayer);
//				});

$('#clear-all-layer').click(function() {
	map.remove(satelliteLayer);
})
//打开窗体
function openInfo() {

	//构建信息窗体中显示的内容
	var width = screen.width;
	var info = [];
	info.push("<h4 id='address' style='width:" + width * 0.6 + "px;margin-top:15px'></h4>");
	info.push("<p id='weather'></p>");
	info.push("<p id='temperatur'></p>");
	info.push("<p id='windDirection'></p>");
	info.push("<p id='windPower'></p>");
	info.push("<p id='humidity'></p>");
	info.push("<p id='reportTime'></p>");
	info.push("<div class='input-item'>");
	info.push("<button onclick='walk()' class='btn'>步行导航</button>");
	info.push("<button onclick='driverCar()' class='btn'>驾车导航</button>");
	info.push("<button onclick='transferBus()' class='btn'>公交导航</button>");
	info.push("</div>");
	infoWindow = new AMap.InfoWindow({
		content: info.join("") //使用默认信息窗体框样式，显示信息内容
	});
	var lnglat = [endLng, endLat];
	infoWindow.open(map, lnglat);
}