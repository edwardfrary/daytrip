//VARIABLES
var pageNum = 0;
var keyWord = 0;
//API KEYS
var eventAPI = "NjCxcbmpRsWLzuFvW8Gr95HtW4UlTCbG";

//TICKETMASTER SEARCH

//Save button inside modal is clicked

$("#search-submit").on("click", function(){
    keyWord = $("#search-entry").val();
    eventFetch(keyWord, pageNum);
});

function eventFetch(keyWord, page) {

    //MULTIPLE PAGE HANDLER
    fetch("https://app.ticketmaster.com/discovery/v2/events?apikey=" + eventAPI +"&keyword="+ keyWord+ "&page=" + page)
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

//renders the data from ticketmaster
function renderEvents(data) {

    //create the card container and then the other elements of the card
    var resultContainerEl = $("<div>")
    .addClass("grid-x data-container");

    var dataImgContainerEl = $("<div>")
    .addClass("cell small-3 event-image-container");

    var dataImgEl = $("<img>")
    .addClass("event-image")
        .attr("src", data.images[4].url);
    
        var textContainerEl = $("<div>")
        .addClass("cell small-9 text-container");
    var dataTitleEl = $("<div>")
        .addClass("data-title")
        .text(data.name);
    var dataBodyDescEl = $("<div>")
        .addClass("data-body")
        .text(data.info);
    var dataBodyLocEl = $("<div>")
        .addClass("data-venue")
        .text(data._embedded.venues[0].name);

    $(textContainerEl).append(dataTitleEl);
    $(textContainerEl).append(dataBodyDescEl);
    $(textContainerEl).append(dataBodyLocEl);
    $(dataImgContainerEl).append(dataImgEl);
    $(resultContainerEl).append(dataImgContainerEl);
    $(resultContainerEl).append(textContainerEl)
    $("#event-info").append(resultContainerEl);

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

    eventFetch(keyWord, pageNum);
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

    eventFetch(keyWord, pageNum);
});