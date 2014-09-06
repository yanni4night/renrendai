define("protocol", ["jquery"], function(a, b, c) {
    var d = a("jquery"),
        e = {
            REQ: "req",
            OPT: "opt",
            COND: "cond"
        },
        g = {
            getNews: {
                url: "/about/about/json.action?flag=news",
                type: "GET",
                dataType: "json",
                _list: "news"
            },
            getNotices: {
                url: "/about/about/json.action?flag=notices",
                type: "GET",
                dataType: "json",
                _list: "notices"
            },
            getLoans: {
                url: "/lend/loanList/json.action",
                type: "GET",
                dataType: "json",
                _list: "loans"
            },
            getLoansTransfer: {
                url: "/transfer/transferList/json.action",
                type: "GET",
                dataType: "json",
                _list: "transferList"
            },
            getLoanInvestmentRecords: {
                url: "/lend/getborrowerandlenderinfo.action",
                type: "GET",
                dataType: "json",
                params: {
                    loanId: e.REQ
                },
                _params: {
                    id: "lenderRecords"
                },
                _list: "lenderRecords"
            },
            getLoanLenderRecords: {
                url: "/lend/getborrowerandlenderinfo.action",
                type: "GET",
                dataType: "json",
                params: {
                    loanId: e.REQ
                },
                _params: {
                    id: "lenderInfo"
                },
                _list: "lenders"
            },
            getLoanTransferRecords: {
                url: "/transfer/transactionList.action",
                type: "GET",
                dataType: "json",
                params: {
                    loanId: e.REQ
                },
                _list: "loanTransferLogList"
            },
            getLoanRepaymentRecords: {
                url: "/lend/getborrowerandlenderinfo.action",
                type: "GET",
                dataType: "json",
                params: {
                    loanId: e.REQ
                },
                _params: {
                    id: "repayDetail"
                },
                _list: "phases"
            },
            getLoanCollectionRecords: {
                url: "/lend/dunDetail.action",
                type: "GET",
                dataType: "json",
                params: {
                    loanId: e.REQ
                },
                _list: "dunInfoList"
            },
            getCreditInfo: null,
            getCommentsOnLoan: {
                url: "/lend/loanCommentList.action",
                type: "GET",
                dataType: "json",
                params: {
                    loanId: e.REQ,
                    pageIndex: e.OPT
                }
            },
            postCommentOnLoan: {
                url: "/lend/commentLoan.action",
                type: "POST",
                dataType: "json",
                params: {
                    id: e.REQ,
                    threadId: e.REQ,
                    comment: e.REQ
                }
            },
            getPlans: {
                url: "/financeplan/listPlan/listPlanJson.action",
                type: "GET",
                dataType: "json",
                _list: "plans"
            },
            getPlanReserveRecords: {
                url: "/financeplan/getFinancePlanLenders/reserveRecord.action",
                type: "GET",
                dataType: "json",
                params: {
                    financePlanStr: e.REQ
                },
                _list: "rsvList"
            },
            getPlanJoinedRecords: {
                url: "/financeplan/getFinancePlanLenders.action",
                type: "GET",
                dataType: "json",
                params: {
                    financePlanStr: e.REQ
                },
                _list: "jsonList"
            },
            getPlanPerformance: {
                url: "/financeplan/listPlan/planResults.action",
                type: "GET",
                dataType: "json",
                params: {
                    financePlanId: e.REQ
                }
            },
            getUnreadMsgCount: {
                url: "/getUnreadMailsCount.action",
                type: "GET",
                dataType: "json"
            },
            getUserBankInfo: null,
            getUserTransactions: {
                url: "/account/capital/transactionJson.action",
                type: "GET",
                dataType: "json",
                params: {
                    type: e.REQ,
                    year: e.COND,
                    startMonth: e.COND,
                    endMonth: e.COND,
                    time: e.COND
                },
                _list: "pointLogs"
            },
            getUserRepayingRecords: {
                url: "/account/borrow/listInProgress.action",
                type: "GET",
                dataType: "json",
                params: {
                    pageIndex: e.OPT
                },
                _list: "data"
            },
            getUserRepaidRecords: {
                url: "/account/borrow/listDoneLoans.action",
                type: "GET",
                dataType: "json",
                params: {
                    pageIndex: e.OPT
                },
                _list: "data"
            },
            getUserLoanRepaymentRecords: {
                url: "/account/borrow/listRecord.action",
                type: "GET",
                dataType: "json",
                params: {
                    loanId: e.REQ
                }
            },
            getUserLoanApplicationRecords: {
                url: "/account/borrow/listAll.action",
                type: "GET",
                dataType: "json",
                params: {
                    pageIndex: e.OPT
                },
                _list: "data"
            },
            getUserLoansRepaying: {
                url: "/account/invest/loanPreJson.action",
                type: "GET",
                dataType: "json",
                params: {
                    pageIndex: e.OPT
                },
                _params: {
                    loanType: "REPAYING_LOAN"
                },
                _list: "loanList"
            },
            getUserLoansRepaid: {
                url: "/account/invest/loanJson.action",
                type: "GET",
                dataType: "json",
                params: {
                    pageIndex: e.OPT
                },
                _params: {
                    loanType: "FINISH_LOAN"
                },
                _list: "loanList"
            },
            getUserLoansInProgress: {
                url: "/account/invest/loanJson.action",
                type: "GET",
                dataType: "json",
                params: {
                    pageIndex: e.OPT
                },
                _params: {
                    loanType: "BID_LOAN"
                },
                _list: "loanList"
            },
            getUserLoansReturnRecords: {
                url: "/account/invest/backAccountJson.action",
                type: "GET",
                dataType: "json",
                params: {
                    pageIndex: e.OPT,
                    backStatus: e.OPT,
                    backStartTime: e.OPT,
                    backEndTime: e.OPT
                },
                _list: "backAccountVo"
            },
            getUserTransferringLoans: {
                url: "/account/invest/transferJson.action",
                type: "GET",
                dataType: "json",
                params: {
                    pageIndex: e.OPT
                },
                _params: {
                    transferType: "OF_TRANSFERRED"
                },
                _list: "transferList"
            },
            getUserTransferableLoans: {
                url: "/account/invest/transferJson.action",
                type: "GET",
                dataType: "json",
                params: {
                    pageIndex: e.OPT
                },
                _params: {
                    transferType: "PRE_TRANSFERRED"
                },
                _list: "transferList"
            },
            getUserTransferredInLoans: {
                url: "/account/invest/transferJson.action",
                type: "GET",
                dataType: "json",
                params: {
                    pageIndex: e.OPT
                },
                _params: {
                    transferType: "INTO_TRANSFERRED"
                },
                _list: "transferList"
            },
            getUserTransferredOutLoans: {
                url: "/account/invest/transferJson.action",
                type: "GET",
                dataType: "json",
                params: {
                    pageIndex: e.OPT
                },
                _params: {
                    transferType: "OUT_TRANSFERRED"
                },
                _list: "transferList"
            },
            getUserTransferredOutRecords: {
                url: "/account/invest/getTranfsferLogJson.action",
                type: "GET",
                dataType: "json",
                params: {
                    tranfsferId: e.REQ,
                    pageIndex: e.OPT
                },
                _list: "transferLogList"
            },
            getUserHoldingPlans: {
                url: "/account/invest/planJson.action",
                type: "GET",
                dataType: "json",
                params: {
                    pageIndex: e.OPT
                },
                _params: {
                    planType: "HOLD_PLAN"
                },
                _list: "financePlanList"
            },
            getUserExitingPlans: {
                url: "/account/invest/planJson.action",
                type: "GET",
                dataType: "json",
                params: {
                    pageIndex: e.OPT
                },
                _params: {
                    planType: "EXITING_PLAN"
                },
                _list: "financePlanList"
            },
            getUserExitedPlans: {
                url: "/account/invest/planJson.action",
                type: "GET",
                dataType: "json",
                params: {
                    planType: e.OPT
                },
                _params: {
                    planType: "EXIT_PLAN"
                },
                _list: "financePlanList"
            },
            getUserReservePlans: {
                url: "/account/invest/planJson.action",
                type: "GET",
                dataType: "json",
                params: {
                    planType: e.OPT
                },
                _params: {
                    planType: "RESERVE_PLAN"
                },
                _list: "financePlanList"
            },
            getUserPlanRecords: {
                url: "/account/invest/planInfoJson.action",
                type: "GET",
                dataType: "json",
                params: {
                    financeId: e.REQ,
                    subPointId: e.REQ,
                    pageIndex: e.OPT
                },
                _list: "financePlanList"
            },
            getUserInfo: {
                url: "/account/myInfo/userDetailLoanList.action",
                type: "GET",
                params: {
                    userId: e.REQ
                },
                dataType: "json",
                _list: "loanList"
            },
            getExpectedAmountsForPlanExiting: {
                url: "/account/invest/planInfoForExitingJson.action",
                type: "GET",
                dataType: "json",
                params: {
                    subPointId: e.REQ
                }
            },
            getUserReversPlanPay: {
                url: "/account/invest/detailPlanRsv.action",
                type: "GET",
                dataType: "json",
                params: {
                    financeId: e.REQ
                }
            }
        },
        h = function(a) {
            d.extend(this, {
                CREDITINFO_MAPPING: [{
                    key: "credit",
                    name: "信用报告"
                }, {
                    key: "identificationScanning",
                    name: "身份认证"
                }, {
                    key: "graduation",
                    name: "学历认证"
                }, {
                    key: "work",
                    name: "工作认证"
                }, {
                    key: "titles",
                    name: "职称认证"
                }, {
                    key: "incomeDuty",
                    name: "收入认证"
                }, {
                    key: "house",
                    name: "房产认证"
                }, {
                    key: "car",
                    name: "车产认证"
                }, {
                    key: "marriage",
                    name: "婚姻认证"
                }, {
                    key: "residence",
                    name: "居住地证明"
                }, {
                    key: "fieldAudit",
                    name: "实地认证"
                }, {
                    key: "organization",
                    name: "机构担保"
                }, {
                    key: "video",
                    name: "视频认证"
                }, {
                    key: "mobileReceipt",
                    name: "手机认证"
                }, {
                    key: "kaixin",
                    name: "微博认证"
                }, {
                    key: "other",
                    name: "其他认证"
                }],
                URL: {
                    userHome: "/account/myInfo.action?userId=",
                    planDetails: "/financeplan/listPlan/detailPlan.action?financePlanId=",
                    loanDetails: "/lend/detailPage.action?loanId=",
                    loanApplication: "/borrow/borrow.action",
                    loanTransferDetails: "/transfer/loanTransferDetail.action?transferId=",
                    userPlan: "/account/invest/planInfo.action?financeId=",
                    helpForBorrower: "/help/borrow.action#"
                },
                protocol: a
            })
        };
    d.extend(h.prototype, {
        _getDateTime: function(a, b) {
            var c = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/i;
            if (isNaN(Date.parse(a)) || c.test(a)) return "date" == b ? a ? a.substring(0, 10) : "" : a ? a.substring(0, 16).replace("T", " ") : "";
            var d = new Date(a),
                e = d.getFullYear(),
                f = d.getDate(),
                g = d.getMonth() + 1;
            if (f = 10 > f ? "0" + f : f, g = 10 > g ? "0" + g : g, "date" == b) return e + "-" + g + "-" + f;
            var h = d.getHours(),
                i = d.getMinutes();
            return h = 10 > h ? "0" + h : h, i = 10 > i ? "0" + i : i, e + "-" + g + "-" + f + " " + h + ":" + i
        },
        _bankersRound: function(a, b) {
            "string" == typeof a && (a = parseFloat(a));
            var c = 1e-8,
                d = 0 !== a ? Math.floor(a / Math.abs(a)) : 1;
            return b = null === b || void 0 === b ? 2 : b, a = Math.abs(a) * Math.pow(10, b), i = Math.floor(a), f = a - i, a = Math.abs(f - .5) < c ? 1 == (1 & i) ? i + 1 : i : Math.round(a), (d * a / Math.pow(10, b)).toFixed(2)
        },
        _fixedFloat2: function(a) {
            return "string" == typeof a && (a = parseFloat(a, 10)), parseFloat(Math.round(100 * a) / 100, 10).toFixed(2)
        },
        _commaInteger: function(a) {
            return a = parseInt(a, 10), a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        },
        _commaFloat: function(a) {
            return this._fixedFloat2(a).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        },
        _loanRepaidStatus: function(a) {
            return "string" != typeof a && (a = parseInt(a, 10)), 5 == a || "BAD_DEBT" == a ? "垫付结清" : 6 == a || "CLOSED" == a ? "正常结清" : ""
        },
        _loanStatus: function(a) {
            return "string" != typeof a && (a = parseInt(a, 10)), 0 === a || "OPEN" == a ? "招标中" : 1 == a || "READY" == a ? "已满标" : 2 == a || "FAILED" == a ? "已流标" : 3 == a || "IN_PROGRESS" == a ? "还款中" : 4 == a || "OVER_DUE" == a ? "逾期" : 5 == a || "BAD_DEBT" == a ? "坏账" : 6 == a || "CLOSED" == a ? "已还清" : 7 == a || "FIRST_APPLY" == a ? "申请中" : 8 == a || "FIRST_READY" == a ? "已满标" : 9 == a || "PRE_SALES" == a ? "预售中" : ""
        },
        _planStatus: function(a) {
            return "PURCHASEING" == a ? "申请期" : "PURCHASE_END" == a ? "锁定期" : "REDEMPTION_PERIOD" == a ? "开放期" : "PLAN_CLOSED" == a ? "已结束" : ""
        },
        _returnStatus: function(a) {
            return 0 === a || "REPAID" == a ? "已收" : 1 == a || "UNREPAID" == a ? "待收" : 2 == a || "OVER_DUE" == a ? "逾期" : ""
        },
        _loanType: function(a) {
            return "XYRZ" == a ? "信用认证标" : "SDRZ" == a ? "实地认证标" : "JGDB" == a ? "机构担保标" : "ZNLC" == a ? "智能理财标" : ""
        },
        _jobType: function(a) {
            return "工薪阶层" == a ? {
                name: "工薪阶层",
                anchor: "prod-work"
            } : "私营企业主" == a ? {
                name: "私营企业主",
                anchor: "prod-biz"
            } : "网商" == a || "网络商家" == a ? {
                name: "网商",
                anchor: "prod-ecomm"
            } : null
        },
        news: function(a) {
            return {
                title: a.title,
                content: a.description,
                date: this._getDateTime(a.time, "date"),
                noticeId: a.noticeId
            }
        },
        notices: function(a) {
            return {
                title: a.title,
                content: a.description,
                date: this._getDateTime(a.time, "date"),
                noticeId: a.noticeId
            }
        },
        loan: function(a) {
            var b = parseInt(100 * this._bankersRound(a.finishedRatio / 100), 10);
            100 == b && a.finishedRatio < 100 && a.finishedRatio > 99 && (b = 99);
            var c = {
                title: a.title,
                loanType: a.displayLoanType,
                loanTypeText: this._loanType(a.displayLoanType),
                creditLevel: a.borrowerLevel,
                interest: this._fixedFloat2(a.interest),
                amount: this._commaInteger(a.amount),
                term: a.months,
                progress: b,
                link: this.URL.loanDetails + a.loanId,
                status: a.status
            };
            return "OPEN" == c.status && (c.buttonLink = this.URL.loanDetails + a.loanId), c
        },
        loansTransfer: function(a) {
            return {
                title: a.title,
                loanType: a.displayLoanType,
                loanTypeText: this._loanType(a.displayLoanType),
                creditLevel: a.borrowerLevel,
                interest: this._fixedFloat2(a.interest),
                link: this.URL.loanTransferDetails + a.id,
                term: a.leftPhaseCount,
                cost: a.pricePerShare,
                share: a.share,
                discount: 100 * a.discountRatio,
                price: this._fixedFloat2(a.resultPice)
            }
        },
        loanInvestmentRecord: function(a, b) {
            return {
                id: b + 1,
                investorShort: a.userNickName.length <= 6 ? a.userNickName : a.userNickName.substring(0, 6) + "...",
                investor: a.userNickName,
                mobileUsed: "MOBILE" === a.tradeMethod,
                isPlan: "FINANCEPLAN_BID" == a.lenderType,
                isAuto: "AUTO_BID" == a.lenderType,
                planId: a.financePlanId,
                userId: a.userId,
                planLink: this.URL.planDetails + a.financePlanId,
                amount: this._fixedFloat2(a.amount),
                time: this._getDateTime(a.lendTime),
                itemStyle: b % 2 === 0 ? "dark" : ""
            }
        },
        loanLenderRecord: function(a, b) {
            return {
                id: b + 1,
                investorShort: a.nickName.length <= 6 ? a.nickName : a.nickName.substring(0, 6) + "...",
                investor: a.nickName,
                userId: a.userId,
                isPlan: null !== a.financePlanId,
                planId: a.financePlanId,
                planLink: this.URL.planDetails + a.financePlanId,
                amount: this._fixedFloat2(a.leftAmount),
                shares: a.share,
                itemStyle: b % 2 === 0 ? "dark" : ""
            }
        },
        loanTransferRecord: function(a, b) {
            return {
                buyerShort: a.toUserId.length <= 4 ? a.toUserId : a.toUserId.substring(0, 4) + "...",
                buyer: a.toUserId,
                buyerId: a.toNickName,
                toPlanId: a.financePlanId,
                toPlanLink: this.URL.planDetails + a.financePlanId,
                sellerShort: a.fromUserId.length <= 4 ? a.fromUserId : a.fromUserId.substring(0, 4) + "...",
                seller: a.fromUserId,
                sellerId: a.fromNickName,
                fromPlanId: a.fromFinancePlanId,
                fromPlanLink: this.URL.planDetails + a.fromFinancePlanId,
                amount: a.price,
                shares: a.share,
                time: this._getDateTime(a.createTime),
                itemStyle: b % 2 === 0 ? "dark" : ""
            }
        },
        loanRepaymentRecord: function(a, b) {
            return {
                repaidAmount: this._fixedFloat2(a.repaidAmount),
                unrepaidAmount: this._fixedFloat2(a.unRepaidAmount),
                repaidFee: this._fixedFloat2(a.repaidFee),
                unrepaidFee: this._fixedFloat2(a.unRepaidFee),
                allFee: this._fixedFloat2(a.repaidFee + a.unRepaidFee),
                status: a.repayType,
                date: "" === a.repayTime ? "--" : this._getDateTime(a.repayTime, "date"),
                actualRepaydate: this._getDateTime(a.actualRepayTime, "date"),
                itemStyle: b % 2 === 0 ? "dark" : ""
            }
        },
        loanCollectionRecord: function(a, b) {
            return {
                contact: a.contact,
                contactShort: a.contact.length <= 6 ? a.contact : a.contact.substring(0, 6) + "...",
                description: a.description,
                date: this._getDateTime(a.createTime, "date"),
                itemStyle: b % 2 === 0 ? "dark" : ""
            }
        },
        loanComment: function(a) {
            var b = [],
                c = this;
            return a.repliedComments && a.repliedComments.length && d.each(a.repliedComments, function(a, d) {
                d.commentTime && (d.commentTime = c._getDateTime(d.commentTime)), d.avatar = null === d.avatar || "" === d.avatar ? d.gender && 1 === d.gender ? "/static/img/account/default-avatar-girl-56.png" : "/static/img/account/default-avatar-56.png" : d.avatar, b.push(d)
            }), {
                id: a.commentId,
                userName: a.displayName,
                userLink: this.URL.userHome + a.byUserId,
                postTime: this._getDateTime(a.commentTime),
                content: a.content,
                avatar: null === a.avatar || "" === a.avatar ? a.gender && 1 === a.gender ? "/static/img/account/default-avatar-girl-56.png" : "/static/img/account/default-avatar-56.png" : a.avatar,
                byUserId: a.byUserId,
                commentId: a.commentId,
                repliedComments: b
            }
        },
        plan: function(a) {
            var b = this.URL.planDetails + a.id;
            return {
                name: a.name,
                amount: this._commaInteger(a.amount),
                headCount: a.subPointCount,
                averageBidCount: a.averageBidCount,
                fundsUseRate: this._fixedFloat2(a.fundsUseRate),
                averageBidInterest: this._fixedFloat2(a.averageBidInterest),
                earnInterest: this._commaFloat(this._fixedFloat2(a.earnInterest < 0 ? 0 : a.earnInterest)),
                createDate: a.createTime,
                link: b
            }
        },
        planReserveRecord: function(a, b) {
            return null !== a.ucodeId && a.nickName.length > 8 && (a.nickName = a.nickName.substr(0, 8) + "..."), {
                id: b + 1,
                investor: a.nickName,
                ucodeUsed: null !== a.ucodeId,
                mobileUsed: "MOBILE" === a.tradeMethod,
                planAmount: this._commaInteger(a.planAmount),
                planAmountNotComma: a.planAmount,
                reserveAmount: a.reserveAmount,
                date: this._getDateTime(a.createTime),
                status: a.reserveType,
                itemStyle: b % 2 === 0 ? "dark" : ""
            }
        },
        planJoinedRecord: function(a, b) {
            return {
                id: b + 1,
                investor: a.nickName,
                mobileUsed: "MOBILE" === a.tradeMethod,
                amount: this._commaInteger(a.amount),
                date: this._getDateTime(a.createTime),
                itemStyle: b % 2 === 0 ? "dark" : ""
            }
        },
        userTransaction: function(a, b) {
            var c = a.income ? this._fixedFloat2(a.income) : void 0,
                d = a.pay ? this._fixedFloat2(a.pay) : void 0;
            return "服务费" == a.operation && void 0 === d && (d = "0.00"), {
                time: this._getDateTime(a.time, "date"),
                type: a.operation,
                credit: c,
                debit: d,
                balance: this._fixedFloat2(a.banlance),
                note: a.notes,
                loanId: a.loanId,
                loanLink: this.URL.loanDetails + a.loanId,
                itemStyle: b % 2 === 0 ? "dark" : ""
            }
        },
        userRepayingRecord: function(a, b) {
            return ret = {
                loanId: a.id,
                loanLink: this.URL.loanDetails + a.id,
                title: a.name,
                amount: this._fixedFloat2(a.amount),
                interest: this._fixedFloat2(a.interest_year),
                termsLeft: a.left,
                termsInTotal: a.months,
                nextDueDate: a.nextDate,
                toRepayAmount: this._fixedFloat2(a.repaid),
                status: a.status,
                itemStyle: b % 2 === 0 ? "dark" : "",
                toRepayPrincipal: this._fixedFloat2(a.principal),
                interestForTerm: this._fixedFloat2(a.interest),
                mgmtFee: this._fixedFloat2(a.mgmtFee),
                overdueFee: this._fixedFloat2(a.overDueAmount),
                ratio: a.ratio,
                toRepayInTotal: this._fixedFloat2(a.total)
            }, ret.repayAllDisabled = "", ("逾期" == ret.status || "坏账" == ret.status) && (ret.repayAllDisabled = "disabled"), ret
        },
        userRepaidRecord: function(a, b) {
            return {
                loanId: a.id,
                loanLink: this.URL.loanDetails + a.id,
                title: a.name,
                amount: this._fixedFloat2(a.amount),
                interest: this._fixedFloat2(a.interest),
                termsInTotal: a.months,
                repaidInTotal: this._fixedFloat2(a.total),
                endDate: a.enddate,
                itemStyle: b % 2 === 0 ? "dark" : ""
            }
        },
        userLoanRepaymentRecord: function(a, b) {
            var c = "";
            return c = "REPAID" == a.status ? "IN_REPAY" == a.repaidType ? "提前还款" : "COMMON_REPAY" == a.repaidType ? "正常还款" : "OVER_DUE_REPAY" == a.repaidType ? "逾期还款" : "BAD_REPAY" == a.repaidType ? "坏账还款" : "" : "UNREPAID" == a.status ? "待还" : "逾期", {
                loanId: a.id,
                repaymentDate: a.date,
                toRepayAmount: this._fixedFloat2(a.repayAmount),
                toRepayPrincipal: this._fixedFloat2(a.principal),
                toRepayInterest: this._fixedFloat2(a.interest),
                mgmtFee: this._fixedFloat2(a.mgmt),
                overdueFee: this._fixedFloat2(a.fee ? a.fee : 0),
                status: c,
                shouldRepay: "REPAID" != a.status,
                termId: b + 1,
                itemStyle: b % 2 === 0 ? "dark" : ""
            }
        },
        userLoanApplicationRecord: function(a, b) {
            return ret = {
                loanId: a.id,
                loanLink: this.URL.loanDetails + a.id,
                title: a.name,
                amount: this._fixedFloat2(a.amount),
                interest: this._fixedFloat2(a.interest),
                termsInTotal: a.months,
                status: a.status,
                itemStyle: b % 2 === 0 ? "dark" : ""
            }, ("首次申请" == ret.status || "草稿" == ret.status) && (ret.status = "申请中", ret.loanLink = this.URL.loanApplication), ret
        },
        userTransferringLoan: function(a, b) {
            return a.loanTranfsferVo = a.loanTranfsferVo || {}, {
                transferId: a.id,
                transferLink: this.URL.loanTransferDetails + a.id,
                loanId: a.loanId,
                loanLink: this.URL.loanDetails + a.loanId,
                loanType: a.displayLoanType,
                loanTypeName: this._loanType(a.displayLoanType),
                amount: this._fixedFloat2(a.amount),
                termsLeft: a.leftPhaseCount,
                termsInTotal: a.months,
                interest: this._fixedFloat2(a.interest),
                value: this._fixedFloat2(a.totalPricePershare),
                price: this._fixedFloat2(a.resultPice),
                discount: this._fixedFloat2(100 * a.discountRatio),
                shares: a.share,
                sharesInTotal: a.initialShare,
                investShares: a.initialShare,
                fee: this._fixedFloat2(a.loanTranfsferVo.fee || 0),
                income: this._fixedFloat2(a.loanTranfsferVo.income || 0),
                itemStyle: b % 2 === 0 ? "dark" : ""
            }
        },
        userTransferableLoan: function(a, b) {
            return {
                loanId: a.id,
                loanLink: this.URL.loanDetails + a.id,
                loanType: a.displayLoanType,
                loanTypeName: this._loanType(a.displayLoanType),
                nextDueDate: this._getDateTime(a.nextRepayDay, "date"),
                amount: this._fixedFloat2(a.amount),
                investShares: a.initialShare,
                termsLeft: a.leftPhaseCount,
                termsInTotal: a.months,
                interest: this._fixedFloat2(a.interest),
                repayments: this._fixedFloat2(a.interestAndCorpus * a.share),
                value: this._fixedFloat2(a.resultPice * a.share),
                shares: a.share,
                lenderId: a.loanVo.lenderId,
                interestGained: this._fixedFloat2(a.loanVo.recoveryAmount),
                valuePerShare: this._fixedFloat2(a.resultPice),
                repaymentsPerShare: this._fixedFloat2(a.interestAndCorpus),
                interestPerShare: this._fixedFloat2(a.loanVo.pricePerShare),
                principalPerShare: this._fixedFloat2(a.loanVo.principalPerShareNow),
                fee: a.fee,
                itemStyle: b % 2 === 0 ? "dark" : ""
            }
        },
        userTransferredInLoan: function(a, b) {
            return {
                loanId: a.id,
                loanLink: this.URL.loanDetails + a.id,
                loanType: a.displayLoanType,
                loanTypeName: this._loanType(a.displayLoanType),
                termsLeft: a.leftPhaseCount,
                termsInTotal: "",
                interest: this._fixedFloat2(a.interest),
                principal: this._fixedFloat2(a.inCorpus),
                value: this._fixedFloat2(a.inPrice),
                shares: a.inShare,
                amount: this._fixedFloat2(a.income),
                pnl: this._fixedFloat2(a.profit),
                date: this._getDateTime(a.createTime, "date"),
                itemStyle: b % 2 === 0 ? "dark" : "",
                loantransferlogId: a.loantransferlogId
            }
        },
        userTransferredOutLoan: function(a, b) {
            return {
                loanId: a.id,
                loanLink: this.URL.loanDetails + a.id,
                loanType: a.displayLoanType,
                loanTypeName: this._loanType(a.displayLoanType),
                transferId: a.tranfsferId,
                shares: a.outShare,
                value: this._fixedFloat2(a.outSumPrice),
                price: this._fixedFloat2(a.outPrice),
                fee: this._fixedFloat2(a.fee),
                income: this._fixedFloat2(a.income),
                pnl: this._fixedFloat2(a.profit),
                itemStyle: b % 2 === 0 ? "dark" : ""
            }
        },
        userTransferredOutRecord: function(a, b) {
            return {
                user: a.toNickName,
                isPlan: "FINANCEPLAN_BID" == a.lenderType,
                planId: a.financePlanId,
                loanTypeName: this._loanType(a.displayLoanType),
                transferId: a.logId,
                planLink: this.URL.planDetails + a.financePlanId,
                userLink: this.URL.userHome + a.buyerId,
                value: this._fixedFloat2(a.pricePerShare),
                price: this._fixedFloat2(a.price),
                shares: a.share,
                fee: this._fixedFloat2(a.fee),
                income: this._fixedFloat2(a.income),
                pnl: this._fixedFloat2(a.profit),
                date: this._getDateTime(a.tranfsferDate, "date"),
                itemStyle: b % 2 === 0 ? "dark" : ""
            }
        },
        userHoldingPlan: function(a, b) {
            return ret = {
                name: a.name,
                link: this.URL.userPlan + a.id + "&subPointId=" + a.financeSubPointId,
                subPointId: a.financeSubPointId,
                amount: this._fixedFloat2(a.finalAmount),
                profit: this._fixedFloat2(a.earnAmount),
                interest: this._fixedFloat2(a.aveLoanRate),
                loans: a.loanBidCount,
                available: this._fixedFloat2(a.availablePrice),
                fee: this._fixedFloat2(a.serviceFee),
                joinFee: this._fixedFloat2(a.joinFee),
                status: this._planStatus(a.status),
                itemStyle: b % 2 === 0 ? "dark" : ""
            }, "PURCHASE_END" == a.status && (ret.leftLockingDays = a.endLockingTime), "REDEMPTION_PERIOD" == a.status && (ret.hasQuitButton = !0), ret
        },
        userExitingPlan: function(a, b) {
            return ret = {
                name: a.name,
                link: this.URL.userPlan + a.id + "&subPointId=" + a.financeSubPointId,
                amount: this._fixedFloat2(a.finalAmount),
                withdrawnInterest: this._fixedFloat2(a.totalCashDrawInterest),
                transferredAmount: this._fixedFloat2(a.redProgress),
                availableAmount: this._fixedFloat2(a.availablePrice),
                remainedValue: this._fixedFloat2(a.remainingAmount),
                transferringCount: parseInt(a.transferringLoanCount, 10),
                disabledCount: parseInt(a.disabledLoanCount, 10),
                itemStyle: b % 2 === 0 ? "dark" : ""
            }
        },
        userExitedPlan: function(a, b) {
            return ret = {
                name: a.name,
                link: this.URL.userPlan + a.id + "&subPointId=" + a.financeSubPointId,
                amount: this._fixedFloat2(a.finalAmount),
                profit: this._fixedFloat2(a.earnAmount),
                interest: this._fixedFloat2(a.aveLoanRate),
                loans: a.loanBidCount,
                fee: this._fixedFloat2(a.serviceFee),
                joinFee: this._fixedFloat2(a.joinFee),
                quitFee: this._fixedFloat2(a.quitFee),
                actualIncome: this._fixedFloat2(parseFloat(a.redProgress) + parseFloat(a.totalCashDrawInterest)),
                finishedDate: this._getDateTime(a.redFinishTime, "date"),
                itemStyle: b % 2 === 0 ? "dark" : ""
            }, ret.interest = this._fixedFloat2(100 * (ret.profit / ret.amount)), ret
        },
        userReservePlan: function(a, b) {
            return ret = {
                planId: a.id,
                name: a.name,
                amount: this._fixedFloat2(a.planAmount),
                depositAmount: this._fixedFloat2(a.depositAmount),
                unRepayAmount: this._fixedFloat2(a.unRepayAmount),
                endPayMentTime: this._getDateTime(a.endPayMentTime),
                rsvStatus: "UNPAID" == a.rsvStatus ? "等待支付" : "支付超时",
                isNotOverDue: "OVERDUE" == a.rsvStatus ? !1 : !0,
                itemStyle: b % 2 === 0 ? "dark" : ""
            }
        },
        userPlanRecord: function(a, b) {
            return ret = {
                loanId: a.loanId,
                loanLink: this.URL.loanDetails + a.loanId,
                loanType: a.displayLoanType,
                loanTypeName: this._loanType(a.displayLoanType),
                name: a.title,
                amount: this._fixedFloat2(a.lendAmount),
                shares: a.lendShare,
                interest: this._fixedFloat2(a.interest),
                status: this._loanStatus(a.statusOrdinal),
                hasContract: !0,
                date: this._getDateTime(a.lendTime, "date"),
                itemStyle: b % 2 === 0 ? "dark" : ""
            }, ("招标中" == ret.status || "已满标" == ret.status || "已流标" == ret.status) && (ret.hasContract = !1), a.lendShare > 0 && a.transferShare > 0 ? (ret.status = "转让中", ret.transferring = !0) : 0 === a.lendShare && (ret.status = "转让完成", ret.transferring = !0), ret
        },
        userLoansRepaying: function(a, b) {
            return ret = {
                loanId: a.loanId,
                loanLink: this.URL.loanDetails + a.loanId,
                loanType: a.productType,
                loanTypeName: this._loanType(a.displayLoanType),
                amount: this._fixedFloat2(a.share * a.amountPershare),
                shares: a.share,
                termsLeft: a.leftPhases,
                termsInTotal: a.mouths,
                interest: this._fixedFloat2(a.interest),
                toRepay: this._fixedFloat2(a.recoveryAmount),
                monthlyRepay: this._fixedFloat2(a.monthlyRepay),
                status: this._loanStatus(a.status),
                repaidInterest: this._fixedFloat2(a.earnInterest),
                nextDueDate: a.nextRepayDate ? this._getDateTime(a.nextRepayDate, "date") : "-",
                toRepayPrincipal: this._fixedFloat2(a.recoveryPrincipal),
                toRepayInterest: this._fixedFloat2(a.recoveryInterest),
                lenderId: a.loanLenderId,
                availableShares: a.share,
                interestGained: this._fixedFloat2(a.recoveryAmount),
                valuePerShare: this._fixedFloat2(a.currentValuePerShare),
                repaymentsPerShare: this._fixedFloat2(a.recoveryAmountPerShare),
                interestPerShare: this._fixedFloat2(a.loanVo.pricePerShare),
                principalPerShare: this._fixedFloat2(a.loanVo.principalPerShareNow),
                fee: a.fee || .01,
                itemStyle: b % 2 === 0 ? "dark" : ""
            }, ret.status = a.transferShare > 0 ? "转让中" : ret.status, ret.operationType = "TRANSFER_DISABLED", "0" == a.isTransferable && (ret.operationType = "TRANSFER"), "逾期" == ret.status && (ret.statusStyle = "rrdcolor-red-text"), ret
        },
        userLoansRepaid: function(a, b) {
            var c;
            return c = "transfer" == a.finishType ? "债权转让" : "in_repay" == a.finishType ? "提前结清 " : this._loanRepaidStatus(a.finishType), {
                loanId: a.loanId,
                loanLink: this.URL.loanDetails + a.loanId,
                loanType: a.displayLoanType,
                loanTypeName: this._loanType(a.displayLoanType),
                amount: this._fixedFloat2(a.amount),
                interest: this._fixedFloat2(a.interest),
                repaid: a.repayMoney,
                profit: a.earnMoney,
                clearDate: this._getDateTime(a.finishDate, "date"),
                clearType: c,
                itemStyle: b % 2 === 0 ? "dark" : ""
            }
        },
        userLoansInProgress: function(a, b) {
            var c = parseInt(100 * this._bankersRound(a.finishedRatio / 100), 10);
            return {
                loanId: a.loanId,
                loanLink: this.URL.loanDetails + a.loanId,
                loanType: a.displayLoanType,
                loanTypeName: this._loanType(a.displayLoanType),
                amount: this._fixedFloat2(a.amount),
                shares: parseInt(a.nowShare, 10),
                interest: this._fixedFloat2(a.interest),
                terms: a.months,
                creditLevel: a.creditLevel,
                timeLeft: 100 == c ? "--" : a.remainderTime,
                progress: c,
                itemStyle: b % 2 === 0 ? "dark" : ""
            }
        },
        userLoansReturnRecord: function(a, b) {
            return {
                loanId: a.loanId,
                loanType: a.displayLoanType,
                loanTypeName: this._loanType(a.displayLoanType),
                loanLink: this.URL.loanDetails + a.loanId,
                date: "null" == a.repaidTime ? "--" : this._getDateTime(a.repaidTime, "date"),
                amount: this._fixedFloat2(a.amount),
                borrower: a.nickName,
                borrowerLink: this.URL.userHome + a.userId,
                returnType: a.backTypeName || "--",
                status: this._returnStatus(a.stauts),
                itemStyle: b % 2 === 0 ? "dark" : ""
            }
        },
        userInfo: function(a) {
            return {
                amount: this._commaInteger(a.amount),
                interest: this._fixedFloat2(a.interest),
                loanId: a.loanId,
                months: a.months,
                date: "null" == a.openTime ? "--" : this._getDateTime(a.openTime, "date"),
                overDued: a.overDued === !1 ? "未发生过逾期" : "曾有过逾期记录",
                title: a.title,
                name: a.productAliasName,
                type: this._getProductTypeByName(a.productAliasName),
                status: a.status
            }
        },
        _getProductTypeByName: function(a) {
            var b;
            switch (a) {
                case "信用认证标":
                    b = "XYRZ";
                    break;
                case "机构担保标":
                    b = "JGDB";
                    break;
                case "实地认证标":
                    b = "SDRZ";
                    break;
                case "智能理财标":
                    b = "ZNLC"
            }
            return b
        },
        _itemName: function(a) {
            var b = a.substring(3);
            return b = b.charAt(0).toLowerCase() + b.substring(1), b.match(/Plans$|plans$|Loans$|loans$|Records$|records$|Transactions$|transactions$|Comments$|comments$/) && (b = b.substring(0, b.length - 1)), b
        },
        _listName: function(a) {
            var b = g[a];
            return b && b._list ? b._list : void 0
        },
        _list: function(a, b, c, e) {
            var f = [],
                g = b[c];
            if (e = e || this._itemName(a), g)
                for (var h = 0; h < g.length; h++) {
                    var i = this[e](g[h], h);
                    i.itemLast = h == g.length - 1 ? "last" : "", f.push(i)
                }
            var j = d.extend({}, b);
            return j[c] = f, j.pageCount = j.totalPage, j
        },
        translate: function(a, b) {
            var c, e = this,
                f = this.protocol,
                g = this._listName(a);
            if (g) return this._list(a, b, g);
            if (a == f.API.getCreditInfo) {
                var h, i = b.creditInfo,
                    j = b.creditPassedTime,
                    k = b.loan,
                    l = [];
                if (d.each(this.CREDITINFO_MAPPING, function(a, b) {
                    if (void 0 !== i[b.key] && "INVALID" != i[b.key] && "fieldAudit" != b.key) {
                        var c = "checked";
                        "VALID" != i[b.key] && (c = null);
                        var d = null;
                        b.key in j && (d = e._getDateTime(j[b.key], "date")), h = {
                            key: b.key,
                            name: b.name,
                            status: c,
                            date: d,
                            itemStyle: null
                        };
                        var f = e._jobType(k.jobType);
                        "work" == b.key && null !== f && (h.note = '<a href="' + e.URL.helpForBorrower + f.anchor + '" target="_blank">' + f.name + "</a>", h.itemStyle = "two-line"), l.push(h)
                    }
                }), "debx-zaxy" == k.utmSource && l.push({
                    key: k.utmSource,
                    name: "机构担保",
                    note: '<a href="/event/zaccn/index.jsp" target="_blank" title="深圳市中安信业创业投资有限公司">中安信业</a>',
                    itemStyle: "two-line",
                    status: "checked",
                    date: null
                }), "debx-zdsd" == k.utmSource && l.push({
                    key: k.utmSource,
                    name: "机构担保",
                    note: '<a href="/event/zdsd/index.jsp" target="_blank" title="深圳市证大速贷小额贷款股份有限公司">证大速贷</a>',
                    itemStyle: "two-line",
                    status: "checked",
                    date: null
                }), "debx-yx" == k.utmSource && l.push({
                    key: k.utmSource,
                    name: "实地认证",
                    note: '<a href="/event/youxin/index.jsp" target="_blank" title="友众信业商务顾问（北京）有限公司">友众信业</a>',
                    itemStyle: "two-line",
                    status: "checked",
                    date: null
                }), l.length > 0) {
                    var m = l[l.length - 1].itemStyle;
                    m ? m += " last" : m = "last", l[l.length - 1].itemStyle = m
                }
                return d.each(l, function(a, b) {
                    a % 2 === 0 && (b.itemStyle2 = "dark")
                }), {
                    creditInfo: l
                }
            }
            if (a == f.API.getCommentsOnLoan) return c = this._list(a, b, "loanComments", "loanComment"), c.loanComments.length > 0 && (c.loanComments[c.loanComments.length - 1].last = "last"), c;
            if (a == f.API.postCommentOnLoan) return {
                comment: this.loanComment(b.comment)
            };
            if (a == f.API.getPlanPerformance) return {
                performance: b.financePlanVos[0]
            };
            if (a == f.API.getUnreadMsgCount) return {
                count: parseInt(b.totalCount, 10)
            };
            if (a == f.API.getUserBankInfo) return {
                accounts: b.userBankVoList
            };
            if (a == f.API.getUserLoanRepaymentRecords) {
                c = this._list(a, b, "data", "userLoanRepaymentRecord");
                for (var n = !1, o = 0; o < c.data.length; o++) n && "待还" == c.data[o].status && (c.data[o].shouldRepay = !1), n || "待还" != c.data[o].status || (n = !0);
                return c
            }
            if (a == f.API.getExpectedAmountsForPlanExiting) {
                var p = b.planInfoForExiting;
                return {
                    expectedExitAmount: this._fixedFloat2(p.expectedExitAmount),
                    expectedTotalIncome: this._fixedFloat2(p.expectedTotalIncome),
                    subPointId: p.subPointId,
                    planId: p.planId
                }
            }
            return b
        }
    });
    var j = function() {
        d.extend(this, {
            API: {},
            CONF: g,
            status: {
                XHR_ERROR: -1,
                OLD_RSP: -2
            },
            translator: new h(this)
        });
        var a = this;
        d.each(g, function(b) {
            a.API[b] = b
        })
    };
    d.extend(j.prototype, {
        _request: function(a, b, c) {
            var e = this,
                f = this.CONF[a];
            if (!f) throw "Protocol._request: API is not ready";
            var g = {};
            d.extend(g, f._params, b), d.ajax({
                url: f.url,
                data: g,
                type: f.type,
                cache: !1,
                dataType: f.dataType,
                error: function(a, b, d) {
                    c && c(e.status.XHR_ERROR, b, d)
                },
                success: function(b) {
                    if (c) {
                        var d = void 0 === b.status ? e.OLD_RSP : b.status,
                            f = void 0 === b.message ? "" : b.message,
                            g = void 0 === b.data ? b : b.data;
                        (d == e.OLD_RSP || 0 === d) && (g = e.translator.translate(a, g)), c(d, f, g)
                    }
                }
            })
        }
    }), d.each(g, function(a) {
        void 0 === j.prototype[a] && (j.prototype[a] = function(b, c) {
            this._request(a, b, c)
        })
    });
    var k = new j;
    c.exports = k
});