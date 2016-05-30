var homeModule = angular.module('HomeModule');
homeModule.factory('time', ['$timeout', function($timeout){
	var time = {};
	(function tick(){
		time.now = new Date().toLocaleString();
		$timeout(tick, 1000);
	})();
	return time;
}]);
homeModule.controller('ClockCtrl', ['$scope', 'time', function($scope, time){
	$scope.time = time;
}]);