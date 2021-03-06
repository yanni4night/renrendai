define("pages/about", ["jquery", "common", "protocol", "widgets/widgets"], function(a) {
    function b(a) {
        new f.List({
            name: a.name,
            api: a.api,
            pagination: !0
        }).init(d.loadJSON("#" + a.name + "-rsp"))
    }
    var c = a("jquery"),
        d = a("common"),
        e = a("protocol"),
        f = a("widgets/widgets"),
        g = {};
    if (c("#news-list").length > 0) c.extend(g, {
        name: "news-list",
        api: e.API.getNews
    }), b(g);
    else if (c("#notices-list").length > 0) c.extend(g, {
        name: "notices-list",
        api: e.API.getNotices
    }), b(g);
    else {
        var h = c("#pg-helper-notice-type").text();
        c(".detail").length > 0 && ("NOTICE" == h ? jQuery(".sub li:eq(8)").addClass("active") : jQuery(".sub li:eq(7)").addClass("active"))
    }
    c(".about-list>li h5").hover(function() {
        "none" == c(this).siblings(".about-list-item").css("display") && c(this).parent().addClass("hover")
    }, function() {
        c(this).parent().removeClass("hover")
    }).on("click", function() {
        c(this).siblings(".about-list-item").toggle(), c(this).parent().removeClass("hover"), "none" == c(this).siblings(".about-list-item").css("display") && c(this).parent().addClass("hover")
    }), c(".about-list .icon-snow-top").on("click", function() {
        c(this).parents(".about-list-item").hide()
    })
});