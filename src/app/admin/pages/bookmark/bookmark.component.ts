import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BookmarkService } from '../../services/bookmark.service';
import { BookmarkCategory, BookmarkDisplayItem, BookmarkItem } from '../../metadata/bookmark.model';


@Component({
  selector: 'app-bookmark',
  standalone: true,
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {
  private readonly bookmarkService = inject(BookmarkService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly rawCategories = signal<BookmarkCategory[]>([]);

  readonly isLoading = signal<boolean>(true);
  readonly errorMessage = signal<string | null>(null);
  readonly selectedCategory = signal<string>('all');
  readonly searchTerm = signal<string>('');

  // Quick-add form signals
  readonly newTitle = signal<string>('');
  readonly newUrl = signal<string>('');
  readonly newCategoryId = signal<string>('ui-ux');

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

  readonly visibleItems = computed<Array<BookmarkDisplayItem & { categoryId: string }>>(() => {
    const selected = this.selectedCategory();
    const query = this.searchTerm().trim().toLowerCase();

    const pool: Array<BookmarkDisplayItem & { categoryId: string }> =
      selected === 'all'
        ? this.categories().flatMap((cat) =>
            (cat.items ?? []).map((item) => this.toDisplayItem(item, cat.name, cat.id))
          )
        : (this.categories().find((c) => c.id === selected)?.items ?? []).map((item) =>
            this.toDisplayItem(item, this.activeCategoryLabel(), selected)
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

    this.bookmarkService
      .getCategories()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          const list = Array.isArray(data) ? data : [];
          this.rawCategories.set(list);
          if (list.length > 0 && !list.some((c) => c.id === this.newCategoryId())) {
            this.newCategoryId.set(list[0].id);
          }
          this.isLoading.set(false);
        },
        error: () => {
          this.rawCategories.set([]);
          this.errorMessage.set('Unable to load bookmarks.');
          this.isLoading.set(false);
        }
      });
  }

  addBookmark(event: Event): void {
    event.preventDefault();
    const normalizedUrl = this.normalizeUrl(this.newUrl());
    if (!normalizedUrl) {
      return;
    }

    const updated = this.bookmarkService.addBookmark(
      this.rawCategories(),
      this.newCategoryId(),
      {
        title: this.newTitle().trim() || this.getDomain(normalizedUrl),
        url: normalizedUrl
      }
    );

    this.rawCategories.set(updated);
    this.newTitle.set('');
    this.newUrl.set('');
  }

  deleteBookmark(url: string, categoryId?: string, event?: Event): void {
    event?.preventDefault();
    event?.stopPropagation();

    const updated = this.bookmarkService.deleteBookmark(
      this.rawCategories(),
      url,
      categoryId
    );
    this.rawCategories.set(updated);
  }

  resetBookmarks(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.bookmarkService
      .resetToJson()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.rawCategories.set(Array.isArray(data) ? data : []);
          this.isLoading.set(false);
        },
        error: () => {
          this.errorMessage.set('Unable to reset bookmarks from JSON.');
          this.isLoading.set(false);
        }
      });
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

  private toDisplayItem(
    item: BookmarkItem,
    categoryName: string,
    categoryId: string
  ): BookmarkDisplayItem & { categoryId: string } {
    const domain = this.getDomain(item.url);
    return {
      ...item,
      categoryId,
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