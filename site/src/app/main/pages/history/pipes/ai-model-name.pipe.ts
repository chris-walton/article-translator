import { Pipe, PipeTransform } from '@angular/core';
import { AI_MODELS } from 'src/environments/globals';

@Pipe({ name: 'aiModelName', standalone: true })
export class AiModelNamePipe implements PipeTransform {
  transform(modelId: string): string {
    return AI_MODELS.find((model) => model.id === modelId)?.name ?? '';
  }
}
