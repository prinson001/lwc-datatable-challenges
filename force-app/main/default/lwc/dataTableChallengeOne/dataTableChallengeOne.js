import { LightningElement ,wire } from 'lwc';
import getAccountRecords from '@salesforce/apex/DataTableChallengeHelper.getAccountRecords'
const columns =[
    {label : 'Account Name' , fieldName : 'Name' , type : 'text'},
    {label : 'Industry' , fieldName :'Industry' , type : 'text'},
    {label : 'Phone' , fieldName : 'Phone' , type : 'phone'}
]
export default class DataTableChallengeOne extends LightningElement {
    columns = columns;
    accounts;
    loading = true;
    @wire(getAccountRecords, {recordLimit: 10})
    retrievedContacts({data,error})
    {
        if(data)
        {
            console.log("retireved contact records");
            console.log(JSON.stringify(data));
            this.accounts = data;
            this.loading = false;
        }
        if(error)
        {
            console.error("failed to retrieve contact records");
            console.log(error);
            this.loading = false;
        }
    }

    get hasAccounts()
    {
        return this.accounts && this.accounts.length > 0;
    }
}