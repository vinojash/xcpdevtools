Ext.define('xcpdevtools.store.processView.ProcessInputsStore', {
    extend: 'Ext.data.Store',
    alias: 'store.processinputstore',
    storeId: 'processinputstore',
    fields: ['name', 'default-value', 'label', 'mandatory', 'output', 'input', 'repeating', 'type', 'inputType', 'value', 'delimiter']
})