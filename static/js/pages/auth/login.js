define("pages/auth/login", ["jquery", "widgets/widgets", "handlebars", "mailSuggest"], function(require) {
    var $ = require("jquery"),
        Widgets = require("widgets/widgets"),
        d = require("handlebars"),
        e = require("mailSuggest");

    function a(a) {
        var c = $("#j_username"),
            d = {};
        d.left = c.offset().left;
        d.top = 245;
        a.css({
            left: d.left,
            top: d.top,
            position: "absolute"
        })
    }

    function f(a, c) {
        var d = $suggest.find(".cur"),
            e = d.index(),
            f = $suggest.find("li").length;
        "down" == c ? (e++, e > f - 1 && (e = 0), j.find("li").removeClass("cur").eq(e).addClass("cur")) : "up" == c ? (e--, 0 > e && (e = f - 1), j.find("li").removeClass("cur").eq(e).addClass("cur")) : "enter" == c && (a.val(d.text()).blur(), j.hide(), $("#J_pass_input").trigger("focus"))
    }


    var Form = Widgets.Form,
        h = new e,
        i = $("#j_username"),
        j = $suggest = $('<div class="suggest" id="suggest"></div>').appendTo($("body"));

    $("#rememberme").length && Form.ui.init();

    a($suggest);

    var k = $("#email-suggest-template").html(),
        l = d.compile(k);

    Form.validate({
        target: "#login",
        before: function() {
            Form.randImage();

            $("#refreshCode").click(function() {
                $("#randImage").trigger("click");
            })
        },
        inputTheme: true,
        showSingleError: true,
        validateData: {
            onkeyup: false,
            showErrors: function(a, c) {
                var d = $("#allError");
                if (d.length) {
                    $("#login").find("input").each(function() {
                        $(this).removeClass("error")
                    });
                    d.html("");
                    c.length && (d.html(c[0].message), $(c[0].element).addClass("error"));
                } else {
                    this.defaultShowErrors()
                }
            },
            submitHandler: function(a) {
                Form.ajaxSubmit($(a), {
                    msgafter: "#allError",
                    success: function(data) {
                        console.log(data);
                        data = 'string' === typeof data ? $.parseJSON(data) : data;
                        if (0 == data.status) {
                            return location.href = '/account/index';
                        } else {
                            this.msg(data.statusText||"操作异常",'warn');
                            $('#captcha-wra').toggleClass('fn-hide', !(data.data && data.data.needCaptcha));
                        }
                    }
                });
            }
        }
    });

    i.on("keyup", function(c) {
        a($suggest);
        var d = $(this).val();
        switch (c.keyCode) {
            case 38:
                f($(this), "up");
                break;
            case 40:
                f($(this), "down");
                break;
            case 13:
                f($(this), "enter");
                break;
            default:
                if (!d.length) return void $suggest.hide();
                var e = h.run(d);
                /^\d{1,}$/g.test(d) && (e.remove = !0);
                var g = l(e);
                $suggest.html(g).show().find("li").eq(0).addClass("cur")
        }

    }).on("keydown", function(a) {
        13 == a.keyCode && a.preventDefault();
    }).on("focusout", function() {
        setTimeout(function() {
            $suggest.hide();
        }, 500);
        var d = $(this).val();
        $.getJSON('/login/checkNeedCaptcha?userid=' + $.trim(d)).done(function(ret) {
            ret = 'string' === typeof ret ? $.parseJSON(ret) : ret;
            $('#captcha-wra').toggleClass('fn-hide', !(ret && ret.data & ret.data.needCaptcha));
        });
    });

    $(window).on("resize", function() {
        a($suggest);
    });

    $suggest.on("mouseenter", "li", function() {
        $(this).addClass("cur")
    }).on("mouseleave", "li", function() {
        $(this).removeClass("cur").siblings().removeClass("cur")
    }).on("click", "li", function() {
        f(i, "enter"), $("#J_pass_input").trigger("focus")
    });

    /*   $("#randCode").keyup(function() {
        var a = $(this).val();
        a.length && b.get("/account/checkCode.action?j_code=" + a + "&code=" + a, function(a) {
            "true" == a.result ? ($(".validCode").show(), $("#allError").hide()) : ($(".validCode").hide(), $("#allError").show())
        })
    });*/

    $(".partner").length && $(".partner").hover(function() {
        $(this).addClass("hover")
    }, function() {
        $(this).removeClass("hover")
    });

    $("body")[0].scrollTop = 0;
});