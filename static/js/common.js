define("common", ["jquery", "dialog", "protocol", "handlebars"], function(a, b, c) {
    var d = a("jquery"),
        e = a("dialog"),
        f = a("protocol"),
        g = a("handlebars"),
        h = {
            QUIT_PLAN_DISABLED: !1
        },
        i = function() {
            d.extend(this, {
                constant: h
            })
        };
    d.extend(i.prototype, {
        isIE6: function() {
            var a = (window.navigator.userAgent || "").toLowerCase();
            return -1 !== a.indexOf("msie 6")
        },
        loadJSON: function(a, b) {
            "string" == typeof a && (a = d(a));
            var c = d.trim(a.html()),
                e = d.parseJSON(c);
            return b || a.remove(), e
        },
        fillTemplate: function(a) {
            var b = a.data,
                c = a.template,
                e = a.container || null,
                h = a.api,
                i = a.isResponse || !1;
            if (b || (b = {}), b instanceof d) {
                if (b = d.trim(b.html()), !b) throw "Common: cannot fill empty data.";
                b = d.parseJSON(b)
            }
            i && (b = b.data), b = h ? f.translator.translate(h, b) : b;
            var j = c.html(),
                k = g.compile(j),
                l = k(b);
            return e && e.append(l), l
        },
        showMessage: function(a, b, c) {
            var f, g = d("#dialog-message");
            g.length < 1 || (a = "string" == typeof a ? {
                message: a
            } : a, f = j.fillTemplate({
                template: g,
                data: a
            }), this.isIE6() ? (d(".pg-container-content").prepend(f), d(".ui-message-close-button").click(function() {
                d(".ui-message-content").remove()
            })) : new e({
                content: f
            }).after("hide", function() {
                this.destroy(), b && d.isFunction(b) && b.call(this)
            }).after("show", function() {
                var a = this;
                d(".ui-message-close-button").click(function() {
                    a.hide()
                }), c && d.isFunction(c) && c.call(this)
            }).show())
        },
        showMessage2: function(a, b, c) {
            var f, g = d("#dialog2-message");
            g.length < 1 || (a = "string" == typeof a ? {
                message: a
            } : a, f = j.fillTemplate({
                template: g,
                data: a
            }), this.isIE6() ? (d(".pg-container-content").prepend(f), d(".ui-message-close-button").click(function() {
                d(".ui-message-content").remove()
            })) : new e({
                content: f
            }).after("hide", function() {
                this.destroy(), b && d.isFunction(b) && b.call(this)
            }).after("show", function() {
                var a = this;
                d(".ui-message-close-button").click(function() {
                    a.hide()
                }), c && d.isFunction(c) && c.call(this)
            }).show())
        },
        initPoptips: function(a) {
            var b = null;
            b = a ? a.find('[data-ui-name="ui-poptip-trigger"]') : d('[data-ui-name="ui-poptip-trigger"]'), b.hover(function() {
                var a = d(this).data("ui-poptip-ancestor"),
                    b = a ? d(this).closest(a) : d(this);
                b.find('[data-ui-name="ui-poptip"]').show()
            }, function() {
                var a = d(this).data("ui-poptip-ancestor"),
                    b = a ? d(this).closest(a) : d(this);
                b.find('[data-ui-name="ui-poptip"]').hide()
            })
        }
    });
    var j = new i;
    c.exports = j
});