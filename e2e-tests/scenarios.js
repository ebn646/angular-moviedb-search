'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('movieSearchApp', function() {

  it('should automatically redirect to /home when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/home");
  });


  describe('home page', function() {

    beforeEach(function() {
      browser.get('/#/home');
    });


    it('should render home when user navigates to /home', function() {
      expect(element.all(by.css('header')).first().getText()).
        toMatch('SEARCH MOVIES');
    });

  });


  describe('detail page', function() {

    beforeEach(function() {
      browser.get('/#/detail/244786');
    });


    it('should render movie detail when user navigates to /detail/244786', function() {
      expect(element.all(by.css('h2')).first().getText()).
        toMatch('Whiplash');
    });

  });
});
