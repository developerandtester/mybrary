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
  items: any;
  itemsArr:any;
  volumeInfoArr:any;
  volumeInfo:any;
  bookName:string;
  bookAuthor:any;
  bookLink:string;
  category:string;
  bookDescription:any;
  pageCount:any;
  previewLink:any;
  constructor( private http: HttpClient ) {}


  public Fetch() {          
    this.bookInfo=this.http.get('https://www.googleapis.com/books/v1/volumes?q=isbn:'+this.isbnF)
    this.bookInfo
    .subscribe((data: any) => {
      console.log("1" + data["items"]);
      this.items=JSON.stringify(data["items"]);
      this.itemsArr=JSON.parse(this.items);
      this.bookName=JSON.stringify(this.itemsArr[0]["volumeInfo"]["title"]);
      this.bookAuthor=JSON.stringify(this.itemsArr[0]["volumeInfo"]["authors"]);
      this.bookDescription=JSON.stringify(this.itemsArr[0]["volumeInfo"]["description"]);
      this.pageCount=JSON.stringify(this.itemsArr[0]["volumeInfo"]["pageCount"]);
      this.previewLink=JSON.stringify(this.itemsArr[0]["volumeInfo"]["previewLink"]);
      

    })
  }

}
