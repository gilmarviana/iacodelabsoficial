import React, { useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ColumnForm = ({ onSave, initialData, onDismiss }) => {
    const [columnName, setColumnName] = useState(initialData?.title || '');
    const [status, setStatus] = useState(initialData?.status || 'Em produção');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (columnName.trim()) {
            onSave({ title: columnName.trim(), status });
        }
    };

    return (
        <DialogContent onEscapeKeyDown={onDismiss} onPointerDownOutside={onDismiss}>
            <DialogHeader>
                <DialogTitle>{initialData ? 'Editar Coluna' : 'Adicionar Nova Coluna'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
                <div>
                    <Label htmlFor="columnName">Nome da Coluna</Label>
                    <Input
                        id="columnName"
                        value={columnName}
                        onChange={(e) => setColumnName(e.target.value)}
                        placeholder="Ex: Em Homologação"
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="columnStatus">Status</Label>
                     <Select onValueChange={(value) => setStatus(value)} defaultValue={status}>
                        <SelectTrigger id="columnStatus">
                            <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Em produção">Em produção</SelectItem>
                            <SelectItem value="Concluído">Concluído</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <DialogFooter>
                    <Button type="button" variant="ghost" onClick={onDismiss}>Cancelar</Button>
                    <Button type="submit">{initialData ? 'Salvar Alterações' : 'Adicionar Coluna'}</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
};

export default ColumnForm;