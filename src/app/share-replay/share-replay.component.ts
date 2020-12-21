import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, shareReplay, tap } from 'rxjs/operators';

@Component({
  selector: 'app-share-replay',
  templateUrl: './share-replay.component.html',
  styleUrls: ['./share-replay.component.css']
})
export class ShareReplayComponent implements OnInit {

  url = 'http://localhost:3000/employees';

  AllData: Observable<any>;
  activeEmployee: Observable<any>;
  inActiveEMployee: Observable<any>;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.AllData = this.http.get(this.url).pipe(
      shareReplay()
    );
  }

  //loading all the employee:
  loadingCompleteServerData() {
 /*    this.AllData = this.http.get(this.url).pipe(
      shareReplay()
    ); */
  }

  //loading active employee:
  loadingActiveServerData() {
    this.activeEmployee = this.AllData.pipe(

      map(allEmployee => {

        console.log('EMPLOYEE :', allEmployee)

        return allEmployee.filter(eachEmpData => {

          console.log('inter EMPLOYEE :', eachEmpData)

          return eachEmpData['isActive'] === true;
        })
      })

    );

   // console.log(this.activeEmployee)
  }

  //loading inactive Employee:
  loadingInActiveServerData() {
    this.inActiveEMployee = this.AllData.pipe(

      map(allEmployeeData => {
        return allEmployeeData.filter(eachEmploy => {
          return eachEmploy['isActive'] === false;
        })
      })

    )

  }


}
