AngularJS Dynamic Form Directive
================================

This module provides an AngularJS directive that allows a form to be generated dynamically based
on a field configuration in the scope.

This is useful for situations where the shape of the target data structure is not known until
runtime. For example, this could be useful for building a generic database manipulation tool that
includes a form for manipulating a row of data, with the database itself providing the schema
information at runtime.

Usage
-----

To make the directive available to your application, load the source file (or build it into your
application's bundle) and declare a dependency on the module. For example:

```js
    var app = angular.module(['ng', 'ngRoute', 'dynamic-form']);
```

With this dependency declared you can use the directive in any of your templates:

```html
<dynamic-table-form fields="fields" data="data">
  <input dynamic-field-type="string" ng-model="value" type="text" maxlength="config.maxLength">
  <input dynamic-field-type="integer" ng-model="value" type="number">
  <select dynamic-field-type="choice" ng-model="value" ng-options="option.value as option.caption for option in config.options"></select>
</dynamic-table-form>
```

The children of the `dynamic-table-form` element are field configurations, selected by the
key given in the `dynamic-field-type` attribute. The `fields` attribute is an AngularJS
expression evaluating to a field configuration as described below. The `data` attribute
is an expression evaluating to an object whose properties will be edited by the form.

A field configuration must be provided so that the directive knows which fields to show.
This is just an array of field descriptions placed into the scope. Here's an example:

```js

$scope.fields = [
    {
        caption: 'Name',
        model: 'name',
        type: 'string',
        maxLength: 25
    },
    {
        caption: 'Age',
        model: 'age',
        type: 'number'
    },
    {
        caption: 'State',
        model: 'state',
        type: 'choice',
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
    }
];
````

The core properties of a field description are `caption`, `model` and `type`:

* `caption` is the literal string to show next to the field.
* `model` is an Angular expression, relative to the form's data object, identifying where in the data structure this field's value belongs.
* `type` is matched with the `dynamic-field-type` attributes in the directive to identify the appropriate UI to show for this field.

Other type-specific properties may be added and accessed from the type's template element.

The `dynamic-table-form` directive will then create one child element for each
element in the field configuration, binding the appropriate field element to
the field's value. The field elements are evaluated in a scope with the following
members:

* `value` is two-way bound to the result of the expression given in `model` in the field description.
* `config` is the field description itself, from which type-specific properties may be retrieved.
 
All field elements should interact with `value` in some way. The most common way is to reference
it as the `ng-model` of a form element as shown in the HTML example earlier in this page.

A more complete example is available in [example/](example/) in the repository, and you can also
[see the example live](http://saymedia.github.io/angularjs-dynamic-form/example/).

Collection Types
----------------

The original design for this library called for supporting special "collection types", which
are fields representing arrays or objects. The intent was that fields could have specifiers
like `array<string>` which would cause the module to first look for a field type called
`array` which could then transclude in a field for each item -- in this example the field
element for `string`. This would allow a single field type to be created for editing arrays
of any type, delegating to another field type for editing individual elements.

This feature is not yet implemented, although the collection type syntax can be parsed
and will be ignored. The practical implication of this for the moment is that it is not
possible to have field types containing `<` and `>` symbols.

The example linked above contains an ``array`` field element, but it is inoperable.
Support for this may be added in a future version.

In the mean time, arrays of specific types can be supported manually by the caller, by
creating a type name like `arrayOfString` and then populating that type's field element
with a UI for adding and removing strings to the array given in `value`.

License
-------

Copyright 2013 Say Media Ltd. All Rights Reserved. See the LICENSE file for distribution terms.
