'use strict';

describe('movieSearchApp module', function() {
    var scope,
        controller;
    beforeEach(function () {
        module('movieSearchApp');

    });

    describe('MovieListCtrl', function(){
        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('MovieListCtrl', {
                '$scope': scope
            });
        }));

        it('should ....', inject(function($rootScope, $controller) {
            expect(controller).toBeDefined();
        }));

        it('sets the query', function () {
            expect(scope.query).toBe('');
        });
    });
});
