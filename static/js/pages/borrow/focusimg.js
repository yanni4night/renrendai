define("pages/borrow/focusimg", ["jquery", "dialog"], function(a) {
    function b(a) {
        var b = d("#focusimg-bigpic img").eq(a),
            c = d("#focusimg-bigpic img").eq(a).attr("data").split("|");
        b.css("width", "900"), b.stop(!0, !0).show().siblings().stop(!0, !0).hide(), d(".J_fimg div").eq(a).addClass("focusimg-prompt").css("opacity", "1").siblings().removeClass("focusimg-prompt").css("opacity", "1"), d("#focusimg-fram .title").html(c[0] + '<span style="font-size:14px;font-weight:normal;">' + c[1] + "</span>")
    }
    var c, d = a("jquery"),
        e = a("dialog"),
        f = d(".thumfram").index(this),
        g = !0;
    d(".J_fimg div").click(function() {
        f = d(".thumfram").index(this), b(f), d("html,body").animate({
            scrollTop: 0
        }, 0)
    }), d("#focusimg-btnp").click(function() {
        f--, 0 > f && (f = c - 1), b(f), d("html,body").animate({
            scrollTop: 0
        }, 0)
    }), d("#focusimg-btnn").click(function() {
        -1 == f && (f = 0), f++, f > c - 1 && (f = 0), b(f), d("html,body").animate({
            scrollTop: 0
        }, 0)
    }), d(".card-icon").on("focus", function() {
        this.blur()
    }), new e({
        trigger: ".card-icon",
        content: ".J_focusimg-img",
        width: "920px",
        align: {
            baseXY: ["50%", 0],
            selfXY: ["50%", 0]
        },
        hasMask: !0
    }).before("show", function() {
        d("html,body").animate({
            scrollTop: 0
        }, 0), f = this.activeTrigger.attr("data"), c = d(".J_fimg div").size(), d(".ui-mask").css("background-color", "#000"), d(".ui-mask").css("opacity", "0.5"), d(".ui-mask").css("z-index", "99999"), 0 > f - 1 ? f = 0 : f -= 1, b(f), g = !0
    })
});