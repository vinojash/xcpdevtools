Ext.define('xcpdevtools.view.processes.ProcessInputsView', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.processinputsview',
    plugins: ['cellediting', 'gridfilters'],
    height: 180,
    store: {
        type: 'processinputstore'
    },
    columns: [{
        text: 'Name',
        dataIndex: 'name',
        align: 'left'
    }, {
        text: 'Label',
        dataIndex: 'label'
    }, {
        text: 'Value',
        dataIndex: 'value',
        align: 'left',
        editor: {
            editable: true
        },
        align: 'left'
    }, {
        text: "Delimiter",
        dataIndex: "delimiter",
        getEditor: function (record) {
            if (record.get('repeating') == true) {
                return Ext.create('Ext.form.field.ComboBox', {
                    store: [',', ';'],
                    allowBlank: false,
                    forceSelection: true
                });
            }
        },
        align: 'left'
    }, {
        text: 'Type',
        dataIndex: 'type',
        align: 'left'
    }, {
        text: 'Repeating',
        dataIndex: 'repeating',
        align: 'left'
    }, {
        text: 'Mandatory',
        dataIndex: 'mandatory',
        align: 'left'
    }, {
        text: 'input',
        dataIndex: 'input',
        align: 'left'
    }, {
        text: 'output',
        dataIndex: 'output',
        align: 'left'
    }],
    viewConfig: {
        selectedItemCls: 'selectedRowColor',
        stripeRows: false,
        getRowClass: function (record, index, rowParams) {
            return (index % 2 == 0) ? 'grid_row1' : 'grid_row2';
        }
    }
});