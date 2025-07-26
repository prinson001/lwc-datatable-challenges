import { LightningElement , track, wire} from 'lwc';
import { updateRecord } from 'lightning/uiRecordApi';
import getAccountRecords from '@salesforce/apex/DataTableChallengeHelper.getAccountRecords';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
const columns = [
    {label:'Account Name' , fieldName : 'Name' , type:'text'},
    {label:'Industry', fieldName :'Industry' , type:'text'},
    { label: 'Phone', fieldName: 'Phone', type: 'phone', editable: true },
    { label: 'Website', fieldName: 'Website', type: 'url', editable: true },
]
export default class DataTableChallengeTwo extends LightningElement {
    columns = columns;
    accounts;
    loading = true;
    wiredResult;
    @track draftValues = [];
    @wire(getAccountRecords , {recordLimit : 10})
    retrievedContacts(result)
    {
        this.wiredResult = result;
        let {data, error} = this.wiredResult;
        if(data)
        {
            console.log("Retreived accounts");
            console.log(JSON.stringify(data));
            this.accounts = data;
            this.loading = false;
        }   
        if(error)
        {   
            console.log("Error retrieving contacts",error);
            this.loading = false;
        }
    }

    get hasAccounts()
    {
        return this.accounts && this.accounts.length > 0;
    }

    handleSave(event) {
        this.loading = true;
        const recordInputs = event.detail.draftValues.map(draft => {
            return { fields: { ...draft } };
        });
        console.log("the draft values are"+JSON.stringify(this.draftValues));
        const updatePromises = recordInputs.map(recordInput => updateRecord(recordInput));

        Promise.all(updatePromises)
            .then(result => {
                console.log('Records updated:', result);

                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Records updated successfully',
                        variant: 'success'
                    })
                );

                this.draftValues = [];
                refreshApex(this.wiredResult);
            })
            .catch(error => {
                console.error('Error updating records:', error);
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: error.body?.message || 'Something went wrong',
                        variant: 'error'
                    })
                );
            })
            .finally(() =>{
                this.loading = false;
            });
    }
}