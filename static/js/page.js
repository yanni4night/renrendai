define("page", ["jquery", "common"], function(a) {
    var b = a("jquery");
    b(function() {
        var c = a("common"),
            d = b("#pg-server-message");
        if (d.length > 0) {
            var e = d.data("status"),
                f = d.data("message"),
                g = {
                    message: f
                };
            "" !== e && (0 === e || "0" === e ? g.success = !0 : g.error = !0, c.showMessage(g))
        }
        var h = b("#title-detail"),
            i = b("title").html();
        h.length > 0 && b("title").html(h.html() + " -" + i), c.initPoptips()
    })
});