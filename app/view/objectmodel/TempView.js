Ext.define('xcpdevtools.view.main.TempView', {
    extend: 'Ext.form.Panel',

    alias: 'widget.tempview',
    title: 'Temp View',

    items: [{
        xtype: 'textfield',
        fieldLabel: 'Sess',
        width: 300,
        name: 'textbox1'
    }, {
        xtype: 'button',
        text: 'Click Me',
        handler: function () {
            var form = this.up('form').getForm();
            var tb = form.findField('textbox1');
            // form.getSessVariables();
            var functionToExecute = this.up('form').getSessVariables;
            chrome.devtools.inspectedWindow.eval(
                '(' + functionToExecute + ')()',
                function (result) {
                    var tb = Ext.ComponentQuery.query('[name=textbox1]')[0].setValue(result.bwcfc_comm_search_comm_id);
                }
            );
        }
    }],

    getSessVariables: function () {
        //return document.title

        return xcp.core.SessionVariableManager.cookieEnabledFields;
    }

});