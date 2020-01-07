angular.module('app')
.controller('MyDataCtrl', function ($scope, MyDataSvc) {
	$scope.save = function (firstname, lastname, email, telephone) {
		MyDataSvc.create({
			firstname, lastname, email, telephone
		}).success(() => {
			window.location.assign("/#/mydata");
		});
	};
	
	MyDataSvc.fetch().success(function(data) {
		$scope.data = data;
	});
});