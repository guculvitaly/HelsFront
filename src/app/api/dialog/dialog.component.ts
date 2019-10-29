import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Pacient } from 'src/app/model/Pacient';
import { CoreServiceService } from 'src/app/core-module/core-service.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  data: any;
  action: string;

  editForm: FormGroup;

    constructor(
      public dialogRef: MatDialogRef<DialogComponent>,
      @Inject(MAT_DIALOG_DATA) public pacient: Pacient, private _service: CoreServiceService, private fb: FormBuilder) {
        console.log('retrive to diaolog', this.pacient);
        this.data = {...pacient};
        this.action = this.data;
        this.validateEditForm();
      }

 
  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  doAction() {
    this.dialogRef.close({event: this.action, data: this.data});
    console.log('doAction');
    
    this._service.update(this.data.id, this.data).subscribe(value =>{
      console.log('update model', value);
    });
    
  }

  cancelEdit(): void {
    this.dialogRef.close();
  }
  
  validateEditForm(){
    this.editForm = this.fb.group({
      lastName: new FormControl('', [Validators.required,
             Validators.minLength(4), Validators.maxLength(128) ]),
      firstName: new FormControl('', [Validators.required,
        Validators.minLength(4), Validators.maxLength(128) ]),
      gender: new FormControl(),
      birthday: new FormControl(),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')], ),
      middleName: new FormControl('', [Validators.required]),
    });
  }

}
