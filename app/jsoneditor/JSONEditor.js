Ext.define('xcpdevtools.jsoneditor.JSONEditor', {
    extend: 'Ext.form.field.Base',
    alias: 'widget.jsoneditor',
    labelAlign: 'top',
    height: '100%',
    flex: 1,
    border: false,
    value: null,
    container: null,
    editor: null,
    readOnly: true,
    navigationBar: false,
    headerTitle: '',
    removeHeaderButtons: true,

    listeners: {
        afterrender: function () {
            this.jsonEditorReady();
            if (this.removeHeaderButtons)
                var htmlMenuItem = this.getEl().query('.jsoneditor-menu')[0];
            Ext.create('Ext.panel.Panel', {
                height: 30,
                width: 300,
                title: this.headerTitle,
                renderTo: htmlMenuItem,
            });
            if (this.removeHeaderButtons) {
                htmlMenuItem.children[0].remove();
                htmlMenuItem.children[0].remove();
            };
        },
        resize: function (win, width, height) {
            this.container.setHeight(height - 20);
        }
    },

    fieldSubTpl: ['<div id="{id}" style="height:100%;width:100%;overflow: auto"></div>',
        { disableFormats: true }],



    initComponent: function () {
        this.callParent(arguments);
    },

    jsonEditorReady: function () {

        /**
        * this.getSubTplData().id = <div id="{id}">
        */
        this.container = Ext.get(this.getSubTplData('').id);
        /**
        * Available modes :
        * 'tree' : - Edit, add, move, remove, and duplicate fields and values.
        *          - Change type of values.
        *          - Sort arrays and objects.
        *          - Colorized code.
        *          - Search & highlight text in the treeview.
        *          - Undo and redo all actions.
        * 'code' : - Format and compact JSON.
        *          - Colorized code (powered by Ace).
        *          - Inspect JSON (powered by Ace).
        * 'view' : Readonly
        * 'form' : Readonly
        * 'text' : Format and compact JSON
        *
        ### Usage :
        * options : {
        *              mode: 'tree',
        *              // allowed modes, this will create combobox.      
        *              modes: ['code', 'form', 'text', 'tree', 'view']
        *           }
        */
        this.options = { mode: (this.readOnly ? 'view' : 'tree'), navigationBar: false };

        this.editor = new JSONEditor(this.container, this.options, this.value);
    },

    getEditor: function () {
        return this.editor ? this.editor.get() : null;
    },

    /**
    * value : jsonObject
    */
    setEditor: function (value) {
        if (this.editor) return this.editor.set(value);
    },

    setReadOnly: function (readOnly) {
        var childNodes = document.getElementById(this.getSubTplData('').id).childNodes;

        if (Ext.isDefined(childNodes) && childNodes.length > 0) {

            /**
            * There was a bug from jsoneditoronline. For fixing it we wrote this code.
            */
            if (Ext.get(childNodes[0].id)) {
                Ext.get(childNodes[0].id).destroy();
            }
            this.editor.setMode(readOnly ? 'view' : 'tree');
        }
    }
});