# LAN Game Server
This is supposed to be a simple express app node server that uses websockets for the purpose of playing online games in real time. The 'server' part of the application is meant to deal with an abstract game type that follows a set of rules so that the games can be built as modules and simply added to the servers files. 
#
As an example I built a simple chat app that can be run on a local network and other users can connect to the local IP to sign up as a user and join the chat. The server runs as an http nodejs server, but the chat works with websockets.
# 
Another simple application that was started was an online card game that I think could even be improved by playing it as a web application on a LAN server since it requires users to be in the same place as eachother to interact, but the information that the users have needs to be kept secret to themselves. 
# Things to improve
* The modularization can be improved as some of the chat application is specified in code on the server whereas it should be taken out and only be mentioned in module files. 
* Also, the avalon card game could be finished.
