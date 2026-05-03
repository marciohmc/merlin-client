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
    connect: "./merlin-client -url https://seu-servidor-c2.onrender.com",
    permissions: "chmod +x merlin-client",
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 font-sans p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-500" />
              Merlin C2 Deployer
            </h1>
            <p className="text-gray-400 mt-2">Configurado para Render.com (Planos de 512MB RAM)</p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-medium rounded-full border border-green-500/20">
              Pronto para Deploy
            </span>
          </div>
        </header>

        {/* Status & Instructions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#111111] border border-gray-800 p-6 rounded-xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-semibold text-white">Próximos Passos</h2>
            </div>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex gap-2">
                <span className="text-blue-500 font-bold">1.</span>
                Suba estes arquivos para o seu GitHub/GitLab.
              </li>
              <li className="flex gap-2">
                <span className="text-blue-500 font-bold">2.</span>
                No Render, crie um "Web Service" apontando para o repositório.
              </li>
              <li className="flex gap-2">
                <span className="text-blue-500 font-bold">3.</span>
                Aguarde o status <span className="text-green-400">"Live"</span>.
              </li>
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#111111] border border-gray-800 p-6 rounded-xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <Terminal className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg font-semibold text-white">Render Shell</h2>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Use a aba "Shell" no painel do Render para interagir com o cliente:
            </p>
            <div className="space-y-4">
              <div className="relative group">
                <div className="text-[10px] uppercase text-gray-500 mb-1 font-mono">Comando de Conexão</div>
                <div className="bg-black p-3 rounded-lg border border-gray-800 font-mono text-xs flex justify-between items-center group-hover:border-blue-500/50 transition-colors">
                  <code className="text-blue-400 truncate pr-8">{commands.connect}</code>
                  <button 
                    onClick={() => copyToClipboard(commands.connect, 'connect')}
                    className="absolute right-2 p-1 hover:bg-gray-800 rounded transition-colors"
                  >
                    {copied === 'connect' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-500" />}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Important Notes */}
        <div className="bg-blue-500/5 border border-blue-500/20 p-4 rounded-lg text-sm text-blue-200">
          <strong>Aviso:</strong> O sistema de arquivos do Render é efêmero. 
          As chaves do servidor e o histórico serão perdidos se o container for reiniciado. 
          Use para laboratórios rápidos ou ambientes controlados.
        </div>
      </div>
    </div>
  );
}
