FauxJS
======

A very basic function mocking and call assertion library.

## Installation

Via NPM:

	npm install fauxjs

It should work out of the box with RequireJS and AMD.

	var faux = require('fauxjs')

If neither RequireJS or AMD are found, the `faux` function is added to the `window` object.


## Usage

Faux creates a mock method, optionally wrapped around a callback.

	// Arrange:
	var broker = new Broker()
	broker.sell = faux()

	// Act:
	broker.enact(portfolio, instructions)

	// Assert:
	broker.sell.wasCalled()

If the `broker.sell` method wasn't called, an exception is thrown.

A callback can be passed to `wasCalled`, allowing conditions to be applied to the check. Each time the mocked method is called the arguments are recorded, and the callback is called against each of these sets of arguments:

	broker.sell.wasCalled(function(x) {
		return x[0] == 'BHP' && x[1] == 4000
	})

There is a corresponding `wasNotCalled` method that just reverses the logic.

### Mocking Angular's `$http` service

Angular's `$http` service is usually used by chaining `.then()` calls to the promise. For example:

	$http
		.post('/some/api', {
			id: 123
		})
		.then(function(x) { ... })

Faux can be used to create a simple mock `$http` service to support this:

	// Arrange:
	var $http = {
		post: faux(function() {
			return {
				then: faux()
			}
		})
	}
	var controller = new MyController($http)

	// Act:
	controller.action()

	// Assert:
	$http.post.wasCalled(function(x) {
		return x[0] == '/some/api' && x[1].id == 123
	})


## TODO

- Pass a call count to `wasCalled`/`wasNotCalled`: `fn.wasCalled(2)` (`fn` was called 2 times), `fn.wasCalled(x => x[0] == 123, 2)` (`fn` was called matching the conditions 2 times)
