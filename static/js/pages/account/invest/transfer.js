define("pages/account/invest/transfer", ["jquery", "dialog", "common", "protocol", "widgets/widgets", "components/components", "tip"], function(a) {
    var b = a("jquery"),
        c = a("dialog"),
        d = a("common"),
        e = a("protocol"),
        f = a("widgets/widgets"),
        g = a("components/components"),
        h = a("tip"),
        i = function(a) {
            b.extend(this, {
                container: a.container
            }), this._ui = {
                cancel: this._elem("cancel")
            }
        };
    b.extend(i.prototype, {
        init: function() {
            var a = this;
            return this._ui.cancel.click(function() {
                var e = d.fillTemplate({
                    template: b("#confirm-transfer-cancel-template"),
                    data: a._data()
                });
                new c({
                    content: e
                }).after("show", function() {
                    var a = this;
                    b(".ui-confirm-cancel-link").click(function() {
                        a.hide()
                    }), new f.Captcha({
                        name: "captcha"
                    }).init()
                }).after("hide", function() {
                    this.destroy()
                }).show()
            }), this
        },
        _elem: function(a) {
            return this.container.find('[data-name="' + a + '"]')
        },
        _data: function() {
            var a = e.translator;
            return {
                loanId: this.container.data("loan-id"),
                transferId: this.container.data("transfer-id"),
                sharesTransferred: this.container.data("initialShares") - this.container.data("shares"),
                sharesLeft: this.container.data("shares"),
                income: this.container.data("income"),
                fee: this.container.data("fee"),
                summary: a._fixedFloat2(this.container.data("income") - this.container.data("fee"))
            }
        }
    });
    var j = function(a) {
        b.extend(this, {
            container: a.container,
            changed: a.changed || function() {}
        }), this._ui = {
            transfer: this._elem("transfer"),
            checkbox: this._elem("check")
        }, this.loanId = this.container.data("loan-id")
    };
    b.extend(j.prototype, {
        init: function() {
            var a = this,
                e = this._ui;
            return e.transfer.click(function() {
                var e = d.fillTemplate({
                    template: b("#confirm-transfer-out-template"),
                    data: a._data()
                });
                new c({
                    content: e
                }).after("show", function() {
                    var a = this;
                    b(".ui-confirm-cancel-link").click(function() {
                        a.hide()
                    }), new g.TransferConfirmation.Confirm({
                        container: b("#confirm-transfer-out")
                    }).init()
                }).after("hide", function() {
                    this.destroy()
                }).show()
            }), e.checkbox.change(function() {
                a.changed(e.checkbox.prop("checked"))
            }), this
        },
        _elem: function(a) {
            return this.container.find('[data-name="' + a + '"]')
        },
        _data: function() {
            var a = e.translator;
            return ret = {
                loanId: this.loanId,
                lenderId: this.container.data("lender-id"),
                investAmount: this.container.data("invest-amount"),
                investShares: this.container.data("invest-shares"),
                interest: this.container.data("interest"),
                interestGained: this.container.data("interest-gained"),
                termsLeft: this.container.data("terms-left"),
                termsInTotal: this.container.data("terms-in-total"),
                availableShares: this.container.data("available-shares"),
                valuePerShare: this.container.data("value-per-share"),
                repaymentsPerShare: this.container.data("repayments-per-share"),
                interestPerShare: this.container.data("interest-per-share"),
                principalPerShare: this.container.data("principal-per-share"),
                fee: this.container.data("fee")
            }, ret.value = a._fixedFloat2(ret.valuePerShare * ret.availableShares), ret.summary = a._fixedFloat2(ret.value - ret.fee), ret
        }
    });
    var k = function(a) {
        b.extend(this, {
            container: a.container,
            selector: a.checkboxSelector,
            _items: {},
            _count: 0,
            _value: 0,
            _skipUpdating: !1,
            _ui: {
                count: b("#selected-count"),
                value: b("#selected-value"),
                all: b("#select-all"),
                submit: b("#transfer-batch")
            }
        })
    };
    b.extend(k.prototype, {
        init: function() {
            var a = this,
                e = this._ui;
            return e.all.change(function() {
                a._skipUpdating = !0, b(a.selector).each(e.all.prop("checked") ? function(a, c) {
                    var d = b(c);
                    d.prop("checked") || (d.prop("checked", !0), d.attr("checked", "checked"), d.change())
                } : function(a, c) {
                    var d = b(c);
                    d.prop("checked") && (d.prop("checked", !1), d.removeAttr("checked"), d.change())
                }), a._skipUpdating = !1
            }), e.submit.click(function() {
                if (!e.submit.hasClass("disabled")) {
                    var f = d.fillTemplate({
                        template: b("#confirm-batch-transfer-out-template"),
                        data: a._data()
                    });
                    new c({
                        content: f
                    }).after("show", function() {
                        var c = this;
                        b(".ui-confirm-cancel-link").click(function() {
                            c.hide()
                        }), new g.TransferConfirmation.ConfirmBatch({
                            container: b("#confirm-batch-transfer-out"),
                            items: a._items
                        }).init()
                    }).after("hide", function() {
                        this.destroy()
                    }).show()
                }
            }), this
        },
        add: function(a) {
            var b = a.loanId;
            b && (this._items[b] = a, this._value += parseFloat(a.value, 10), this._count += 1, this.update())
        },
        remove: function(a) {
            var b = a.loanId;
            b && this._items[b] && (this._value -= parseFloat(this._items[b].value, 10), this._count -= 1, delete this._items[b], this.update())
        },
        update: function() {
            var a = this,
                c = this._ui;
            0 === this._count ? (this._value = 0, c.submit.addClass("disabled")) : c.submit.removeClass("disabled"), c.count.text(this._count), c.value.text(e.translator._fixedFloat2(this._value));
            var d, f = b(this.selector);
            if (b.each(f, function(c, e) {
                $box = b(e), d = $box.val(), a._items[d] && ($box.prop("checked", !0), $box.attr("checked", "checked"))
            }), !this._skipUpdating) {
                for (var g = 0 !== f.length, h = 0; h < f.length; h++)
                    if (!b(f[h]).prop("checked")) {
                        g = !1;
                        break
                    }
                g ? (c.all.prop("checked", !0), c.all.attr("checked", "checked")) : (c.all.prop("checked", !1), c.all.removeAttr("checked"))
            }
        },
        _data: function() {
            var a = e.translator,
                c = [],
                d = [],
                f = null;
            b.each(this._items, function(a, b) {
                b.lenderId && b.availableShares && (c.push(b.lenderId), d.push(b.availableShares), f || (f = b.fee || .01))
            });
            var g = {
                count: this._count,
                value: this._value,
                lenderIds: c.join(","),
                shares: d.join(","),
                fee: f
            };
            return g.summary = a._fixedFloat2(g.value - g.fee), g.value = a._fixedFloat2(g.value), g
        }
    }), new f.List({
        name: "transferring-list",
        api: e.API.getUserTransferringLoans,
        title: !0,
        pagination: !0,
        rendered: function() {
            this.container.children("li.ui-list-item").each(function(a, c) {
                new i({
                    container: b(c)
                }).init()
            })
        }
    }).init(d.loadJSON("#transferring-list-rsp", !0)), new f.Tab({
        tabsContainer: b("#transfer-tab"),
        contentsContainer: b("#transfer-tab-content"),
        switched: function(a, c, d) {
            if (d) return !0;
            if ("transferable" == c) {
                var h = new k({
                    container: b("#transferable-selections"),
                    checkboxSelector: 'input[data-name="check"]'
                }).init();
                new f.List({
                    name: "transferable-list",
                    api: e.API.getUserTransferableLoans,
                    title: !0,
                    pagination: !0,
                    rendered: function() {
                        this.container.children("li.ui-list-item").each(function(a, c) {
                            new j({
                                container: b(c),
                                changed: function(a) {
                                    a ? h.add(this._data()) : h.remove({
                                        loanId: this.loanId
                                    })
                                }
                            }).init()
                        }), h.container.show(), h.update()
                    }
                }).init()._update()
            }
            return "transferred-out" == c && g.ListFactory.create("transferred-out", "transferred-out-list").init()._update(), "transferred-in" == c && new f.List({
                name: "transferred-in-list",
                api: e.API.getUserTransferredInLoans,
                title: !0,
                pagination: !0
            }).init()._update(), !0
        }
    }).init(), new h({
        element: "#tipCon_1",
        trigger: "#tips_1",
        direction: "right"
    }), new h({
        element: "#tipCon_2",
        trigger: "#tips_2",
        direction: "right"
    })
});