import { Pipe, PipeTransform } from '@angular/core';
import { Message } from '@at/core/models';

@Pipe({ name: 'historyFilter', standalone: true })
export class HistoryFilterPipe implements PipeTransform {
  transform(
    messages: Message[],
    [modelFilter, ratingfilter, search]: [
      string | undefined,
      number | undefined,
      string | undefined
    ]
  ): Message[] {
    return messages.filter((m) => {
      if (!m.success) return false;
      if (modelFilter && m.aiModel !== modelFilter) return false;
      if (ratingfilter != undefined && (m.rating ?? 0) < ratingfilter)
        return false;
      if (search) {
        const searchLower = search.toLowerCase();
        if (
          !m.article.toLowerCase().includes(searchLower) &&
          !m.prompt.toLowerCase().includes(searchLower) &&
          !(m.results ?? '').toLowerCase().includes(searchLower)
        )
          return false;
      }

      return true;
    });
  }
}
