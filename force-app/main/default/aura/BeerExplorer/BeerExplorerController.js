({
    findBeer : function(component, event, helper) {
        debugger;
        var searchedText=event.getParam('searchtext');
        var action=component.get('c.searchBeer');
        action.setParams({
            'serchkeyword':searchedText
        });
        action.setCallback(this,function(response){
            var state=response.getState();
            if(state==='SUCCESS'){
                // alert(state);
                var searchedbeer=response.getReturnValue();
                component.set('v.arraybeerlist',searchedbeer);
                console.log('list of beer-->',component.get('v.arraybeerlist'));
            }
            else if(state==='ERROR')
            {
                //alert(state);
                console.log(response.getError());
            }
                else
                {
                    alert('we are not searching spaces');
                }
        },'ALL');
        $A.enqueueAction(action);
    }       
    
})