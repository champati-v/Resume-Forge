
import { useState } from "react";
import Navbar from "../components/Navbar";
import FileUpload from "../components/FileUpload";
import ResumeEditor from "../components/ResumeEditor";
import StickyActions from "../components/StickyActions";
import { useResume } from "../contexts/ResumeContext";

const Index = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { currentResume } = useResume();

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
  };

  const showEditor = uploadedFile || currentResume;

  return (
    <div className="min-h-screen w-screen bg-dark-bg">
      <Navbar />
      
      <main className="pt-24 pb-20 w-full">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Create Your Perfect Resume with{" "}
              <span className="bg-gradient-to-r from-accent-teal to-accent-blue bg-clip-text text-transparent">
                AI Power
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Upload your existing resume or start from scratch. Our AI will help you craft compelling content that stands out to employers.
            </p>
          </div>

          {/* File Upload Section */}
          {!currentResume && <FileUpload onFileUpload={handleFileUpload} hasFile={!!uploadedFile} />}

          {/* Resume Editor */}
          {showEditor ? (
            <div className="animate-fade-in">
              {uploadedFile && !currentResume && (
                <div className="mb-6 p-4 bg-dark-surface rounded-lg border border-dark-border">
                  <p className="text-sm text-muted-foreground">
                    Editing: <span className="text-accent-teal font-medium">{uploadedFile.name}</span>
                  </p>
                </div>
              )}
              {currentResume && (
                <div className="mb-6 p-4 bg-dark-surface rounded-lg border border-dark-border">
                  <p className="text-sm text-muted-foreground">
                    Editing: <span className="text-accent-teal font-medium">{currentResume.fullName || 'Untitled Resume'}</span>
                  </p>
                </div>
              )}
              <ResumeEditor />
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-dark-surface rounded-2xl p-6 sm:p-8 border border-dark-border">
                <h3 className="text-xl font-semibold mb-2">Ready to get started?</h3>
                <p className="text-muted-foreground">
                  Upload your resume above to begin editing with AI-powered enhancements.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Sticky Actions */}
      {showEditor && <StickyActions />}
    </div>
  );
};

export default Index;
