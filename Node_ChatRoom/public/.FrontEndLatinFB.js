//keys are the name of the greek person

/*express is a server that handles communication with the database (firbase)

app communicates with server, then server communicates with database

user uploads text then the program parses xml so it knows what to put in the database. express
reads that and puts it in the database

POST, GET, and SEND are critical to web development

JS has a DOM parser with which I can parse XML

*/

function showFile(){

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

});
}
