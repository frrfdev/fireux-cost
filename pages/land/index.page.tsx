import { useState } from 'react';
import { Playground } from '../index/playground';

function Page() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email to your backend/database
    console.log('Email collected:', email);
    // TODO: Implement email collection logic
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-gradient-to-t from-orange-600/50 to-orange-500/50 backdrop-blur-[1px]" />

        {/* Floating shapes */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />

        {/* Content */}
        <div className="relative pt-20 pb-24 container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block text-white px-4 py-2 bg-gradient-to-r from-orange-800/80 to-orange-700/80 backdrop-blur-sm rounded-full text-sm font-semibold mb-6 shadow-lg border border-orange-600/20">
              🚀 Em breve - Fase de Lançamento
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-8 text-white drop-shadow-md">
              Chega de perder dinheiro com preços mal calculados
            </h1>
            <div className="space-y-6 max-w-2xl mx-auto">
              <p className="text-2xl text-orange-50 font-medium">
                Descubra o custo real dos seus produtos e aumente sua margem de
                lucro
              </p>
              <div className="relative">
                <p className="text-lg bg-gradient-to-r from-orange-900/40 to-orange-800/40 backdrop-blur-sm rounded-lg p-6 border border-orange-500/20 shadow-xl text-orange-50">
                  ⭐ Automatize seus cálculos, elimine planilhas complexas e
                  foque no que realmente importa:
                  <span className="block mt-2 font-medium">
                    criar produtos incríveis que vendem mais
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="bg-gradient-to-br from-neutral-700 to-neutral-800 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Uma nova forma de calcular seus custos está chegando
            </h2>
            <div className="bg-gradient-to-r from-white/40 to-white/70 backdrop-blur-sm rounded-lg p-6 border border-neutral-500/20 shadow-xl">
              <p className="text-xl text-neutral-50 mb-4">
                ✨ Seja notificado quando lançarmos:
              </p>
              <ul className="text-orange-50 text-lg space-y-2">
                <li>📱 App completo para gestão de custos</li>
                <li>🎯 Cálculos precisos e automatizados</li>
                <li>💡 Interface intuitiva e fácil de usar</li>
              </ul>
            </div>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu melhor e-mail"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 shadow-lg border border-orange-200/20"
                  required
                />
                <button
                  type="submit"
                  className="bg-orange-600 hover:bg-orange-900 px-6 py-3 rounded-lg font-medium text-white shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105"
                >
                  Quero Saber Primeiro
                </button>
              </div>
              <p className="text-sm mt-3 text-orange-100">
                Fique tranquilo, você será um dos primeiros a saber!
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Principais Funcionalidades
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                Gestão de Ingredientes
              </h3>
              <p>Cadastre e gerencie todos os ingredientes das suas receitas</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Cálculo Automático</h3>
              <p>Calcule custos automaticamente com base nos ingredientes</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                Receitas Detalhadas
              </h3>
              <p>Organize suas receitas com quantidades e custos precisos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Experimente Agora
          </h2>
          <div className="max-w-7xl h-max mx-auto bg-white rounded-lg shadow-lg p-6">
            <Playground />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-orange-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Pronto para revolucionar sua gestão de custos?
          </h2>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex gap-2 flex-col">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu melhor e-mail"
                className="flex-1 px-4 py-2 rounded-lg text-gray-900"
                required
              />
              <button
                type="submit"
                className="bg-orange-700 hover:bg-orange-800 px-6 py-2 rounded-lg font-medium"
              >
                Quero Saber Primeiro
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export { Page };
