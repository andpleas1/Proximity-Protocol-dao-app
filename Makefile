VERSION := 1.7

build:
	rm -rf packages/web-app/dist
	rm -rf packages/ui-components/dist
	cd packages/ui-components && npm run build
	cd packages/web-app && npm run build
	sudo docker build -t dao-app --platform linux/amd64 .
	sudo docker tag dao-app justincutup/dao-app:${VERSION}
	sudo docker push justincutup/dao-app:${VERSION}

run:
	sudo docker stop $$(docker ps -aq)
	sudo docker pull justincutup/dao-app:${VERSION}
	sudo docker run -p 9080:9080 -d justincutup/dao-app:${VERSION}
