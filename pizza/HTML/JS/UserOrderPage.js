let app = angular.module('myApp',[]);

app.controller('MyController',['$scope',($scope)=> {
  $scope.name = '김영찬';
  $scope.commandList = [
    {target:0,value:0}
  ];

  $scope.str = ""

  $scope.modifyMsg = () => {
      var radios= document.getElementsByName('btn');
      $scope.str = (radios[0].checked)? "move " : "light ";
      $scope.str += `${$scope.commandList.length} `;

      $scope.commandList.forEach((item,i) => {
        $scope.str += item.target + " "
        $scope.str += item.value + " "
      })

      let logging = document.getElementById('logging');
      logging.innerHTML = `Msg is ... [ ${$scope.str}]`;
  }

  $scope.plusBtn = () => {
    $scope.commandList.push({target:0,value:0})
    $scope.modifyMsg()
  };

  $scope.minusBtn = (index) => {
    if ($scope.commandList.length > 1) {
      console.log(index)
      $scope.commandList.splice(index,1);
    }
    $scope.modifyMsg()
  }

  $scope.sendData = () => {
    let string = 'order=' + $scope.str;

    jQuery.ajax({
  		type:'GET',						// POST 방식으로
  		url: '/sendBtnData',		// saveVideo.php로 전송
  		processData:false,					// 기본 설정
  		contentType: false,					// 기본 설정
  		data: string,							// FormData 전송
  		success: function(msg) {			// 성공시
        let logging = document.getElementById('logging');
  			logging.innerHTML = msg;	// 메세지 출력
  		},error: function(msg) {			// 실패시
        let logging = document.getElementById('logging');
  			logging.innerHTML = msg;	// 메세지 출력
  		}
  	});
  }

  $scope.modifyMsg();
}])
