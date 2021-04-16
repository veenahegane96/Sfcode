({
	handleButton1 : function(component, event, helper) {
		component.find('closeModal').notifyClose();
	},
    handleButton2 : function(component, event, helper) {
        var buttonlabel=component.get('v.Button2Name');
		var tabEvent=$A.get('e.c:TableEvent');
        tabEvent.setParams({
            actionName:buttonlabel
        });
        tabEvent.fire();
        component.find('closeModal').notifyClose();
	}
})