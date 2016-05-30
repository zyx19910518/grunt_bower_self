var homeModule = angular.module("HomeModule", [
	"ngRoute"
]);

homeModule.config(['$routeProvider',function($routeProvider) {
	$routeProvider.
	when("/ctrl", {
		controller: "Computer",
		templateUrl: "/home/computer.html"
	}).
	when("/factory", {
		controller: "ClockCtrl",
		templateUrl: "/home/clock.html"
	}).
	when("/directive", {
		templateUrl: "/home/newClock.html"
	}).
	when("/event", {
		controller: "EventCtrl",
		templateUrl: "/home/event.html"
	});
}]);