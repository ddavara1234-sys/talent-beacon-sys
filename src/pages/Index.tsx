import React from 'react';
import NavBar from '@/components/NavBar';
import { CandidateDropdown, Candidate } from '@/components/CandidateDropdown';
import { CandidateDetails } from '@/components/CandidateDetails';
import { useCandidateData } from '@/hooks/useCandidateData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Users, UserCheck, Clock } from 'lucide-react';

const Index = () => {
  const { candidates, loading, error } = useCandidateData();
  const [selectedCandidate, setSelectedCandidate] = React.useState<Candidate | null>(null);

  const stats = React.useMemo(() => {
    const total = candidates.length;
    const interviewed = candidates.filter((c: any) => c['Interview Status'] === 'Completed').length;
    const pending = candidates.filter((c: any) => c['Interview Status'] === 'Scheduled').length;
    
    return { total, interviewed, pending };
  }, [candidates]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <NavBar />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
            <p className="text-muted-foreground">Loading candidate data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <NavBar />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-center space-y-4">
            <p className="text-destructive font-semibold">Error loading data</p>
            <p className="text-muted-foreground">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">HR Dashboard</h1>
            <p className="text-muted-foreground">Manage and track candidate interviews</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Interviewed</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.interviewed}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pending}</div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Candidate Selection */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Select Candidate</CardTitle>
                <CardDescription>Choose a candidate to view details</CardDescription>
              </CardHeader>
              <CardContent>
                <CandidateDropdown
                  candidates={candidates}
                  onSelectCandidate={setSelectedCandidate}
                  selectedCandidate={selectedCandidate}
                />
              </CardContent>
            </Card>

            {/* Candidate Details */}
            <div className="lg:col-span-2">
              {selectedCandidate ? (
                <CandidateDetails candidate={selectedCandidate} />
              ) : (
                <Card className="h-full">
                  <CardContent className="flex items-center justify-center h-full min-h-[400px]">
                    <div className="text-center space-y-2">
                      <Users className="h-12 w-12 text-muted-foreground mx-auto" />
                      <p className="text-muted-foreground">
                        Select a candidate to view their details
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
