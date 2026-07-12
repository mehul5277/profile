import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
//https://dev.to/derlin/get-favicons-from-any-website-using-a-hidden-google-api-3p1e

@Pipe({
  name: 'favicon',
  standalone: true
})
export class FaviconPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(websiteUrl: string, size: number = 24): SafeResourceUrl {
    try {
      const urlObject = new URL(websiteUrl);
      const domain = urlObject.hostname;
      return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`);
    } catch (e) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.google.com/s2/favicons?domain=${websiteUrl}&sz=${size}`);
    }
  }
}