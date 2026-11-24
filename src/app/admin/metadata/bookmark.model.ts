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