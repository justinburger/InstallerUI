/**
 * Deployment Wizard
 * Class to handle the base functionality of the Deployment Wizard UI.
 *
 * @author Justin Burger <j@justinburger.com>
 */
var DeploymentWizard = Class.create();
DeploymentWizard.prototype = {
    initialize: function() {
        this.Organization = new Organization();
        this.Tag = new Tag();
        this.Deploy = new Deploy();
        this.DeploymentConsole = new DeploymentConsole();

    },

    /**
     * initialize UI
     * Loads external HTML pages, and does the inital setup of the UI.
     */
    initializeUI: function(){
        var options = {interval: false,pause: false};

        jQuery('#myCarousel').carousel(options);
        jQuery('#step0').load('src/html/deploy/step0.html');
        jQuery('#step1').load('src/html/deploy/step1.html');
        jQuery('#step2').load('src/html/deploy/step2.html');
        jQuery('#step3').load('src/html/deploy/step3.html');
        jQuery('#stepSelectTag').load('src/html/deploy/step_selectTag.html');
        jQuery('#step4').load('src/html/deploy/step4.html');
        jQuery('#step5').load('src/html/deploy/step5.html');
    },


    /**
     * Displays the pane which allows users to manually input
     * the version they would like to deploy.
     */
    showSelectTag: function(){
        jQuery('#myCarousel').carousel(6);
    },

    /**
     * Load Step 4
     *
     * @todo Rename this method and clean it up.
     * @constructor
     */
    LoadStep4OrgList: function(){
        jQuery.ajax('Environment',{
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
                    jQuery('#step4_organization_list').empty();
                    jQuery.each(data, function(index, value) {
                        var btn = document.createElement("button");
                        jQuery(btn).addClass('btn')
                        btn.setAttribute("type","button");
                        jQuery(btn).html(value);
                        document.getElementById('step4_organization_list').appendChild(btn);

                    });
                    jQuery('#step4_organization_list_please_wait').hide();

                }}
        });

        this.wizard_step(3,4);

    },

    /**
     * Load Step 10

     * @todo Rename this method and clean it up.
     * @constructor
     */
    LoadStep1OrgList: function(){
        jQuery.ajax('Organization',{
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
                    jQuery('#step1_organization_list').empty();

                    jQuery.each(data, function(index, value) {
                        var btn = document.createElement("button");
                        jQuery(btn).addClass('btn')
                        btn.setAttribute("type","button");

                        jQuery(btn).html(value);

                        document.getElementById('step1_organization_list').appendChild(btn);
                    });
                    jQuery('#step1_organization_list_please_wait').hide();

                }}
        });

        this.wizard_step(0,1);
    },

    /**
     * Base method to move around the wizard screens. It needs some work.
     * @param from
     * @param to
     */
    wizard_step: function(from, to){
        if(to ==2){
            org = jQuery('#step1_organization_list').children('.btn-group button.active').html();
            this.Organization.setName(org);
            if(org == '' || org == undefined){
                jQuery('#step1_organization_list').tooltip('show')
                return;
            }
        }else if(to ==5){
            environment = jQuery('#step4_organization_list').children('.btn-group button.active').html();

            if(environment == '' || environment == undefined){
                jQuery('#step4_organization_list').tooltip('show')
                return;
            }

            this.Deploy.initDeployPane();
        }

        jQuery('#myCarousel').carousel(to);

        if(to == 3){
            this.Tag.initTaggingPane();
        }
        jQuery('#myCarousel').carousel('pause');


    }
};

var dw = new DeploymentWizard();