import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { handoutService } from '../services/handoutService';
import { Handout, Category } from '../types';

const AdminDashboard: React.FC = () => {
    const { isAdmin, isLoading: authLoading } = useAuth();
    const [handouts, setHandouts] = useState<Handout[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentHandout, setCurrentHandout] = useState<Partial<Handout>>({
        category: Category.CONCURSOS,
        pages: 0,
        year: new Date().getFullYear(),
        rating: 5.0
    });

    useEffect(() => {
        if (isAdmin) {
            loadHandouts();
        }
    }, [isAdmin]);

    const loadHandouts = async () => {
        setIsLoading(true);
        const data = await handoutService.getHandouts();
        setHandouts(data);
        setIsLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (currentHandout.id) {
                await handoutService.updateHandout(currentHandout.id, currentHandout);
                alert('Material atualizado com sucesso!');
            } else {
                await handoutService.createHandout(currentHandout as Omit<Handout, 'id'>);
                alert('Material criado com sucesso!');
            }
            setIsEditing(false);
            setCurrentHandout({
                category: Category.CONCURSOS,
                pages: 0,
                year: new Date().getFullYear(),
                rating: 5.0
            });
            loadHandouts();
        } catch (error) {
            alert('Erro ao salvar material.');
        }
    };

    const handleEdit = (handout: Handout) => {
        setCurrentHandout(handout);
        setIsEditing(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Tem certeza que deseja excluir este material?')) {
            try {
                await handoutService.deleteHandout(id);
                loadHandouts();
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
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Categoria</label>
                            <select
                                value={currentHandout.category}
                                onChange={e => setCurrentHandout({ ...currentHandout, category: e.target.value as Category })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                            >
                                {Object.values(Category).map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
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
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Link da Miniatura (URL)</label>
                            <input
                                value={currentHandout.thumbnail || ''}
                                onChange={e => setCurrentHandout({ ...currentHandout, thumbnail: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                                placeholder="https://exemplo.com/imagem.jpg"
                            />
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
                                className="px-12 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                            >
                                {isEditing ? 'Salvar Alterações' : 'Adicionar Material'}
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
                                                <div className="text-xs text-indigo-600 font-medium">{h.category}</div>
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
            </div>
        </div>
    );
};

export default AdminDashboard;
