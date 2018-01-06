/*
 * オリジナルのバリデーション関数を定義する
 */

import { FormControl } from '@angular/forms';

// 数値
export function numberValidator(control: FormControl): { [s: string]: boolean } {
  return ((n:number) => isNaN(n) ? { number: true } : null)(Number(control.value))
}
