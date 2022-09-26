import { MatPaginatorIntl } from '@angular/material/paginator';

export function CustomPaginator() {
  const customPaginatorIntl = new MatPaginatorIntl();

  customPaginatorIntl.itemsPerPageLabel = 'Elementos por página:';
  customPaginatorIntl.nextPageLabel = 'Siguiente página';
  customPaginatorIntl.lastPageLabel = 'Última página';
  customPaginatorIntl.firstPageLabel = 'Primera página';
  customPaginatorIntl.previousPageLabel = '¨+agina anterior';
  customPaginatorIntl.getRangeLabel = getRangeLabel;

  return customPaginatorIntl;
}

const getRangeLabel: (
  page: number,
  pageSize: number,
  length: number
) => string = (page: number, pageSize: number, length: number): string => {
  return new MatPaginatorIntl()
    .getRangeLabel(page, pageSize, length)
    .replace('of', 'de');
};
