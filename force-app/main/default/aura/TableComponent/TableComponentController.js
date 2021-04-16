({
    init : function(component, event, helper) {
        var actions = [
            { label: 'Show details', name: 'show_details' },
            { label: 'Edit', name:'edit'},
            { label: 'Delete', name: 'delete' }
        ];
        var column=[
            { label: 'Id', fieldName: 'Id' },
            { label: 'Name', fieldName: 'Name', sortable: true},
            { label: 'Account Number', fieldName: 'AccountNumber',  sortable: true},
            {
                label: 'Phone',
                fieldName: 'Phone',
                type: 'phone',
                sortable: true
            },
            { label: 'Active', fieldName: 'Active__c', sortable: true},
            { label: 'Industry', fieldName: 'Industry', sortable: true},
            { type: 'action', typeAttributes: { rowActions: actions }}
        ];
        
        component.set('v.accountFields',column);
        //passing search keyword to controller for seraching record
        var getSearchstring= event.getParam('searchtext');
        helper.showTableData(component,event,helper,getSearchstring);
    },
    
    handleSort:function(component, event, helper)
    {
        var sortColumn=event.getParam('fieldName');
        var sortdir=event.getParam('sortDirection');
        console.log(sortColumn+' in order of '+sortdir);
        helper.sortData(component,sortColumn,sortdir);
       if(sortdir=='asc')
        {
            component.set('v.defaultSortDirection','desc');
        }
        else
        {
            component.set('v.defaultSortDirection','asc');
        }
        console.log('set the order after sorting to-->',component.get('v.defaultSortDirection'));     
    },
    handleNext:function(component,event,helper)
    {
        var pageCount=component.get('v.currentPageNo')+1;
        var getlist=component.get('v.filterAccountlist');
        helper.pagination(component,getlist,pageCount);  
    }, 
    handlePrevious:function(component,event,helper)
    {
        var pageCount=component.get('v.currentPageNo')-1;
        var getlist=component.get('v.filterAccountlist');
        helper.pagination(component,getlist,pageCount)   
    },
    handleRowAction:function(component,event,helper)
    {
        var actions=event.getParam('action');
        var row=event.getParam('row');
        var recordId=row.Id;
        component.set('v.rowId',recordId);
        console.log('row data-->',row); 
        var actionName=actions.name;
        switch(actionName)
        {
            case 'show_details':
                helper.showDetails(component,event);
                break;
                
            case 'edit':
                helper.edit(component,event);
                break;
                
            case 'delete':
                var cfm=component.get('c.showConfirm');
                $A.enqueueAction(cfm); 
                break;
        }
    },
    captureEvent: function(component,event,helper)
    {
        var value=event.getParam('actionName');
        console.log('Inside the event-->',value);
        if(value==='Edit'){
            helper.showTableData(component,event);    
        }else if(value==='Delete'){
            helper.deleteRecord(component,event);            
        }else{
          console.log('Not valid action is fired from application event');
        }
    },
    showConfirm: function(component,event,helper){
        var bodydata;
        var footerdata;
        $A.createComponent('c:ConfirmBox',{
            HeaderName:'Delete Account',
            Message:'Are you sure to delete this record?',
            Button1Name: 'Cancel',
            Button2Name: 'Delete'
        },function(newComp,status,errorMsg){
                if(status==='SUCCESS')
                {
                       var overlay=component.find('overlayLib');
                       overlay.showCustomModal({
                       body: newComp,
                       showCloseButton: true,
                       closeCallback: function() {}
                   });
                }
              else if (status === 'ERROR'){
                    console.log('error is',errorMessage);
                }
                else{
                    console.log('error is',errorMessage);
                }
        });
    }
   
})