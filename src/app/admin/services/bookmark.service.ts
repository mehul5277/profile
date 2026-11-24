import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookmarkCategory } from './../metadata/bookmark.model';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  private readonly http = inject(HttpClient);
  private readonly bookmarksJsonUrl = './assets/data/bookmark.json';

  getCategories(): Observable<BookmarkCategory[]> {
    return this.http.get<BookmarkCategory[]>(this.bookmarksJsonUrl);
  }
}