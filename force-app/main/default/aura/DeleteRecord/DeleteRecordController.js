({
	deleteRecord : function(component, event, helper) {
        debugger;
        component.find('deleteRecord').deleteRecord($A.getCallback(function(deleteResult){
                            alert(deleteResult.state);

            if(deleteResult.state==='SUCCESS' || deleteResult.state==='DRAFT'){
                var resultsToast = $A.get("e.force:showToast");
                    resultsToast.setParams({
                        "title": "Deleted record",
                        "type": "success",
                        "message": "The record deleted sucessfully"
                    });
                    resultsToast.fire();
            }
            else
            {
                alert(deleteResult.state);
                 var resultsToast = $A.get("e.force:showToast");
                    resultsToast.setParams({
                        "title": "Fail deletion",
                        "type": "error",
                        "message": "Something went wrong"
                    });
                    resultsToast.fire();
            }
        }));	
	}
})