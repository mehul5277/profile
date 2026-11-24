import { HttpClient } from '@angular/common/http';
import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
export interface BookmarkItem {
  id?: string | number;
  title?: string;
  url: string;
  favicon?: string;
}

export interface BookmarkCategory {
  id: string;
  name: string;
  items: BookmarkItem[];
}

export interface BookmarkDisplayItem extends BookmarkItem {
  categoryName: string;
  domain: string;
  faviconSrc: string;
}

@Component({
  selector: 'app-bookmark',
  standalone: true,
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss']
})
export class BookmarkComponent implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);

  private readonly rawCategories = signal<BookmarkCategory[]>([]);
  private readonly bookmarksJsonUrl = './assets/data/bookmark.json';

  readonly isLoading = signal<boolean>(true);
  readonly errorMessage = signal<string | null>(null);
  readonly selectedCategory = signal<string>('all');
  readonly searchTerm = signal<string>('');

  readonly categories = computed<BookmarkCategory[]>(() => {
    const safeCategories = Array.isArray(this.rawCategories()) ? this.rawCategories() : [];

    return safeCategories.map((cat, index) => {
      const cleanedName = this.cleanTitle(cat?.name || `Category ${index + 1}`);
      const id = cat?.id || this.slugify(cleanedName) || `cat-${index}`;
      const seenUrls = new Set<string>();
      const uniqueItems: BookmarkItem[] = [];

      for (const item of cat?.items ?? []) {
        const normalizedUrl = this.normalizeUrl(item?.url);
        if (!normalizedUrl || seenUrls.has(normalizedUrl)) {
          continue;
        }
        seenUrls.add(normalizedUrl);
        uniqueItems.push({
          ...item,
          url: normalizedUrl,
          title: item?.title?.trim() || this.getDomain(normalizedUrl)
        });
      }

      return {
        id,
        name: cleanedName,
        items: uniqueItems
      };
    });
  });

  readonly totalBookmarkCount = computed<number>(() =>
    this.categories().reduce((sum, cat) => sum + (cat.items?.length ?? 0), 0)
  );

  readonly activeCategoryLabel = computed<string>(() => {
    const selected = this.selectedCategory();
    if (selected === 'all') {
      return 'All Bookmarks';
    }
    const match = this.categories().find((c) => c.id === selected);
    return match ? match.name : 'Bookmarks';
  });

  readonly visibleItems = computed<BookmarkDisplayItem[]>(() => {
    const selected = this.selectedCategory();
    const query = this.searchTerm().trim().toLowerCase();

    const pool: BookmarkDisplayItem[] =
      selected === 'all'
        ? this.categories().flatMap((cat) =>
            (cat.items ?? []).map((item) => this.toDisplayItem(item, cat.name))
          )
        : (this.categories().find((c) => c.id === selected)?.items ?? []).map((item) =>
            this.toDisplayItem(item, this.activeCategoryLabel())
          );

    if (!query) {
      return pool;
    }

    return pool.filter(
      (item) =>
        item.domain.toLowerCase().includes(query) ||
        (item.title ?? '').toLowerCase().includes(query) ||
        item.url.toLowerCase().includes(query) ||
        item.categoryName.toLowerCase().includes(query)
    );
  });

  ngOnInit(): void {
    this.loadBookmarks();
  }

  loadBookmarks(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.http
      .get<BookmarkCategory[]>(this.bookmarksJsonUrl)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.rawCategories.set(Array.isArray(data) ? data : []);
          this.isLoading.set(false);
        },
        error: () => {
          this.rawCategories.set([]);
          this.errorMessage.set('Unable to load bookmarks JSON file.');
          this.isLoading.set(false);
        }
      });
  }

  setCategories(data: BookmarkCategory[]): void {
    this.rawCategories.set(data);
  }

  selectCategory(categoryId: string): void {
    this.selectedCategory.set(categoryId);
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    this.searchTerm.set(input?.value ?? '');
  }

  clearSearch(): void {
    this.searchTerm.set('');
  }

  private toDisplayItem(item: BookmarkItem, categoryName: string): BookmarkDisplayItem {
    const domain = this.getDomain(item.url);
    return {
      ...item,
      categoryName,
      domain,
      faviconSrc: item.favicon || this.buildFaviconUrl(domain)
    };
  }

  private cleanTitle(title: string = ''): string {
    return title.replace(/^\*+\s*|\s*\*+$/g, '').trim();
  }

  private normalizeUrl(rawUrl?: string): string {
    const trimmed = (rawUrl || '').trim();
    if (!trimmed) {
      return '';
    }
    try {
      return new URL(trimmed).toString();
    } catch {
      return trimmed;
    }
  }

  private getDomain(url: string): string {
    try {
      return new URL(url).hostname.replace(/^www\./, '');
    } catch {
      return url;
    }
  }

  private buildFaviconUrl(domain: string): string {
    return domain
      ? `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=32`
      : '';
  }

  private slugify(value: string): string {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}