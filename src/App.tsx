import React, { useState } from 'react';
import { DocumentUpload } from './components/DocumentUpload';
import { GPTResponse } from './components/GPTResponse';
import { DocumentList } from './components/DocumentList';
import { analyzeDocument } from './lib/openai';
import { saveDocument, getDocuments, Document } from './lib/documents';
import { DashboardView } from './components/DashboardView';
import { HistoricalAnalysis } from './components/HistoricalAnalysis';
import { ClerkPerformanceHistory } from './components/ClerkPerformanceHistory';
import { ChartBarIcon, DocumentTextIcon, ClockIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { SalesPerformanceTable } from './components/SalesPerformanceTable';
import { StaffPerformanceChart } from './components/StaffPerformanceChart';
import { CategoryBreakdown } from './components/CategoryBreakdown';
import { TopPerformers } from './components/TopPerformers';
import { ExecutiveSummary } from './components/ExecutiveSummary';

export default function App() {
  const [view, setView] = useState<'dashboard' | 'documents' | 'historical' | 'performance'>('dashboard');
  const [extractedText, setExtractedText] = useState('');
  const [gptResponse, setGptResponse] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  const mockData = {
    clerks: [
      {
        "clerk_id": "000-016",
        "name": "Emily",
        "total_sales": 2023.0,
        "items": [
          { "code": 40, "food_name": "Main Dish", "quantity": 94.0 },
          { "code": 28, "food_name": "Desserts", "quantity": 57.0 },
          { "code": 29, "food_name": "Burgers", "quantity": 84.0 },
          { "code": 26, "food_name": "Sides", "quantity": 210.0 },
          { "code": 27, "food_name": "Steak", "quantity": 170.0 },
          { "code": 19, "food_name": "Hot Beverages", "quantity": 81.0 },
          { "code": 12, "food_name": "Red Wine", "quantity": 291.0 },
          { "code": 13, "food_name": "White Wine", "quantity": 117.0 }
        ]
      },
      {
        "clerk_id": "000-051",
        "name": "Ali",
        "total_sales": 1020.0,
        "items": [
          { "code": 40, "food_name": "Main Dish", "quantity": 28.0 },
          { "code": 61, "food_name": "Breakfast", "quantity": 44.0 },
          { "code": 28, "food_name": "Desserts", "quantity": 15.0 }
        ]
      }
    ]
  };

  const handleDocumentUpload = async (text: string, file: File) => {
    setLoading(true);
    setError(null);
    try {
      const analysis = await analyzeDocument(text);
      const docId = await saveDocument(file, text, analysis);
      const updatedDocs = await getDocuments();
      setDocuments(updatedDocs);
      setGptResponse(analysis);
      setExtractedText(text);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentSelect = (doc: Document) => {
    setSelectedDocument(doc);
    setExtractedText(doc.content);
    setGptResponse(doc.analysis);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-900">Business Operations</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setView('dashboard')}
                className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                  view === 'dashboard'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <ChartBarIcon className="h-5 w-5 mr-2" />
                Dashboard
              </button>
              <button
                onClick={() => setView('performance')}
                className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                  view === 'performance'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <UserGroupIcon className="h-5 w-5 mr-2" />
                Clerk Performance
              </button>
              <button
                onClick={() => setView('historical')}
                className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                  view === 'historical'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <ClockIcon className="h-5 w-5 mr-2" />
                Historical
              </button>
              <button
                onClick={() => setView('documents')}
                className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                  view === 'documents'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <DocumentTextIcon className="h-5 w-5 mr-2" />
                Document Analysis
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {view === 'dashboard' && (
          <div className="space-y-6">
            <ExecutiveSummary />
            <SalesPerformanceTable data={mockData.clerks} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <StaffPerformanceChart data={mockData.clerks} />
              <CategoryBreakdown data={mockData.clerks} />
            </div>
            <TopPerformers data={mockData.clerks} />
          </div>
        )}
        {view === 'performance' && <ClerkPerformanceHistory data={mockData.clerks} />}
        {view === 'historical' && <HistoricalAnalysis />}
        {view === 'documents' && (
          <div className="space-y-6">
            <DocumentUpload 
              onTextExtracted={handleDocumentUpload}
              onError={setError}
            />
            <DocumentList 
              documents={documents}
              onSelect={handleDocumentSelect}
            />
            <GPTResponse 
              response={gptResponse}
              error={error}
              loading={loading}
            />
          </div>
        )}
      </main>
    </div>
  );
}