# Script to install prod
install:
	yarn && yarn build

# from develop to master
release:
	./scripts/release.sh