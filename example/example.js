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
                     caption: 'Street Address',
                     model: 'address.street',
                     type: 'string',
                     maxLength: 25
                 },
                 {
                     caption: 'City',
                     model: 'address.city',
                     type: 'string',
                     maxLength: 25
                 },
                 {
                     caption: 'State',
                     model: 'address.state',
                     type: 'select',
                     options: [
                         {
                             caption: 'California',
                             value: 'CA'
                         },
                         {
                             caption: 'New York',
                             value: 'NY'
                         },
                         {
                             caption: 'Washington',
                             value: 'WA'
                         }
                     ]
                 },
                 {
                     caption: 'Zip Code',
                     model: 'address.zipCode',
                     type: 'integer',
                     maxLength: 5,
                     minValue: 10000,
                     maxValue: 99999
                 },
                 {
                     caption: 'Nicknames',
                     model: 'nicknames',
                     type: 'array<string>'
                 }
             ];

             $scope.data = {
                 name: 'John Smith',
                 address: {}
             };
         }
     );

})(angular);
