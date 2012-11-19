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

    jQuery.ajax('/Organization',{
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