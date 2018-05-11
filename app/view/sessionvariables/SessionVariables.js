Ext.define('xcpdevtools.view.sessionvariables.SessionVariables', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.SessionVariables',
    controller: 'sessionvariablescontroller',
    requires: ['store.sessionvariables', 'plugin.gridfilters'],
    layout: 'hbox',
    items: [{
        flex: 1,
        xtype: 'grid',
        title: 'Session Variables',
        reference: 'sessionGrid',
        header: {
            margin: '-5 -2 0 -2',
            items: [
                {
                    xtype: 'textfield',
                    reference: 'searchField',
                    emptyText: 'search',
                    emptyCls: 'searchlogo',
                    height: 20,
                    width: 90,
                    listeners: {
                        change: 'searchEvent'
                    }
                }
            ]
        },
        tbar: [{
            xtype: 'button',
            text: 'Reload',
            name: 'btnReload',
            handler: 'refreshGridData'
        }],
        store: {
            type: 'sessionvariables'
        },
        plugins: ["gridfilters"],

        dockedItems: [{
            xtype: 'pagingtoolbar',
            dock: 'top',
            displayInfo: true
        }],
        columns: [{
            text: 'Name',
            dataIndex: 'name',
            flex: 1,
            align: 'left'
        }, {
            text: 'Value',
            dataIndex: 'value',
            flex: 1,
            align: 'left'
        }],
        listeners: {
            afterrender: 'refreshGridData',
            select: 'sessionVariableSelected'
        }
    }, {
        flex: 1,
        xtype: 'panel',
        margin: '0 0 0 5',
        title: 'Details',
        width: '40%',
        tbar: [{
            xtype: 'button',
            text: 'Update',
            handler: 'updateSessionValue'
        }],
        items: [{
            xtype: 'textarea',
            emptyText: 'enter value to update',
            width: '100%',
            height: 500,
            reference: 'sessionEditableArea'
        }]
    }]
});