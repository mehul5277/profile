import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppTitleStrategyService extends TitleStrategy {

  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const brandName: string = 'Jixo';

    // 1. Traverse to the deepest active route to find module info
    const deepestRoute = this.getDeepestRoute(routerState.root);

    // 2. Identify the module or parent path configuration
    const moduleRoutePath = this.getModuleRoutePath(deepestRoute);

    // 3. Fallback to standard route title if configured
    let title = this.buildTitle(routerState);

    if (!title) {
      // 2. Strip query parameters/fragments and split the path
      const urlPath = routerState.url.split('?')[0];
      const segments = urlPath.split('/').filter(segment => segment.length > 0);

      // 3. Grab the last segment
      const lastSegment = segments[segments.length - 1] || 'Home';

      // 4. Format the segment (e.g., capitalize the first letter)
      title = lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);

      if (title.length < 3) {
        title = title.toUpperCase();
      }
    }

    if (title !== undefined) {
      // Formats the final browser tab string
      this.title.setTitle(`${brandName} | ${title}`);
    } else {
      this.title.setTitle('Jixo');
    }
  }

  // Helper to drill down to the active leaf node
  private getDeepestRoute(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

  // Helper to identify the parent module path config (e.g., 'products' or 'settings')
  private getModuleRoutePath(route: ActivatedRouteSnapshot): string | null {
    // Traverse upwards to find the first meaningful parent path configuration
    let current: ActivatedRouteSnapshot | null = route.parent;
    while (current) {
      const pathConfig = current.routeConfig?.path;
      if (pathConfig && pathConfig !== '') {
        return this.capitalize(pathConfig);
      }
      current = current.parent;
    }
    return null;
  }

  // Helper to format the final segment text cleanly
  private formatSegment(segment: string, parentContext: string | null): string {
    // If the last segment is a pure number (like an ID), contextually rename it
    if (/^\d+$/.test(segment) && parentContext) {
      return 'Details';
    }

    // Replace hyphens/underscores with spaces and capitalize words
    return segment
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  }

  private capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}