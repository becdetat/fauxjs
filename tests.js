var should = require('chai').should()
var faux = require('./index')

describe('faux', function() {
	describe('wasCalled', function() {
		it('passes if the stub function was called', function() {
			var fn = faux(function() {})

			fn()

			fn.wasCalled()
		})
		it('passes if the stub function was called with the required condition', function() {
			var fn = faux(function() {})

			fn(123)

			fn.wasCalled(function(x) {
				return x[0] == 123
			})
		})
		it('throws if the stub function was not called', function() {
			var fn = faux(function() {})

			fn.wasCalled.should.throw('Faux function should have been called but it was not called')
		})
		it('throws if the stub function was not called with the required condition', function() {
			var fn = faux(function() {})

			fn(789)

			var checkFn = function() {
				fn.wasCalled(function(x) {
					return x[0] == 123
				})
			}

			checkFn.should.throw('Faux function should have been called with arguments matching: "function (x) {\r\n\t\t\t\t\treturn x[0] == 123\r\n\t\t\t\t}" but it was called 1 times with the following arguments: [{"0":789}]')
		})
	})
	describe('wasNotCalled', function() {
		it('passes if the stub function was not called', function() {
			var fn = faux(function() {})

			fn.wasNotCalled()
		})
		it('passes if the stub function was not called with the required condition', function() {
			var fn = faux(function() {})

			fn(789)

			fn.wasNotCalled(function(x) {
				return x[0] == 123
			})
		})
		it('throws if the stub function was called', function() {
			var fn = faux(function() {})

			fn(123)

			fn.wasNotCalled.should.throw('Faux function should not have been called but it was called 1 times with the following arguments: [{"0":123}]')
		})
		it('throws if the stub function was called with the required condition', function() {
			var fn = faux(function() {})

			fn(123)

			var checkFn = function() {
				fn.wasNotCalled(function(x) {
					return x[0] == 123
				})
			}

			checkFn.should.throw('Faux function should not have been called with arguments matching: "function (x) {\r\n\t\t\t\t\treturn x[0] == 123\r\n\t\t\t\t}" but it was called 1 times with the following arguments: [{"0":123}]')
		})		
	})
	describe('faux function', function() {
		it('gets called with the original arguments', function() {
			var fn = faux(function(a, b, c) {
				a.should.equal('a')
				b.should.equal('b')
				c.should.equal('c')
			})

			fn('a', 'b', 'c')
		})
	})
})