Ext.define('xcpdevtools.view.workflow.WorkflowView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.workflow',
    requires: ['xcpdevtools.jsoneditor.JSONEditor', 'store.workflowstore', 'store.workflowdetailsstore', 'store.workflowtaskstore'],
    controller: 'workflowcontroller',
    items: [{
        xtype: 'panel',
        layout: {
            type: 'hbox',
            pack: 'start',
            align: 'stretch'
        },
        items: [{
            xtype: 'grid',
            id: 'workflowprocessgrid',
            height: 300,
            margin: '-6 -6 -6 -6',
            title: 'Processes',
            width: '45%',
            region: 'east',
            reference: 'workflowprocessgrid',
            flex: 1,
            header: {
                items: [{
                    xtype: 'textfield',
                    reference: 'searchField',
                    emptyText: 'search',
                    emptyCls: 'searchlogo',
                    height: 20,
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
                type: 'workflowstore'
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
            xtype: 'grid',
            id: 'workflowprocessdetailsgrid',
            height: 300,
            margin: '0 0 0 10',
            title: 'Workflow Information',
            width: '55%',
            region: 'east',
            reference: 'workflowprocessdetailsgrid',
            store: {
                type: 'workflowdetailsstore'
            },
            autoScroll: true,
            plugins: ['gridfilters'],
            maxHeight: 250,
            columns: [{
                text: 'Title',
                dataIndex: 'title',
                flex: 0,
                filter: [{
                    type: 'string'
                }],
                align: 'left'
            }, {
                text: 'ID',
                dataIndex: 'id',
                flex: 0,
                align: 'left'
            }, {
                text: 'Supervisor_name',
                dataIndex: 'supervisor_name',
                flex: 0,
                align: 'left'
            }, {
                text: 'Supervisor_address',
                dataIndex: 'supervisor_address',
                flex: 0,
                align: 'left'
            }, {
                text: 'R_creator_name',
                dataIndex: 'r_creator_name',
                flex: 0,
                align: 'left'
            }, {
                text: 'Status',
                dataIndex: 'status',
                flex: 0,
                align: 'left'
            }, {
                text: 'R_start_date',
                dataIndex: 'r_start_date',
                flex: 0,
                align: 'left'
            }],
            listeners: {
                select: 'onWorkflowNameSelected'
            }
        }]
    }, {
        xtype: 'panel',
        layout: 'hbox',
        items: [{
            xtype: 'grid',
            title: 'Workflow Task',
            border: 1,
            height: 420,
            margin: '10 0 0 0 ',
            width: '45%',
            reference: 'workflowtaskgrid',
            store: {
                type: 'workflowtaskstore'
            },
            autoScroll: true,
            plugins: ['gridfilters'],
            columns: [{
                text: 'Task',
                dataIndex: 'title',
                flex: 1,
                align: 'left'
            }, {
                text: 'updated',
                dataIndex: 'updated',
                flex: 1,
                align: 'left'
            }]
        }, {
            xtype: 'jsoneditor',
            margin:'0 0 0 5',
            reference: 'workflowjsoneditor',
            height: 440,
            width: '55%',
            headerTitle: 'Workflow Variables & Packages'
        }]
    }]
});