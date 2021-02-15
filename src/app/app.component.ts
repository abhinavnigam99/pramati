import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  items: any;
  selected;
  startIndex = 0;
  endIndex = 3;
  showItems: any;
  reachedFirst = true;
  reachedLast = false;
  constructor(private http: HttpClient) {
    this.getItems();
  }

  getItems() {
    this.http.get('https://api.github.com/users').subscribe((response) => {
      console.log(response);
      this.items = response;
      this.selected = response[0];
      this.showItems = this.items.slice(this.startIndex, this.endIndex);
    });
  }

  selectedItem(item) {
    console.log(item);
    this.selected = item;
  }

  next() {
    if (this.startIndex < this.items.length - 2) {
      this.startIndex = this.endIndex;
      this.endIndex += 3;
      this.showItems = this.items.slice(this.startIndex, this.endIndex);
      if (this.endIndex == this.items.length) {
        this.reachedLast = true;
      }
      this.reachedFirst = false;
    } else {
      this.reachedLast = true;
    }
  }

  previous() {
    if (this.startIndex > 2) {
      this.endIndex = this.startIndex;
      this.startIndex -= 3;
      this.showItems = this.items.slice(this.startIndex, this.endIndex);
      if (this.startIndex == 0) {
        this.reachedFirst = true;
      }
      this.reachedLast = false;
    } else {
      this.reachedFirst = true;
    }
  }
}
