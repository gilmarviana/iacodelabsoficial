import React from 'react';

const SiteEditorContentTest = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Editor de Site - Teste</h1>
      <p className="text-gray-600">Este é um componente de teste para verificar se a renderização está funcionando.</p>
      
      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded">
        <h2 className="text-lg font-semibold">Status do Componente</h2>
        <p>✅ Componente carregou com sucesso</p>
        <p>✅ Renderização está funcionando</p>
      </div>
      
      <div className="mt-4">
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => alert('Botão funcionando!')}
        >
          Testar Funcionalidade
        </button>
      </div>
    </div>
  );
};

export default SiteEditorContentTest;
