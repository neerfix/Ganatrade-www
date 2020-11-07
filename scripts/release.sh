	yarn install
	git checkout develop
	git pull origin develop
	git checkout master
	git merge develop
	npm run release
	git push origin master
	git push origin develop
	git push --follow-tags origin master