all: build

.PHONY: build
build: lib test
	@install -d build/
	@rm -rf build/*
	@cat src/*.js > build/app.js
	@./node_modules/.bin/uglifyjs -nc build/app.js > build/app.min.js
	@rm build/app.js
	@cp src/*.html build/.
	@cp src/manifest.json build/.
	@cp -R lib/ build/.

.PHONY: test
test:
	@./node_modules/.bin/jshint src/*.js --config src/.jshintrc

lib:
	@install -d lib/crypto-js/
	@cd lib/crypto-js && curl -LO "http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/md5.js" && cd ../.. 

.PHONY: clean
clean:
	@rm -rf build/
	@rm -rf lib/
