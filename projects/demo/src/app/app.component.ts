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
    combineLatest([
      this.httpClient.post(
        'https://jsonplaceholder.typicode.com/posts/1',
        { body: 'example body' },
        {
          params: new HttpParams({ fromString: 'param1=123' }),
        }
      ),
      this.httpClient.put('https://jsonplaceholder.typicode.com/posts/1', {
        body: 'example body',
      }),
      this.httpClient.patch(
        'https://jsonplaceholder.typicode.com/posts/1',
        { body: 'example body' },
        {
          params: new HttpParams({
            fromString: 'param1=123&param1=456&param2=abc',
          }),
        }
      ),
      this.httpClient.get('https://jsonplaceholder.typicode.com/posts/1'),
      this.httpClient.delete('https://jsonplaceholder.typicode.com/posts/1'),
      this.httpClient.head('https://jsonplaceholder.typicode.com/posts/1'),
      this.httpClient.options('https://jsonplaceholder.typicode.com/posts/1'),
    ]).subscribe((responses) => {
      this.data.next(JSON.stringify(responses, null, 2));
    });
  }
}
