import { Pipe, PipeTransform } from '@angular/core';

import { Page } from './page.model';

@Pipe({ name: 'filterPages' })
export class FilterPagesPipe implements PipeTransform {
  transform(list: Page[], selected: Page): Page[] {
    if (list && Array.isArray(list) && selected) {
      return list.filter(i => {
        return i.account_id === selected.account_id
      });
    } else {
      return list;
    }
  }
} 
