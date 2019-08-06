//搜索联想
AMap.plugin('AMap.Autocomplete', function() {
	// 实例化Autocomplete
	var autoOptions = {
		// input 为绑定输入提示功能的input的DOM ID
		input: 'tipinput'
	}
	var autoComplete = new AMap.Autocomplete(autoOptions);
	// 无需再手动执行search方法，autoComplete会根据传入input对应的DOM动态触发search
})

//根据关键词搜索
$('#find').click(function() {
	$('#panel2').children().remove();
	var c = $('#findKind').val();
	console.log(c);
	if(c == 0){
		findDefault();
	}else if(c == 1){
		findFood();
	}else if(c == 2){
		findAtt();
	}else if( c == 3){
		findHotel();
	}
});

//默认搜索

function findDefault() {
	AMap.service(["AMap.PlaceSearch"], function() {
		//构造地点查询类
		var placeSearch = new AMap.PlaceSearch();
		//关键字查询
		placeSearch.search($('#tipinput').val(), function(stat, result) {
			console.log(stat);
			console.log(result);
			if(result.info == "OK") {

				let str = "";
				str += '<div class="amap_lib_placeSearch">';
				str += '<div class="amap_lib_placeSearch_list">';
				str += '<ul class="amap_lib_placeSearch_ul">';
				for(let i = 0; i < result.poiList.pois.length; i++) {

					str += '<li class="poibox selected" onclick="poisClick(' + result.poiList.pois[i].location.lng + ',' + result.poiList.pois[i].location.lat + ')">';
					str += '<h3 class="poi-title"><span class="poi-name">' + result.poiList.pois[i].name + '</span></h3>';
					str += '<div class="poi-info">';
					str += '<p class="poi-add">地址：' + result.poiList.pois[i].address + '</p>';
					str += '<p class="poi-tel">电话：' + result.poiList.pois[i].tel + '</p>';
					str += '</div><div class="clear">';
					str += '</div></li>';
				}
				str += '</ul></div></div>';
				$('#panel2').append(str);
			} else {
				let str = '';
				str += '<div class="amap_lib_placeSearch">';
				str += '<div class="amap_lib_placeSearch_list">';
				str += '<p class="poi-title" style="padding:10px">抱歉。没有找到相关结果</p>';
				str += '</div></div>';
				$('#panel2').append(str);
			}

		});

	});
}
//搜索美食

function findFood() {
	AMap.service(["AMap.PlaceSearch"], function() {
		//构造地点查询类
		var placeSearch = new AMap.PlaceSearch({
			city: nowCity,
			type: '餐饮服务',
			citylimit: true
		});
		//关键字查询
		placeSearch.search($('#tipinput').val(), function(stat, result) {
			console.log(stat);
			console.log(result);
			if(result.info == "OK") {

				let str = "";
				str += '<div class="amap_lib_placeSearch">';
				str += '<div class="amap_lib_placeSearch_list">';
				str += '<ul class="amap_lib_placeSearch_ul">';
				for(let i = 0; i < result.poiList.pois.length; i++) {

					str += '<li class="poibox selected" onclick="poisClick(' + result.poiList.pois[i].location.lng + ',' + result.poiList.pois[i].location.lat + ')">';
					str += '<h3 class="poi-title"><span class="poi-name">' + result.poiList.pois[i].name + '</span></h3>';
					str += '<div class="poi-info">';
					str += '<p class="poi-add">地址：' + result.poiList.pois[i].address + '</p>';
					str += '<p class="poi-tel">电话：' + result.poiList.pois[i].tel + '</p>';
					str += '</div><div class="clear">';
					str += '</div></li>';
				}
				str += '</ul></div></div>';
				$('#panel2').append(str);
			} else {
				let str = '';
				str += '<div class="amap_lib_placeSearch">';
				str += '<div class="amap_lib_placeSearch_list">';
				str += '<p class="poi-title" style="padding:10px">抱歉。'+nowCity+'没有找到相关美食</p>';
				str += '</div></div>';
				$('#panel2').append(str);
			}

		});

	});

}
//查询景点
function findAtt() {
	AMap.service(["AMap.PlaceSearch"], function() {
		//构造地点查询类
		var placeSearch = new AMap.PlaceSearch({
			city: nowCity,
			type: '风景名胜',
			citylimit: true
		});
		//关键字查询
		placeSearch.search($('#tipinput').val(), function(stat, result) {
			console.log(stat);
			console.log(result);
			if(result.info == "OK") {

				let str = "";
				str += '<div class="amap_lib_placeSearch">';
				str += '<div class="amap_lib_placeSearch_list">';
				str += '<ul class="amap_lib_placeSearch_ul">';
				for(let i = 0; i < result.poiList.pois.length; i++) {

					str += '<li class="poibox selected" onclick="poisClick(' + result.poiList.pois[i].location.lng + ',' + result.poiList.pois[i].location.lat + ')">';
					str += '<h3 class="poi-title"><span class="poi-name">' + result.poiList.pois[i].name + '</span></h3>';
					str += '<div class="poi-info">';
					str += '<p class="poi-add">地址：' + result.poiList.pois[i].address + '</p>';
					str += '<p class="poi-tel">电话：' + result.poiList.pois[i].tel + '</p>';
					str += '</div><div class="clear">';
					str += '</div></li>';
				}
				str += '</ul></div></div>';
				$('#panel2').append(str);
			} else {
				let str = '';
				str += '<div class="amap_lib_placeSearch">';
				str += '<div class="amap_lib_placeSearch_list">';
				str += '<p class="poi-title" style="padding:10px">抱歉。'+nowCity+'没有找到相关景点</p>';
				str += '</div></div>';
				$('#panel2').append(str);
			}

		});

	});

}
//查询酒店
function findHotel() {
	AMap.service(["AMap.PlaceSearch"], function() {
		//构造地点查询类
		var placeSearch = new AMap.PlaceSearch({
			city: nowCity,
			type: '住宿服务',
			citylimit: true
		});
		//关键字查询
		placeSearch.search($('#tipinput').val(), function(stat, result) {
			if(result.info == "OK") {

				let str = "";
				str += '<div class="amap_lib_placeSearch">';
				str += '<div class="amap_lib_placeSearch_list">';
				str += '<ul class="amap_lib_placeSearch_ul">';
				for(let i = 0; i < result.poiList.pois.length; i++) {

					str += '<li class="poibox selected" onclick="poisClick(' + result.poiList.pois[i].location.lng + ',' + result.poiList.pois[i].location.lat + ')">';
					str += '<h3 class="poi-title"><span class="poi-name">' + result.poiList.pois[i].name + '</span></h3>';
					str += '<div class="poi-info">';
					str += '<p class="poi-add">地址：' + result.poiList.pois[i].address + '</p>';
					str += '<p class="poi-tel">电话：' + result.poiList.pois[i].tel + '</p>';
					str += '</div><div class="clear">';
					str += '</div></li>';
				}
				str += '</ul></div></div>';
				$('#panel2').append(str);
			} else {
				let str = '';
				str += '<div class="amap_lib_placeSearch">';
				str += '<div class="amap_lib_placeSearch_list">';
				str += '<p class="poi-title" style="padding:10px">抱歉。'+nowCity+'没有找到相关酒店</p>';
				str += '</div></div>';
				$('#panel2').append(str);
			}

		});

	});

}

//点击搜索结果访问
function poisClick(lng, lat) {
	$('#panel2').children().remove();
	var lnglat = [lng, lat];
	map.setCenter(lnglat);
	map.setZoom(16);
}