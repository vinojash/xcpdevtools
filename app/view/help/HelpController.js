Ext.define('xcpdevtools.view.help.HelpController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.helpcontroller',

    onHelpViewRender: function () {
        var helpGrid = this.lookupReference("helpGrid");
        helpGrid.setSource({ 
            "Process": "https://www.youtube.com/watch?v=yuAjl81SF6M&feature=youtu.be" ,
            "SessionVariables": " https://www.youtube.com/watch?v=v6_O5d7zVow&feature=youtu.be" ,
            "UIEvents": "https://youtu.be/UfmDXQxcF0o",
            "PageComponents": "https://youtu.be/jwWoTXWrLyg"
        });
        helpGrid.sourceConfig=({
            Process : {
                renderer: function(v) {
                    return "<a href='https://youtu.be/xCJ6Ppptry4' target='_blank'>process video</a>"
                }
            },
            SessionVariables : {
                renderer: function(v) {
                    return "<a href='https://youtu.be/s3XEs6tpesk' target='_blank'>session variables video</a>"
                }
            },
            UIEvents : {
                renderer: function(v) {
                    return "<a href='https://youtu.be/2opOr2yKoKk' target='_blank'>uievents video</a>"
                }
            },
            PageComponents : {
                renderer: function(v) {
                    return "<a href='https://youtu.be/bVXAQ3LCgl8' target='_blank'>page components video</a>"
                }
            }

        })
        helpGrid.getColumns()[0].setWidth('30%');
        helpGrid.getColumns()[0].textAlign = 'left';
        helpGrid.getColumns()[1].textAlign = 'left';
        helpGrid.findPlugin('cellediting').disable();
    }
});