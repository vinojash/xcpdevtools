Ext.define('xcpdevtools.view.general.GeneralView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.generalview',
    controller: 'generalcontroller',
   
    items: [{
        xtype: 'panel',
        items: [{
            xtype: "propertygrid",
            collapsible:true,
            title:"General Info",
            reference: "generalGrid",
            listeners: {
                afterrender: 'onGeneralViewRender'
            }
        },{
            xtype: "propertygrid",
            collapsible:true,
            title:'Current User Info',
            reference: "generalcurrentuserinfo",
            listeners: {
                afterrender: 'onGeneralCurrentUserViewRender'
            }
        }],
    }]
})