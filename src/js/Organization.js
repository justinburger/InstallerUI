var Organization = Class.create();
Organization.prototype = {
    initialize: function() {
        this.name = null;
    },

    getName: function(){
        return this.name;
    },

    setName: function(name){
        this.name = name;
        return true;
    }
};