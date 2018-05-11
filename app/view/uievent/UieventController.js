Ext.define('xcpdevtools.view.uievent.UieventController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.uieventcontroller',

    onGridSelected: function () {
        var rowColor = function () {
            this.getView().refresh();
        }
        var uieventgrid = this.lookupReference('uieventGrid');
        var selectedItem = uieventgrid.getSelection();
        var selectedEventName = selectedItem[0].data.eventName;
        var fieldStore = Ext.getStore('fieldstore');
        var getFields = function (selectedEventName) {
            var getClass = Ext.ClassManager.get(selectedEventName);
            var properties = [];
            Ext.Array.forEach(getClass.prototype.fields, function (fieldName) {
                var date = new Date();
                var setInitialValue = function (type) {
                    if (type === 'STRING') {
                        return 'demo';
                    } else if (type === 'INTEGER') {
                        return 23;
                    } else if (type === 'BOOLEAN') {
                        return true;
                    } else if (type === 'DATETIME') {
                        return date.toString();
                    } else if (type === 'FLOAT') {
                        return 2.3;
                    }
                };
                properties.push({
                    fieldname: fieldName.name,
                    fieldvalue: setInitialValue(fieldName.type)
                });
            });
            return properties;
        };
        chrome.devtools.inspectedWindow.eval('(' + getFields + ')("' + selectedEventName + '")', function (properties) {
            fieldStore.setProxy({ type: "memory", data: properties });
            fieldStore.load();
        });
    },
    subscribeBtnHandler: function (me) {
        var backgroundPageConnection = chrome.runtime.connect({
            name: 'panel'
        });

        backgroundPageConnection.postMessage({
            name: 'init',
            tabId: chrome.devtools.inspectedWindow.tabId
        });

        var jsonEditor = this.lookupReference('jsoneditor');
        backgroundPageConnection.onMessage.addListener(function (msg) {
            if (typeof (Ext.JSON.decode(msg)) === 'object') {
                jsonEditor.setEditor(Ext.JSON.decode(msg));
            } else {
                jsonEditor.setEditor(Ext.JSON.decode(Ext.JSON.decode(msg)));
            }
        });

        var selectedEventName = me.getWidgetRecord().data.eventName;
        var subscribeFunction = function (eventName) {
            var context = Ext.ComponentQuery.query('[xcpId=page]')[0].getPageContext();
            xcp.event.EventBus.subscribe(eventName, function (page, parameters) {
                window.postMessage(Ext.encode(parameters), '*');
            }, null, null, context);
        };
        chrome.devtools.inspectedWindow.eval('(' + subscribeFunction + ')("' + selectedEventName + '")', function (data) { });

    },
    publishBtnHandler: function () {
        var uieventgrid = this.lookupReference('uieventGrid')
        var selectedItem = uieventgrid.getSelection();
        var selectedEventName = selectedItem[0].data.eventName;

        var params = {};
        var fieldStore = Ext.getStore('fieldstore');
        fieldStore.each(function (record) {
            params[record.get('fieldname')] = record.get('fieldvalue');
        });

        var publishFunction = function (eventName, params, context) {
            var context = Ext.ComponentQuery.query('[xcpId=page]')[0].getPageContext();
            params = Ext.decode(params);
            xcp.event.EventBus.publish(eventName, params, context);
        };

        var evalFunction = Ext.String.format("({0})('{1}','{2}')", publishFunction, selectedEventName, Ext.encode(params));
        chrome.devtools.inspectedWindow.eval(evalFunction, function (data) { });
    },

    refreshGridData: function () {
        var grid = this.lookupReference('uieventGrid');
        var currentPosition = grid.getSelectionModel().getCurrentPosition();
        var position = null;
        if (currentPosition != undefined) {
            position = currentPosition.rowIdx;
        }
        var selectedRecord = grid.getSelection();
        var gridStore = grid.getStore();
        gridStore.loadData([], false);

        var getChildClasses = function () {
            var data = [];
            Ext.iterate(Ext.ClassManager.classes, function (className, event) {
                if (event.superclass.$className == 'xcp.event.ApplicationEvent') {
                    var temp = arguments[2][className].prototype.scope;
                    data.push({
                        eventName: className,
                        eventType: temp,
                        eventclass: function () {
                            namespace = xcp.appContext.namespace;
                            if (className.startsWith(namespace)) {
                                return namespace;
                            } else {
                                return 'xcp';
                            }
                        }()
                    });
                }
            });
            return data;
        };
        chrome.devtools.inspectedWindow.eval('(' + getChildClasses + ')()', function (data) {
            gridStore.setProxy({ type: "memory", data: data });
            gridStore.load();
        });
    },
    searchEvent: function () {
        var myForm = this.lookupReference('searchField');
        var formValue = myForm.getValue();
        var myGrid = this.lookupReference('uieventGrid');
        var searchStore = myGrid.getStore();
        searchStore.filter([{
            property: "eventName",
            value: formValue,
            anyMatch: true
        }]);
    }
});