import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SERVICE_MEGA_MENU_GROUPS, ServiceMegaMenuGroup } from './../../metadata/service-mega-menu.data';

@Component({
  selector: 'app-service-mega-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './service-mega-menu.component.html',
  styleUrls: ['./service-mega-menu.component.scss']
})
export class ServiceMegaMenuComponent {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly groups: ServiceMegaMenuGroup[] = SERVICE_MEGA_MENU_GROUPS;
  isOpen = false;

  setOpen(state: boolean): void {
    this.isOpen = state;
  }

  toggle(event?: Event): void {
    event?.preventDefault();
    this.isOpen = !this.isOpen;
  }

  close(): void {
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.isOpen = false;
  }
}
