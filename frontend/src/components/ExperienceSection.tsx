
import { useState } from "react";
import { Plus, Zap, Edit, Save } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
}

interface ExperienceSectionProps {
  experience: Experience[];
  onUpdate: (experience: Experience[]) => void;
  onEnhance: () => void;
  isEnhancing: boolean;
}

const ExperienceSection = ({ experience, onUpdate, onEnhance, isEnhancing }: ExperienceSectionProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      title: "",
      company: "",
      duration: "",
      description: ""
    };
    onUpdate([...experience, newExp]);
    setEditingId(newExp.id);
  };

  const updateExperience = (id: string, updates: Partial<Experience>) => {
    onUpdate(experience.map(exp => 
      exp.id === id ? { ...exp, ...updates } : exp
    ));
  };

  const deleteExperience = (id: string) => {
    onUpdate(experience.filter(exp => exp.id !== id));
  };

  return (
    <Card className="bg-dark-surface border-dark-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Experience</CardTitle>
        <div className="flex space-x-2">
          <Button
            onClick={addExperience}
            size="sm"
            variant="outline"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Experience
          </Button>
          <Button
            onClick={onEnhance}
            disabled={isEnhancing}
            size="sm"
            variant="outline"
            className="text-accent-teal border-accent-teal/30 hover:bg-accent-teal/10"
          >
            {isEnhancing ? (
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
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {experience.map((exp) => (
          <div key={exp.id} className="p-4 bg-dark-elevated rounded-lg border border-dark-border">
            {editingId === exp.id ? (
              <div className="space-y-3">
                <Input
                  value={exp.title}
                  onChange={(e) => updateExperience(exp.id, { title: e.target.value })}
                  placeholder="Job Title"
                  className="bg-dark-bg border-dark-border"
                />
                <Input
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                  placeholder="Company Name"
                  className="bg-dark-bg border-dark-border"
                />
                <Input
                  value={exp.duration}
                  onChange={(e) => updateExperience(exp.id, { duration: e.target.value })}
                  placeholder="Duration (e.g., 2020 - Present)"
                  className="bg-dark-bg border-dark-border"
                />
                <Textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                  placeholder="Job description and achievements..."
                  className="bg-dark-bg border-dark-border min-h-[100px]"
                />
                <div className="flex space-x-2">
                  <Button
                    onClick={() => setEditingId(null)}
                    size="sm"
                    className="bg-accent-teal hover:bg-accent-teal/80"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button
                    onClick={() => deleteExperience(exp.id)}
                    size="sm"
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-lg">{exp.title || "Untitled Position"}</h4>
                    <p className="text-accent-teal">{exp.company || "Company Name"}</p>
                    <p className="text-sm text-muted-foreground">{exp.duration || "Duration"}</p>
                  </div>
                  <Button
                    onClick={() => setEditingId(exp.id)}
                    size="sm"
                    variant="ghost"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-muted-foreground mt-2">{exp.description || "No description provided"}</p>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ExperienceSection;
