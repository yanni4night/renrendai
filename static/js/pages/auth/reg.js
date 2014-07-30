define("pages/auth/reg", ["jquery", "widgets/widgets", "tip"], function(a) {
    var b = a("jquery");
    window.parent != window && (window.top.location.href = location.href), b(function() {
        function c() {
            b(".ui-step li").eq(0).removeClass("ui-step-done").addClass("ui-step-active"), b(".ui-step li").eq(1).removeClass("ui-step-active"), b("#randCode").val(""), b("#randImage").trigger("click"), b(".validCode").hide(), b("#step1").show(), b("#step2").hide()
        }

        function d() {
            b(".ui-step li").eq(0).removeClass("ui-step-active").addClass("ui-step-done"), b(".ui-step li").eq(1).addClass("ui-step-active"), b("#mobileCode").val(""), b("#code-label").hide(), b("#step1").hide(), b("#step2").show();
            var a = b("#reg").find("input").not("input[type='submit']").filter(function() {
                    return "radio" != this.type || "radio" == this.type && this.checked
                }),
                c = "";
            a.each(function() {
                c += "<input type='hidden' name='" + b(this).attr("name") + "' value='" + b(this).val() + "' />"
            }), b("#hiddeninputs").html(c);
            var d = b("#getMobileCode");
            d.data("mobile") != b("input[name='username']").val() && (d.removeAttr("disabled"), j.clear()), d.is(":disabled") || d.trigger("click"), d.data("mobile", b("#userMobile").text())
        }

        function e(a, b) {
            a.length && (b ? a.removeAttr("disabled").removeClass("ui-button-disabled") : a.attr("disabled", "disabled").addClass("ui-button-disabled"))
        }
        var f = a("widgets/widgets"),
            g = f.Form,
            h = f.pswLevel;
        Tip = a("tip");
        var i, j, k = b(".psw-range div");
        g.ui.init(), b("#password").on("keyup", function() {
            var a = b(this).val(),
                c = h(a);
            switch (c.level) {
                case "强":
                    k.removeClass().addClass("high");
                    break;
                case "中":
                    k.removeClass().addClass("mid");
                    break;
                case "弱":
                    k.removeClass().addClass("low")
            }
            k.show()
        }).on("blur", function() {}), b("#usertype").on("click", "li", function() {
            var a = b(this).index();
            b(this).addClass("cur").siblings().removeClass("cur"), b("input[name = 'intention']").eq(a).trigger("click"), b("label[for='intention']").addClass("valid").html("")
        }), b("#gostep1").click(function(a) {
            c(), a.preventDefault()
        }), b("#setIdForm").length && g.validate({
            target: "#setIdForm",
            validateData: {
                submitHandler: function(a) {
                    g.ajaxSubmit(b(a), {
                        msgafter: "#" + b(a).find("input[type='submit']")[0].id,
                        before: function() {
                            this.msg("正在验证，请稍后...")
                        },
                        success: function(a) {
                            if (this.msg(a.message, "warn"), 0 === a.status) {
                                b(".auth").hide(), b(".authSuccess").show();
                                var c = b("#second"),
                                    d = 5,
                                    e = setInterval(function() {
                                        c.html(d), 0 >= d ? (document.location = "/account/index.action", clearInterval(e)) : d--
                                    }, 1e3)
                            }
                        }
                    })
                }
            }
        }), g.validate({
            target: "#mobileCodeForRegForm",
            validateData: {
                submitHandler: function(a) {
                    var c = b("#mobileCode").val(),
                        d = b("#userMobile").text();
                    b.get("/account/checkCode.action?mobileCode=" + c + "&code=" + c + "&mobile=" + d, function(c) {
                        "false" == c.result ? b("#code-label").show() : (b("#code-label").hide(), a.submit())
                    })
                }
            }
        }), g.validate({
            target: "#reg",
            showTip: b("#reg").data("showtip") === !0 ? !0 : !1,
            before: function() {
                i = g.sendPhoneCode("phone", "getVoiceCode", "/sendPhoneCode!voiceCode.action?&checkCode=reg&phone=", {
                    onStart: function() {
                        e(b("#getMobileCode"), !1)
                    },
                    onClear: function() {
                        e(b("#getMobileCode"), !0)
                    }
                }), j = g.sendPhoneCode("phone", "getMobileCode", "/sendPhoneCode.action?&checkCode=reg&phone=", {
                    onStart: function() {
                        e(b("#getVoiceCode"), !1)
                    },
                    onClear: function() {
                        e(b("#getVoiceCode"), !0)
                    }
                }), g.randImage(), b("#refreshCode").click(function() {
                    b("#randImage").trigger("click")
                })
            },
            inputTheme: !0,
            showSingleError: !0,
            validateData: {
                ignore: ".ignore",
                success: function(a) {
                    "nickName" == a.attr("for") && a.html("此昵称将用作展示，一旦注册成功不能修改"), "phone" == a.attr("for") && a.html("请保持手机畅通，以便完成手机信息验证"), a.addClass("valid")
                },
                submitHandler: function(a) {
                    g.ajaxSubmit(b(a), {
                        msgafter: "#" + b(a).find("input[type='submit']")[0].id,
                        success: function(a) {
                            0 === a.status ? (b("#userMobile").html(a.data.username), d()) : this.msg(a.message, "warn")
                        }
                    })
                }
            }
        }), !document.all && document.querySelector && (g.checkCode({
            ele: b("#randCode"),
            data: {
                code: function() {
                    return b("#randCode").val()
                }
            },
            success: function() {
                b(".validCode").show()
            },
            failed: function() {
                b(".validCode").hide()
            }
        }), g.checkCode({
            ele: b("#mobileCode"),
            data: {
                code: function() {
                    return b("#mobileCode").val()
                },
                mobile: function() {
                    return b("#phone").val()
                }
            }
        })), b("#randCode").on("blur", function() {
            b("#code-error").hasClass("valid") ? b(".validCode").show() : b(".validCode").hide()
        }), b("#reg-tab").length && new f.Tab({
            name: "reg",
            switched: function(a, b) {
                return !0
            }
        }).init(), b("body")[0].scrollTop = 0
    })
});