define("pages/account/borrow/statistics", ["jquery", "common", "protocol", "highcharts"], function(a) {
    var b = a("jquery"),
        c = a("common"),
        d = a("protocol");
    a("highcharts");
    var e = d.translator,
        f = ["#3488ad", "#1bb8e2", "#aabc64", "#ffc400", "#f78800", "#e52012", "#f01f5a"],
        g = function(a) {
            return f[a % 7]
        },
        h = function(a) {
            return parseFloat(e._bankersRound(a))
        },
        i = c.loadJSON("#stat-rsp", !0),
        j = i.data.loanAmountMap,
        k = {
            stats: []
        },
        l = 0;
    b.each(j, function(a, b) {
        var c = {};
        "total" == a ? a = "总计" : c.data = !0, c.label = a, c.value = e._fixedFloat2(b), c.formattedValue = e._commaFloat(b), l += 1, c.style = l % 2 == 1 ? "rrdcolor-paleblue3-bg" : "rrdcolor-paleblue2-bg", k.stats.push(c)
    }), c.fillTemplate({
        container: b("#succeeded-data"),
        template: b("#stat-template"),
        data: k
    });
    var m = i.data.repayAmountMap,
        n = {
            stats: []
        };
    l = 0, b.each(m, function(a, b) {
        var c = {};
        "total" == a ? a = "总计" : (a = a.replace("-", "年") + "月", c.data = !0), c.label = a, c.value = e._fixedFloat2(b), c.formattedValue = e._commaFloat(b), l += 1, c.style = l % 2 == 1 ? "rrdcolor-paleblue3-bg" : "rrdcolor-paleblue2-bg", n.stats.push(c)
    }), c.fillTemplate({
        container: b("#half-year-data"),
        template: b("#stat-template"),
        data: n
    });
    var o = function(a) {
            var c = [],
                d = 0,
                e = b("#" + a + "-data");
            e.find('[data-name="category"]').each(function(a, e) {
                var f = b(e),
                    i = f.data("category"),
                    j = f.data("value");
                "string" == typeof j && (j = parseFloat(j, 10)), 0 !== j && c.push({
                    name: i,
                    y: h(j),
                    color: g(d)
                }), d += 1
            });
            var f = b("#" + a + "-chart");
            0 === c.length ? f.addClass("empty").text(f.data("empty")) : f.highcharts({
                chart: {
                    type: "pie"
                },
                title: {
                    text: f.data("title")
                },
                legend: !1,
                plotOptions: {
                    pie: {
                        shadow: !1,
                        center: ["50%", "50%"]
                    }
                },
                tooltip: {
                    valueSuffix: "元"
                },
                credits: {
                    enabled: !1
                },
                series: [{
                    name: "金额",
                    data: c
                }]
            })
        },
        p = function(a) {
            var c = [],
                d = [],
                e = b("#" + a + "-data");
            e.find('[data-name="category"]').each(function(a, e) {
                c.push(b(e).data("category")), d.push(parseFloat(b(e).data("value"), 10))
            });
            var f = b("#" + a + "-chart");
            f.highcharts({
                chart: {
                    type: "column"
                },
                title: {
                    text: f.data("title")
                },
                legend: !1,
                xAxis: {
                    categories: c
                },
                yAxis: {
                    title: !1
                },
                credits: {
                    enabled: !1
                },
                series: [{
                    name: "金额",
                    data: d,
                    color: g(0)
                }]
            })
        };
    o("overall"), o("to-repay"), o("repaid"), p("succeeded"), p("half-year")
});