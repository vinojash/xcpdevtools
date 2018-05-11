Ext.define('xcpdevtools.view.processes.ProcessView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.processview',
    controller: 'processviewcontroller',
    requires: ['xcpdevtools.jsoneditor.JSONEditor', 'store.processstore', 'proxy.rest', 'store.processinputstore'],
    items: [{
        xtype: 'panel',
        layout: {
            type: 'hbox',
            pack: 'start',
            align: 'stretch'
        },
        items: [{
            xtype: 'grid',
            id: 'processgrid',
            title: 'Processes',
            layout: {
                pack: 'center'
            },
            height: 500,
            width: '20%',
            reference: 'processgrid',
            flex: 1,
            header: {
                margin: '-4 -4 -4 -4',
                items: [{
                    xtype: 'textfield',
                    reference: 'searchField',
                    emptyText: 'search',
                    emptyCls: 'searchlogo',
                    height: 25,
                    width: 100,
                    listeners: {
                        change: "searchEvent"
                    }
                }, {
                    xtype: 'button',
                    iconCls: 'refreshIcon',
                    handler: 'reloadProcessView'
                }]
            },
            store: {
                type: 'processstore'
            },
            autoScroll: true,
            plugins: ['gridfilters'],
            maxHeight: 250,
            columns: [{
                text: 'Title',
                dataIndex: 'title',
                flex: 1,
                filter: [{
                    type: 'string'
                }],
                align: 'left'
            }, {
                text: 'Summary',
                dataIndex: 'summary',
                flex: 1,
                align: 'left'
            }],
            listeners: {
                select: 'onProcessSelected',
                afterrender: 'onProcessViewRender'
            }
        }, {
            xtype: 'panel',
            margin: '0 0 0 5 ',
            height: 270,
            title: 'Details',
            flex: 1,
            header: {
                margin: '-7 -7 -7 -7',
                items: [{
                    xtype: 'button',
                    text: 'ExecuteSLP',
                    height: 30,
                    name: 'btnReLoad',
                    handler: 'executeSLP'
                }]
            },
            tbar: [{
                xtype: 'textfield',
                fieldLabel: 'Process URL',
                width: '100%',
                reference: 'processurl',
                id: "processurlid",
                editable: false
            }],
            items: [{
                xtype: "processinputsview",
                maxHeight: 300,
                id: 'processview',
                reference: 'processinputsview',
                listeners: {
                    validateedit: 'updatePayload'
                }
            }]
        }]
    }, {
        xtype: 'panel',
        margin: "-20 0 0 0",
        items: [{
            xtype: 'panel',
            width: '100%',
            items: [{
                xtype: 'form',
                items: [{
                    xtype: "panel",
                    height: 350,
                    layout: "hbox",
                    items: [{
                        xtype: 'jsoneditor',
                        reference: 'editor',
                        headerTitle: 'Process Output'
                    }, {
                        xtype: 'jsoneditor',
                        margin:'0 0 0 5',
                        reference: 'payloadEditor',
                        id: 'payloadEditor',
                        headerTitle: 'Payload Data'
                    }]
                }]
            }]
        }]
    }]
});