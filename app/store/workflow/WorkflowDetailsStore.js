Ext.define('xcpdevtools.store.workflow.WorkflowDetailsStore', {
    extend: 'Ext.data.Store',
    alias: 'store.workflowdetailsstore',
    fields: ['title', 'id',
        {
            name: 'supervisor_name',
            mapping: 'content.properties.supervisor_name',
            type: 'auto'
        }, {
            name: 'correlation_identifier',
            mapping: 'content.properties.correlation_identifier',
            type: 'auto'
        }, {
            name: 'r_creator_name',
            mapping: 'content.properties.r_creator_name',
            type: 'auto'
        }, {
            name: 'r_runtime_state',
            mapping: 'content.properties.r_runtime_state',
            type: 'auto'
        }, {
            name: 'supervisor_address',
            mapping: 'content.properties.supervisor_address',
            type: 'auto'
        }, {
            name: 'status',
            mapping: 'content.properties.status',
            type: 'auto'
        }, {
            name: 'status',
            mapping: 'content.properties.status',
            type: 'auto'
        }, {
            name: 'r_start_date',
            mapping: 'content.properties.r_start_date',
            type: 'auto'
        }, {
            name: 'data',
            mapping: 'content.data',
            type: 'auto'
        }],
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