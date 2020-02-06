let app = angular.module('myApp',[]);

app.controller('MyController',['$scope',($scope)=> {
  $scope.name = '김영찬';
  $scope.commandList = [
    {:0,value:0}
  ];

  $scope.str = ""

	let latitude
	let longitude

	navigator.geolocation.getCurrentPosition(function(pos) {
	    latitude = pos.coords.latitude
	    longitude = pos.coords.longitude

			let container = document.getElementById('map') //지도를 담을 영역의 DOM 레퍼런스
			let options = { //지도를 생성할 때 필요한 기본 옵션
				center: new kakao.maps.LatLng(latitude, longitude), //지도의 중심좌표.
				level: 6 //지도의 레벨(확대, 축소 정도)
			}

			let map = new kakao.maps.Map(container, options) //지도 생성 및 객체 리턴

			var markerPosition  = new kakao.maps.LatLng(37.51349003806307, 127.05936011110893);

			// 마커를 생성합니다
			var marker = new kakao.maps.Marker({
			    position: markerPosition
			});

			// 마커가 지도 위에 표시되도록 설정합니다
			marker.setMap(map);
	});
}])
