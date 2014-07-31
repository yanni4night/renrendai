define("pages/account/invest/plan", ["jquery", "common", "protocol", "widgets/widgets", "components/components"], function(a) {
    var b = a("jquery"),
        c = a("common"),
        d = a("protocol"),
        e = a("widgets/widgets"),
        f = a("components/components"),
        g = b("#fee-in-total").data("value");
    b("#fee-in-total").text(d.translator._fixedFloat2(g));
    var h = b("#pg-helper-plan-id").text(),
        i = b("#pg-helper-plan-sub-point-id").text(),
        j = b("#pg-helper-gain-manner").text(),
        k = function(a) {
            b.extend(this, {
                container: a.container
            }), this._ui = {
                switcher: this._elem("details"),
                box: this._elem("details-box")
            }, this.loanId = this.container.data("loan-id")
        };
    b.extend(k.prototype, {
        init: function() {
            var a = this,
                b = this._ui;
            return b.switcher.click(function() {
                b.switcher.hasClass("active") ? (b.switcher.removeClass("active"), b.box.hide()) : ("initialized" != b.box.data("status") && a._initDetails(), b.switcher.addClass("active"), b.box.show())
            }), this
        },
        _initDetails: function() {
            new e.List({
                template: b("#transferred-out-details-template"),
                name: "transferred-out-details-" + this.loanId,
                api: d.API.getUserTransferredOutRecords,
                title: !0,
                pagination: !0,
                params: {
                    loanId: this.loanId,
                    subPointId: i
                }
            }).init()._update({
                loanId: this.loanId,
                subPointId: i
            })
        },
        _elem: function(a) {
            return this.container.find('[data-name="' + a + '"]')
        }
    }), new e.List({
        name: "plan-records",
        api: d.API.getUserPlanRecords,
        title: !0,
        pagination: !0,
        rendered: function() {
            this.container.children("li.ui-list-item").each(function(a, c) {
                new k({
                    container: b(c)
                }).init()
            })
        },
        params: {
            financeId: h,
            subPointId: i
        }
    }).init(c.loadJSON("#plan-records-rsp", !0));
    var l = function(a) {
        b.extend(this, {
            container: a.container,
            handler: null,
            _ui: {}
        }), this._ui.button = this.container.children("a")
    };
    b.extend(l.prototype, {
        init: function() {
            var a = this,
                b = this._ui;
            return b.button.hasClass("quit-enabled") && (c.constant.QUIT_PLAN_DISABLED ? (b.button.removeClass("quit-enabled"), b.button.removeClass("cursor-pointer"), b.button.addClass("cursor-default")) : (a.handler = new f.PlanQuitHandler({
                planName: a.container.data("plan-name"),
                subPointId: a.container.data("sub-point-id"),
                finalAmount: a.container.data("final-amount")
            }).init(), b.button.hover(function() {
                b.button.text("退出")
            }, function() {
                b.button.text("开放期")
            }), b.button.click(function() {
                a.handler.start()
            }))), this
        }
    });
    var m = function(a) {
        b.extend(this, {
            container: a.container,
            _manner: j
        }), this._ui = {
            switcher: this._elem("ph-switcher"),
            box: this._elem("ph-box"),
            bankBox: this._elem("ph-bank-box"),
            bankPasswordBox: this._elem("ph-bank-password-box"),
            radios: this.container.find('input[name="cashTypeStr"]'),
            submit: this._elem("ph-submit"),
            cancel: this._elem("ph-cancel"),
            hint: this._elem("ph-hint"),
            form: this._elem("ph-form"),
            bankAccount: this._elem("ph-bank-account"),
            bankPassword: this._elem("ph-bank-password")
        }
    };
    b.extend(m.prototype, {
        init: function() {
            var a = this,
                e = this._ui;
            return c.fillTemplate({
                container: b("#bank-accounts"),
                template: b("#bank-accounts-template"),
                data: d.translator.translate(d.API.getUserBankInfo, c.loadJSON("#bank-accounts-rsp", !0).data)
            }), e.bankAccount.val() || e.bankPasswordBox.hide(), e.switcher.click(function() {
                e.switcher.hasClass("editing") ? (e.switcher.removeClass("editing"), e.switcher.text("更改"), e.box.hide()) : (a.reset(), e.switcher.addClass("editing"), e.switcher.text("收起"), e.box.show())
            }), e.cancel.click(function() {
                e.switcher.removeClass("editing"), e.switcher.text("更改"), e.box.hide()
            }), e.radios.change(function() {
                "BANK" == b(this).val() ? e.bankBox.show() : e.bankBox.hide()
            }), e.form.submit(function() {
                var b = a.container.find('input[name="cashTypeStr"]:checked').val();
                return "BANK" != b || e.bankAccount.val() && e.bankPassword.val() ? !0 : !1
            }), this
        },
        reset: function() {
            this._checkRadio(this._manner)
        },
        _elem: function(a) {
            return this.container.find('[data-name="' + a + '"]')
        },
        _checkRadio: function(a) {
            this.container.find('input[name="cashTypeStr"][value="' + a + '"]').prop("checked", !0).attr("checked", "checked").change()
        }
    }), new m({
        container: b("#plan-summary")
    }).init(), new l({
        container: b("#status-button")
    }).init()
});