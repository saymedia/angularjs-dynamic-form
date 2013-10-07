(function (angular) {

     var module = angular.module('dynamic-form', ['ng']);

     module.directive(
         'dynamicTableForm',
         ['$compile', '$parse', function ($compile, $parse) {
              return {
                  restrict: 'EA',
                  scope: {
                      fieldsExpr: '&fields',
                      dataExpr: '&data'
                  },
                  compile: function (element, attr, linker) {
                      return function ($scope, $element, $attr) {

                          $scope.typeTemplates = {};

                          angular.forEach(
                              $element.children(),
                              function (childElem) {

                                  if (! childElem.getAttribute('dynamic-field-type')) {
                                      return;
                                  }

                                  childElem = angular.element(childElem);

                                  var typeName = childElem.attr('dynamic-field-type');
                                  $scope.typeTemplates[typeName] = childElem;

                              }
                          );

                          $element.html('');
                          console.log('templates are', $scope.typeTemplates);

                      };
                  }
              };
         }]
     );

})(angular);
