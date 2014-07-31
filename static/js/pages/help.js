define("pages/help", ["jquery"], function(a) {
    function b() {
        for (var a, b, c = d(".pg-help-list-box a[href*=#]"), e = 0; e < c.length; e++) b = c.eq(e).attr("href"), a = b.substring(b.lastIndexOf("#")), b == a && h.push(d(a).offset().top)
    }

    function c(a, b) {
        for (var c = 0, d = b.length; d > c; c++)
            if (a < b[c]) return 0 === c ? 1 : c
    }
    var d = a("jquery"),
        e = {
            title: d(".pg-help-list-box ul>li h5"),
            snowTop: d(".pg-help-list-box .icon-snow-top")
        };
    e.title.hover(function() {
        "none" == d(this).siblings().css("display") && d(this).parent("li").addClass("hover")
    }, function() {
        d(this).parent("li").removeClass("hover")
    }).on("click", function() {
        var a = d(this);
        a.hasClass("active") ? a.removeClass("active") : a.addClass("active"), a.siblings().toggle(), a.parent().removeClass("hover"), "none" == a.siblings().css("display") && a.parent().addClass("hover")
    }), e.snowTop.on("click", function() {
        d(this).parents(".help-list-item").hide()
    });
    var f, g = d(".pg-help-list-box a[href*=#]"),
        h = [];
    g.click(function() {
        if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname && (f = d(this.hash), f = f.length && f || d("[name=" + this.hash.slice(1) + "]"), f.length)) {
            var a = f.offset().top;
            return d("html,body").animate({
                scrollTop: a
            }, 500), f.parent().siblings().show(), !1
        }
    }), b(), d(window).scroll(function() {
        {
            var a = d(this).scrollTop();
            c(a, h)
        }
    });
    var i = window.location.hash;
    d(i).hasClass("active") || d(i).click()
});