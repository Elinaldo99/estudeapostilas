
export enum Category {
  CONCURSOS = 'Concursos',
  GRADUACAO = 'Graduação',
  TECNICO = 'Técnico',
  IDIOMAS = 'Idiomas',
  VESTIBULAR = 'Vestibular',
  TI = 'Tecnologia da Informação',
  GENERAL = 'Geral'
}

export interface SubCategory {
  id: string;
  name: string;
  category: Category;
  created_at?: string;
}

export interface Handout {
  id: string;
  title: string;
  category: Category;
  subCategory?: SubCategory;
  subcategory_id?: string;
  description: string;
  author: string;
  pages: number;
  year: number;
  rating: number;
  downloadUrl: string;
  thumbnail: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
