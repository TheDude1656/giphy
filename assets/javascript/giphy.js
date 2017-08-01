var queryURLBase = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=5&q=";
var arr = ["braveheart", "gladiator", "star wars", "anchorman", "step brothers", "talladega nights", "elf", "old school"];
var results;
var currentGif;
var stillGif;
var pausedGif;
var animatedGif;

$(function() {




    makeBtn();



    $("#submit").on("click", function() {

        var newMovie = $('#input').val().trim();
        arr.push($("#input").val());
        makeBtn();
        return false;
    });

    // $(".btn").on("click", function() {

    //     console.log($(this).attr('id'));
    //     queryURL = queryURLBase + ($(this).attr('id'));
    //     searchGif();
    // })


    function makeBtn() {
        $("#btns").empty();
        for (i = 0; i < arr.length; i++) {
            var newBtn = $("<button>").text(arr[i]).addClass("btn").attr({ 'data-name': arr[i] });

            // newBtn.addClass("btn");
            // newBtn.attr('id', arr[i]);

            $("#btns").append(newBtn);
        }


        $('.btn').on('click', function() {

            $('#giphy').empty();
            var thisShow = $(this).attr('data-name');
            var queryURL = queryURLBase + thisShow;

            $.ajax({
                url: queryURL,
                method: 'GET'
            }).done(function(response) {
                console.log(response);
                results = response.data;

                for (var i = 0; i < results.length; i++) {
                    animatedGif = results[i].images.fixed_height.url;
                    pausedGif = results[i].images.fixed_height_still.url;
                    var gifRating = $("<p />").text("Rating: " + results[i].rating);
                    stillGif = $('<img>').attr('data-state', "still").attr('data-animated', animatedGif).attr('data-paused', pausedGif).attr('src', pausedGif).addClass('imgGif');
                    var fullGifDisplay = $('<button>').append(stillGif).append(gifRating);
                    $("#giphy").append(fullGifDisplay);

                };

                $(".imgGif").on("click", function() {
                    var state = $(this).attr('data-state');

                    if (state === "still") {
                        $(this).attr('src', $(this).data("animated"));
                        $(this).attr("data-state", "animate");

                    } else {
                        $(this).attr('src', $(this).data("paused"));
                        $(this).attr("data-state", "still");

                    }

                });



            });

        });

    };

});