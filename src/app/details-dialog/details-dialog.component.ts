import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Pacient } from '../model/Pacient';
import { CoreServiceService } from '../core-module/core-service.service';

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.css']
})
export class DetailsDialogComponent implements OnInit {
  data: any;
  action: string;


  constructor(
      public dialogRef: MatDialogRef<DetailsDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public pacient: Pacient, private _service: CoreServiceService ) {
        console.log('retrive to DetailsDialogComponent', this.pacient);
        this.data = {...pacient};
        this.action = this.data;
       
      }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
