import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  bookInfo:Observable<any>;
  isbnF:string;
  bookName:string;
  bookAuthor:string;
  

  constructor( private http: HttpClient ) {}


  public Fetch() {          
    this.bookInfo=this.http.get('https://www.googleapis.com/books/v1/volumes?q=isbn:'+this.isbnF)
    this.bookInfo
    .subscribe((data: any) => {
      console.log(data)

    })
  }

}
