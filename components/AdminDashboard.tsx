import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { handoutService } from '../services/handoutService';
import { subcategoryService } from '../services/subcategoryService';
import { Handout, Category, SubCategory } from '../types';

const AdminDashboard: React.FC = () => {
    const { isAdmin, isLoading: authLoading } = useAuth();
    const [handouts, setHandouts] = useState<Handout[]>([]);
    const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'handouts' | 'subcategories'>('handouts');
    const [isEditing, setIsEditing] = useState(false);
    const [currentHandout, setCurrentHandout] = useState<Partial<Handout>>({
        category: Category.CONCURSOS,
        pages: 0,
        year: new Date().getFullYear(),
        rating: 5.0
    });
    const [currentSubCategory, setCurrentSubCategory] = useState<Partial<SubCategory>>({
        category: Category.CONCURSOS,
        name: ''
    });
    const [isSubEditing, setIsSubEditing] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (isAdmin) {
            loadData();
        }
    }, [isAdmin]);

    const loadData = async () => {
        setIsLoading(true);
        try {
            const [handoutsData, subcategoriesData] = await Promise.all([
                handoutService.getHandouts(),
                subcategoryService.getSubCategories()
            ]);
            setHandouts(handoutsData);
            setSubcategories(subcategoriesData);
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);
        try {
            let thumbnailUrl = currentHandout.thumbnail;

            if (selectedFile) {
                thumbnailUrl = await handoutService.uploadThumbnail(selectedFile);
            }

            const handoutToSave = {
                ...currentHandout,
                thumbnail: thumbnailUrl
            };

            if (currentHandout.id) {
                await handoutService.updateHandout(currentHandout.id, handoutToSave);
                alert('Material atualizado com sucesso!');
            } else {
                await handoutService.createHandout(handoutToSave as Omit<Handout, 'id'>);
                alert('Material criado com sucesso!');
            }
            setIsEditing(false);
            setSelectedFile(null);
            setPreviewUrl(null);
            setCurrentHandout({
                category: Category.CONCURSOS,
                pages: 0,
                year: new Date().getFullYear(),
                rating: 5.0
            });
            loadData();
        } catch (error) {
            alert('Erro ao salvar material.');
        } finally {
            setUploading(false);
        }
    };

    const handleSubSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (currentSubCategory.id) {
                await subcategoryService.updateSubCategory(currentSubCategory.id, currentSubCategory);
                alert('Subcategoria atualizada!');
            } else {
                await subcategoryService.createSubCategory(currentSubCategory as Omit<SubCategory, 'id'>);
                alert('Subcategoria criada!');
            }
            setIsSubEditing(false);
            setCurrentSubCategory({ category: Category.CONCURSOS, name: '' });
            loadData();
        } catch (error) {
            alert('Erro ao salvar subcategoria.');
        }
    };

    const handleSubEdit = (sub: SubCategory) => {
        setCurrentSubCategory(sub);
        setIsSubEditing(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubDelete = async (id: string) => {
        if (window.confirm('Tem certeza que deseja excluir esta subcategoria?')) {
            try {
                await subcategoryService.deleteSubCategory(id);
                loadData();
            } catch (error) {
                alert('Erro ao excluir subcategoria.');
            }
        }
    };

    const handleEdit = (handout: Handout) => {
        setCurrentHandout(handout);
        setPreviewUrl(handout.thumbnail);
        setIsEditing(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Tem certeza que deseja excluir este material?')) {
            try {
                await handoutService.deleteHandout(id);
                loadData();
            } catch (error) {
                alert('Erro ao excluir material.');
            }
        }
    };

    if (authLoading) return <div className="p-8 text-center">Carregando...</div>;
    if (!isAdmin) return <Navigate to="/" replace />;

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900">Painel do Administrador</h1>
                        <p className="text-slate-500">Gerencie a biblioteca de apostilas</p>
                    </div>
                    <Link to="/" className="text-indigo-600 font-bold hover:underline">Voltar para o site</Link>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-8">
                    <button
                        onClick={() => setActiveTab('handouts')}
                        className={`px-6 py-2 rounded-xl font-bold transition-all ${activeTab === 'handouts' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
                    >
                        Materiais
                    </button>
                    <button
                        onClick={() => setActiveTab('subcategories')}
                        className={`px-6 py-2 rounded-xl font-bold transition-all ${activeTab === 'subcategories' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
                    >
                        Subcategorias
                    </button>
                </div>

                {activeTab === 'handouts' ? (
                    <>
                        {/* Form Section */}
                        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12 border border-slate-100">
                            <h2 className="text-xl font-bold text-slate-800 mb-6">
                                {isEditing ? 'Editar Material' : 'Adicionar Novo Conteúdo'}
                            </h2>
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Título</label>
                                    <input
                                        required
                                        value={currentHandout.title || ''}
                                        onChange={e => setCurrentHandout({ ...currentHandout, title: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                                        placeholder="Ex: Matemática Zero para Concursos"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Categoria</label>
                                        <select
                                            value={currentHandout.category}
                                            onChange={e => setCurrentHandout({ ...currentHandout, category: e.target.value as Category, subcategory_id: undefined })}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                                        >
                                            {Object.values(Category).map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Subcategoria</label>
                                        <select
                                            value={currentHandout.subcategory_id || ''}
                                            onChange={e => setCurrentHandout({ ...currentHandout, subcategory_id: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                                        >
                                            <option value="">Sem subcategoria</option>
                                            {subcategories
                                                .filter(sub => sub.category === currentHandout.category)
                                                .map(sub => (
                                                    <option key={sub.id} value={sub.id}>{sub.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Descrição</label>
                                    <textarea
                                        required
                                        value={currentHandout.description || ''}
                                        onChange={e => setCurrentHandout({ ...currentHandout, description: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none h-32"
                                        placeholder="Descreva brevemente o conteúdo..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Autor</label>
                                    <input
                                        value={currentHandout.author || ''}
                                        onChange={e => setCurrentHandout({ ...currentHandout, author: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                                        placeholder="Nome do Professor / Instituição"
                                    />
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Páginas</label>
                                        <input
                                            type="number"
                                            value={currentHandout.pages || 0}
                                            onChange={e => setCurrentHandout({ ...currentHandout, pages: parseInt(e.target.value) })}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Ano</label>
                                        <input
                                            type="number"
                                            value={currentHandout.year || new Date().getFullYear()}
                                            onChange={e => setCurrentHandout({ ...currentHandout, year: parseInt(e.target.value) })}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Estrelas</label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            max="5"
                                            value={currentHandout.rating || 5.0}
                                            onChange={e => setCurrentHandout({ ...currentHandout, rating: parseFloat(e.target.value) })}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Capa do Material (Foto)</label>
                                    <div className="flex flex-col md:flex-row gap-6 items-start">
                                        <div className="w-full md:w-1/3 aspect-[3/4] bg-slate-100 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden relative group">
                                            {previewUrl ? (
                                                <>
                                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <button
                                                            type="button"
                                                            onClick={() => { setSelectedFile(null); setPreviewUrl(null); setCurrentHandout({ ...currentHandout, thumbnail: '' }); }}
                                                            className="bg-white text-red-600 p-2 rounded-xl font-bold text-xs"
                                                        >
                                                            Remover
                                                        </button>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="text-center p-4">
                                                    <svg className="w-12 h-12 text-slate-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    <p className="text-xs text-slate-400">Arraste ou clique para enviar</p>
                                                </div>
                                            )}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                            />
                                        </div>
                                        <div className="flex-grow space-y-4">
                                            <p className="text-sm text-slate-500 leading-relaxed">
                                                Recomendamos imagens verticais (proporção 3:4) para melhor visualização.
                                                Se preferir, você ainda pode inserir uma URL manualmente abaixo.
                                            </p>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-400 mb-1">URL da Miniatura (Opcional)</label>
                                                <input
                                                    value={currentHandout.thumbnail || ''}
                                                    onChange={e => {
                                                        setCurrentHandout({ ...currentHandout, thumbnail: e.target.value });
                                                        setPreviewUrl(e.target.value);
                                                    }}
                                                    className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                                                    placeholder="https://exemplo.com/imagem.jpg"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Link de Download (URL)</label>
                                    <input
                                        required
                                        value={currentHandout.downloadUrl || ''}
                                        onChange={e => setCurrentHandout({ ...currentHandout, downloadUrl: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                                        placeholder="https://link-de-download.com"
                                    />
                                </div>
                                <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                                    {isEditing && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsEditing(false);
                                                setCurrentHandout({
                                                    category: Category.CONCURSOS,
                                                    pages: 0,
                                                    year: new Date().getFullYear(),
                                                    rating: 5.0
                                                });
                                            }}
                                            className="px-6 py-3 rounded-xl font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all"
                                        >
                                            Cancelar
                                        </button>
                                    )}
                                    <button
                                        type="submit"
                                        disabled={uploading}
                                        className="px-12 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 disabled:opacity-50"
                                    >
                                        {uploading ? 'Enviando...' : (isEditing ? 'Salvar Alterações' : 'Adicionar Material')}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* List Section */}
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
                            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                                <h2 className="text-xl font-bold text-slate-800">Biblioteca Atual</h2>
                                <span className="text-sm text-slate-500 font-medium">{handouts.length} itens cadastrados</span>
                            </div>
                            {isLoading ? (
                                <div className="p-12 text-center text-slate-400">Carregando materiais...</div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-bold tracking-wider">
                                            <tr>
                                                <th className="px-6 py-4">Título / Categoria</th>
                                                <th className="px-6 py-4">Autor</th>
                                                <th className="px-6 py-4 text-center">Ano</th>
                                                <th className="px-6 py-4 text-right">Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {handouts.map(h => (
                                                <tr key={h.id} className="hover:bg-slate-50 transition-colors group">
                                                    <td className="px-6 py-4">
                                                        <div className="font-bold text-slate-800">{h.title}</div>
                                                        <div className="text-xs text-indigo-600 font-medium">
                                                            {h.category} {h.subCategory && `> ${h.subCategory.name}`}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-slate-600">{h.author}</td>
                                                    <td className="px-6 py-4 text-sm text-slate-600 text-center">{h.year}</td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <button
                                                                onClick={() => handleEdit(h)}
                                                                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                                                                title="Editar"
                                                            >
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                                </svg>
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(h.id)}
                                                                className="flex items-center gap-1 px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-xl transition-all font-bold border border-transparent hover:border-red-100"
                                                                title="Excluir Material"
                                                            >
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                                <span className="text-xs">Excluir</span>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            {handouts.length === 0 && (
                                                <tr>
                                                    <td colSpan={4} className="px-6 py-12 text-center text-slate-400 italic">
                                                        Nenhum material cadastrado na biblioteca.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        {/* Subcategory Management Form */}
                        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12 border border-slate-100">
                            <h2 className="text-xl font-bold text-slate-800 mb-6">
                                {isSubEditing ? 'Editar Subcategoria' : 'Adicionar Nova Subcategoria'}
                            </h2>
                            <form onSubmit={handleSubSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Nome</label>
                                    <input
                                        required
                                        value={currentSubCategory.name || ''}
                                        onChange={e => setCurrentSubCategory({ ...currentSubCategory, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                                        placeholder="Ex: Policial"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Categoria Pai</label>
                                    <select
                                        value={currentSubCategory.category}
                                        onChange={e => setCurrentSubCategory({ ...currentSubCategory, category: e.target.value as Category })}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                                    >
                                        {Object.values(Category).map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="md:col-span-2 flex justify-end gap-4">
                                    {isSubEditing && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsSubEditing(false);
                                                setCurrentSubCategory({ category: Category.CONCURSOS, name: '' });
                                            }}
                                            className="px-6 py-3 rounded-xl font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all"
                                        >
                                            Cancelar
                                        </button>
                                    )}
                                    <button
                                        type="submit"
                                        className="px-12 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                                    >
                                        {isSubEditing ? 'Salvar Alterações' : 'Adicionar Subcategoria'}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Subcategories List */}
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
                            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                                <h2 className="text-xl font-bold text-slate-800">Subcategorias Cadastradas</h2>
                                <span className="text-sm text-slate-500 font-medium">{subcategories.length} itens</span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-bold tracking-wider">
                                        <tr>
                                            <th className="px-6 py-4">Nome</th>
                                            <th className="px-6 py-4">Categoria Pai</th>
                                            <th className="px-6 py-4 text-right">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {subcategories.map(sub => (
                                            <tr key={sub.id} className="hover:bg-slate-50 transition-colors group">
                                                <td className="px-6 py-4 font-bold text-slate-800">{sub.name}</td>
                                                <td className="px-6 py-4 text-sm text-indigo-600 font-medium">{sub.category}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            onClick={() => handleSubEdit(sub)}
                                                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            onClick={() => handleSubDelete(sub.id)}
                                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
