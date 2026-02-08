import React from 'react';

const Privacy: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <div className="bg-white border-b border-slate-200 py-12 md:py-16">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">Privacidade</h1>
                    <p className="text-slate-500 text-lg">Última atualização: Fevereiro de 2026</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200 space-y-8">
                    <section>
                        <h2 className="text-xl font-bold text-slate-800 mb-4">1. Coleta de Informações</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Coletamos seu endereço de e-mail quando você se cadastra em nossa plataforma para fornecer acesso aos materiais e enviar atualizações relevantes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-800 mb-4">2. Uso das Informações</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Suas informações são usadas exclusivamente para gerenciar sua conta, personalizar sua experiência de estudo e melhorar nossos serviços. Não compartilhamos seus dados pessoais com terceiros.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-800 mb-4">3. Segurança</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Implementamos medidas de segurança para proteger suas informações contra acesso não autorizado, alteração ou destruição.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-800 mb-4">4. Cookies</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Utilizamos cookies para melhorar a navegação e entender como você utiliza nosso site. Você pode desativar os cookies nas configurações do seu navegador.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
