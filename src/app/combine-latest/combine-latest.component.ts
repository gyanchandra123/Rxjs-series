import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { forkJoin, fromEvent, zip } from 'rxjs';
import { timer, combineLatest } from 'rxjs';
import { map, take, withLatestFrom } from 'rxjs/operators';


@Component({
  selector: 'app-combine-latest',
  templateUrl: './combine-latest.component.html',
  styleUrls: ['./combine-latest.component.css']
})
export class CombineLatestComponent implements OnInit {


  @ViewChild('names', { static: true }) names: ElementRef;
  @ViewChild('color', { static: true }) color: ElementRef;
  namesObservable: any;
  colorObservable: any;
  combineLatestObservable: any[];
  withLatestObservable: any[];


  constructor() { }

  ngOnInit(): void {
  }


  ngAfterViewInit() {

    //selecting names:
    this.namesObservable = fromEvent<any>(this.names.nativeElement, 'change').pipe(
      map((selectEvent) => {
        return selectEvent.target.value;
      }),
     take(3)
    )

    //selecting color:
    this.colorObservable = fromEvent<any>(this.color.nativeElement, 'change').pipe(
      map((selectEvent) => {
        return selectEvent.target.value;
      }),
     take(4)
    )


    //combining both the observables:
    /*  combineLatest(this.namesObservable, this.colorObservable).subscribe(([name, color]) => {
       console.log('combineObservable :', name, color);
       this.combineLatestObservable = [name, color]
     }); */

    /*  zip(this.namesObservable, this.colorObservable).subscribe(([name, color]) => {
       console.log('combineObservable :', name, color);
       this.combineLatestObservable = [name, color]
     }); */

    forkJoin(this.namesObservable, this.colorObservable).subscribe(([name, color]) => {
      console.log('combineObservable :', name, color);
      this.combineLatestObservable = [name, color]
    });

   /*  this.namesObservable.pipe(withLatestFrom(this.colorObservable)).subscribe(([name, color]) => {

      console.log('withLatestObservable :', [name, color]);
      this.withLatestObservable = [name, color]
    }) */
  }



}
