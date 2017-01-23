// posting

$(".post-form").on("submit", function(e) {
    var content = $(this).find(".post-form__text").val();

    jQuery.post("/api/post", {
        content: content
    }, function(data, status) {
        console.log("success", status);
        fetchStream();
    });

    $(this).find(".post-form__text").val("");
});

// fetch stream

function fetchStream() {
    $(".stream").html("");
    jQuery.ajax("/api/get_posts").done(function(posts) {
        for (post of posts.reverse()) {
            var postElem = document.createElement("chaillot-post");

            postElem.authorName = post.author;
            postElem.content = post.content;
            postElem.date = moment(post.date).calendar();

            $(".stream").append(postElem);
        }
    });
}

fetchStream();
