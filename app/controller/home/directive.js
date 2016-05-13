var homeModule = angular.module('HomeModule');
homeModule.directive("name", function(){
	return {
		restrict: 'E',
		template: '<h1>简单计算器</h1>',
		replace	: true 
	};
});
homeModule.directive('hello', ['$rootScope', 'dateFilter', function($rootScope, dateFilter){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		scope: {
			id : '=id'
		}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {
			$scope.info = ['zhangsan', 'lisi', 'wangwu'];
		},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		template: '<span>Hi, {{info[id]}}, this is newClock.</span>',
		// templateUrl: '',
		replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
			
		}
	};
}]);
homeModule.directive('newClock', function($interval, dateFilter){
	// Runs during compile
	return {
		transclude: true,
		scope: {
			format : '=format'
		},
		controller: function($scope, $element, $attrs, $transclude) {
			$scope.formats = {
				format1 : 'yyyy-MM-dd hh:mm:ss',
				format2 : 'MM/dd/yyyy hh/mm/ss',
				format3 : 'yyyy-MM-dd',
				format4 : 'MM/dd/yyyy',
			};
		},
		restrict: 'A',
		link: function($scope, iElm, iAttrs, controller) {
			// 更新时间
			function updateTime() {
				var format = $scope.formats[$scope.format];
				iElm.text(dateFilter(new Date(), format));
			}
			// 定时任务
			var tid = $interval(function(){
				updateTime();
			}, 1000);
			// 销毁处理
			iElm.on('$destroy', function(){
				$interval.cancel(tid);
			});
			updateTime();
		}
	};
});