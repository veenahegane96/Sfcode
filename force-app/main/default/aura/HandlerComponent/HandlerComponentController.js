({
	handleEvent : function(component, event, helper) {
        debugger;
		alert('source event is handler in handlerComponent');
        event.stopPropagation();
	}
})