define("pages/account/invest/statistics", ["jquery", "protocol", "highcharts"], function(a) {
    var b = a("jquery"),
        c = a("protocol");
    a("highcharts");
    var d = c.translator,
        e = ["#3488ad", "#1bb8e2", "#aabc64", "#ffc400", "#f78800", "#e52012", "#f01f5a"],
        f = function(a) {
            return e[a % 7]
        },
        g = function(a) {
            return parseFloat(d._bankersRound(a))
        },
        h = null,
        i = null;
    i = function(a, c) {
        var d = {};
        return a.find('[data-name="' + c + '"]').each(function(a, e) {
            var f = b(e);
            if ("yes" == f.data("deep")) d[f.data(c)] = i(f, f.data("value"));
            else {
                var g = f.data("value");
                "string" == typeof g && (g = parseFloat(g, 10)), d[f.data(c)] = g
            }
        }), d
    };
    var j = [],
        k = [];
    h = i(b("#gained-data"), "category"), b.each(h, function(a, b) {
        j.push(a), k.push(g(b))
    }), b("#gained-chart").highcharts({
        chart: {
            type: "column"
        },
        title: {
            text: "理财账户收益金额组成"
        },
        legend: !1,
        xAxis: {
            categories: j
        },
        yAxis: {
            title: !1
        },
        series: [{
            name: "收益",
            data: k,
            color: f(0)
        }],
        credits: {
            enabled: !1
        }
    });
    var l, m, n;
    l = [], m = [], n = 0, h = i(b("#total-invest-data"), "category"), b.each(h, function(a, c) {
        if ("number" == typeof c) 0 !== c && (l.push({
            name: a,
            y: g(c),
            color: f(n)
        }), m.push({
            name: a,
            y: g(c),
            color: f(n)
        }), n += 1);
        else {
            var d = 0;
            b.each(c, function(a, b) {
                0 !== b && (m.push({
                    name: a,
                    y: g(b),
                    color: f(n)
                }), d += b)
            }), 0 !== d && (l.push({
                name: a,
                y: g(d),
                color: f(n)
            }), n += 1)
        }
    }), 0 === n ? b("#total-invest-chart").addClass("empty").text(b("#total-invest-chart").data("empty")) : b("#total-invest-chart").highcharts({
        chart: {
            type: "pie"
        },
        title: {
            text: "累计投资金额分类占比"
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
        series: [{
            name: "投资额",
            data: l,
            size: "60%",
            dataLabels: {
                enabled: !1
            }
        }, {
            name: "投资额",
            data: m,
            size: "80%",
            innerSize: "60%"
        }],
        credits: {
            enabled: !1
        }
    }), l = [], m = [], n = 0, h = i(b("#current-invest-data"), "category"), b.each(h, function(a, c) {
        if ("number" == typeof c) 0 !== c && (l.push({
            name: a,
            y: g(c),
            color: f(n)
        }), m.push({
            name: a,
            y: g(c),
            color: f(n)
        }), n += 1);
        else {
            var d = 0;
            b.each(c, function(a, b) {
                0 !== b && (m.push({
                    name: a,
                    y: g(b),
                    color: f(n)
                }), d += b)
            }), 0 !== d && (l.push({
                name: a,
                y: g(d),
                color: f(n)
            }), n += 1)
        }
    }), 0 === n ? b("#current-invest-chart").addClass("empty").text(b("#current-invest-chart").data("empty")) : b("#current-invest-chart").highcharts({
        chart: {
            type: "pie"
        },
        title: {
            text: "理财账户资产分类占比"
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
        series: [{
            name: "投资额",
            data: l,
            size: "60%",
            dataLabels: {
                enabled: !1
            }
        }, {
            name: "投资额",
            data: m,
            size: "80%",
            innerSize: "60%"
        }],
        credits: {
            enabled: !1
        }
    }), l = [], m = [], n = 0, h = i(b("#to-gain-data"), "category"), b.each(h, function(a, b) {
        0 !== b && (l.push({
            name: a,
            y: g(b),
            color: f(n)
        }), n += 1)
    }), 0 === n ? b("#to-gain-chart").addClass("empty").text(b("#to-gain-chart").data("empty")) : b("#to-gain-chart").highcharts({
        chart: {
            type: "pie"
        },
        title: {
            text: "债权待收收益分类占比"
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
        series: [{
            name: "金额",
            data: l
        }],
        credits: {
            enabled: !1
        }
    })
});