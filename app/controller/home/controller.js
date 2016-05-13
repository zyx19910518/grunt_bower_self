var homeModule = angular.module('HomeModule');
homeModule.controller("Computer", ['$scope', function ($scope) {
	$scope.result = '';
	$scope.compute = function () {
		if(angular.isNumber($scope.num1) || $scope.operator || angular.isNumber($scope.num2)) {
			$scope.result = eval($scope.num1 + $scope.operator + $scope.num2);
		} else {
			$scope.result = NaN;
		}
	}
}]);