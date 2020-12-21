import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, ReplaySubject, AsyncSubject, Observable } from 'rxjs';
import { Search } from './model/searchModel';

@Injectable({
  providedIn: 'root'
})
export class DesignUtilityServiceService {

  subject = new Subject<boolean>();

  subject2 = new BehaviorSubject<string>('Gyannuu');

  subject3 = new ReplaySubject(3, 5000);

  subject4 = new AsyncSubject();
  
  constructor(private http: HttpClient) {

  }


  // endPoint url:

  url = 'http://my-json-server.typicode.com/Uxtrendz/apis/videoList';

  getResults(searchTerm: string): Observable<Search> {
    //return this.http.get<Search>(this.url + '?q=' + searchTerm);
    return this.http.get<Search>(`${this.url}?q=${searchTerm}`);
  }

}
