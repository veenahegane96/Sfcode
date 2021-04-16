({
    navigateBeerRecord : function(component, event, helper) {
        var beerid=event.getSource().get('v.name');
        component.set('v.beerId',beerid);
        console.log(component.get('v.beerId'));
        
        $A.createComponent('c:BeerDetails', {
            'aura:id': 'newform',
            'beerRecordId': component.get('v.beerId')
        },
         function(newForm,status,errorMessage) {
             //alert(status);
             if (status === 'SUCCESS') {
                 var overcmp=component.find('overlayForModal');
                 overcmp.showCustomModal({
                     header: 'Beer Details',
                     body: newForm,
                     showCloseButton: true,
                     closeCallback: function() {
                         //alert('You closed the alert!');
                     }
                 });
             }
             else if (status === 'ERROR')
             {
                 alert(status);
                 console.log('error is',errorMessage);
             }
                 else{
                     alert('something wrong');    
                 }
         });
    }
})