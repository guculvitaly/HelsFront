import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CoreServiceService } from './core-service.service';
import { Pacient } from '../model/Pacient';
import { MatDialog, MatTable } from '@angular/material';
import { DialogComponent } from '../api/dialog/dialog.component';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DetailsDialogComponent } from '../details-dialog/details-dialog.component';

@Component({
  selector: 'app-core-module',
  templateUrl: './core-module.component.html',
  styleUrls: ['./core-module.component.css']
})
export class CoreModuleComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<any>;

  @ViewChild(AddDialogComponent) child;

  formInput: FormGroup;
  defaultText = '';
  constructor(private _service: CoreServiceService,
              private dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef, private fb: FormBuilder) {

                this.inputFormSearch();
               }


  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'middleName', 'birthday', 'gender', 'phoneNumber', 'deleteAction'];

  dataSource: any = [];

  ngOnInit() {
    this.initAllPacients();
    this.changeDetectorRefs.detectChanges();
  }


  initAllPacients() {

    console.log(this._service.getAllPacients());
    return this._service.getAllPacients().subscribe(data => {
     console.log(data);

     this.dataSource = data;
   });

  }

  Search(text: string) {
console.log('search text', text);
    return this._service.search(text).subscribe(data => {
      this.dataSource = data;
    });
  }

  detailsDialog(element: any): void{
    const dialogRef = this.dialog.open(DetailsDialogComponent, {
      width: '50vw',
      maxWidth: '100vw',
      data: element
    });
    dialogRef.afterClosed().subscribe(res => {
      
    });
  }

  EditDialog(action, element: any): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '50vw',
      maxWidth: '100vw',
      data: element
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log('res updated', res);
      console.log('this data source', this.dataSource);
      if (res !== undefined) {
        this.dataSource.forEach(item => {
          if (item.id === res.data.id) {

           for (const i in item) {
             item[i] = res.data[i];
           }

          }
        });
      }


     });
    console.log('click item', action);
}


createRowDialog(element: any) {
  const dialogRef = this.dialog.open(AddDialogComponent, {
    width: '100vw',
        maxWidth: '70vw',
    data: element
  });

  dialogRef.afterClosed().subscribe(res => {
    console.log('after closed', res);
    if ( res !== undefined) {
      
      this.dataSource.push(res.data);
      this.table.renderRows();

    }

  });
}

addRowData(action, obj) {
  obj.action = action;

  const dialogRef = this.dialog.open(DialogComponent, {
    width: '320px',
    data: {name: action}
   // data: action
  });
  console.log('action', action);
}

deleteRowData(row_obj) {
  this.dataSource = this.dataSource.filter((value, key) => {
    return value.id != row_obj.id;
  });
  this._service.delete(row_obj.id, row_obj).subscribe(data =>{

  });
}

// listener for search input
onChangeInput(text: any) {
  this.defaultText = text;
  console.log('listener', text);
  if (text.length > 3 ) {
    this._service.search(text).subscribe(data => {
        this.dataSource = data;
        
        });
  // tslint:disable-next-line: align
  } if ( text.length < 1 ) {
    this.initAllPacients();
  } 

}

inputFormSearch() {
  this.formInput = this.fb.group({
    searchForm: new FormControl('', [Validators.maxLength(256), Validators.minLength(3)])
  });
}

openDetails(element: any): void {
  console.log('open element', element);
}
}
