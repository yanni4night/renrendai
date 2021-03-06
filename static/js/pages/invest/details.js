define("pages/invest/details", ["jquery", "tip", "common", "protocol", "widgets/widgets", "components/components", "dialog", "handlebars"], function(a) {
    var b = a("jquery");
    b(function() {
        {
            var c = a("tip"),
                d = a("common"),
                e = a("protocol"),
                f = a("widgets/widgets"),
                g = a("components/components");
            a("dialog"), a("handlebars")
        }
        a("handlebars");
        var h = b("#pg-helper-success-hint").html();
        if (h) {
            var i = b.parseJSON(h);
            i && d.showMessage2({
                title: "优选理财计划预定成功！",
                depositAmount: i.data.depositAmount,
                endPaymentTime: i.data.endPaymentTime,
                overplusAmount: i.data.overplusAmount,
                button: {
                    link: "/account/invest/plan.action?planTab=RESERVATIONS",
                    text: "立即支付"
                }
            })
        }
        var j, k = (f.GoTop(), "true" == b("#authenticated").text()),
            l = "true" == b("#pg-helper-is-investor").text(),
            m = b("#pg-helper-be-investor-message").html(),
            n = b("#fullTime"),
            o = b("#university");
        if (n.length) {
            var p = n.data("time"),
                q = p.match(/(\d+)天/);
            q = null !== q ? Number(q[1]) : q, n.html(q > 0 ? p.split("分")[0] + "分" : p.split("天")[1])
        }
        if (o.length) {
            var r = o.data("data");
            o.html(r.length ? r.length > 6 ? r.substring(0, 6) + "..." : r : "--")
        }
        var s = b("#counter");
        s.length > 0 && (new f.Counter({
            container: s,
            delta: parseInt(s.data("delta"), 10)
        }).init(), b("#counter").hasClass("ui-counter-seconds") || b("#counter").parent().children(".suffix").show());
        var t = parseFloat(b("#max-account").data("account"), 10);
        if (b("#pg-helper-has-withdraw-password").length > 0) {
            var u = "true" == b("#pg-helper-has-withdraw-password").text();
            l = u && l
        }
        var v, w, x, y = {
            container: b("#investment-terminal"),
            authenticated: k,
            qualified: l,
            qualifiedMessage: m,
            maxAccount: t
        };
        if (b("#pg-loan-invest").length > 0) v = parseInt(b("#max-amount").data("amount"), 10), b.extend(y, {
            page: "loan-invest",
            unit: "amount",
            template: b("#confirm-loan-template"),
            amountPerShare: 50,
            maxAmount: v,
            maxShares: v / 50
        });
        else if (b("#pg-loan-transfer").length > 0) w = parseInt(b("#max-shares").data("shares"), 10), x = parseFloat(b("#amount-per-share").data("amount-per-share"), 10), b.extend(y, {
            page: "loan-transfer",
            unit: "shares",
            template: b("#confirm-transfer-in-template"),
            amountPerShare: x,
            maxAmount: w * x,
            maxShares: w
        });
        else if (b("#pg-plan-join, #pg-plan-index").length > 0) {
            var z = b("#plan-status").text(),
                A = parseInt(b("#max-amount-1").data("amount"), 10),
                B = parseInt(b("#max-amount-2").data("amount"), 10);
            v = A > B ? B : A, x = parseInt(b("#share-amount").data("share-amount"), 10);
            var C = parseFloat(b("#fee-rate").data("fee-rate"), 10) / 100,
                D = parseFloat(b("#deposit-rate").data("deposit-rate"), 10) / 100;
            b.extend(y, {
                plan: {
                    status: z
                },
                page: "plan-join",
                unit: "amount",
                template: b("RSV" == z ? "#confirm-plan-reserve-template" : "#confirm-plan-join-template"),
                amountPerShare: x,
                maxAmount: v,
                maxShares: v / x,
                fee: C,
                deposit: D
            })
        }
        if (new g.InvestmentTerminal(y).init(), b("#plan-basic").length > 0) {
            var E = b("#plan-basic-products").data("products").split(","),
                F = {};
            if (b.each(E, function(a, c) {
                c = b.trim(c), "信用认证标" == c || "信用标" == c ? F.XYRZ = "信用认证标" : "机构担保标" == c ? F.JGDB = c : "实地认证标" == c ? F.SDRZ = c : "智能理财标" == c && (F.ZNLC = c)
            }), j = {
                products: []
            }, b.each(F, function(a, b) {
                j.products.push({
                    product: a,
                    productName: b
                })
            }), d.fillTemplate({
                container: b("#plan-basic-products"),
                template: b("#plan-basic-products-template"),
                data: j
            }), k) {
                var G = e.translator.translate(e.API.getUserBankInfo, d.loadJSON("#account-info-rsp", !0).data);
                d.fillTemplate({
                    container: b("#select-bank-accounts"),
                    template: b("#select-bank-accounts-template"),
                    data: G
                })
            }
            var H = b("#plan-begin-selling-time").data("time");
            H && b("#plan-begin-selling-time").text(H.substring(0, 19))
        }
        var I = function(a, c, d) {
            var g = new f.List({
                name: a,
                api: c,
                title: !0,
                params: d,
                container: b("#" + a + "-records"),
                rendered: function(a) {
                    var d = a.status,
                        f = a.data,
                        g = e.translator;
                    if (0 === d && c == e.API.getLoanInvestmentRecords && b("#investor-count").text(f.lenderRecords.length), 0 === d && c == e.API.getLoanLenderRecords && b("#loan-buyer-count").text(f.lenders.length), 0 === d && c == e.API.getLoanTransferRecords && (b("#loan-done-amount").text(g._commaFloat(f.account)), b("#loan-left-amount").text(g._commaFloat(f.noAccount))), 0 === d && c == e.API.getLoanCollectionRecords && 0 === f.dunInfoList.length && b("#collection-records").parent().remove(), 0 === d && c == e.API.getLoanRepaymentRecords && (b("#repayment-done-amount").text(g._commaFloat(f.repaid)), b("#repayment-left-amount").text(g._commaFloat(f.unRepaid))), 0 === d && c == e.API.getPlanJoinedRecords && b("#joined-count").text(f.jsonList.length), 0 === d && c == e.API.getPlanReserveRecords) {
                        var h = 0,
                            i = 0;
                        b.each(f.rsvList, function(a, b) {
                            "已支付" == b.status ? h += b.planAmountNotComma : i += b.planAmountNotComma
                        }), b("#reserve-had-pay-amount").html(h), b("#reserve-not-pay-amount").html(i), b("#reserve-count").text(f.rsvList.length)
                    }
                }
            }).init();
            return g._update(g.getParams()), g
        };
        if (b("#loan-details").length > 0) {
            var J = b("#pg-helper-loan-id").text();
            b.each(b(".pg-helper.large-number"), function(a, c) {
                var d = b("#" + b(c).data("name")),
                    f = b(c).text(),
                    g = d.children("em"),
                    h = d.children(".prefix"),
                    i = d.children(".suffix");
                if (f) {
                    var j = parseFloat(f, 10),
                        k = parseInt(100 * e.translator._bankersRound(j / 100), 10);
                    (k != j || j >= 1e5) && h.text("约"), k >= 1e5 ? (h.length > 0 ? (k = Math.floor(k / 1e4), g.text(k)) : g.text(e.translator._fixedFloat2(k / 1e4)), i.text("万元")) : g.text(k)
                } else g.text("0")
            }), b.each(b(".maybe-empty"), function(a, c) {
                b(c).text() || b(c).text("-")
            }), d.fillTemplate({
                container: b("#verification-container"),
                template: b("#credit-info-template"),
                data: b("#credit-info-data"),
                api: e.API.getCreditInfo,
                isResponse: !0
            }), d.fillTemplate({
                container: b("#verification-container2"),
                template: b("#credit-info-template2"),
                data: b("#credit-info-data"),
                api: e.API.getCreditInfo,
                isResponse: !0
            });
            var K, L;
            K = d.loadJSON("#comments-data", !0), L = b("#comments").length ? new f.List({
                api: e.API.getCommentsOnLoan,
                name: "comments",
                container: b("#comments"),
                template: b("#comments-template"),
                params: {
                    loanId: J
                },
                pagination: !0
            }).init(K) : new f.List({
                api: e.API.getCommentsOnLoan,
                name: "comment",
                container: b("#comments2"),
                template: b("#comments-template2"),
                params: {
                    loanId: J
                },
                pagination: !0
            }).init(K);
            var M = b("#comment-post"),
                N = b("#comment-content");
            N.focus(function() {
                b(".comment-msg").empty()
            }), M.click(function() {
                var a = N.val(),
                    c = b(this).siblings(".comment-msg");
                if (!M.hasClass("disabled")) {
                    if (!l) return void d.showMessage({
                        info: !0,
                        title: "请完善安全设置",
                        message: "在使用该功能前，请先完成<em>实名认证</em>和<em>提现密码</em>设置。",
                        button: {
                            link: "/account/info/security.action",
                            text: "去设置"
                        }
                    });
                    if (!a) return void c.text("留言内容不能为空！");
                    if (a.length > 500) return void c.text("留言字数不能超过500字！");
                    var f = {
                        id: J,
                        threadId: "0",
                        comment: a
                    };
                    M.addClass("disabled");
                    var g = b('<li><img src="/static/img/loading.gif" /> </li>');
                    b("#comments").prepend(g), e.postCommentOnLoan(f, function(a, c, e) {
                        0 === a ? (L.add(e.comment, !0, b("#comment-template")), N.val("")) : d.showMessage(c), g.remove(), M.removeClass("disabled")
                    })
                }
            });
            var O = b("#comment-post2"),
                P = b("#comment-content2");
            O.click(function() {
                var a = P.val();
                if (!O.hasClass("disabled")) {
                    if (!l) return void d.showMessage({
                        info: !0,
                        title: "请完善安全设置",
                        message: "在使用该功能前，请先完成<em>实名认证</em>和<em>提现密码</em>设置。",
                        button: {
                            link: "/account/info/security.action",
                            text: "去设置"
                        }
                    });
                    if (a) {
                        var c = {
                            id: J,
                            threadId: "0",
                            comment: a
                        };
                        M.addClass("disabled"), e.postCommentOnLoan(c, function(a, c, e) {
                            0 === a ? (L.add(e.comment, !0, b("#comment-template2")), P.val("")) : d.showMessage(c), O.removeClass("disabled")
                        })
                    }
                }
            }), b(document).on("focus", ".ui-reply-textarea", function() {
                b(".msg").empty()
            }), b(document).on("click", ".ui-comments-reply", function() {
                if (!l) return void d.showMessage({
                    info: !0,
                    title: "请完善安全设置",
                    message: "在使用该功能前，请先完成<em>实名认证</em>和<em>提现密码</em>设置。",
                    button: {
                        link: "/account/info/security.action",
                        text: "去设置"
                    }
                });
                var a = b(this).data("commentid");
                b(this).hide().siblings(".ui-comments-cancel").show(), $form = b(this).parents(".comments-message-info").find("form").show(), $form.find(".replaybt").unbind().on("click", function(c) {
                    var f = b(this),
                        g = b.trim($form.find("textarea").val());
                    if (c.preventDefault(), !g) return void f.siblings(".msg").html("回复不能为空！");
                    if (g.length > 500) return void f.siblings(".msg").html("回复字数不能超过500字！");
                    f.attr("disabled", "disabled");
                    var h = {
                            id: J,
                            threadId: a,
                            comment: g
                        },
                        i = b('<li><img src="/static/img/loading.gif" /> </li>'),
                        j = $form.parents(".comments-message-info").find("dl").prepend(i);
                    e.postCommentOnLoan(h, function(a, c, e) {
                        if (0 === a) {
                            var g = d.fillTemplate({
                                data: e.comment,
                                template: b("#replay-template")
                            });
                            j.prepend(g)
                        } else d.showMessage(c);
                        i.remove(), b(".ui-reply-textarea").val(""), f.removeAttr("disabled").siblings(".msg").empty(), $form.hide().parent().find(".ui-comments-cancel").hide().end().find(".ui-comments-reply").show()
                    })
                })
            }), b(document).on("click", ".ui-comments-cancel", function() {
                b(this).hide().siblings(".ui-comments-reply").show().parent().siblings("form").hide()
            }), new f.Tab({
                name: "loan",
                switched: function(a, b, c) {
                    return c ? !0 : ("investment" == b && I("investment", e.API.getLoanInvestmentRecords, {
                        loanId: J
                    }), "repayment" == b && (I("repayment", e.API.getLoanRepaymentRecords, {
                        loanId: J
                    }), I("collection", e.API.getLoanCollectionRecords, {
                        loanId: J
                    })), "transferred" == b && I("lender", e.API.getLoanLenderRecords, {
                        loanId: J
                    }), "transfer" == b && I("transferred", e.API.getLoanTransferRecords, {
                        loanId: J
                    }), !0)
                }
            }).init(), new f.Tab({
                name: "loan",
                switched: function(a, c, d) {
                    return d ? !0 : ("investment2" == c && I("investment2", e.API.getLoanInvestmentRecords, {
                        loanId: J
                    }), "repayment2" == c && (I("repayment2", e.API.getLoanRepaymentRecords, {
                        loanId: J
                    }), I("collection2", e.API.getLoanCollectionRecords, {
                        loanId: J
                    })), "transferred2" == c && (I("lender2", e.API.getLoanLenderRecords, {
                        loanId: J
                    }), I("transferred2", e.API.getLoanTransferRecords, {
                        loanId: J
                    }), b(".transfer-info-switch").click(function() {
                        b(this).children("span").toggle(), b(".summary-lenders, .summary-transrec").toggle(), b("#lender2-records, #transferred2-records").toggle()
                    })), !0)
                }
            }).init()
        }
        if (b("#plan-details").length > 0) {
            var Q = b("#pg-helper-plan-id").text(),
                R = null,
                S = null;
            new f.Tab({
                name: "plan",
                switched: function(a, b, c) {
                    return c ? !0 : ("reserve" == b && (R = I("reserve", e.API.getPlanReserveRecords, {
                        financePlanStr: Q
                    })), "joined" == b && (R = I("joined", e.API.getPlanJoinedRecords, {
                        financePlanStr: Q
                    })), "performance" == b && new g.PlanPerformance({
                        name: "performance",
                        planId: Q
                    }).init(), !0)
                },
                clicked: function(a, b) {
                    S || "joined" == a && b && R && R._update(R.getParams()), S = window.setTimeout(function() {
                        window.clearTimeout(S), S = null
                    }, 750)
                }
            }).init()
        }
        b("#tipCon").length && b("#tips").length && new c({
            element: "#tipCon",
            trigger: "#tips",
            direction: "right"
        }), b("#tipCon_0").length && b("#tips_0").length && new c({
            element: "#tipCon_0",
            trigger: "#tips_0",
            direction: "right"
        }), b("#tipCon_1").length && b("#tips_1").length && new c({
            element: "#tipCon_1",
            trigger: "#tips_1",
            direction: "right"
        })
    })
});