import React, { createContext, useContext, useState } from 'react';

const DocumentContext = createContext();

export const useDocuments = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocuments must be used within DocumentProvider');
  }
  return context;
};

export const DocumentProvider = ({ children }) => {
  // Start with EMPTY array - no documents until user uploads
  const [documents, setDocuments] = useState([]);

  const addDocument = (document) => {
    const newDoc = {
      id: Date.now(),
      name: document.name,
      category: document.category || 'other',
      type: document.type || 'PDF',
      size: document.size || '0 MB',
      uploadedDate: new Date().toISOString().split('T')[0],
      uploadedTime: new Date().toLocaleString(),
      source: document.source || 'manual',
      serviceType: document.serviceType || null,
      provider: document.provider || null,
      fileData: document.fileData || null,
      fileType: document.fileType || null,
      uri: document.uri || null,
    };
    setDocuments(prev => [newDoc, ...prev]);
    return newDoc;
  };

  const removeDocument = (docId) => {
    setDocuments(prev => prev.filter(doc => doc.id !== docId));
  };

  const getDocumentsByCategory = (category) => {
    if (category === 'all') return documents;
    return documents.filter(doc => doc.category === category);
  };

  const value = {
    documents,
    addDocument,
    removeDocument,
    getDocumentsByCategory,
  };

  return (
    <DocumentContext.Provider value={value}>
      {children}
    </DocumentContext.Provider>
  );
};
