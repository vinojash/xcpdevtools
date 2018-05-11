Ext.define('xcpdevtools.view.help.HelpView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.helpview',
    controller: 'helpcontroller',
   
    items: [{
        xtype: 'panel',
        items: [{
            xtype: "propertygrid",
            collapsible:true,
            title:"Help Info",
            reference: "helpGrid",
            listeners: {
                afterrender: 'onHelpViewRender'
            }
        }]
    }]
})