'use strict';



describe('Test suite for input validation', function() {

    var validationService;

    beforeEach(function() {
        module('myApp.sequence');

        inject(function($injector) {
            validationService = $injector.get('validator');
        });
    });

    it('should reject null input', function() {
        var result = validationService.validateInput(null);
        expect(result).toBe(false);
    });

    it('should reject non numeric input', function() {
        var result = validationService.validateInput('hello');
        expect(result).toBe(false);
    });

    it('should reject decimal number input, whole values only', function() {
        var result = validationService.validateInput(12.3);
        expect(result).toBe(false);
    });

    it('should reject negative values', function() {
        var result = validationService.validateInput(-4);
        expect(result).toBe(false);
    });


    it('should reject 0', function() {
        var result = validationService.validateInput(0);
        expect(result).toBe(false);
    });

});







describe('Test suite for numeric sequencer', function() {

    var sequencerService;

    beforeEach(function() {
        module('myApp.sequence');

        inject(function($injector) {
            sequencerService = $injector.get('sequencer');
        });
    });


    it('return empty result when max value is less than 1', function() {
        var result = sequencerService.generateNumericSequence(0);

        //check result length - should be empty
        expect(result.length).toBe(0);
    });


    it('numeric sequence test - single value', function() {
        var result = sequencerService.generateNumericSequence(1);

        //check result length
        expect(result.length).toBe(1);

        //check values
        var valuesArr = result.map(function(obj){ return obj.value; });
        expect(valuesArr[0]).toBe(1);
    });

     it('numeric sequence test - multiple values', function() {
        var result = sequencerService.generateNumericSequence(3);

        //check result length
        expect(result.length).toBe(3);

        //check values - 1,2,3
        var valuesArr = result.map(function(obj){ return obj.value; });
        expect(valuesArr[0]).toBe(1);
        expect(valuesArr[1]).toBe(2);
        expect(valuesArr[2]).toBe(3);
    });

});



describe('Test suite for odd number sequencer', function() {

    var sequencerService;

    beforeEach(function() {
        module('myApp.sequence');

        inject(function($injector) {
            sequencerService = $injector.get('sequencer');
        });
    });

    it('return empty result when max value is less than 1', function() {
        var result = sequencerService.generateOddNumberSequence(0);

        //check result length - should be empty
        expect(result.length).toBe(0);
    });


    it('odd number test - single value', function() {
        var result = sequencerService.generateOddNumberSequence(1);

        //check result length
        expect(result.length).toBe(1);

        //check values
        var valuesArr = result.map(function(obj){ return obj.value; });
        expect(valuesArr[0]).toBe(1);
    });

    it('odd number test - multiple values', function() {
        var result = sequencerService.generateOddNumberSequence(6);

        //check result length
        expect(result.length).toBe(3);

        //check values - 1,3,5
        var valuesArr = result.map(function(obj){ return obj.value; });
        expect(valuesArr[0]).toBe(1);
        expect(valuesArr[1]).toBe(3);
        expect(valuesArr[2]).toBe(5);
    });


});



describe('Test suite for even number sequencer', function() {

    var sequencerService;

    beforeEach(function() {
        module('myApp.sequence');

        inject(function($injector) {
            sequencerService = $injector.get('sequencer');
        });
    });


    it('even number test - single value no result', function() {
        var result = sequencerService.generateEvenNumberSequence(1);

        //check result length - should get nothing back as there are no even numbers before 1
        expect(result.length).toBe(0);
    });


    it('even number test - single value', function() {
        var result = sequencerService.generateEvenNumberSequence(2);

        //check result length
        expect(result.length).toBe(1);

        //check values
        var valuesArr = result.map(function(obj){ return obj.value; });
        expect(valuesArr[0]).toBe(2);
    });

    it('even number test - multiple values', function() {
        var result = sequencerService.generateEvenNumberSequence(7);

        //check result length
        expect(result.length).toBe(3);

        //check values - 2,4,6
        var valuesArr = result.map(function(obj){ return obj.value; });
        expect(valuesArr[0]).toBe(2);
        expect(valuesArr[1]).toBe(4);
        expect(valuesArr[2]).toBe(6);
    });

});







describe('Test suite for lettered number sequencer', function() {

    var sequencerService;

    beforeEach(function() {
        module('myApp.sequence');

        inject(function($injector) {
            sequencerService = $injector.get('sequencer');
        });
    });

	it('return empty result when max value is less than 1', function() {
        var result = sequencerService.generateLetteredNumberSequence(0);

        //check result length - should be empty
        expect(result.length).toBe(0);
    });


	it('Lettered number test - single value', function() {
        var result = sequencerService.generateLetteredNumberSequence(1);

        //check result length 
        expect(result.length).toBe(1);

    	//check values
        var valuesArr = result.map(function(obj){ return obj.value; });
        expect(valuesArr[0]).toBe(1);
    });


	it('Lettered number test - multiple of 3', function() {
        var result = sequencerService.generateLetteredNumberSequence(4);

        //check result length 
        expect(result.length).toBe(4);

    	//check values - 1,2,C,4
        var valuesArr = result.map(function(obj){ return obj.value; });
        for(var i = 1; i <= valuesArr.length; i++){

    		if(i % 3 == 0 && i % 5 != 0)
				expect(valuesArr[i - 1]).toBe('C');
			else
				expect(valuesArr[i - 1]).not.toBe('C');
		}
    });

    it('Lettered number test - multiple of 5', function() {
        var result = sequencerService.generateLetteredNumberSequence(8);

        //check result length 
        expect(result.length).toBe(8);

    	//check values 
        var valuesArr = result.map(function(obj){ return obj.value; });
        for(var i = 1; i <= valuesArr.length; i++){

    		if(i % 5 == 0 && i % 3 != 0)
				expect(valuesArr[i - 1]).toBe('E');
			else
				expect(valuesArr[i - 1]).not.toBe('E');
		}
    });


    it('Lettered number test - multiple of 3 & 5', function() {
		var result = sequencerService.generateLetteredNumberSequence(20);

        //check result length 
        expect(result.length).toBe(20);

    	//check values 
        var valuesArr = result.map(function(obj){ return obj.value; });
        for(var i = 1; i <= valuesArr.length; i++){

    		if(i % 5 == 0 && i % 3 == 0)
				expect(valuesArr[i - 1]).toBe('Z');
			else
				expect(valuesArr[i - 1]).not.toBe('Z');
		}
    });

});


describe('Test suite for Fibonacci number sequencer', function() {

    var sequencerService;

    beforeEach(function() {
        module('myApp.sequence');

        inject(function($injector) {
            sequencerService = $injector.get('sequencer');
        });
    });


	it('return empty result when max value is less than 1', function() {
        var result = sequencerService.generateFibonacciNumberSequence(0);

        //check result length - should be empty
        expect(result.length).toBe(0);
    });

    it('Fibonacci number test - single value', function() {
        var result = sequencerService.generateFibonacciNumberSequence(1);

        //check result length 
        expect(result.length).toBe(1);

    	//check values
        var valuesArr = result.map(function(obj){ return obj.value; });
        expect(valuesArr[0]).toBe(1);
    });

    it('Fibonacci number test - multiple values', function() {
        var result = sequencerService.generateFibonacciNumberSequence(12);

        //check result length
        expect(result.length).toBe(5);

        //check values - 1,2,3,5,8
        var valuesArr = result.map(function(obj){ return obj.value; });
        expect(valuesArr[0]).toBe(1);
        expect(valuesArr[1]).toBe(2);
        expect(valuesArr[2]).toBe(3);
        expect(valuesArr[3]).toBe(5);
        expect(valuesArr[4]).toBe(8);
    });

});