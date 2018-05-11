Ext.define('xcpdevtools.view.sessionvariables.SessionVariablesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sessionvariablescontroller',

    refreshGridData: function () {
        var sessionVariablesGrid = this.lookupReference('sessionGrid');
        var sessionVariablesStore = sessionVariablesGrid.getStore();
        sessionVariablesStore.loadData([], false);
        storageKey = xcpdevtools.utils.XcpUtils.STORAGE_KEY_PREFIX + xcpdevtools.utils.XcpUtils.applicationContextPath;
        xcpVersion = xcpdevtools.utils.XcpUtils.xCPVersion;
        if (xcpVersion == '2.2') {
            var getSessionVariableValuesFromEval = function () {
                return xcp.core.SessionVariableManager.modelInstance.data
            };

        } else if (xcpVersion = '2.3') {
            var getSessionVariableValuesFromEval = function (storageKey) {
                return xcp.state.Provider.getAll(storageKey, false)
            };
        }
        chrome.devtools.inspectedWindow.eval('(' + getSessionVariableValuesFromEval + ')("' + storageKey + '")', function (result) {
            var data = [];
            Object.entries(result).forEach(function ([key, value]) {
                data.push({
                    name: function () {
                        if (key != "id") {
                            return key
                        }
                    }(),
                    value: value,
                    isArray: Array.isArray(value)
                });
                sessionVariablesStore.setProxy({ type: "memory", enablePaging: true, data: data });
                sessionVariablesStore.load();
            });
            sessionVariablesStore.loadData(data, false);
        });
    },
    updateSessionValue: function () {
        var sessionVariableValue = this.lookupReference('sessionEditableArea').getValue();
        var selectedRecord = this.lookupReference('sessionGrid').getSelection();
        var sessionVariableName = selectedRecord[0].get('name');
        var sessionVariableUpdatedValue = null;
        if (selectedRecord[0].get('isArray')) {
            sessionVariableUpdatedValue = sessionVariableValue.split(',');
        } else {
            sessionVariableUpdatedValue = sessionVariableValue;
        }
        var me = this;
        chrome.devtools.inspectedWindow.eval('xcp.core.SessionVariableManager.setSessionVariableValue("' + sessionVariableName + '","' + sessionVariableUpdatedValue + '")', function (result) {
            me.refreshGridData();
        });
    },
    sessionVariableSelected: function (me, record) {
        var textArea = this.lookupReference('sessionEditableArea');
        textArea.setValue(record.get('value'));
    },
    searchEvent: function () {
        var formValue = this.lookupReference('searchField').getValue();
        var sessionGrid = this.lookupReference('sessionGrid');
        var searchStore = sessionGrid.getStore();
        searchStore.filter([{
            property: "name",
            value: formValue,
            anyMatch: true
        }]);
    }
});