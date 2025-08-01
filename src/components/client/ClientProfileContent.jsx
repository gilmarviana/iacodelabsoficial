
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const ClientProfileContent = () => {
    const { user } = useAuth();
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        company: 'Cliente Demo Corp',
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleInfoChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({ ...prev, [name]: value }));
    };

    const handleInfoSubmit = (e) => {
        e.preventDefault();
        toast({ title: "Informações atualizadas!", description: "Seus dados foram salvos com sucesso." });
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast({ title: "Erro", description: "As novas senhas não coincidem.", variant: "destructive" });
            return;
        }
        toast({ title: "Senha alterada!", description: "Sua senha foi atualizada com sucesso." });
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold">Perfil</h2>
                <p className="text-muted-foreground">Gerencie suas informações pessoais e de segurança.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <form onSubmit={handleInfoSubmit}>
                        <CardHeader>
                            <CardTitle>Informações Pessoais</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nome</Label>
                                <Input id="name" name="name" value={formData.name} onChange={handleInfoChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" value={formData.email} onChange={handleInfoChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="company">Empresa</Label>
                                <Input id="company" name="company" value={formData.company} onChange={handleInfoChange} />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit">Salvar Alterações</Button>
                        </CardFooter>
                    </form>
                </Card>

                <Card>
                    <form onSubmit={handlePasswordSubmit}>
                        <CardHeader>
                            <CardTitle>Alterar Senha</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="currentPassword">Senha Atual</Label>
                                <Input id="currentPassword" name="currentPassword" type="password" value={passwordData.currentPassword} onChange={handlePasswordChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="newPassword">Nova Senha</Label>
                                <Input id="newPassword" name="newPassword" type="password" value={passwordData.newPassword} onChange={handlePasswordChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                                <Input id="confirmPassword" name="confirmPassword" type="password" value={passwordData.confirmPassword} onChange={handlePasswordChange} />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit">Alterar Senha</Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default ClientProfileContent;
