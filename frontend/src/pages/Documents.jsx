import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { Upload, FileText, Check, X, ArrowLeft, Home, Trash2, Edit, Download } from 'lucide-react';

const Documents = () => {
  const navigate = useNavigate();
  const DOCS_CACHE_KEY = 'documents_cache_v1';
  const [documents, setDocuments] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('aadhaar');

  const docTypes = [
    { value: 'aadhaar', label: 'Aadhaar Card' },
    { value: 'pan', label: 'PAN Card' },
    { value: 'electricity_bill', label: 'Electricity Bill' },
    { value: 'gas_bill', label: 'Gas Bill' },
    { value: 'water_bill', label: 'Water Bill' },
    { value: 'property_paper', label: 'Property Paper' },
    { value: 'other', label: 'Other' }
  ];

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users/documents');
      const safeDocuments = Array.isArray(response.data) ? response.data : [];
      setDocuments(safeDocuments);
      localStorage.setItem(DOCS_CACHE_KEY, JSON.stringify(safeDocuments));
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Failed to fetch documents', error?.message || error);
      }
      const cached = localStorage.getItem(DOCS_CACHE_KEY);
      if (cached) {
        try {
          setDocuments(JSON.parse(cached));
        } catch {
          setDocuments([]);
        }
      } else {
        setDocuments([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      await api.post(`/users/documents/upload?doc_type=${selectedType}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      fetchDocuments();
      alert('✓ Document uploaded successfully!');
    } catch (error) {
      console.error('Upload failed');
      alert('✗ Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (docId, fileName) => {
    if (!window.confirm(`Are you sure you want to delete "${fileName}"?`)) {
      return;
    }

    try {
      await api.delete(`/users/documents/${docId}`);
      fetchDocuments();
      alert('✓ Document deleted successfully!');
    } catch (error) {
      console.error('Delete failed');
      alert('✗ Delete failed. Please try again.');
    }
  };

  const handleDownload = async (docId, fileName) => {
    try {
      const response = await api.get(`/users/documents/${docId}/download`, {
        responseType: 'blob'
      });
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      alert('✓ Document downloaded successfully!');
    } catch (error) {
      console.error('Download failed:', error);
      alert('✗ Download failed. Please try again or re-upload the document.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Button & Breadcrumb */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-blue-600 flex items-center gap-1">
              <Home className="w-3 h-3" />
              Dashboard
            </Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">My Documents</span>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-800">My Documents</h2>

      {/* Upload Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h3 className="font-semibold text-gray-800 mb-4">Upload New Document</h3>
        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-gray-700 mb-2">Document Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              {docTypes.map((type) => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Select File</label>
            <input
              type="file"
              onChange={handleUpload}
              accept=".pdf,.jpg,.jpeg,.png"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              disabled={uploading}
            />
          </div>
          {uploading && <span className="text-blue-600">Uploading...</span>}
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Upload your documents to enable auto-fill. Supported: PDF, JPG, PNG
        </p>
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Uploaded Documents</h3>
        {loading ? (
          <p className="text-gray-500">Loading documents...</p>
        ) : documents.length === 0 ? (
          <p className="text-gray-500">No documents uploaded yet</p>
        ) : (
          <div className="space-y-3">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-800">{doc.file_name}</p>
                    <p className="text-sm text-gray-500">
                      {docTypes.find(t => t.value === doc.doc_type)?.label || doc.doc_type}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {doc.is_verified ? (
                    <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                      <Check className="w-4 h-4" /> Verified
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-blue-600 text-sm font-medium">
                      <Check className="w-4 h-4" /> Uploaded
                    </span>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleDownload(doc.id, doc.file_name)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(doc.id, doc.file_name)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Documents;
