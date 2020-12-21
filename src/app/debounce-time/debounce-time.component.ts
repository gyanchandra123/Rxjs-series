import { AfterViewInit, asNativeElements, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-debounce-time',
  templateUrl: './debounce-time.component.html',
  styleUrls: ['./debounce-time.component.css']
})
export class DebounceTimeComponent implements AfterViewInit {

  constructor(private loadingBar: LoadingBarService) { }
  /* 1st appraoch using ngmodel directive : */
  nameProperty;

  set name1(val: string) {
    this.nameProperty = val;
  }

  get name1(): string {
    return this.nameProperty;
  }

  
  /* 3rd approach using DistinctUntilChanged operator :: */
  @ViewChild('inputTempRef2', { static: true }) myInput2: ElementRef;
  requiredData2: any = null;
  loader2 = this.loadingBar.useRef();


  /* 2nd approach using debounceTime operator :: */
  @ViewChild('inputTempRef', { static: true }) myInput: ElementRef;
  requiredData: any = null;
  loader = this.loadingBar.useRef();


  ngAfterViewInit(): void {
    const searchTerm = fromEvent<any>(this.myInput.nativeElement, 'keyup');

    searchTerm.pipe(
      map(event => event.target.value),
      debounceTime(1000)
    )

      .subscribe(even => {
        this.requiredData = even;
        this.loader.start();

        setTimeout(() => {
          this.requiredData = null;
          this.loader.stop();
        }, 2000)
      })

    /* 3rd approach using DistinctUntilChanged operator :: */

    const searchTerm2 = fromEvent<any>(this.myInput2.nativeElement, 'keyup');

    searchTerm2
      .pipe(
        map(event => event.target.value),
        debounceTime(1000),
        distinctUntilChanged()
      )

      .subscribe(even => {
        this.requiredData2 = even;
        this.loader2.start();

        setTimeout(() => {
          this.requiredData2 = null;
          this.loader2.stop();
        }, 2000)
      })

  }





}
