
var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var convert = require("xml-js");
const {joinUser, removeUser, findUser} = require('./users');

/*app.get("/", function(req, res){

fetch('cic.n.d_lat.xml')
.then(function(response) { //response is the result of fetch and response is a promise
    return response.text()
}

).then(function(response) { //this is a callback function and it gets called with my text file
    //its response contains my text, so we feed the response to the parser
    const parser = new DOMParser(); //DOMParser is a singleton function; you don't give it things
    const doc1 = parser.parseFromString(response, "application/xml");
    const div1 = doc1.getElementsByTagName("div1");//everything in the 
   for(let item of div1) {
        document.body.append(item);
   }

}
)
	var xml = require('fs').readFileSync(
		__dirname + '/cic.n.d_lat.xml', 'utf8');
	const parser = new DOMParser();
	const doc1 = parser.parseFromString(res, "appliation/xml");
	const div1 = doc1.getElementsByTagName("div1");
	for(let item of div1) document.body.append(item);
	res.send(result);


	var xml = require('xml');
	response.set('Content-Type', 'text/xml');
	response.send(xml(name_of_restaurants));
	
	res.sendFile(__dirname + "/index.html");
});*/

app.get("/chat", function (req, res) {
  res.sendFile(__dirname + "/chat_index.html");
});
let thisRoom = "";
io.on("connection", function (socket) {
  console.log("connected");
  socket.on("join room", (data) => {
    console.log('in room');
    let Newuser = joinUser(socket.id, data.username,data.roomName)
    //io.to(Newuser.roomname).emit('send data' , {username : Newuser.username,roomname : Newuser.roomname, id : socket.id})
   // io.to(socket.id).emit('send data' , {id : socket.id ,username:Newuser.username, roomname : Newuser.roomname });
   socket.emit('send data' , {id : socket.id ,username:Newuser.username, roomname : Newuser.roomname });
   
    thisRoom = Newuser.roomname;
    console.log(Newuser);
    socket.join(Newuser.roomname);
  });
  socket.on("chat message", (data) => {
    io.to(thisRoom).emit("chat message", {data:data,id : socket.id});
  });
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    console.log(user);
    if(user) {
      console.log(user.username + ' has left');
    }
    console.log("disconnected");

  });
});

http.listen(3000, function () {});
