Ext.define('xcpdevtools.store.workflow.WorkflowTaskStore', {
    extend: 'Ext.data.Store',
    alias: 'store.workflowtaskstore',
    fields: ['title','updated'],
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