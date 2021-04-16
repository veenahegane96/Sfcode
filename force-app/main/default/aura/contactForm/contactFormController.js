({
    saveContact : function(component, event, helper) {
        //alert(event.getSource().getLocalId());
        var action=component.get('c.saveRecord');
        var allcompo=component.find('validate');
        var ovarallvalidation=allcompo.reduce(function(isvalid, inputcom){
            inputcom.showHelpMessageIfInvalid();
            inputcom.set('v.validity',{valid:false, badInput:true});
            return isvalid&&inputcom.get('v.validity').valid;
        },true);
        alert(ovarallvalidation);
        //console.log('validation-->', allcompo[0].get('v.validity').valid);
        
        /*console.log('contact->',component.get('v.contactinfo'));
        console.log('accountId1->',component.get('v.accountId'));
        var contactdetails=component.get('v.contactinfo');
        if(contactdetails.FirstName===null||contactdetails.FirstName===''||contactdetails.FirstName===undefined)
        {
            alert('Please provide a firstname');
            return;
        }*/
        if(ovarallvalidation){
            action.setParams({
                con: component.get('v.contactinfo'),
                accountId :component.get('v.accountId')
            });
            action.setCallback(this,function(response){
                var state=action.getState();
                alert(state);
                if(state==='SUCCESS'||state==='DRAFT'){
                    debugger;
                    var responseValue=response.getReturnValue();
                    console.log('result',responseValue);
                    alert('record saved sucessfully'); 
                    var fetchedcontactEvent=component.getEvent('contactEvent');
                    fetchedcontactEvent.setParams({
                        'contactDetails':responseValue
                    })
                    console.log(fetchedcontactEvent.getName());
                    console.log('contactDetails',fetchedcontactEvent.getParam('contactDetails'));
                    fetchedcontactEvent.fire();
                }
                else if(state=='ERROR')
                {
                    debugger;
                    var error=response.getError();
                    component.set('v.lastnameError',error[0].pageErrors[0].message);
                    alert(component.get('v.lastnameError'));
                    //alert(error[0].pageErrors[0].message);
                    console.log('error',error);
                }
                    else {
                        alert('Input data missing');
                    }            
            },'ALL');
            
            $A.enqueueAction(action);
        }
        else{
            alert('please provide all the valid inputs');
        }
        
    }
    
})