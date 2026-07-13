export interface DataTableColumn<T> {
  key: keyof T | string;
  header: string;
}
