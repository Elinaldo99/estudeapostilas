import React, { useState, useMemo, useEffect } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { Category, Handout, SubCategory } from './types';
import HandoutCard from './components/HandoutCard';

import { AuthProvider, useAuth } from './components/AuthContext';
import Auth from './components/Auth';
import AdminDashboard from './components/AdminDashboard';
import { handoutService } from './services/handoutService';
import { subcategoryService } from './services/subcategoryService';
import About from './components/About';
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import CookieConsent from './components/CookieConsent';

// Navbar Componente 
const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 backdrop-blur-md bg-white/90">
      <div className="container mx-auto px-4 max-w-7xl h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
          <div className="bg-indigo-600 text-white p-1.5 rounded-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-800">Estude<span className="text-indigo-600">Apostilas</span></span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Início</Link>
          <Link to="/" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Categorias</Link>

          {user && (
            <div className="flex items-center gap-6">
              {user.email === 'francoinvestimentoss@gmail.com' && (
                <Link
                  to="/admin"
                  className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl text-sm font-bold border border-indigo-100 hover:bg-indigo-100 transition-all flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Painel Admin
                </Link>
              )}
              <div className="flex items-center gap-4">
                <span className="text-sm text-slate-500 font-medium truncate max-w-[150px]">{user.email}</span>
                <button
                  onClick={() => signOut()}
                  className="text-sm font-bold text-red-500 hover:text-red-600 transition-colors"
                >
                  Sair
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          {isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-slate-200 shadow-xl animate-in slide-in-from-top duration-200 z-50">
          <div className="flex flex-col p-4 gap-4">
            <Link to="/" className="text-base font-medium text-slate-700 py-2 hover:text-indigo-600 active:bg-slate-50 rounded" onClick={() => setIsMenuOpen(false)}>Início</Link>
            <Link to="/" className="text-base font-medium text-slate-700 py-2 hover:text-indigo-600 active:bg-slate-50 rounded" onClick={() => setIsMenuOpen(false)}>Categorias</Link>
            {user && (
              <div className="flex flex-col gap-4">
                <hr className="border-slate-100" />
                {user.email === 'francoinvestimentoss@gmail.com' && (
                  <Link
                    to="/admin"
                    className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Painel Administrativo
                  </Link>
                )}
                <span className="text-sm text-slate-500 font-medium px-2">{user.email}</span>
                <button
                  onClick={() => { signOut(); setIsMenuOpen(false); }}
                  className="w-full bg-slate-100 text-slate-700 py-3 rounded-xl font-bold hover:bg-slate-200"
                >
                  Sair da Conta
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

// Footer Component
const Footer: React.FC = () => {
  const { user } = useAuth();
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-indigo-600 text-white p-1 rounded">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="font-bold text-lg text-white">EstudeApostilas</span>
          </div>
          <p className="text-sm leading-relaxed mb-6">
            Nossa missão é democratizar o acesso à educação de qualidade através da disponibilização de materiais gratuitos.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Plataforma</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/sobre" className="hover:text-white transition-colors">Sobre Nós</Link></li>
            <li><Link to="/termos" className="hover:text-white transition-colors">Termos de Uso</Link></li>
            <li><Link to="/privacidade" className="hover:text-white transition-colors">Privacidade</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Comunidade</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="#" className="hover:text-white transition-colors">Grupo de Estudos</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-xs">
        <p>&copy; 2025 EstudeApostilas - Conhecimento Aberto para Todos.</p>
      </div>
    </footer>
  );
};

// Home Page
const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'Todos'>('Todos');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | 'Todos'>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [handouts, setHandouts] = useState<Handout[]>([]);
  const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeHandout, setActiveHandout] = useState<Handout | null>(null);
  const [showOnlineViewer, setShowOnlineViewer] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [handoutsData, subcategoriesData] = await Promise.all([
          handoutService.getHandouts(),
          subcategoryService.getSubCategories()
        ]);
        setHandouts(handoutsData);
        setSubcategories(subcategoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredHandouts = useMemo(() => {
    return handouts.filter(handout => {
      const matchesCategory = selectedCategory === 'Todos' || handout.category === selectedCategory;
      const matchesSubCategory = selectedSubCategory === 'Todos' || handout.subcategory_id === selectedSubCategory;
      const matchesSearch = handout.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        handout.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSubCategory && matchesSearch;
    });
  }, [selectedCategory, selectedSubCategory, searchQuery, handouts]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-indigo-700 py-12 md:py-24 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-indigo-600/30 skew-x-12 transform translate-x-20 hidden md:block"></div>
        <div className="container mx-auto px-4 relative z-10 text-center md:text-left max-w-7xl">
          <div className="max-w-2xl mx-auto md:mx-0">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 md:mb-6 leading-tight">
              A maior biblioteca de apostilas <span className="text-indigo-200">gratuitas</span> do Brasil.
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8 md:mb-10 font-light max-w-xl mx-auto md:mx-0">
              Prepare-se para concursos, graduações e cursos técnicos com materiais selecionados por especialistas. Tudo grátis, sempre.
            </p>
            <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto md:mx-0">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="O que você quer estudar hoje?"
                  className="w-full px-6 py-4 rounded-full bg-white text-slate-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 shadow-xl text-sm md:text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-12 max-w-7xl">
        <div className="flex flex-col md:flex-row gap-8">

          {/* Sidebar / Filters */}
          <aside className="w-full md:w-80 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Categorias
              </h3>
              <div className="flex flex-col gap-3">
                {['Todos', ...Object.values(Category)].map(cat => (
                  <div key={cat} className="flex flex-col">
                    <button
                      onClick={() => {
                        setSelectedCategory(cat as any);
                        setSelectedSubCategory('Todos');
                      }}
                      className={`px-5 py-3.5 rounded-2xl text-sm text-left transition-all flex items-center justify-between group ${selectedCategory === cat
                        ? 'bg-indigo-600 text-white font-bold shadow-xl shadow-indigo-100'
                        : 'bg-white text-slate-600 hover:bg-slate-100 hover:shadow-md border border-slate-100'
                        }`}
                    >
                      <span className="flex items-center gap-3 overflow-hidden group-hover:translate-x-1 transition-transform duration-200">
                        {cat === 'Todos' ? (
                          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                          </svg>
                        ) : (
                          <div className={`w-2 h-2 rounded-full flex-shrink-0 transition-all duration-300 ${selectedCategory === cat ? 'bg-white scale-110' : 'opacity-0'}`} />
                        )}
                        <span className="whitespace-nowrap">{cat}</span>
                      </span>
                      {cat !== 'Todos' && subcategories.some(s => s.category === cat) && (
                        <svg className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${selectedCategory === cat ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </button>

                    {/* Subcategories Accordion */}
                    {selectedCategory === cat && cat !== 'Todos' && subcategories.filter(s => s.category === cat).length > 0 && (
                      <div className="mt-2 ml-4 pl-5 border-l-2 border-slate-100 flex flex-col gap-1 py-1 animate-in fade-in slide-in-from-top-2 duration-300">
                        <button
                          onClick={() => setSelectedSubCategory('Todos')}
                          className={`px-4 py-2.5 rounded-xl text-xs text-left transition-all ${selectedSubCategory === 'Todos'
                            ? 'text-indigo-600 font-bold bg-indigo-50 shadow-sm'
                            : 'text-slate-500 hover:bg-slate-50'
                            }`}
                        >
                          • Ver Todas
                        </button>
                        {subcategories
                          .filter(sub => sub.category === cat)
                          .map(sub => (
                            <button
                              key={sub.id}
                              onClick={() => setSelectedSubCategory(sub.id)}
                              className={`px-4 py-2.5 rounded-xl text-xs text-left transition-all ${selectedSubCategory === sub.id
                                ? 'text-indigo-600 font-bold bg-indigo-50 shadow-sm'
                                : 'text-slate-500 hover:bg-slate-50'
                                }`}
                            >
                              • {sub.name}
                            </button>
                          ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>


          </aside>

          {/* Handout Grid Area */}
          <div className="flex-grow">
            <section className="mb-12">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-bold text-slate-900">
                  {selectedCategory === 'Todos'
                    ? 'Materiais Recentes'
                    : selectedSubCategory === 'Todos'
                      ? `Apostilas de ${selectedCategory}`
                      : `${selectedCategory} > ${subcategories.find(s => s.id === selectedSubCategory)?.name}`
                  }
                </h2>
                <div className="text-sm font-medium text-slate-500">Exibindo {filteredHandouts.length} itens</div>
              </div>

              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                  <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="font-medium">Carregando materiais...</p>
                </div>
              ) : filteredHandouts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredHandouts.map(handout => (
                    <HandoutCard key={handout.id} handout={handout} onClick={setActiveHandout} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                  <div className="text-slate-300 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Nenhum material encontrado</h3>
                  <p className="text-slate-500 mb-6">Tente ajustar seus filtros ou busca.</p>
                  <button
                    onClick={() => { setSelectedCategory('Todos'); setSelectedSubCategory('Todos'); setSearchQuery(''); }}
                    className="text-indigo-600 font-bold hover:underline"
                  >
                    Limpar todos os filtros
                  </button>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>


      <Footer />

      {/* Handout Modal */}
      {activeHandout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setActiveHandout(null)}
          ></div>
          <div className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl relative z-10 animate-in zoom-in-95 duration-200 flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh]">
            <div className="w-full md:w-1/3 bg-slate-100 flex items-center justify-center p-6 md:p-8">
              <img
                src={activeHandout.thumbnail}
                alt={activeHandout.title}
                className="w-32 md:w-full shadow-2xl rounded-lg transform md:-rotate-3 md:hover:rotate-0 transition-transform duration-500"
              />
            </div>
            <div className="w-full md:w-2/3 p-6 md:p-8 flex flex-col overflow-y-auto">
              <button
                onClick={() => setActiveHandout(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 z-20 bg-white/80 p-1 rounded-full md:bg-transparent"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="mb-4 md:mb-6">
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-wider mb-2 md:mb-3 inline-block">
                  {activeHandout.category} {activeHandout.subCategory && `> ${activeHandout.subCategory.name}`}
                </span>
                <h2 className="text-xl md:text-3xl font-extrabold text-slate-800 mb-1 md:mb-2 leading-tight">
                  {activeHandout.title}
                </h2>
                <p className="text-xs md:text-sm text-slate-500">Por {activeHandout.author} • Publicado em {activeHandout.year}</p>
              </div>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-6 md:mb-8">
                {activeHandout.description}
              </p>
              <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
                <div className="bg-slate-50 p-3 md:p-4 rounded-xl md:rounded-2xl text-center">
                  <span className="block text-xl md:text-2xl font-bold text-slate-800">{activeHandout.pages}</span>
                  <span className="text-[10px] md:text-xs text-slate-400 uppercase font-bold">Páginas</span>
                </div>
                <div className="bg-slate-50 p-3 md:p-4 rounded-xl md:rounded-2xl text-center">
                  <div className="flex items-center justify-center text-amber-500 mb-0.5 md:mb-1">
                    <svg className="w-3 h-3 md:w-4 md:h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-xl md:text-2xl font-bold text-slate-800 ml-1">{activeHandout.rating}</span>
                  </div>
                  <span className="text-[10px] md:text-xs text-slate-400 uppercase font-bold">Avaliação</span>
                </div>
              </div>
              <div className="mt-auto flex flex-col sm:flex-row gap-3 md:gap-4">
                <a
                  href={activeHandout.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-grow bg-indigo-600 text-white font-bold py-3 md:py-4 rounded-xl md:rounded-2xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 md:gap-3 shadow-lg shadow-indigo-100 text-sm md:text-base"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Baixar PDF
                </a>
                <button
                  onClick={() => setShowOnlineViewer(true)}
                  className="w-full sm:w-auto px-6 py-3 md:py-4 bg-slate-100 text-slate-700 font-bold rounded-xl md:rounded-2xl hover:bg-slate-200 transition-all text-sm md:text-base"
                >
                  Ler Online
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Online Viewer Modal */}
      {showOnlineViewer && activeHandout && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-slate-900 animate-in fade-in duration-300">
          <div className="h-16 flex items-center justify-between px-4 md:px-8 bg-slate-800 border-b border-slate-700 text-white shadow-lg">
            <div className="flex items-center gap-4 truncate">
              <button
                onClick={() => setShowOnlineViewer(false)}
                className="p-2 hover:bg-slate-700 rounded-full transition-colors"
                title="Voltar"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <h3 className="font-bold truncate text-sm md:text-base">{activeHandout.title}</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden md:inline text-xs text-slate-400 font-medium bg-slate-900 px-3 py-1 rounded-full">Visualização Online</span>
              <button
                onClick={() => setShowOnlineViewer(false)}
                className="p-2 hover:bg-red-500 rounded-full transition-all group"
                title="Fechar"
              >
                <svg className="w-6 h-6 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex-grow relative bg-slate-100">
            <iframe
              src={activeHandout.downloadUrl}
              className="w-full h-full border-none shadow-inner"
              title={activeHandout.title}
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/termos" element={<Terms />} />
          <Route path="/privacidade" element={<Privacy />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        <CookieConsent />
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
