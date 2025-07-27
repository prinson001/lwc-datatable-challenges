import { LightningElement , wire } from 'lwc';
import getAccountRecords from '@salesforce/apex/DataTableChallengeHelper.getAccountRecords';
import sendWelcomeEmail from '@salesforce/apex/DataTableChallengeHelper.sendWelcomeEmail';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
const columns = [
    {label : 'Account Name' , fieldName : 'Name' , type :'text'},
    {label : 'Industry' , fieldName : 'Industry' , type : 'text'},
    {label : 'Phone' , fieldName : 'Phone' , type : 'phone'},
    {type : 'button' ,
        label : 'Welcome Email',
        typeAttributes :{
            label:'Send  Mail',
            name :'send_mail',
            variant : 'brand',
            disabled : false
        }
     }
]
export default class DataTableChallengeFour extends LightningElement {
    columns = columns;
    wiredAccounts;
    loading = true;
    accounts;
    @wire(getAccountRecords , {recordLimit: 10})
    retrievedAccounts(result)
    {
        this.wiredAccounts = result;
        let {data,error} = this.wiredAccounts;
        if(data)
        {
            this.accounts = data;
            this.loading=false;
        }   
        if(error)
        {
            console.log("There was an error "+error);
            this.loading=false;
        }
    }

    get hasAccounts(){
        return this.accounts && this.accounts.length;
    }

    handleRowAction(event)
    {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        console.log(row);
        switch(actionName)
        {
            case 'send_mail':
                sendWelcomeEmail({AccountId : row.Id})
                .then((result)=>{
                    console.log(result);
                    if(result)
                    {
                        this.dispatchEvent(
                            new ShowToastEvent({
                                title:"Success",
                                message:"Email Sent Successfully",
                                variant : "success"
                            })
                        )
                    }
                    else
                    {
                        this.dispatchEvent(
                            new ShowToastEvent({
                                title:"Error",
                                message:"Error sending email",
                                variant : "error"
                            })
                        )
                    }
                })
                .catch((error)=>{
                    console.log("there was an error sending email");
                    console.log(error);
                    this.dispatchEvent(
                            new ShowToastEvent({
                                title:"Error",
                                message:"Error sending email",
                                variant : "error"
                            })
                        )
                })
                break;
        }
    }
}