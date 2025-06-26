
import { Save, Download } from "lucide-react";
import { Button } from "../components/ui/button";
import toast, { Toaster } from 'react-hot-toast';
import { useResume } from "../contexts/ResumeContext";
import { useNavigate } from "react-router-dom";

const StickyActions = () => {
  const { currentResume, saveResume } = useResume();
  const navigate = useNavigate();

  const handleSave = () => {
    // If editing existing resume, it's already being auto-saved
    if (currentResume) {
      toast('Resume is already being auto-saved');
      return;
    }

    // If creating new resume, save it
    const resumeData = {
      fileName: "New Resume",
      fullName: "John Doe",
      summary: "Experienced software developer with 5+ years in full-stack development. Passionate about creating scalable solutions and leading development teams.",
      experience: [
        {
          id: "1",
          title: "Senior Software Engineer",
          company: "Tech Corp",
          duration: "2020 - Present",
          description: "Led development of microservices architecture, resulting in 40% performance improvement."
        }
      ],
      education: [
        {
          id: "1",
          degree: "Bachelor of Computer Science",
          school: "University of Technology",
          year: "2018"
        }
      ],
      skills: ["JavaScript", "React", "Node.js", "Python", "AWS"]
    };

    saveResume(resumeData);
    
    toast('Resume Saved Successfully');
  };

  const handleDownloadJSON = () => {
    // Mock JSON download
    const resumeData = currentResume || {
      fullName: "John Doe",
      summary: "Experienced software developer...",
      // Add more mock data
    };
    
    const dataStr = JSON.stringify(resumeData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'resume.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();

    toast("Your resume JSON file is downloading.");
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 z-50">
      <Button
        onClick={handleSave}
        className="bg-dark-elevated hover:bg-dark-surface border border-dark-border shadow-lg backdrop-blur-xl text-sm"
        variant="outline"
        size="sm"
      >
        <Save className="w-4 h-4 mr-2" />
        Save Resume
      </Button>
      <Button
        onClick={handleDownloadJSON}
        className="bg-accent-teal hover:bg-accent-teal/80 shadow-lg text-sm"
        size="sm"
      >
        <Download className="w-4 h-4 mr-2" />
        Download JSON
      </Button>

      <Toaster position="bottom-left" />
    </div>
  );
};

export default StickyActions;
