({
	doinit : function(component, event, helper) {
        //step1--> getting action by passing controller method
		var action= component.get('c.getContactList');
        //step2--> we can set the controller methods parameter here
        action.setParams({
            accountid:component.get('v.recordId')
        });
        //step 4-> we can perform operation on the response of server call as per state i.e SUCCESS, ERROR
        action.setCallback(this,function(response){
            var condata=response.getReturnValue();
            component.set('v.contacts',condata);
            console.log('data',condata);
            
        },'SUCCESS');
        //step3 --> execute the action i.e calling the server i.e apex
        $A.enqueueAction(action);
	},
    gotoContact : function (component, event, helper) {
        var eventsource=event.getSource();
        var id= eventsource.get('v.name');
        //alert(id);
        var navEvt = $A.get('e.force:navigateToSObject');
        navEvt.setParams({
            'recordId': id,
            'slideDevName': 'detail'
        });
        navEvt.fire();
    },
    passContact: function(component, event, helper){
        debugger;
        //fetch the value of contactDetails which is event attribute where contact is passed from contactForm controller
        var getcontact=event.getParam('contactDetails');
        console.log('fetched contact',getcontact);
        
        //get the list of current contacts and push the contact which comes from event
        var listofContact=component.get('v.contacts');
        listofContact.push(getcontact);
        component.set('v.contacts',listofContact);
        console.log(component.get('v.contacts'));
    }
})