Ext.define('xcpdevtools.store.usersandgroups.UsersAndGroupsStore', {
    extend: 'Ext.data.Store',
    alias: 'store.usersandgroupstore',
    fields: [
        'id', 'title', 'memberstype'
    ],
    proxy: {
        type: 'rest',
        reader: {
            type: 'json',
            rootProperty: 'entries',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }
});
