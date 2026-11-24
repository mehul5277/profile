import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { BookmarkCategory, BookmarkItem } from './../metadata/bookmark.model';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  private readonly http = inject(HttpClient);
  private readonly bookmarksJsonUrl = './assets/data/bookmark.json';
  private readonly storageKey = 'jixo_bookmarks_v1';

  getCategories(): Observable<BookmarkCategory[]> {
    const stored = this.readFromStorage();
    if (stored !== null) {
      return of(stored);
    }

    return this.http.get<BookmarkCategory[]>(this.bookmarksJsonUrl).pipe(
      tap((data) => {
        if (Array.isArray(data)) {
          this.writeToStorage(data);
        }
      })
    );
  }

  addBookmark(
    categories: BookmarkCategory[],
    categoryId: string,
    item: BookmarkItem
  ): BookmarkCategory[] {
    const cleanUrl = item.url.trim();
    if (!cleanUrl) {
      return categories;
    }

    const updated = categories.map((cat) => {
      if (cat.id !== categoryId) {
        return cat;
      }

      const exists = cat.items.some(
        (existing) => existing.url.trim().toLowerCase() === cleanUrl.toLowerCase()
      );
      if (exists) {
        return cat;
      }

      const newItem: BookmarkItem = {
        id: item.id ?? crypto.randomUUID?.() ?? Date.now(),
        title: item.title?.trim() || this.extractDomain(cleanUrl),
        url: cleanUrl,
        favicon: item.favicon?.trim() || undefined
      };

      return {
        ...cat,
        items: [...cat.items, newItem]
      };
    });

    this.writeToStorage(updated);
    return updated;
  }

  deleteBookmark(
    categories: BookmarkCategory[],
    urlToDelete: string,
    categoryId?: string
  ): BookmarkCategory[] {
    const targetUrl = urlToDelete.trim();

    const updated = categories.map((cat) => {
      if (categoryId && categoryId !== 'all' && cat.id !== categoryId) {
        return cat;
      }

      return {
        ...cat,
        items: cat.items.filter((item) => item.url !== targetUrl)
      };
    });

    this.writeToStorage(updated);
    return updated;
  }

  resetToJson(): Observable<BookmarkCategory[]> {
    this.clearStorage();
    return this.http.get<BookmarkCategory[]>(this.bookmarksJsonUrl).pipe(
      tap((data) => {
        if (Array.isArray(data)) {
          this.writeToStorage(data);
        }
      })
    );
  }

  private readFromStorage(): BookmarkCategory[] | null {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) {
        return null;
      }
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as BookmarkCategory[]) : null;
    } catch {
      return null;
    }
  }

  private writeToStorage(categories: BookmarkCategory[]): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(categories));
    } catch {
      // Ignore storage quota or private-mode errors
    }
  }

  private clearStorage(): void {
    try {
      localStorage.removeItem(this.storageKey);
    } catch {
      // Ignore storage errors
    }
  }

  private extractDomain(url: string): string {
    try {
      return new URL(url).hostname.replace(/^www\./, '');
    } catch {
      return url;
    }
  }
}