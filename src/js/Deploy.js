
function initDeployPane(){
    $('#step5_org_lbl').html(getSelectedOrganization());
    $('#step5_env_lbl').html($('#step4_organization_list').children('.btn-group button.active').html());
    $('#step5_progress').children('.bar-success').css('width','1%');

    initDeployPaneProgressPolling();
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


function initDeployPaneProgressPolling(){
    getDeployPaneProgress();
}


function getDeployPaneProgress(){
    var tag_uri_encoded = getSelectedVersion()+"";
    tag_uri_encoded = tag_uri_encoded.replace(".", "_");

    jQuery.ajax('Deploy/'+getSelectedOrganization() + '/' +  tag_uri_encoded,{
        type:'GET',
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
                $('#step5_progress_details').html(data.detail);
                $('#step5_progress').children('.bar').css('width',data.progress+'%');

                if(data.progress < 100){
                    setTimeout('getDeployPaneProgress()', 1000);
                }

            }}
    });
}

