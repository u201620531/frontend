import { Directive, HostListener, Self, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[formatoMoneda]',
})
export class FormatoMonedaDirective implements OnDestroy {
  private formato: Intl.NumberFormat;

  constructor(@Self() private ngControl: NgControl) {
    this.formato = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 });
  }

  ngAfterViewInit() {
    this.setValue(this.formatoPrecio(this.ngControl.value));
  }

  @HostListener('focus') onFocus() {
    this.setValue(this.valorSinFormato(this.ngControl.value));
  }

  @HostListener('blur') onBlur() {
    let valor = this.ngControl.value || '';
    !!valor && this.setValue(this.formatoPrecio(valor));
  }

  formatoPrecio(v: any) {
    return this.formato.format(v);
  }

  valorSinFormato(v: any) {
    return v.replace(/,/g, '');
  }

  setValue(v: any) {
    this.ngControl.control.setValue(v, { emitEvent: true });
  }

  ngOnDestroy(): void {
    this.setValue(this.valorSinFormato(this.ngControl.value));
  }
}
