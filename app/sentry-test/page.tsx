"use client";

import * as Sentry from "@sentry/nextjs";

export default function SentryTestPage() {
  const testError = () => {
    throw new Error("This is a test error for Sentry!");
  };

  const testFeedback = () => {
    try {
      Sentry.showReportDialog({
        title: "Report a Bug",
        subtitle: "If you're experiencing issues, please let us know!",
        labelName: "Name",
        labelEmail: "Email",
        labelComments: "What happened?",
        labelSubmit: "Submit Bug Report",
        successMessage: "Thank you for your report!",
      });
    } catch (error) {
      console.log("Feedback dialog not available:", error);
      alert("Feedback dialog not available. Check console for details.");
    }
  };

  const testManualCapture = () => {
    Sentry.captureException(new Error("Manual test error"));
    alert("Manual error sent to Sentry!");
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Sentry Test Page</h1>
      
      <div className="space-y-4">
        <button 
          onClick={testError}
          className="bg-red-500 text-white px-4 py-2 rounded mr-4"
        >
          Trigger Error (Will crash page)
        </button>
        
        <button 
          onClick={testManualCapture}
          className="bg-orange-500 text-white px-4 py-2 rounded mr-4"
        >
          Send Manual Error
        </button>
        
        <button 
          onClick={testFeedback}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Open Feedback Dialog
        </button>
      </div>
      
      <div className="mt-8">
        <p>Check your browser console for Sentry debug logs.</p>
        <p>Go to your Sentry dashboard to see if errors are being captured.</p>
      </div>
    </div>
  );
}
