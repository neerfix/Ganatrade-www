# Script to install prod
install:
	./scripts/install-node-ci.sh
	yarn
	yarn build

# from develop to master
release:
	./scripts/release.sh
