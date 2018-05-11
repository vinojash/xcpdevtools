Ext.define('xcpdevtools.view.components.Components', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.Components',
    controller: 'ComponentsController',
    requires: ['store.componentsStore', 'plugin.gridfilters'],
    layout: 'hbox',
    items: [{
        flex: 1,
        xtype: 'grid',
        title: 'Components',
        reference: 'componentGrid',
        tbar: [{
            xtype: 'button',
            text: 'Reload',
            name: 'btnReload',
            handler: 'refreshGridData'
        }],
        store: {
            type: 'componentsStore'
        },

        plugins: ["gridfilters"],

        dockedItems: [{
            xtype: 'pagingtoolbar',
            dock: 'top',
            displayInfo: true
        }],

        columns: [{
            text: 'Component Name',
            dataIndex: 'name',
            flex: 1,
            align: 'left'
        }, {
            text: 'Component Id',
            dataIndex: 'xcpId',
            flex: 1,
            align: 'left'
        }, {
            xtype: 'checkcolumn',
            text: 'Disabled',
            dataIndex: 'is_disabled',
            flex: 1,
            align: 'left',
            listeners: {
                checkchange: 'checkdisabled'
            }
        }, {
            xtype: 'checkcolumn',
            text: 'Hidden',
            dataIndex: 'is_hidden',
            flex: 1,
            align: 'left',
            listeners: {
                checkchange: 'checkhide'
            }
        }],
        listeners: {
            afterrender: 'refreshGridData'
        }
    }]
});