import React from 'react';

const Terms: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <div className="bg-white border-b border-slate-200 py-12 md:py-16">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">Termos de Uso</h1>
                    <p className="text-slate-500 text-lg">Última atualização: Fevereiro de 2026</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200 space-y-8">
                    <section>
                        <h2 className="text-xl font-bold text-slate-800 mb-4">1. Aceitação dos Termos</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Ao acessar e usar o EstudeApostilas, você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, você não deve usar nossa plataforma.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-800 mb-4">2. Uso do Conteúdo</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Todo o conteúdo disponibilizado no EstudeApostilas é para fins educacionais e informativos. Os materiais são gratuitos e não podem ser vendidos ou redistribuídos para fins comerciais sem autorização prévia.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-800 mb-4">3. Responsabilidades</h2>
                        <p className="text-slate-600 leading-relaxed">
                            O EstudeApostilas não se responsabiliza pela precisão, integridade ou utilidade dos materiais fornecidos por terceiros. O uso dos materiais é de inteira responsabilidade do usuário.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-800 mb-4">4. Modificações</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Reservamo-nos o direito de modificar estes termos a qualquer momento. Alterações entrarão em vigor imediatamente após a publicação no site.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Terms;
