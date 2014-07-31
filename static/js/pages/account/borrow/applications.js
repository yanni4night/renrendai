define("pages/account/borrow/applications", ["common", "protocol", "widgets/widgets"], function(a) {
    var b = a("common"),
        c = a("protocol"),
        d = a("widgets/widgets");
    new d.List({
        name: "applications",
        api: c.API.getUserLoanApplicationRecords,
        title: !0,
        pagination: !0
    }).init(b.loadJSON("#applications-rsp", !0))
});