public class AccountController {
    
    @auraEnabled
    public static List<Account> getAccounts(String searchkey)
    {
        List<Account> acc;
        String str='%'+searchkey+'%';
        if(searchkey!=null)
        {
            acc=[select id,name,type,phone,AccountNumber,Industry,Active__c from Account where name like:str];
            //List<List<Sobject>> searchedList=[FIND:searchkey IN ALL FIELDS RETURNING Account(id,name,type,phone,AccountNumber,AccountSource,Active__c)];
            //acc=(Account[])searchedList[0];
        }else
        {
            acc=[Select id,name,type,phone,AccountNumber,Industry,Active__c from Account];              
        }
        return acc; 
    }
    @auraEnabled
    public static String deleteAccount(String accId)
    {
        Account acc=[select id from account where id=:accId];
        delete acc;
        if(acc!=null)
        {
           return 'SUCCESS';
        }
        else
        {
            return 'ERROR';
        }
    }
     

}