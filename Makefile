# Script to install prod
install:
	curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.1/install.sh | bash && nvm install 14.15.1 && nvm use 14.15.1 && yarn && yarn build

# from develop to master
release:
	./scripts/release.sh
