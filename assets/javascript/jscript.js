//VARIABLES
var pageNum = 0;

//API KEYS
var eventAPI = "NjCxcbmpRsWLzuFvW8Gr95HtW4UlTCbG";

//TICKETMASTER SEARCH
function eventFetch(page) {

    //MULTIPLE PAGE HANDLER
    fetch("https://app.ticketmaster.com/discovery/v2/events.json?apikey=" + eventAPI + "&city=new+york&radius=10&page=" + page)
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
function eventsHandler(data) {

    for (i = 0; i < data._embedded.events.length; i++) {
        renderEvents(data._embedded.events[i]);
    }
};

//renders the data into cards from ticketmaster
function renderEvents(data) {

    //create the card container and then the other elements of the card
    var cardCellEl = $("<div>")
        .addClass("cell");
    var cardContainerEl = $("<div>")
        .addClass("card");
    var cardImgEl = $("<img>")
        .attr("src", data.images[4].url)
    var cardHeaderEl = $("<div>")
        .addClass("card-divider")
        .text(data.name);
    var cardBodyDescEl = $("<div>")
        .addClass("card-section")
        .text(data.info);
    var cardBodyLocEl = $("<div>")
        .addClass("card-section")
        .text(data._embedded.venues[0].name);

    $(cardContainerEl).append(cardImgEl);
    $(cardContainerEl).append(cardHeaderEl);
    $(cardContainerEl).append(cardBodyDescEl);
    $(cardContainerEl).append(cardBodyLocEl);
    $(cardCellEl).append(cardContainerEl);
    $("#event-info").append(cardCellEl);

}

//NAV FORWARD ARROW - Increments the page count by 1 then re-renders the entire page
$("#scroll-forward").on("click", function () {

    //clear previous contents of the #event-info container
    $("#event-info").empty();
    pageNum++;
    //update the page number at the bottom of the screen
    $(".page-num").text("Page " + (pageNum + 1));
    //make the back arrow visable again
    $("#scroll-back").show();

    eventFetch(pageNum);
});

//NAV BACK ARROW - Decrements the page count by 1 then re-renders the entire page
$("#scroll-back").on("click", function(){

    //clear previous contents of the #event-info container
    $("#event-info").empty();
    pageNum--;

    //update the page number at the bottom of the screen
    $(".page-num").text("Page " + (pageNum + 1));
    //maake the back arrow invisible if the page is back to 0
    if (pageNum === 0 ){
        $("#scroll-back").hide();
    };

    eventFetch(pageNum);
});

eventFetch(pageNum);