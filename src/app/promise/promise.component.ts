import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { rejects } from 'assert';
import { Resolve } from '@angular/router';
import { Subscription, interval, timer, of, from, pipe, Observable } from 'rxjs';
import { toArray, take, map, filter, pluck, tap, takeLast, takeUntil, skip, retry, retryWhen, delay, scan } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-promise',
  templateUrl: './promise.component.html',
  styleUrls: ['./promise.component.css']
})
export class PromiseComponent implements OnInit, OnDestroy {
  subscription2: Subscription;

  purchaseLaptop;
  result;
  buyingLaptop;
  subscription: Subscription;
  customObservable;
  observableCompletionCheck = '';
  endPointData;
  fetching: boolean = false;

  @ViewChild('parent', { static: true }) parentElem: ElementRef;

  hpDetail = {
    name: 'pavilion',
    brand: 'hp',
    memory: '1TB'
  }


  dellDetail = {
    name: 'dell',
    brand: 'dell',
    memory: '2TB'
  };

  purchasedFail = {
    data: 'no purchased',
    status: 'fail'
  }
  intervalArrayData: any;
  nameStatus: string;
  subscription3: Subscription;
  modifiedByTap: number;



  buyHpLaptop() {
    return true;
  }

  buyDellLaptop() {
    return false;
  }


  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.endPointData = {
      email: " ",
      gender: " ",
      id: '',
      name: " ",
      phone: " ",
      skill: " "
    }

  };

  //interval approach
  collectinData() {
    this.buyingLaptop = this.creatingPromise();

    this.buyingLaptop.then(resultData => {
    }).catch(resultData => {
    });



    /* ---------------------------interval------------------------------------ */



    const inter = interval(300);

    this.subscription = inter.subscribe(res => {
      this.printDataInterval(res);
      if (res >= 5) {
        this.subscription.unsubscribe();
      };
    });
  }

  //printing the elements using interval n timer

  printDataInterval(count: number) {
    let eachElement = `<div style ='background-color: blue;border:1px solid red'>link ${count++}</div> `;
    this.parentElem.nativeElement.insertAdjacentHTML('beforeend', eachElement);
  };

  // of approach: for simple row of object value:
  OfObservableData() {

    const ofStream = of({ a: 'firstData', b: 'secondData', c: 'thirdData' }, { a: 'firstData', b: 'secondData', c: 'thirdData' });

    console.log(ofStream);

    let i = 0;
    ofStream.subscribe(each => {
      this.printDataOf(each, i++);
    })
  };

  //printing the elements using of

  printDataOf(data: any, i: number) {

    let completeElements = `<div style ='background-color: blue;border:1px solid red'>Of Stream ${data.a} : ${i++}</div> 
                       <div style ='background-color: blue;border:1px solid red'>Of Stream ${data.b} : ${i++}</div>
                      <div style ='background-color: blue;border:1px solid red'>Of Stream ${data.c} : ${i++}</div>`;
    this.parentElem.nativeElement.insertAdjacentHTML('beforeend', completeElements);

  };



  // from approach:  array to observable
  fromObservableArrayData() {

    const fromStream = from(['firstData', 'secondData', 'thirdData']);

    console.log(fromStream);

    let i = 0;
    fromStream.subscribe(each => {
      console.log(each)
      this.printDataFromArray(each, i++);
    })
  };

  // from approach:  promise to observable
  fromObservablePromiseData() {

    //creating promise
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve('DATA FROM PROMISE ');
      }, 2000);

    });

    //converting prommise to observable:
    const fromStream = from(promise);

    console.log(fromStream);

    let i = 0;
    fromStream.subscribe(each => {
      console.log(each)
      this.printDataFromPromise(each, i++);
    })
  };

  // from approach:  string to observable
  fromObservableStringData() {

    let stringValue = "string data";

    //converting string to observable:
    const fromStream = from(stringValue);

    console.log(fromStream);

    let i = 0;
    fromStream.subscribe(each => {
      console.log(each)
      this.printDataFromString(each, i++);
    })
  };


  // using pipeable operator to convert stream of observable data to observable array.
  ofObservableStringDataToArrayObservable() {

    //converting string to observable:
    //const fromStream = of('firstData', 'secondData', 'thirdData');

    const hpDetails = [
      {
        a: 'hp',
        b: 'popular',
        c: 'manufacturing'
      },
      {
        1: 'hp',
        2: 'popular',
        3: 'manufacturing'
      }];


    const fromStream = from(hpDetails);

    fromStream.pipe(toArray()).subscribe(completeData => {
      console.log(completeData)
    });
  };


  //CREATING CUSTOM OBSERVABLE:
  //example :1
  emitCustomStringObservable() {

    this.customObservable = Observable.create((observer) => {

      setTimeout(() => {
        observer.next('custom observable data 1111');
        // observer.error(new Error('this is custom observable error'));
        // observer.complete();
      }, 1000);

      setTimeout(() => {
        observer.next('custom observable data 2222');
        // observer.error(new Error('this is custom observable error'));
        observer.complete();
      }, 2000);

      // 

    });

    this.customObservable.subscribe(data => {
      console.log(data);
    },
      (error) => console.log(error),
      () => {
        this.observableCompletionCheck = 'custom observable data emission has completed'

      }
    )
  };

  //example 2:
  emitCustomIntervalObservable() {

    this.customObservable = Observable.create(observer => {

      let count = 1;

      setInterval(() => {
        observer.next(`custom interval emitted data :${count}`);
        count++;
        // if (count > 5) observer.complete();
      }, 1000);


    });

    this.subscription2 = this.customObservable.subscribe(data => {
      console.log(data);
    },
      (err) => { },

    );

    setTimeout(() => {
      this.subscription2.unsubscribe();
    }, 10000)

  };

  //example 3:
  /*  emitCustomIntervalObservableOfArrayData() {
     this.customObservable = Observable.create(observer => {
 
       //array data to be emitted :
       const arrayValues = ['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH'] ;
 
       let count = 0;
 
       setInterval(() => {
         observer.next(` ${arrayValues[count]}`);
         count++;
         if (count >=5) observer.complete();
       }, 1000);
 
 
     });
 
     this.subscription2 = this.customObservable.subscribe(data => {
       
       this.intervalArrayData = data;
     },
 
       (err) => { },
 
       () => {
         this.nameStatus = 'completed';        
       }
     )
   } */

  emitCustomIntervalObservableOfArrayData() {

    let stringValue = "string data";

    //converting string to observable:
    const fromStream = from(stringValue);

    console.log(fromStream);

    let i = 0;
    fromStream.pipe(toArray()).subscribe(each => {
      console.log(each)
      this.printDataFromString(each, i++);
    })




  }
  ngOnDestroy() {
    // this.subscription2.unsubscribe();
  }


  //USING MAP FOR THE TRANSFORMATION OF DATA : interval data.
  mapTransform1() {

    const customObservable = interval(1000);

    this.subscription = customObservable.pipe(map(eachData => eachData * 10)).subscribe(result => {
      console.log(result);
    });

    setTimeout(() => {
      this.subscription.unsubscribe();
    }, 5000);

  }

  //USING MAP FOR THE TRANSFORMATION OF DATA : object data.
  mapTransform2() {

    const data = [
      { id: 1, name: 'A' },
      { id: 2, name: 'B' },
      { id: 3, name: 'c' },
      { id: 4, name: 'd' },
      { id: 5, name: 'E' }
    ];

    const customObservable = from(data);
    console.log(customObservable);

    this.subscription = customObservable.pipe(
      map(data => {

        return data.name + ' :selected';
      }
      )).subscribe(result => {
        console.log(result);
      });

    setTimeout(() => {
      this.subscription.unsubscribe();
    }, 5000);

  };

  //using PLUCK OPERATOR TO TRANSFORM DATA:
  pluckData: any[];

  transformDataWithPluck() {

    const data = [
      {
        id: 1, name: 'A', job: {
          firstName: 'UI Developer',
          companyType: 'gyanchand'
        }
      },

      {
        id: 2, name: 'B',
        job: {
          firstName: 'angular Developer',
          companyType: 'gyanchand'
        }
      },

      {
        id: 3, name: 'c',
        job: {
          firstName: 'js Developer',
          companyType: 'gyanchand'
        }
      },

      {
        id: 4, name: 'd',
        job: {
          firstName: 'FrontEnd Developer',
          companyType: 'gyanchand'
        }
      },

      {
        id: 5, name: 'E',
        job: {
          firstName: 'HTML Developer',
          companyType: 'gyanchand'
        }
      }
    ];

    from(data).pipe(

      //map(eachData => eachData.name),
      pluck('job', 'firstName'),
      toArray())

      .subscribe(result => {
        this.pluckData = result;
        console.log(this.pluckData);
      })
  };


  filterObservableDataBylength() {

    const data = [
      {
        id: 1, name: 'A',
        job: {
          firstName: 'UI Developer',
          companyType: 'gyanchand'
        }
      },

      {
        id: 2, name: 'B',
        job: {
          firstName: 'angular Developer',
          companyType: 'gyanchand'
        }
      },

      {
        id: 3, name: 'c',
        job: {
          firstName: 'js Developer',
          companyType: 'gyanchand'
        }
      },

      {
        id: 4, name: 'd',
        job: {
          firstName: 'FrontEnd Developer',
          companyType: 'gyanchand'
        }
      },

      {
        id: 5, name: 'E',
        job: {
          firstName: 'HTML Developer',
          companyType: 'gyanchand'
        }
      }
    ];


    const obserData = from(data);

    obserData.pipe(
      filter(eachObj => eachObj.id > 3),
      map(eachObjec => eachObjec.name + ': goodMorning'),
      toArray())
      .subscribe(eachData => {
        console.log(eachData);
      })

  }


  //TAP OPERATOR :
  /*  tapOperatorOnArray() {
 
     const arrayName = ['AA', "BB", 'gg', 'sss', 'HH'];
 
     let myInterval = interval(1000);
 
     this.subscription3 = myInterval.pipe(
       tap(res => {
 
         console.log('REs before :=>', res); //dislaying data
 
         if (res === arrayName.length) {
           this.subscription3.unsubscribe();
         };
 
         toArray(),
         this.modifiedByTap =res;
        }),
       map(res =>
         arrayName[res]),
 
       tap(res => { console.log('RES AFTER :=>', res) }))
 
       .subscribe(res => {
         console.log(res);
       });
 
   } */


  tapOperatorOnArray() {

    const givenArray = ["Annu", "Raj", "rakesh", "Anil", "Akash"];

    const eachInterval = interval(1000);

    let subscription: Subscription;

    subscription = eachInterval.pipe(

      tap(eachIntervaValue => {
        if (eachIntervaValue >= 5) {
          subscription.unsubscribe();
        }
      }),

      map(eachValue => givenArray[eachValue])
    )

      .subscribe(eachMapValue => {
        console.log(eachMapValue);
      });

  }


  //TAKE() OPERATOR:1
  takeOperatorOnArray() {

    const array1 = ["“A”", "“B”", "“C”", "“D”", "“E”", "“F”"];

    const timeInterval = interval(1000);

    timeInterval.pipe(
      map(eachIntervalValue => array1[eachIntervalValue]),
      take(5)
    )
      .subscribe(eachValue => {
        console.dir(eachValue)
      })

  }

  //TAKELAST()
  takeLastOperatorOnArray() {
    const array2 = ["“A”", "“B”", "“C”", "“D”", "“E”", "“F”"];

    const timeInterval = from(array2);

    timeInterval.pipe(
      takeLast(5)
    )
      .subscribe(eachValue => {
        console.dir(eachValue)
      })
  }

  //TAKEUNTIL()
  takeUntilOperatorOnArray() {

    const array1 = ["“A”", "“B”", "“C”", "“D”", "“E”", "“F”"];

    const timeInterval = interval(1000);
    const restrictionTime = timer(4000);
    timeInterval.pipe(
      map(eachIntervalValue => array1[eachIntervalValue]),
      takeUntil(restrictionTime)
    )
      .subscribe(eachValue => {
        console.dir(eachValue)
      })
  }

  //Skip operator:
  skipOperatorOnArray() {

    const array1 = ["“A”", "“B”", "“C”", "“D”", "“E”", "“F”"];

    const eachInterval = interval(1000);

    let subscription: Subscription;

    subscription = eachInterval.pipe(

      tap(eachCount => {
        if (eachCount >= 6) {
          subscription.unsubscribe();
        }
      }),

      map(eachIntervalValue => array1[eachIntervalValue]),

      skip(3)
    )

      .subscribe(eachValue => {
        console.log(eachValue);
      })

  }


  //retry operator :
  retryOperator() {
    this.fetchDetails();
  }

  status = 'no Data';

  statusStyle = {
    'fetched': false,
    'fetchingError': false
  }

  fetchDetails() {
    this.fetching = true;
    this.httpClient.get('https://global-1bb0f.firebaseio.com/user.jsons')
      .pipe(retry(4))
      .subscribe(
        (data) => {
          this.fetching = false;
          this.endPointData = data;
          console.log('RIGHT :', data);
          this.status = 'data fetched';
          this.statusStyle.fetched = true;

        },

        (err) => {
          console.log('wrong', err)
          this.fetching = false;
          this.status = 'problem fetching data'
          this.statusStyle.fetchingError = true;

        })
  }


  //retryWhen operator:  
  retryWhenOperator() { 
    this.fetchDetails2();
  };

  status = 'no Data';

  statusStyle = {
    'fetched': false,
    'fetchingError': false
  }

  fetchDetails2() {
    this.fetching = true;
    this.httpClient.get('https://global-1bb0f.111firebaseio.com/user.json')
      .pipe(retryWhen(error => error.pipe(
        delay(2000),
        scan((retryCount) => {

          if (retryCount >= 5) {
            throw error;
          }
          else {
            retryCount = retryCount + 1;
            this.status = `retrying attempt : ##${retryCount}`
            console.log('retryCiunt : ', retryCount);
            return retryCount;
          }
        }, 0))))
      .subscribe(
        (data) => {
          this.fetching = false;
          this.endPointData = data;
          console.log('right', data);
          this.status = 'data fetched';
          this.statusStyle.fetched = true;

        },

        (err) => {
          console.log('wrong', err)
          this.fetching = false;
          this.status = 'problem fetching data';
          this.statusStyle.fetchingError = true;

        })
  }







  //UI PART :-
  creatingPromise(): Promise<any> {
    return new Promise((resolve, reject) => {

      if (this.buyHpLaptop()) {
        return setTimeout(() => {
          resolve(this.hpDetail);
        }, 3000);



      } else if (this.buyDellLaptop()) {
        return setTimeout(() => {
          resolve(this.dellDetail);
        }, 3000);

      }
      else {
        return setTimeout(() => {
          reject(this.purchasedFail)
        })
      }
    })

  }








  //printing the elements using from :aray

  printDataFromArray(data: any, i: number) {

    let completeElements = `<div style ='background-color: blue;border:1px solid red'>From Stream 
    ${data} : ${i++}</div> `;

    this.parentElem.nativeElement.insertAdjacentHTML('beforeend', completeElements);

  }


  //printing the elements using from :promise

  printDataFromPromise(data: any, i: number) {

    let completeElements = `<div style ='background-color: blue;border:1px solid red'>Promise Stream 
    ${data} : ${i++}</div> `;

    this.parentElem.nativeElement.insertAdjacentHTML('beforeend', completeElements);

  }

  //printing the elements using from :promise

  printDataFromString(data: any, i: number) {  

    let completeElements = `<div style ='background-color: blue;border:1px solid red'>String Stream 
    ${data}  : ${i++}</div> `;

    this.parentElem.nativeElement.insertAdjacentHTML('beforeend', completeElements);

  }
}

