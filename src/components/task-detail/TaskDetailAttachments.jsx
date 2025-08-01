
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { UploadCloud, FileText, Plus, X, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import RichTextEditor from '@/components/RichTextEditor';
import { Input } from '@/components/ui/input';

const DocumentEditorModal = ({ isOpen, onClose, onSave, initialData = {} }) => {
    const [content, setContent] = useState(initialData.content || '');
    const [title, setTitle] = useState(initialData.title || '');

    const handleSave = () => {
        if (title && content) {
            onSave({ title, content });
            onClose();
            setTitle('');
            setContent('');
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[825px] h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>{initialData.id ? 'Editar Documento' : 'Criar Novo Documento'}</DialogTitle>
                </DialogHeader>
                <div className="py-4 flex-grow flex flex-col gap-4">
                    <Input 
                        placeholder="Título do Documento" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                    />
                    <div className="flex-grow min-h-0">
                        <RichTextEditor value={content} onChange={setContent} />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="ghost" onClick={onClose}>Cancelar</Button>
                    <Button onClick={handleSave}>Salvar Anexo</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

const DocumentViewerModal = ({ isOpen, onClose, document }) => {
    if (!document) return null;
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[825px] h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>{document.name}</DialogTitle>
                    <DialogDescription>
                        Criado em: {new Date(document.createdAt).toLocaleString()}
                    </DialogDescription>
                </DialogHeader>
                <div className="prose dark:prose-invert flex-grow overflow-y-auto p-4 border rounded-md" dangerouslySetInnerHTML={{ __html: document.content }}></div>
                <DialogFooter>
                     <Button variant="outline" onClick={onClose}>Fechar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const TaskDetailAttachments = ({ attachments, onUpdate, isReadOnly }) => {
    const { toast } = useToast();
    const [isDocModalOpen, setIsDocModalOpen] = useState(false);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState(null);

    const onDrop = useCallback((acceptedFiles, fileRejections) => {
        if (isReadOnly) {
            toast({ title: "Ação não permitida", description: "Você não tem permissão para adicionar anexos.", variant: "destructive" });
            return;
        }
        const newFiles = acceptedFiles.map(file => ({
            id: `file-${Date.now()}-${Math.random()}`,
            name: file.name,
            size: file.size,
            type: 'file',
            url: URL.createObjectURL(file), 
            createdAt: new Date().toISOString(),
        }));

        if (newFiles.length > 0) {
            onUpdate([...attachments, ...newFiles]);
            toast({ title: `${newFiles.length} arquivo(s) anexado(s)!` });
        }

        fileRejections.forEach(rejection => {
            toast({
                title: "Arquivo Rejeitado",
                description: `O arquivo ${rejection.file.name} é muito grande. O limite é 50MB.`,
                variant: "destructive",
            });
        });
    }, [attachments, onUpdate, toast, isReadOnly]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        maxSize: 50 * 1024 * 1024, // 50MB
        disabled: isReadOnly,
    });

    const handleSaveDocument = ({ title, content }) => {
        const newDoc = {
            id: `doc-${Date.now()}`,
            name: `${title}.doc`,
            content: content,
            type: 'document',
            createdAt: new Date().toISOString(),
        };
        onUpdate([...attachments, newDoc]);
        toast({ title: "Documento salvo como anexo!" });
    };

    const handleRemoveAttachment = (id) => {
        if (isReadOnly) {
            toast({ title: "Ação não permitida", description: "Você não tem permissão para remover anexos.", variant: "destructive" });
            return;
        }
        onUpdate(attachments.filter(att => att.id !== id));
    };

    const handleViewAttachment = (att) => {
        if (att.type === 'document') {
            setSelectedDocument(att);
            setIsViewerOpen(true);
        } else if (att.url) {
            window.open(att.url, '_blank');
        } else {
             toast({ title: "Visualização não disponível", description: "Não é possível abrir este tipo de arquivo." });
        }
    }

    return (
        <div className="h-full flex flex-col gap-4">
            <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isReadOnly ? 'cursor-not-allowed bg-muted/50' : 'cursor-pointer'} ${isDragActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'}`}>
                <input {...getInputProps()} />
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <UploadCloud className="w-10 h-10" />
                    <p>Arraste e solte arquivos aqui, ou clique para selecionar</p>
                    <p className="text-xs">Tamanho máximo do arquivo: 50MB</p>
                </div>
            </div>
            <div className="flex justify-end">
                <Button onClick={() => setIsDocModalOpen(true)} disabled={isReadOnly}>
                    <Plus className="w-4 h-4 mr-2" /> Criar Documento
                </Button>
            </div>
            <div className="flex-grow overflow-y-auto space-y-2 pr-2">
                {attachments.map(att => (
                    <div key={att.id} className="flex items-center justify-between p-2 bg-muted rounded-md group">
                        <div className="flex items-center gap-3">
                            <FileText className="w-6 h-6 text-primary" />
                            <div>
                                <p className="font-medium">{att.name}</p>
                                <p className="text-xs text-muted-foreground">
                                    {att.type === 'file' ? `${(att.size / 1024 / 1024).toFixed(2)} MB` : 'Documento de Texto'} - {new Date(att.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <div>
                             <Button variant="ghost" size="icon" onClick={() => handleViewAttachment(att)}>
                                <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleRemoveAttachment(att.id)} disabled={isReadOnly}>
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
            <DocumentEditorModal 
                isOpen={isDocModalOpen}
                onClose={() => setIsDocModalOpen(false)}
                onSave={handleSaveDocument}
            />
            <DocumentViewerModal
                isOpen={isViewerOpen}
                onClose={() => setIsViewerOpen(false)}
                document={selectedDocument}
            />
        </div>
    );
};

export default TaskDetailAttachments;
