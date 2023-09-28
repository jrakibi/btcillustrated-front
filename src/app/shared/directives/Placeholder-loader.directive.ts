import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPlaceholderLoader]'
})
export class PlaceholderLoaderDirective {
  @Input() placeholderSrc: string = 'path_to_default_placeholder.png'; // default path

  private loading: boolean = true;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    // Set initial source as the placeholder
    this.renderer.setAttribute(this.el.nativeElement, 'src', this.placeholderSrc);
  }

  @Input()
  set appPlaceholderLoader(src: string) {
    this.loadImage(src);
  }

  loadImage(src: string) {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      this.renderer.setAttribute(this.el.nativeElement, 'src', src);
    };
  }
}
