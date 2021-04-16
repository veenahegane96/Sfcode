({
	add : function(component, event, helper) {
    
    var var1=component.get('v.firstNo');
    var var2=component.get('v.secondNo');
    /*var status=component.isValid();
    alert(status);*/
    var answerComponent=component.find('ans');
    answerComponent.set('v.value',parseInt(var1)+parseInt(var2));
    //alert(answerComponent.get('v.value'));	
	},
    
    sub : function(component, event, helper) {
    var var1=component.get('v.firstNo');
    var var2=component.get('v.secondNo');
    component.set('v.answer',parseInt(var1)-parseInt(var2));	
	},
    
    mul : function(component, event, helper) {
    var var1=component.get('v.firstNo');
    var var2=component.get('v.secondNo');
    component.set('v.answer',parseInt(var1)*parseInt(var2));	
	},
    
    div : function(component, event, helper) {
    var var1=component.get('v.firstNo');
    var var2=component.get('v.secondNo');
    component.set('v.answer',parseInt(var1)/parseInt(var2));	
	}
})