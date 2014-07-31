define("pages/account/invest/plans", ["jquery", "common", "protocol", "widgets/widgets", "components/components", "dialog", "handlebars"], function(a) {
    function b(a) {
        var b = d("#confirm-pay-template").html(),
            c = j.compile(b),
            e = c(a),
            f = new i({
                width: "580px"
            }).before("show", function() {
                this.set("content", e)
            }).after("hide", function() {
                f.element.remove()
            }).show();
        k.ui.init(), k.validate({
            target: "#accontRsvConfirm",
            validateData: {
                submitHandler: function(a) {
                    if ("BANK" == d("input[name='cashTypeStr']:checked").val()) {
                        if (!d.trim(d("#txPsw").val())) return void d("#pswMsg").html("提现密码不能为空");
                        d("#pswMsg").empty()
                    }
                    a.submit()
                }
            }
        }), d("#closeDialog").unbind().on("click", function() {
            d(".ui-dialog-close").trigger("click")
        }), d("#J_conform_pay_div").unbind("click").on("click", 'input[name="cashTypeStr"]', function() {
            "BANK" == d(this).val() ? (d(this).parent().siblings("select").html(m.html()).show(), "-1" != d(this).parent().siblings("select").val() ? d(this).parent().siblings("#J_TX_pass").show() : d(this).parent().siblings("#J_a_addbank").show()) : (d(this).parent().siblings("select").hide(), d(this).parent().siblings("#J_TX_pass").hide(), d(this).parent().siblings("#J_a_addbank").hide(), d("#pswMsg").empty())
        })
    }

    function c(a) {
        var b = RegExp("[?&]" + a + "=([^&]*)").exec(window.location.search);
        return b && decodeURIComponent(b[1].replace(/\+/g, " "))
    }
    var d = a("jquery"),
        e = a("common"),
        f = a("protocol"),
        g = a("widgets/widgets"),
        h = a("components/components"),
        i = a("dialog"),
        j = a("handlebars"),
        k = g.Form,
        l = function(a) {
            d.extend(this, {
                container: a.container,
                subPointid: "",
                handler: null,
                dialogExitExecution: null,
                dialogExit: null,
                _ui: {}
            })
        };
    d.extend(l.prototype, {
        init: function() {
            var a = this,
                b = this._ui;
            b.btn = a._elem("quit"), b.btn.length > 0 && (a.handler = new h.PlanQuitHandler({
                planName: a.container.data("plan-name"),
                subPointId: a.container.data("sub-point-id"),
                finalAmount: a.container.data("final-amount")
            }).init(), e.constant.QUIT_PLAN_DISABLED && (b.btn.removeClass("cursor-pointer"), b.btn.addClass("quit-disabled")), b.btn.click(function() {
                e.constant.QUIT_PLAN_DISABLED || a.handler.start("exit")
            }))
        },
        _elem: function(a) {
            return this.container.find('[data-name="' + a + '"]')
        }
    }), new g.List({
        name: "holding-list",
        api: f.API.getUserHoldingPlans,
        title: !0,
        pagination: !0,
        rendered: function() {
            this.container.children("li.ui-list-item").each(function(a, b) {
                new l({
                    container: d(b)
                }).init()
            }), e.initPoptips(this.container)
        }
    }).init(e.loadJSON("#holding-list-rsp", !0)), new g.Tab({
        name: "plans",
        switched: function(a, b, c) {
            return c ? !0 : ("exiting" == b && new g.List({
                name: "exiting-list",
                api: f.API.getUserExitingPlans,
                title: !0,
                pagination: !0
            }).init()._update(), "exited" == b && new g.List({
                name: "exited-list",
                api: f.API.getUserExitedPlans,
                title: !0,
                pagination: !0,
                rendered: function() {
                    e.initPoptips(this.container)
                }
            }).init()._update(), "reserve" == b && new g.List({
                name: "reserve-list",
                api: f.API.getUserReservePlans,
                title: !0,
                pagination: !0,
                rendered: function() {
                    e.initPoptips(this.container)
                }
            }).init()._update(), !0)
        }
    }).init(), d("body").on("click", ".list-a-pay", function(a) {
        a.preventDefault(), d.get("/account/invest!detailPlanRsv.action?financeId=" + d(this).data("id"), function(a) {
            if (1 === a.status) return void alert(a.message);
            var c = a.data.financePayDetail;
            c.joinFee = c.joinFee ? c.joinFee : 0, c.expectedRate = c.expectedRate, c.planAmount = f.translator._commaFloat(c.planAmount), c.unRepayAmountComma = f.translator._commaFloat(c.unRepayAmount), c.unRepayAmountNotComma = c.unRepayAmount, c.availablePoints = f.translator._commaFloat(c.availablePoints), b(c)
        })
    });
    var m = d("<div class='fn-hide'></div>").appendTo(d("body"));
    e.fillTemplate({
        container: m,
        template: d("#bank-accounts-template"),
        data: f.translator.translate(f.API.getUserBankInfo, e.loadJSON("#bank-accounts-rsp", !0).data)
    }), d("#J_imm_pay_a").length && d("#J_imm_pay_a").click(function(a) {
        d("#plans-tab li:last").trigger("click"), a.preventDefault()
    }), ("RESERVATIONS" == d("#pg-helper-tab-jumpping").text() || "reservations" == c("tab")) && d("#plans-tab li:last").trigger("click")
});