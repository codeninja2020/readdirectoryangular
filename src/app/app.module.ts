import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import { FilelistComponent } from './filelist/filelist.component'
import { RouterModule } from '@angular/router';
import {ButtonModule} from 'primeng/button';

import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';

import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';

import {FileUploadModule} from 'primeng/fileupload';


@NgModule({
  declarations: [
    AppComponent,
    FilelistComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,InputTextModule,FileUploadModule,
    TableModule,ButtonModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    RouterModule.forRoot([
      { path: '', component: FilelistComponent },

 ],{useHash: true}),
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
