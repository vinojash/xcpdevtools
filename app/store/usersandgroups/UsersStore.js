Ext.define('xcpdevtools.store.usersandgroups.UsersStore', {
    extend: 'Ext.data.Store',
    alias: 'store.usersstore',
    fields: [
        'title', 'memberstype'
    ],
    proxy: {
        type: 'rest',
        reader: {
            type: 'json',
            rootProperty: 'entries',
            headers: {
                'Content-Type': 'application/json',
                'x-csrf-token': xcpdevtools.utils.XcpUtils.csrfToken
            }
        }
    }
});
