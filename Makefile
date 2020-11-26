# Script to install prod
install:
	yarn
	yarn build
	./scripts/install-node-ci.sh

# from develop to master
release:
	./scripts/release.sh
