
import { useState } from "react";
import { Plus, Edit, Save } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

interface Education {
  id: string;
  degree: string;
  school: string;
  year: string;
}

interface EducationSectionProps {
  education: Education[];
  onUpdate: (education: Education[]) => void;
}

const EducationSection = ({ education, onUpdate }: EducationSectionProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      degree: "",
      school: "",
      year: ""
    };
    onUpdate([...education, newEdu]);
    setEditingId(newEdu.id);
  };

  const updateEducation = (id: string, updates: Partial<Education>) => {
    onUpdate(education.map(edu => 
      edu.id === id ? { ...edu, ...updates } : edu
    ));
  };

  const deleteEducation = (id: string) => {
    onUpdate(education.filter(edu => edu.id !== id));
  };

  return (
    <Card className="bg-dark-surface border-dark-border">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
        <CardTitle className="text-lg sm:text-xl">Education</CardTitle>
        <Button
          onClick={addEducation}
          size="sm"
          variant="outline"
          className="w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Education
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {education.map((edu) => (
          <div key={edu.id} className="p-4 bg-dark-elevated rounded-lg border border-dark-border">
            {editingId === edu.id ? (
              <div className="space-y-3">
                <Input
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                  placeholder="Degree (e.g., Bachelor of Computer Science)"
                  className="bg-dark-bg border-dark-border"
                />
                <Input
                  value={edu.school}
                  onChange={(e) => updateEducation(edu.id, { school: e.target.value })}
                  placeholder="School/University Name"
                  className="bg-dark-bg border-dark-border"
                />
                <Input
                  value={edu.year}
                  onChange={(e) => updateEducation(edu.id, { year: e.target.value })}
                  placeholder="Graduation Year"
                  className="bg-dark-bg border-dark-border"
                />
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <Button
                    onClick={() => setEditingId(null)}
                    size="sm"
                    className="bg-accent-teal hover:bg-accent-teal/80 flex-1"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button
                    onClick={() => deleteEducation(edu.id)}
                    size="sm"
                    variant="destructive"
                    className="flex-1 sm:flex-none"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-base sm:text-lg truncate">{edu.degree || "Degree"}</h4>
                    <p className="text-accent-teal truncate">{edu.school || "School Name"}</p>
                    <p className="text-sm text-muted-foreground">{edu.year || "Year"}</p>
                  </div>
                  <Button
                    onClick={() => setEditingId(edu.id)}
                    size="sm"
                    variant="ghost"
                    className="ml-2 flex-shrink-0"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default EducationSection;
