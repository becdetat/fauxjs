(function() {
	function faux(fn) {
		var callArgs = []

		fn = fn || function() {}

		var fauxFn = function() {
			callArgs.push(arguments)
			return fn()
		}

		function getWasCalled(argFn) {
			argFn = argFn || function(x) { return true }

			return callArgs.some(function(x) { return argFn(x) })
		}

		function getArgFnMessage(argFn) {
			return !!argFn
				? `with arguments matching: "${argFn}" `
				: ''
		}

		function getCallsMessage() {
			return callArgs.length == 0
				? 'not called'
				: `called ${callArgs.length} times with the following arguments: ${JSON.stringify(callArgs)}`
		}

		fauxFn.wasCalled = function(argFn) {
			if (!getWasCalled(argFn)) {
				throw `Faux function should have been called ${getArgFnMessage(argFn)}but it was ${getCallsMessage()}`
			}
		}

		fauxFn.wasNotCalled = function(argFn) {
			if (getWasCalled(argFn)) {
				throw `Faux function should not have been called ${getArgFnMessage(argFn)}but it was ${getCallsMessage()}`
			}
		}

		return fauxFn
	}

	if (typeof define === 'function' && define.amd) {
		define(function() {
			return faux
		})
	} else if (typeof exports === 'object') {
		module.exports = faux
	} else {
		window.faux = faux
	}
})()



