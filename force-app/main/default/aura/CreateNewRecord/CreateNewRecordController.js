({
	init : function(component, event, helper) {
        component.find('createRecord').getNewRecord('Beer__c',null,false,
                $A.getCallback(function(){
                    var getrecord=component.get('v.record');
                    var geterror=component.get('v.recordError');
                    if(getrecord===null || geterror)
                    {
                        console.log('Error occured',geterror);
                        alert(geterror);
                    }else
                    {
                        console.log('record--',getrecord);
                       // alert('template initialized');
                    }  
                }));
	},
    
    saveRecord: function(component, event, helper){
        debugger;
        component.find("createRecord").saveRecord(function(saveResult) {
                if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                    // record is saved successfully
                    var resultsToast = $A.get("e.force:showToast");
                    resultsToast.setParams({
                        "title": "Save record",
                        "type": "success",
                        "message": "The record saved sucessfully"
                    });
                    resultsToast.fire();
                    
                    var pagenavigate=component.find('navigateBeerList');
                    var newpageref={    
                        "type": "standard__objectPage",
                        "attributes": {
                            "objectApiName": "Beer__c",
                            "actionName": "list"
                        },
                        "state": {        
                        }
                    }
                    pagenavigate.navigate(newpageref);
                    
                } else if (saveResult.state === "INCOMPLETE") {
                    // handle the incomplete state
                    console.log("User is offline, device doesn't support drafts.");
                } else if (saveResult.state === "ERROR") {
                    // handle the error state
                    console.log('Problem saving beer, error: ' +
                                 JSON.stringify(saveResult.error));
                } else {
                    console.log('Unknown problem, state: ' + saveResult.state +
                                ', error: ' + JSON.stringify(saveResult.error));
                }
            });  
    }
})