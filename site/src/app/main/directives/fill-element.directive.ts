import {
  AfterViewChecked,
  Directive,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, fromEvent, throttleTime } from 'rxjs';

@UntilDestroy()
@Directive({ selector: '[atFillElement]', standalone: true })
export class FillElementDirective implements AfterViewChecked {
  @Input() paddingBottom = 0;
  @Input() deplay = 500;

  private readonly elem: HTMLElement;

  constructor(private readonly renderer: Renderer2, ref: ElementRef) {
    this.elem = ref.nativeElement;

    // register on window resize event
    fromEvent(window, 'resize')
      .pipe(
        throttleTime(this.deplay),
        debounceTime(this.deplay),
        untilDestroyed(this)
      )
      .subscribe(() => this.setHeight());
  }

  private get disabled(): boolean {
    return false; //isMobile == true
  }

  ngAfterViewChecked() {
    this.setHeight();
  }

  private setHeight() {
    const windowHeight = window?.innerHeight;
    const topOffset = this.calcTopOffset();
    let height = windowHeight - topOffset - this.paddingBottom;

    this.renderer.setStyle(this.elem, 'height', `${height}px`);
  }

  private calcTopOffset(): number {
    try {
      const rect = this.elem.getBoundingClientRect();
      const scrollTop = document.documentElement.scrollTop;

      return rect.top + scrollTop;
    } catch (e) {
      return 0;
    }
  }
}

interface Position {
  top: number;
  left: number;
}
