/**
 * Load Wizard Panes
 * instead of including them in a long, ugly, hard to nav file,
 * wizard panes are stored in their own html files.
 * This function constructs the wizard panes on page load.
 */
function loadWizardPanes(){
    $('#step0').load('deploy/step0.html');
    $('#step1').load('deploy/step1.html');
    $('#step2').load('deploy/step2.html');
    $('#step3').load('deploy/step3.html');
    $('#step4').load('deploy/step4.html');
    $('#step5').load('deploy/step5.html');
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
    }

}




function LoadStep4OrgList(){

    jQuery.ajax('/Environment',{
        headers: {
            Accept : "text/json",
            "Content-Type": "text/json"
        },
        format: 'text/json',
        dataTypes: 'json',
        statusCode: {
            404: function() {
                alert("page not found");
            },
            200: function(data) {
                $('#step4_organization_list').empty();
                $.each(data, function(index, value) {
                    var btn = document.createElement("button");
                    $(btn).addClass('btn')
                    btn.setAttribute("type","button");

                    $(btn).html(value);
                    document.getElementById('step4_organization_list').appendChild(btn);

                });
                jQuery('#step4_organization_list_please_wait').hide();

            }}
    });

    wizard_step(3,4);

}

function LoadStep1OrgList(){

    jQuery.ajax('../../Organization',{
        headers: {
            Accept : "text/json",
            "Content-Type": "text/json"
        },
        format: 'text/json',
        dataTypes: 'json',
        statusCode: {
            404: function() {
                alert("page not found");
            },
            200: function(data) {
                $('#step1_organization_list').empty();

                $.each(data, function(index, value) {
                    var btn = document.createElement("button");
                    $(btn).addClass('btn')
                    btn.setAttribute("type","button");

                    $(btn).html(value);

                    document.getElementById('step1_organization_list').appendChild(btn);
                });
                jQuery('#step1_organization_list_please_wait').hide();

            }}
    });
    wizard_step(0,1);

}

function wizard_step(from, to){
    if(to ==2){
        org = $('#step1_organization_list').children('.btn-group button.active').html();

        if(org == '' || org == undefined){
            $('#step1_organization_list').tooltip('show')
            return;
        }
    }else if(to ==3){
        createBuildTag();
    }else if(to ==5){
        environment = $('#step4_organization_list').children('.btn-group button.active').html();

        if(environment == '' || environment == undefined){
            $('#step4_organization_list').tooltip('show')
            return;
        }
    }
    jQuery('#myCarousel').carousel('next');
    jQuery('#myCarousel').carousel('pause');


}



function createBuildTag(){
    jQuery.ajax('/Tag',{
        type:'PUT',
        headers: {
            Accept : "text/json",
            "Content-Type": "text/json"
        },
        format: 'text/json',
        dataTypes: 'json',
        statusCode: {
            404: function() {
                alert("page not found");
            },
            200: function(data) {
                $('#step3_next_btn').fadeIn();

                $('#tagging_progress').children('.bar').width('100%');

            }}
    });
}