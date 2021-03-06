define("pages/account/account/userbasic", ["jquery", "widgets/widgets", "dialog"], function(a) {
    var b = a("jquery"),
        c = a("widgets/widgets"),
        d = a("dialog"),
        e = c.Form;
    b(function() {
        var a = b("#userInfoForm"),
            c = a.clone();
        c.find("input,select,a.photo").each(function() {
            if ("radio" == this.type) this.value = "", this.checked || b(this).parent("em").remove(), b(this).remove();
            else if ("submit" == this.type || "hidden" == this.type) b(this).remove();
            else if ("A" == this.tagName.toUpperCase() && "modUserPhoto" == this.id) b(this).attr("href", "#");
            else {
                var a = b(this).val();
                b(this).after(a).remove()
            }
        }), a.hide().after(c), b("#modiForm").click(function() {
            "修改信息" != b(this).text() ? (c.show(), a.hide(), b(this).html("修改信息")) : (c.hide(), a.show(), b(this).html("取消修改"))
        }), new d({
            trigger: "#modUserPhoto",
            width: "550px",
            height: /msie 6/i.test(navigator.userAgent) ? "550px" : "220px"
        }).before("show", function() {
            this.set("content", this.activeTrigger.attr("href"))
        }).after("hide", function() {}), e.validate({
            validateData: {
                submitHandler: function(a) {
                    e.ajaxSubmit(b(a), {
                        msgafter: "#" + b(a).find("input[type='submit']")[0].id,
                        success: function(a) {
                            this.msg(a.message, "warn"), 0 === a.status && setTimeout(function() {
                                location.reload()
                            }, 1500)
                        }
                    })
                }
            }
        })
    })
});