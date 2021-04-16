({
	handleUpdate : function(component, event, helper) {
        var allfields=event.getParam('fields');
        allfields['Industry']=component.get('v.industry');
        allfields['Phone']=component.get('v.phone');
        var activaValue=component.get('v.active');
        console.log('value of active--',activaValue);
        component.find('editformRecord').submit(allfields);     
	},
    handleSuccess: function(component,event,helper){
        var getId=component.get('v.recordId');
        var toastEvent = $A.get('e.force:showToast');
        toastEvent.setParams({
            'title': 'Success!',
            'type': 'success',
            'message': 'The record has been updated successfully.'
        });
        toastEvent.fire();
        component.find('closeModal').notifyClose();
        
        var tabEvent=$A.get('e.c:TableEvent');
        tabEvent.setParams({
            actionName:'Edit'
        });
        tabEvent.fire();
   },
    handleError: function(component,event,helper){
       var toastEvent = $A.get('e.force:showToast');
        toastEvent.setParams({
            'title': 'Error!',
            'type': 'error',
            'message': 'Unable to update record'
        });
        toastEvent.fire();
        component.find('closeModal'). notifyClose();
   }
})