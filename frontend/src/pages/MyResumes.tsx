import { Edit, Trash2, Plus, Calendar } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useResume } from "../contexts/ResumeContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const MyResumes = () => {
  const { savedResumes, deleteResume, setCurrentResume } = useResume();
  const navigate = useNavigate();

  const handleEdit = (resume: any) => {
    setCurrentResume(resume);
    navigate('/');
  };

  const handleDelete = (id: string) => {
    deleteResume(id);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(date));
  };

  return (
    <div className="min-h-screen w-screen bg-dark-bg">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">My Resumes</h1>
            <p className="text-muted-foreground text-lg">
              Manage your saved resumes and create new ones.
            </p>
          </div>

          {/* Create New Resume Button */}
          <div className="mb-8">
            <Button
              onClick={() => navigate('/')}
              className="bg-accent-teal hover:bg-accent-teal/80"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Resume
            </Button>
          </div>

          {/* Resumes Grid */}
          {savedResumes.length === 0 ? (
            <Card className="bg-dark-surface border-dark-border">
              <CardContent className="py-12 text-center">
                <h3 className="text-xl font-semibold mb-2">No resumes yet</h3>
                <p className="text-muted-foreground mb-6">
                  Start by creating your first resume to see it here.
                </p>
                <Button
                  onClick={() => navigate('/')}
                  className="bg-accent-teal hover:bg-accent-teal/80"
                >
                  Create Your First Resume
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedResumes.map((resume) => (
                <Card key={resume.id} className="bg-dark-surface border-dark-border hover:border-accent-teal/30 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-lg truncate">
                      {resume.fullName || 'Untitled Resume'}
                    </CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1" />
                      Updated {formatDate(resume.updatedAt)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {resume.summary || 'No summary provided'}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {resume.skills.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-accent-teal/20 text-accent-teal text-xs rounded-md"
                        >
                          {skill}
                        </span>
                      ))}
                      {resume.skills.length > 3 && (
                        <span className="px-2 py-1 bg-dark-elevated text-muted-foreground text-xs rounded-md">
                          +{resume.skills.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button
                        onClick={() => handleEdit(resume)}
                        size="sm"
                        variant="outline"
                        className="flex-1"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(resume.id)}
                        size="sm"
                        variant="destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyResumes;
