var homeModule = angular.module('HomeModule');

homeModule.controller('EventCtrl', ['$scope', function($scope){
	$scope.count = 0;
	$scope.$on("Event", function(){
		$scope.count++;
	});
}]);