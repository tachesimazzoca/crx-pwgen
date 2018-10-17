all: build

.PHONY: build
build:
	@install -d build/
	@rm -rf build/*
	@cat src/*.js > build/app.js
	@./node_modules/.bin/uglifyjs build/app.js > build/app.min.js
	@rm build/app.js
	@cp src/*.html build/.
	@cp src/manifest.json build/.
	@cp -R lib build/.

.PHONY: test
test:
	@./node_modules/.bin/jshint src/*.js --config src/.jshintrc

node_modules:
	@npm install

lib:
	@install -d lib/crypto-js/
	@cd lib/crypto-js && curl -LO "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/md5.js"

.PHONY: clean
clean:
	@rm -rf build/
	@rm -rf lib/
