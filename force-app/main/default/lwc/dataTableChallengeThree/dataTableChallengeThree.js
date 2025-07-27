import { LightningElement , wire } from 'lwc';
import getAccountRecords from '@salesforce/apex/DataTableChallengeHelper.getAccountRecords';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
const columns = [
    {label : 'Account Name' , fieldName : 'Name' , type : 'text' },
    {label : 'Industry' , fieldName : 'Industry' , type : 'text'},
    {label : 'Phone' , fieldName : 'Phone' , type : 'phone'},
    {type : 'action' , 
        typeAttributes : {
            rowActions : [
                {label : 'Edit' , name :'edit'},
                {label : 'View' , name : 'view'}
            ]
        }
    }
]
export default class DataTableChallengeThree extends LightningElement {
    wiredAccountResult;
    accounts;
    columns = columns;
    modal = false;
    selectedAccount = "";
    modalHeader = "";
    modalType = "";
    @wire(getAccountRecords , {recordLimit : 10})
    retrievedAccounts(result){
        this.wiredAccountResult = result;
        let {data , error} = this.wiredAccountResult;
        if(data){
            this.accounts = data;
        }
        if(error){
            console.log('Error Retrieving account records '+error);
        }
    }
    get hasAccounts()
    {
        return this.accounts && this.accounts.length > 0;
    }
    handleRowAction(event)
    {
        console.log(event.detail.action.name);
        console.log(event.detail.row);
        this.selectedAccount = event.detail.row.Id;
        switch(event.detail.action.name){
            case 'edit':
                console.log("inside edit switch");
                this.modalHeader = 'Edit Account';
                this.modalType = 'edit';
                break;
            case 'view':
                console.log("inside view switch");
                this.modalHeader = 'View Account';
                this.modalType = 'readonly';
                break;
        }
        console.log("done with execution");
        this.modal = true;
    }
    modalClose()
    {
        this.modal = false;
        this.selectedAccount = "";
    }
    handleSuccess() {
        this.modal = false;
        this.dispatchEvent(new ShowToastEvent({
            title: "Success",
            message: "Account updated successfully",
            variant: "success" 
        }));
        refreshApex(this.wiredAccountResult);
    }

}