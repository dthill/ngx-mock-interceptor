import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  data = new BehaviorSubject('');
  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient
      .get('https://jsonplaceholder.typicode.com/posts/1')
      .subscribe((response) => {
        this.data.next(JSON.stringify(response, null, 2));
      });
  }
}
