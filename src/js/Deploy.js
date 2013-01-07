
var Deploy = Class.create();
Deploy.prototype = {
    initialize: function() {

    },

    initDeployPane: function(){
        jQuery('#step5_org_lbl').html(dw.Organization.getName());
        jQuery('#step5_env_lbl').html(jQuery('#step4_organization_list').children('.btn-group button.active').html());
        jQuery('#step5_progress').children('.bar-success').css('width','1%');

        this.initDeployPaneProgressPolling();
        this.requestDeployment();

    },

    requestDeployment: function (){
        org = dw.Organization.getName();
        version = dw.Tag.getVersion();
        environment = jQuery('#step4_organization_list').children('.btn-group button.active').html()
        dw.environment = environment;
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
    },


    initDeployPaneProgressPolling: function(){
        this.getDeployPaneProgress(true);
    },


     getDeployPaneProgress: function(first){
        var tag_uri_encoded = dw.Tag.getVersion()+"";
        tag_uri_encoded = tag_uri_encoded.replace(".", "_");

        jQuery.ajax('Deploy/'+dw.Organization.getName() + '/' +  tag_uri_encoded + '/' + dw.environment,{
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
                    jQuery('#step5_progress_details').html(data.detail);
                    jQuery('#step5_progress').children('.bar').css('width',data.progress+'%');

                    if(data.progress < 100 || first == true){
                        first = false;
                        if(data.progress >= 100 && first == true){
                            first = true;
                        }
                        setTimeout('dw.Deploy.getDeployPaneProgress('+first+')', 1000);
                    }

                }}
        });
    }
};