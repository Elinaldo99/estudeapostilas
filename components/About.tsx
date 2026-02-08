import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
    return (
        <div className="min-h-screen bg-white">
            <div className="bg-indigo-700 py-16 md:py-24 text-white">
                <div className="container mx-auto px-4 text-center max-w-7xl">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6">Sobre Nós</h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto font-light">
                        Nossa missão é democratizar o acesso à educação de qualidade através da disponibilização de materiais gratuitos.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <div className="space-y-12">
                    <section>
                        <h2 className="text-3xl font-bold text-slate-800 mb-6">Quem Somos</h2>
                        <p className="text-slate-600 leading-relaxed text-lg">
                            EstudeApostilas nasceu da vontade de ajudar estudantes de todo o Brasil a alcançarem seus objetivos. Acreditamos que o conhecimento deve ser livre e acessível a todos, independentemente de sua condição financeira.
                        </p>
                    </section>

                    <section className="grid md:grid-cols-2 gap-8">
                        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                            <h3 className="text-xl font-bold text-indigo-600 mb-4">Nossa Missão</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Providenciar materiais de estudo de alta qualidade, selecionados por especialistas, de forma totalmente gratuita e organizada.
                            </p>
                        </div>
                        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                            <h3 className="text-xl font-bold text-indigo-600 mb-4">Nossa Visão</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Tornar-se a maior e mais confiável biblioteca digital de materiais de estudo do Brasil, impactando milhões de estudantes.
                            </p>
                        </div>
                    </section>

                    <section className="text-center py-12">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6">Pronto para começar?</h2>
                        <Link to="/" className="inline-block bg-indigo-600 text-white font-bold px-8 py-4 rounded-full hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">
                            Explorar Materiais
                        </Link>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default About;
