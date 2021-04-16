({
	handleEvent : function(component, event, helper) {
		alert('source event is handler in root Component');
        event.stopPropagation();
	}
})