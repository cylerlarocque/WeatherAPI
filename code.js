 //use document.ready to begin attaching events to things in the HTML page
 $(document).ready( () => {

    //when we call button1, let's display an alert
    $("#button1").click( () => {
        $("#zones").html("");
        $("#forecast").html("");
        //create the data to send to the web service
        let data = {};
        data.area = $("#State").val();

        //instead of the alert... let's call the AJAX function:
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

function Success(ajaxData)
{
    //$("body").append("<p>" + ajaxData.features[i].properties.name + "<button onclick('" + CallAjax("https://api.weather.gov/zones/land" + ajaxData.features[i].properties.id + "/forecast", "GET", {}, "json", Success2,Fail,Always) + "')>get forecast </button> </p>")

    console.log(ajaxData);
    for (let i = 0; i < ajaxData.features.length; i++)
    {
        let index = i+2;
        $("#zones").append("<p>" + ajaxData.features[i].properties.name + " <button id = 'button"+ index +"'>Get Forecast</button> </p>")
        $("#button"+index).click( () => {
            //call the AJAX function:
            CallAJAX("https://api.weather.gov/zones/land/" + ajaxData.features[index].properties.id + "/forecast",
            "GET", {}, "json", Success2,Fail,Always)
        });
    }
    
    

};

function Success2(ajaxData)
{
    console.log(ajaxData);

    for (let i = 0; i < ajaxData.properties.periods.length; i++)
    {
        $("#forecast").append("<p>" + ajaxData.properties.periods[i].name + ": " + ajaxData.properties.periods[i].detailedForecast + "</p>");
    }

}

function Fail(ajaxReq, textStatus, errorThrown)
{
    console.log(errorThrown);
}

function Always()
{
    //do nothing
}