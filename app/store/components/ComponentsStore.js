Ext.define('xcpdevtools.store.components.ComponentsStore', {
    extend: 'Ext.data.Store',
    alias: 'store.componentsStore',
    pageSize: 20,
    fields: [
        'name', 'component_id', 'is_disabled', 'is_hidden'
    ]
});