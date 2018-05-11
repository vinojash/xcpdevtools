Ext.define('xcpdevtools.view.objectmodel.BusinessObjectView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.businessobjectview',
    requires:['store.businessobjectstore','store.businessattributestore'],
    items: [{
        xtype: 'panel',
        layout: {
            type: 'hbox',
            pack: 'start',
            align: 'stretch'
        },
        items: [{
            xtype: 'grid',
            title: 'Object Types',
            name: 'businesobjectgrid',
            layout: {
                pack: 'center'
            },
            reference: 'businesobjectgrid',
            flex: 1,
            store: {
                type: 'businessobjectstore'
            },
            autoScroll: true,
            plugins: ['gridfilters'],
            columns: [{
                text: 'Label',
                dataIndex: 'label',
                flex: 1,
                filter: [{
                    type: 'string'
                }],
                align: 'left'
            }, {
                text: 'Type',
                dataIndex: 'type',
                flex: 1,
                align: 'left'
            }, {
                text: 'Parent',
                dataIndex: 'parent',
                flex: 1,
                align: 'left'
            }],
            listeners: {
                afterrender: 'onBusinessObjectViewRender',
                select: 'onBussinessObjectGridSelect'
            }
        }, {
            xtype: 'panel',
            width: '50%',
            margin: '0 0 0 5',
            items: [{
                xtype: 'grid',
                title: 'Attributes Details',
                height: 700,
                reference: 'businessattributegrid',
                flex: 1,
                store: {
                    type: 'businessattributestore'
                },
                autoScroll: true,
                plugins: ['gridfilters'],
                columns: [{
                    text: 'Label',
                    dataIndex: 'label',
                    flex: 1,
                    filter: [{
                        type: 'string'
                    }],
                    align: 'left'
                }, {
                    text: 'Type',
                    dataIndex: 'type',
                    flex: 1,
                    align: 'left'
                }, {
                    text: 'Name',
                    dataIndex: 'name',
                    flex: 1,
                    align: 'left'
                }]
            }]
        }]
    }]
});