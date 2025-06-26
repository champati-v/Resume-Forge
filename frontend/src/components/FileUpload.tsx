
import { useState } from "react";
import { Upload, File } from "lucide-react";
import { Button } from "../components/ui/button";
import toast, {Toaster} from 'react-hot-toast';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  hasFile: boolean;
}

const FileUpload = ({ onFileUpload, hasFile }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const validFile = files.find(file => 
      file.type === 'application/pdf' || 
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );

    if (validFile) {
      onFileUpload(validFile);
      toast(`${validFile.name} has been processed.`);
    } else {
      toast("Please upload a PDF or DOCX file.");
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
      toast(`${file.name} has been processed.`);
    }
  };

  if (hasFile) return null;

  return (
    <div className="mb-8">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300
          ${isDragging 
            ? 'border-accent-teal bg-accent-teal/10' 
            : 'border-dark-border hover:border-accent-teal/50'
          }
        `}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className={`
            p-4 rounded-full transition-colors duration-300
            ${isDragging ? 'bg-accent-teal/20' : 'bg-dark-elevated'}
          `}>
            <Upload className={`
              w-8 h-8 transition-colors duration-300
              ${isDragging ? 'text-accent-teal' : 'text-muted-foreground'}
            `} />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">
              Drop your resume here
            </h3>
            <p className="text-muted-foreground max-w-sm">
              Upload your existing resume in PDF or DOCX format to get started with AI-powered enhancements
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <File className="w-4 h-4" />
              <span>PDF, DOCX</span>
            </div>
          </div>

          <Button 
            onClick={() => document.getElementById('file-input')?.click()}
            className="mt-4"
            variant="outline"
          >
            Choose File
          </Button>
        </div>

        <input
          id="file-input"
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      <Toaster position="bottom-left" />
    </div>
  );
};

export default FileUpload;
