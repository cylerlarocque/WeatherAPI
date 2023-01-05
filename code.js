 //use document.ready to begin attaching events to things in the HTML page
 $(document).ready( () => {

    //when we call button1, clear the page and call the web API
    $("#button1").click( () => {
        $("#zones").html("");
        $("#forecast").html("");
        //create the data to send to the web service
        let data = {};
        data.area = $("#State").val();

        //calling the weather API to get a list of zones
        CallAJAX("https://api.weather.gov/zones/land",
        "GET",data,"json",Success,Fail,Always);
    });
 });

 function CallAJAX(url,type,data,dataType,done,fail,always)
{
    //need to have all the info that AJAX requires for the request
    let ajaxOptions = {};

    //AJAX! These are the minimum properties to send an AJAX request
    //url - where to send the request
    //type - GET (select)/ POST (update)/ PUT (insert) / DELETE (delete)
    //GET is the type by DEFAULT
    //data - what data are we sending? (must match web service spec!)
    //dataType - what response do we want back? (HTML, JSON, XML)
    //success - callback for successful completion - once the async request is complete
    //error - callback for error in operation
    ajaxOptions.url = url;
    ajaxOptions.data = data;
    ajaxOptions.type = type;
    ajaxOptions.dataType = dataType;
    
    //"PUSH THE AJAX BUTTON"
    let x = $.ajax(ajaxOptions);

    x.done(done);
    x.fail(fail);
    x.always(always);
}

//when the zone list api call is successfull
function Success(ajaxData)
{
    console.log(ajaxData);
    //loop the program until each zone is displayed
    for (let i = 0; i < ajaxData.features.length; i++)
    {
        let index = i+2; //used to label new buttons made
        //write the zone name
        $("#zones").append("<p>" + ajaxData.features[i].properties.name + " <button id = 'button"+ index +"'>Get Forecast</button> </p>")
        //create a button next to the zone that will call on the forecast
        $("#button"+index).click( () => {
            //clear the forecast section and call the AJAX function:
            $("#forecast").html("");
            CallAJAX("https://api.weather.gov/zones/land/" + ajaxData.features[index].properties.id + "/forecast",
            "GET", {}, "json", Success2,Fail,Always)
        });
    }
    
    

};

//when the forecast api call is successfull
function Success2(ajaxData)
{
    console.log(ajaxData);
    //loop the program until all forecast data is displayed
    for (let i = 0; i < ajaxData.properties.periods.length; i++)
    {
        //write the forecast day, and the forecast information
        $("#forecast").append("<p>" + ajaxData.properties.periods[i].name + ": " + ajaxData.properties.periods[i].detailedForecast + "</p>");
    }

}

//when the api calls fail
function Fail(ajaxReq, textStatus, errorThrown)
{
    console.log(errorThrown);
}

function Always()
{
    //do nothing
}
