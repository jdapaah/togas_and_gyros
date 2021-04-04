

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
