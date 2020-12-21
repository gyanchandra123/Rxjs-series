import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { concatMap, debounceTime, distinctUntilChanged, filter, map, pluck, switchMap } from 'rxjs/operators';
import { DesignUtilityServiceService } from '../design-utility-service.service';
import { Search } from '../model/searchModel';

@Component({
  selector: 'app-switch-map-search-functionality',
  templateUrl: './switch-map-search-functionality.component.html',
  styleUrls: ['./switch-map-search-functionality.component.css']
})
export class SwitchMapSearchFunctionalityComponent implements OnInit, AfterViewInit {


  @ViewChild('SearchForm', { static: true }) searchForm: NgForm;

  searchResult: Search;
  resultCount: number;

  // WITH PROPER SWITCH MAP:
   ngAfterViewInit() {

    const form = this.searchForm.valueChanges.pipe(

      // this filter will stop automatic download of data from the end points:
      // filter  reason: only when the form is valid then only fetch the data: 
      filter(() => (this.searchForm.valid)),

      //pluck('searchInput'),
      map(each => {
        
        console.log('myInputTerm :', each);

        return each['searchInput']}),

      debounceTime(2000), distinctUntilChanged(),

      switchMap(data => {

        console.log('mySearchTerm :', data);
        
        return this._utilityService.getResults(data);
      })

    ).subscribe(eachResult => {

      console.log(eachResult);

      this.searchResult = eachResult;

      this.resultCount = Object.keys(this.searchResult).length;
    })

  }  



  // WITHOUT PROPER SWITCH MAP:
  /*  ngAfterViewInit() { 
 
     const form = this.searchForm.valueChanges.subscribe(eachResult => { 
 
       console.log("COMPLETE : ",eachResult); 
 
       this._utilityService.getResults(eachResult.searchInput).subscribe(data => {
         this.searchResult = data;
         console.log(data);      
  
         this.resultCount = Object.keys(this.searchResult).length;
       })
     })
 
   }  */

  constructor(private _utilityService: DesignUtilityServiceService) { }

  ngOnInit(): void {
  }

}
