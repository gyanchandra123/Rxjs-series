import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { concatMap, exhaustMap } from 'rxjs/operators';


@Component({
  selector: 'app-exhaust-map',
  templateUrl: './exhaust-map.component.html',
  styleUrls: ['./exhaust-map.component.css']
})
export class ExhaustMapComponent implements OnInit {

  noOfRequestSend1: number = 0;
  noOfRequestSendC: number = 0;
  noOfRequestSendE: number = 0;
  url = 'https://global-1bb0f.firebaseio.com/exhaustMap.json';


  requestRecieved: number;
  clickDataFromServerC: number;
  clickDataFromServerE: number;
  concatClick: boolean;
  exhaustClick: boolean;
  clickDataFromServer: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }



  /*  working with the normal button click */
  btnClick() {
    this.saveData(this.noOfRequestSend1++).subscribe(countRequest => {
      console.log(countRequest);
    })
  };


  @ViewChild('concatBtn', { static: true }) concatButton: ElementRef;

  @ViewChild('exhaustBtn', { static: true }) exhaustButton: ElementRef;

  ngAfterViewInit() {

    /* working with the concat button click */
    fromEvent(this.concatButton.nativeElement, 'click')
      .pipe(
        concatMap(() => this.saveData(this.noOfRequestSendC++)))
      .subscribe(() => {
        this.concatClick = true;
        this.fetchClickResult();

      });


    /* working with the exhaust button click */
    fromEvent(this.exhaustButton.nativeElement, 'click')
      .pipe(
        exhaustMap((data) => {
          console.log('CLICK EVENT :', data);
          return this.saveData(this.noOfRequestSendC++)
        }))
      .subscribe(() => {
        this.exhaustClick = true;
        this.fetchClickResult();

      });
  };



  //common method , making call to the endpoint:
  saveData(requestSent: number) {
    return this.http.put(this.url, { data: requestSent });
  }

  //Common method : fetching data from the server after clicking the save button :
  fetchClickResult() {
    this.http.get<any>(this.url).subscribe(clickData => {

      //data for concatClick:
      if (this.concatClick) {
        this.clickDataFromServerC = clickData.data;
        console.log(this.clickDataFromServerC)
      };

      //data for exhaustMapClick:
      if (this.exhaustClick) {
        this.clickDataFromServerE = clickData.data;
        console.log(this.clickDataFromServerE)
      };


    })
  }

  //clearing previous result data:
  clearRequestValue() {
    this.clickDataFromServerC = 0;
    this.clickDataFromServerE = 0;
  }

}
