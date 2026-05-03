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
              <Shield className="w-8 h-8 text-green-500" />
              Merlin Agent Auto-Deploy
            </h1>
            <p className="text-gray-400 mt-2">Compilação Nativa • Zero Config • 512MB RAM</p>
          </div>
          <div className="flex gap-2 text-[10px] items-center">
            <div className="flex items-center gap-1 text-green-400 border border-green-500/20 px-2 py-1 bg-green-500/5 rounded">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span>
              MODO AUTOMÁTICO ATIVO
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
              <h3 className="font-semibold text-white">GitHub Sync</h3>
              <p className="text-xs text-gray-500 mt-1">O Render vai baixar o código do repositório Ne0nd0g/merlin-agent e compilar automaticamente.</p>
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
              <h3 className="font-semibold text-white">Variável de URL</h3>
              <p className="text-xs text-gray-500 mt-1">Adicione a variável <code className="text-purple-400 font-mono">MERLIN_URL</code> no Render com a URL do seu C2.</p>
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
              <h3 className="font-semibold text-white">Auto-Run</h3>
              <p className="text-xs text-gray-500 mt-1">O Agente iniciará sozinho assim que o deploy terminar e o healthcheck responder.</p>
            </div>
          </motion.div>
        </div>

        {/* Console Interactive */}
        <div className="bg-[#111111] border border-gray-800 rounded-xl overflow-hidden mb-8">
          <div className="bg-[#1a1a1a] px-4 py-2 border-b border-gray-800 flex items-center justify-between">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/20"></div>
            </div>
            <span className="text-[10px] font-mono text-gray-500 text-center">O navegador mostrará apenas "SAÚDE OK". Use o Shell abaixo:</span>
          </div>
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-gray-500 font-mono text-center">
                <span>COMANDO PARA RODAR NO SHELL DO RENDER</span>
                {copied === 'connect' && <span className="text-green-500 text-[10px]">Copiado!</span>}
              </div>
              <div 
                onClick={() => copyToClipboard("./merlin-server", 'connect')}
                className="bg-black p-4 rounded-lg border border-gray-800 hover:border-green-500/30 cursor-pointer transition-all group relative"
              >
                <code className="text-green-400 text-xs font-mono">./merlin-server</code>
                <Copy className="w-4 h-4 text-gray-600 absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between text-[11px] text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Check className="w-3 h-3 text-blue-500" /> Dockerfile Automatizado</span>
            <span className="flex items-center gap-1"><Check className="w-3 h-3 text-blue-500" /> Healthcheck.py Incluso</span>
          </div>
          <div className="text-right">
            v2.1.4 Stable • Powered by Google AI Studio
          </div>
        </div>
      </div>
    </div>
  );
}
