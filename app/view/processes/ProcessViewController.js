Ext.define('xcpdevtools.view.processes.ProcessViewController', {
    extend: 'Ext.app.ViewController',
    requires: ['xcpdevtools.utils.XcpUtils', 'xcpdevtools.jsoneditor.JSONEditor'],
    alias: 'controller.processviewcontroller',
    processPayload: Ext.JSON.decode('{ "run-stateless": "true", "data": {"variables": { },"packages": {  } }}'),
    onProcessViewRender: function (me) {
        var processGrid = me;
        var processStore = processGrid.getStore();
        var baseurl = xcpdevtools.utils.XcpUtils.baseurl;
        var processurl = '/types/processes?inline=true&items-per-page=1000';
        processStore.getProxy().url = Ext.String.format('{0}{1}', baseurl, processurl);
        processStore.load();
    },

    reloadProcessView: function () {
        var processGrid = this.lookupReference("processgrid");
        var processStore = processGrid.getStore();
        processStore.reload();
    },

    onProcessSelected: function (rowModel, record, index, eOpts) {
        this.processPayload = Ext.JSON.decode('{ "run-stateless": "true", "data": {"variables": {},"packages": {  } }}');
        var baseurl = xcpdevtools.utils.XcpUtils.baseurl;
        var recordId = record.get('id');
        var processurl = Ext.String.format('{0}/{1}', baseurl, recordId.replace('types/', ''));
        this.lookupReference('processurl').setValue(processurl);
        var processInputsStore = Ext.getStore('processinputstore');
        processurl = xcpdevtools.utils.XcpUtils.baseurl + '/' + record.get('id');
        Ext.Ajax.request({
            url: processurl,
            headers: {
                'Accept': 'application/vnd.emc.xcp+json',
                'Content-Type': 'application/vnd.emFc.xcp+json'
            },
            success: function (response, opts) {
                if (processInputsStore.getCount() > 0) {
                    processInputsStore.loadData([], false);
                }
                var responseObj = Ext.decode(response.responseText);
                var responseData = responseObj.data;
                if (responseData.variables != undefined) {
                    responseData.variables.forEach(function (variable) {
                        if ((variable.output == false) && (variable.input == true)) {
                            processInputsStore.add([{
                                name: variable.name,
                                label: variable.label,
                                value: variable.value,
                                mandatory: variable.mandatory,
                                output: variable.output,
                                input: variable.input,
                                repeating: variable.repeating,
                                type: variable.type,
                                processValue: variable.processValue,
                                inputType: 'variables',
                                delimiter: function () {
                                    if ((variable.repeating) == true) {
                                        return ','
                                    };
                                }()
                            }]);
                        };
                    });
                };
                if (responseData.packages != undefined) {
                    responseData.packages.forEach(function (packages_package) {
                        processInputsStore.add([{
                            name: packages_package.name,
                            label: packages_package.label,
                            value: packages_package.value,
                            mandatory: packages_package.mandatory,
                            output: packages_package.output,
                            input: packages_package.input,
                            type: packages_package.type,
                            inputType: 'packages',
                            processValue: packages_package.processValue
                        }]);
                    });
                };
            }
        });
    },
    updatePayload: function (cep, e, eOpts, me) {
        var rowIdx = e.rowIdx;
        var newFieldValue = '';
        var oldFieldValue = '';
        var fieldName = '';
        var inputType = '';
        var splitValue = '';
        var inputDataType = '';
        var prcessInputGrid = this.lookupReference("processinputsview");
        var processInputStore = prcessInputGrid.getStore();
        var editor = Ext.getCmp("payloadEditor");
        var record = processInputStore.getAt(rowIdx);
        inputType = record.get('inputType');
        fieldName = record.get('name');
        inputDataType = record.get('type');
        if (e.field == 'value') {
            newFieldValue = e.value;
            splitValue = record.get('delimiter');
        } else if (e.field == 'delimiter') {
            newFieldValue = record.get('value');
            splitValue = e.value;
        };
        if (record.get('repeating') == true) {
            newFieldValue = newFieldValue.split(splitValue);
            var processDataValue = [];
            if (inputDataType == 'integer') {
                newFieldValue.forEach(function (value) {
                    processDataValue.push(parseInt(value));
                });
                this.processPayload.data[inputType][fieldName] = processDataValue;
            } else if (inputDataType == 'float') {
                newFieldValue.forEach(function (value) {
                    processDataValue.push(parseFloat(value));
                });
                this.processPayload.data[inputType][fieldName] = processDataValue;
            } else if (inputDataType == 'boolean') {
                newFieldValue.forEach(function (value) {
                    processDataValue.push(eval(value));
                });
                this.processPayload.data[inputType][fieldName] = processDataValue;
            } else if (inputDataType == 'datetime') {
                newFieldValue.forEach(function (value) {
                    value = new Date(value).toISOString();
                    processDataValue.push(value);
                });
                this.processPayload.data[inputType][fieldName] = processDataValue;
            } else if (inputDataType == 'string') {
                newFieldValue.forEach(function (value) {
                    processDataValue.push(value);
                });
                this.processPayload.data[inputType][fieldName] = processDataValue;
            };
        } else {
            this.processPayload.data[inputType][fieldName] = newFieldValue;
        };
        editor.setEditor(this.processPayload);
    },
    executeSLP: function () {
        var text = '';
        var params = '';
        var editor = '';
        var payload = this.processPayload;
        var processurl = this.lookupReference('processurl').getValue();
        editor = this.lookupReference('editor');
        var csrfToken = xcpdevtools.utils.XcpUtils.csrfToken;
        Ext.Ajax.request({
            url: processurl,
            params: Ext.JSON.encode(payload),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-csrf-token': csrfToken
            },
            success: function (response) {
                text = response.responseText;
                var json = Ext.decode(text);
                editor.setEditor(json.data);
            },
            failure: function (response) {
                var text = response.responseText;
                editor.setEditor(Ext.decode(text));
            }
        });
    },
    searchEvent: function () {
        var processSearchField = this.lookupReference('searchField');
        var processName = processSearchField.getValue();
        var processGrid = this.lookupReference('processgrid');
        var processStore = processGrid.getStore();
        processStore.filter([{
            property: "title",
            value: processName,
            anyMatch: true
        }]);
    }
});