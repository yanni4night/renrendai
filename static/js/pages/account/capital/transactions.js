define("pages/account/capital/transactions", ["jquery", "common", "protocol", "widgets/widgets"], function(a) {
    var b = a("jquery"),
        c = a("common"),
        d = a("protocol"),
        e = a("widgets/widgets"),
        f = c.loadJSON("#transactions-rsp", !0),
        g = new e.List({
            name: "transactions",
            api: d.API.getUserTransactions,
            title: !0,
            pagination: !0
        }).init(f);
    b("#query-switch").click(function() {
        var a = b(this);
        "normal" == a.data("current") ? (a.text("切换到普通查询"), a.data("current", "advanced"), b("#query-normal").hide(), b("#query-advanced").show()) : (a.text("切换到高级查询"), a.data("current", "normal"), b("#query-advanced").hide(), b("#query-normal").show())
    });
    var h, i = 2010,
        j = parseInt(b("#pg-helper-year").text(), 10),
        k = parseInt(b("#pg-helper-month").text(), 10),
        l = b('select[name="year"]'),
        m = b('select[name="startMonth"], select[name="endMonth"]'),
        n = b('select[name="startMonth"]'),
        o = b('select[name="endMonth"]'),
        p = function(a) {
            return '<option value="' + a + '">' + a + "</option>"
        },
        q = function(a) {
            return parseInt(a.val(), 10)
        };
    for (h = j - 1; h >= i; h--) l.append(p(h));
    for (h = 1; k >= h; h++) m.append(p(h));
    l.change(function() {
        var a = q(l),
            b = q(n),
            c = q(o),
            d = a == j ? k : 12;
        for (m.empty(), h = 1; d >= h; h++) m.append(p(h));
        n.val(k >= b ? b : 1), o.val(k >= c ? c : 1)
    }), n.change(function() {
        var a = o.val(),
            c = q(l) == j ? k : 12;
        for (o.empty(), h = q(b(this)); c >= h; h++) o.append(p(h));
        o.val(a)
    }), o.change(function() {
        var a = n.val();
        for (n.empty(), h = 1; h <= q(b(this)); h++) n.append(p(h));
        n.val(a)
    });
    var r = function() {
            var a = {
                type: b('select[name="type"]').val()
            };
            return b("#query-normal").is(":visible") ? a.time = b('select[name="time"]').val() : (a.year = b('select[name="year"]').val(), a.startMonth = b('select[name="startMonth"]').val(), a.endMonth = b('select[name="endMonth"]').val()), a
        },
        s = f.status,
        t = b.param(r()),
        u = b("#export"),
        v = b("#export").attr("href");
    b("#export").attr("href", v + "?" + t), b("#query-submit").click(function() {
        var a = r(),
            c = b.param(a);
        (t != c || 0 !== s) && (g._params = a, g._update(a, function(a) {
            s = a, t = c, 0 === a ? (u.attr("href", v + "?" + t), u.removeClass("disabled")) : (u.removeAttr("href"), u.addClass("disabled"))
        }))
    })
});