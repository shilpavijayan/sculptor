REPORTER = spec
MOCHA_OPTS = --ui bdd -c

server_test:
	clear
	echo -------Starting Server test---------------------------------------------
	../node_modules/mocha/bin/mocha \
	--reporter $(REPORTER) \
	$(MOCHA_OPTS) \
	tests/server_test.js
	echo -------Ending Server test---------------------------------------------
.PHONY: server_test
