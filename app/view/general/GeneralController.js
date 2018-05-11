Ext.define('xcpdevtools.view.general.GeneralController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.generalcontroller',

    onGeneralViewRender: function () {
        var generalGrid = this.lookupReference("generalGrid");
        var chromeVersion = navigator.appVersion.match(/.*Chrome\/([0-9\.]+)/)[1];
        xcpdevtools.utils.XcpUtils.getXCPVersion().then(function () {
            var applicationName;
            var applicationVersion;
            var applicationNameSpace;
            var applicationContextPath;
            var appName = function () {
                var data = [];
                data.push({
                    applicationName: xcp.appContext.name,
                    applicationVersion: xcp.appContext.version,
                    applicationNameSpace: xcp.appContext.namespace,
                    applicationContextPath: xcp.appContext.contextPath
                });
                return data;
            };
            chrome.devtools.inspectedWindow.eval('(' + appName + ')()', function (data) {
                generalGrid.setSource({
                    "ChromeVersion": chromeVersion,
                    "XCP Version": xcpdevtools.utils.XcpUtils.xCPVersion,
                    "Application Name": data[0].applicationName,
                    "Application Version": data[0].applicationVersion,
                    "Application NameSpace": data[0].applicationNameSpace
                });
            });
            generalGrid.getColumns()[0].setWidth('30%');
            generalGrid.getColumns()[0].textAlign = 'left';
            generalGrid.getColumns()[1].textAlign = 'left';
            generalGrid.findPlugin('cellediting').disable();
        });
    },
    onGeneralCurrentUserViewRender: function () {
        var generalCurrentUserGrid = this.lookupReference("generalcurrentuserinfo");
        var currentUser = function () {
            return xcp.currentUser;
        }
        chrome.devtools.inspectedWindow.eval('(' + currentUser + ')()', function (data) {
            generalCurrentUserGrid.setSource(data);
        });
        generalCurrentUserGrid.getColumns()[0].setWidth('30%');
        generalCurrentUserGrid.getColumns()[0].textAlign = 'left';
        generalCurrentUserGrid.getColumns()[1].textAlign = 'left';
        generalCurrentUserGrid.findPlugin('cellediting').disable();
    }
});