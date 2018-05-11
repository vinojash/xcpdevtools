Ext.define('xcpdevtools.store.ProcessView.ProcessStore', {
    extend: 'Ext.data.Store',
    alias: 'store.processstore',
    fields: ['id','summary'],
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