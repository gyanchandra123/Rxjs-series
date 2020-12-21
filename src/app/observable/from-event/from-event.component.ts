import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-from-event',
  templateUrl: './from-event.component.html',
  styleUrls: ['./from-event.component.css']
})
export class FromEventComponent implements OnInit, AfterViewInit {

  count: number = 1;
  constructor() { }
  a: Subscription;


  @ViewChild('cardBody', { static: true }) parentElem: ElementRef;
  @ViewChild('clickElem', { static: true }) cilckElement: ElementRef;

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.a = fromEvent(this.cilckElement.nativeElement, 'click').subscribe((event) => {
      this.count++;
      let even = event;
      this.printData(this.count);
      //(err) => console.log(err);

      if (this.count > 4) {
        console.log('event has been completed');
        this.a.unsubscribe();
      }

    },
      (err) => console.log(err),
      () => console.log('event has been completed'));

  }



  printData(count: number) {

    let eachElement = `  <li>count : ${count}</li>  `;
    this.parentElem.nativeElement.insertAdjacentHTML('beforeend', eachElement);

  }


  /* 
   count: number = 1;
   constructor() { }
 
   @ViewChild('cardBody', { static: true }) parentElem: ElementRef;
 
   ngOnInit(): void {
   }
 
   addData(event) {
     console.log(event);
     this.count++;
     this.printData(this.count);
 
   }
 
   printData(count: number) {
 
     let eachElement = `  <li>count : ${count}</li>  `;
     this.parentElem.nativeElement.insertAdjacentHTML('beforeend', eachElement);
 
   }
  */
}
