.PHONY: test
test:
	./node_modules/mocha/bin/mocha test/test.js -R spec -b
