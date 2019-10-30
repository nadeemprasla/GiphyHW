$(document).ready(function() {
    var topics = ["call of duty", "Apex legends", "counter strike", "team fortress"];
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
        for (var i = 0; i < 11; i++) {
            var newSpan = $("<img>").attr("id", "image" + i);
            newSpan.attr("animated", response.data[i].images.fixed_height.url);
            newSpan.attr("still", response.data[i].images.fixed_height_still.url);
            newSpan.attr("src", response.data[i].images.fixed_height_still.url)
            newTopic.append(newSpan);
            newSpan.addClass("imagesButton");

        }
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


        $("#search").on("click", function(event) {
            event.preventDefault();
            var userInput = $("#searchInput").val().trim().toLowerCase();
            topics.push(userInput);
            $("#searchInput").val("");
            renderButton();
        })
        $(".button").on("click", function(event) {
            dataSearchName = $(this).attr("data-name");
            searchSet(dataSearchName);
        });
    }

    renderButton();






});