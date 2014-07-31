define("components/calculator", ["jquery", "protocol"], function(a, b, c) {
    var d = a("jquery"),
        e = a("protocol"),
        f = function(a) {
            return a && d.isPlainObject(a) ? new f.calculator(a) : void 0
        };
    f.calculator = function(a) {
        this.type = a.type, this.borrowAmount = a.borrowAmount, this.repayDate = a.repayDate, this.yearRate = a.yearRate, this.mounthRate = a.yearRate / 12, this.repayType = a.repayType, this.isShowTable = a.isShowTable, this.mgmtAmount = a.mgmtAmount, this.model = 50, this.isShowTable || (this.isShowTable = !1), this.init()
    }, f.comma = function(a, b) {
        var c = a;
        return (!b || 1 > b) && (b = 3), c = String(c).split("."), c[0] = c[0].replace(new RegExp("(\\d)(?=(\\d{" + b + "})+$)", "ig"), "$1,"), c.join(".")
    }, f.arrToObj = function(a) {
        for (var b = {}, c = 0, d = a.length; d > c; c++) b[a[c].name] = a[c].value;
        return b
    }, f.format = function(a) {
        return e.translator._bankersRound(a)
    }, f.add = function(a, b) {
        var c, d, e;
        try {
            c = a.toString().split(".")[1].length
        } catch (f) {
            c = 0
        }
        try {
            d = b.toString().split(".")[1].length
        } catch (f) {
            d = 0
        }
        return e = Math.pow(10, Math.max(c, d)), (a * e + b * e) / e
    }, f.sub = function(a, b) {
        var c, d, e;
        try {
            c = a.toString().split(".")[1].length
        } catch (f) {
            c = 0
        }
        try {
            d = b.toString().split(".")[1].length
        } catch (f) {
            d = 0
        }
        return e = Math.pow(10, Math.max(c, d)), (a * e - b * e) / e
    }, f.mul = function(a, b) {
        var c = 0,
            d = a.toString(),
            e = b.toString();
        try {
            c += d.split(".")[1].length
        } catch (f) {}
        try {
            c += e.split(".")[1].length
        } catch (f) {}
        return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c)
    }, f.div = function(a, b) {
        var c, d, e = 0,
            f = 0;
        try {
            e = a.toString().split(".")[1].length
        } catch (g) {}
        try {
            f = b.toString().split(".")[1].length
        } catch (g) {}
        return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), c / d * Math.pow(10, f - e)
    }, Number.prototype.sub = function(a) {
        return f.sub(this, a)
    }, Number.prototype.add = function(a) {
        return f.add(this, a)
    }, Number.prototype.mul = function(a) {
        return f.mul(this, a)
    }, Number.prototype.div = function(a) {
        return f.div(this, a)
    }, f.equalRepay = function(a, b, c, d, e, g, h) {
        var i = {},
            j = a.mul(c).mul(Math.pow(f.add(1, c), b)),
            k = f.sub(Math.pow(f.add(1, c), b), 1),
            l = f.format(a.mul(d / 100));
        i.monthlyRepay = f.format(j.div(k)), i.mounthRate = c.mul(100), i.repayDate = b, i.total = 0, i.totaladdglf = 0, i.table = {};
        for (var m = 1; b >= m; m++) i.table["row" + m] = {}, i.table["row" + m].mounth = m, i.table["row" + m].mgmtfee = l, i.table["row" + m].qichu = 1 == m ? a : i.table["row" + (m - 1)].qimo, i.table["row" + m].mbenxi = b > m ? i.monthlyRepay : f.format(f.mul(i.table["row" + m].qichu, f.add(1, c))), i.total += parseFloat(i.table["row" + m].mbenxi), i.table["row" + m].mlixi = f.format(i.table["row" + m].qichu.mul(i.mounthRate).mul(.01)), i.table["row" + m].mbenjin = f.sub(i.table["row" + m].mbenxi, i.table["row" + m].mlixi), i.table["row" + m].qimo = f.sub(i.table["row" + m].qichu, i.table["row" + m].mbenjin), i.table["row" + m].itemStyle = m % 2 === 0 ? "color-time-tr1" : "color-time-tr2";
        i.total = i.total.toFixed(2);
        for (var n = i.total, o = 1; b >= o; o++) i.table["row" + o].shengyu = (n - i.table["row" + o].mbenxi).toFixed(2), n = i.table["row" + o].shengyu;
        i.monthlyRepay = f.mul(i.monthlyRepay, g), i.total = f.mul(i.total, g), i.total = i.total.toFixed(2), i.isShowTable = e;
        for (var p = 1; b >= p; p++) i.table["row" + p].qichu = f.mul(i.table["row" + p].qichu, g), i.table["row" + p].mbenxi = f.mul(i.table["row" + p].mbenxi, g), i.table["row" + p].mlixi = f.mul(i.table["row" + p].mlixi, g), i.table["row" + p].mbenjin = f.mul(i.table["row" + p].mbenjin, g), i.table["row" + p].qimo = f.mul(i.table["row" + p].qimo, g), i.table["row" + p].shengyu = f.mul(i.table["row" + p].shengyu, g), i.table["row" + p].mgmtfee = f.mul(i.table["row" + p].mgmtfee, g), i.table["row" + p].yuehuankuane = f.add(i.table["row" + p].mbenxi, i.table["row" + p].mgmtfee), i.table["row" + p].qichu = i.table["row" + p].qichu.toFixed(2), i.table["row" + p].mbenxi = i.table["row" + p].mbenxi.toFixed(2), i.table["row" + p].mlixi = i.table["row" + p].mlixi.toFixed(2), i.table["row" + p].mbenjin = i.table["row" + p].mbenjin.toFixed(2), i.table["row" + p].qimo = i.table["row" + p].qimo.toFixed(2), i.table["row" + p].shengyu = i.table["row" + p].shengyu.toFixed(2), i.table["row" + p].yuehuankuane = i.table["row" + p].yuehuankuane.toFixed(2), 1 == p ? (i.table["row" + p].shengyubenjin = h - i.table["row" + p].mbenjin, i.table["row" + p].shengyubenjin = i.table["row" + p].shengyubenjin.toFixed(2)) : (i.table["row" + p].shengyubenjin = i.table["row" + (p - 1)].shengyubenjin - i.table["row" + p].mbenjin, i.table["row" + p].shengyubenjin = i.table["row" + p].shengyubenjin.toFixed(2)), i.totaladdglf += parseFloat(i.table["row" + p].yuehuankuane), i.table["row" + p].mgmtfee = i.table["row" + p].mgmtfee.toFixed(2), i.table["row" + p].itemStyle = p % 2 === 0 ? "color-time-tr1" : "color-time-tr2";
        return i.totaladdglf = i.totaladdglf.toFixed(2), i
    }, f.mouthRepay = function(a, b, c, d, e) {
        var g = f.format(a * d / 100),
            h = {};
        h.mounthRate = f.format(c.mul(100)), h.repayDate = b, h.monthlyRepay = f.format(a * c), h.table = {}, h.total = 0, h.isShowTable = e;
        for (var i = 1; b >= i; i++) h.table["row" + i] = {}, h.table["row" + i].mounth = i, h.table["row" + i].mgmtfee = g, b > i ? (h.table["row" + i].mbenxi = h.monthlyRepay, h.table["row" + i].mbenjin = 0..toFixed(2)) : (h.table["row" + i].mbenxi = parseInt(a, 10) + parseFloat(h.monthlyRepay), h.table["row" + i].mbenjin = parseInt(a, 10).toFixed(2)), h.total += parseFloat(h.table["row" + i].mbenxi), h.table["row" + i].mlixi = h.monthlyRepay, h.table["row" + i].itemStyle = i % 2 === 0 ? "color-time-tr1" : "color-time-tr2";
        h.total = h.total.toFixed(2);
        for (var j = h.total, k = 1; b >= k; k++) h.table["row" + k].shengyu = (j - h.table["row" + k].mbenxi).toFixed(2), j = h.table["row" + k].shengyu;
        return h
    }, f.calculator.prototype = {
        init: function() {},
        reset: function() {},
        calc: function() {
            this.reset();
            var a = this.model,
                b = this.borrowAmount,
                c = this.repayDate,
                d = .01 * this.mounthRate,
                e = this.isShowTable,
                g = this.mgmtAmount,
                h = this.borrowAmount / this.model;
            return "DEBX" == this.repayType ? f.equalRepay(a, c, d, g, e, h, b) : "FXHB" == this.repayType ? f.mouthRepay(b, c, d, g, e) : void 0
        }
    }, c.exports = f
}), define("components/components", ["components/header", "components/footer", "components/sidebar", "components/calculator", "components/latest-financial-plan", "components/plan-performance", "components/plan-quit-handler", "components/list-factory", "components/investment-terminal", "components/transfer-confirmation"], function(a, b, c) {
    var d = {};
    d.Header = a("components/header"), d.Footer = a("components/footer"), d.Sidebar = a("components/sidebar"), d.Calculator = a("components/calculator"), d.LatestPlan = a("components/latest-financial-plan"), d.PlanPerformance = a("components/plan-performance"), d.PlanQuitHandler = a("components/plan-quit-handler"), d.ListFactory = a("components/list-factory"), d.InvestmentTerminal = a("components/investment-terminal"), d.TransferConfirmation = a("components/transfer-confirmation"), c.exports = d
}), define("components/footer", ["jquery", "dialog"], function(a, b, c) {
    var d = a("jquery"),
        e = a("dialog"),
        f = function() {};
    d.extend(f.prototype, {
        init: function() {
            d(".we-chat").length && d("#weixin-content").length && new e({
                trigger: ".we-chat",
                width: "350px",
                content: d("#weixin-content")
            })
        }
    }), c.exports = f
}), define("components/header", ["jquery", "protocol"], function(a, b, c) {
    var d = a("jquery"),
        e = a("protocol"),
        f = function() {};
    d.extend(f.prototype, {
        init: function() {
            var a = "true" == d.trim(d("#header-helper-authenticated").text());
            if (a) {
                var b = d("#header-msgcount");
                e.getUnreadMsgCount(null, function(a, c, d) {
                    var e = d.count;
                    b.text(e), 0 === e ? b.addClass("ui-nav-msgcount-nomsg") : b.removeClass("ui-nav-msgcount-nomsg")
                })
            }
            d("#header .ui-nav-item-x").hover(function() {
                d(this).children(".ui-nav-dropdown").show()
            }, function() {
                d(this).children(".ui-nav-dropdown").hide()
            })
        }
    }), c.exports = f
}), define("components/investment-terminal", ["jquery", "dialog", "common", "protocol", "widgets/widgets"], function(a, b, c) {
    var d = a("jquery"),
        e = a("dialog"),
        f = a("common"),
        g = a("protocol"),
        h = a("widgets/widgets"),
        i = h.Form,
        j = function(a) {
            d.extend(this, {
                container: a.container,
                template: a.template,
                page: a.page || "loan-invest",
                unit: a.unit || "amount",
                qualified: a.qualified,
                qualifiedMessage: a.qualifiedMessage,
                authenticated: a.authenticated,
                amountPerShare: a.amountPerShare || 50,
                fee: a.fee || 0,
                deposit: a.deposit || 0,
                plan: a.plan || {},
                max: {
                    amount: a.maxAmount,
                    shares: a.maxShares,
                    account: a.maxAccount
                }
            }), this.ui = {
                input: this.container.find(".ui-term-input"),
                placeholder: this.container.find(".ui-term-placeholder"),
                error: this.container.find(".ui-term-error"),
                hint: this.container.find(".ui-term-hint"),
                eq: this.container.find(".ui-term-eq"),
                pseudoForm: this.container.find(".ui-term-form"),
                submitForm: this.container.find(".ui-term-form-real"),
                deposit: this.container.find("#deposit"),
                fee: this.container.find("#fee"),
                gainChoices: this.container.find(".ui-term-gain"),
                bankAccount: this.container.find(".ui-term-bank-account")
            }, this.maxdepositamount = parseInt(this.ui.pseudoForm.data("maxdepositamount"), 10), this.ui.pseudoForm.find("button").removeAttr("disabled").removeClass("ui-button-gray");
            var b = this;
            d.each(this.max, function(a, c) {
                c instanceof d && c.length > 0 && (b.max[a] = parseFloat(c.data(a), 10))
            });
            var c = "amount" == this.unit ? this.max.amount + "元" : this.max.shares + "份",
                e = g.translator;
            this.errors = {
                NONE: "",
                EXCEEDED_MAX: "您最多只能购买" + c,
                OVER_BALANCE: "账户余额不足",
                NOT_INT: "请输入整数" + ("amount" == this.unit ? "金额" : "份额"),
                NOT_INT_SHARE: "输入金额需为" + e._commaInteger(this.amountPerShare) + "元的整数倍",
                NO_INPUT: "请输入有效" + ("amount" == this.unit ? "金额" : "份额")
            }
        };
    d.extend(j.prototype, {
        init: function(a, b) {
            var c = this.ui;
            "disabled" == c.input.attr("disabled") ? this.inputUpdated() : this.initInput(a), this.initPseudoForm(b), this.initGainChoices(), c.placeholder.click(function() {
                c.input.focus()
            })
        },
        initInput: function(a) {
            var b = this,
                c = this.ui;
            c.input.focusin(function() {
                c.placeholder.is(":visible") && c.placeholder.hide()
            }).focusout(function() {
                "" === c.input.val() && c.placeholder.show()
            }).keyup(function() {
                b.inputUpdated()
            }), a ? (c.input.focusin(), c.input.val(a[b.unit]), c.input.keyup()) : (c.input.val(""), c.eq.text(""))
        },
        inputUpdated: function() {
            var a = this,
                b = this.ui,
                c = b.input.val(),
                d = b.pseudoForm.find('button[type="submit"]');
            if (c.length > 10 && (c = c.substring(0, 10)), c = parseInt(c, 10), isNaN(c)) return b.input.removeClass("invalid"), d.removeClass("disabled"), b.input.val(""), b.eq.text(""), void a.toggleErrorMessage(null);
            b.input.val(c);
            var e = a.check(c);
            if (e === a.errors.NONE)
                if (a.toggleErrorMessage(null), b.input.removeClass("invalid"), "" !== c) {
                    var f;
                    "amount" == a.unit ? (f = parseInt(c / a.amountPerShare, 10), b.eq.text(f + "份")) : (f = Math.round(c * a.amountPerShare * 100) / 100, b.eq.text(f + "元")), d.removeClass("disabled")
                } else d.addClass("disabled"), b.eq.text("");
            else a.toggleErrorMessage(e), d.addClass("disabled"), b.input.addClass("invalid"), b.eq.text(""); if (e !== a.errors.NONE && e !== a.errors.OVER_BALANCE || "" === c) b.deposit.text("0"), b.fee.text("0");
            else {
                var g = parseInt(a.deposit * c, 10);
                g = g >= this.maxdepositamount ? this.maxdepositamount : g, b.deposit.text(g), b.fee.text(parseInt(a.fee * c, 10))
            }
        },
        initPseudoForm: function(a) {
            var b = this,
                c = this.ui;
            c.pseudoForm.submit(function() {
                if (c.pseudoForm.find('button[type="submit"]').hasClass("disabled")) return !1;
                if (!c.input.val() || 0 === parseInt(c.input.val(), 10)) return c.hint.hide(), c.error.text(b.errors.NO_INPUT).show(), !1;
                if (b.check(c.input.val()) == b.errors.NONE)
                    if (b.authenticated)
                        if (b.qualified) {
                            var a = f.fillTemplate({
                                template: b.template,
                                data: b.getData()
                            });
                            new e({
                                content: a,
                                width: "580"
                            }).after("show", function() {
                                var a = this;
                                d(".ui-confirm-cancel-link").click(function() {
                                    a.hide()
                                }), b.renderConfirmation(), i.ui.init(), d("#reserveForm").length && (d("#closeRsvDialog").click(function() {
                                    d(".ui-dialog-close").trigger("click")
                                }), i.validate({
                                    target: "#reserveForm"
                                }))
                            }).after("hide", function() {
                                this.destroy()
                            }).show()
                        } else f.showMessage({
                            error: !0,
                            message: b.qualifiedMessage
                        });
                else window.location.replace("/loginPage.action");
                return !1
            }), a && b.authenticated && b.qualified && c.pseudoForm.submit()
        },
        initGainChoices: function() {
            var a = this.ui;
            a.gainChoices.children(".ui-term-radio").click(function() {
                var b = d(this).children("input");
                b.prop("checked") || b.prop("checked", !0), "BANK" == b.val() && b.prop("checked") ? a.bankAccount.show() : a.bankAccount.hide()
            })
        },
        renderConfirmation: function() {
            var a = parseFloat(d('[data-name="shares"]').text(), 10);
            "number" == typeof a && d('[data-type="multishares"]').each(function() {
                var b = d(this),
                    c = parseFloat(b.text(), 10);
                "number" == typeof c && (c *= a, c = g.translator._fixedFloat2(c)), b.text(c)
            }), d("#captcha").length > 0 && new h.Captcha({
                name: "captcha"
            }).init();
            var b = d('[data-name="expacted-rate"]');
            if (b.length > 0) {
                var c = b.data("value").toString();
                b.text(c.replace(/%/g, "").replace("-", " - "))
            }
            d(".ui-confirm-form").submit(function() {
                var a = d('input[name="agree-contract"]'),
                    b = d("#captcha-input"),
                    c = d(".ui-confirm-hint");
                if (a.length > 0) {
                    var e = a.prop("checked");
                    if (!e) return c.text("投标前请阅读并同意协议"), c.show(), !1;
                    c.hide()
                }
                if (b.length > 0) {
                    if (!b.val()) return c.text("请填写验证码"), c.show(), !1;
                    c.hide()
                }
                return d(this).find(":submit").attr("disabled", "disabled"), !0
            })
        },
        check: function(a) {
            var b = parseInt(a, 10);
            if ("" === a) return this.errors.NONE;
            if (a != b.toString()) return this.errors.NOT_INT;
            b = "amount" == this.unit ? b : b * this.amountPerShare;
            var c = this.fee * b;
            return b > this.max.amount ? this.errors.EXCEEDED_MAX : b + c > this.max.account && !this.ui.pseudoForm.data("rsv") ? this.errors.OVER_BALANCE : "amount" == this.unit && b % this.amountPerShare !== 0 ? this.errors.NOT_INT_SHARE : this.errors.NONE
        },
        getData: function() {
            var a = this.ui,
                b = a.input.val();
            if ("loan-invest" == this.page) return {
                amount: b,
                shares: b / this.amountPerShare
            };
            if ("loan-transfer" == this.page) return {
                amount: b * this.amountPerShare,
                shares: b
            };
            if ("plan-join" == this.page) {
                var c, e, f = !1,
                    g = "",
                    h = "";
                c = a.gainChoices.find("input:checked"), e = c.parent().children(".ui-term-radio-text").text();
                var i = parseInt(this.ui.input.val(), 10),
                    j = parseFloat(d("#fee-rate").data("fee-rate"), 10) / 100,
                    k = parseFloat(d("#deposit-rate").data("deposit-rate"), 10) / 100,
                    l = i * k >= this.maxdepositamount ? this.maxdepositamount : i * k;
                if ("BANK" == c.val()) {
                    var m = a.bankAccount.find("option:selected");
                    f = !0, g = m.text(), h = m.val()
                }
                var n = "" !== d("#append-action").text(),
                    o = d("#append-action").text(),
                    p = d("#surplus-amount-helper"),
                    q = 0,
                    r = 0,
                    s = 0,
                    t = 0;
                return p.length && (q = parseFloat(Number(p.data("overplusamount"))), r = parseFloat(Number(p.data("buyinrate"))), s = parseFloat(Number(p.data("alreadydepositamount"))), t = (q + i) * r * .01 + q + i - s - l), {
                    amount: b,
                    shares: b / this.amountPerShare,
                    deposit: l,
                    fee: j * b,
                    amountAndFee: parseInt(b, 10) + j * b,
                    append: o,
                    isAppend: n,
                    gain: c.val(),
                    gainText: e,
                    intoBank: f,
                    restAmount: t,
                    bankText: g,
                    bankVal: h
                }
            }
            return {}
        },
        toggleErrorMessage: function(a) {
            a ? (this.ui.hint.hide(), this.ui.error.text(a).show()) : (this.ui.error.hide().empty(), this.ui.hint.show())
        }
    }), c.exports = j
}), define("components/latest-financial-plan", ["jquery", "widgets/widgets"], function(a, b, c) {
    var d = a("jquery"),
        e = a("widgets/widgets"),
        f = function() {};
    d.extend(f.prototype, {
        init: function() {
            var a = d("#counter");
            a.length > 0 && a.is(":visible") && (new e.Counter({
                container: a,
                start: a.data("now"),
                end: a.data("end"),
                daysStyle: "big",
                minDays: 3,
                stopped: function() {
                    d("#plan-status-presale").hide(), d("#plan-status-in-progress").show(), d("#plan-status-in-progress .plan-progress").hide(), d("#plan-status-in-progress .ui-progressbar-circle").show()
                }
            }).init(), d(".plan-status").hasClass("seconds") && d(".ui-counter-text .suffix").text("开始预定")), d(".ui-plan-latest").hover(function() {
                d("#plan-status-in-progress .plan-progress").hide(), d("#plan-status-in-progress .ui-progressbar-circle").show()
            }, function() {
                d("#plan-status-in-progress .ui-progressbar-circle").hide(), d("#plan-status-in-progress .plan-progress").show()
            })
        }
    }), c.exports = f
}), define("components/list-factory", ["jquery", "protocol", "widgets/widgets"], function(a, b, c) {
    var d = a("jquery"),
        e = a("protocol"),
        f = a("widgets/widgets"),
        g = function(a) {
            d.extend(this, {
                container: a.container
            }), this._ui = {
                switcher: this._elem("details"),
                box: this._elem("details-box")
            }, this.loanId = this.container.data("loan-id")
        };
    d.extend(g.prototype, {
        init: function() {
            var a = this,
                b = this._ui;
            return b.switcher.click(function() {
                b.switcher.hasClass("active") ? (b.switcher.removeClass("active"), b.box.hide()) : ("initialized" != b.box.data("status") && a._initDetails(), b.switcher.addClass("active"), b.box.show())
            }), this
        },
        _initDetails: function() {
            new f.List({
                template: d("#transferred-out-details-template"),
                name: "transferred-out-details-" + this.loanId,
                api: e.API.getUserTransferredOutRecords,
                title: !0,
                pagination: !0,
                params: {
                    loanId: this.loanId
                }
            }).init()._update({
                loanId: this.loanId
            })
        },
        _elem: function(a) {
            return this.container.find('[data-name="' + a + '"]')
        }
    });
    var h = function() {
        d.extend(this, {})
    };
    d.extend(h.prototype, {
        create: function(a, b) {
            return "transferred-out" == a ? new f.List({
                name: b,
                api: e.API.getUserTransferredOutLoans,
                title: !0,
                pagination: !0,
                rendered: function() {
                    this.container.children("li.ui-list-item").each(function(a, b) {
                        new g({
                            container: d(b)
                        }).init()
                    })
                }
            }) : void 0
        }
    }), c.exports = new h
}), define("components/plan-performance", ["jquery", "protocol", "highcharts"], function(a, b, c) {
    var d = a("jquery"),
        e = a("protocol");
    a("highcharts");
    var f = 40,
        g = 115,
        h = 5,
        i = function(a) {
            d.extend(this, {
                name: a.name,
                container: a.container || d("#" + a.name),
                planId: a.planId
            }), this._ui = {
                boxCashIn: this._elem("input-cash"),
                boxCashOut: this._elem("output-cash"),
                boxArrow: this._elem("arrow"),
                numTotalAmount: this._elem("total-amount"),
                numAvgInterest: this._elem("avg-interest-rate"),
                numTotalInterest: this._elem("total-interest"),
                numUsage: this._elem("usage"),
                numBidCount: this._elem("bid-count"),
                boxInvestors: this._elem("investors"),
                boxBorrowers: this._elem("borrowers"),
                numInvestorCount: this._elem("investor-count"),
                numBorrowerCount: this._elem("borrower-count"),
                boxDist: this._elem("borrowers-dist")
            }, this._tpl = {
                cash: '<div class="cash fn-left"></div>',
                investor: '<div class="ppl-solid fn-left"></div>',
                borrower: '<div class="ppl-trans fn-left"></div>',
                error: '<div class="plan-performance-error">加载失败，请稍后再试</div>'
            }
        };
    d.extend(i.prototype, {
        init: function() {
            var a = this,
                b = {
                    financePlanId: this.planId
                };
            return e.getPlanPerformance(b, function(b, c, e) {
                d(".plan-performance-loading").hide(), a.render(b, c, e)
            }), this
        },
        render: function(a, b, c) {
            var i, j, k = this._ui,
                l = this._tpl;
            if (0 !== a) return void this.container.parent().append(l.error);
            this.container.show();
            var m = c.performance,
                n = e.translator;
            m.earnInterest < 0 && (m.earnInterest = 0), k.numTotalAmount.text(n._commaInteger(m.amount)), k.numAvgInterest.text(n._fixedFloat2(m.averageBidInterest)), k.numTotalInterest.text(n._commaFloat(m.earnInterest)), k.numUsage.text(n._fixedFloat2(m.fundsUseRate)), k.numBidCount.text(n._commaInteger(m.bidCount));
            var o = Math.ceil(m.amount / 1e6, 10),
                p = Math.ceil(m.earnInterest / 1e6, 10);
            for (i = 0; o > i; i++) k.boxCashIn.append(l.cash);
            for (i = 0; p > i; i++) k.boxCashOut.append(l.cash);
            var q = Math.ceil(o / 5) * f,
                r = Math.ceil(p / 5) * f,
                s = g;
            q > g ? (k.boxArrow.css("margin-top", Math.floor((q - g) / 2)), s = q) : (j = Math.floor((g - q) / 2), k.boxCashIn.css("margin-top", j).css("margin-bottom", j)), 0 !== r ? (j = Math.floor((s - r) / 2), k.boxCashOut.css("margin-top", j).css("margin-bottom", j)) : k.boxCashOut.css("height", s), k.numInvestorCount.text(n._commaInteger(m.subPointCount)), k.numBorrowerCount.text(n._commaInteger(m.borrowCount));
            var t = m.subPointCount > m.borrowCount ? m.subPointCount : m.borrowCount,
                u = Math.ceil(t / 10),
                v = Math.ceil(m.subPointCount / u),
                w = Math.ceil(m.borrowCount / u);
            for (i = 0; v > i; i++) k.boxInvestors.append(l.investor);
            for (i = 0; w > i; i++) k.boxBorrowers.append(l.borrower);
            var x = m.provinceDist,
                y = [],
                z = [];
            d.each(x, function(a, b) {
                y.push({
                    name: a,
                    y: b
                })
            }), y.sort(function(a, b) {
                return b.y - a.y
            });
            var A = ["#52ac4e", "#67b664", "#86c583", "#a8d5a6", "#a8d5a6", "#dceedc"],
                B = 0,
                C = 0,
                D = 0;
            for (i = 0; i < y.length; i++) B += y[i].y, h > i ? (y[i].color = A[D], z.push(y[i]), D += 1) : C += y[i].y;
            C > 0 && z.push({
                name: "其它",
                y: C,
                color: A[D]
            }), B > 0 && k.boxDist.highcharts({
                chart: {
                    type: "pie"
                },
                title: {
                    text: "借款人地域分布"
                },
                legend: !1,
                plotOptions: {
                    pie: {
                        shadow: !1,
                        center: ["50%", "50%"]
                    }
                },
                tooltip: {
                    valueSuffix: "位"
                },
                series: [{
                    name: "借款人",
                    data: z,
                    size: "100%",
                    innerSize: "50%",
                    dataLabels: {
                        color: "#fff",
                        distance: -25
                    }
                }],
                credits: {
                    enabled: !1
                }
            })
        },
        _elem: function(a) {
            return this.container.find('[data-name="' + a + '"]')
        }
    }), c.exports = i
}), define("components/plan-quit-handler", ["jquery", "dialog", "protocol", "common"], function(a, b, c) {
    var d = a("jquery"),
        e = a("dialog"),
        f = a("protocol"),
        g = a("common"),
        h = "系统正在努力为您计算预计回收金额，请您耐心等待",
        i = "系统正在为您挂出债权，请您耐心等待",
        j = function(a) {
            d.extend(this, {
                subPointId: a.subPointId,
                planName: a.planName,
                finalAmount: a.finalAmount,
                exitDialog: null,
                confirmDialog: null,
                exitTemplate: d("#confirm-plan-exit-template"),
                confirmTemplate: d("#confirm-plan-exit-execution-template"),
                canceled: !1,
                confirmed: !1,
                quitType: null,
                _ui: {}
            })
        };
    d.extend(j.prototype, {
        init: function() {
            return this
        },
        start: function(a, b) {
            var c = this,
                f = this._ui,
                h = null;
            a && "exit" != a ? (h = g.fillTemplate({
                template: c.confirmTemplate,
                data: d.extend(!0, b, c.dataUI("confirm"))
            }), c.confirmDialog = new e({
                content: h,
                hasMask: {
                    hideOnClick: !1
                }
            }), c.confirmDialog.after("show", function() {
                c.loadUI("confirm"), c.confirmed = !1;
                var a = this;
                g.initPoptips(d(".expected-exit-amount-tip")), g.initPoptips(d(".expected-total-amount-tip")), f.confirmCancel.click(function() {
                    c.confirmed || a.hide()
                }), f.confirmForm.submit(function() {
                    return f.confirmSubmit.hasClass("ui-button-disabled") ? !1 : (c.confirmed = !0, f.confirmCancel.addClass("disabled"), f.confirmSubmit.addClass("ui-button-disabled"), c.showLoading(f.confirmDialog, i), !0)
                })
            }), c.confirmDialog.after("hide", function() {
                this.destroy()
            }), c.confirmDialog.show()) : (h = g.fillTemplate({
                template: c.exitTemplate,
                data: c.dataUI("exit")
            }), c.exitDialog = new e({
                content: h,
                hasMask: {
                    hideOnClick: !1
                }
            }), c.exitDialog.after("show", function() {
                c.canceled = !1, c.loadUI("exit"), c.initUI("exit"), c.updateQuitType();
                var a = this;
                f.exitCancel.click(function() {
                    a.hide()
                })
            }), c.exitDialog.after("hide", function() {
                c.canceled = !0, this.destroy()
            }), c.exitDialog.show())
        },
        initUI: function() {
            var a = f.translator.translate(f.API.getUserBankInfo, g.loadJSON("#bank-accounts-rsp", !0).data);
            g.fillTemplate({
                container: d("#account-info"),
                template: d("#account-info-template"),
                data: a
            });
            var b = this,
                c = this._ui;
            c.exitQuitType.click(function() {
                c.exitRRD.toggle(), c.exitRRDHint.toggle(), c.exitBank.toggle(), c.exitBankHint.toggle(), b.updateQuitType()
            }), c.exitSubmit.click(function() {
                c.exitSubmit.hasClass("ui-button-disabled") || (c.exitSubmit.addClass("ui-button-disabled"), b.showLoading(c.exitDialog, h), f.getExpectedAmountsForPlanExiting({
                    subPointId: b.subPointId
                }, function(a, c, d) {
                    b.canceled || (b.exitDialog.hide(), 0 === a ? b.start("confirm", d) : g.showMessage(c))
                }))
            })
        },
        loadUI: function(a) {
            this._elem || (this._elem = function(a) {
                return d(".ui-confirm").find('[data-name="' + a + '"]')
            });
            var b = this._ui;
            "exit" == a ? (b.exitRRD = this._elem("to-renrendai"), b.exitRRDHint = this._elem("to-renrendai-hint"), b.exitBank = this._elem("to-bank"), b.exitBankHint = this._elem("to-bank-hint"), b.exitBankAccount = this._elem("bank-account"), b.exitQuitType = this._elem("change-manner"), b.exitDialog = d("#confirm-plan-exit"), b.exitSubmit = d("#submit-plan-exit"), b.exitCancel = d("#cancel-plan-exit")) : (b.confirmDialog = d("#confirm-plan-exit-execution"), b.confirmSubmit = d("#submit-plan-exit-execution"), b.confirmCancel = d("#cancel-plan-exit-execution"), b.confirmForm = d("#form-quit"))
        },
        dataUI: function(a) {
            if ("exit" == a) return {
                name: this.planName
            };
            var b = this._ui,
                c = {
                    name: this.planName,
                    amount: this.finalAmount
                };
            return "RRD" == this.quitType ? (c.quitType = "RRD", c.quitTypeName = "提取至人人贷主账户") : (c.quitType = "BANK", c.quitTypeName = "提取至银行卡", c.quitBankId = b.exitBankAccount.val(), c.quitBankAccount = b.exitBankAccount.find('[value="' + c.quitBankId + '"]').text()), c
        },
        updateQuitType: function() {
            var a = this._ui;
            this.quitType = a.exitRRD.is(":visible") ? "RRD" : "BANK"
        },
        showLoading: function(a, b) {
            a.append('<div class="ui-confirm-loading-text"></div>');
            var c = d(".ui-dialog-content").width(),
                e = d(".ui-dialog-content").height();
            d(".ui-confirm-loading-text").css({
                width: c + "px",
                height: e + "px"
            }).append('<p class="hint">' + b + '</p><p class="loading"></p>')
        }
    }), c.exports = j
}), define("components/sidebar", ["jquery"], function(a, b, c) {
    var d = a("jquery"),
        e = function(a) {
            d.extend(this, {
                name: a.name,
                container: d("#sidebar")
            }), this._ui = {
                dropdownTriggers: this._elem(".ui-side-item-link"),
                subLists: this._elem(".ui-side-sub-list")
            }
        };
    d.extend(e.prototype, {
        init: function() {
            var a = this._ui;
            return a.dropdownTriggers.click(function() {
                d.each(a.subLists, function(a, b) {
                    var c = d(b);
                    c.parent().hasClass("active") || c.is(":visible") || c.hide()
                }), d(this).parent().hasClass("active") || d(this).next().toggle()
            }), this
        },
        _elem: function(a) {
            return this.container.find(a)
        }
    }), c.exports = e
}), define("components/transfer-confirmation", ["jquery", "protocol", "widgets/widgets"], function(a, b, c) {
    var d = a("jquery"),
        e = a("protocol"),
        f = a("widgets/widgets"),
        g = {},
        h = function(a) {
            d.extend(this, {
                container: a.container
            }), this._ui = {
                hint: this._elem("cfm-hint"),
                hint2: this.container.find(".ui-confirm-hint"),
                form: this._elem("cfm-form"),
                submit: this._elem("cfm-submit"),
                inputAgree: this._elem("cfm-agreement"),
                inputShares: this._elem("cfm-shares-to-transfer"),
                selectDiscount: this._elem("cfm-discount"),
                availableShares: this._elem("cfm-available-shares"),
                valuePerShare: this._elem("cfm-value-per-share"),
                pricePerShare: this._elem("cfm-price-per-share"),
                price: this._elem("cfm-price-in-total"),
                fee: this._elem("cfm-fee"),
                summary: this._elem("cfm-income-summary")
            }, this.fee = parseFloat(this._ui.fee.data("value"), 10), this.availableShares = parseInt(this._ui.availableShares.text(), 10), this.valuePerShare = parseFloat(this._ui.valuePerShare.text(), 10)
        };
    d.extend(h.prototype, {
        init: function() {
            var a = this,
                b = this._ui;
            return a.update(), b.inputShares.keyup(function() {
                a.hint(a.check()), a.update()
            }), b.selectDiscount.change(function() {
                a.update()
            }), b.inputAgree.change(function() {
                a.update()
            }), b.form.submit(function() {
                var a = d("#J_zrff").val(),
                    c = /^[0-9]*$/;
                if (!c.test(a)) return d("#J_error_hint").html("请输入正确的转让份数"), d("#J_error_hint").css("display", "inline-block"), d("#J_zrff").focus(), !1;
                if (b.submit.hasClass("disabled")) return !1;
                var e = d("#captcha-input").val();
                return d.trim(e).length <= 0 ? (d(".J_error_msg_p").css("display", "block"), d("#captcha-input").focus(), !1) : !0
            }), new f.Captcha({
                name: "captcha"
            }).init(), this
        },
        hint: function(a) {
            a ? this._ui.hint.text(a).show() : this._ui.hint.text("").hide()
        },
        check: function() {
            var a = this._ui.inputShares,
                b = a.val();
            return b = parseInt(b, 10), isNaN(b) ? void a.val("") : (a.val(b), b > this.availableShares ? "转让份数不能多于" + this.availableShares + "份" : void 0)
        },
        update: function() {
            var a = this._ui,
                b = e.translator,
                c = parseInt(a.inputShares.val(), 10),
                d = parseFloat(a.selectDiscount.val(), 10),
                f = a.inputAgree.prop("checked"),
                g = parseFloat(a.pricePerShare.data("interest"), 10),
                h = parseFloat(a.pricePerShare.data("principal"), 10);
            !isNaN(c) && c <= this.availableShares ? a.submit.removeClass("disabled") : (a.submit.addClass("disabled"), c = 0), f ? (a.hint2.text(""), a.hint2.hide()) : (a.hint2.text("转让前请阅读并同意协议"), a.hint2.show(), a.submit.addClass("disabled"));
            var i = g - parseFloat(b._fixedFloat2(h * (1 - d)), 10),
                j = i * c,
                k = j * this.fee;
            a.pricePerShare.text(b._fixedFloat2(i)), a.price.text(b._fixedFloat2(j)), a.fee.text(b._fixedFloat2(k)), a.summary.text(b._fixedFloat2(j - k))
        },
        _elem: function(a) {
            return this.container.find('[data-name="' + a + '"]')
        }
    });
    var i = function(a) {
        d.extend(this, {
            container: a.container
        }), this._ui = {
            form: this._elem("cfm-form"),
            submit: this._elem("cfm-submit"),
            inputAgree: this._elem("cfm-agreement"),
            selectDiscount: this._elem("cfm-discount"),
            value: this._elem("cfm-value-in-total"),
            price: this._elem("cfm-price-in-total"),
            fee: this._elem("cfm-fee"),
            summary: this._elem("cfm-income-summary"),
            hint2: this.container.find(".ui-confirm-hint")
        }, this.fee = parseFloat(this._ui.fee.data("value"), 10), this.value = parseFloat(this._ui.value.text(), 10)
    };
    d.extend(i.prototype, {
        init: function() {
            var a = this,
                b = this._ui;
            return a.update(), b.selectDiscount.change(function() {
                a.update()
            }), b.inputAgree.change(function() {
                a.update()
            }), b.form.submit(function() {
                if (b.submit.hasClass("disabled")) return !1;
                var a = d("#captcha-input").val();
                return d.trim(a).length <= 0 ? (d(".J_error_msg_p").css("display", "block"), d("#captcha-input").focus(), !1) : !0
            }), new f.Captcha({
                name: "captcha"
            }).init(), this
        },
        update: function() {
            var a = this._ui,
                b = e.translator,
                c = parseFloat(a.selectDiscount.val(), 10),
                d = a.inputAgree.prop("checked");
            d ? (a.hint2.text(""), a.hint2.hide(), a.submit.removeClass("disabled")) : (a.hint2.text("转让前请阅读并同意协议"), a.hint2.show(), a.submit.addClass("disabled"));
            var f = c * this.value,
                g = f * this.fee;
            a.fee.text(b._fixedFloat2(g)), a.price.text(b._fixedFloat2(f)), a.summary.text(b._fixedFloat2(f - g))
        },
        _elem: function(a) {
            return this.container.find('[data-name="' + a + '"]')
        }
    }), g.Confirm = h, g.ConfirmBatch = i, c.exports = g, d("body").delegate("#captcha-input", "keydown", function() {
        var a = d("#captcha-input").val();
        d.trim(a).length > 0 && d(".J_error_msg_p").css("display", "none")
    })
});