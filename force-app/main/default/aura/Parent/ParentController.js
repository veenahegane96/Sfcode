({
	/*parentclick : function(component, event, helper) {
		component.set('v.parentfield','Parent value is changed in parent component')
	}
    parentMethod: function(component,event,helper){
       
        var childcmp=component.find('childId');
        childcmp.callchildmethod_fromparent('Veena',25);
   }*/
    parentAction: function(component,event,helper){
        debugger;
     alert('This is from parent component');
    }
})