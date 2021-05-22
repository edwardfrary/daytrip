//API KEYS
var eventAPI = "7J7BKJH5MNJRZSFHOQWE";

function apiSearch() {    
    fetch("https://www.eventbrite.com/oauth/authorize?response_type=code&client_id="+ eventAPI)
        .then(function (response) {
            //check if there is a response then json the data and send it to be processed
            if (response.ok) {
                response.json().then(function (data) {
                    return data;
                });
            }

            //display error message if no response
            else {
                alert("INVALID ENTRY");
            }
        })
};

apiSearch();
console.log(apiSearch());