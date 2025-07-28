import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Geist } from "next/font/google";
import MobileNavigation from "./components/MobileNavigation";
import { STANDARD_TAGS, getAllTags, isStandardTag } from "@/lib/tags";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

interface Pitch {
  id: number;
  creator: string;
  title: string;
  avatar: string;
  quote: string;
  summary: string;
  tags: string[];
  timestamp: string;
  audioUrl?: string;
  transcript?: string;
}

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html, body {
    font-family: ${geistSans.style.fontFamily}, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: #f8fafc;
  }
`;

// Layout Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

// Removed header styles - now using MobileNavigation component

// Main Content
const Main = styled.main`
  padding: 40px 0 80px;
  
  @media (max-width: 768px) {
    padding: 20px 0 60px;
  }
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    margin-bottom: 30px;
  }
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  color: #2d3748;
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const PageSubtitle = styled.p`
  font-size: 1.1rem;
  color: #718096;
  max-width: 600px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0 10px;
  }
`;

// Filters Section
const FiltersSection = styled.div`
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 12px;
    margin-bottom: 30px;
  }
  
  @media (max-width: 480px) {
    padding: 16px;
    border-radius: 10px;
    margin-bottom: 24px;
  }
`;

const FiltersRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    gap: 15px;
    margin-bottom: 15px;
  }
  
  @media (max-width: 480px) {
    gap: 12px;
    margin-bottom: 12px;
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 300px;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
  
  &::placeholder {
    color: #a0aec0;
  }
  
  @media (max-width: 768px) {
    min-width: 100%;
    font-size: 16px; /* Prevents zoom on iOS */
    margin-bottom: 10px;
  }
  
  @media (max-width: 480px) {
    padding: 14px 16px;
    min-height: 44px;
    font-size: 16px;
  }
`;

const FilterSelect = styled.select`
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
  
  @media (max-width: 768px) {
    font-size: 16px; /* Prevents zoom on iOS */
    width: 100%;
  }
  
  @media (max-width: 480px) {
    padding: 14px 16px;
    min-height: 44px;
    font-size: 16px;
  }
`;

const TagsRow = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 8px;
  }
`;

const FilterTag = styled.button<{ active?: boolean }>`
  padding: 8px 16px;
  border: 2px solid ${props => props.active ? '#667eea' : '#e2e8f0'};
  background: ${props => props.active ? '#667eea' : 'white'};
  color: ${props => props.active ? 'white' : '#4a5568'};
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #667eea;
    background: ${props => props.active ? '#5a67d8' : '#f7fafc'};
  }
  
  &:active {
    transform: scale(0.98);
  }
  
  @media (max-width: 768px) {
    padding: 10px 16px;
    font-size: 0.85rem;
    min-height: 44px; /* Better touch target */
  }
  
  @media (max-width: 480px) {
    padding: 12px 14px;
    font-size: 0.8rem;
    min-height: 40px;
  }
`;

// Results Section
const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
    margin-bottom: 20px;
  }
`;

const ResultsCount = styled.p`
  color: #718096;
  font-size: 1rem;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const SortSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  
  @media (max-width: 768px) {
    font-size: 16px; /* Prevents zoom on iOS */
    padding: 10px 14px;
  }
`;

// Pitch Grid
const PitchGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const PitchCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid transparent;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    border-color: #667eea;
  }
  
  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 16px;
    
    &:hover {
      transform: none; /* Disable hover effects on mobile */
    }
  }
  
  @media (max-width: 480px) {
    padding: 16px;
    border-radius: 12px;
  }
`;

const PitchHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    gap: 12px;
    margin-bottom: 16px;
  }
`;

const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
  
  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
    font-size: 1.1rem;
  }
`;

const PitchMeta = styled.div`
  flex: 1;
`;

const CreatorName = styled.h3`
  font-size: 1.1rem;
  color: #2d3748;
  margin-bottom: 4px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const PitchTitle = styled.h4`
  font-size: 0.9rem;
  color: #667eea;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const AudioButton = styled.button`
  background: #f7fafc;
  border: 2px solid #e2e8f0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #667eea;
    border-color: #667eea;
    color: white;
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  @media (max-width: 768px) {
    width: 44px; /* Larger touch target */
    height: 44px;
  }
  
  @media (max-width: 480px) {
    width: 48px;
    height: 48px;
  }
`;

const PitchQuote = styled.p`
  font-style: italic;
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 20px;
  font-size: 1.05rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 16px;
    line-height: 1.5;
  }
`;

const PitchSummary = styled.p`
  color: #718096;
  line-height: 1.5;
  margin-bottom: 20px;
  font-size: 0.95rem;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 16px;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 6px;
    margin-bottom: 16px;
  }
`;

const Tag = styled.span<{ isStandard?: boolean }>`
  background: ${props => props.isStandard ? '#667eea' : '#f7fafc'};
  color: ${props => props.isStandard ? 'white' : '#4a5568'};
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
  
  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 0.75rem;
  }
`;

const PitchFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
`;

const CatalystButton = styled.button`
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #ff5252;
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.98);
  }
  
  @media (max-width: 768px) {
    padding: 14px 24px;
    min-height: 44px; /* Better touch target */
    
    &:hover {
      transform: none; /* Disable scale on mobile */
    }
  }
  
  @media (max-width: 480px) {
    padding: 16px 20px;
    min-height: 48px;
    font-size: 0.9rem;
  }
`;

const TimeStamp = styled.span`
  color: #a0aec0;
  font-size: 0.85rem;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
    text-align: center;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #718096;
  font-size: 1.1rem;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #e53e3e;
  font-size: 1.1rem;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #718096;
  font-size: 1.1rem;
`;

// Pagination
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 60px;
  
  @media (max-width: 768px) {
    gap: 8px;
    margin-top: 40px;
    flex-wrap: wrap;
  }
`;

const PageButton = styled.button<{ active?: boolean }>`
  width: 40px;
  height: 40px;
  border: 2px solid ${props => props.active ? '#667eea' : '#e2e8f0'};
  background: ${props => props.active ? '#667eea' : 'white'};
  color: ${props => props.active ? 'white' : '#4a5568'};
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #667eea;
    background: ${props => props.active ? '#5a67d8' : '#f7fafc'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    width: 44px; /* Better touch target */
    height: 44px;
    font-size: 14px;
  }
`;

// Fallback data for when no pitches are available
const fallbackPitches: Pitch[] = [];

const categories = ["all", "cleantech", "gaming", "art", "ai", "education", "environment"];
const needs = ["all", "funding", "development", "design", "research", "marketing"];

export default function Explore() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [pitches, setPitches] = useState<Pitch[]>(fallbackPitches);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get all unique tags from pitches and combine with standard tags
  const allTags = getAllTags(pitches.flatMap(pitch => pitch.tags || []));

  // Fetch pitches from API
  useEffect(() => {
    const fetchPitches = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/pitches');
        const data = await response.json();
        
        if (data.success) {
          setPitches(data.pitches);
        } else {
          setError('Failed to load pitches');
        }
      } catch (err) {
        setError('Failed to load pitches');
        console.error('Error fetching pitches:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPitches();
  }, []);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // Filter pitches based on current filters
  const filteredPitches = pitches.filter((pitch: Pitch) => {
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => pitch.tags.includes(tag));
    
    return matchesTags;
  });

  return (
    <>
      <Head>
        <title>Explore Pitches - Be the Catalyst</title>
        <meta name="description" content="Discover bold ideas and creative collaborations. Find your next project or team." />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <GlobalStyle />
      
      <div className={geistSans.variable}>
        {/* Header */}
        <MobileNavigation 
          currentPage="/explore"
          primaryButton={{ href: '/record', text: '🎤 Record Pitch', variant: 'primary' }}
        />

        {/* Main Content */}
        <Main>
          <Container>
            {/* Page Header */}
            <PageHeader>
              <PageTitle>Explore Pitches</PageTitle>
              <PageSubtitle>
                Discover bold ideas, connect with creators, and spark your next collaboration
              </PageSubtitle>
            </PageHeader>

            {/* Filters */}
            <FiltersSection>
              <TagsRow>
                {allTags.map(tag => (
                  <FilterTag
                    key={tag}
                    active={selectedTags.includes(tag)}
                    onClick={() => toggleTag(tag)}
                    style={{
                      borderColor: isStandardTag(tag) ? '#667eea' : '#e2e8f0',
                      fontWeight: isStandardTag(tag) ? '600' : '500'
                    }}
                  >
                    {tag}
                  </FilterTag>
                ))}
              </TagsRow>
            </FiltersSection>

            {/* Results Header */}
            <ResultsHeader>
              <ResultsCount>
                {loading ? 'Loading...' : `${filteredPitches.length} pitches found`}
              </ResultsCount>
              <SortSelect
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                disabled={loading}
              >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
                <option value="trending">Trending</option>
              </SortSelect>
            </ResultsHeader>

            {/* Loading State */}
            {loading && (
              <LoadingMessage>
                Loading pitches...
              </LoadingMessage>
            )}

            {/* Error State */}
            {error && !loading && (
              <ErrorMessage>
                {error}
              </ErrorMessage>
            )}

            {/* Empty State */}
            {!loading && !error && filteredPitches.length === 0 && (
              <EmptyMessage>
                No pitches found. Be the first to record a pitch!
              </EmptyMessage>
            )}

            {/* Pitch Grid */}
            {!loading && !error && filteredPitches.length > 0 && (
              <PitchGrid>
                {filteredPitches.map((pitch: Pitch) => (
                  <PitchCard key={pitch.id}>
                    <PitchHeader>
                      <Avatar>{pitch.avatar}</Avatar>
                      <PitchMeta>
                        <CreatorName>{pitch.creator}</CreatorName>
                        <PitchTitle>{pitch.title}</PitchTitle>
                      </PitchMeta>
                      <AudioButton>▶️</AudioButton>
                    </PitchHeader>
                    
                    <PitchQuote>&quot;{pitch.quote}&quot;</PitchQuote>
                    <PitchSummary>{pitch.summary}</PitchSummary>
                    
                    <TagsContainer>
                      {pitch.tags.map((tag: string) => (
                        <Tag key={tag} isStandard={isStandardTag(tag)}>
                          {tag}
                        </Tag>
                      ))}
                    </TagsContainer>
                    
                    <PitchFooter>
                      <TimeStamp>{pitch.timestamp}</TimeStamp>
                      <CatalystButton>⚡️ Be the Catalyst</CatalystButton>
                    </PitchFooter>
                  </PitchCard>
                ))}
              </PitchGrid>
            )}

            {/* Pagination */}
            {!loading && !error && filteredPitches.length > 0 && (
              <Pagination>
                <PageButton disabled={currentPage === 1}>‹</PageButton>
                <PageButton active={currentPage === 1}>1</PageButton>
                <PageButton active={currentPage === 2}>2</PageButton>
                <PageButton active={currentPage === 3}>3</PageButton>
                <PageButton>›</PageButton>
              </Pagination>
            )}
          </Container>
        </Main>
      </div>
    </>
  );
} 