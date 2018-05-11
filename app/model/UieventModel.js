Ext.define('xcpdevtools.model.UieventModel', {
    extend: 'Ext.data.Model',
    alias: 'model.uieventmodel',
    fields: [
        'eventName',         
        'eventType',
         'eventclass',
         'button'       
    ],
    groupField: "eventclass",

});