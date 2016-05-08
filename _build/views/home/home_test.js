'use strict';

describe('movies.home module', function() {
    var scope,
        controller;
    beforeEach(function () {
        module('movies.home');

    });

    describe('MovieSearchCtrl', function(){
        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('MovieSearchCtrl', {
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
