//API KEYS
var eventAPI = "NjCxcbmpRsWLzuFvW8Gr95HtW4UlTCbG";

//TICKETMASTER SEARCH
function eventFetch (){

fetch("https://app.ticketmaster.com/discovery/v2/events.json?apikey=" + eventAPI + "&city=new+york&radius=10")
        .then(function (response) {
            //check if there is a response then json the data and send it to be processed
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    eventsHandler(data);
                });
            }
            //display error message if no response
            else {
                alert("INVALID ENTRY");
            };
        })
};


//splits the ticketmaster data into single events to be rendered
function eventsHandler(data){
    
    for (i = 0;i<data._embedded.events.length;i++){
        renderEvents(data._embedded.events[i]);
    }
};

//renders the data into cards from ticketmaster
function renderEvents(data){

 //create the card container and then the other elements of the card
 var cardCellEl = $("<div>")
 .addClass("cell");
var cardContainerEl = $("<div>")
 .addClass("card");
var cardHeaderEl = $("<div>")
 .addClass("card-divider")
 .text(data.name);
var cardBodyDescEl = $("<div>")
 .addClass("card-section")
 .text(data.info);
 var cardBodyLocEl = $("<div>")
 .addClass("card-section")
 .text(data._embedded.venues[0].name);

$(cardContainerEl).append(cardHeaderEl);
$(cardContainerEl).append(cardBodyDescEl);
$(cardContainerEl).append(cardBodyLocEl);
$(cardCellEl).append(cardContainerEl);
$("#event-info").append(cardCellEl);

}

eventFetch();