({
	changeValue : function(component, event, helper) {
        debugger;
		alert('System change event fired!');
	},
    handleClick : function(component, event, helper) {
        debugger;
		component.set('v.checkChange','hey value changed in after the click');
        //fire application event
        var getapplicationEvent=$A.get('e.c:appEvent');
        alert('application event fired');
        getapplicationEvent.fire();
	},
    doInit: function(component, event, helper) {
        debugger;
		component.set('v.checkChange','hey value changed in init method');
	},
    handleApplicationEvent: function(component, event, helper) {
        debugger;
        //handle application in same component where it gets fired
        alert('application event changed...');
		//component.set('v.checkChange','hey value changed application event handler method');
	}
})