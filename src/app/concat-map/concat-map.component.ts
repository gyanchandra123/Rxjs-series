import { Component, OnInit, ɵConsole } from '@angular/core';
import { from, of } from 'rxjs';
import { concatAll, concatMap, delay, map, mergeAll, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-concat-map',
  templateUrl: './concat-map.component.html',
  styleUrls: ['./concat-map.component.css']
})
export class ConcatMapComponent implements OnInit {

  constructor() { }


  ngOnInit(): void {
  }

  firstObservable = from(['tech', 'news', 'entertainment']);

  //creating function returning observable from the API's call: which used each of the 
  // each of the above data as an input for each Api call's.

  getDataFromAPI(eachFirstObservableData) {
    return of(`${eachFirstObservableData} videos `).pipe(delay(2000));
  }


  mapOPerator() {
    this.firstObservable.pipe(
      map(each => {
        console.log('EACH :::',each);
       return this.getDataFromAPI(each)}
        )
    ).subscribe(eachData => {
      console.log(eachData)
    })
  }

  mapConcatAll() {
    this.firstObservable
      .pipe(
        map(each => this.getDataFromAPI(each)),
        concatAll()
      ).subscribe(eachData => {
        console.log(eachData)
      })
  }

  concatMapp() {

    this.firstObservable
      .pipe(
        concatMap(each => this.getDataFromAPI(each))
      ).subscribe(eachData => {
        console.log(eachData)
      }) 
  }

  mergeMap() {

    this.firstObservable
      .pipe(
        mergeMap(each => this.getDataFromAPI(each))
      ).subscribe(eachData => {
        console.log(eachData)
      }) 
  }

}
