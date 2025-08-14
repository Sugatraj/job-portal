import { Candidate } from '@/components/candidates/candidates-columns';

const CANDIDATES_STORAGE_KEY = 'job-portal-candidates';

export interface CreateCandidateData {
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'approved' | 'rejected';
}

export interface UpdateCandidateData extends Partial<CreateCandidateData> {
  id: string;
}

class CandidatesService {
  private getCandidatesFromStorage(): Candidate[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(CANDIDATES_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading candidates from localStorage:', error);
      return [];
    }
  }

  private saveCandidatesToStorage(candidates: Candidate[]): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(CANDIDATES_STORAGE_KEY, JSON.stringify(candidates));
    } catch (error) {
      console.error('Error saving candidates to localStorage:', error);
    }
  }

  // Get all candidates
  getAllCandidates(): Candidate[] {
    return this.getCandidatesFromStorage();
  }

  // Get candidate by ID
  getCandidateById(id: string): Candidate | null {
    const candidates = this.getCandidatesFromStorage();
    return candidates.find(candidate => candidate.id === id) || null;
  }

  // Create new candidate
  createCandidate(data: CreateCandidateData): Candidate {
    const candidates = this.getCandidatesFromStorage();
    
    const newCandidate: Candidate = {
      id: Date.now().toString(), // Simple ID generation
      ...data,
      createdAt: new Date().toISOString(),
    };

    candidates.push(newCandidate);
    this.saveCandidatesToStorage(candidates);
    
    return newCandidate;
  }

  // Update existing candidate
  updateCandidate(id: string, data: Partial<CreateCandidateData>): Candidate | null {
    const candidates = this.getCandidatesFromStorage();
    const index = candidates.findIndex(candidate => candidate.id === id);
    
    if (index === -1) return null;

    candidates[index] = {
      ...candidates[index],
      ...data,
    };

    this.saveCandidatesToStorage(candidates);
    return candidates[index];
  }

  // Delete candidate
  deleteCandidate(id: string): boolean {
    const candidates = this.getCandidatesFromStorage();
    const filteredCandidates = candidates.filter(candidate => candidate.id !== id);
    
    if (filteredCandidates.length === candidates.length) {
      return false; // No candidate was deleted
    }

    this.saveCandidatesToStorage(filteredCandidates);
    return true;
  }

  // Initialize with mock data if storage is empty
  initializeWithMockData(mockCandidates: Candidate[]): void {
    const existingCandidates = this.getCandidatesFromStorage();
    
    if (existingCandidates.length === 0) {
      this.saveCandidatesToStorage(mockCandidates);
    }
  }

  // Search candidates
  searchCandidates(query: string): Candidate[] {
    const candidates = this.getCandidatesFromStorage();
    const lowercaseQuery = query.toLowerCase();
    
    return candidates.filter(candidate => 
      candidate.title.toLowerCase().includes(lowercaseQuery) ||
      candidate.description.toLowerCase().includes(lowercaseQuery) ||
      candidate.category.toLowerCase().includes(lowercaseQuery)
    );
  }

  // Filter candidates by status
  filterByStatus(status: Candidate['status']): Candidate[] {
    const candidates = this.getCandidatesFromStorage();
    return candidates.filter(candidate => candidate.status === status);
  }

  // Filter candidates by priority
  filterByPriority(priority: Candidate['priority']): Candidate[] {
    const candidates = this.getCandidatesFromStorage();
    return candidates.filter(candidate => candidate.priority === priority);
  }
}

export const candidatesService = new CandidatesService();
