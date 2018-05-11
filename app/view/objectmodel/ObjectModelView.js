Ext.define('xcpdevtools.view.objectmodel.ObjectModelView', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.objectmodelview',
    controller: 'objectmodelcontroller',
    tabBar: {
        defaults: {
            flex: 1,
            height: 30
        },
        dock: 'top'
    },
    items: [{
        title: 'Business Object',
        xtype: 'businessobjectview'
    }, {
        title: 'Content Object',
        xtype: 'contentobjectview'
    }, {
        title: 'Folder Object',
        xtype: 'folderobjectview'
    }]
});