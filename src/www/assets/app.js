let app = angular.module('app', [
		'ngRoute'
	]);
angular.module('app')
.config(["$routeProvider", function($routeProvider){
	$routeProvider
	.when('/register', { controller: 'RegisterCtrl', templateUrl: 'register.html'})
	.when('/login', { controller: 'LoginCtrl', templateUrl: 'login.html'})
	.when('/classes', { controller: 'ClassesCtrl', templateUrl: './classes/classes.html'})
	.when('/classes/edit', { controller: 'ClassesCtrl', templateUrl: './classes/classesEdit.html'})
	.when('/myinfo', { controller: '', templateUrl: './users/myinfo.html'})
}]);
angular.module('app')
.controller('ApplicationCtrl', ["$scope", "UserSvc", function($scope, UserSvc){
	$scope.$on('login', function(_, user){
		$scope.currentUser = user;
	});
	
	$scope.logout = function(){
		$scope.currentUser = null;
		UserSvc.logout();
	};
}]);
angular.module('app')
.controller('ClassesCtrl', ["$scope", "ClassesSvc", function ($scope, ClassesSvc) {
	$scope.save = function (name, description, duration) {
		ClassesSvc.create({
			name, description, duration
		}).success(() => {
			window.location.assign("/#/classes");
		});
	};
	
	ClassesSvc.fetch().success(function(classes) {
		$scope.classes = classes;
	});
}]);
angular.module('app')
.controller('LoginCtrl', ["$scope", "UserSvc", function($scope, UserSvc){
	$scope.login = function(email, password){
		UserSvc.login(email, password)
			.then(function(response){ 
				$scope.$emit('login', response.data); 
			})
	}
}]);
angular.module('app')
.controller('MyDataCtrl', ["$scope", "MyDataSvc", function ($scope, MyDataSvc) {
	$scope.save = function (name, description, duration) {
		MyDataSvc.create({
			name, description, duration
		}).success(() => {
			window.location.assign("/#/mydata");
		});
	};
	
	MyDataSvc.fetch().success(function(data) {
		$scope.data = data;
	});
}]);
angular.module('app')
.controller('RegisterCtrl', ["$scope", "UserSvc", function($scope, UserSvc){
	$scope.register = function (firstname, lastname, email, telephone, password, repeat_password){
		
		if(password === repeat_password) {
			UserSvc.createUser({
				firstname,
				lastname,
				email,
				telephone,
				password
			}).then(function(response){ 
					$scope.$emit('login', response.data); 
				})

			document.querySelectorAll("input")[5].setCustomValidity("");
		} else {
			document.querySelectorAll("input")[5].setCustomValidity("Passwords Don't Match");
		}
	}
}]);


angular.module('app')
.service('ClassesSvc', ["$http", function ($http) {
   this.fetch = function () {
      return $http.get('/api/classes');
   }
   this.create = function (newClass) {
      return $http.post('/api/classes', newClass);
   }
}]);
angular.module('app')
.service('ClassesSvc', ["$http", function ($http) {
   this.fetch = function () {
      return $http.get('/api/mydata');
   }
   this.create = function (newClass) {
      return $http.post('/api/mydata', newClass);
   }
}]);
angular.module('app')
.service('UserSvc', ["$http", function($http){
	let svc = this;
	
	svc.getUser = function(){
		return $http.get('/api/users')
	}

	svc.login = function(email, password){
		return $http.post('/api/sessions', {
			email: email,
			password: password
		}).then(function(val){
			$http.defaults.headers.common['X-Auth'] = val.data;
			return svc.getUser();
		});
	}

	svc.logout = function(){
		$http.defaults.headers.common['X-Auth'] = '';
	};
	
	svc.createUser = function(User){
		return $http.post('/api/users', User)
		.then(function(){
			return svc.login(User.email, User.password);
		});
	}
}]);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsInJvdXRlcy5qcyIsImNvbnRyb2xsZXJzL2FwcGxpY2F0aW9uLmN0cmwuanMiLCJjb250cm9sbGVycy9jbGFzc2VzLmN0cmwuanMiLCJjb250cm9sbGVycy9sb2dpbi5jdHJsLmpzIiwiY29udHJvbGxlcnMvbXlkYXRhLmN0cmwuanMiLCJjb250cm9sbGVycy9yZWdpc3Rlci5jdHJsLmpzIiwic2VydmljZXMvY2xhc3Nlcy5zdmMuanMiLCJzZXJ2aWNlcy9teWRhdGEuc3ZjLmpzIiwic2VydmljZXMvdXNlci5zdmMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxNQUFBLFFBQUEsT0FBQSxPQUFBO0VBQ0E7O0FDREEsUUFBQSxPQUFBO0NBQ0EsMEJBQUEsU0FBQSxlQUFBO0NBQ0E7RUFDQSxLQUFBLGFBQUEsRUFBQSxZQUFBLGdCQUFBLGFBQUE7RUFDQSxLQUFBLFVBQUEsRUFBQSxZQUFBLGFBQUEsYUFBQTtFQUNBLEtBQUEsWUFBQSxFQUFBLFlBQUEsZUFBQSxhQUFBO0VBQ0EsS0FBQSxpQkFBQSxFQUFBLFlBQUEsZUFBQSxhQUFBO0VBQ0EsS0FBQSxXQUFBLEVBQUEsWUFBQSxJQUFBLGFBQUE7O0FDUEEsUUFBQSxPQUFBO0NBQ0EsV0FBQSx5Q0FBQSxTQUFBLFFBQUEsUUFBQTtDQUNBLE9BQUEsSUFBQSxTQUFBLFNBQUEsR0FBQSxLQUFBO0VBQ0EsT0FBQSxjQUFBOzs7Q0FHQSxPQUFBLFNBQUEsVUFBQTtFQUNBLE9BQUEsY0FBQTtFQUNBLFFBQUE7OztBQ1JBLFFBQUEsT0FBQTtDQUNBLFdBQUEsd0NBQUEsVUFBQSxRQUFBLFlBQUE7Q0FDQSxPQUFBLE9BQUEsVUFBQSxNQUFBLGFBQUEsVUFBQTtFQUNBLFdBQUEsT0FBQTtHQUNBLE1BQUEsYUFBQTtLQUNBLFFBQUE7Ozs7O0NBS0EsV0FBQSxRQUFBLFFBQUEsU0FBQSxTQUFBO0VBQ0EsT0FBQSxVQUFBOzs7QUNYQSxRQUFBLE9BQUE7Q0FDQSxXQUFBLG1DQUFBLFNBQUEsUUFBQSxRQUFBO0NBQ0EsT0FBQSxRQUFBLFNBQUEsT0FBQSxTQUFBO0VBQ0EsUUFBQSxNQUFBLE9BQUE7SUFDQSxLQUFBLFNBQUEsU0FBQTtJQUNBLE9BQUEsTUFBQSxTQUFBLFNBQUE7Ozs7QUNMQSxRQUFBLE9BQUE7Q0FDQSxXQUFBLHNDQUFBLFVBQUEsUUFBQSxXQUFBO0NBQ0EsT0FBQSxPQUFBLFVBQUEsTUFBQSxhQUFBLFVBQUE7RUFDQSxVQUFBLE9BQUE7R0FDQSxNQUFBLGFBQUE7S0FDQSxRQUFBOzs7OztDQUtBLFVBQUEsUUFBQSxRQUFBLFNBQUEsTUFBQTtFQUNBLE9BQUEsT0FBQTs7O0FDWEEsUUFBQSxPQUFBO0NBQ0EsV0FBQSxzQ0FBQSxTQUFBLFFBQUEsUUFBQTtDQUNBLE9BQUEsV0FBQSxVQUFBLFdBQUEsVUFBQSxPQUFBLFdBQUEsVUFBQSxnQkFBQTs7RUFFQSxHQUFBLGFBQUEsaUJBQUE7R0FDQSxRQUFBLFdBQUE7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO01BQ0EsS0FBQSxTQUFBLFNBQUE7S0FDQSxPQUFBLE1BQUEsU0FBQSxTQUFBOzs7R0FHQSxTQUFBLGlCQUFBLFNBQUEsR0FBQSxrQkFBQTtTQUNBO0dBQ0EsU0FBQSxpQkFBQSxTQUFBLEdBQUEsa0JBQUE7Ozs7OztBQ2pCQSxRQUFBLE9BQUE7Q0FDQSxRQUFBLHdCQUFBLFVBQUEsT0FBQTtHQUNBLEtBQUEsUUFBQSxZQUFBO01BQ0EsT0FBQSxNQUFBLElBQUE7O0dBRUEsS0FBQSxTQUFBLFVBQUEsVUFBQTtNQUNBLE9BQUEsTUFBQSxLQUFBLGdCQUFBOzs7QUNOQSxRQUFBLE9BQUE7Q0FDQSxRQUFBLHdCQUFBLFVBQUEsT0FBQTtHQUNBLEtBQUEsUUFBQSxZQUFBO01BQ0EsT0FBQSxNQUFBLElBQUE7O0dBRUEsS0FBQSxTQUFBLFVBQUEsVUFBQTtNQUNBLE9BQUEsTUFBQSxLQUFBLGVBQUE7OztBQ05BLFFBQUEsT0FBQTtDQUNBLFFBQUEscUJBQUEsU0FBQSxNQUFBO0NBQ0EsSUFBQSxNQUFBOztDQUVBLElBQUEsVUFBQSxVQUFBO0VBQ0EsT0FBQSxNQUFBLElBQUE7OztDQUdBLElBQUEsUUFBQSxTQUFBLE9BQUEsU0FBQTtFQUNBLE9BQUEsTUFBQSxLQUFBLGlCQUFBO0dBQ0EsT0FBQTtHQUNBLFVBQUE7S0FDQSxLQUFBLFNBQUEsSUFBQTtHQUNBLE1BQUEsU0FBQSxRQUFBLE9BQUEsWUFBQSxJQUFBO0dBQ0EsT0FBQSxJQUFBOzs7O0NBSUEsSUFBQSxTQUFBLFVBQUE7RUFDQSxNQUFBLFNBQUEsUUFBQSxPQUFBLFlBQUE7OztDQUdBLElBQUEsYUFBQSxTQUFBLEtBQUE7RUFDQSxPQUFBLE1BQUEsS0FBQSxjQUFBO0dBQ0EsS0FBQSxVQUFBO0dBQ0EsT0FBQSxJQUFBLE1BQUEsS0FBQSxPQUFBLEtBQUE7Ozs7QUFJQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFtcblx0XHQnbmdSb3V0ZSdcblx0XSk7IiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4uY29uZmlnKGZ1bmN0aW9uKCRyb3V0ZVByb3ZpZGVyKXtcblx0JHJvdXRlUHJvdmlkZXJcblx0LndoZW4oJy9yZWdpc3RlcicsIHsgY29udHJvbGxlcjogJ1JlZ2lzdGVyQ3RybCcsIHRlbXBsYXRlVXJsOiAncmVnaXN0ZXIuaHRtbCd9KVxuXHQud2hlbignL2xvZ2luJywgeyBjb250cm9sbGVyOiAnTG9naW5DdHJsJywgdGVtcGxhdGVVcmw6ICdsb2dpbi5odG1sJ30pXG5cdC53aGVuKCcvY2xhc3NlcycsIHsgY29udHJvbGxlcjogJ0NsYXNzZXNDdHJsJywgdGVtcGxhdGVVcmw6ICcuL2NsYXNzZXMvY2xhc3Nlcy5odG1sJ30pXG5cdC53aGVuKCcvY2xhc3Nlcy9lZGl0JywgeyBjb250cm9sbGVyOiAnQ2xhc3Nlc0N0cmwnLCB0ZW1wbGF0ZVVybDogJy4vY2xhc3Nlcy9jbGFzc2VzRWRpdC5odG1sJ30pXG5cdC53aGVuKCcvbXlpbmZvJywgeyBjb250cm9sbGVyOiAnJywgdGVtcGxhdGVVcmw6ICcuL3VzZXJzL215aW5mby5odG1sJ30pXG59KTsiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbi5jb250cm9sbGVyKCdBcHBsaWNhdGlvbkN0cmwnLCBmdW5jdGlvbigkc2NvcGUsIFVzZXJTdmMpe1xuXHQkc2NvcGUuJG9uKCdsb2dpbicsIGZ1bmN0aW9uKF8sIHVzZXIpe1xuXHRcdCRzY29wZS5jdXJyZW50VXNlciA9IHVzZXI7XG5cdH0pO1xuXHRcblx0JHNjb3BlLmxvZ291dCA9IGZ1bmN0aW9uKCl7XG5cdFx0JHNjb3BlLmN1cnJlbnRVc2VyID0gbnVsbDtcblx0XHRVc2VyU3ZjLmxvZ291dCgpO1xuXHR9O1xufSk7IiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4uY29udHJvbGxlcignQ2xhc3Nlc0N0cmwnLCBmdW5jdGlvbiAoJHNjb3BlLCBDbGFzc2VzU3ZjKSB7XG5cdCRzY29wZS5zYXZlID0gZnVuY3Rpb24gKG5hbWUsIGRlc2NyaXB0aW9uLCBkdXJhdGlvbikge1xuXHRcdENsYXNzZXNTdmMuY3JlYXRlKHtcblx0XHRcdG5hbWUsIGRlc2NyaXB0aW9uLCBkdXJhdGlvblxuXHRcdH0pLnN1Y2Nlc3MoKCkgPT4ge1xuXHRcdFx0d2luZG93LmxvY2F0aW9uLmFzc2lnbihcIi8jL2NsYXNzZXNcIik7XG5cdFx0fSk7XG5cdH07XG5cdFxuXHRDbGFzc2VzU3ZjLmZldGNoKCkuc3VjY2VzcyhmdW5jdGlvbihjbGFzc2VzKSB7XG5cdFx0JHNjb3BlLmNsYXNzZXMgPSBjbGFzc2VzO1xuXHR9KTtcbn0pOyIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuLmNvbnRyb2xsZXIoJ0xvZ2luQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgVXNlclN2Yyl7XG5cdCRzY29wZS5sb2dpbiA9IGZ1bmN0aW9uKGVtYWlsLCBwYXNzd29yZCl7XG5cdFx0VXNlclN2Yy5sb2dpbihlbWFpbCwgcGFzc3dvcmQpXG5cdFx0XHQudGhlbihmdW5jdGlvbihyZXNwb25zZSl7IFxuXHRcdFx0XHQkc2NvcGUuJGVtaXQoJ2xvZ2luJywgcmVzcG9uc2UuZGF0YSk7IFxuXHRcdFx0fSlcblx0fVxufSk7IiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4uY29udHJvbGxlcignTXlEYXRhQ3RybCcsIGZ1bmN0aW9uICgkc2NvcGUsIE15RGF0YVN2Yykge1xuXHQkc2NvcGUuc2F2ZSA9IGZ1bmN0aW9uIChuYW1lLCBkZXNjcmlwdGlvbiwgZHVyYXRpb24pIHtcblx0XHRNeURhdGFTdmMuY3JlYXRlKHtcblx0XHRcdG5hbWUsIGRlc2NyaXB0aW9uLCBkdXJhdGlvblxuXHRcdH0pLnN1Y2Nlc3MoKCkgPT4ge1xuXHRcdFx0d2luZG93LmxvY2F0aW9uLmFzc2lnbihcIi8jL215ZGF0YVwiKTtcblx0XHR9KTtcblx0fTtcblx0XG5cdE15RGF0YVN2Yy5mZXRjaCgpLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSkge1xuXHRcdCRzY29wZS5kYXRhID0gZGF0YTtcblx0fSk7XG59KTsiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbi5jb250cm9sbGVyKCdSZWdpc3RlckN0cmwnLCBmdW5jdGlvbigkc2NvcGUsIFVzZXJTdmMpe1xuXHQkc2NvcGUucmVnaXN0ZXIgPSBmdW5jdGlvbiAoZmlyc3RuYW1lLCBsYXN0bmFtZSwgZW1haWwsIHRlbGVwaG9uZSwgcGFzc3dvcmQsIHJlcGVhdF9wYXNzd29yZCl7XG5cdFx0XG5cdFx0aWYocGFzc3dvcmQgPT09IHJlcGVhdF9wYXNzd29yZCkge1xuXHRcdFx0VXNlclN2Yy5jcmVhdGVVc2VyKHtcblx0XHRcdFx0Zmlyc3RuYW1lLFxuXHRcdFx0XHRsYXN0bmFtZSxcblx0XHRcdFx0ZW1haWwsXG5cdFx0XHRcdHRlbGVwaG9uZSxcblx0XHRcdFx0cGFzc3dvcmRcblx0XHRcdH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpeyBcblx0XHRcdFx0XHQkc2NvcGUuJGVtaXQoJ2xvZ2luJywgcmVzcG9uc2UuZGF0YSk7IFxuXHRcdFx0XHR9KVxuXG5cdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRcIilbNV0uc2V0Q3VzdG9tVmFsaWRpdHkoXCJcIik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFwiKVs1XS5zZXRDdXN0b21WYWxpZGl0eShcIlBhc3N3b3JkcyBEb24ndCBNYXRjaFwiKTtcblx0XHR9XG5cdH1cbn0pO1xuXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbi5zZXJ2aWNlKCdDbGFzc2VzU3ZjJywgZnVuY3Rpb24gKCRodHRwKSB7XG4gICB0aGlzLmZldGNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuICRodHRwLmdldCgnL2FwaS9jbGFzc2VzJyk7XG4gICB9XG4gICB0aGlzLmNyZWF0ZSA9IGZ1bmN0aW9uIChuZXdDbGFzcykge1xuICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy9hcGkvY2xhc3NlcycsIG5ld0NsYXNzKTtcbiAgIH1cbn0pOyIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuLnNlcnZpY2UoJ0NsYXNzZXNTdmMnLCBmdW5jdGlvbiAoJGh0dHApIHtcbiAgIHRoaXMuZmV0Y2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvYXBpL215ZGF0YScpO1xuICAgfVxuICAgdGhpcy5jcmVhdGUgPSBmdW5jdGlvbiAobmV3Q2xhc3MpIHtcbiAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvYXBpL215ZGF0YScsIG5ld0NsYXNzKTtcbiAgIH1cbn0pOyIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuLnNlcnZpY2UoJ1VzZXJTdmMnLCBmdW5jdGlvbigkaHR0cCl7XG5cdGxldCBzdmMgPSB0aGlzO1xuXHRcblx0c3ZjLmdldFVzZXIgPSBmdW5jdGlvbigpe1xuXHRcdHJldHVybiAkaHR0cC5nZXQoJy9hcGkvdXNlcnMnKVxuXHR9XG5cblx0c3ZjLmxvZ2luID0gZnVuY3Rpb24oZW1haWwsIHBhc3N3b3JkKXtcblx0XHRyZXR1cm4gJGh0dHAucG9zdCgnL2FwaS9zZXNzaW9ucycsIHtcblx0XHRcdGVtYWlsOiBlbWFpbCxcblx0XHRcdHBhc3N3b3JkOiBwYXNzd29yZFxuXHRcdH0pLnRoZW4oZnVuY3Rpb24odmFsKXtcblx0XHRcdCRodHRwLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uWydYLUF1dGgnXSA9IHZhbC5kYXRhO1xuXHRcdFx0cmV0dXJuIHN2Yy5nZXRVc2VyKCk7XG5cdFx0fSk7XG5cdH1cblxuXHRzdmMubG9nb3V0ID0gZnVuY3Rpb24oKXtcblx0XHQkaHR0cC5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vblsnWC1BdXRoJ10gPSAnJztcblx0fTtcblx0XG5cdHN2Yy5jcmVhdGVVc2VyID0gZnVuY3Rpb24oVXNlcil7XG5cdFx0cmV0dXJuICRodHRwLnBvc3QoJy9hcGkvdXNlcnMnLCBVc2VyKVxuXHRcdC50aGVuKGZ1bmN0aW9uKCl7XG5cdFx0XHRyZXR1cm4gc3ZjLmxvZ2luKFVzZXIuZW1haWwsIFVzZXIucGFzc3dvcmQpO1xuXHRcdH0pO1xuXHR9XG59KTtcbiJdfQ==
