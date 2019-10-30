$(document).ready(function() {
    var topics = ["call of duty", "Apex legends", "counter strike", "team fortress", "resident evil", "fortnite", "metal gear solid", "need for speed", "witcher", "grand theft auto", "skyrim", "tetris", "company of heroes"];
    var search = "";

    function searchSet(arg) {
        search = arg.replace(/\s+/g, '+');
        console.log(arg);

        $.ajax({
            url: "https://api.giphy.com/v1/gifs/search?api_key=nyXPKoGeNFnVVJ5lZmlD4N63i6LN8sUb&q=" + search,
            method: "GET"
        }).then(function(response) {
            renderImages(response);
        })

    }

    function renderImages(response) {
        var newTopic = $("#imageHolder");
        newTopic.html("");
        console.log(response);
        for (var i = 0; i < 10; i++) {
            var rating = $("<span>");
            rating.attr("id", "rating" + i);
            rating.addClass("rating");
            rating.text("Rating " + response.data[i].rating);
            newTopic.append(rating);
            var newImage = $("<img>").attr("id", "image" + i);
            newImage.attr("animated", response.data[i].images.fixed_height.url);
            newImage.attr("still", response.data[i].images.fixed_height_still.url);
            newImage.attr("activeStatus", "false");
            newImage.attr("src", response.data[i].images.fixed_height_still.url)
            newImage.addClass("imagesButton");

            $("#rating" + i).append("<br>");
            $("#rating" + i).append(newImage);
        }
        $(".imagesButton").on("click", function(event) {
            var animated = $(this).attr("animated");
            var still = $(this).attr("still");
            var status = $(this).attr("activeStatus");
            console.log(status);
            if (status === "false") {
                console.log($(this).attr("src"));

                $(this).attr("src", animated);

                console.log($(this).attr("src"));

                $(this).attr("activeStatus", "true");
            } else {
                $(this).attr("src", still);
                $(this).attr("activeStatus", "false");

            }
        })

    };

    function renderButton() {
        $("#topicTags").html("");
        for (var i = 0; i < topics.length; i++) {
            var newTopic = $("#topicTags");
            var newSpan = $("<span>").attr("id", "topic" + i);
            newTopic.append(newSpan);
            newSpan.attr("data-name", topics[i]);
            newSpan.addClass("button");
            newSpan.text(topics[i]);
        }



        $(".button").on("click", function(event) {
            dataSearchName = $(this).attr("data-name");
            searchSet(dataSearchName);
        });
    }
    $("#search").on("click", function(event) {
        event.preventDefault();
        var userInput = $("#searchInput").val().trim().toLowerCase();
        topics.push(userInput);
        $("#searchInput").val("");
        renderButton();
    })

    renderButton();






});