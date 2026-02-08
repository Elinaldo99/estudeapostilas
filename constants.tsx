
import { Handout, Category } from './types';

export const HANDOUTS: Handout[] = [
  {
    id: '1',
    title: 'Matemática para Concursos: Nível Médio',
    category: Category.CONCURSOS,
    description: 'Um guia completo cobrindo aritmética, álgebra e raciocínio lógico focado em editais da CESPE e FCC.',
    author: 'Prof. Carlos Alberto',
    pages: 245,
    year: 2024,
    rating: 4.8,
    downloadUrl: '#',
    thumbnail: 'https://picsum.photos/seed/math1/400/600'
  },
  {
    id: '2',
    title: 'Introdução à Programação em Python',
    category: Category.TI,
    description: 'Aprenda do zero os fundamentos da linguagem que mais cresce no mundo, com exercícios práticos.',
    author: 'Estude Apostila Team',
    pages: 120,
    year: 2023,
    rating: 4.9,
    downloadUrl: '#',
    thumbnail: 'https://picsum.photos/seed/python/400/600'
  },
  {
    id: '3',
    title: 'Direito Administrativo Facilitado',
    category: Category.GRADUACAO,
    description: 'Resumo estruturado dos principais tópicos de Direito Administrativo para acadêmicos e concurseiros.',
    author: 'Dra. Marina Silva',
    pages: 180,
    year: 2024,
    rating: 4.7,
    downloadUrl: '#',
    thumbnail: 'https://picsum.photos/seed/law/400/600'
  },
  {
    id: '4',
    title: 'Inglês Instrumental para Mestrado',
    category: Category.IDIOMAS,
    description: 'Focado em técnicas de leitura e interpretação de textos acadêmicos para exames de proficiência.',
    author: 'John Doe Academics',
    pages: 95,
    year: 2023,
    rating: 4.5,
    downloadUrl: '#',
    thumbnail: 'https://picsum.photos/seed/english/400/600'
  },
  {
    id: '5',
    title: 'Técnico em Enfermagem: Primeiros Socorros',
    category: Category.TECNICO,
    description: 'Protocolos atualizados de atendimento inicial em situações de emergência.',
    author: 'Escola Técnica Nacional',
    pages: 150,
    year: 2024,
    rating: 4.6,
    downloadUrl: '#',
    thumbnail: 'https://picsum.photos/seed/nurse/400/600'
  },
  {
    id: '6',
    title: 'Biologia Celular e Molecular',
    category: Category.GRADUACAO,
    description: 'Apostila detalhada sobre a estrutura e função das células, ideal para cursos de saúde.',
    author: 'Instituto BioStudies',
    pages: 310,
    year: 2024,
    rating: 4.9,
    downloadUrl: '#',
    thumbnail: 'https://picsum.photos/seed/biology/400/600'
  },
  {
    id: '7',
    title: 'Redação para o ENEM: Nota 1000',
    category: Category.VESTIBULAR,
    description: 'Modelos de estrutura, repertório sociocultural e análise de redações que alcançaram a nota máxima.',
    author: 'Profa. Eliane Souza',
    pages: 80,
    year: 2025,
    rating: 5.0,
    downloadUrl: '#',
    thumbnail: 'https://picsum.photos/seed/writing/400/600'
  },
  {
    id: '8',
    title: 'Gestão de Projetos Ágeis (Scrum/Kanban)',
    category: Category.TI,
    description: 'Como aplicar metodologias ágeis em equipes de desenvolvimento e negócios.',
    author: 'Master Agile',
    pages: 115,
    year: 2024,
    rating: 4.4,
    downloadUrl: '#',
    thumbnail: 'https://picsum.photos/seed/agile/400/600'
  }
];
