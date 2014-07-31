define("pages/account/borrow/repayments", ["jquery", "common", "protocol", "widgets/widgets"], function(a) {
    var b = a("jquery"),
        c = a("common"),
        d = a("protocol"),
        e = a("widgets/widgets"),
        f = function(a) {
            b.extend(this, {
                container: a.container,
                _checked: {
                    start: 0,
                    end: 0,
                    count: 0
                }
            }), this.loanId = this.container.data("loan-id"), this._ui = {
                repaySwitch: this._elem("repay-switch"),
                repayBox: this._elem("repay-box"),
                repayList: this._elem("repayment-records"),
                repayAvailable: this._elem("repay-available-amount"),
                repayAmount: this._elem("repay-amount"),
                repayHint: this._elem("repay-hint"),
                repayInputCount: this._elem("repay-input-count"),
                repayInputStart: this._elem("repay-input-start"),
                repayInputEnd: this._elem("repay-input-end"),
                repaySubmit: this._elem("repay-submit"),
                repayForm: this._elem("repay-form"),
                repayAllSwitch: this._elem("repay-all-switch"),
                repayAllBox: this._elem("repay-all-box"),
                repayAllAvailable: this._elem("repay-all-available-amount"),
                repayAllAmount: this._elem("repay-all-amount"),
                repayAllHint: this._elem("repay-all-hint"),
                repayAllSubmit: this._elem("repay-all-submit"),
                repayAllForm: this._elem("repay-all-form")
            }
        };
    b.extend(f.prototype, {
        init: function() {
            var a = this,
                c = this._ui;
            return c.repaySwitch.click(function() {
                a._switchClicked(b(this))
            }), c.repayAllSwitch.click(function() {
                c.repayAllSwitch.hasClass("disabled") || a._switchClicked(b(this))
            }), this
        },
        _initRepay: function() {
            var a = this,
                c = this._ui,
                f = this.loanId,
                g = d.translator;
            new e.List({
                container: c.repayList,
                name: "repayment-records",
                api: d.API.getUserLoanRepaymentRecords,
                title: !0,
                rendered: function(c) {
                    a._elem("repay-term-checking").change(function() {
                        a._checkboxClicked(b(this))
                    }), 0 === c.status && (a._elem("repaid-summary").children("em").text(g._fixedFloat2(c.data.alreadyPayTotalAmount)), a._elem("to-repay-summary").children("em").text(g._fixedFloat2(c.data.notPayTotalAmount)))
                }
            }).init()._update({
                loanId: f
            }, function(a) {
                0 === a && c.repayBox.data("status", "initialized")
            }), c.repayForm.submit(function() {
                return "0.00" == c.repayAmount.children("em").text() && c.repayHint.text("请选择还款期").show(), c.repaySubmit.hasClass("disabled") ? !1 : !0
            })
        },
        _initRepayAll: function() {
            var a = this._ui,
                b = parseFloat(a.repayAllAmount.data("amount"), 10),
                c = parseFloat(a.repayAllAvailable.data("amount"), 10);
            b > c && (a.repayAllSubmit.addClass("disabled"), a.repayAllHint.text("您的余额不足，请先充值")), a.repayAllForm.submit(function() {
                return a.repayAllSubmit.hasClass("disabled") ? !1 : !0
            })
        },
        _elem: function(a) {
            return this.container.find('[data-name="' + a + '"]')
        },
        _switchClicked: function(a) {
            var b = "repay",
                c = "repayAll";
            "repay-all-switch" == a.data("name") && (b = "repayAll", c = "repay");
            var d = "repay" == b ? "_initRepay" : "_initRepayAll",
                e = this._ui[b + "Switch"],
                f = this._ui[b + "Box"],
                g = this._ui[c + "Switch"],
                h = this._ui[c + "Box"];
            e.hasClass("active") ? (this.container.removeClass("active"), e.removeClass("active"), e.text(e.data("text")), f.hide()) : (g.hasClass("active") && (g.removeClass("active"), g.text(g.data("text")), h.hide()), this.container.addClass("active"), e.addClass("active"), e.text("取消"), f.show(), "initialized" != f.data("status") && this[d]())
        },
        _checkboxClicked: function(a) {
            var c = this,
                e = this._ui;
            c._elem("repay-term-checking").each(function(d, e) {
                var f = b(e),
                    g = parseInt(a.val(), 10),
                    h = parseInt(f.val(), 10);
                g > h ? (f.prop("checked", !0), f.attr("checked", "checked")) : h == g ? c._checked.end > g && !a.prop("checked") && (f.prop("checked", !0), f.attr("checked", "checked")) : (f.prop("checked", !1), f.removeAttr("checked"))
            }), c._checked.count = 0, c._checked.start = 0, c._checked.end = 0;
            var f = 0,
                g = null,
                h = parseFloat(e.repayAvailable.data("amount"), 10);
            c._elem("repay-term-checking").each(function(a, d) {
                var e = b(d),
                    h = parseInt(e.val(), 10);
                e.prop("checked") && (0 === c._checked.start && (c._checked.start = h), c._checked.end = h, c._checked.count++, g = e.closest("li").find(".to-repay-amount em"), f += parseFloat(g.text(), 10))
            }), f > h ? (e.repaySubmit.addClass("disabled"), e.repayHint.text("您的余额不足，请先充值").show()) : (e.repaySubmit.removeClass("disabled"), e.repayHint.text("").hide()), 0 === f ? e.repaySubmit.addClass("disabled") : e.repaySubmit.removeClass("disabled"), e.repayAmount.children("em").text(d.translator._fixedFloat2(f)), e.repayInputCount.val(c._checked.count), e.repayInputStart.val(c._checked.start), e.repayInputEnd.val(c._checked.end)
        }
    }), new e.List({
        name: "repaying-list",
        api: d.API.getUserRepayingRecords,
        title: !0,
        pagination: !0,
        rendered: function() {
            var a = this.container;
            a.children('li[data-name="repaying-item"]').each(function(a, c) {
                new f({
                    container: b(c)
                }).init()
            })
        }
    }).init(c.loadJSON("#repaying-list-rsp", !0)), new e.Tab({
        tabsContainer: b("#repayments-tab"),
        contentsContainer: b("#repayments-tab-content"),
        switched: function(a, b, c) {
            return c ? !0 : ("repaid" == b && new e.List({
                name: "repaid-list",
                api: d.API.getUserRepaidRecords,
                title: !0,
                pagination: !0
            }).init()._update(), !0)
        }
    }).init()
});