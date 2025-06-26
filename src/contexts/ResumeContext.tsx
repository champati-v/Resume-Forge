
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface SavedResume {
  id: string;
  fileName: string;
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
  createdAt: Date;
  updatedAt: Date;
}

interface ResumeContextType {
  savedResumes: SavedResume[];
  currentResume: SavedResume | null;
  saveResume: (resume: Omit<SavedResume, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateResume: (id: string, resume: Partial<SavedResume>) => void;
  deleteResume: (id: string) => void;
  setCurrentResume: (resume: SavedResume | null) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [savedResumes, setSavedResumes] = useState<SavedResume[]>([]);
  const [currentResume, setCurrentResume] = useState<SavedResume | null>(null);

  const saveResume = (resume: Omit<SavedResume, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newResume: SavedResume = {
      ...resume,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setSavedResumes(prev => [...prev, newResume]);
    setCurrentResume(newResume);
  };

  const updateResume = (id: string, updates: Partial<SavedResume>) => {
    setSavedResumes(prev => 
      prev.map(resume => 
        resume.id === id 
          ? { ...resume, ...updates, updatedAt: new Date() }
          : resume
      )
    );
    if (currentResume?.id === id) {
      setCurrentResume(prev => prev ? { ...prev, ...updates, updatedAt: new Date() } : null);
    }
  };

  const deleteResume = (id: string) => {
    setSavedResumes(prev => prev.filter(resume => resume.id !== id));
    if (currentResume?.id === id) {
      setCurrentResume(null);
    }
  };

  return (
    <ResumeContext.Provider value={{
      savedResumes,
      currentResume,
      saveResume,
      updateResume,
      deleteResume,
      setCurrentResume,
    }}>
      {children}
    </ResumeContext.Provider>
  );
};
