'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('WNG numeric sequence app e2e tests', function() {


  it('should automatically redirect to /sequence when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/sequence");
  });


  describe('sequence', function() {

    beforeEach(function() {
      browser.get('index.html#!/sequence');
    });


    it('should render sequence when user navigates to /sequence', function() {
      expect(element.all(by.css('[ng-view] h1')).first().getText()).
        toMatch('WNG Numeric Sequence App');
    });

  });



  describe('invalid non integer input entered', function() {
    it('should display the red warning message', function() {

      // Find the element with ng-model="maxValue" and type some invalid input into it
      element(by.model('maxValue')).sendKeys('not a number');

      // Find the first (and only) button on the page and click it
      element(by.id('genSequence')).click();

      //verify that the warning label is visible
      expect(element(by.id('inputErrorMsg')).isDisplayed()).toBe(true); 

    //verify that the sequence is NOT displayed
      expect(element(by.id('numericSeqSpan')).isDisplayed()).toBe(false); 
      expect(element(by.id('oddValSeqSpan')).isDisplayed()).toBe(false); 
      expect(element(by.id('evenValSeqSpan')).isDisplayed()).toBe(false); 
      expect(element(by.id('letteredSeqSpan')).isDisplayed()).toBe(false); 
      expect(element(by.id('fibonacciSeqSpan')).isDisplayed()).toBe(false); 
    });
  });



  describe('valid integer input entered', function() {
    it('should not display the red warning message and should show the sequence values', function() {

      //clear previous invalid entry/previous tests
      element(by.model('maxValue')).clear();

      // Find the element with ng-model="maxValue" and type number 20 into it
      element(by.model('maxValue')).sendKeys('20');

      // Find the first (and only) button on the page and click it
      element(by.id('genSequence')).click();

      //verify that the warning label is NOT visible
      expect(element(by.id('inputErrorMsg')).isDisplayed()).toBe(false); 


      //verify that the sequence is displayed
      expect(element(by.id('numericSeqSpan')).isDisplayed()).toBe(true); 
      expect(element(by.id('oddValSeqSpan')).isDisplayed()).toBe(true); 
      expect(element(by.id('evenValSeqSpan')).isDisplayed()).toBe(true); 
      expect(element(by.id('letteredSeqSpan')).isDisplayed()).toBe(true); 
      expect(element(by.id('fibonacciSeqSpan')).isDisplayed()).toBe(true); 
    });
  });




});
