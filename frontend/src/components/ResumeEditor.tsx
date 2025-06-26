import { useState, useEffect } from "react";
import { Zap, Save } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import toast, {Toaster} from "react-hot-toast";
import { useResume } from "../contexts/ResumeContext";
import ExperienceSection from "./ExperienceSection";
import EducationSection from "./EducationSection";
import SkillsSection from "./SkillsSection";
import axios from "axios";

const API_URL = "http://localhost:8000";

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
  const { currentResume, updateResume } = useResume();
  const [isEnhancing, setIsEnhancing] = useState<string | null>(null);

  const [resumeData, setResumeData] = useState<ResumeData>({
    fullName: "John Doe",
    summary:
      "Experienced software developer with 5+ years in full-stack development. Passionate about creating scalable solutions and leading development teams.",
    experience: [
      {
        id: "1",
        title: "Senior Software Engineer",
        company: "Tech Corp",
        duration: "2020 - Present",
        description:
          "Led development of microservices architecture, resulting in 40% performance improvement.",
      },
    ],
    education: [
      {
        id: "1",
        degree: "Bachelor of Computer Science",
        school: "University of Technology",
        year: "2018",
      },
    ],
    skills: ["JavaScript", "React", "Node.js", "Python", "AWS"],
  });

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

  useEffect(() => {
    if (currentResume) {
      updateResume(currentResume.id, resumeData);
    }
  }, [resumeData, currentResume, updateResume]);

  const handleEnhanceWithAI = async (section: string) => {
    setIsEnhancing(section);

    try {
      const content = resumeData[section as keyof ResumeData];
      const text = typeof content === "string" ? content : "";

      const res = await axios.post(`${API_URL}/ai-enhance`, {
        section,
        content: text,
      });

      const enhanced = res.data.enhanced;

      if (section === "summary") {
        setResumeData((prev) => ({ ...prev, summary: enhanced }));
      }

      toast(`Your ${section} has been enhanced with AI suggestions.`);
    } catch (err) {
      toast("Something went wrong while contacting AI service.");
    }

    setIsEnhancing(null);
  };

  const handleSaveResume = async () => {
    try {
      const res = await axios.post(`${API_URL}/save-resume`, resumeData);
      toast(res.data.message || "Resume successfully saved.");
    } catch (error) {
      toast("Could not save resume to backend.");
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSaveResume}
          className="bg-accent-teal hover:bg-accent-teal/80 text-white"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Resume
        </Button>
      </div>

      {/* Personal Info */}
      <Card className="bg-dark-surface border-dark-border">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
          <CardTitle className="text-lg sm:text-xl">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            value={resumeData.fullName}
            onChange={(e) => setResumeData((prev) => ({ ...prev, fullName: e.target.value }))}
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
            onClick={() => handleEnhanceWithAI("summary")}
            disabled={isEnhancing === "summary"}
            size="sm"
            variant="outline"
            className="text-accent-teal border-accent-teal/30 hover:bg-accent-teal/10 w-full sm:w-auto"
          >
            {isEnhancing === "summary" ? (
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
            onChange={(e) =>
              setResumeData((prev) => ({ ...prev, summary: e.target.value }))
            }
            placeholder="Write a compelling professional summary..."
            className="bg-dark-elevated border-dark-border min-h-[120px] resize-none"
          />
        </CardContent>
      </Card>

      {/* Experience */}
      <ExperienceSection
        experience={resumeData.experience}
        onUpdate={(experience) => setResumeData((prev) => ({ ...prev, experience }))}
        onEnhance={() => handleEnhanceWithAI("experience")}
        isEnhancing={isEnhancing === "experience"}
      />

      {/* Education */}
      <EducationSection
        education={resumeData.education}
        onUpdate={(education) => setResumeData((prev) => ({ ...prev, education }))}
      />

      {/* Skills */}
      <SkillsSection
        skills={resumeData.skills}
        onUpdate={(skills) => setResumeData((prev) => ({ ...prev, skills }))}
      />

      <Toaster position="bottom-left" />
    </div>
  );
};

export default ResumeEditor;
