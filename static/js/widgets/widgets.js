define("widgets/captcha", ["jquery"], function(a, b, c) {
    var d = a("jquery"),
        e = function(a) {
            d.extend(this, {
                name: a.name,
                message: a.message || "验证码输入错误，请重新输入"
            }), this._ui = {
                img: d("#" + this.name + "-img"),
                input: d("#" + this.name + "-input"),
                message: d("#" + this.name + "-message")
            }
        };
    d.extend(e.prototype, {
        init: function() {
            var a = this,
                b = this._ui;
            return b.img.click(function() {
                var c = (new Date).getTime();
                b.img.attr("src", "/captcha?ts=" + c), b.input.val(""), a.clean()
            }), b.input.focusin(function() {
                a.clean()
            }), this
        },
        clean: function() {
            this._ui.message.text() == this.message && this._ui.message.text("")
        }
    }), c.exports = e
}), define("widgets/counter", ["jquery", "ui-counter", "counter"], function(a, b, c) {
    var d = a("jquery");
    a("ui-counter"), a("counter");
    var e = function(a) {
        d.extend(this, {
            container: a.container,
            delta: a.delta,
            start: a.start,
            end: a.end,
            minDays: a.minDays || 1,
            daysStyle: a.daysStyle || "small",
            secondsStyle: a.secondsStyle || "small",
            changed: a.changed || function() {},
            stopped: a.stopped || function() {}
        })
    };
    d.extend(e.prototype, {
        _getDelta: function() {
            var a = null;
            if (this.delta || this.start && this.end)
                if (this.delta) a = this.delta;
                else {
                    var b = this.start.split("-"),
                        c = this.end.split("-");
                    sd = new Date(b[0], parseInt(b[1], 10) - 1, b[2], b[3], b[4], b[5]), ed = new Date(c[0], parseInt(c[1], 10) - 1, c[2], c[3], c[4], c[5]), a = ed.getTime() - sd.getTime()
                } else a = 0;
            a /= 1e3;
            var d = Math.floor(a / 86400),
                e = Math.floor(a / 3600),
                f = Math.floor((a - 3600 * e) / 60),
                g = Math.floor(a - 3600 * e - 60 * f);
            return {
                days: d,
                hours: e,
                minutes: f,
                seconds: g,
                delta: a
            }
        },
        _setStyle: function(a, b) {
            a.removeClass("counter-analog counter-analog2"), a.removeClass("ui-counter-days ui-counter-seconds"), a.parent().removeClass("days seconds"), a.addClass("small" == this[b + "Style"] ? "counter-analog" : "counter-analog2"), a.addClass("ui-counter-" + b), a.parent().addClass(b)
        },
        _renderSeconds: function(a, b) {
            var c = 24 * (b.days + 1) - 1;
            if (c > 999) throw "Min days is too large to display";
            this._setStyle(a, "seconds"), a.counter({
                format: c + ":59:59",
                direction: "down",
                interval: "1000",
                initial: b.hours + ":" + b.minutes + ":" + b.seconds,
                stop: (c >= 100 ? "000" : "00") + ":00:00"
            })
        },
        init: function() {
            var a = null;
            a = "string" == typeof this.container ? d(this.container) : this.container;
            var b = this._getDelta(),
                c = 0,
                e = null,
                f = this;
            if (b.days < this.minDays) this._renderSeconds(a, b), e = setInterval(function() {
                c += 1, b.delta - c === 0 && (f.stopped(), clearInterval(e))
            }, 1e3);
            else {
                if (b.days > 999) throw "Delta days is too large to display";
                this._setStyle(a, "days"), a.counter({
                    format: b.days >= 100 ? "999" : "99",
                    direction: "down",
                    interval: "86400000",
                    initial: b.days,
                    stop: b.days >= 100 ? "000" : "00"
                }), e = setInterval(function() {
                    c += 1, b.delta - c < 86400 * f.minDays && (a.empty(), f.changed(), f.delta = 1e3 * (b.delta - c), f._renderSeconds(a, f._getDelta())), b.delta - c === 0 && (f.stopped(), clearInterval(e))
                }, 1e3)
            }
        }
    }), c.exports = e
}), define("widgets/form", ["jquery", "validate", "ui-poptip"], function(a, b, c) {
    var d = a("jquery");
    a("validate"), a("ui-poptip");
    var e = {};
    e.err = {
        required: "不能为空",
        remoteCode: "验证码输入错误",
        isEmail: "请输入有效的邮箱地址",
        equalPsw: "您输入的密码不一致",
        length: "字数超过限制",
        minPswLength: "长度为6-16个字符之间",
        maxPswLength: "长度为6-16个字符之间",
        isMobile: "请正确输入手机号码",
        isMobileOrEmail: "请输入正确的邮箱地址或手机号码",
        isNickName: "昵称只能由中文、英文字母、数字、下划线组成",
        isRealName: "包含非法字符",
        isHasUnderlineFrontEnd: "不能以下划线开头或结尾",
        isNickNameLength: "长度为4-16个字符之间",
        isHasYX: "前缀请不要使用“YX_”,且后缀请不要使用“_yx”",
        nickNameRemote: "昵称已存在",
        userNameRemote: "该手机号已经存在",
        isPassWord: "包含非法字符",
        isPassNotAllNum: "密码不能全为数字",
        isPassNotRepeat: "密码不能为同一个字符",
        equalTo: "您输入的密码不一致",
        agree: "请同意我们的条款",
        contractPay: "支付前请阅读并同意协议",
        maxLoanTitle: "借款标题不能超过14字",
        isOneDecimal: "利率最大保留小数点后1位",
        isRateOver: "您输入的借款年利率超出范围，请重新输入！",
        minLoanDescription: "借款描述应限制在20-500字之间",
        maxLoanDescription: "借款描述应限制在20-500字之间",
        minRealNameLength: "姓名长度在2-32字之间",
        maxRealNameLength: "姓名长度在2-32字之间",
        isPostCode: "邮政编码须为6位数字",
        isIDNum: "请正确输入您的二代身份证号码",
        isPhone: "请正确输电话号码",
        isUrl: "请输入正确的网址",
        isAmount: "请输入正确的金额",
        minAmount: "单笔充值金额应大于1元且小于或等于30万元",
        maxAmount: "单笔充值金额应大于1元且小于或等于30万元",
        bankRequired: "请选择充值方式",
        userBankId: "请选择提现银行卡",
        isEnough: "您的账户余额不足",
        equalToBank: "您输入的银行卡号不一致",
        bankCardLength: "银行卡号须为12-19位数字",
        isBankCard: "银行卡号输入错误",
        isEducationCode: "学历在线验证码须为12位数字",
        isIntNum: "请输入正整数",
        codeLength: "请输入4位验证码",
        minCachLength: "提现金额不能小于1元",
        intention: "请选择角色"
    }, e.tip = {}, e.checkCode = function(a) {
        a.ele.rules("add", {
            remote: {
                url: a.url || "/account/checkCode.action",
                data: a.data,
                dataFilter: function(b) {
                    var c = jQuery.parseJSON(b);
                    return "true" == c.result ? (a.success && "function" == typeof a.success && a.success.call(this, b), !0) : (a.failed && "function" == typeof a.failed && a.failed.call(this, b), !1)
                }
            },
            messages: {
                remote: e.err.remoteCode
            }
        })
    }, e.validateData = {
        errorPlacement: function(a, b) {
            a.appendTo(b.parent())
        },
        rules: {
            register: {
                nickName: {
                    required: !0,
                    isNickName: !0,
                    isHasUnderlineFrontEnd: !0,
                    isNickNameLength: !0,
                    isHasYX: !0,
                    remote: "/checkUserNickname!checkNickname.action"
                },
                username: {
                    required: !0,
                    isMobile: !0,
                    remote: "/checkEmail.action"
                },
                password: {
                    required: !0,
                    minlength: 6,
                    maxlength: 16,
                    isPassWord: !0,
                    isPassNotAllNum: !0,
                    isPassNotRepeat: !0
                },
                confirm_password: {
                    required: !0,
                    equalTo: "#password"
                },
                randCode: {
                    required: !0,
                    minlength: 4,
                    maxlength: 4
                },
                agree: {
                    required: !0
                },
                intention: {
                    required: !0
                }
            },
            mobileCodeForReg: {
                mobileCode: {
                    required: !0,
                    minlength: 4,
                    maxlength: 4
                }
            },
            login: {
                j_username: {
                    required: !0,
                    isMobileOrEmail: !0
                },
                username: {
                    required: !0,
                    isMobileOrEmail: !0
                },
                j_password: {
                    required: !0
                },
                password: {
                    required: !0
                },
                j_code: {
                    required: !0
                }
            },
            loaninfo: {
                borrowTitle: {
                    required: !0,
                    maxlength: 14
                },
                borrowAmount: {
                    required: !0,
                    isBorrowAmount: !0
                },
                apr: {
                    required: !0,
                    isOneDecimal: !0,
                    isRateOver: !0
                },
                repayTime: {
                    required: !0
                },
                endDate: {
                    required: !0
                },
                borrowDesc: {
                    required: !0,
                    minlength: 20,
                    maxlength: 500
                },
                agree_contract: {
                    required: !0
                }
            },
            borrowerinfo: {
                realName: {
                    required: !0,
                    minlength: 2,
                    maxlength: 32
                },
                idNo: {
                    required: !0,
                    isIDNum: !0
                },
                graduation: {
                    required: !0
                },
                university: {
                    maxlength: 20
                },
                homeProvince: {
                    required: !0
                },
                homeCity: {
                    required: !0
                },
                liveProvince: {
                    required: !0
                },
                liveCity: {
                    required: !0
                },
                address: {
                    required: !0,
                    maxlength: 30
                },
                postCode: {
                    required: !0,
                    isPostCode: !0
                },
                phone: {
                    isPhone: !0
                },
                marriage: {
                    required: !0
                },
                hasChild: {
                    required: !0
                },
                urgentContact: {
                    required: !0,
                    maxlength: 32
                },
                urgentRelation: {
                    required: !0,
                    maxlength: 10
                },
                urgentMobile: {
                    required: !0,
                    isMobile: !0
                },
                urgentContact2: {
                    required: !0,
                    maxlength: 32
                },
                urgentRelation2: {
                    required: !0,
                    maxlength: 10
                },
                urgentMobile2: {
                    required: !0,
                    isMobile: !0
                },
                office: {
                    required: !0,
                    maxlength: 32
                },
                jobType: {
                    required: !0
                },
                position: {
                    required: !0,
                    maxlength: 10
                },
                province: {
                    required: !0
                },
                city: {
                    required: !0
                },
                officeType: {
                    required: !0
                },
                officeDomain: {
                    required: !0
                },
                officeScale: {
                    required: !0
                },
                workYears: {
                    required: !0
                },
                salary: {
                    required: !0
                },
                workPhone: {
                    required: !0,
                    isPhone: !0
                },
                workEmail: {
                    required: !0,
                    isEmail: !0
                },
                officeAddress: {
                    required: !0,
                    maxlength: 32
                },
                hasHouse: {
                    required: !0
                },
                hasLoan: {
                    required: !0
                },
                hasCar: {
                    required: !0
                },
                carLoan: {
                    required: !0
                },
                carBrand: {
                    maxlength: 15
                },
                carNumber: {
                    maxlength: 8
                }
            },
            userbasic: {
                graduation: {
                    required: !0
                },
                university: {
                    maxlength: 20
                },
                marriage: {
                    required: !0
                },
                address: {
                    required: !0,
                    maxlength: 30
                },
                officeDomain: {
                    required: !0
                },
                officeScale: {
                    required: !0
                },
                position: {
                    required: !0,
                    maxlength: 10
                },
                salary: {
                    required: !0
                }
            },
            recharge: {
                bank: {
                    required: !0
                },
                free: {
                    required: !1
                },
                amount: {
                    required: !0,
                    isAmount: !0,
                    min: 1,
                    max: 3e5
                }
            },
            withdraw: {
                amount: {
                    required: !0,
                    isAmount: !0,
                    min: 1,
                    isEnough: !0
                },
                cashPassword: {
                    required: !0,
                    isPassWord: !0
                },
                userBankId: {
                    required: !0
                }
            },
            addcard: {
                bankDataId: {
                    required: !0
                },
                address: {
                    required: !0
                },
                deposit: {
                    required: !0
                },
                cardId: {
                    required: !0,
                    minlength: 12,
                    maxlength: 19,
                    isBankCard: !0
                },
                reBankCard: {
                    required: !0,
                    equalTo: "#cardId",
                    isBankCard: !0
                }
            },
            modpsw: {
                oldPassword: {
                    required: !0,
                    minlength: 6,
                    maxlength: 16
                },
                newPassword: {
                    required: !0,
                    isPassWord: !0,
                    minlength: 6,
                    maxlength: 16
                },
                newPassword2: {
                    required: !0,
                    minlength: 6,
                    maxlength: 16,
                    equalTo: "#newPassword"
                }
            },
            modCashPsw: {
                cashPassword: {
                    required: !0,
                    minlength: 6,
                    maxlength: 16
                },
                newCashPwd: {
                    required: !0,
                    isPassWord: !0,
                    minlength: 6,
                    maxlength: 16
                },
                newCashPwd2: {
                    required: !0,
                    minlength: 6,
                    maxlength: 16,
                    equalTo: "#newCashPwd"
                }
            },
            findCashPswStepOne: {
                validateCode: {
                    required: !0
                }
            },
            findCashPswStepTwo: {
                newCashPwd: {
                    required: !0,
                    isPassWord: !0,
                    minlength: 6,
                    maxlength: 16
                },
                newCashPwd2: {
                    required: !0,
                    minlength: 6,
                    maxlength: 16,
                    equalTo: "#newCashPwd"
                }
            },
            modMobileByPhoneStepOne: {
                validateCode: {
                    required: !0
                },
                cashPassword: {
                    required: !0
                }
            },
            modMobileByPhoneStepTwo: {
                phone: {
                    required: !0,
                    isMobile: !0
                },
                validateCode: {
                    required: !0
                }
            },
            modMobileByIdStepOne: {
                idNo: {
                    required: !0,
                    isIDNum: !0
                },
                cashPassword: {
                    required: !0
                }
            },
            modMobileByIdStepTwo: {
                phone: {
                    required: !0,
                    isMobile: !0
                },
                validateCode: {
                    required: !0
                }
            },
            emailUpdateByOldStepOne: {
                code: {
                    required: !0,
                    remote: {
                        url: "/account/checkCode.action",
                        dataFilter: function(a) {
                            var b = jQuery.parseJSON(a);
                            return "true" == b.result ? !0 : !1
                        }
                    }
                }
            },
            emailUpdateByOldStepTwo: {
                email: {
                    required: !0,
                    isEmail: !0
                }
            },
            emailUpdateByMobileStepOne: {
                code: {
                    required: !0
                },
                idCard: {
                    required: !0,
                    isIDNum: !0
                }
            },
            setId: {
                realName: {
                    required: !0,
                    isRealName: !0
                },
                idNo: {
                    required: !0,
                    isIDNum: !0
                }
            },
            setEmail: {
                email: {
                    required: !0,
                    isEmail: !0
                }
            },
            setMobile: {
                mobile: {
                    required: !0,
                    isMobile: !0
                },
                validCode: {
                    required: !0
                }
            },
            setCashPwd: {
                cashPwd: {
                    required: !0,
                    isPassWord: !0
                },
                cashPwd2: {
                    required: !0,
                    equalTo: "#cashPwd"
                }
            },
            setNickName: {
                nickName: {
                    required: !0,
                    isNickName: !0,
                    isHasUnderlineFrontEnd: !0,
                    isNickNameLength: !0,
                    isHasYX: !0,
                    remote: "/checkUserNickname!checkNickname.action"
                }
            },
            creditWeibo: {
                credit_web: {
                    required: !0
                }
            },
            creditVideo: {
                usemail: {
                    required: !0
                }
            },
            creditGraduation: {
                validCode: {
                    required: !0,
                    isEducationCode: !0
                }
            },
            notLoginFindPswByEmail: {
                email: {
                    required: !0,
                    isEmail: !0
                },
                randCode: {
                    required: !0
                }
            },
            notLoginFindPswByMobile: {
                mobile: {
                    required: !0,
                    isMobile: !0
                },
                randCode: {
                    required: !0
                }
            },
            notLoginFindPswByEmailCode: {
                validCode: {
                    required: !0
                }
            },
            notLoginFindPswByMobileCode: {
                validCode: {
                    required: !0
                }
            },
            notLoginFindPswResetPsw: {
                password: {
                    required: !0,
                    isPassWord: !0,
                    minlength: 6,
                    maxlength: 16
                },
                password2: {
                    required: !0,
                    equalTo: "#password"
                }
            },
            calculator: {
                borrowAmount: {
                    required: !0,
                    isBorrowAmount: !0
                },
                yearRate: {
                    required: !0,
                    isOneDecimal: !0,
                    isRateOver: !0
                }
            },
            ucode: {
                ucodeSerial: {
                    required: !0
                }
            },
            accontRsvConfirm: {
                contract: {
                    required: !0
                }
            },
            confirmReserve: {
                randCode: {
                    required: !0
                },
                joinContract: {
                    required: !0
                },
                reserveContract: {
                    required: !0
                }
            }
        },
        messages: {
            register: {
                nickName: {
                    required: e.err.required,
                    isNickName: e.err.isNickName,
                    isHasUnderlineFrontEnd: e.err.isHasUnderlineFrontEnd,
                    isNickNameLength: e.err.isNickNameLength,
                    isHasYX: e.err.isHasYX,
                    remote: e.err.nickNameRemote
                },
                username: {
                    required: e.err.required,
                    isMobile: e.err.isMobile,
                    remote: e.err.userNameRemote
                },
                password: {
                    required: e.err.required,
                    isPassWord: e.err.isPassWord,
                    isPassNotAllNum: e.err.isPassNotAllNum,
                    isPassNotRepeat: e.err.isPassNotRepeat,
                    minlength: e.err.minPswLength,
                    maxlength: e.err.maxPswLength
                },
                confirm_password: {
                    required: e.err.required,
                    equalTo: e.err.equalTo
                },
                randCode: {
                    required: e.err.required,
                    minlength: e.err.codeLength,
                    maxlength: e.err.codeLength
                },
                agree: {
                    required: e.err.agree
                },
                intention: {
                    required: e.err.intention
                }
            },
            mobileCodeForReg: {
                mobileCode: {
                    required: e.err.required,
                    minlength: e.err.codeLength,
                    maxlength: e.err.codeLength
                }
            },
            login: {
                j_password: {
                    required: e.err.required
                },
                password: {
                    required: e.err.required
                },
                j_username: {
                    required: e.err.required,
                    isMobileOrEmail: e.err.isMobileOrEmail
                },
                username: {
                    required: e.err.required,
                    isMobileOrEmail: e.err.isMobileOrEmail
                },
                j_code: {
                    required: e.err.required
                }
            },
            loaninfo: {
                borrowTitle: {
                    required: e.err.required,
                    maxlength: e.err.maxLoanTitle
                },
                borrowAmount: {
                    required: e.err.required
                },
                apr: {
                    required: e.err.required,
                    isOneDecimal: e.err.isOneDecimal,
                    isRateOver: e.err.isRateOver
                },
                repayTime: {
                    required: e.err.required
                },
                endDate: {
                    required: e.err.required
                },
                borrowDesc: {
                    required: e.err.required,
                    minlength: e.err.minLoanDescription,
                    maxlength: e.err.maxLoanDescription
                },
                agree_contract: {
                    required: e.err.agree
                }
            },
            borrowerinfo: {
                realName: {
                    required: e.err.required,
                    minlength: e.err.minRealNameLength,
                    maxlength: e.err.maxRealNameLength
                },
                idNo: {
                    required: e.err.required,
                    isIDNum: e.err.isIDNum
                },
                graduation: {
                    required: e.err.required
                },
                university: {
                    maxlength: e.err.length
                },
                homeProvince: {
                    required: e.err.required
                },
                homeCity: {
                    required: e.err.required
                },
                liveProvince: {
                    required: e.err.required
                },
                liveCity: {
                    required: e.err.required
                },
                address: {
                    required: e.err.required,
                    maxlength: e.err.length
                },
                postCode: {
                    required: e.err.required,
                    isPostCode: e.err.isPostCode
                },
                phone: {
                    isPhone: e.err.isPhone
                },
                marriage: {
                    required: e.err.required
                },
                hasChild: {
                    required: e.err.required
                },
                urgentContact: {
                    required: e.err.required
                },
                urgentRelation: {
                    required: e.err.required,
                    maxlength: e.err.length
                },
                urgentMobile: {
                    required: e.err.required,
                    isMobile: e.err.isMobile
                },
                urgentContact2: {
                    required: e.err.required,
                    maxlength: e.err.length
                },
                urgentRelation2: {
                    required: e.err.required,
                    maxlength: e.err.length
                },
                urgentMobile2: {
                    required: e.err.required,
                    isMobile: e.err.isMobile
                },
                office: {
                    required: e.err.required,
                    maxlength: e.err.length
                },
                jobType: {
                    required: e.err.required
                },
                position: {
                    required: e.err.required,
                    maxlength: e.err.length
                },
                province: {
                    required: e.err.required
                },
                city: {
                    required: e.err.required
                },
                officeType: {
                    required: e.err.required
                },
                officeDomain: {
                    required: e.err.required
                },
                officeScale: {
                    required: e.err.required
                },
                workYears: {
                    required: e.err.required
                },
                salary: {
                    required: e.err.required
                },
                workPhone: {
                    required: e.err.required,
                    isPhone: e.err.isPhone
                },
                workEmail: {
                    required: e.err.required,
                    isEmail: e.err.isEmail
                },
                officeAddress: {
                    required: e.err.required,
                    maxlength: e.err.length
                },
                hasHouse: {
                    required: e.err.required
                },
                hasLoan: {
                    required: e.err.required
                },
                hasCar: {
                    required: e.err.required
                },
                carLoan: {
                    required: e.err.required
                },
                carBrand: {
                    maxlength: e.err.length
                },
                carNumber: {
                    maxlength: e.err.length
                }
            },
            userbasic: {
                graduation: {
                    required: e.err.required
                },
                university: {
                    maxlength: e.err.length
                },
                marriage: {
                    required: e.err.required
                },
                address: {
                    required: e.err.required,
                    maxlength: e.err.length
                },
                officeDomain: {
                    required: e.err.required
                },
                officeScale: {
                    required: e.err.required
                },
                position: {
                    required: e.err.required,
                    maxlength: e.err.length
                },
                salary: {
                    required: e.err.required
                }
            },
            recharge: {
                bank: {
                    required: e.err.bankRequired
                },
                amount: {
                    required: e.err.required,
                    isAmount: e.err.isAmount,
                    min: e.err.minAmount,
                    max: e.err.maxAmount
                }
            },
            withdraw: {
                amount: {
                    required: e.err.required,
                    isAmount: e.err.isAmount,
                    min: e.err.minCachLength,
                    isEnough: e.err.isEnough
                },
                cashPassword: {
                    required: e.err.required,
                    isPassWord: e.err.isPassWord
                },
                userBankId: {
                    required: e.err.userBankId
                }
            },
            addcard: {
                bankDataId: {
                    required: e.err.required
                },
                address: {
                    required: e.err.required
                },
                deposit: {
                    required: e.err.required
                },
                cardId: {
                    required: e.err.required,
                    minlength: e.err.bankCardLength,
                    maxlength: e.err.bankCardLength,
                    isBankCard: e.err.isBankCard
                },
                reBankCard: {
                    required: e.err.required,
                    equalTo: e.err.equalToBank,
                    isBankCard: e.err.isBankCard
                }
            },
            modpsw: {
                oldPassword: {
                    required: e.err.required,
                    minlength: e.err.minPswLength,
                    maxlength: e.err.maxPswLength
                },
                newPassword: {
                    required: e.err.required,
                    isPassWord: e.err.isPassWord,
                    minlength: e.err.minPswLength,
                    maxlength: e.err.maxPswLength
                },
                newPassword2: {
                    required: e.err.required,
                    minlength: e.err.minPswLength,
                    maxlength: e.err.maxPswLength,
                    equalTo: e.err.equalTo
                }
            },
            modCashPsw: {
                cashPassword: {
                    required: e.err.required,
                    minlength: e.err.minPswLength,
                    maxlength: e.err.maxPswLength
                },
                newCashPwd: {
                    required: e.err.required,
                    isPassWord: e.err.isPassWord,
                    minlength: e.err.minPswLength,
                    maxlength: e.err.maxPswLength
                },
                newCashPwd2: {
                    required: e.err.required,
                    minlength: e.err.minPswLength,
                    maxlength: e.err.maxPswLength,
                    equalTo: e.err.equalTo
                }
            },
            findCashPswStepOne: {
                validateCode: {
                    required: e.err.required
                }
            },
            findCashPswStepTwo: {
                newCashPwd: {
                    required: e.err.required,
                    isPassWord: e.err.isPassWord,
                    minlength: e.err.minPswLength,
                    maxlength: e.err.maxPswLength
                },
                newCashPwd2: {
                    required: e.err.required,
                    minlength: e.err.minPswLength,
                    maxlength: e.err.maxPswLength,
                    equalTo: e.err.equalTo
                }
            },
            modMobileByPhoneStepOne: {
                validateCode: {
                    required: e.err.required
                },
                cashPassword: {
                    required: e.err.required
                }
            },
            modMobileByPhoneStepTwo: {
                phone: {
                    required: e.err.required,
                    isMobile: e.err.isMobile
                },
                validateCode: {
                    required: e.err.required
                }
            },
            modMobileByIdStepOne: {
                idNo: {
                    required: e.err.required,
                    isIDNum: e.err.isIDNum
                },
                cashPassword: {
                    required: e.err.required
                }
            },
            modMobileByIdStepTwo: {
                phone: {
                    required: e.err.required,
                    isMobile: e.err.isMobile
                },
                validateCode: {
                    required: e.err.required
                }
            },
            emailUpdateByOldStepOne: {
                code: {
                    required: e.err.required,
                    remote: e.err.remoteCode
                }
            },
            emailUpdateByOldStepTwo: {
                email: {
                    required: e.err.required,
                    isEmail: e.err.isEmail
                }
            },
            emailUpdateByMobileStepOne: {
                code: {
                    required: e.err.required
                },
                idCard: {
                    required: e.err.required,
                    isIDNum: e.err.isIDNum
                }
            },
            setId: {
                realName: {
                    required: e.err.required,
                    isRealName: e.err.isRealName
                },
                idNo: {
                    required: e.err.required,
                    isIDNum: e.err.isIDNum
                }
            },
            setEmail: {
                email: {
                    required: e.err.required,
                    isEmail: e.err.isEmail
                }
            },
            setMobile: {
                mobile: {
                    required: e.err.required,
                    isMobile: e.err.isMobile
                },
                validCode: {
                    required: e.err.required
                }
            },
            setCashPwd: {
                cashPwd: {
                    required: e.err.required,
                    isPassWord: e.err.isPassWord
                },
                cashPwd2: {
                    required: e.err.required,
                    equalTo: e.err.equalTo
                }
            },
            setNickName: {
                nickName: {
                    required: e.err.required,
                    isNickName: e.err.isNickName,
                    isHasUnderlineFrontEnd: e.err.isHasUnderlineFrontEnd,
                    isNickNameLength: e.err.isNickNameLength,
                    isHasYX: e.err.isHasYX,
                    remote: e.err.nickNameRemote
                }
            },
            creditWeibo: {
                credit_web: {
                    required: e.err.required
                }
            },
            creditVideo: {
                usemail: {
                    required: e.err.required
                }
            },
            creditGraduation: {
                validCode: {
                    required: e.err.required,
                    isEducationCode: e.err.isEducationCode
                }
            },
            notLoginFindPswByEmail: {
                email: {
                    required: e.err.required,
                    isEmail: e.err.isEmail
                },
                randCode: {
                    required: e.err.required
                }
            },
            notLoginFindPswByMobile: {
                mobile: {
                    required: e.err.required,
                    isMobile: e.err.isMobile
                },
                randCode: {
                    required: e.err.required
                }
            },
            notLoginFindPswByEmailCode: {
                validCode: {
                    required: e.err.required
                }
            },
            notLoginFindPswByMobileCode: {
                validCode: {
                    required: e.err.required
                }
            },
            notLoginFindPswResetPsw: {
                password: {
                    required: e.err.required,
                    isPassWord: e.err.isPassWord,
                    minlength: e.err.minPswLength,
                    maxlength: e.err.maxPswLength
                },
                password2: {
                    required: e.err.required,
                    equalTo: e.err.equalTo
                }
            },
            calculator: {
                borrowAmount: {
                    required: e.err.required,
                    isBorrowAmount: e.err.isBorrowAmount
                },
                yearRate: {
                    required: e.err.required,
                    isOneDecimal: e.err.isOneDecimal,
                    isRateOver: e.err.isRateOver
                }
            },
            ucode: {
                ucodeSerial: {
                    required: e.err.required
                }
            },
            accontRsvConfirm: {
                contract: {
                    required: e.err.contractPay
                }
            },
            confirmReserve: {
                randCode: {
                    required: e.err.required
                },
                joinContract: {
                    required: e.err.contractPay
                },
                reserveContract: {
                    required: e.err.contractPay
                }
            }
        }
    }, e.log = function() {
        window.console && window.console.log
    }, e.msg = function(a, b, c) {
        if (void 0 !== a) {
            if ($msgafter = d(a), !$msgafter.length) return void e.log("'msgafter' element can't find!");
            void 0 === c && (c = "log");
            var f = $msgafter.parent().find(".form-msg");
            if (f.length) return void f.html("<span class='" + c + "'>" + b + "</span>");
            f = d("<span class='form-msg'></span>").insertAfter($msgafter).slideUp().html("<span class='" + c + "'>" + b + "</span>").slideDown(), f.delay(3e3).slideUp(function() {
                d(this).remove()
            })
        } else e.log(b)
    }, e.ajaxSubmit = function(a, b) {
        function c() {
            function c(a) {
                var b = null;
                try {
                    a.contentWindow && (b = a.contentWindow.document)
                } catch (c) {}
                if (b) return b;
                try {
                    b = a.contentDocument ? a.contentDocument : a.document
                } catch (c) {
                    b = a.document
                }
                return b
            }

            function e() {
                function b() {
                    try {
                        var a = c(l).readyState;
                        a && "uninitialized" == a.toLowerCase() && setTimeout(b, 50)
                    } catch (d) {
                        g(u), q && clearTimeout(q), q = void 0
                    }
                }
                var e = a.attr2("target"),
                    i = a.attr2("action");
                r.setAttribute("target", j), f || r.setAttribute("method", "POST"), i != h.url && r.setAttribute("action", h.url), h.skipEncodingOverride || f && !/post/i.test(f) || a.attr({
                    encoding: "multipart/form-data",
                    enctype: "multipart/form-data"
                }), h.timeout && (q = setTimeout(function() {
                    p = !0, g(t)
                }, h.timeout));
                var m = [];
                try {
                    if (h.extraData)
                        for (var n in h.extraData) h.extraData.hasOwnProperty(n) && m.push(d.isPlainObject(h.extraData[n]) && h.extraData[n].hasOwnProperty("name") && h.extraData[n].hasOwnProperty("value") ? d('<input type="hidden" name="' + h.extraData[n].name + '">').val(h.extraData[n].value).appendTo(r)[0] : d('<input type="hidden" name="' + n + '">').val(h.extraData[n]).appendTo(r)[0]);
                    h.iframeTarget || (k.appendTo("body"), l.attachEvent ? l.attachEvent("onload", g) : l.addEventListener("load", g, !1)), setTimeout(b, 15);
                    try {
                        r.submit()
                    } catch (o) {
                        var s = document.createElement("form").submit;
                        s.apply(r)
                    }
                } finally {
                    r.setAttribute("action", i), e ? r.setAttribute("target", e) : a.removeAttr("target"), d(m).remove()
                }
            }

            function g(a) {
                if (!m.aborted && !z) {
                    if (y = c(l), y || (a = u), a === t && m) return m.abort("timeout"), void s.reject(m, "timeout");
                    if (a == u && m) return m.abort("server abort"), void s.reject(m, "error", "server abort");
                    if (y && y.location.href != h.iframeSrc || p) {
                        l.detachEvent ? l.detachEvent("onload", g) : l.removeEventListener("load", g, !1);
                        var b, e = "success";
                        try {
                            if (p) throw "timeout";
                            var f = "xml" == h.dataType || y.XMLDocument || d.isXMLDoc(y);
                            if (!f && window.opera && (null === y.body || !y.body.innerHTML) && --A) return void setTimeout(g, 250);
                            var j = y.body ? y.body : y.documentElement;
                            m.responseText = j ? j.innerHTML : null, m.responseXML = y.XMLDocument ? y.XMLDocument : y, f && (h.dataType = "xml"), m.getResponseHeader = function(a) {
                                var b = {
                                    "content-type": h.dataType
                                };
                                return b[a]
                            }, j && (m.status = Number(j.getAttribute("status")) || m.status, m.statusText = j.getAttribute("statusText") || m.statusText);
                            var n = (h.dataType || "").toLowerCase(),
                                o = /(json|script|text)/.test(n);
                            if (o || h.textarea) {
                                var r = y.getElementsByTagName("textarea")[0];
                                if (r) m.responseText = r.value, m.status = Number(r.getAttribute("status")) || m.status, m.statusText = r.getAttribute("statusText") || m.statusText;
                                else if (o) {
                                    var v = y.getElementsByTagName("pre")[0],
                                        w = y.getElementsByTagName("body")[0];
                                    v ? m.responseText = v.textContent ? v.textContent : v.innerText : w && (m.responseText = w.textContent ? w.textContent : w.innerText)
                                }
                            } else "xml" == n && !m.responseXML && m.responseText && (m.responseXML = B(m.responseText));
                            try {
                                x = D(m, n, h)
                            } catch (C) {
                                e = "parsererror", m.error = b = C || e
                            }
                        } catch (C) {
                            e = "error", m.error = b = C || e
                        }
                        m.aborted && (e = null), m.status && (e = m.status >= 200 && m.status < 300 || 304 === m.status ? "success" : "error"), "success" === e ? (h.success && h.success.call(h.context, x, "success", m), s.resolve(m.responseText, "success", m), i && d.event.trigger("ajaxSuccess", [m, h])) : e && (void 0 === b && (b = m.statusText), h.error && h.error.call(h.context, m, e, b), s.reject(m, "error", b), i && d.event.trigger("ajaxError", [m, h, b])), i && d.event.trigger("ajaxComplete", [m, h]), i && !--d.active && d.event.trigger("ajaxStop"), h.complete && h.complete.call(h.context, m, e), z = !0, h.timeout && clearTimeout(q), setTimeout(function() {
                            h.iframeTarget || k.remove(), m.responseXML = null
                        }, 100)
                    }
                }
            }
            var h, i, j, k, l, m, n, o, p, q, r = a[0],
                s = d.Deferred();
            if (h = d.extend(!0, {}, d.ajaxSettings, b), h.context = h.context || h, j = "jqFormIO" + (new Date).getTime(), h.iframeTarget ? (k = d(h.iframeTarget), o = k.attr2("name"), o ? j = o : k.attr2("name", j)) : (k = d('<iframe name="' + j + '" src="' + h.iframeSrc + '" />'), k.css({
                position: "absolute",
                top: "-1000px",
                left: "-1000px"
            })), l = k[0], m = {
                aborted: 0,
                responseText: null,
                responseXML: null,
                status: 0,
                statusText: "n/a",
                getAllResponseHeaders: function() {},
                getResponseHeader: function() {},
                setRequestHeader: function() {},
                abort: function(a) {
                    var b = "timeout" === a ? "timeout" : "aborted";
                    this.aborted = 1;
                    try {
                        l.contentWindow.document.execCommand && l.contentWindow.document.execCommand("Stop")
                    } catch (c) {}
                    k.attr("src", h.iframeSrc), m.error = b, h.error && h.error.call(h.context, m, b, a), i && d.event.trigger("ajaxError", [m, h, b]), h.complete && h.complete.call(h.context, m, b)
                }
            }, i = h.global, i && 0 === d.active++ && d.event.trigger("ajaxStart"), i && d.event.trigger("ajaxSend", [m, h]), h.beforeSend && h.beforeSend.call(h.context, m, h) === !1) return h.global && d.active--, s.reject(), s;
            if (m.aborted) return s.reject(), s;
            n = r.clk, n && (o = n.name, o && !n.disabled && (h.extraData = h.extraData || {}, h.extraData[o] = n.value, "image" == n.type && (h.extraData[o + ".x"] = r.clk_x, h.extraData[o + ".y"] = r.clk_y)));
            var t = 1,
                u = 2,
                v = d("meta[name=csrf-token]").attr("content"),
                w = d("meta[name=csrf-param]").attr("content");
            w && v && (h.extraData = h.extraData || {}, h.extraData[w] = v), h.forceSync ? e() : setTimeout(e, 10);
            var x, y, z, A = 50,
                B = d.parseXML || function(a, b) {
                    return window.ActiveXObject ? (b = new ActiveXObject("Microsoft.XMLDOM"), b.async = "false", b.loadXML(a)) : b = (new DOMParser).parseFromString(a, "text/xml"), b && b.documentElement && "parsererror" != b.documentElement.nodeName ? b : null
                },
                C = d.parseJSON || function(a) {
                    return window.eval("(" + a + ")")
                },
                D = function(a, b, c) {
                    var e = a.getResponseHeader("content-type") || "",
                        f = "xml" === b || !b && e.indexOf("xml") >= 0,
                        g = f ? a.responseXML : a.responseText;
                    return f && "parsererror" === g.documentElement.nodeName && d.error && d.error("parsererror"), c && c.dataFilter && (g = c.dataFilter(g, b)), "string" == typeof g && ("json" === b || !b && e.indexOf("json") >= 0 ? g = C(g) : ("script" === b || !b && e.indexOf("javascript") >= 0) && d.globalEval(g)), g
                };
            return s
        }
        if (a.length && (!b || "object" == d.type(b))) {
            var f, g, h, i, j;
            "function" == typeof b ? b = {
                success: b
            } : void 0 === b && (b = {}), b.msg = function(a, c) {
                e.msg(b.msgafter, a, c)
            }, f = b.type || a.attr("method"), g = b.url || a.attr("action"), h = "string" == typeof g ? d.trim(g) : "", h && (h = (h.match(/^([^#]+)/) || [])[1]), b.extraData && (d.isPlainObject(b.extraData) || "array" == d.type(b.extraData)) && (j = d.param(b.extraData)), i = b.data ? b.data : a.serialize(), i = j ? i + "&" + j : i, b.debug && e.log(i), b = d.extend(!0, {
                url: h,
                success: d.ajaxSettings.success,
                type: f || "GET",
                iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank"
            }, b);
            var k = !!d.fn.prop;
            d.fn.attr2 = function() {
                if (!k) return this.attr.apply(this, arguments);
                var a = this.prop.apply(this, arguments);
                return a && a.jquery || "string" == typeof a ? a : this.attr.apply(this, arguments)
            };
            var l = a.find("input[type=file]"),
                m = l.length > 0;
            b = d.extend({
                url: h,
                data: i,
                beforeSend: function() {
                    this.msg("Loading...")
                },
                success: function() {
                    this.msg("提交成功！")
                },
                error: function() {
                    this.msg("服务器链接出错！", "warn")
                },
                type: f || "GET"
            }, b), m ? c() : d.ajax(b)
        }
    }, e.is = {
        isDate: function(a, b, c) {
            if (isNaN(a) || isNaN(b) || isNaN(c)) return !1;
            if (b > 12 || 1 > b) return !1;
            if (1 > c || c > 31) return !1;
            if ((4 == b || 6 == b || 9 == b || 11 == b) && c > 30) return !1;
            if (2 == b) {
                if (c > 29) return !1;
                if ((a % 100 === 0 && a % 400 !== 0 || a % 4 !== 0) && c > 28) return !1
            }
            return !0
        },
        isIDNum: function(a) {
            var b;
            if (18 != a.length) return !1;
            if (b = /^\d{17}(\d|x|X)$/, !b.exec(a)) return !1;
            if (!e.is.isDate(a.substring(6, 10), a.substring(10, 12), a.substring(12, 14))) return !1;
            for (var c = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"], d = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1], f = 0, g = 0; g < a.length - 1; g++) f += a.substring(g, g + 1) * d[g];
            return f %= 11, a.substring(a.length - 1, a.length).toUpperCase() != c[f] ? !1 : !0
        },
        isUserName: function(a) {
            var b = /^\w+(@)\w+(\.\w+)(\.\w+|)$/,
                c = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
            return b.test(a) || c.test(a)
        },
        isRealName: function(a) {
            return /^[\u4E00-\u9FA5]+$/.test(a)
        },
        isNickName: function(a) {
            return /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(a)
        },
        isHasUnderlineFrontEnd: function(a) {
            return /^(?!_)(?!.*?_$).*$/.test(a)
        },
        isHasYX: function(a) {
            return !/^(YX_|yx_|yX_|Yx_).*|(.*(_YX|_yx|_yX|_Yx)$)/.test(a)
        },
        isNickNameLength: function(a) {
            function b(a) {
                for (var b = a.length, c = 0, d = 0; b > d; d++) a.charCodeAt(d) < 27 || a.charCodeAt(d) > 126 ? c += 2 : c++;
                return c
            }
            return b(d.trim(a)) <= 16 && b(d.trim(a)) >= 4
        },
        isPassWord: function(a) {
            return /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{1,}$/.test(a)
        },
        isPassNotAllNum: function(a) {
            return !/^\d{1,}$/.test(a)
        },
        isPassNotRepeat: function(a) {
            return !new RegExp(/^(.)\1+$/).test(a)
        },
        isMobile: function(a) {
            return /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(a)
        },
        isPhone: function(a) {
            return /^0\d{2,3}[-]?\d{8}$|^0\d{3}[-]?\d{7,8}$/.test(a)
        },
        isEmail: function(a) {
            return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(a)
        },
        isMobileOrEmail: function(a) {
            return this.isMobile(a) || this.isEmail(a)
        },
        isUrl: function(a) {
            return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(a)
        },
        isAmount: function(a) {
            return /^[0-9]*(\.[0-9]{1,2})?$/.test(a)
        },
        isPostCode: function(a) {
            return /^\d{6}$/.test(a)
        },
        isBankCard: function(a) {
            return /^\d{12,19}$/.test(a)
        },
        isEducationCode: function(a) {
            return /^\d{12}$/.test(a)
        },
        isIntNum: function(a) {
            return /^\d+$/.test(a)
        },
        isOneDecimal: function(a) {
            return /^(([1-9]{1}\d*)|([0]{1}))(\.(\d){1})?$/.test(a)
        },
        isLuhn: function(a) {
            if (/[^0-9-\s]+/.test(a)) return !1;
            var b = 0,
                c = 0,
                d = !1;
            a = a.replace(/\D/g, "");
            for (var e = a.length - 1; e >= 0; e--) {
                var f = a.charAt(e);
                c = parseInt(f, 10), d && (c *= 2) > 9 && (c -= 9), b += c, d = !d
            }
            return b % 10 === 0
        }
    }, e.isEmptyObj = function(a) {
        var b = !0;
        if ("[object Array]" === Object.prototype.toString.call(a)) b = !a.length;
        else {
            a = new Object(a);
            for (var c in a) return !1
        }
        return b
    }, e.comma = function(a, b) {
        var c = a;
        return (!b || 1 > b) && (b = 3), c = String(c).split("."), c[0] = c[0].replace(new RegExp("(\\d)(?=(\\d{" + b + "})+$)", "ig"), "$1,"), c.join(".")
    }, d.extend({
        uniqueArray: function(a, b) {
            var c, d, e = a.length,
                f = a.slice(0);
            for ("function" != typeof b && (b = function(a, b) {
                return a === b
            }); --e > 0;)
                for (d = f[e], c = e; c--;)
                    if (b(d, f[c])) {
                        f.splice(e, 1);
                        break
                    }
            return f
        }
    }), e.addValidateMethod = function(a) {
        "array" == d.type(a) && d.each(a, function(a, b) {
            jQuery.validator.addMethod(b, function(a, c) {
                return this.optional(c) || e.is[b](a)
            })
        })
    }, e.placeholder = function() {
        d(".ui-form").on("click", ".placeholder", function() {
            d(this).hide().parent().children("input").trigger("focus")
        }).on("focus", "input", function() {
            d(this).parent().children(".placeholder").hide()
        }).on("blur", "input", function() {
            this.value || d(this).parent().children(".placeholder").show()
        }).find("input").trigger("focus")
    }, e.randImage = function(a) {
        var b = d("undefined" == typeof a ? "#randImage" : a);
        b.length > 0 && b.click(function() {
            d(this).attr("src", "/captcha?" + Math.random())
        })
    }, e.tipfocus = function(a, b) {
        var c = a[0].offsetWidth + a.parent().children(".ui-label").width() + 10,
            e = 2;
        return $poptip = a.parent().children(".ui-poptip"), /code/.test(a[0].className) && (c += a.nextAll("button")[0].offsetWidth), $poptip.length ? void $poptip.show() : void d('<div class="ui-poptip ui-poptip-orange" style="z-index: 99; position: absolute; left: ' + c + "px; top:" + e + 'px;"><div class="ui-poptip-container"><div class="ui-poptip-arrow ui-poptip-arrow-10"><em></em><span></span></div><div data-role="content" class="ui-poptip-content" style="width: auto; height: auto;"></div></div></div>').appendTo(a.parent("div")).find(".ui-poptip-content").html(b)
    }, e.tipblur = function(a) {
        a.parent().children(".ui-poptip").hide()
    }, e.setPhone = function(a, b, c) {
        function e() {
            var a = f.val(),
                b = g.val();
            a && b ? h.val(a + "-" + b).keyup() : h.val("").keyup()
        }
        var f = d("#" + a),
            g = d("#" + b),
            h = d("#" + c),
            i = d("#" + c).val();
        i && /-/.test(i) ? (f.val(i.split("-")[0]), g.val(i.split("-")[1])) : g.val(h.val()), f.add(g).bind("keyup", function() {
            e()
        }), f.add(g).bind("blur", function() {
            e(), h.trigger("blur")
        }), h.css({
            height: "0px",
            width: "0px",
            border: "1px dashed #fff"
        }).show().keyup()
    }, e.sendPhoneCode = function(a, b, c, f) {
        function g() {
            var a = l.length ? l.val() : "";
            return l.length && !e.is.isMobile(l.val()) ? void e.msg("#" + b, "请正确填写您的手机号码", "warn") : (m.attr("disabled", "disabled").addClass("ui-button-disabled"), i = setInterval(function() {
                0 >= k ? (m.removeAttr("disabled").removeClass("ui-button-disabled").html(n), clearInterval(i), k = j, f && f.onClear && d.isFunction(f.onClear) && f.onClear()) : (m.html(k + "秒重新获取"), k--)
            }, 1e3), void d.ajax({
                url: o + a,
                type: "POST",
                success: function(a) {
                    f && f.onSuccess && d.isFunction(f.onSuccess) && f.onSuccess(), a.result ? e.msg("#" + b, a.result, "warn") : a.message && e.msg("#" + b, a.message, "warn")
                }
            }))
        }

        function h() {
            clearInterval(i), k = j
        }
        var i, j = 30,
            k = j,
            l = d("undefined" == typeof a ? "#phone" : "#" + a);
        b = "undefined" == typeof b ? "getMobileCode" : b;
        var m = d("#" + b),
            n = m.html(),
            o = "undefined" == typeof c ? "/sendPhoneCode.action?phone=" : c;
        return m.removeAttr("disabled").html(n).unbind("click").bind("click", function(a) {
            a.preventDefault(), f && f.onStart && d.isFunction(f.onStart) && f.onStart(), g()
        }), {
            send: g,
            clear: h
        }
    }, e.notRequired = function(a) {
        a.find(":text,[type='password'],[type='checkbox'],[type='radio'],[type='file'],select,textarea").each(function() {
            d(this).data("required", "false")
        })
    }, e.removeRequired = function(a) {
        a.find(":text,[type='password'],[type='checkbox'],[type='radio'],[type='file'],select,textarea").each(function() {
            d(this).removeData("required")
        })
    }, e.init = function() {}, d.validator.prototype.checkForm = function() {
        this.prepareForm();
        for (var a = 0, b = this.currentElements = this.elements(); b[a]; a++)
            if (this.findByName(b[a].name).length && this.findByName(b[a].name).length > 1)
                for (var c = 0; c < this.findByName(b[a].name).length; c++) this.check(this.findByName(b[a].name)[c]);
            else this.check(b[a]);
        return this.valid()
    },
    function(a) {
        if (document.all && !document.querySelector && a.fn.validate) {
            var b = a.fn.validate,
                c = Array.prototype.slice;
            a.fn.validate = function() {
                var a = c.call(arguments, 0),
                    d = this.attr;
                return this.attr = function() {
                    var a = c.call(arguments, 0);
                    return a.length > 1 && "novalidate" === a[0] ? this : d.apply(this, a)
                }, b.apply(this, a)
            }
        }
    }(window.jQuery);
    var f = {
            success: function(a) {
                a.addClass("valid")
            },
            highlight: function(a) {
                d(a).removeClass("input-bg-gray").addClass("input-bg-red").addClass("error");
                var b = d(a).siblings(".icon"),
                    c = b.attr("class");
                if (c && /gray/.test(c)) {
                    var e = c.match(/input-icon-(.*)-gray/);
                    b.removeClass(e[0]).addClass("input-icon-" + e[1] + "-red")
                }
            },
            unhighlight: function(a) {
                d(a).removeClass("input-bg-red error").addClass("input-bg-gray");
                var b = d(a).siblings(".icon"),
                    c = b.attr("class");
                if (c && /red/.test(c)) {
                    var e = c.match(/input-icon-(.*)-red/);
                    b.removeClass(e[0]).addClass("input-icon-" + e[1] + "-gray")
                }
            }
        },
        g = {
            showErrors: function() {
                var a, b;
                for (a = 0; this.errorList[a]; a++) {
                    var c = this.errorList[a];
                    this.settings.highlight && this.settings.highlight.call(this, c.element, this.settings.errorClass, this.settings.validClass), this.showLabel(c.element, c.message);
                    break
                }
                if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                    for (a = 0; this.successList[a]; a++) this.showLabel(this.successList[a]);
                if (this.settings.unhighlight)
                    for (a = 0, b = this.validElements(); b[a]; a++) this.settings.unhighlight.call(this, b[a], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
            }
        };
    e.ui = {
        init: function() {
            d("input[type='checkbox']").each(function() {
                var a = d(this),
                    b = a.prop("checked");
                $wrap = d("<span class='ui-select'></span>").on("click", function(b) {
                    "SPAN" == b.target.nodeName && (a.prop("checked") ? d(this).css("backgroundPosition", "0 0") : d(this).css("backgroundPosition", "0 -33px"), a.trigger("click"))
                }), b && $wrap.css("background-position", "0 -33px"), a.wrap($wrap)
            })
        }
    }, e.validate = function(a) {
        var b, c, h, i = {};
        c = {
            name: null,
            target: "form",
            fieldArr: [],
            validateMethodArr: [],
            validateData: {},
            tip: {},
            showTip: !1,
            inputTheme: !1,
            before: function() {}
        };
        var j = function(a, b, c) {
            var d = {},
                e = 0,
                f = b.length;
            for (e; f > e; e++)
                for (var g in a)
                    if (b[e].name == g) {
                        d[g] = c && "function" == typeof c ? c.apply(this, [g, a[g], b[e], a]) : a[g], delete a[g];
                        break
                    }
            return d
        };
        if (c = d.extend(c, a), b = d(c.target), c.tip = d.extend(e.tip, c.tip), c.name = c.name || b.data("name"), !c.name) throw "name is empty";
        if ("array" == d.type(c.fieldArr) && b.find("input[type='text'],input[type='password'],input[type='checkbox'],input[type='radio'],input[type='file'],select,textarea").each(function() {
            var a = d(this),
                b = a.data("is"),
                f = a.attr("name"),
                g = {};
            if (b && (b = d.trim(b).split(/\s+/)), b && b.length)
                for (var h = 0, i = b.length; i > h; h++) c.validateMethodArr.push(b[h]);
            f && (g.name = f, "false" == a.data("required") ? g.required = !1 : "true" == a.data("required") && (g.required = !0), g.label = a.parent().children(".ui-label").text().replace("*", ""), c.fieldArr.push(g)), c.showTip && d.each(c.tip, function(b, c) {
                return c && f == b ? (a.focus(function() {
                    e.tipfocus(a, c)
                }).blur(function() {
                    e.tipblur(a)
                }), !1) : void 0
            })
        }), h = c.fieldArr.length, !h) throw "fieldArr is empty";
        return c.validateData = d.extend(e.validateData, c.validateData), d.each(c.validateData, function(a, b) {
            i[a] = "rules" == a ? j(b[c.name], c.fieldArr, function(a, b, c) {
                return (c.required || c.required === !1) && (b.required = !!c.required), b
            }) : "messages" == a ? j(b[c.name], c.fieldArr, function(a, b, c) {
                return b.required == e.err.required && (b.required = c.label + e.err.required), b
            }) : b
        }), e.addValidateMethod(c.validateMethodArr), d(".placeholder").length && e.placeholder(), c.before.call(this, e, b), c.inputTheme && (i = d.extend(f, i)), c.showSingleError && (i = d.extend(g, i)), b.validate(i)
    }, c.exports = e
}), define("widgets/goTop", ["jquery"], function(a, b, c) {
    var d = a("jquery");
    c.exports = function(a) {
        function b() {
            var a = (d(window).width() - 960) / 2;
            a > 0 && c.css("left", 960 + a + 20 + "px")
        }
        a = d.extend({
            elem: ".ui-goTop"
        }, {}, a);
        var c = d(a.elem);
        c.on("click", function() {
            return d("body,html").animate({
                scrollTop: 0
            }, 800), !1
        }).hide(), d(window).scroll(function() {
            d(this).scrollTop() > 200 ? c.fadeIn() : c.fadeOut()
        }).resize(function() {
            b()
        }), b()
    }
}), define("widgets/list", ["jquery", "common", "protocol", "simplePagination"], function(a, b, c) {
    var d = a("jquery"),
        e = a("common"),
        f = a("protocol");
    a("simplePagination"), DEFAULT_DELAY = 750;
    var g = function(a, b) {
        d.extend(this, {
            conf: a,
            activeClass: a.activeClass,
            delay: a.delay || DEFAULT_DELAY,
            container: a.container,
            checkboxTrigger: a.checkboxTrigger,
            isMultiterm: a.isMultiterm || !1,
            categoryTag: a.categoryTag || ".category-tag",
            changed: a.changed,
            switcher: ".ui-filter-switcher",
            status: null,
            list: b,
            timer: null
        })
    };
    d.extend(g.prototype, {
        init: function() {
            return this.initTags(), this.initSwitcher(), this.loadStatus(), this
        },
        getParams: function() {
            var a = this,
                b = arguments.callee.getRowValue;
            void 0 === b && (b = function(a, b) {
                var c = [];
                return 0 === a.length ? "boolean" == b ? "false" : "" : (a.each(function(a, b) {
                    var d = b.value;
                    "all" == d && (d = ""), c.push(d)
                }), "boolean" == b ? "true" : c.join(","))
            });
            for (var c, e = function() {
                var b = [],
                    c = a.container.find("ul.category");
                return c.each(function() {
                    b.push(d(this).data("category"))
                }), b
            }(), f = 0, g = {}; f < e.length; f++) c = b(d("input[name=" + e[f] + "][checked=checked]")), "" !== c && (g[e[f]] = c);
            return g
        },
        loadStatus: function() {
            var a = this.getParams(),
                b = d.param(a);
            null !== this.status && this.status !== b && this.changed(this.list, a), this.status = b
        },
        initSwitcher: function() {
            var a = this;
            d(a.switcher).click(function() {
                a.isMultiterm ? (d(this).removeClass("active"), a.isMultiterm = !1, a.container.find("li.all").click()) : (d(this).addClass("active"), a.isMultiterm = !0)
            })
        },
        activate: function(a) {
            a.addClass("active"), a.children("input").attr("checked", "checked")
        },
        deactivate: function(a) {
            a.removeClass("active"), a.children("input").removeAttr("checked")
        },
        initTags: function() {
            var a = this;
            d(a.categoryTag).click(function() {
                var b = d(this),
                    c = b.siblings("li.all");
                a.isMultiterm && !b.hasClass("all") ? b.hasClass("active") ? (0 === b.siblings(".active").length && a.activate(c), a.deactivate(b)) : (c.hasClass("active") && a.deactivate(c), a.activate(b)) : (a.deactivate(b.siblings()), a.activate(b)), a.timer && window.clearTimeout(a.timer), a.timer = window.setTimeout(function() {
                    a.loadStatus()
                }, a.delay)
            })
        }
    });
    var h = function(a, b) {
        d.extend(this, {
            list: b,
            id: a.id,
            clicked: a.clicked || function() {},
            delay: a.delay || DEFAULT_DELAY,
            _timer: null,
            _status: {
                sortable: {},
                filterable: {}
            },
            _ui: {}
        })
    };
    d.extend(h.prototype, {
        init: function() {
            return this.update(), this
        },
        _clicked: function() {
            var a = this;
            a._timer && window.clearTimeout(a._timer), a._timer = window.setTimeout(function() {
                a.clicked(a.list)
            }, a.delay)
        },
        render: function() {
            var a = this,
                b = this._ui;
            d.each(b.sortable, function(b, c) {
                var e = d(c),
                    f = e.data("name");
                a._status.sortable.orderBy == f && (e.addClass(a._status.sortable.order), e.children("em").text(e.hasClass("asc") ? "（升序）" : e.hasClass("desc") ? "（降序）" : "（排序）"))
            }), d.each(b.filterable, function(b, c) {
                var e = d(c),
                    f = e.data("name");
                a._status.filterable[f] && e.addClass(a._status.filterable[f])
            })
        },
        update: function() {
            var a = this,
                b = this._ui,
                c = d(this.id);
            b.sortable = c.children(".ui-list-title-sortable"), b.filterable = c.children(".ui-list-title-filterable"), this.render(), b.sortable.click(function() {
                var b = d(this),
                    c = b.data("name"),
                    e = a._status.sortable;
                b.siblings(".ui-list-title-sortable").removeClass("asc").removeClass("desc"), b.siblings(".ui-list-title-sortable").children("em").text("（排序）"), e.orderBy = c;
                var f = b.data("next");
                if (b.hasClass("desc") || b.hasClass("asc")) {
                    var g = "asc" == f ? "desc" : "asc";
                    b.hasClass(f) ? (b.removeClass(f), b.addClass(g), e.order = g) : (b.removeClass(g), e.order = "")
                } else b.addClass(f), e.order = f;
                b.children("em").text(b.hasClass("asc") ? "（升序）" : b.hasClass("desc") ? "（降序）" : "（排序）"), a._clicked()
            }), b.filterable.click(function() {
                var b = d(this),
                    c = b.data("name"),
                    e = a._status.filterable;
                b.hasClass("checked") ? (b.removeClass("checked"), e[c] = "") : (b.addClass("checked"), e[c] = "checked"), a._clicked()
            })
        },
        getParams: function() {
            var a, b, c, e = {},
                f = this._ui.sortable;
            for (a = 0; a < f.length; a++) b = d(f[a]), c = b.data("name"), b.hasClass("asc") ? (e.orderBy = c, e.order = "ASC") : b.hasClass("desc") && (e.orderBy = c, e.order = "DESC");
            var g = this._ui.filterable;
            for (a = 0; a < g.length; a++) b = d(g[a]), c = b.data("name"), b.hasClass("checked") && (e[c] = !0);
            return e
        }
    });
    var i = function(a, b) {
        d.extend(this, {
            list: b,
            container: a.container,
            clicked: a.clicked || function() {},
            _count: null
        })
    };
    d.extend(i.prototype, {
        init: function(a, b) {
            return this.update(a, b), this
        },
        update: function(a, b) {
            if (b != this._count) {
                if (this.container.empty(), this._count = b, 1 >= b) return;
                var c = this;
                this.container.pagination({
                    cssStyle: "ui-pagination",
                    pages: b,
                    currentPage: a,
                    onPageClick: function(a) {
                        c.clicked(c.list, a)
                    }
                })
            }
        }
    });
    var j = function(a) {
        d.extend(this, {
            name: a.name,
            api: a.api,
            hasFilter: a.filter,
            hasHeader: a.header,
            hasMore: a.more,
            hasPagination: a.pagination,
            rendered: a.rendered || function() {},
            delay: a.delay || DEFAULT_DELAY,
            container: a.container || d("#" + a.name),
            template: a.template || d("#" + a.name + "-template"),
            templateForItem: a.templateForItem || d("#" + a.name + "-item-template"),
            renderMode: a.renderMode,
            _params: a.params || {},
            _filter: null,
            _header: null,
            _isLoading: !1
        })
    };
    d.extend(j.prototype, {
        init: function(a) {
            if (this.startLoading(), this.hasFilter && this._initFilter(), a) {
                var b = 0,
                    c = 0;
                a.data && (a.data = f.translator.translate(this.api, a.data), b = a.data.pageIndex, c = a.data.pageCount), this.render(a), this.hasHeader && this._initHeader(), this.hasPagination && this._initPagination(b, c)
            }
            return this.stopLoading(), this
        },
        _initFilter: function() {
            var a = this.hasFilter;
            "boolean" == typeof this.hasFilter && (a = {
                container: d("#" + this.name + "-filter"),
                changed: function(a, b) {
                    var c = a.getParams(!0);
                    d.extend(c, b), a._update(c)
                }
            }), this._filter = new g(a, this).init()
        },
        _initHeader: function() {
            var a = this.hasHeader;
            "boolean" == typeof a && (a = {
                id: "#" + this.name + "-header",
                clicked: function(a) {
                    a._update(a.getParams())
                }
            }), this._header = new h(a, this).init()
        },
        _initPagination: function(a, b) {
            var c = this.hasPagination;
            "boolean" == typeof c && (c = {
                container: d("#" + this.name + "-pagination"),
                clicked: function(a, b) {
                    var c = a.getParams();
                    c.pageIndex = b, a._update(c)
                }
            }), this._pagination = new i(c, this).init(a, b)
        },
        _update: function(a, b) {
            if (this.api) {
                var c = this;
                c.startLoading(), f[this.api](a, function(a, d, e) {
                    c.render({
                        status: a,
                        message: d,
                        data: e
                    }), c.stopLoading(), b && b(a, d, e)
                })
            }
        },
        getParams: function(a, b) {
            var c = jQuery.extend(!0, {}, this._params);
            return this.hasFilter && !a && d.extend(c, this._filter.getParams()), this.hasHeader && !b && d.extend(c, this._header.getParams()), c
        },
        render: function(a) {
            var b = a.data;
            b._hasHeader = this.hasHeader, b._hasMore = this.hasMore, 0 !== a.status && (b._message = a.message);
            var c = e.fillTemplate({
                data: b,
                template: this.template
            });
            this.container.html(c), this.hasHeader && (this._header ? this._header.update() : this._initHeader()), this.hasPagination && (this._pagination ? this._pagination.update(b.pageIndex, b.pageCount) : this._initPagination(b.pageIndex, b.pageCount)), this.rendered(a)
        },
        add: function(a, b, c) {
            var d = c || this.templateForItem,
                f = e.fillTemplate({
                    data: a,
                    template: d
                });
            if (b) {
                var g = this.container.children(".ui-list-header");
                g.length > 0 ? g.after(f) : this.container.prepend(f)
            } else {
                var h = this.container.children(".ui-list-more");
                h.length > 0 ? h.before(f) : this.container.append(f)
            }
            var i = this.container.children(".ui-list-status");
            i.length > 0 && i.remove()
        },
        startLoading: function() {
            this._isLoading = !0, 0 === this.container.children("li.ui-list-loading").length && this.container.append('<li class="ui-list-loading" style="display: none;"></li>'), this.container.children("li.ui-list-loading").show()
        },
        stopLoading: function() {
            this._isLoading = !1, this.container.children("li.ui-list-loading").hide()
        }
    }), c.exports = j
}), define("widgets/pswLevel", [], function(a, b, c) {
    var d = function(a) {
        var b, c = a.match(/\d/g),
            d = a.match(/[a-z]/g),
            e = a.match(/[A-Z]/g),
            f = a.match(/[!%#$\^*~.&]/g),
            g = a.length,
            h = c ? c.length : 0,
            i = d ? d.length : 0,
            j = e ? e.length : 0,
            k = f ? f.length : 0,
            l = !1,
            m = !1,
            n = !1,
            o = !1,
            p = 0,
            q = {};
        return 6 >= g && g >= 8 ? p += 10 : g > 8 && (p += 25), i > 0 && j > 0 ? (m = !0, l = !0, p += 20) : (i || j) && (l = !0, p += 10), h >= 1 && 2 >= h ? (n = !0, p += 10) : h >= 3 && (n = !0, p += 20), 1 == k ? (o = !0, p += 10) : k > 1 && (o = !0, p += 25), m && n && o ? p += 10 : l && n && o ? p += 5 : l && n && (p += 2), b = p > 80 ? "强" : p >= 50 && 80 >= p ? "中" : "弱", q.score = p, q.level = b, q
    };
    c.exports = d
}), define("widgets/slider", ["jquery"], function(a, b, c) {
    var d = a("jquery"),
        e = function(a) {
            function b(b) {
                a.targetNav.find("li").eq(b).addClass(a.curClass).siblings().removeClass(a.curClass), f.eq(b).fadeIn("slow").siblings().fadeOut("slow")
            }

            function c() {
                e = setInterval(function() {
                    b(g), g++, g >= h.find("li").length && (g = 0), f.eq(g).fadeIn().siblings().fadeOut(), h.find("li").eq(g).addClass(a.curClass).siblings().removeClass(a.curClass)
                }, a.delay)
            }
            a = d.extend({
                target: d("#slides"),
                targetNav: d("#slider_nav"),
                curIndex: 0,
                delay: 3e3,
                curClass: "active"
            }, a);
            var e, f = a.target.find("li"),
                g = (f.length, a.curIndex),
                h = d("<ul>").addClass("slider-nav-pointer").appendTo(a.targetNav);
            f.each(function(a) {
                var b = a + 1;
                d('<li><a href="#">' + b + "</a></li>").appendTo(h), d(this).css("background", d(this).data("background"))
            }).eq(g).show(), a.target.parent().css("background", "none"), h.find("li").eq(g).addClass(a.curClass), b(g), c(), d(a.target).find("li").hover(function() {
                clearInterval(e)
            }, c), h.find("li").on("click", function(h) {
                g = d(this).index(), d(this).addClass(a.curClass).siblings().removeClass(a.curClass), f.eq(g).fadeIn("slow").siblings().fadeOut("slow"), h.preventDefault(), clearInterval(e), b(g), c()
            })
        };
    c.exports = e
}), define("widgets/tab", ["jquery"], function(a, b, c) {
    var d = a("jquery"),
        e = function(a) {
            d.extend(this, {
                name: a.name,
                tabs: a.tabsContainer || d("#" + a.name + "-tab"),
                contents: a.contentsContainer || d("#" + a.name + "-tab-content"),
                switched: a.switched || function() {},
                clicked: a.clicked || function() {},
                _current: null
            }), this.tabItems = this.tabs.find(".ui-tab-item"), this.contentItems = this.contents.find(".ui-tab-content"), this.ui = {};
            var b = this;
            d.each(this.tabItems, function(a, c) {
                var e = d(c);
                name = e.data("name"), b.ui[name] || (b.ui[name] = {}), b.ui[name].tab = e, b.ui[name].initialized = !1
            }), d.each(this.contentItems, function(a, c) {
                var e = d(c);
                name = e.data("name"), b.ui[name].content = e
            })
        };
    d.extend(e.prototype, {
        init: function() {
            this._current = this.getName(this.tabs.find(".ui-tab-item-current")), this.ui[this._current].initialized = !0;
            var a = this;
            this.tabItems.click(function() {
                var b = a._current,
                    c = a.getName(d(this));
                if (a._current = c, a.clicked(c, a.ui[c].initialized), b != c) {
                    a.ui[b].tab.removeClass("ui-tab-item-current"), a.ui[b].content.removeClass("ui-tab-content-current"), a.ui[c].tab.addClass("ui-tab-item-current"), a.ui[c].content.addClass("ui-tab-content-current");
                    var e = a.switched(b, c, a.ui[c].initialized);
                    a.ui[c].initialized = e
                }
            })
        },
        getName: function(a) {
            return a.data("name")
        }
    }), c.exports = e
}), define("widgets/widgets", ["widgets/captcha", "widgets/counter", "widgets/form", "widgets/list", "widgets/tab", "widgets/slider", "widgets/goTop", "widgets/pswLevel"], function(a, b, c) {
    var d = {};
    d.Captcha = a("widgets/captcha"), d.Counter = a("widgets/counter"), d.Form = a("widgets/form"), d.List = a("widgets/list"), d.Tab = a("widgets/tab"), d.Slider = a("widgets/slider"), d.GoTop = a("widgets/goTop"), d.pswLevel = a("widgets/pswLevel"), c.exports = d
});