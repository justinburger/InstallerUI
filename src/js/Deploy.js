
function initDeployPane(){
    $('#step5_org_lbl').html(getSelectedOrganization());
    $('#step5_env_lbl').html($('#step4_organization_list').children('.btn-group button.active').html());
    $('#step5_progress').children('.bar-danger').css('width','1%');
    $('#step5_progress').children('.bar-warning').css('width','1%');
    $('#step5_progress').children('.bar-success').css('width','1%');

    requestDeployment();


}


function requestDeployment(){
    org = getSelectedOrganization();
    version = getSelectedVersion();
    environment = $('#step4_organization_list').children('.btn-group button.active').html()
    jQuery.ajax('Deploy/'+org,{
        type:'POST',
        headers: {
            Accept : "text/json",
            "Content-Type": "text/json"
        },
        data: JSON.stringify({
            organization: org,
            tag: version,
            env: environment
        }),
        format: 'text/json',
        dataTypes: 'json',
        statusCode: {
            404: function() {
                alert("page not found");
            },
            200: function(data) {



            }}
    });
}


function initDeployPaneProgressPolling(){}


function getDeployPaneProgress(){}

