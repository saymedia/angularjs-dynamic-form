describe('angularjs-dynamic-form-test', function () {

    var element;
    var $scope;
    var compile;
    var scopeFields = [
        {
            caption: 'Name',
            model: 'name',
            type: 'string',
            maxLength: 25
        },
        {
            caption: 'Street Address',
            model: 'address.street',
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
    ];

    var scopeData = {
        name: 'John Smith',
        nicknames: ['bill', 'dan', 'grumpy'],
        address: {}
    };
    var html = '<dynamic-table-form fields="fields" data="data">' +
            '<input dynamic-field-type="string"  ng-model="value" type="text">' +
            '<select dynamic-field-type="select" ng-model="value" ng-options=' +
                '"option.value as option.caption for option in config.options"></select>' +
            '</dynamic-table-form>';



    beforeEach(module('dynamic-form'));

    beforeEach(inject(function ($compile, $rootScope) {
        $scope = $rootScope.$new();
        compile = $compile;
        $scope.fields = [];
        $scope.data= {};

        element = angular.element(html);
    }));

    it('Should have added control groups for each element', function () {
        $scope.fields = [
            {
                caption: 'Name',
                model: 'name',
                type: 'string',
            },
            {
                caption: 'Street Address',
                model: 'address.street',
                type: 'string',
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
        ];

        compile(element)($scope);
        $scope.$digest();

        expect(element.children().length).toBe(scopeFields.length);
    });

    it('Should display a string field as an input field', function () {
        $scope.fields = [
            {caption: 'Name', model: 'name', type: 'string'}
        ];

        $scope.data = {
            name: 'John Smith'
        };

        compile(element)($scope);
        $scope.$digest();

        expect(element.children().length).toBe(1);
        expect(element.find('label').html()).toBe('Name');
        expect(element.find('input').length).toBe(1);
        expect(element.find('input').val()).toBe('John Smith');
    });

    it('Should display option fields as select with options', function () {
        $scope.fields = [
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
            }
        ];
        compile(element)($scope);
        $scope.$digest();

        expect(element.children().length).toBe(1);
        expect(element.children().find('select').length).toBe(1);
        // 1 extra default option
        expect(element.children().find('option').length).toBe(4);
    });
});