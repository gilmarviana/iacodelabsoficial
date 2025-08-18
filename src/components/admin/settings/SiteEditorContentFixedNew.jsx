import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

const SiteEditorContentFixed = () => {
  const [activeSection, setActiveSection] = useState('cases');
  const [siteData, setSiteData] = useState({
    cases: {
      title: 'Casos de Sucesso Comprovados',
      subtitle: 'Projetos que transformaram negócios e geraram resultados extraordinários.',
      items: [
        {
          id: 1,
          title: 'E-commerce Inteligente',
          company: 'Fashion Store',
          description: 'Plataforma de e-commerce com recomendações por IA.',
          technologies: ['React', 'Node.js', 'Python', 'TensorFlow'],
          results: ['150% aumento nas vendas', '80% redução no tempo de busca'],
          image: '/api/placeholder/600/400',
          category: 'E-commerce'
        }
      ]
    }
  });

  const updateSiteData = (section, data) => {
    setSiteData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Editor de Casos de Sucesso</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Título da Seção</label>
              <Input
                value={siteData.cases?.title || ''}
                onChange={(e) => updateSiteData('cases', { 
                  ...siteData.cases, 
                  title: e.target.value 
                })}
                placeholder="Ex: Casos de Sucesso Comprovados"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Subtítulo</label>
              <Textarea
                value={siteData.cases?.subtitle || ''}
                onChange={(e) => updateSiteData('cases', { 
                  ...siteData.cases, 
                  subtitle: e.target.value 
                })}
                placeholder="Descrição da seção"
                rows={2}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">Casos de Sucesso</h4>
                <Button size="sm">
                  Adicionar Caso
                </Button>
              </div>

              {siteData.cases?.items && siteData.cases.items.length > 0 ? (
                <div className="space-y-4">
                  {siteData.cases.items.map((item, index) => (
                    <Card key={item.id || index} className="p-4">
                      <div>
                        <h5 className="font-medium">{item.title}</h5>
                        <p className="text-sm text-gray-600">{item.company}</p>
                        <p className="text-sm">{item.description}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>Nenhum caso de sucesso adicionado ainda.</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteEditorContentFixed;
