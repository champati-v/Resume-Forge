
import { useState, useEffect } from "react";
import { Zap, Edit, Save } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useToast } from "../hooks/use-toast";
import { useResume } from "../contexts/ResumeContext";
import ExperienceSection from "./ExperienceSection";
import EducationSection from "./EducationSection";
import SkillsSection from "./SkillsSection";

interface ResumeData {
  fullName: string;
  summary: string;
  experience: Array<{
    id: string;
    title: string;
    company: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    id: string;
    degree: string;
    school: string;
    year: string;
  }>;
  skills: string[];
}

const ResumeEditor = () => {
  const { toast } = useToast();
  const { currentResume, updateResume } = useResume();
  const [isEnhancing, setIsEnhancing] = useState<string | null>(null);
  
  const [resumeData, setResumeData] = useState<ResumeData>({
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
  });

  // Load current resume data if editing existing resume
  useEffect(() => {
    if (currentResume) {
      setResumeData({
        fullName: currentResume.fullName,
        summary: currentResume.summary,
        experience: currentResume.experience,
        education: currentResume.education,
        skills: currentResume.skills,
      });
    }
  }, [currentResume]);

  // Update current resume when data changes
  useEffect(() => {
    if (currentResume) {
      updateResume(currentResume.id, {
        fullName: resumeData.fullName,
        summary: resumeData.summary,
        experience: resumeData.experience,
        education: resumeData.education,
        skills: resumeData.skills,
      });
    }
  }, [resumeData, currentResume, updateResume]);

  const handleEnhanceWithAI = async (section: string) => {
    setIsEnhancing(section);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock AI enhancement
    if (section === 'summary') {
      setResumeData(prev => ({
        ...prev,
        summary: "Innovative software engineer with 5+ years of expertise in full-stack development, specializing in scalable web applications and cloud architecture. Proven track record of leading cross-functional teams, implementing modern development practices, and delivering high-impact solutions that drive business growth. Passionate about emerging technologies and committed to continuous learning in the evolving tech landscape."
      }));
    }
    
    setIsEnhancing(null);
    toast({
      title: "AI Enhancement Complete",
      description: `Your ${section} has been enhanced with AI suggestions.`,
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Personal Information */}
      <Card className="bg-dark-surface border-dark-border">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
          <CardTitle className="text-lg sm:text-xl">Personal Information</CardTitle>
          <Button
            onClick={() => handleEnhanceWithAI('personal')}
            disabled={isEnhancing === 'personal'}
            size="sm"
            variant="outline"
            className="text-accent-teal border-accent-teal/30 hover:bg-accent-teal/10 w-full sm:w-auto"
          >
            {isEnhancing === 'personal' ? (
              <div className="flex items-center">
                <div className="animate-spin w-4 h-4 border-2 border-accent-teal border-t-transparent rounded-full mr-2" />
                Enhancing...
              </div>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Enhance with AI
              </>
            )}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            value={resumeData.fullName}
            onChange={(e) => setResumeData(prev => ({ ...prev, fullName: e.target.value }))}
            placeholder="Full Name"
            className="bg-dark-elevated border-dark-border text-base sm:text-lg font-medium"
          />
        </CardContent>
      </Card>

      {/* Summary */}
      <Card className="bg-dark-surface border-dark-border">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
          <CardTitle className="text-lg sm:text-xl">Professional Summary</CardTitle>
          <Button
            onClick={() => handleEnhanceWithAI('summary')}
            disabled={isEnhancing === 'summary'}
            size="sm"
            variant="outline"
            className="text-accent-teal border-accent-teal/30 hover:bg-accent-teal/10 w-full sm:w-auto"
          >
            {isEnhancing === 'summary' ? (
              <div className="flex items-center">
                <div className="animate-spin w-4 h-4 border-2 border-accent-teal border-t-transparent rounded-full mr-2" />
                Enhancing...
              </div>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Enhance with AI
              </>
            )}
          </Button>
        </CardHeader>
        <CardContent>
          <Textarea
            value={resumeData.summary}
            onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
            placeholder="Write a compelling professional summary..."
            className={`
              bg-dark-elevated border-dark-border min-h-[120px] resize-none
              ${isEnhancing === 'summary' ? 'shimmer-loading' : ''}
            `}
          />
        </CardContent>
      </Card>

      {/* Experience */}
      <ExperienceSection
        experience={resumeData.experience}
        onUpdate={(experience) => setResumeData(prev => ({ ...prev, experience }))}
        onEnhance={() => handleEnhanceWithAI('experience')}
        isEnhancing={isEnhancing === 'experience'}
      />

      {/* Education */}
      <EducationSection
        education={resumeData.education}
        onUpdate={(education) => setResumeData(prev => ({ ...prev, education }))}
      />

      {/* Skills */}
      <SkillsSection
        skills={resumeData.skills}
        onUpdate={(skills) => setResumeData(prev => ({ ...prev, skills }))}
      />
    </div>
  );
};

export default ResumeEditor;
