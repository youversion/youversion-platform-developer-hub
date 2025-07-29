import React, { useState } from 'react';

interface PageBannerProps {
  message: string;
  color?: 'note' | 'tip' | 'info' | 'caution' | 'danger';
  dismissible?: boolean;
  className?: string;
}

interface IssueFormData {
  name: string;
  email: string;
  subject: string;
  description: string;
  pageUrl: string;
}

const colorClasses = {
  note: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200',
  tip: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200',
  info: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200',
  caution: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200',
  danger: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200'
};

export const PageBanner: React.FC<PageBannerProps> = ({
  message,
  color = 'info',
  dismissible = true,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [showIssueForm, setShowIssueForm] = useState(false);
  const [formData, setFormData] = useState<IssueFormData>({
    name: '',
    email: '',
    subject: '',
    description: '',
    pageUrl: typeof window !== 'undefined' ? window.location.href : ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  if (!isVisible) {
    return null;
  }

  const handleSubmitIssue = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Create mailto link with form data
      const mailtoLink = `mailto:tim.watson@youversion.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Page URL: ${formData.pageUrl}\n\n` +
        `Description:\n${formData.description}`
      )}`;

      // Open default email client
      window.open(mailtoLink, '_blank');
      
      setSubmitMessage('Email client opened successfully!');
      setTimeout(() => {
        setShowIssueForm(false);
        setSubmitMessage('');
      }, 2000);
    } catch (error) {
      setSubmitMessage('Error opening email client. Please email tim.watson@youversion.com directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <div className={`border rounded-lg p-4 mb-6 ${colorClasses[color]} ${className}`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium">{message}</p>
          </div>
          <div className="ml-4 flex items-center space-x-2">
            <button
              onClick={() => setShowIssueForm(true)}
              className="text-xs px-2 py-1 bg-white/20 hover:bg-white/30 rounded border transition-colors"
              title="Submit issue with this page"
            >
              Report Issue
            </button>
            {dismissible && (
              <button
                onClick={() => setIsVisible(false)}
                className="flex-shrink-0 text-lg font-bold opacity-70 hover:opacity-100 transition-opacity"
                aria-label="Dismiss banner"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Issue Form Overlay */}
      {showIssueForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Submit Issue</h3>
                <button
                  onClick={() => setShowIssueForm(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmitIssue} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="Brief description of the issue"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-1">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    placeholder="Please describe the issue in detail..."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white resize-none"
                  />
                </div>

                {submitMessage && (
                  <div className={`p-3 rounded-md text-sm ${
                    submitMessage.includes('Error') 
                      ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300' 
                      : 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300'
                  }`}>
                    {submitMessage}
                  </div>
                )}

                <div className="flex space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowIssueForm(false)}
                    className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Issue'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}; 