
export enum Category {
  CONCURSOS = 'Concursos',
  GRADUACAO = 'Graduação',
  TECNICO = 'Técnico',
  IDIOMAS = 'Idiomas',
  VESTIBULAR = 'Vestibular',
  TI = 'Tecnologia da Informação',
  GENERAL = 'Geral'
}

export interface Handout {
  id: string;
  title: string;
  category: Category;
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
