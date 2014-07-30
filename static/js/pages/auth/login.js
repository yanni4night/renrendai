define("pages/auth/login", ["jquery", "widgets/widgets", "handlebars", "mailSuggest"], function(a) {
    var b = a("jquery"),
        c = a("widgets/widgets"),
        d = a("handlebars"),
        e = a("mailSuggest");
    b(function() {
        function a(a) {
            var c = b("#j_username"),
                d = {};
            d.left = c.offset().left, d.top = 215, a.css({
                left: d.left,
                top: d.top,
                absolute: "position"
            })
        }

        function f(a, c) {
            var d = j.find(".cur"),
                e = d.index(),
                f = j.find("li").length;
            "down" == c ? (e++, e > f - 1 && (e = 0), j.find("li").removeClass("cur").eq(e).addClass("cur")) : "up" == c ? (e--, 0 > e && (e = f - 1), j.find("li").removeClass("cur").eq(e).addClass("cur")) : "enter" == c && (a.val(d.text()).blur(), j.hide(), b("#J_pass_input").trigger("focus"))
        }
        var g = c.Form,
            h = new e,
            i = b("#j_username"),
            j = b('<div class="suggest" id="suggest"></div>').appendTo(b("body"));
        b("#rememberme").length && g.ui.init(), a(j);
        var k = b("#email-suggest-template").html(),
            l = d.compile(k);
        g.validate({
            target: "#login",
            before: function() {
                g.randImage(), b("#refreshCode").click(function() {
                    b("#randImage").trigger("click")
                })
            },
            inputTheme: !0,
            showSingleError: !0,
            validateData: {
                onkeyup: !1,
                showErrors: function(a, c) {
                    var d = b("#allError");
                    d.length ? (b("#login").find("input").each(function() {
                        b(this).removeClass("error")
                    }), d.html(""), c.length && (d.html(c[0].message), b(c[0].element).addClass("error"))) : this.defaultShowErrors()
                },
                submitHandler: function(a) {
                    a.submit()
                }
            }
        }), i.on("keyup", function(c) {
            a(j);
            var d = b(this).val();
            switch (c.keyCode) {
                case 38:
                    f(b(this), "up");
                    break;
                case 40:
                    f(b(this), "down");
                    break;
                case 13:
                    f(b(this), "enter");
                    break;
                default:
                    if (!d.length) return void j.hide();
                    var e = h.run(d);
                    /^\d{1,}$/g.test(d) && (e.remove = !0);
                    var g = l(e);
                    j.html(g).show().find("li").eq(0).addClass("cur")
            }
        }).on("keydown", function(a) {
            13 == a.keyCode && a.preventDefault()
        }).on("focusout", function() {
            setTimeout(function() {
                j.hide()
            }, 500)
        }), b(window).on("resize", function() {
            a(j)
        }), j.on("mouseenter", "li", function() {
            b(this).addClass("cur")
        }).on("mouseleave", "li", function() {
            b(this).removeClass("cur").siblings().removeClass("cur")
        }).on("click", "li", function() {
            f(i, "enter"), b("#J_pass_input").trigger("focus")
        }), b("#randCode").keyup(function() {
            var a = b(this).val();
            a.length && b.get("/account/checkCode.action?j_code=" + a + "&code=" + a, function(a) {
                "true" == a.result ? (b(".validCode").show(), b("#allError").hide()) : (b(".validCode").hide(), b("#allError").show())
            })
        }), b(".partner").length && b(".partner").hover(function() {
            b(this).addClass("hover")
        }, function() {
            b(this).removeClass("hover")
        }), b("body")[0].scrollTop = 0
    })
});