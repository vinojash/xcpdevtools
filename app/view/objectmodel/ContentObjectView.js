Ext.define('xcpdevtools.view.objectmodel.ContentObjectView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.contentobjectview',
    requires: ['store.contentobjectstore','store.contentattributestore'],
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
            layout: {
                pack: 'center'
            },
            reference: 'contentobjectgrid',
            flex: 1,
            store: {
                type: 'contentobjectstore'
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
                afterrender: 'onContentObjectViewRender',
                select: 'onContentObjectGridSelect'
            }
        }, {
            xtype: 'panel',
            width: '50%',
            margin: '0 0 0 5',
            items: [{
                xtype: 'grid',
                title: 'Attributes Details',
                height: 700,
                layout: {
                    pack: 'center'
                },
                reference: 'contentattributegrid',
                flex: 1,
                store: {
                    type: 'contentattributestore'
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