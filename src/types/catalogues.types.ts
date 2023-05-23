export type Catalogues = Catalogue[];

export interface Catalogue {
  title_rus: string;
  url_rus: string;
  title: string;
  title_trimmed: string;
  key: number;
  positions: Position[];
}

export interface Position {
  title_rus: string;
  url_rus: string;
  title: string;
  id_parent: number;
  key: number;
}
