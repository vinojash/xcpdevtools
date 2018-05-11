Ext.define('xcpdevtools.view.usersandgroups.UsersAndGroupsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.usersandgroupscontroller',
    requires: ['store.usersandgroupstore','store.usersstore'],

    membersType: function (record) {
        var idType = record;
        const [user, type, id] = idType.split('/');
        var usertype = id;
        if (usertype.startsWith('11')) {
            return 'user'
        } else {
            return 'Group'
        }
    },
    onUsersViewRender: function (me) {
        var membersGrid = me;
        var membersStore = membersGrid.getStore();
        var baseurl = xcpdevtools.utils.XcpUtils.baseurl;
        var membersurl = '/members/xcp_member?inline=true&items-per-page=1000000';
        membersStore.getProxy().url = Ext.String.format('{0}{1}', baseurl, membersurl);
        membersStore.load();
    },
    onGridSelect: function (me, record) {
        var userGroupObjectId = record.get('id').split('/')[2];
        var usersStore = this.lookupReference('usersGrid').getStore();
        if (userGroupObjectId.startsWith('12')) {
            var urlForUsersInsideGroup = '/members/xcp_member?member-of=' + userGroupObjectId + '&inline=true&items-per-page=1000000';
            usersStore.getProxy().url = Ext.String.format('{0}{1}', xcpdevtools.utils.XcpUtils.baseurl, urlForUsersInsideGroup);
            usersStore.load();
        } else {
            usersStore.removeAll();
        }
    },
    membersSearchEvent: function () {
        var searchFieldValue = this.lookupReference('searchField').getValue();
        var membersStore = this.lookupReference('membersGrid').getStore();
        membersStore.filter([{
            property: "title",
            value: searchFieldValue,
            anyMatch: true
        }]);
    },
    usersSearchEvent: function () {
        var searchFieldValue = this.lookupReference('usersSearchField').getValue();
        var usersStore = this.lookupReference('usersGrid').getStore();
        usersStore.filter([{
            property: "title",
            value: searchFieldValue,
            anyMatch: true
        }]);
    }
});