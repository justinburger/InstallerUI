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
                    dw.Tag.initTaggingProgressBar(dw.Tag.getVersion());

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
    initTaggingProgressBar: function(tag){
        this.getTaggingProgressUpdate(tag);
    },

    /**
     * Called via poll get update the tagging progress bar.
     */
        getTaggingProgressUpdate: function(tag){
        var tag_uri_encoded = tag+"";
        tag_uri_encoded = tag_uri_encoded.replace(".", "_");

        jQuery.ajax('Tag/'+dw.Organization.getName() + '/' +  tag_uri_encoded,{
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
                    jQuery('#tagging_progress').children('.bar').css('width',data.progress+'%');
                    jQuery('#step3_next_btn').show();

                    if(data.progress < 100){
                        setTimeout('dw.Tag.getTaggingProgressUpdate()', 1000);
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
