(function (angular) {

     var module = angular.module('dynamic-form', ['ng']);

     module.directive(
         'dynamicTableForm',
         ['$compile', '$parse', function ($compile, $parse) {
              return {
                  restrict: 'EA',
                  priority: 1000,
                  terminal: true,
                  scope: {
                      fieldsExpr: '&fields',
                      dataExpr: '&data'
                  },
                  compile: function (element, attr, linker) {
                      return function ($scope, $element, $attr) {

                          var typeTemplates = {};

                          angular.forEach(
                              $element.children(),
                              function (childElem) {

                                  if (! childElem.getAttribute('dynamic-field-type')) {
                                      return;
                                  }

                                  childElem = angular.element(childElem);

                                  var typeName = childElem.attr('dynamic-field-type');
                                  typeTemplates[typeName] = childElem;

                              }
                          );

                          $element.html('');

                          function linkFunctionForFieldType(type) {
                              var match = type.match(/^(\w+)\<.*\>$/);
                              if (match) {
                                  // it's a collection type.
                                  // TODO: implement collection types.
                                  return function () {};
                              }
                              else {
                                  var template = typeTemplates[type];
                                  if (template) {
                                      return $compile(template);
                                  }
                                  else {
                                      // unknown type, so no-op.
                                      return function () {};
                                  }
                              }
                          }

                          function buildRows(fields, oldFields) {
                              if (fields === oldFields) {
                                  return;
                              }

                              // FIXME: Need to remember what scopes we created here so that
                              // if we get run again we can destroy them all before we make
                              // new ones.

                              // empty the table in case we've already got some stuff in there
                              $element.html('');

                              var data = $scope.dataExpr($scope);

                              angular.forEach(
                                  fields,
                                  function (field) {

                                      var rowElem = angular.element(
                                          '<div class="control-group"></div>'
                                      );
                                      var captionElem = angular.element(
                                          '<label class="control-label"></label>'
                                      );
                                      var bodyElem = angular.element(
                                          '<div class="controls"></div>'
                                      );
                                      rowElem.append(captionElem);
                                      rowElem.append(bodyElem);

                                      function updateCaption(newCaption) {
                                          captionElem.text(field.caption);
                                      }

                                      function updateFieldType(newType) {
                                          bodyElem.html('');
                                          var fieldScope = $scope.$new(true);
                                          fieldScope.config = field;

                                          rowElem.addClass('control-group--' +
                                              field.model.replace(/([a-z])([A-Z])/g,
                                                  function (m) {
                                                      return m[0] + '-' + m[1];
                                                  }
                                              ).toLowerCase()
                                          );

                                          var modelGet = $parse(field.model);
                                          var modelSet = modelGet.assign;

                                          var lastValue = fieldScope.value = modelGet(data);

                                          // make fieldScope.value an alias of the model
                                          $scope.$watch(
                                              function () {
                                                  var parentValue = modelGet(data);
                                                  if (parentValue !== fieldScope.value) {
                                                      // out of sync and need to copy
                                                      if (parentValue !== lastValue) {
                                                          // parent changed and has precedence
                                                          lastValue = fieldScope.value = parentValue;
                                                      }
                                                      else {
                                                          // update the parent
                                                          parentValue = lastValue = fieldScope.value;
                                                          modelSet(
                                                              data,
                                                              fieldScope.value
                                                          );
                                                      }
                                                  }
                                                  return parentValue;
                                              }
                                          );
                                          var link = linkFunctionForFieldType(field.type);
                                          link(
                                              fieldScope,
                                              function (clonedElement) {
                                                  bodyElem.append(clonedElement);
                                              }
                                          );
                                      }

                                      $scope.$watch(
                                          function () {
                                              return field.caption;
                                          },
                                          updateCaption
                                      );

                                      $scope.$watch(
                                          function () {
                                              return field.type;
                                          },
                                          updateFieldType
                                      );

                                      $element.append(rowElem);
                                  }
                              );
                          }

                          $scope.$watch(
                              function () {
                                  return $scope.fieldsExpr($scope);
                              },
                              buildRows,
                              true
                          );
                          $scope.$watch(
                              function () {
                                  return $scope.dataExpr($scope);
                              },
                              function () {
                                  buildRows($scope.fieldsExpr($scope));
                              },
                              false
                          );

                      };
                  }
              };
         }]
     );

})(angular);
