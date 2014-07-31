define("pages/account/index", ["jquery", "common", "protocol", "widgets/widgets", "mask", "tip"], function(a) {
    function b() {
        $guide = c("#novice-guide"), $ad = c(".ad-dimgray"), $guide.length && ($ad.length && $ad.hide(), $guide.find(".close,.goto").on("click", function() {
            $guide.hide(), g.hide()
        }).end().find(".next").on("click", function() {
            var a = $guide.data("type").toLowerCase(),
                b = $guide.css("backgroundImage"),
                d = b.match(/(account-step-)(\d)/),
                e = parseInt(d[2], 10);
            e++, e >= 3 && (c(this).remove(), c(".goto").show(), $ad.show()), $guide.css("借出者" == a ? {
                background: "url(/static/img/guide/" + d[1] + e + "-lender.png)"
            } : {
                background: "url(/static/img/guide/" + d[1] + e + "-borrower.png)"
            })
        }), g.set("backgroundColor", "#000").set("zIndex", 100001).set("opacity", "0.6").show())
    }
    var c = a("jquery"),
        d = a("common"),
        e = a("protocol"),
        f = a("widgets/widgets"),
        g = a("mask"),
        h = a("tip"),
        i = 0;
    b(), c("#info-box .icons a").each(function() {
        var a = /light/.test(this.className);
        a && (i += 25)
    }), c("#safe-progressbar").attr("title", i + "%").find("div").css("width", i + "px");
    for (var j = d.loadJSON(c("#borrowing-rsp"), !0), k = j.data.loans, l = e.translator, m = 0; m < k.length; m++) k[m].notPayPrincipal = l._commaFloat(k[m].notPayPrincipal), k[m].notPayInterestAndMgmtFee = l._commaFloat(k[m].notPayInterestAndMgmtFee), k[m].overdueAmount = l._commaFloat(k[m].overdueAmount);
    d.fillTemplate({
        container: c("#borrowing"),
        data: j,
        template: c("#borrowing-template"),
        isResponse: !0
    }), new f.List({
        name: "loan-list",
        api: e.API.getLoans,
        header: !0
    }).init(d.loadJSON("#loan-list-rsp", !0)), new h({
        element: "#tipCon_1",
        trigger: "#tips_1",
        direction: "right"
    }), new h({
        element: "#tipCon_2",
        trigger: "#tips_2",
        direction: "right"
    });
    var n = !1;
    c(".icon-box").each(function(a) {
        if (!c(this).hasClass("light")) {
            if (n) return;
            var b = c(this).find("a"),
                d = b.data("txt").split("||"),
                e = b.attr("href"),
                f = 140 + 40 * a;
            c("#tipCon_3").css({
                position: "absolute",
                left: f + "px",
                top: "60px"
            }).find(".ui-poptip-content").html("<div>" + d[0] + "<a href='" + e + "'>" + d[1] + "</a><i class='iconfont closeTip' style='position: absolute;right:-1px;top:-1px;cursor: pointer;color:#d9c6a4; font-size:16px;padding: 0 2px; height: 16px;line-height: 16px;'>&#xF045;</i></div>").end().show(), n = !0
        }
    }), c(".closeTip").on("click", function() {
        c(this).parents(".ui-poptip").hide()
    })
});