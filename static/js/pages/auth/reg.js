define("pages/auth/reg", ["jquery", "widgets/widgets", "tip"], function(require) {
    var $ = require("jquery");
    if (window.parent != window) {
        window.top.location.href = location.href;
    }

    /* function toFirstStep() {
        $(".ui-step li").eq(0).removeClass("ui-step-done").addClass("ui-step-active"), $(".ui-step li").eq(1).removeClass("ui-step-active"), $("#randCode").val(""), $("#randImage").trigger("click"), b(".validCode").hide(), b("#step1").show(), b("#step2").hide()
    }*/

    function d() {
        $(".ui-step li").eq(0).removeClass("ui-step-active").addClass("ui-step-done"), $(".ui-step li").eq(1).addClass("ui-step-active"), $("#mobileCode").val(""), $("#code-label").hide(), b("#step1").hide(), b("#step2").show();
        var a = $("#reg").find("input").not("input[type='submit']").filter(function() {
                return "radio" != this.type || "radio" == this.type && this.checked
            }),
            c = "";
        a.each(function() {
            c += "<input type='hidden' name='" + $(this).attr("name") + "' value='" + b(this).val() + "' />"
        }), $("#hiddeninputs").html(c);
        var d = $("#getMobileCode");
        d.data("mobile") != $("input[name='username']").val() && (d.removeAttr("disabled"), j.clear()), d.is(":disabled") || d.trigger("click"), d.data("mobile", $("#userMobile").text())
    }

    function e(a, b) {
        a.length && (b ? a.removeAttr("disabled").removeClass("ui-button-disabled") : a.attr("disabled", "disabled").addClass("ui-button-disabled"))
    }
    var Widgets = require("widgets/widgets"),
        Form = Widgets.Form,
        getPswLevelFunc = Widgets.pswLevel,
        Tip = require("tip");
    var i, j, $pwdLevel = $(".psw-range div");

    Form.ui.init();

    $("#password").on("keyup", function() {
        var pwd = $(this).val(),
            c = getPswLevelFunc(pwd);
        switch (c.level) {
            case "强":
                $pwdLevel.removeClass().addClass("high");
                break;
            case "中":
                $pwdLevel.removeClass().addClass("mid");
                break;
            case "弱":
                $pwdLevel.removeClass().addClass("low");
        }
        $pwdLevel.show();
    }).on("blur", function() {});

    //我要理财，我要借款
    $("#usertype").on("click", "li", function() {
        var idx = $(this).index();
        $(this).addClass("cur").siblings().removeClass("cur");
        $("input[name = 'role']").eq(idx).trigger("click");
        $("label[for='role']").addClass("valid").empty();
    });

    //回第一步
    /*$("#gostep1").click(function(e) {
        toFirstStep();
        e.preventDefault()
    });*/
    //貌似没用
    /*    if ($("#setIdForm").length) {
        Form.validate({
            target: "#setIdForm",
            validateData: {
                submitHandler: function(a) {
                    Form.ajaxSubmit($(a), {
                        msgafter: "#" + $(a).find("input[type='submit']")[0].id,
                        before: function() {
                            this.msg("正在验证，请稍后...");
                        },
                        success: function(a) {
                            if (this.msg(a.message, "warn"), 0 === a.status) {
                                b(".auth").hide(), b(".authSuccess").show();
                                var c = $("#second"),
                                    d = 5,
                                    e = setInterval(function() {
                                        c.html(d), 0 >= d ? (document.location = "/account/index.action", clearInterval(e)) : d--
                                    }, 1e3)
                            }
                        }
                    })
                }
            }
        });
    }*/
    //发短信验证码表单，准备废弃
    /*
    Form.validate({
        target: "#mobileCodeForRegForm",
        validateData: {
            submitHandler: function(a) {
                var c = $("#mobileCode").val(),
                    d = $("#userMobile").text();
                $.get("/account/checkCode.action?mobileCode=" + c + "&code=" + c + "&mobile=" + d, function(c) {
                    "false" == c.result ? $("#code-label").show() : ($("#code-label").hide(), a.submit())
                })
            }
        }
    });*/

/*    $('#yn-getsms').click(function(e) {
        e.preventDefault();
       
    });
*/    Form.sendPhoneCode("phone", "yn-getsms");
    //注册表单
    Form.validate({
        target: "#reg",
        showTip: $("#reg").data("showtip") === true,
        before: function() {
            /*
            i = Form.sendPhoneCode("phone", "getVoiceCode", "/sendPhoneCode!voiceCode.action?&checkCode=reg&phone=", {
                onStart: function() {
                    e($("#getMobileCode"), false);
                },
                onClear: function() {
                    e($("#getMobileCode"), true);
                }
            });

            j = Form.sendPhoneCode("phone", "getMobileCode", "/sendPhoneCode.action?&checkCode=reg&phone=", {
                onStart: function() {
                    e($("#getVoiceCode"), false);
                },
                onClear: function() {
                    e($("#getVoiceCode"), true);
                }
            })*/
            /*, Form.randImage(),$("#refreshCode").click(function() {
                $("#randImage").trigger("click")
            })*/
            ;
        },
        inputTheme: true,
        showSingleError: true,
        validateData: {
            ignore: ".ignore",
            debug: false,
            onsubmit: true,
            success: function(a) {
                "nickName" == a.attr("for") && a.html("此昵称将用作展示，一旦注册成功不能修改");
                "username" == a.attr("for") && a.html("请保持手机畅通，以便完成手机信息验证");
                a.addClass("valid");
            },
            submitHandler: function(a) {
                Form.ajaxSubmit($(a), {
                    msgafter: "#" + $(a).find("input[type='submit']").attr('id'),
                    success: function(a) {
                        if (0 === a.status) {
                            //TODO
                            alert('注册成功');
                            location.href = '/loginPage';
                            //(b("#userMobile").html(a.data.username), d())
                        } else {
                            this.msg(a.message||"注册失败", "warn");
                        }
                    }
                })
            }
        }
    });

    if (!document.all && document.querySelector) {
        /*Form.checkCode({
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
        }),*/
        /*        Form.checkCode({
            ele: $("#mobileCode"),
            data: {
                code: function() {
                    return $("#mobileCode").val();
                },
                mobile: function() {
                    return $("#phone").val();
                }
            }
        });*/
        //随机码
        /*        $("#randCode").on("blur", function() {
            $("#code-error").hasClass("valid") ? $(".validCode").show() : $(".validCode").hide()
        });
*/
    };

    $("#reg-tab").length && new Widgets.Tab({
        name: "reg",
        switched: function(a, b) {
            return true;
        }
    }).init();

    $("body")[0].scrollTop = 0;
});