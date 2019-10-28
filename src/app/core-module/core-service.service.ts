import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiLinks } from '../api/apiLinks';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pacient } from '../model/Pacient';

@Injectable({
  providedIn: 'root'
})
export class CoreServiceService {

   url = 'https://localhost:44399/api/PacientControllercs';

  constructor(private _http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;' 
      ,'Accept':'*/*',
      'Access-Control-Allow-Origin': '*'
     
    })
  };


   getAllPacients() {

    return this._http.get<any>(ApiLinks.getAll);
  }

   create(data: any):  Observable<any>{
     data.birthday = new Date(Date.parse(data.birthday));
    data.active = true;

     return this._http.post<any>(ApiLinks.create, data, this.httpOptions).pipe(catchError (err => {
      throw new Error('error in create data. Details: ' + err);
    }));

  }

  search(text: string) {

    return this._http.get<any>(ApiLinks.search + '/' + text);
  }

  put(entity: any){
    return this._http.put
  }

  update(id: number, data: Pacient): Observable<any> {
    return this._http.put(ApiLinks.update + id, data, this.httpOptions).pipe(catchError (err => {
      throw new Error('error while Update data. Details: ' + err);
    }));
  }

  delete(id: number, data: Pacient) {
    data.active = false;
    return this._http.put(ApiLinks.delete + id, data, this.httpOptions).pipe(catchError (err => {
      throw new Error('error while Update data. Details: ' + err);
    }));
  }
}
