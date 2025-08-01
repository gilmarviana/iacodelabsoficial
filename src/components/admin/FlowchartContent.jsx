
import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from 'lucide-react';
import mermaid from 'mermaid';

const Excalidraw = lazy(() => import('@excalidraw/excalidraw').then(module => ({ default: module.Excalidraw })));

const MermaidDiagram = () => {
    const [diagram, setDiagram] = useState(`
graph TD
    A[Início] --> B{Decisão};
    B -- Sim --> C[Processo 1];
    B -- Não --> D[Processo 2];
    C --> E[Fim];
    D --> E;
    `);
    const mermaidRef = useRef(null);

    useEffect(() => {
        mermaid.initialize({ startOnLoad: false, theme: 'default' });
        if (mermaidRef.current) {
            try {
                mermaid.render('mermaid-diagram', diagram, (svgCode) => {
                    mermaidRef.current.innerHTML = svgCode;
                });
            } catch (e) {
                console.error(e);
            }
        }
    }, [diagram]);

    return (
        <div className="flex flex-col h-full gap-4">
            <textarea
                className="w-full h-1/4 p-2 border rounded-md font-mono bg-card"
                value={diagram}
                onChange={(e) => setDiagram(e.target.value)}
            />
            <div className="flex-grow border rounded-md p-4 overflow-auto bg-card" ref={mermaidRef}>
                <div id="mermaid-diagram" />
            </div>
        </div>
    );
};

const ExcalidrawDiagram = () => {
    return (
        <div style={{ height: "100%" }}>
            <Suspense fallback={<div className="w-full h-full flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin" /> Carregando Excalidraw...</div>}>
                <Excalidraw />
            </Suspense>
        </div>
    );
};

const FlowchartContent = () => {
    return (
        <div className="h-full flex flex-col">
            <div className="flex-shrink-0 mb-4">
                <h2 className="text-2xl font-bold">Fluxograma</h2>
                <p className="text-muted-foreground">Crie e visualize diagramas e fluxogramas.</p>
            </div>
            <Tabs defaultValue="mermaid" className="flex-grow flex flex-col">
                <TabsList className="mb-4">
                    <TabsTrigger value="mermaid">Mermaid</TabsTrigger>
                    <TabsTrigger value="excalidraw">Excalidraw</TabsTrigger>
                </TabsList>
                <TabsContent value="mermaid" className="flex-grow">
                    <MermaidDiagram />
                </TabsContent>
                <TabsContent value="excalidraw" className="flex-grow">
                    <ExcalidrawDiagram />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default FlowchartContent;
