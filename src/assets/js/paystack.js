!function () {
    var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent", eventer = window[eventMethod],
        messageEvent = "attachEvent" == eventMethod ? "onmessage" : "message", config = {
            siteUrl: "https://paystack.com/",
            paystackApiUrl: "https://api.paystack.co/",
            newCheckoutUrl: "https://checkout.paystack.com/"
        };

    function Inline(t, e) {
        this.iframe = null, this.background = null, this.iframeLoaded = !1, this.iframeOpen = !1, this.defaults = t, this.isEmbed = null != t.container, this.sessionEnded = !1, this.loadButtonCSS(), this.setup(), this.listenForEvents(), noBrowserIframeSupport() && (this.fallback = !0), e && (this.form = e, this.createButton())
    }

    Inline.prototype.loadButtonCSS = function () {
        cssLoad(config.siteUrl + "assets/payment/css/button.min.css?ver=1")
    }, Inline.prototype.createButton = function () {
        var t, e = this;
        e.defaults.customButton ? (t = document.getElementById(e.defaults.customButton)).setAttribute("data-paystack", e.defaults.id) : ((t = document.createElement("button")).innerHTML = "<span class='paystack-top-blue'>Pay Securely with Paystack</span><span class='paystack-body-image'> </span>", t.setAttribute("class", "paystack-trigger-btn"), t.setAttribute("data-paystack", e.defaults.id), sourceScript.parentNode.insertBefore(t, sourceScript.nextSibling)), t.addEventListener("click", function (t) {
            t.preventDefault(), e.openIframe()
        }, !1)
    }, Inline.prototype.isEnabledForNewCheckout = function () {
        return this.defaults.newCheckout ? Promise.resolve() : checkIfEnabledForNewCheckout(this.defaults.key).then(function (t) {
            if (!t.status) return Promise.reject()
        })
    }, Inline.prototype.setup = function () {
        if (this.setupPromise) return this.setupPromise;
        var n = this;
        this.setupPromise = new Promise(function (e) {
            if (n.isEmbed) return n.setupEmbed(), e();
            n.isEnabledForNewCheckout().then(function () {
                n.useNewCheckout = !0, n.setupNewPopup(), e()
            }).catch(function (t) {
                n.setupOldPopup(), e()
            })
        })
    }, Inline.prototype.setupEmbed = function () {
        var t = document.getElementById(this.defaults.container);
        t.innerHTML = "", t.removeAttribute("style"), t.className = "paystack-embed-container", t.style.position = "relative", t.style.width = "100%", this.listenForResizeEvent(), this.appendIframe({
            src: this.getCheckoutUrl().old,
            cssText: "background: transparent;\nbackground: rgba(0,0,0,0);\nborder: 0px none transparent;\noverflow-x: hidden;\noverflow-y: hidden;\nmargin: 0;\npadding: 0;\n-webkit-tap-highlight-color: transparent;\n-webkit-touch-callout: none;\nleft: 0;\ntop: 0;\nwidth: 100%;\nheight: 100%;",
            className: "paystack_embed",
            parent: t
        }), this.isSetup = !0, this.openOldCheckout()
    }, Inline.prototype.setupOldPopup = function () {
        var t = 10 * findHighestZIndex("div"), e = "z-index: " + Math.max(t, 999999);
        e += ";\ndisplay: none;\nbackground: transparent;\nbackground: rgba(0,0,0,0.005);\nborder: 0px none transparent;\noverflow-x: hidden;\noverflow-y: hidden;\nvisibility: hidden;\nmargin: 0;\npadding: 0;\n-webkit-tap-highlight-color: transparent;\n-webkit-touch-callout: none; position: fixed;\nleft: 0;\ntop: 0;\nwidth: 100%;\nheight: 100%;", this.appendIframe({
            src: this.getCheckoutUrl().old,
            cssText: e,
            className: "paystack_pop",
            parent: document.body
        }), this.isSetup = !0
    }, Inline.prototype.getCheckoutUrl = function () {
        this.defaults.metadata.referrer = getHref(), this.defaults.metadata = JSON.stringify(this.defaults.metadata);
        var t = config.siteUrl + "assets/payment/production/inline.html",
            e = omitKeys(this.defaults, ["customButton", "onClose", "callback", "tlsFallback"]);
        return e.mode = "popup", e.hasTLSFallback = null !== this.defaults.tlsFallback, {
            old: t + "?" + serialize(validateChannels(e)),
            new: config.newCheckoutUrl + "popup?params=" + encodeURIComponent(JSON.stringify(validateChannels(e)))
        }
    }, Inline.prototype.appendIframe = function (t) {
        var e = this;
        iframe = document.createElement("iframe"), iframe.setAttribute("frameBorder", "0"), iframe.setAttribute("allowtransparency", "true"), iframe.style.cssText = t.cssText, iframe.id = iframe.name = e.defaults.id, iframe.src = t.src, iframe.className = t.className, t.parent.appendChild(iframe), iframe.onload = function () {
            e.iframeLoaded = !0
        }
    }, Inline.prototype.listenForEvents = function () {
        var e = this;
        eventer(messageEvent, function (t) {
            e.sessionEnded || (e.useNewCheckout ? e.handleNewCheckoutEvents(t) : e.handleOldCheckoutEvents(t))
        }, !1)
    }, Inline.prototype.handleOldCheckoutEvents = function (t) {
        var e = this, n = t.data || t.message;
        if (n && ("string" == typeof n || n instanceof String)) {
            var a = parseResponse(n, e.defaults), r = a.isThisIframe && "PaystackClose" === a.action,
                i = "close" === a.action;
            if (r || i) {
                var o = a.data;
                e.isEmbed || e.closeOldCheckout(), o ? e.handleSuccess(o) : e.defaults.onClose && e.callCloseCallback()
            }
            "PaystackTLSClose" == a.action && (e.defaults.tlsFallback.call(this), e.isEmbed || e.closeOldCheckout())
        }
    }, Inline.prototype.listenForResizeEvent = function () {
        var a = this;
        eventer(messageEvent, function (t) {
            var e = t.data || t.message;
            if (e && ("string" == typeof e || e instanceof String)) {
                var n = parseResponse(e, a.defaults);
                if (!n.isThisIframe || "PaystackResize" != n.action) return;
                document.getElementById(a.defaults.container).style.height = Math.max(Number(n.data), 250) + "px"
            }
        }, !1)
    }, Inline.prototype.openIframe = function () {
        var t = this;
        t.setup().then(function () {
            t.useNewCheckout ? t.openNewCheckout() : t.openOldCheckout()
        })
    }, Inline.prototype.openOldCheckout = function () {
        var e = this;
        if (!this.iframeOpen) {
            var t = function () {
                var t = document.getElementById(e.defaults.id);
                t.contentWindow.postMessage("PaystackOpen " + e.defaults.id, "*"), e.isEmbed || (t.style.display = "block", t.style.visibility = "visible", document.body.style.overflow = "hidden"), e.iframeOpen = !0
            };
            e.iframeLoaded ? t() : iframe.onload = function () {
                t(), e.iframeLoaded = !0
            }
        }
    }, Inline.prototype.closeOldCheckout = function () {
        if (this.iframeOpen && !this.isEmbed) {
            var t = document.getElementById(this.defaults.id);
            t.style.display = "none", t.style.visibility = "hidden", this.iframeOpen = !1, document.body.style.overflow = ""
        }
    }, Inline.prototype.setupNewPopup = function () {
        var t = document.createElement("iframe");
        t.setAttribute("frameBorder", "0"), t.setAttribute("allowtransparency", "true"), t.id = randomId(), t.name = "paystack-checkout-background-" + t.id, t.style.cssText = "z-index: 999999999999999;background: transparent;background: rgba(0, 0, 0, 0.75);border: 0px none transparent;overflow-x: hidden;overflow-y: hidden;margin: 0;padding: 0;-webkit-tap-highlight-color: transparent;-webkit-touch-callout: none;position: fixed;left: 0;top: 0;width: 100%;height: 100%;transition: opacity 0.3s;-webkit-transition: opacity 0.3s;visibility: hidden;", t.style.display = "none", this.background = t, document.body.appendChild(t);
        var e = this.background.contentWindow.document;
        e.open(), e.write('<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <meta http-equiv="X-UA-Compatible" content="ie=edge"> <title>Paystack Checkout Loader</title> <style> .app-loader { margin: 200px 0; text-align: center; color: white; } @keyframes app-loader__spinner { 0% { opacity: 1; } 100% { opacity: 0; } } @-webkit-keyframes app-loader__spinner { 0% { opacity: 1; } 100% { opacity: 0; } } .app-loader__spinner { position: relative; display: inline-block; } .app-loader__spinner div { left: 95px; top: 35px; position: absolute; -webkit-animation: app-loader__spinner linear 1s infinite; animation: app-loader__spinner linear 1s infinite; background: white; width: 10px; height: 30px; border-radius: 40%; -webkit-transform-origin: 5px 65px; transform-origin: 5px 65px; } .app-loader__spinner div:nth-child(1) { -webkit-transform: rotate(0deg); transform: rotate(0deg); -webkit-animation-delay: -0.916666666666667s; animation-delay: -0.916666666666667s; } .app-loader__spinner div:nth-child(2) { -webkit-transform: rotate(30deg); transform: rotate(30deg); -webkit-animation-delay: -0.833333333333333s; animation-delay: -0.833333333333333s; } .app-loader__spinner div:nth-child(3) { -webkit-transform: rotate(60deg); transform: rotate(60deg); -webkit-animation-delay: -0.75s; animation-delay: -0.75s; } .app-loader__spinner div:nth-child(4) { -webkit-transform: rotate(90deg); transform: rotate(90deg); -webkit-animation-delay: -0.666666666666667s; animation-delay: -0.666666666666667s; } .app-loader__spinner div:nth-child(5) { -webkit-transform: rotate(120deg); transform: rotate(120deg); -webkit-animation-delay: -0.583333333333333s; animation-delay: -0.583333333333333s; } .app-loader__spinner div:nth-child(6) { -webkit-transform: rotate(150deg); transform: rotate(150deg); -webkit-animation-delay: -0.5s; animation-delay: -0.5s; } .app-loader__spinner div:nth-child(7) { -webkit-transform: rotate(180deg); transform: rotate(180deg); -webkit-animation-delay: -0.416666666666667s; animation-delay: -0.416666666666667s; } .app-loader__spinner div:nth-child(8) { -webkit-transform: rotate(210deg); transform: rotate(210deg); -webkit-animation-delay: -0.333333333333333s; animation-delay: -0.333333333333333s; } .app-loader__spinner div:nth-child(9) { -webkit-transform: rotate(240deg); transform: rotate(240deg); -webkit-animation-delay: -0.25s; animation-delay: -0.25s; } .app-loader__spinner div:nth-child(10) { -webkit-transform: rotate(270deg); transform: rotate(270deg); -webkit-animation-delay: -0.166666666666667s; animation-delay: -0.166666666666667s; } .app-loader__spinner div:nth-child(11) { -webkit-transform: rotate(300deg); transform: rotate(300deg); -webkit-animation-delay: -0.083333333333333s; animation-delay: -0.083333333333333s; } .app-loader__spinner div:nth-child(12) { -webkit-transform: rotate(330deg); transform: rotate(330deg); -webkit-animation-delay: 0s; animation-delay: 0s; } .app-loader__spinner { width: 40px; height: 40px; -webkit-transform: translate(-20px, -20px) scale(0.2) translate(20px, 20px); transform: translate(-20px, -20px) scale(0.2) translate(20px, 20px); } </style> </head> <body> <div id="app-loader" class="app-loader"> <div id="spinner" class="app-loader__spinner"> <div></div><div></div><div></div><div></div><div></div><div></div><div> </div><div></div><div></div><div></div><div></div><div></div> </div> </div> </body> </html>'), e.close();
        var n = document.createElement("iframe");
        n.setAttribute("frameBorder", "0"), n.setAttribute("allowtransparency", "true"), n.id = randomId(), n.name = "paystack-checkout-" + n.id, n.style.cssText = "z-index: 999999999999999;background: transparent;border: 0px none transparent;overflow-x: hidden;overflow-y: hidden;margin: 0;padding: 0;-webkit-tap-highlight-color: transparent;-webkit-touch-callout: none;position: fixed;left: 0;top: 0;width: 100%;height: 100%;visibility:hidden;", n.style.display = "none", n.src = this.getCheckoutUrl().new, this.iframe = n, document.body.appendChild(n)
    }, Inline.prototype.openNewCheckout = function () {
        this.iframe && !this.isIframeOpen && (this.background.style.display = "", this.background.style.visibility = "visible", this.iframe.style.display = "", this.iframe.contentWindow.postMessage("render", "*"), this.isIframeOpen = !0)
    }, Inline.prototype.removeLoader = function () {
        this.iframe.style.visibility = "visible", this.background.contentWindow.document.getElementById("app-loader").style.display = "none"
    }, Inline.prototype.handleNewCheckoutEvents = function (t) {
        if (t.origin + "/" === config.newCheckoutUrl) {
            var e = t.data || t.message;
            if ("loaded" === e && (this.removeLoader(), this.isIframeOpen && this.iframe.contentWindow.postMessage("render", "*")), "close" === e) {
                if (this.closeNewCheckout(), !this.defaults.onClose) return;
                this.defaults.onClose.call(this)
            }
            if (-1 < e.indexOf("success")) {
                var n = e.split("-")[1], a = JSON.parse(n);
                if (a.trxref = a.reference, this.closeNewCheckout("true"), !this.defaults.callback) return;
                this.defaults.callback.call(this, a)
            }
        }
    }, Inline.prototype.closeNewCheckout = function (t) {
        var e = this;
        e.background.style.opacity = 0, e.iframe.style.display = "none", e.iframe.contentWindow.postMessage("close", "*"), e.isIframeOpen = !1, setTimeout(function () {
            e.background.style.display = "none", e.background.style.opacity = 1, t && e.removeNewCheckout()
        }, 300)
    }, Inline.prototype.removeNewCheckout = function () {
        this.iframe.parentElement.removeChild(this.iframe), this.background.parentElement.removeChild(this.background), this.iframe = null, this.background = null, this.sessionEnded = !0
    }, Inline.prototype.handleSuccess = function (t) {
        var e = JSON.parse(t);
        if (this.defaults.callback || this.form) {
            var n;
            if (this.form) return (n = document.createElement("input")).type = "hidden", n.value = e.reference, n.name = "reference", this.form.appendChild(n), (n = document.createElement("input")).type = "hidden", n.value = e.reference, n.name = "paystack-trxref", this.form.appendChild(n), void this.form.submit();
            if (this.defaults.callback) {
                var a = {reference: e.reference, trxref: e.reference};
                e.page && (a.page = e.page), this.defaults.callback.call(this, a)
            }
        }
    }, Inline.prototype.callCloseCallback = function () {
        this.defaults.onClose && this.defaults.onClose.call(this)
    };
    var PaystackPop = {
        setup: function (t, e) {
            var n = "paystack" + randomId(), a = {
                id: n,
                key: t.key || "",
                ref: t.ref || "",
                bank: t.bank || "",
                label: t.label || "",
                email: t.email || "",
                amount: t.amount || "",
                currency: t.currency || "NGN",
                container: t.container,
                customButton: t.custom_button || t.customButton || "",
                firstname: t.firstname || "",
                lastname: t.lastname || "",
                phone: t.phone || "",
                remark: t.remark || "",
                payment_page: t.payment_page || t.paymentPage || "",
                payment_request: t.payment_request || t.paymentRequest || "",
                plan: t.plan || "",
                quantity: t.quantity || "",
                coupon: t.coupon || "",
                customer_code: t.customer_code || t.customerCode || "",
                invoice_limit: t.invoice_limit || t.invoiceLimit || "",
                start_date: t.start_date || t.startDate || "",
                interval: t.interval || t.interval || "",
                subaccount: t.subaccount || "",
                transaction_charge: t.transaction_charge || t.transactionCharge || "",
                bearer: t.bearer || "",
                metadata: t.metadata || {},
                onClose: t.on_close || t.onClose || "",
                callback: t.callback || "",
                tlsFallback: t.tlsFallback || "",
                channels: t.channels || "",
                card: t.card || "",
                bank: t.bank || "",
                newCheckout: t.newCheckout
            };
            if (isValid(a)) return e ? (checkForParentForm(e), void(window[n] = new Inline(a, getParentForm(e)))) : new Inline(a, !1)
        }
    };
    window.PaystackPop = PaystackPop;
    var sourceScript = document.currentScript || (ga = document.getElementsByTagName("script"), ga[ga.length - 1]), ga;

    function fetchTimeout(n, a) {
        return new Promise(function (t, e) {
            return setTimeout(function () {
                e(new Error("timeout"))
            }, a), fetch(n, {}).then(t, e)
        })
    }

    function checkIfEnabledForNewCheckout(t) {
        return fetchTimeout(config.paystackApiUrl + "checkout/enabled_for_new_checkout?public_key=" + t, 2e3).then(function (t) {
            if (t.ok) return t.json();
            throw Error(t.statusText)
        }).then(function (t) {
            return t.data
        }).catch(function (t) {
            return {status: !1}
        })
    }

    function parseObject(e) {
        try {
            return JSON.parse(e)
        } catch (t) {
            return e
        }
    }

    function parseFunction(string) {
        try {
            return eval(string)
        } catch (t) {
            return string
        }
    }

    function randomId() {
        for (var t = "", e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", n = 0; n < 5; n++) t += e.charAt(Math.floor(Math.random() * e.length));
        return t
    }

    function isValid(t) {
        if (validateInputTypes(t), null == t.key) throw new Error("Please provide your public key via the key attribute");
        if (null == t.amount && null == t.plan) throw new Error("Please provide transaction amount via the amount or plan attribute");
        if (null == t.email && null == t.customer_code) throw new Error("Please provide customer email via the email or customerCode attribute");
        if (t.transaction_charge && t.transaction_charge >= t.amount) throw new Error("Transaction charge must be less than the transaction amount");
        if (t.bearer && "account" != t.bearer && "subaccount" != t.bearer) throw new Error("Bearer should be either account or subaccount");
        if (t.channels && !t.channels.length) throw new Error("Channels should be an array of [card, bank] values");
        if (t.customButton && null != t.customButton && null == document.getElementById(t.customButton)) throw new Error("Please ensure a button with id " + t.customButton + " is defined");
        if (t.container && null != t.container && null == document.getElementById(t.container)) throw new Error("Please ensure an element with id " + t.container + " is defined");
        return !0
    }

    function validateInputTypes(t) {
        var n = {
            email: "email",
            amount: "integer",
            transaction_charge: "integer",
            invoice_limit: "integer",
            onClose: "function",
            callback: "function",
            metadata: "object",
            channels: "array"
        };
        for (var e in t) {
            a(e, t[e])
        }

        function a(t, e) {
            if (n[t] && e) switch (n[t]) {
                case"email":
                    isValidEmail(e) || r(t);
                    break;
                case"integer":
                    isNormalInteger(e) || r(t);
                    break;
                case"function":
                    isFunction(e) || r(t);
                    break;
                case"object":
                    isObject(e) || r(t);
                    break;
                case"array":
                    isArray(e) || r(t)
            }
        }

        function r(t) {
            throw new Error("Attribute " + t + " must be a valid " + n[t])
        }
    }

    function validateChannels(t) {
        if (void 0 !== t.bank || void 0 !== t.card) {
            var e = ["card", "bank"];
            return "false" === t.card && "false" === t.bank || ("false" === t.card ? e.splice(0, 1) : "false" === t.bank && e.splice(1, 1)), t.channels = e, omitKeys(t, ["card", "bank"])
        }
        return t
    }

    function checkForParentForm(t) {
        if ("FORM" == t.parentElement.tagName) return !0;
        throw new Error("Please put your Paystack Inline javascript file inside of a form element")
    }

    function getParentForm(t) {
        return form = t.parentElement
    }

    function hasDataAttribute(t) {
        var e = !1, n = t.attributes;
        for (key in n = Array.prototype.slice.call(n)) {
            var a = n[key].nodeName;
            a && -1 < a.indexOf("data") && (e = !0)
        }
        return e
    }

    function noBrowserIframeSupport() {
        var t = "onload" in document.createElement("iframe");
        return t || console.warn("This browser does not support iframes. Please redirect to standard"), !t
    }

    function parseResponse(t, e) {
        var n, a, r, i, o;
        return "string" == typeof t && (n = t.split(" ")[0]), n && (r = (a = t.split(" "))[1], i = a.slice(2).join(" "), o = e.id == r), {
            action: n,
            isThisIframe: o,
            data: i
        }
    }

    function omitKeys(t, e) {
        for (var n = JSON.parse(JSON.stringify(t)), a = 0; a < e.length; a++) delete n[e[a]];
        for (var r in n) n.hasOwnProperty(r) && !n[r] && delete n[r];
        return n
    }

    function serialize(e) {
        return Object.keys(e).map(function (t) {
            return encodeURIComponent(t) + "=" + encodeURIComponent(e[t])
        }).join("&")
    }

    function isObject(t) {
        return t === Object(t) && "[object Array]" !== Object.prototype.toString.call(t)
    }

    function isArray(t) {
        return t.constructor === Array
    }

    function isNormalInteger(t) {
        return parseInt(t) == t && 0 <= t
    }

    function isFunction(t) {
        if (!t) return !1;
        return t && "[object Function]" === {}.toString.call(t)
    }

    function isValidEmail(t) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(t)
    }

    function getHref() {
        var t = window.location.href;
        return t && 500 < t.length && (t = t.split("?")[0]), t
    }

    function findHighestZIndex(t) {
        for (var e = document.getElementsByTagName(t), n = 0, a = 0; a < e.length; a++) {
            var r = document.defaultView.getComputedStyle(e[a], null).getPropertyValue("z-index");
            n < r && "auto" != r && (n = r)
        }
        return parseInt(n)
    }

    function cssLoad(t, e) {
        var n, a, r, i = [], o = [], s = !1, c = !1;

        function l() {
            s = !0;
            for (var t = 0, e = i.length; t < e; t++) i[t]()
        }

        function d() {
            c = !0;
            for (var t = 0, e = o.length; t < e; t++) o[t]()
        }

        this.count = this.count ? ++this.count : 1, this.count, r = t.split("/"), a = "load-css-" + r[r.length - 1], n = {
            done: function (t) {
                return i.push(t), s && t(), n
            }, fail: function (t) {
                return o.push(t), c && t(), n
            }
        };
        var u = document.createElement("link");
        return u.setAttribute("id", a), u.setAttribute("rel", "stylesheet"), u.setAttribute("type", "text/css"), void 0 !== u.addEventListener ? (u.addEventListener("load", l, !1), u.addEventListener("error", d, !1)) : void 0 !== u.attachEvent && u.attachEvent("onload", function () {
            var t, e = document.styleSheets.length;
            try {
                for (; e--;) if ((t = document.styleSheets[e]).id === a) return t.cssText, void l()
            } catch (t) {
            }
            s || d()
        }), PaystackPop.loadedScripts = PaystackPop.loadedScripts || {}, null != PaystackPop.loadedScripts[a] || (PaystackPop.loadedScripts[a] = !0, document.getElementsByTagName("head")[0].appendChild(u), u.setAttribute("href", t), n)
    }

    hasDataAttribute(sourceScript) && PaystackPop.setup({
        key: sourceScript.getAttribute("data-key"),
        ref: sourceScript.getAttribute("data-ref"),
        bank: sourceScript.getAttribute("data-bank"),
        label: sourceScript.getAttribute("data-label"),
        email: sourceScript.getAttribute("data-email"),
        amount: sourceScript.getAttribute("data-amount"),
        currency: sourceScript.getAttribute("data-currency"),
        container: sourceScript.getAttribute("data-container"),
        customButton: sourceScript.getAttribute("data-custom-button"),
        firstname: sourceScript.getAttribute("data-firstname"),
        lastname: sourceScript.getAttribute("data-lastname"),
        phone: sourceScript.getAttribute("data-phone"),
        remark: sourceScript.getAttribute("data-remark"),
        payment_page: sourceScript.getAttribute("data-payment-page"),
        payment_request: sourceScript.getAttribute("data-payment-request"),
        plan: sourceScript.getAttribute("data-plan"),
        quantity: sourceScript.getAttribute("data-quantity"),
        coupon: sourceScript.getAttribute("data-coupon"),
        customer_code: sourceScript.getAttribute("data-customer-code"),
        invoice_limit: sourceScript.getAttribute("data-invoice-limit"),
        start_date: sourceScript.getAttribute("data-start-date"),
        interval: sourceScript.getAttribute("data-interval"),
        subaccount: sourceScript.getAttribute("data-subaccount"),
        transaction_charge: sourceScript.getAttribute("data-transaction-charge"),
        bearer: sourceScript.getAttribute("data-bearer"),
        metadata: parseObject(sourceScript.getAttribute("data-metadata")),
        onClose: parseFunction(sourceScript.getAttribute("data-on-close")),
        callback: parseFunction(sourceScript.getAttribute("data-callback")),
        tlsFallback: parseFunction(sourceScript.getAttribute("data-tls-callback")),
        channels: sourceScript.getAttribute("data-channels"),
        card: sourceScript.getAttribute("data-card"),
        bank: sourceScript.getAttribute("data-bank")
    }, sourceScript)
}();