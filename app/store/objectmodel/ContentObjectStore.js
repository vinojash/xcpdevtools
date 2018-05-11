Ext.define('xcpdevtools.store.objectmodel.ContentObjectStore', {
    extend: 'Ext.data.Store',
    alias: 'store.contentobjectstore',
    fields: [{
        name: 'label',
        mapping: 'content.label',
        type: 'auto'
    }, {
        name: 'parent',
        mapping: 'content.parent',
        type: 'auto'
    }, {
        name: 'type',
        mapping: 'content.type',
        type: 'auto'
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