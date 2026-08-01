
export enum Category {
  ADMINISTRACAO_GERAL = 'Administração Geral',
  ADMINISTRACAO_PUBLICA = 'Administração Pública',
  ARQUIVOLOGIA = 'Arquivologia',
  CONHECIMENTOS_BANCARIOS = 'Conhecimentos Bancários',
  CONTABILIDADE = 'Contabilidade',
  CTB_LEGISLACAO_DE_TRANSITO = 'CTB de Legislação de Trânsito',
  DIREITO_ADMINISTRATIVO = 'Direito Administrativo',
  DIREITO_CIVIL = 'Direito Civil',
  DIREITO_CONSTITUCIONAL = 'Direito Constitucional',
  DIREITO_MILITAR = 'Direito Militar',
  DIREITO_PENAL = 'Direito Penal',
  DIREITO_PREVIDENCIARIO = 'Direito Previdenciário',
  DIREITO_PROCESSUAL_CIVIL = 'Direito Processual Civil',
  DIREITO_PROCESSUAL_PENAL = 'Direito Processual Penal',
  DIREITOS_HUMANOS = 'Direitos Humanos',
  ECA_ESTATUTO_DA_CRIANCA_E_ADOLECENTE = 'ECA - Estatuto da Criança e do Adolescente',
  ECONOMIA = 'Economia',
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
