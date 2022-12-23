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
    this.http.get('https://www.googleapis.com/books/v1/volumes?q=isbn:'+isbnF).pipe(map(data => {})).subscribe(result => {
      console.log(result);
    });
    this.bookInfo=this.http.get('https://www.googleapis.com/books/v1/volumes?q=isbn:'+isbnF)
    this.bookInfo
    .subscribe((data: any) => {
      
    })


  }


  ngOnInit() {    
   }

}
