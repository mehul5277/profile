import { DOCUMENT } from '@angular/common';
import { effect, inject, Injectable, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private document = inject(DOCUMENT);


  // Track active theme selection
  readonly currentTheme = signal<ThemeMode>(this.getSavedTheme());

  constructor() {
    effect(() => {
      const mode = this.currentTheme();
      this.applyTheme(mode);
      localStorage.setItem('user-color-theme', mode);
    });

    // Listen for OS theme changes if user chooses 'system'
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (this.currentTheme() === 'system') {
        this.applyTheme('system');
      }
    });
  }

  setTheme(mode: ThemeMode): void {
    this.currentTheme.set(mode);
  }

  private applyTheme(mode: ThemeMode): void {
    const root = this.document.documentElement;
    let isDark = mode === 'dark';

    if (mode === 'system') {
      isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    if (isDark) {
      root.classList.add('dark-theme');
      root.setAttribute('data-bs-theme', 'dark'); // Sets native Bootstrap 5 dark styling
    } else {
      root.classList.remove('dark-theme');
      root.setAttribute('data-bs-theme', 'light');
    }
  }

  private getSavedTheme(): ThemeMode {
    const saved = localStorage.getItem('user-color-theme') as ThemeMode;
    return saved || 'system';
  }
}
