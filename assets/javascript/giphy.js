var queryURLBase = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=5&q=";
var queryURL;
var arr = ["braveheart", "gladiator", "star wars", "anchorman", "step brothers", "talladega nights", "elf", "old school"];

$(function() {




    makeBtn();

    $(".gif").on("click", function() {

        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    $("#submit").on("click", function() {
        var newMovie = $("<button>" + ($("#input").val()) + "</button>");
        newMovie.addClass("btn");
        newMovie.attr("id", ($("#input").val()));
        arr.push($("#input").val());
        $("#btns").append(newMovie);




    });

    $(".btn").on("click", function() {

        console.log($(this).attr('id'));
        queryURL = queryURLBase + ($(this).attr('id'));
        searchGif();
    })

    function makeBtn() {
        $("#btns").empty();
        for (i = 0; i < arr.length; i++) {
            var newBtn = $("<button>" + arr[i] + "</button>");

            newBtn.addClass("btn");
            newBtn.attr('id', arr[i]);

            $("#btns").append(newBtn);
        }
    }




    function searchGif() {
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function(response) {
            console.log(response);
            var results = response.data;
            $("#giphy").empty();
            for (var i = 0; i < results.length; i++) {
                var newGif = $("<div>")
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                var gifImg = $("<img class='gif' data-state='still'>");
                gifImg.attr("src", results[i].images.fixed_height_still.url);
                gifImg.attr({ 'data-animate': results[i].images.fixed_height.url });
                gifImg.attr({ 'data-state': "still" });
                gifImg.attr({ 'data-still': results[i].images.fixed_height_still.url });
                newGif.append(gifImg);
                newGif.append(gifRating);
                $("#giphy").append(newGif);

            }


        });
    }


});