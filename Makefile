# Script to install prod
install:
	nvm use 14.15.1 && yarn && yarn build

# from develop to master
release:
	./scripts/release.sh
