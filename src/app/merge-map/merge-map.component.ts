import { Component, OnInit } from '@angular/core';
import { from, of } from 'rxjs';
import { map, mergeAll, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-merge-map',
  templateUrl: './merge-map.component.html',
  styleUrls: ['./merge-map.component.css']
})
export class MergeMapComponent implements OnInit {

  constructor() { }


  ngOnInit(): void {
  }


  //Assuming this :['firstObservable'] is the observable return value after the 1st API call.
  firstObservable = from(['tech', 'news', 'entertainment']);

  //creating function returning observable from the API's call: which used each of the 
  // each of the above data is used as an input for each of the next Api call's.

  getDataFromAPI(eachFirstObservableData) {
    return of(`${eachFirstObservableData} videos `);
  }


  mapOPerator() {
    this.firstObservable.pipe(

      map(firstObservableData => this.getDataFromAPI(firstObservableData))

    ).subscribe(eachData => {
      eachData.subscribe(finalData => {
        console.log(finalData)
      })
    })
  }

  mapMergeAll() {
    this.firstObservable
      .pipe(
        map(each => this.getDataFromAPI(each)),
        mergeAll()
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
