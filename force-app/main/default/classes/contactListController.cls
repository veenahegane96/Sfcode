public class contactListController {
    @AuraEnabled
    public static List<Contact> getContactList(string accountid)
    {
        List<Contact> lst=new List<contact>([select id,firstName, lastName, email, phone from contact where email!=null and AccountId=: accountid]);
        //return[select id,firstName, lastName, email, phone from contact where email!=null];
        return lst; 
    }
    
    @AuraEnabled
    public static Contact saveRecord(Contact con, Id accountId)
    {
        con.AccountId=accountId;
        insert con;
        return con;
    }

}