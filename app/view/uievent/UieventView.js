Ext.define('xcpdevtools.view.uievent.UieventView', {
    extend: 'Ext.form.Panel',
    alias: 'widget.uieventview',
    controller: 'uieventcontroller',
    requires: ['store.uieventstore', 'store.fieldstore'],
    items: [
        {
            xtype: 'panel',
            height: 295,
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
            },
            items: [{
                xtype: 'grid',
                title: 'UIEvents',
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
                width: '50%',
                reference: 'uieventGrid',
                flex: 1,
                autoScroll: true,
                plugins: ['gridfilters'],
                store: {
                    type: 'uieventstore'
                },
                features: [{
                    text: "eventclass",
                    ftype: 'grouping',
                    hideGroupedHeader: true
                }],
                columns: [{
                    text: 'Event Class',
                    dataIndex: 'eventclass'
                }, {
                    text: 'Event Name',
                    dataIndex: 'eventName',
                    align: 'left',
                    flex: 2,
                    filter: [{
                        type: 'string'
                    }]
                }, {
                    text: 'Event Type',
                    dataIndex: 'eventType',
                    flex: 1
                }, {
                    text: '',
                    align: 'left',
                    xtype: 'widgetcolumn',
                    widget: {
                        xtype: 'button',
                        text: 'Subscribe',
                        handler: 'subscribeBtnHandler'
                    }
                }],
                viewConfig: {
                    selectedItemCls: 'selectedRowColor',
                    stripeRows: false,
                    getRowClass: function (record, index, rowParams) {
                        return (index % 2 == 0) ? 'grid_row1' : 'grid_row2';
                    }
                },
                listeners: {
                    afterrender: 'refreshGridData',
                    select: 'onGridSelected'
                }
            }, {
                xtype: 'panel',
                width: '50%',
                margin: '0 0 0 5',
                items: [{
                    xtype: 'grid',
                    height: 300,
                    title: 'Fields',
                    tbar: [{
                        xtype: 'button',
                        text: 'Publish',
                        margin: '2 0 0 0',
                        handler: 'publishBtnHandler'
                    }],
                    store: {
                        type: 'fieldstore'
                    },
                    plugins: {
                        ptype: 'cellediting',
                        clicksToEdit: 2
                    },
                    columns: [{
                        text: 'Field Name',
                        dataIndex: 'fieldname',
                        flex: 1,
                        align: 'left'
                    }, {
                        text: 'Field Value',
                        dataIndex: 'fieldvalue',
                        editor: {
                            completeOnEnter: true,
                            field: {
                                xtype: 'textfield',
                                reference: 'editedField',
                                allowBlank: false
                            }
                        },
                        flex: 1,
                        align: 'left'
                    }],
                    viewConfig: {
                        selectedItemCls: 'selectedRowColor',
                        stripeRows: false,
                        getRowClass: function (record, index, rowParams) {
                            return (index % 2 == 0) ? 'grid_row1' : 'grid_row2';
                        }
                    }
                }]
            }]
        }, {
            xtype: 'panel',
            margin: '10 0 0 0',
            items: [{
                xtype: 'jsoneditor',
                height: 290,
                width: '100%',
                reference: 'jsoneditor',
                headerTitle: 'Parameter Value'
            }]
        }
    ]
});