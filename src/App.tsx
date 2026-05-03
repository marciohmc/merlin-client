import { Terminal, Shield, Globe, Copy, Check } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

export default function App() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const commands = {
    connect: "./merlin-agent -url https://seu-servidor-c2.onrender.com",
    envVar: "MERLIN_URL",
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 font-sans p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-500" />
              Merlin Web Console
            </h1>
            <p className="text-gray-400 mt-2">Acesso Direto via Navegador • Correção de Porta Dinâmica Aplicada</p>
          </div>
          <div className="flex gap-2 text-[10px] items-center">
            <div className="flex items-center gap-1 text-blue-400 border border-blue-500/20 px-2 py-1 bg-blue-500/5 rounded">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping"></span>
              WEB TERMINAL ATIVO
            </div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Step 1 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#111111] border border-gray-800 p-5 rounded-xl flex flex-col gap-3"
          >
            <div className="w-8 h-8 bg-blue-500/10 text-blue-500 flex items-center justify-center rounded-lg font-bold">1</div>
            <div>
              <h3 className="font-semibold text-white">Acesso Web</h3>
              <p className="text-xs text-gray-500 mt-1">Ao abrir o link do seu app no Render, o console do Merlin aparecerá automaticamente.</p>
            </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-[#111111] border border-gray-800 p-5 rounded-xl flex flex-col gap-3"
          >
            <div className="w-8 h-8 bg-purple-500/10 text-purple-500 flex items-center justify-center rounded-lg font-bold">2</div>
            <div>
              <h3 className="font-semibold text-white">Sem SSH</h3>
              <p className="text-xs text-gray-500 mt-1">Não é necessário usar terminal local ou comandos complexos.</p>
            </div>
          </motion.div>

          {/* Step 3 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-[#111111] border border-gray-800 p-5 rounded-xl flex flex-col gap-3"
          >
            <div className="w-8 h-8 bg-green-500/10 text-green-500 flex items-center justify-center rounded-lg font-bold">3</div>
            <div>
              <h3 className="font-semibold text-white">Persistência</h3>
              <p className="text-xs text-gray-500 mt-1">Lembre-se: no plano Free, os dados são apagados se o servidor reiniciar.</p>
            </div>
          </motion.div>
        </div>

        {/* Console Interactive */}
        <div className="bg-[#111111] border border-gray-800 rounded-xl overflow-hidden mb-8 shadow-2xl shadow-blue-500/5 text-center p-12">
          <Shield className="w-16 h-16 text-blue-500/20 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Web Console Habilitado</h2>
          <p className="text-sm text-gray-400 mb-6 font-mono">
            O terminal está sendo transmitido via HTTP (ttyd)
          </p>
          <a 
            href="https://merlin-client-w1hb.onrender.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all hover:scale-105 active:scale-95"
          >
            ABRIR MEU CONSOLE <Globe className="w-4 h-4" />
          </a>
        </div>

        {/* Footer Info */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between text-[11px] text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Check className="w-3 h-3 text-blue-500" /> Dockerfile Automatizado</span>
            <span className="flex items-center gap-1"><Check className="w-3 h-3 text-blue-500" /> Web Console (ttyd)</span>
          </div>
          <div className="text-right">
            Merlin v2.1.4 • Powered by Google AI Studio
          </div>
        </div>
      </div>
    </div>
  );
}
