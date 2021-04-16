({
	fireEvent : function(component, event, helper) {
        debugger;
       alert('I am in source component');
        
       /* Fire component event
        var compEvent=component.getEvent('sourceEvent');
       compEvent.fire();*/
        
        //Fire application event
        var appEvent=$A.get("e.c:applicationEvent");
        appEvent.fire();   
		
	}
})