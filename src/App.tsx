import React, { useState, useEffect, useRef } from 'react';
import { Shield, Terminal, TerminalSquare, ChevronRight, Globe, AlertCircle, CheckCircle2, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const BOOT_LOGS = [
  "[SYSTEM] Merlin v2.1.4 Initializing...",
  "[OK] Kernel modules loaded: x86_64",
  "[OK] Network stack established (0.0.0.0:$PORT)",
  "[INFO] Compiling Merlin Server from source...",
  "[INFO] gRPC server preparing on port 50051",
  "[WARN] Data persistence disabled (RENDER_FREE_TIER)",
  "[OK] ttyd Web Terminal Bridge READY",
  "[SYSTEM] AUTH_KEY: ****************",
  "=========================================",
  "DIGITE 'HELP' PARA VER OS COMANDOS OU 'START' PARA O CONSOLE",
];

export default function App() {
  const [logs, setLogs] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isBooting, setIsBooting] = useState(true);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < BOOT_LOGS.length) {
        setLogs(prev => [...prev, BOOT_LOGS[index]]);
        index++;
      } else {
        clearInterval(interval);
        setIsBooting(false);
      }
    }, 150);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputValue.toLowerCase().trim();
    if (!cmd) return;

    setLogs(prev => [...prev, `> ${inputValue}`]);
    setInputValue("");

    setTimeout(() => {
      switch (cmd) {
        case 'help':
          setLogs(prev => [...prev, 
            "COMANDOS DISPONÍVEIS:",
            " - start: Abre o console interativo do Merlin",
            " - status: Verifica o estado do servidor C2",
            " - clear: Limpa os logs da tela",
            " - about: Informações sobre o projeto"
          ]);
          break;
        case 'start':
          setLogs(prev => [...prev, "[!] Redirecionando para o Console Web..."]);
          window.open("https://merlin-client-w1hb.onrender.com/", "_blank");
          break;
        case 'status':
          setLogs(prev => [...prev, "[OK] Servidor: Ativo", "[OK] Porta: Dinâmica", "[OK] SSL: Habilitado"]);
          break;
        case 'clear':
          setLogs([]);
          break;
        case 'about':
          setLogs(prev => [...prev, "Merlin Web Console v2.1.4", "Powered by Google AI Studio & Render.com"]);
          break;
        default:
          setLogs(prev => [...prev, `[ERR] Comando não reconhecido: ${cmd}`]);
      }
    }, 200);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-green-500 font-mono p-4 md:p-10 selection:bg-green-500/30 selection:text-green-200">
      <div className="max-w-4xl mx-auto border border-green-900/30 rounded-lg shadow-2xl shadow-green-500/5 bg-black/50 overflow-hidden flex flex-col h-[80vh]">
        
        {/* Header bar */}
        <div className="bg-[#111] border-b border-green-900/30 p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-500" />
            <span className="text-xs font-bold tracking-widest uppercase opacity-70">Merlin Cloud Terminal</span>
          </div>
          <div className="flex gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 blur-[1px]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/40 blur-[1px]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 blur-[2px] animate-pulse"></div>
          </div>
        </div>

        {/* Console Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1 text-sm md:text-base">
          <AnimatePresence>
            {logs.map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={log.startsWith('>') ? "text-blue-400 mt-4 mb-2" : log.startsWith('[ERR]') ? "text-red-500" : ""}
              >
                {log}
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={terminalEndRef} />
        </div>

        {/* Input Area */}
        {!isBooting && (
          <form onSubmit={handleCommand} className="bg-[#0a0a0a] border-t border-green-900/30 p-4 flex items-center gap-3">
            <ChevronRight className="w-5 h-5 text-green-500 animate-pulse" />
            <input 
              autoFocus
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="bg-transparent border-none outline-none flex-1 text-green-400 placeholder:text-green-900"
              placeholder="Digite um comando..."
            />
          </form>
        )}
      </div>

      {/* Stats/Footer */}
      <div className="max-w-4xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border border-green-900/20 rounded p-3 bg-black/40 flex items-center gap-3">
          <div className="p-2 bg-green-500/5 rounded text-green-500">
            <Globe className="w-4 h-4" />
          </div>
          <div className="text-[10px]">
            <p className="opacity-50 uppercase">Network</p>
            <p className="font-bold">RENDER SSL ACTIVE</p>
          </div>
        </div>
        <div className="border border-green-900/20 rounded p-3 bg-black/40 flex items-center gap-3">
          <div className="p-2 bg-blue-500/5 rounded text-blue-500">
            <TerminalSquare className="w-4 h-4" />
          </div>
          <div className="text-[10px]">
            <p className="opacity-50 uppercase">Console Bridge</p>
            <p className="font-bold text-blue-400">ttyd v1.7.3</p>
          </div>
        </div>
        <div className="border border-green-900/20 rounded p-3 bg-black/40 flex items-center gap-3">
          <div className="p-2 bg-purple-500/5 rounded text-purple-500">
            <Cpu className="w-4 h-4" />
          </div>
          <div className="text-[10px]">
            <p className="opacity-50 uppercase">Infrastructure</p>
            <p className="font-bold">MULTI-STAGE DOCKER</p>
          </div>
        </div>
      </div>
    </div>
  );
}

