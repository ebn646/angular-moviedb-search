'use strict';

describe('movieSearchApp module', function() {
    var scope,
        controller;
    beforeEach(function () {
        module('movieSearchApp');

    });

    describe('DetailsCtrl', function(){
        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('DetailsCtrl', {
                '$scope': scope
            });
        }));

        it('should ....', inject(function($rootScope, $controller) {
            expect(controller).toBeDefined();
        }));

        it('The fresh object is not defined yet', function () {
            expect(scope.fresh).not.toBeDefined();
        });
    });
});

