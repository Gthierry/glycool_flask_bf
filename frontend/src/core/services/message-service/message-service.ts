import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  httpClient = inject(HttpClient);
  apiUrl = 'http://127.0.0.1/message';
}
