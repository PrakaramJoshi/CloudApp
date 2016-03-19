'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('MainCtrl', function ($scope,$http,$routeParams) {
    $scope.Options = [
     {OptionName : 'Choice 1' },
     {OptionName : 'Choice 2' },
     {OptionName : 'Choice 3' }, ];
     $scope.OptionSelected = 'Choice 1'
     $scope.email =''
    var uploadsuccess ="Nothing Yet"
    $scope.uploadFile = function(){
          uploadsuccess ="uploading"
          var file = $scope.myFile;
          var uploadUrl = "/multer";
          var fd = new FormData();
          fd.append('file', file);
          fd.append('option', $scope.OptionSelected.OptionName );
          fd.append('email', $scope.email );

          $http.post(uploadUrl,fd, {
              transformRequest: angular.identity,
              headers: {'Content-Type': undefined}

          }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log("success!!");
            uploadsuccess ="Success"
          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log("error!!");
            uploadsuccess= "Error"
          });
      };
      $scope.CheckSuccess = function(){
        console.log("checking status...")
        var icon_size = "fa-5x"
        if (uploadsuccess=="Success")
          return "fa fa-thumbs-o-up "+icon_size
        if (uploadsuccess=="Error")
          return "fa fa-exclamation-circle "+icon_size
        if (uploadsuccess=="uploading")
          return "fa fa-spinner fa-pulse "+icon_size
      }


  });
