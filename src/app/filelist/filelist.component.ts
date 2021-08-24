import { Component, OnInit, ViewChild } from '@angular/core';
import { File } from '../interface/file';
import { LazyLoadEvent } from 'primeng/api';

import { DataService } from '../service/data.service';
import { Table } from 'primeng/table';
@Component({
  selector: 'app-filelist',
  templateUrl: './filelist.component.html',
  styleUrls: ['./filelist.component.css']
})
export class FilelistComponent implements OnInit {

  public directoryfiles:any;
  public users :any; 
  public responseData1: JSON | undefined;//inv
  public responseData2: JSON | undefined;//sat 
  public Jsondata: any;
  public directoryusers: any;
  public products: any  = [];
  public first = 0;
  public rows = 20;
  public loading: boolean = false;
  public localUrl: any[] = [];
  public filename : any; 

 public  totalRecords:any; 

 @ViewChild('dt') dt: Table | undefined;

 
  constructor( private dataservice:DataService) { }

  ngOnInit(): void {

    this.dataservice.getUsers()
         .subscribe(data =>this.directoryusers = JSON.stringify(data))

        this.dataservice.getFiles()
        .subscribe((data:any)=> {
          data.forEach((element: { path: any; }) => {  
            
            this.products.push(element);

            this.totalRecords = data.length;
            //console.log(element.path);
        });

        });
  }

  openPath(album: any) {
      this.dataservice.newPath(album).subscribe((data:any)=>{
        this.products=[]; 
        data.forEach((element:{path:any})=>{
          this.products.push(element);
        })
      });
      console.log(album); 
  }


  next() {
    this.first = this.first + this.rows;
}

prev() {
    this.first = this.first - this.rows;
}

reset() {
    this.first = 0;
}

isLastPage(): boolean {
    return this.first === (this.products.length - this.rows);
}

isFirstPage(): boolean {
    return this.first === 0;
}



getEventValue($event:any) :string {
  return $event.target.value;
} 


onFileSelected(event: any){

    if (event.target.files && event.target.files[0]) {

       var str = event.target.files[0].webkitRelativePath; 
      var directory = str.substring(0, str.indexOf("/"));

      this.dataservice.newPath(directory).subscribe((data:any)=>{
        this.products=[]; 
        data.forEach((element:{path:any})=>{
          this.products.push(element);
        })
      });


        // var reader = new FileReader();
        // reader.onload = (event: any) => {
        //     this.localUrl = event.target.result;
        //     console.log("URL:"+this.localUrl)
        // }
        // reader.readAsDataURL(event.target.files[0]);
    }

}


loadCustomers(event: LazyLoadEvent) {  
  this.loading = true;

  let rows:any= event.rows;
  let first:any =event.first;

  var x=first+rows;

  //in a real application, make a remote request to load data using state metadata from event
  //event.first = First row offset
  //event.rows = Number of rows per page
  //event.sortField = Field name to sort with
  //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
  //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

  //imitate db connection over a network
  setTimeout(() => {
      if (this.products) {
          this.products = this.products.slice(first, x);
          this.loading = false;
      }
  }, 
  1000
  );
}



/*

applyFilterGlobal($event: any, stringVal: any) {
  this.dt!.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
  
}*/


}
