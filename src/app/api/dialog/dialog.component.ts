import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Pacient } from 'src/app/model/Pacient';
import { CoreServiceService } from 'src/app/core-module/core-service.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  data: any;
  action: string;

    constructor(
      public dialogRef: MatDialogRef<DialogComponent>,
      @Inject(MAT_DIALOG_DATA) public pacient: Pacient, private _service: CoreServiceService) {
        console.log('retrive to diaolog', this.pacient);
        this.data = {...pacient};
        this.action = this.data;
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
  
}
