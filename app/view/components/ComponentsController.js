Ext.define('xcpdevtools.view.components.ComponentsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ComponentsController',

    refreshGridData: function () {
        var grid = this.lookupReference('componentGrid');
        var currentPosition = grid.getSelectionModel().getCurrentPosition();
        var position = null;
        if (currentPosition != undefined) {
            position = currentPosition.rowIdx;
        }
        var selectedRecord = grid.getSelection();
        var myStore = grid.getStore();
        myStore.loadData([], false);


        var getComponents = function () {
            var components = Ext.ComponentQuery.query("[xtype='xcp_button']");
            var componentData = [];
            components.forEach(function (component) {
                if (component.text != "Settings" && component.text != "Sign out") {
                    componentData.push({
                        xcpType: component.xtype,
                        name: component.text,
                        xcpId: component.xcpId,
                        is_disabled: component.isDisabled(),
                        is_hidden: component.isHidden()
                    });
                }
            });
            return componentData;
        };
        chrome.devtools.inspectedWindow.eval('(' + getComponents + ')()', function (componentData) {
            myStore.setProxy({ type: "memory", enablePaging: true, data: componentData });
            myStore.load();
        });
    },
    componentSelected: function () {
        alert('abcd');
    },

    checkdisabled: function (me, rowIndex, checked, record, e, eOpts) {
        var here = this;
        var myid = record.data.xcpId;

        var doEnableDisable = function (xcpId, is_disabled) {
            var btn = Ext.ComponentQuery.query("[xcpId='" + xcpId + "']")[0];
            if (eval(is_disabled)) {
                btn.disable();
            } else {
                btn.enable();
            }
        };
        chrome.devtools.inspectedWindow.eval('(' + doEnableDisable + ')("' + record.data.xcpId + '","' + record.data.is_disabled + '")', function (data) {
            here.refreshGridData();
        });
    },

    checkhide: function (me, rowIndex, checked, record, e, eOpts) {
        var here = this;
        var myid = record.data.xcpId;

        var doHideShow = function (xcpId, is_hidden) {
            var btn = Ext.ComponentQuery.query("[xcpId='" + xcpId + "']")[0];
            if (eval(is_hidden)) {
                btn.hide();
            } else {
                btn.show();
            }
        };
        chrome.devtools.inspectedWindow.eval('(' + doHideShow + ')("' + record.data.xcpId + '","' + record.data.is_hidden + '")', function (data) {
            here.refreshGridData();
        });
    }
});