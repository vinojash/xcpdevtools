Ext.define('xcpdevtools.view.objectmodel.ObjectModelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.objectmodelcontroller',
    onBusinessObjectViewRender: function (me) {
        var BusinessObjectGrid = this.lookupReference('businesobjectgrid');
        var BusinessObjectStore = BusinessObjectGrid.getStore();
        var baseurl = xcpdevtools.utils.XcpUtils.baseurl;
        var bussinessObjectUrl = '/types/business-objects?inline=true&items-per-page=1000000';
        BusinessObjectStore.getProxy().url = Ext.String.format('{0}{1}', baseurl, bussinessObjectUrl);
        BusinessObjectStore.load();
    },
    onContentObjectViewRender: function (me) {
        var contentObjectGrid = this.lookupReference('contentobjectgrid');
        var contentObjectStore = contentObjectGrid.getStore();
        var baseurl = xcpdevtools.utils.XcpUtils.baseurl;
        var contentObjectUrl = '/types/contents?inline=true&items-per-page=1000000';
        contentObjectStore.getProxy().url = Ext.String.format('{0}{1}', baseurl, contentObjectUrl);
        contentObjectStore.load();
    },
    onFolderObjectViewRender: function (me) {
        var folderObjectGrid = this.lookupReference('folderobjectgrid');
        var folderObjectStore = folderObjectGrid.getStore();
        var baseurl = xcpdevtools.utils.XcpUtils.baseurl;
        var folderObjectUrl = '/types/folders?inline=true&items-per-page=1000000';
        folderObjectStore.getProxy().url = Ext.String.format('{0}{1}', baseurl, folderObjectUrl);
        folderObjectStore.load();
    },
    onContentObjectGridSelect: function (rowModel, record, index, eOpts) {
        var contentAttributeStore = this.lookupReference('contentattributegrid').getStore();
        var baseurl = xcpdevtools.utils.XcpUtils.baseurl;
        var contentObjectUrl = '/types/contents?inline=true&items-per-page=1000000';
        var contentTypeUrl = Ext.String.format('{0}{1}', baseurl, contentObjectUrl);
        var title = record.get('title');
        Ext.Ajax.request({
            url: contentTypeUrl,
            success: function (res) {
                if (contentAttributeStore.getCount() > 0) {
                    contentAttributeStore.loadData([], false);
                }
                var data = Ext.decode(res.responseText);
                data.entries.forEach(function (entry) {
                    var entryTitle = entry.title;
                    entry.content.properties.forEach(function (property) {
                        if (title == entryTitle)
                            contentAttributeStore.add({
                                label: property.label,
                                type: property.type,
                                name: property.name
                            });
                    });
                });
            }
        });
    },
    onFolderObjectGridSelect: function (rowModel, record, index, eOpts) {
        var folderAttributeStore = this.lookupReference('folderattributegrid').getStore();
        var baseurl = xcpdevtools.utils.XcpUtils.baseurl;
        var folderObjectUrl = '/types/folders?inline=true&items-per-page=1000000';
        var folderTypeUrl = Ext.String.format('{0}{1}', baseurl, folderObjectUrl);
        var title = record.get('title');
        Ext.Ajax.request({
            url: folderTypeUrl,
            success: function (res) {
                if (folderAttributeStore.getCount() > 0) {
                    folderAttributeStore.loadData([], false);
                }
                var data = Ext.decode(res.responseText);
                data.entries.forEach(function (entry) {
                    var entryTitle = entry.title;
                    var properties = entry.content.properties;
                    if (properties != undefined) {
                        properties.forEach(function (property) {
                            if (title == entryTitle)
                                folderAttributeStore.add({
                                    label: property.label,
                                    type: property.type,
                                    name: property.name
                                });
                        });
                    }
                });
            }
        });
    },
    onBussinessObjectGridSelect: function (rowModel, record, index, eOpts) {
        var businessAttributeStore = this.lookupReference('businessattributegrid').getStore();
        var baseurl = xcpdevtools.utils.XcpUtils.baseurl;
        var businessObjectUrl = '/types/business-objects?inline=true&items-per-page=1000000';
        var businessTypeUrl = Ext.String.format('{0}{1}', baseurl, businessObjectUrl);
        var title = record.get('title');
        Ext.Ajax.request({
            url: businessTypeUrl,
            success: function (res) {
                if (businessAttributeStore.getCount() > 0) {
                    businessAttributeStore.loadData([], false);
                }
                var data = Ext.decode(res.responseText);
                data.entries.forEach(function (entry) {
                    var entryTitle = entry.title;
                    var properties = entry.content.properties;
                    if (properties != undefined) {
                        properties.forEach(function (property) {
                            if (title == entryTitle)
                                businessAttributeStore.add({
                                    label: property.label,
                                    type: property.type,
                                    name: property.name
                                });
                        });
                    }
                });
            }
        });
    }
});