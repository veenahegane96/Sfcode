({
	doInit : function(component, event, helper) {
        debugger;
		var pageReference= component.get('v.pageReference');
        if(pageReference){
             component.set('v.beerId',pageReference.state.beerId__c);
             console.log('page reference--> ',pageReference.state.beerId__c);
             component.find('viewBeerRecord').reloadRecord();
           
        }else
        {
            alert('Page reference not found');
        }
        component.find('EditBeerOrderRecord').getNewRecord('Beer_Order__c', 
            null,      
            false,
            $A.getCallback(function(){
                var orderrec=component.get('v.orderbeerRecord');
                var orderErr=component.get('v.orderbeerError');
                if(orderrec || orderErr===null)
                {
                    alert('template initialized');
                }
                else
                {
                    alert('error while template initialized');
   
                }
        })
       );
	},
    
    handlePlaceOrder: function(component,helper,event){
        var beerRecord = component.get('v.beerFields');
        console.log('beerRecord Price', beerRecord.Price__c);
        var quantity = component.get('v.orderbeerFields.Ordered_Quantity__c');
        console.log('Ordered price ', quantity);
        var totalPrice = parseInt(beerRecord.Price__c)*parseInt(quantity);
        console.log(' totalPrice ', totalPrice);
        
       /* var isValid = helper.validateForm(component, event, helper);
        if(!isValid)
            return;*/

        if(component.get('v.orderbeerFields.Billing_Same_as_Shipping__c'))
           {
              component.set('v.orderbeerFields.Billing_Street__c',component.get('v.orderbeerFields.Shipping_Street__c'));
              component.set('v.orderbeerFields.Billing_City__c',component.get('v.orderbeerFields.Shipping_City__c'));
              component.set('v.orderbeerFields.Billing_Country__c',component.get('v.orderbeerFields.Shipping_Country__c'));
              component.set('v.orderbeerFields.Billing_State__c',component.get('v.orderbeerFields.Shipping_State__c'));
              component.set('v.orderbeerFields.Billing_Postal_Code__c',component.get('v.orderbeerFields.Shipping_Postal_Code__c'));
           }
        
        component.set('v.orderbeerFields.Order_Amount__c',totalPrice);
        var userId = $A.get("$SObjectType.CurrentUser.Id");
        component.set("v.orderbeerFields.Ordered_By__c", userId); 

        var beerId=component.get('v.beerId');
        component.set('v.orderbeerFields.Beer__c',beerId);
        console.log('checkbox value',component.get('v.orderbeerFields.Billing_Same_as_Shipping__c'));
        
        component.find('EditBeerOrderRecord').saveRecord(
            $A.getCallback(function(saveResult){
                alert(saveResult.state);
                if(saveResult.state=='SUCCESS'||saveResult.state=='DRAFT'){
                        var toastEvent = $A.get('e.force:showToast');
                        toastEvent.setParams({
                            'title': 'Success!',
                            'type':'success',
                            'message': 'The record saved successfully.'
                        });
                        toastEvent.fire();    
                }  
               else if (saveResult.state === "INCOMPLETE") {
                console.log("incomplete state");
            } 
                   else if (saveResult.state === "ERROR") {
                       var toastEvent = $A.get('e.force:showToast');
                       toastEvent.setParams({
                           'title': 'Error!',
                           'type':'error',
                           'message': 'Error occuried while saving'
                       });
                       toastEvent.fire();                } 
            })
        );
        
    }
})