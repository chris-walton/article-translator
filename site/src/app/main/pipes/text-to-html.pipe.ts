import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'textToHtml', standalone: true })
export class TextToHtmlPipe implements PipeTransform {
  transform(htmlString: string): string {
    return htmlString
      .split('\n')
      .map((html) => `<p>${html}</p>`)
      .join('');
  }
}
