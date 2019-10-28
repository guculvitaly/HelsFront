import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CoreServiceService } from '../core-module/core-service.service';
import { Pacient } from '../model/Pacient';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {
  data: any;
  action: string;
  lastName;
  formTempl: FormGroup

  constructor(
      public dialogRef: MatDialogRef<AddDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public pacient: Pacient, private _service: CoreServiceService, private fb: FormBuilder ) {
        console.log('retrive to AddDialogComponent', this.pacient);
        this.data = {...pacient};
        this.action = this.data;
        this.createForm();
      }

  ngOnInit() {
  
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addRow(data: any) {
    this.dialogRef.close({event: this.action, data: this.data});

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('Create Dialog result', result);
      console.log('Pass data', data);
    });

    this._service.create(this.data).subscribe(val => {
      
      console.log('this.data', this.data);
      console.log(val);
    });
    
  }

  createForm() {
    let MOBILE_PATTERN = /[0-9\+\-\ ]/;

    this.formTempl = this.fb.group({
      lastName: new FormControl('', [Validators.required,
             Validators.minLength(4), Validators.maxLength(128) ]),
      firstName: new FormControl('', [Validators.required,
        Validators.minLength(4), Validators.maxLength(128) ]),
      gender: new FormControl(),
      birthday: new FormControl(),
      phoneNumber: new FormControl('', [Validators.required]),
      middleName: new FormControl('', [Validators.required]),
    });
  }
  cancel(): void {
    this.dialogRef.close();
  }
  getErrorMessage() {
    return this.lastName.hasError('required') ? 'You must enter a value' :
        this.lastName.hasError('required') ? 'Not a valid email' :
            '';
  }
}
