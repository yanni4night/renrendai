define("pages/account/invest/auto", ["jquery", "common", "dialog", "widgets/widgets"], function(a) {
    var b = a("jquery"),
        c = a("common"),
        d = a("dialog"),
        e = a("widgets/widgets"),
        f = e.Form;
    b(function() {
        function a(a) {
            var c = Number(b("#ten_value").val()) || 0;
            "add" == a ? c += 50 : "sub" == a && (c -= 50, 200 >= c && (c = 200)), b("#ten_value").val(c)
        }
        b(".addorsub").click(function() {
            var c = b(this).data("type");
            a(c)
        }), b(".closeAuto").click(function(a) {
            var d = b(this).text();
            return confirm("您确定" + d + "功能？") && b.get(b(this).attr("href"), function(a) {
                c.showMessage(a.message, function() {
                    0 === a.status && location.reload()
                })
            }), a.preventDefault(), !1
        }), new d({
            trigger: "#selfType",
            width: "650px",
            content: b("#selfTypeBox")
        }), new d({
            trigger: "#oneKeyType",
            width: "650px",
            content: b("#oneKeyTypeBox")
        }), b("form").submit(function(a) {
            var c = b(this);
            f.ajaxSubmit(c, {
                msgafter: "#" + c.find("input[type='submit']")[0].id,
                success: function(a) {
                    this.msg(a.message, "warn"), 0 === a.status && setTimeout(function() {
                        location.reload()
                    }, 2e3)
                }
            }), a.preventDefault()
        })
    })
});