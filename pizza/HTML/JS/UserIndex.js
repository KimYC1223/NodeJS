let app = angular.module('myApp',[]);

app.controller('MyController',['$scope',($scope)=> {
  $scope.name = '김영찬';
  $scope.spotName = ''
  $scope.machineName = ''
  $scope.ip = ''
  $scope.port = 0
  $scope.state = 0
  $scope.error = 0
  $scope.address = ''
  $scope.isClicked = false

  let latitude
	let longitude

  jQuery.ajax({
    type:'GET',						// POST 방식으로
    url: '/machineQuery',		// saveVideo.php로 전송
    processData:false,					// 기본 설정
    contentType: false,					// 기본 설정
    data: '',							// FormData 전송
    success: function(data) {			// 성공시
      navigator.geolocation.getCurrentPosition(function(pos) {
    	    latitude = pos.coords.latitude
    	    longitude = pos.coords.longitude

    			let container = document.getElementById('map') //지도를 담을 영역의 DOM 레퍼런스
    			let options = { //지도를 생성할 때 필요한 기본 옵션
    				center: new kakao.maps.LatLng(latitude, longitude), //지도의 중심좌표.
    				level: 6 //지도의 레벨(확대, 축소 정도)
    			}

    			let map = new kakao.maps.Map(container, options) //지도 생성 및 객체 리턴

          data.forEach((item,i) => {
            var markerPosition  = new kakao.maps.LatLng(item.spotX, item.spotY);
      			// 마커를 생성합니다
      			var marker = new kakao.maps.Marker({
      			    position: markerPosition
      			});

            // 마커가 지도 위에 표시되도록 설정합니다
            marker.setMap(map);

            kakao.maps.event.addListener(marker, 'click', function() {
              $scope.$apply(() => {
                $scope.spotName = item.spotName
                $scope.machineName = item.machineName
                $scope.ip = item.ip
                $scope.port = item.port
                $scope.state = item.state
                $scope.error = item.error
                $scope.address = item.address
                $scope.isClicked = true
              })
            });
          })



    	});
    },error: function(msg) {			// 실패시
      console.log(msg);	// 메세지 출력
    }
  });


  $scope.str = ""

}])
