Ext.define("xcpdevtools.utils.XcpUtils", {
    singleton: true,
    uses: ['xcpdevtools.view.processes.ProcessViewController'],
    baseurl: null,
    csrfToken: null,
    processurl: '/processes?inline=true&items-per-page=1000',
    xCPVersion: null,
    STORAGE_KEY_PREFIX: 'xcp_ui_sessionvariable',
    applicationContextPath: '',
    payload:'',
    getBaseUrlPromise: function () {
        return new Ext.Promise(function (resolve, reject) {
            var getUrl = function () {
                return xcp.util.Utils.getBaseURL() + xcp.appContext.contextPath;
            }
            chrome.devtools.inspectedWindow.eval('(' + getUrl + ')()', function (url) {
                xcpdevtools.utils.XcpUtils.baseurl = url;
                resolve();
            });
        })
    },
    getCSRFTokenPromise: function () {
        return new Ext.Promise(function (resolve, reject) {
            if (this.csrfToken == null) {
                var getToken = function () {
                    return Ext.util.Cookies.get("x-csrf-token");
                }
                chrome.devtools.inspectedWindow.eval('(' + getToken + ')()', function (token) {
                    xcpdevtools.utils.XcpUtils.csrfToken = token;
                    resolve();
                });
            }
        })
    },
    getXCPVersion: function () {
        return xcpdevtools.utils.XcpUtils.getBaseUrlPromise().then(function (res) {
            var getToken = function () {
                return Ext.util.Cookies.get("x-csrf-token");
            }
            chrome.devtools.inspectedWindow.eval('(' + getToken + ')()', function (token) {
                xcpdevtools.utils.XcpUtils.csrfToken = token;
            });
        }).then(function (res) {
            var url = Ext.String.format("{0}/products/xcp_product_info", xcpdevtools.utils.XcpUtils.baseurl);
            return new Ext.Promise(function (resolve, reject) {
                Ext.Ajax.request({
                    url: url,
                    success: function (response) {
                        var data = Ext.decode(response.responseText);
                        xcpdevtools.utils.XcpUtils.xCPVersion = data.properties.major;
                        resolve(xcpdevtools.utils.XcpUtils.xCPVersion)
                    }
                });
            })
        }).then(function (response) {
            return new Ext.Promise(function (resolve, reject) {
                var contextPath = function () {
                    return xcp.appContext.contextPath;
                }
                chrome.devtools.inspectedWindow.eval('(' + contextPath + ')()', function (contextPath) {
                    xcpdevtools.utils.XcpUtils.applicationContextPath = contextPath;
                    resolve()
                });
            })
        })
    },
    storeToObject: function (storeId, keyFieldName, keyFieldValue) {
        var store = Ext.getStore(storeId);
        var obj = [];
        store.each(function (rec) {
            obj.push({
                [rec.get(keyFieldName)]: rec.get(keyFieldValue)
            });
        })
        return obj;
    },
    getCsrfToken: function () {
        if (this.csrfToken == 'unknown') {
            var getToken = function () {
                var token = Ext.util.Cookies.get("x-csrf-token");
                return token;
            }
            chrome.devtools.inspectedWindow.eval('(' + getToken + ')()', function (token) {
                xcpdevtools.utils.XcpUtils.csrfToken = token;
            });
        }

    }
});


