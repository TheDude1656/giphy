var queryURL = "http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=5&q=";
var newSearch;
var time = 0;
var arr = ["braveheart", "gladiator", "star wars", "anchorman", "step brothers", "talladega nights", "elf", "old school"];

$(function() {




    makeBtn();


    $("#submit").on("click", function() {

        $("#btns").append("<button class='btn'>" + ($("#input").val()));
        arr.push($("#input").val());
        console.log(newSearch, arr);


    });

    $("#btns").on("click", function() {
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
            url: newSearch,
            method: 'GET'
        }).done(function(response) {
            console.log(response);
            $("#giphy").empty();
            for (var gif in response.data) {
                var newGif = $("<img>");
                newGif.attr("src", response.data[gif].images.original.url)
                $("#giphy").append(newGif);
            }
        });
    }
});