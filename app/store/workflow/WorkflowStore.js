Ext.define('xcpdevtools.store.workflow.WorkflowStore', {
    extend: 'Ext.data.Store',
    alias: 'store.workflowstore',
    fields: ['id', 'summary'],
    filters: [
        function (record) {
            var title= record.data.title;
            return title.startsWith('xcp') == false;
        }
    ],
    proxy: {
        type: 'rest',
        reader: {
            type: 'json',
            rootProperty: 'entries',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }
});