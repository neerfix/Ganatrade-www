# Script to install prod
install:
<<<<<<< HEAD
	yarn
	yarn build
	./scripts/install-node-ci.sh
=======
	yarn && yarn build
>>>>>>> d596e7842bc18f30011fcceb27082e4cba6fe43d

# from develop to master
release:
	./scripts/release.sh
