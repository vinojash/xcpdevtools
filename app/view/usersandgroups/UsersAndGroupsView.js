Ext.define('xcpdevtools.view.usersandgroups.UsersAndGroupsView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.usersandgroup',
    controller: 'usersandgroupscontroller',
    layout: 'hbox',
    items: [{
        flex: 1,
        xtype: 'grid',
        height: 600,
        title: 'Users and Groups',
        reference: 'membersGrid',
        autoScroll: true,
        store: {
            type: 'usersandgroupstore'
        },
        header: {
            items: [
                {
                    xtype: 'textfield',
                    reference: 'searchField',
                    emptyText: 'search',
                    emptyCls: 'searchlogo',
                    height: 20,
                    width: 90,
                    listeners: {
                        change: 'membersSearchEvent'
                    }
                }
            ]
        },
        plugins: ["gridfilters"],
        columns: [{
            text: 'Members',
            dataIndex: 'title',
            flex: 1,
            align: 'left'
        }, {
            text: 'Members Type',
            dataIndex: 'id',
            flex: 1,
            align: 'left',
            renderer: 'membersType'
        }],
        listeners: {
            afterrender: 'onUsersViewRender',
            select: 'onGridSelect'
        }
    }, {
        xtype: 'panel',
        margin: '0 0 0 10',
        width: '50%',
        items: [{
            flex: 1,
            title: 'Members',
            xtype: 'grid',
            reference: 'usersGrid',
            plugins: ["gridfilters"],
            store: {
                type: 'usersstore'
            },
            header: {
                items: [
                    {
                        xtype: 'textfield',
                        reference: 'usersSearchField',
                        emptyText: 'search',
                        emptyCls: 'searchlogo',
                        height: 20,
                        width: 90,
                        listeners: {
                            change: 'usersSearchEvent'
                        }
                    }
                ]
            },
            columns: [{
                text: 'Users',
                dataIndex: 'title',
                flex: 1,
                align: 'left'
            }, {
                text: 'User Type',
                dataIndex: 'id',
                flex: 1,
                align: 'left',
                renderer: 'membersType'
            }]
        }]
    }]
});