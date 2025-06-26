
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

interface SkillsSectionProps {
  skills: string[];
  onUpdate: (skills: string[]) => void;
}

const SkillsSection = ({ skills, onUpdate }: SkillsSectionProps) => {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      onUpdate([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onUpdate(skills.filter(skill => skill !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <Card className="bg-dark-surface border-dark-border">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Skills</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a skill..."
            className="bg-dark-elevated border-dark-border flex-1"
          />
          <Button onClick={addSkill} size="sm" className="w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2 sm:mr-0" />
            <span className="sm:hidden">Add Skill</span>
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-accent-teal/20 text-accent-teal border-accent-teal/30 px-3 py-1 text-sm"
            >
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                className="ml-2 hover:text-red-400 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsSection;
