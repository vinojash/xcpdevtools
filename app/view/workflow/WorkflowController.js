Ext.define('xcpdevtools.view.workflow.WorkflowController', {
    extend: 'Ext.app.ViewController',
    requires: ['xcpdevtools.utils.XcpUtils', 'xcpdevtools.jsoneditor.JSONEditor'],
    alias: 'controller.workflowcontroller',
    onProcessViewRender: function (me) {
        var processGrid = me;
        var processStore = processGrid.getStore();
        var baseurl = xcpdevtools.utils.XcpUtils.baseurl;
        var processurl = '/types/processes?inline=true&items-per-page=1000';
        processStore.getProxy().url = Ext.String.format('{0}{1}', baseurl, processurl);
        processStore.load();
    },

    reloadProcessView: function () {
        var processGrid = this.lookupReference("workflowprocessgrid");
        var processStore = processGrid.getStore();
        processStore.reload();
    },

    onProcessSelected: function (rowModel, record, index, eOpts) {
        var baseurl = xcpdevtools.utils.XcpUtils.baseurl;
        var recordId = record.get('title')+'?inline=true&items-per-page=1000';
        var processurl = Ext.String.format('{0}/{1}/{2}', baseurl, 'processes', recordId);
        var workflowProcessDetailsGrid = this.lookupReference('workflowprocessdetailsgrid');
        var workflowDetailsStore = workflowProcessDetailsGrid.getStore();
        workflowDetailsStore.getProxy().url = processurl;
        workflowDetailsStore.load();
    },
    onWorkflowNameSelected: function (rowModel, record, index, eOpts) {
        var baseurl = xcpdevtools.utils.XcpUtils.baseurl;
        var recordId = record.get('id');
        var recordData=record.get('data');
        var workflowjsoneditor=this.lookupReference('workflowjsoneditor');
        var processurl = Ext.String.format('{0}/{1}/{2}', baseurl, recordId, 'tasks');
        var workflowTaskGrid = this.lookupReference('workflowtaskgrid');
        var workflowTaskStore = workflowTaskGrid.getStore();
        workflowTaskStore.getProxy().url = processurl;
        workflowTaskStore.load();
        workflowjsoneditor.setEditor(recordData);
    },
    searchEvent: function () {
        var processSearchField = this.lookupReference('searchField');
        var processName = processSearchField.getValue();
        var processGrid = this.lookupReference('workflowprocessgrid');
        var processStore = processGrid.getStore();
        processStore.filter([{
            property: "title",
            value: processName,
            anyMatch: true
        }]);
    }
});