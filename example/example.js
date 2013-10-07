(function (angular) {

     var module = angular.module('example', ['ng', 'dynamic-form']);

     module.controller(
         'Example',
         function ($scope) {
             $scope.fields = [
                 {
                     caption: 'Name',
                     model: 'name',
                     type: 'string',
                     maxLength: 25
                 },
                 {
                     caption: 'Date of Birth',
                     model: 'dateOfBirth',
                     type: 'date'
                 },
                 {
                     caption: 'Nicknames',
                     model: 'nicknames',
                     type: 'array<string>'
                 }
             ];

             $scope.data = {
                 name: 'John Smith'
             };
         }
     );

})(angular);
