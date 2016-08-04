'use strict';

angular.module('myApp.sequence', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/sequence', {
    templateUrl: 'sequence/sequence_view.html',
    controller: 'SequenceCtrl'
  });
}])




.factory('validator', [function() {

    function validateInput(strInput) {
        if(strInput == null)	//check for nulls
        	return false;
        if(isNaN(strInput))		//check for non number values
        	return false;
        if(strInput % 1 != 0)	//check for decimals
    		return false;
    	if(strInput < 1)		//check for positive values
    		return false;

        return true;
    }

    return {
        validateInput: validateInput
    };
}])


.factory('sequencer', [function() {

    function generateNumericSequence(max) {
       	var result = [];	
       	var indexVal = 0;

		for(var i = 1; i <= max; i++){
			result.push({ index: indexVal, value: i});
			indexVal++;
		}

		return result;
    }

    function generateOddNumberSequence(max) {
    	var result = [];   
    	var indexVal = 0;

		for(var i = 1; i <= max; i++){
			if(i % 2 != 0){
				result.push({ index: indexVal, value: i});
				indexVal++;
			}
		}

		return result;
    }

    function generateEvenNumberSequence(max) {
    	var result = [];   
    	var indexVal = 0;

		for(var i = 1; i <= max; i++){
			if(i % 2 == 0){
				result.push({ index: indexVal, value: i});
				indexVal++;
			}
		}

		return result;
    }

    function generateLetteredNumberSequence(max) {
    	var result = [];
    	var indexVal = 0;

		for(var i = 1; i <= max; i++){
			var valueToInsert = i;

			if(i > 0 && i % 3 == 0)
				valueToInsert = 'C';
			if(i > 0 && i % 5 == 0)
				valueToInsert = 'E';
			if(i > 0 && i % 3 == 0 && i % 5 == 0)
				valueToInsert = 'Z';
			
			result.push({ index: indexVal, value: valueToInsert});
			indexVal++;
		}
		return result;
    }

    function generateFibonacciNumberSequence(max) {
		var result = [];
		var indexVal = 0;

		if(max == 1)
			return [{ index: indexVal, value: 1}];
		else{
			var maxFibonacciVal = 1;
			var previousValue = 1;
			var prevPreviousValue = 0;

			while(maxFibonacciVal < max){
				maxFibonacciVal = prevPreviousValue + previousValue;

				if(maxFibonacciVal <= max){
					result.push({ index: indexVal, value: maxFibonacciVal});
					indexVal++;
				}

				prevPreviousValue = previousValue;
				previousValue = maxFibonacciVal;
			}				

			return result;
		}
    }

    return {
        generateNumericSequence: generateNumericSequence,
        generateOddNumberSequence: generateOddNumberSequence,
        generateEvenNumberSequence: generateEvenNumberSequence,
        generateLetteredNumberSequence: generateLetteredNumberSequence,
        generateFibonacciNumberSequence: generateFibonacciNumberSequence
    };
}])



.controller('SequenceCtrl', ['$scope', 'validator', 'sequencer', function($scope, validator, sequencer) {

	$scope.maxValue = null;
	$scope.sequences = null;
	$scope.isValidInput = true;

	$scope.generateSequences = function(){
		$scope.isValidInput = validator.validateInput($scope.maxValue);
	
		if($scope.isValidInput){

			$scope.sequences = {
				AllValues: sequencer.generateNumericSequence($scope.maxValue),
				OddNumbers: sequencer.generateOddNumberSequence($scope.maxValue),
				EvenNumbers: sequencer.generateEvenNumberSequence($scope.maxValue),
				LetterReplacedNumbers: sequencer.generateLetteredNumberSequence($scope.maxValue),
				FibonacciNumbers: sequencer.generateFibonacciNumberSequence($scope.maxValue)
			};

		}
		else
			$scope.sequences = null;
	};

}]);
