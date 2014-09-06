define("pages/index", ["jquery", "common", "protocol", "widgets/widgets", "dialog"], function(a) {
    var b = a("jquery"),
        c = a("common"),
        d = a("protocol"),
        e = a("widgets/widgets"),
        f = a("dialog");
    window.parent != window && (window.top.location.href = location.href);
    !!(navigator.mimeTypes["application/x-shockwave-flash"] || window.ActiveXObject && new ActiveXObject("ShockwaveFlash.ShockwaveFlash"));
    b(function() {
        var a = b("#plan-status-open");
        new e.Slider, b("#openweixin").length && b("#weixin").length && new f({
            trigger: "#openweixin",
            width: "350px",
            content: b("#weixin")
        }), a.is(":visible") && b(".ui-plan-latest ").on("mouseenter", function() {
            a.find(".plan-progress").hide(), a.find("a").show()
        }).on("mouseleave", function() {
            a.find(".plan-progress").show(), a.find("a").hide()
        })
    }), b("#notice-title").length > 0 && b("#notice-title").click(function(a) {
        var c = b("#notice-content");
        c.is(":visible") ? (b(this).removeClass("dwcolor-blue-text"), c.slideUp(200)) : (b(this).addClass("dwcolor-blue-text"), c.slideDown(200)), a.preventDefault()
    }), new e.List({
        name: "loan-list",
        api: d.API.getLoans,
        header: !0,
        more: !0,
        rendered: function() {
            this.container.find(".ui-list-item.last").removeClass("last"), this.container.find(".ui-list-title").removeClass("ui-list-title-sortable"), this.container.find(".ui-list-title").children("em").remove()
        }
    }).init(c.loadJSON("#loan-list-rsp", !0)), c.initPoptips()
});