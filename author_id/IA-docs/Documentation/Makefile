.DEFAULT_GOAL := build

build: network.dot webapp.dot database.dot
	dot network.dot -Tpng > network.png
	dot webapp.dot -Tpng > webapp.png
	dot database.dot -Tpng > database.png
