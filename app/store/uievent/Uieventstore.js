Ext.define('xcpdevtools.store.uievent.UieventStore', {
    extend: 'Ext.data.Store',
    alias: 'store.uieventstore',
    storeId: 'uieventstore',
    requires: ['xcpdevtools.model.UieventModel'],
    model: 'xcpdevtools.model.UieventModel',
    groupField: "eventclass"
});