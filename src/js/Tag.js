var Tag = Class.create();
Tag.prototype = {
    /**
     * Class Construct.
     */
    initialize: function() {
        this.version = null;
    },

    /**
     * Version Number Setter.
     */
    getVersion: function(){
        return this.version;
    },

    /**
    * Version Number Setter.
    */
    setVersion: function(version){
        this.version = version;
        return true;
    },

    /**
     * Tag Organization
     * runs thru all the repositories
     * @param org
     */
    tagOrganization: function(org){
        this.initTaggingProgressBar();

        jQuery.ajax('Tag/'+org,{
            type:'POST',
            headers: {
                Accept : "text/json",
                "Content-Type": "text/json"
            },
            data: {
                "organization": org
            },
            format: 'text/json',
            dataTypes: 'json',
            statusCode: {
                404: function() {
                    alert("page not found");
                },
                200: function(data) {
                    dw.Tag.setVersion(data.tag);

                    jQuery('#tagging_version_lbl').html(dw.Tag.getVersion());

                }}
        });
    },

    /**
     * Fills in Org label, as well as version label
     * and inits the tagging process.
     */
    initTaggingPane: function(){
        this.tagOrganization(dw.Organization.getName());
        jQuery('#tagging_org_lbl').html(dw.Organization.getName());
    },

    /**
     * Start polling for tagging progress updates.
     */
    initTaggingProgressBar: function(){
        this.getTaggingProgressUpdate(true);
    },

    /**
     * Called via poll get update the tagging progress bar.
     */
        getTaggingProgressUpdate: function(first){

        jQuery.ajax('Tag/'+dw.Organization.getName(),{
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
                    dw.Tag.setVersion(data.version);
                    jQuery('#tagging_version_lbl').html(dw.Tag.getVersion());
                    jQuery('#tagging_details_lbl').html(data.detail);
                    jQuery('#tagging_progress').children('.bar').css('width',data.progress+'%');
                    jQuery('#step3_next_btn').show();

                    if(data.progress < 100 || first == true){
                        first = false;
                        if (data.progress >=100 && first == true){
                            first = true;
                        }
                        setTimeout('dw.Tag.getTaggingProgressUpdate('+first+')', 1000);
                    }

                }}
        });
    },

    /**
     * Validate Tag Selction Pane
     * Makes sure the user enters a valid version number.
     *
     * @todo should do more validation. not just checking to make sure it numeric.
     */
    validateTagSelectPane: function(){
        jQuery('#version_major').tooltip('hide');
        jQuery('#version_minor').tooltip('hide');

        if(!jQuery.isNumeric(jQuery('#version_major').val())){
            jQuery('#version_major').tooltip('show');
            return;
        }
        if(!jQuery.isNumeric(jQuery('#version_minor').val())){
            jQuery('#version_minor').tooltip('show') ;
            return;
        }

        this.setVersion("v" + jQuery('#version_major').val() + "." + jQuery('#version_minor').val());

        dw.LoadStep4OrgList();


    }
};
