Ext.define('xcpdevtools.store.uievent.Fieldstore', {
    extend: 'Ext.data.Store',
    alias: 'store.fieldstore',
    storeId: 'fieldstore'  ,
    fields: ['fieldName','fieldValue']
});