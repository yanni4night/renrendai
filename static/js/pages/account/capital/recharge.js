define("pages/account/capital/recharge", ["jquery", "dialog", "tip", "widgets/widgets", "handlebars"], function(a) {
    function b() {
        var a = i("#rechargePoundage"),
            b = i("#rechargePay"),
            c = i("#rechargeFree").is(":checked"),
            d = i.trim(i("#rechargeAmount").val()),
            e = i("#payFeeType").val(),
            f = "checkin";
        n.is.isAmount(d) && i.ajax({
            url: "/my/getCashFee.action",
            cache: !1,
            dataType: "json",
            data: {
                amount: d,
                type: f,
                payCategory: e,
                couponlog: c
            },
            timeout: 1e4,
            success: function(c) {
                {
                    var d = parseFloat(c.fe).toFixed(2),
                        e = parseFloat(c.cal).toFixed(2);
                    parseFloat(c.balance).toFixed(2)
                }
                a.html(n.comma(d)), b.html(n.comma(e))
            }
        })
    }

    function c(a, b, c) {
        var d = "";
        null !== c && (d = new Date((new Date).getTime() + 36e5 * c), d = "; expires=" + d.toGMTString()), document.cookie = a + "=" + escape(b) + d
    }

    function d(a) {
        var b = "",
            c = a + "=";
        return document.cookie.length > 0 && (offset = document.cookie.indexOf(c), -1 != offset && (offset += c.length, end = document.cookie.indexOf(";", offset), -1 == end && (end = document.cookie.length), b = unescape(document.cookie.substring(offset, end)))), b
    }

    function e(a) {
        var b = [];
        return i.each(a, function(a, c) {
            c && b.push(c)
        }), b.length > 4 && (b.length = 4), b
    }

    function f(a, b) {
        var c = i("#rechargeBank-list-template").html(),
            d = m.compile(c),
            e = d(b);
        a.html(e)
    }

    function g(a, b) {
        var c = {};
        c.rows = [], c.updateCode = [];
        for (var d = 0; d < b.length; d++)
            for (var e in a)
                if (b[d] == a[e].code) {
                    a[e].bankInfoId = "recent" + d, c.rows.push(a[e]), c.updateCode.push(a[e].code), delete a[e];
                    break
                }
        return c
    }

    function h(a, b) {
        var c = i("<a>查看更多充值方式</a>").data("state", "open").bind("click", function() {
            "close" == i(this).data("state") ? (b.hide(), i(this).data("state", "open").html("查看更多充值方式")) : (b.show(), i(this).data("state", "close").html("收起"))
        });
        i('<p class="foldbox"></p>').append(c).insertAfter(a)
    }
    var i = a("jquery"),
        j = a("dialog"),
        k = a("tip"),
        l = a("widgets/widgets"),
        m = a("handlebars"),
        n = l.Form;
    i(function() {
        var a = i("#bankList").find("dl").eq(0).hide(),
            l = i("#bankList").find("dl").eq(1).hide(),
            m = i("#bankList").find("dl").eq(2).hide(),
            o = ["最近使用的充值方式", "充值银行", "充值渠道"],
            p = e(d("cd").split(",")),
            q = i("#rechargeBank-list-rsp").html();
        q = i.parseJSON(q), q.data.title = o[1], f(l, q.data);
        var r = [{
                fullName: "快钱",
                payChannelStr: "QUICKPAY",
                code: "QUICKPAY",
                bankInfoId: "q1",
                logo: "/static/img/bank/checkin_kq.jpg"
            }, {
                fullName: "财付通",
                payChannelStr: "TENPAY",
                code: "TENPAY",
                bankInfoId: "q4",
                logo: "/static/img/bank/tenpay.jpg"
            }, {
                fullName: "易宝",
                payChannelStr: "YEEPAY",
                code: "YEEPAY",
                bankInfoId: "q3",
                logo: "/static/img/bank/yeepay.jpg"
            }, {
                fullName: "汇付天下",
                payChannelStr: "CHINAPNR",
                code: "CHINAPNR",
                bankInfoId: "q2",
                logo: "/static/img/bank/chinapnr.jpg"
            }],
            s = {
                rows: r,
                title: o[2]
            };
        f(m, s);
        var t = i.merge(q.data.rows, r),
            u = g(t, p);
        u.title = o[0], u.rows.length ? (f(a, u), a.show(), h(m, l.add(m))) : l.add(m).show();
        var v, w = i("#bankId"),
            x = i("#paytype");
        i("#bankList").on("click", "input[type='radio']", function() {
            var a = i(this).data("type");
            x.val(a), w.val(this.value), v = this.value, i("#bankList dd").removeClass("current"), i(this).parent().addClass("current")
        });
        var y = n.validate();
        i("#rechargeAmount").keyup(function() {
            b()
        }).blur(function() {
            b()
        }), i("#rechargeFree").click(function() {
            b()
        }), i("#sub-recharge").click(function(a) {
            return i("form").submit(), y.valid() ? (new j({
                width: "500px",
                hasMask: {
                    hideOnClick: !0
                },
                content: i("#afterSub")
            }).show(), -1 === i.inArray(v, u.updateCode) && (p = i.merge([v], u.updateCode)), c("cd", e(p).toString(), 8640), void a.preventDefault()) : !1
        }), i("#finishRecharge").click(function() {
            location.reload()
        }), i("#troubleRecharge").click(function() {
            location.reload()
        }), new k({
            element: "#tipCon",
            trigger: "#tips",
            direction: "right"
        }), i("#tips2").length && new k({
            element: "#tipCon2",
            trigger: "#tips2",
            direction: "right"
        })
    })
});