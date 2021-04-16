({
	/*childclick : function(component, event, helper) {
        component.set('v.childfield','child value is changed in child component');
		
	},
    methodcall: function(component, event, helper)
    {
        debugger;
        alert('entered in child component');
        var params=event.getParam('arguments');
        if(params)
        {
            alert(params.parameter1+' '+params.parameter2);
        }
        else
        {
            alert('no value passed from child');
        }
        
    }*/
    testcall: function(component,event,helper)
    {
       alert('this is child component');
    }
})