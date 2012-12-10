/*
* Console Viewer JS container for the Installer UI.
*/

/**
 * Initalizes the console functionality.
 */

var lastConsoleLine = 0;

function initConsole(){
    pollforConsoleData();
}


function pollforConsoleData(){
    jQuery.ajax('Console',{
        headers: {
            Accept : "text/json",
            "Content-Type": "text/json",

        },
        data: {
            "lastLine": lastConsoleLine
        },
        format: 'text/json',
        dataTypes: 'json',
        statusCode: {
            404: function() {
                alert("page not found");
            },
            200: function(data) {
                lastConsoleLine = data.line;
                $.each(data.data, function(index, value) {
                    $('#console_pane_inner').prepend('<div>'+value+'</div>');


                });

                setTimeout(function() { pollforConsoleData(); }, 5000);
            }

        }
    });

}



/**
 * Toggle Console
 * show, or hide the console window.
 */
function toggleConsole(){
    if(jQuery('#console_btn').html() == "Hide Console"){
        jQuery('#tool_pane').removeClass('span4');
        jQuery('#tool_pane').addClass('span11');

        jQuery('#console_pane').hide();
        jQuery('#console_btn').removeClass('btn-danger');
        jQuery('#console_btn').addClass('btn-inverse');
        jQuery('#console_btn').html('Show Console');

    }else{
        jQuery('#tool_pane').removeClass('span11');
        jQuery('#tool_pane').addClass('span4');

        jQuery('#console_pane').show();
        jQuery('#console_pane').addClass('span8');
        jQuery('#console_btn').removeClass('btn-inverse');
        jQuery('#console_btn').addClass('btn-danger');
        jQuery('#console_btn').html('Hide Console');
        initConsole();
    }

}