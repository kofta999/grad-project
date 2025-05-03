'use client';
import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/client';
import { ThesisStudentView } from '@/components/student/thesis-student-view';
import { ThesisSubmitForm } from '@/components/student/thesis-submit-form';
import type { ThesisStatusResponse, ThesisResponse } from '@/lib/types';

export default function ThesisPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [thesisData, setThesisData] = useState<ThesisResponse | null>(null);
  const [status, setStatus] = useState<ThesisStatusResponse | null>(null);
  const [error, setError] = useState('');

  const extractErrorMessage = (data: unknown): string => {
    if (typeof data === 'string') return data;
    if (data && typeof data === 'object') {
      if ('reason' in data && typeof data.reason === 'string') return data.reason;
      if ('message' in data && typeof data.message === 'string') return data.message;
      if ('error' in data && typeof data.error === 'string') return data.error;
    }
    return 'حدث خطأ غير متوقع';
  };

  const fetchThesisData = async () => {
    try {
      setIsLoading(true);
      setError('');

      // thesis status
      const statusResponse = await apiClient.students.me.thesis.status.$get();
      
      if (!statusResponse.ok) {
        const errorData = await statusResponse.json();
        throw new Error(extractErrorMessage(errorData));
      }

      const statusData = await statusResponse.json() as ThesisStatusResponse;
      setStatus(statusData);

      if (statusData.available) {
        const thesisResponse = await apiClient.students.me.thesis.$get();
        
        if (!thesisResponse.ok) {
          const errorData = await thesisResponse.json();
          throw new Error(extractErrorMessage(errorData));
        }

        const thesis = await thesisResponse.json() as ThesisResponse;
        setThesisData(thesis);
      } else {
        setError(extractErrorMessage(statusData));
      }
    } catch (err) {
      setError(extractErrorMessage(err));
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchThesisData();
  }, []);

  const handleSubmissionSuccess = (newThesis: ThesisResponse) => {
    setThesisData(newThesis);
    setError('');
  };

  if (isLoading) {
    return <div className="text-center py-8">جاري التحميل...</div>;
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
        <h3 className="font-bold mb-2">التقديم غير متاح</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {thesisData ? (
        <ThesisStudentView thesis={thesisData} />
      ) : (
        <ThesisSubmitForm onSubmissionSuccess={handleSubmissionSuccess} />
      )}
    </div>
  );
}

