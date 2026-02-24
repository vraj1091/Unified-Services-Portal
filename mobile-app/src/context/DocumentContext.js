import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DocumentContext = createContext();
const DOCUMENTS_STORAGE_KEY = 'gujarat_portal_documents_v1';

export const useDocuments = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocuments must be used within DocumentProvider');
  }
  return context;
};

export const DocumentProvider = ({ children }) => {
  const [documents, setDocuments] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;

    const loadDocuments = async () => {
      try {
        const stored = await AsyncStorage.getItem(DOCUMENTS_STORAGE_KEY);
        if (!stored || !mounted) {
          setIsLoaded(true);
          return;
        }

        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setDocuments(parsed);
        }
      } catch (error) {
        // Keep app usable even if persisted data is corrupted or storage fails.
      } finally {
        if (mounted) {
          setIsLoaded(true);
        }
      }
    };

    loadDocuments();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const persistDocuments = async () => {
      try {
        await AsyncStorage.setItem(DOCUMENTS_STORAGE_KEY, JSON.stringify(documents));
      } catch (error) {
        // No-op: avoid blocking UI if persistence fails.
      }
    };

    persistDocuments();
  }, [documents, isLoaded]);

  const addDocument = (document) => {
    const newDoc = {
      id: document.id || Date.now(),
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
    isLoaded,
  };

  return (
    <DocumentContext.Provider value={value}>
      {children}
    </DocumentContext.Provider>
  );
};
