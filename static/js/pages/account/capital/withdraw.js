define("pages/account/capital/withdraw", ["jquery", "dialog", "handlebars", "tip", "common", "widgets/widgets"], function(a) {
    var b = a("jquery"),
        c = a("dialog"),
        d = a("handlebars"),
        e = a("tip"),
        f = a("common"),
        g = a("widgets/widgets"),
        h = g.Form;
    b(function() {
        function a() {
            var a = b("#moreBank"),
                c = b("#banklis"),
                d = a.data("toggle").split(/\s+/),
                e = d[0],
                f = d[1];
            if (a.length) {
                var g = c.height();
                a.click(function() {
                    /more-hide/.test(a[0].className) ? (c.css("height", "auto"), a.html(f), b(this).removeClass("more-hide").addClass("more-show")) : (c.css("height", g + "px"), a.html(e), b(this).removeClass("more-show").addClass("more-hide"))
                })
            }
        }

        function g() {
            var a = b("#withdrawAmount").val();
            if (0 >= a) return b("#withdrawFee").html("0.00"), void b("#withdrawReal").html("0.00");
            var c = "cashDraw";
            b.ajax({
                url: "/my/getCashFee.action?amount=" + a + "&type=" + c,
                cache: !1,
                dataType: "json",
                timeout: 1e4,
                success: function(a) {
                    b("#totalAmount").val(h.comma(a.balance)), b("#withdrawFee").html(h.comma(a.fe)), b("#withdrawReal").html(h.comma(a.cal))
                }
            })
        }
        b("#bankList").on("click", "li.bankli", function() {
            b("#bankList ul li").removeClass("checked"), b(this).addClass("checked"), b("#userBankId").val(b(this).data("bank")).keyup()
        });
        var i = b("#withdraw-list-rsp").html();
        i = b.parseJSON(i), i.data.userBanks.length <= 3 && b("#moreBank").hide();
        var j = b("#withdraw-list-template").html(),
            k = d.compile(j),
            l = k(i.data);
        b("#banklis").html(l), h.validate({
            before: function() {
                jQuery.validator.addMethod("isEnough", function(a, c) {
                    return this.optional(c) || parseFloat(b("#totalAmount").val()) >= 0
                }, h.err.required)
            },
            validateData: {
                submitHandler: function(a) {
                    h.ajaxSubmit(b(a), {
                        msgafter: "#subWithdraw",
                        success: function(a) {
                            this.msg(a.message, "warn"), 0 === a.status && f.showMessage(a.message, function() {
                                location.reload()
                            })
                        }
                    })
                }
            }
        }), a(), new c({
            trigger: ".addBank",
            width: "650px"
        }).before("show", function() {
            this.set("content", this.activeTrigger.attr("href"))
        }).after("hide", function() {}), new e({
            element: "#tipCon",
            trigger: "#tips",
            direction: "right"
        }), b("#withdrawAmount").keyup(function() {
            g()
        })
    })
});