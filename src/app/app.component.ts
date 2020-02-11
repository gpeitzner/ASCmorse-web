import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

export interface Mode {
  content: string;
}

export interface Item {
  date: string;
  content: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ASCmorse';
  mode: Mode = { content: '' };
  apiUrl: string = 'http://192.168.0.110:3000/';
  sendedNormalItems: Item[];
  sendedPlayItems: Item[];
  recievedItems: Item[];
  currentNormal: Item;
  currentPlay: Item;
  sendForm;

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder) {
    this.sendForm = this.formBuilder.group({ text: '', type: true });
  }

  ngOnInit() {
    this.getArduinoMode();
    this.getSendedHistory();
    this.getRecievedHistory();
    this.getCurrentItems();
  }

  getArduinoMode(): void {
    this.httpClient.get<Mode>(this.apiUrl + 'mode')
      .subscribe(data => {
        this.mode = data;
      });
  }

  getSendedHistory(): void {
    this.httpClient.get<Item[]>(this.apiUrl + 'normal')
      .subscribe(data => {
        this.sendedNormalItems = data;
      });
    this.httpClient.get<Item[]>(this.apiUrl + 'play')
      .subscribe(data => {
        this.sendedPlayItems = data;
      });
  }

  getRecievedHistory() {
    this.httpClient.get<Item[]>(this.apiUrl + 'recieved')
      .subscribe(data => {
        this.recievedItems = data;
      });
  }

  getCurrentItems() {
    this.httpClient.get<Item>(this.apiUrl + 'currentnormal')
      .subscribe(data => {
        this.currentNormal = data;
      });
    this.httpClient.get<Item>(this.apiUrl + 'currentplay')
      .subscribe(data => {
        this.currentPlay = data;
      });
  }

  activeMessageMode(): void {
    this.mode.content = 'message';
    this.httpClient.post(this.apiUrl + 'mode', { content: 'message' }).subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    });
  }

  activeAsciiMorseMode(): void {
    this.mode.content = 'am';
    this.httpClient.post(this.apiUrl + 'mode', { content: 'am' }).subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    });
  }

  activeMorseAsciiMode(): void {
    this.mode.content = 'ma';
    this.httpClient.post(this.apiUrl + 'mode', { content: 'ma' }).subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    });
  }

  activePlayMode(): void {
    this.mode.content = 'play';
    this.httpClient.post(this.apiUrl + 'mode', { content: 'play' }).subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    });
  }

  onSubmit(sendData) {
    if (sendData.type) {
      this.httpClient.post(this.apiUrl + 'play', { date: moment().format('MMMM Do YYYY, h:mm:ss a'), content: sendData.text })
        .subscribe(res => {
          console.log(res);
        }, error => {
          console.log(error);
        });
    } else {
      this.httpClient.post(this.apiUrl + 'normal', { date: moment().format('MMMM Do YYYY, h:mm:ss a'), content: sendData.text })
        .subscribe(res => {
          console.log(res);
        }, error => {
          console.log(error);
        });
    }
    window.location.reload();
  }
}
