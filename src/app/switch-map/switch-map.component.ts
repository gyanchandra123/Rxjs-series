import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { from, of } from 'rxjs';
import { mergeMap, concatMap, delay, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-switch-map',
  templateUrl: './switch-map.component.html',
  styleUrls: ['./switch-map.component.css']
})
export class SwitchMapComponent implements OnInit {

  endPointsData = [
    {
      icon: 'icon1',
      socialMedia: 'facebook',
      name: 'GY1',
      image: 'img1',
      details: 'facebook notification message'
    },
    {
      icon: 'icon2',
      socialMedia: 'gmail',
      name: 'GY2',
      image: 'img2',
      details: 'gmail notification message'
    },
    {
      icon: 'icon3',
      socialMedia: 'tweeter',
      name: 'GY3',
      image: 'img3',
      details: 'tweeter notification message'
    },
    {
      icon: 'icon4',
      socialMedia: 'Hangout',
      name: 'GY4',
      image: 'img4',
      details: 'Hangout notification message'
    },
  ];

  @ViewChild('notifications', { static: true }) messageBox: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }



  /* merge map */
  showNotificationM() {
    
    const allData = from(this.endPointsData).pipe(
      mergeMap(eachData => this.getMessageDetails(eachData)
      ))
       .subscribe(eachFinalData => {
        console.log(eachFinalData);
        //display in the parent element:
        const parent = this.messageBox.nativeElement;

        const node = document.createElement('div');
        node.innerHTML = eachFinalData;

        parent.insertBefore(node, parent.childNodes[0]);
      })
  };


  /* concat map */
  showNotificationC() {
    const allData = from(this.endPointsData).pipe(
      concatMap(eachData => this.getMessageDetails(eachData)
      ))
      .subscribe(eachFinalData => {
        console.log(eachFinalData);
        //display in the parent element:
        const parent = this.messageBox.nativeElement;

        const node = document.createElement('div');
        node.innerHTML = eachFinalData;

        parent.insertBefore(node, parent.childNodes[0]);
      })
  };

  /* switch map */
  showNotificationS() {
    const allData = from(this.endPointsData).pipe(
      switchMap(eachData => this.getMessageDetails(eachData)
      ))
      .subscribe(eachFinalData => {
        console.log(eachFinalData);
        //display in the parent element:
        const parent = this.messageBox.nativeElement;

        const node = document.createElement('div');
        node.innerHTML = eachFinalData;

        parent.insertBefore(node, parent.childNodes[0]);
      })
  };

  // generating observable messageDetails for each message:
  getMessageDetails(messageData) {
    return of(`   
    <h6><span>${messageData.icon}</span>&nbsp;&nbsp; ${messageData.socialMedia}</h6>    
    <span>${messageData.name}</span><br>
    <span>${messageData.image}</span><br>
    <span>${messageData.details}</span><br>
    <hr style ="border:2px solid red">`).pipe(delay(2500));


  };

  //CLEARING THE PREVIOUS DATA INSIDE THE BOX:
  clearData(clearElement:any){

    clearElement.innerHTML = '';

  }

}
