import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appPreventClose]',
  standalone: true
})
export class PreventCloseDirective {

  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent): void {
    debugger;
    // Stops the click event from bubbling up to document listeners 
    // that close the megamenu
    event.stopPropagation();
  }
}
