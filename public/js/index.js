// posting

$(".post-form").on("submit", function(e) {
    if (this.checkValidity()) {
        e.preventDefault();
    }

    var content = $(this).find(".post-form__text").val();

    jQuery.post("/api/post", {
        content: content
    }, function(data, status) {
        console.log("success", status);
    });
});

// fetch stream

jQuery.ajax("/api/get_posts").done(function(posts) {
    for (post of posts) {
        var postElem = document.createElement("chaillot-post");

        postElem.authorName = post.author;
        postElem.content = post.content;
        postElem.date = new Date(post.date).toLocaleTimeString();

        $(".stream").append(postElem);
    }
});
