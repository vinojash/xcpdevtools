/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('xcpdevtools.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',
    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',
        'xcpdevtools.view.main.MainController',
        'xcpdevtools.view.main.MainModel',
        'xcpdevtools.view.main.List',
        'xcpdevtools.view.sessionvariables.SessionVariables',
        'xcpdevtools.view.processes.ProcessView',
        'xcpdevtools.view.components.Components'
    ],
    controller: 'main',
    viewModel: 'main',
    ui: 'navigation',
    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,
    header: {
        cls: 'logoTitle',
        layout: {
            align: 'stretchmax'
        },
        title: {
            flex: 0
        },
        iconCls: 'fosalogo'
    },
    tabBar: {
        flex: 0,
        bodyCls: 'menuColor',
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },
    responsiveConfig: {
        tall: {
            headerPosition: 'top'
        },
        wide: {
            headerPosition: 'left'
        }
    },
    defaults: {
        tabConfig: {
            plugins: 'responsive',
            responsiveConfig: {
                wide: {
                    iconAlign: 'left',
                    textAlign: 'left'
                },
                tall: {
                    iconAlign: 'top',
                    textAlign: 'center',
                    width: 120
                }
            }
        }
    },
    items: [{
        title: 'General',
        iconCls: 'fa-info',
        items: [{
            xtype: "generalview"
        }]
    }, {
        title: 'Process',
        iconCls: 'fa-recycle',
        items: [{
            xtype: 'processview'
        }]
    }, {
        title: 'Session Variables',
        iconCls: 'fa-certificate',
        items: [{
            xtype: 'SessionVariables'
        }]
    }, {
        title: 'UI Events',
        iconCls: 'fa-bolt',
        items: [{
            xtype: 'uieventview'
        }]
    }, {
        title: 'Page Components',
        iconCls: 'fa-cog',
        items: [{
            xtype: 'Components'
        }]
    }, {
        title: 'Workflows',
        iconCls: 'fa-cogs',
        items: [{
            xtype: 'workflow'
        }]
    }, {
        title: 'Object Model',
        iconCls: 'fa-object-group',
        items: [{
            xtype: 'objectmodelview'
        }]
    }, {
        title: 'Help',
        iconCls: 'fa-question-circle',
        items: [{
            xtype: 'helpview'
        }]
    }]
});