import { Component, VERSION,OnInit, ViewChild } from '@angular/core';
import { Injectable } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Result } from '@zxing/library';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  ngVersion = VERSION.full;
  @ViewChild('scanner') scanner: ZXingScannerComponent;
  formatsEnabled: BarcodeFormat[];

  allowedFormats = [
    BarcodeFormat.CODE_39,
    BarcodeFormat.CODE_93,
    BarcodeFormat.CODE_128,
    BarcodeFormat.EAN_8,
    BarcodeFormat.EAN_13
  ];


  qrResultString: string;  
  isbn:string;
  ServerData: any;
  bookInfo:Observable<any>;
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

  // clearResult(): void {
  //   this.qrResultString = "";
  // }

  public onCodeResult(resultString: string) {
    console.log('Barcode data', resultString);

    if(resultString.length==10){
      this.isbn='978'+resultString;
    }
    else
      this.isbn=resultString;    
    this.qrResultString = resultString;
    this.getBookInfo(this.isbn)
  }
  
  public getBookInfo(isbnF:any) {        
    this.bookInfo=this.http.get('https://www.googleapis.com/books/v1/volumes?q=isbn:'+isbnF)
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


  ngOnInit() {    
   }

}
