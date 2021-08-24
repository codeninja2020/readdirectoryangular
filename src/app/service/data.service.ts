import { Injectable } from '@angular/core';

import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { File } from '../interface/file';
import { forkJoin } from 'rxjs';  // RxJS 6 syntax

import { HttpHeaders } from '@angular/common/http';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})

export class DataService {

 httpHeaders: HttpHeaders = new HttpHeaders({
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Methods':'GET,POST,OPTIONS,DELETE,PUT'
  });

  private directory:string= ""; 

  // http://localhost:4000/?directory=new 

  private data: string =  'http://localhost:4000/?directory='+this.directory;
  
  private newPathurl:string =  'http://localhost:4000/?directory='; 

  private placeholder:string = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) { 

  }

    getFiles():Observable<any>{
     // console.log("LOGGING:"+this.http.get<File[]>(this.data))
      return this.http.get<any>(this.data,{headers:this.httpHeaders})
      
    }

    getUsers():Observable<User[]>{

      return this.http.get<User[]>(this.placeholder);
      
    }
  
    newPath(path:any):Observable <any> {
     this.newPathurl =  this.newPathurl+this.directory+'/'+path;
     this.data =this.newPathurl; 
     console.log(this.data)
     this.newPathurl = 'http://localhost:4000/?directory='; 
     console.log(this.newPathurl)
     return this.http.get<any>(this.data,{headers:this.httpHeaders})
    }
 

    public requestDataFromMultipleSources(): Observable<any[]> {
      let response1 = this.http.get(this.placeholder,{headers:this.httpHeaders});
      let response2 = this.http.get(this.data ,{headers:this.httpHeaders});
      // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
      return forkJoin([response1, response2]);
    }


}
