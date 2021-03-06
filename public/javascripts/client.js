angular.module('uploader', [])
	.controller('FormController', ['$scope', '$http', function($scope, $http) {
		$scope.user = {};

		$scope.sendFormData = function() {
			$http({
				method: 'POST',
				url: '/test',
				headers: { 'Content-Type': undefined },
				transformRequest: function(data) {
					// using native Web API to package up form data for POSTing
					var formData = new FormData();
					formData.append("user", angular.toJson(data.user));
					// using native Web API here to select file object
					formData.append("file", document.getElementById("theFile").files[0]);
					return formData;
				},
				data: { user: $scope.user }
			}).
			success(function (data, status, headers, config) {
				console.log('Posted');
			}).
			error(function (data, status, headers, config) {
				console.log('Failure');
			});
		};
	}]);