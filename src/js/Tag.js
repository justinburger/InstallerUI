/**
 * Tag Organization
 * runs thru all the repositories
 * @param org
 */
function tagOrganization(org){
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
                setSelectedVersion(data.tag);
                $('#tagging_version_lbl').html(getSelectedVersion());
                initTaggingProgressBar(getSelectedVersion());

            }}
    });
}

/**
 * Fills in Org label, as well as version label
 * and inits the tagging process.
 */
function initTaggingPane(){
    tagOrganization(getSelectedOrganization());
    $('#tagging_org_lbl').html(getSelectedOrganization());
}

/**
 * Start polling for tagging progress updates.
 */
function initTaggingProgressBar(tag){
    getTaggingProgressUpdate(tag);
}

/**
 * Called via poll get update the tagging progress bar.
 */
function getTaggingProgressUpdate(tag){
    var tag_uri_encoded = tag+"";
    tag_uri_encoded = tag_uri_encoded.replace(".", "_");

    jQuery.ajax('Tag/'+getSelectedOrganization() + '/' +  tag_uri_encoded,{
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
                $('#tagging_progress').children('.bar').css('width',data.progress+'%');
                $('#step3_next_btn').show();

            }}
    });
}


function validateTagSelectPane(){
    $('#version_major').tooltip('hide');
    $('#version_minor').tooltip('hide');

    if(!$.isNumeric($('#version_major').val())){
        $('#version_major').tooltip('show');
        return;
    }
    if(!$.isNumeric($('#version_minor').val())){
        $('#version_minor').tooltip('show') ;
        return;
    }

    setSelectedVersion("v" + $('#version_major').val() + "." + $('#version_minor').val());

    LoadStep4OrgList();


}



var selectedVersion = null;

function setSelectedVersion(v) {
    selectedVersion = v;
}

function getSelectedVersion() {
    return selectedVersion;
}

