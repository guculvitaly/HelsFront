import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModuleComponent } from './core-module/core-module.component';
import { CoreServiceService } from './core-module/core-service.service';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule, MatDialog, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { DialogComponent } from './api/dialog/dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { DetailsDialogComponent } from './details-dialog/details-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CoreModuleComponent,
    DialogComponent,
    AddDialogComponent,
    DetailsDialogComponent
  ],
  entryComponents: [DialogComponent, AddDialogComponent, DetailsDialogComponent],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  providers: [CoreServiceService, MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
