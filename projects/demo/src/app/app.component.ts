import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  data = new BehaviorSubject('');
  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    combineLatest([]);
    this.httpClient
      .post(
        'https://jsonplaceholder.typicode.com/posts/1',
        { body: 'example body' },
        {
          params: new HttpParams({ fromString: 'param1=123' }),
        }
      )
      .subscribe((response) => {
        this.data.next(JSON.stringify(response, null, 2));
      });
  }
}
