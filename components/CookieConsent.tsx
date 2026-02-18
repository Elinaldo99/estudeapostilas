import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CookieConsent: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            // Show banner with a slight delay for better UX
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookie-consent', 'essential');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 w-full z-[100] p-4 md:p-6 animate-in slide-in-from-bottom duration-500">
            <div className="container mx-auto max-w-7xl">
                <div className="bg-white/80 backdrop-blur-xl border border-slate-200 shadow-2xl rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4 text-center md:text-left">
                        <div className="bg-indigo-600/10 text-indigo-600 p-3 rounded-2xl hidden md:block">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.341A8.001 8.001 0 1111.999 4c1.233 0 2.408.279 3.457.778M11.999 4.004V4m0 0a8 8 0 018 8c0 .354-.023.702-.068 1.044m-5.49 1.41l.01.01M9 11h.01M15 11h.01M12 11h.01" />
                            </svg>
                        </div>
                        <div className="max-w-2xl">
                            <h3 className="text-lg font-bold text-slate-800 mb-1">Valorizamos sua privacidade</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Utilizamos cookies para melhorar sua experiência, analisar o tráfego do site e personalizar conteúdos.
                                Ao clicar em "Aceitar", você concorda com o uso de todos os cookies.
                                Saiba mais em nossa <Link to="/privacidade" className="text-indigo-600 hover:underline font-semibold">Política de Privacidade</Link>.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                        <button
                            onClick={handleDecline}
                            className="px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-2xl transition-all border border-slate-200"
                        >
                            Apenas Essenciais
                        </button>
                        <button
                            onClick={handleAccept}
                            className="px-8 py-3 bg-indigo-600 text-white text-sm font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                        >
                            Aceitar Todos
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
