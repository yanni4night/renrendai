define("pages/account/invest/loans", ["jquery", "dialog", "common", "protocol", "widgets/widgets", "components/components", "tip"], function(a) {
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
                row: this.container.children(".ui-list-item-row"),
                box: this.container.children(".ui-list-item-box"),
                btn: this._elem("operation"),
                link: this._elem("details")
            }
        };
    b.extend(i.prototype, {
        init: function() {
            var a = this,
                e = this._ui;
            return e.row.click(function() {
                e.box.is(":visible") ? e.box.hide() : e.box.show()
            }), e.link.click(function(a) {
                a.stopPropagation()
            }), e.btn.click(function(f) {
                if (f.stopPropagation(), "TRANSFER_DISABLED" != e.btn.data("operation")) {
                    var h = d.fillTemplate({
                        template: b("#confirm-transfer-out-template"),
                        data: a._confirmData()
                    });
                    new c({
                        content: h
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
                }
            }), this
        },
        _elem: function(a) {
            return this.container.find('[data-name="' + a + '"]')
        },
        _confirmData: function() {
            var a = e.translator;
            return ret = {
                loanId: this.container.data("loan-id"),
                lenderId: this.container.data("lender-id"),
                investAmount: this.container.data("invest-amount"),
                investShares: this.container.data("invest-shares"),
                interest: this.container.data("interest"),
                interestGained: this.container.data("interest-gained"),
                termsLeft: this.container.data("terms-left"),
                termsInTotal: this.container.data("terms-in-total"),
                availableShares: this.container.data("available-shares"),
                valuePerShare: this.container.data("value-per-share"),
                interestPerShare: this.container.data("interest-per-share"),
                principalPerShare: this.container.data("principal-per-share"),
                repaymentsPerShare: this.container.data("repayments-per-share"),
                fee: this.container.data("fee")
            }, ret.value = a._fixedFloat2(ret.valuePerShare * ret.availableShares), ret.summary = a._fixedFloat2(ret.value - ret.fee), ret
        }
    }), new f.List({
        name: "repaying-list",
        api: e.API.getUserLoansRepaying,
        title: !0,
        pagination: !0,
        rendered: function() {
            this.container.children("li.ui-list-item").each(function(a, c) {
                new i({
                    container: b(c)
                }).init()
            })
        }
    }).init(d.loadJSON("#repaying-list-rsp", !0)), new f.Tab({
        name: "loans",
        switched: function(a, b, c) {
            return c ? !0 : ("repaid" == b && new f.List({
                name: "repaid-list",
                api: e.API.getUserLoansRepaid,
                title: !0,
                pagination: !0
            }).init()._update(), "investing" == b && new f.List({
                name: "investing-list",
                api: e.API.getUserLoansInProgress,
                title: !0,
                pagination: !0
            }).init()._update(), "transferred-out" == b && g.ListFactory.create("transferred-out", "transferred-out-list").init()._update(), !0)
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