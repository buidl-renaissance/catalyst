import Head from "next/head";
import Link from "next/link";
import { useState, useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Geist } from "next/font/google";
import Transcriber from "./components/Transcriber";
import MobileNavigation from "./components/MobileNavigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

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
  max-width: 800px;
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

// Stepper
const StepperContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 16px;
    margin-bottom: 24px;
  }
`;

const StepperNav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    margin-bottom: 20px;
  }
`;

const Step = styled.div<{ active?: boolean; completed?: boolean }>`
  display: flex;
  align-items: center;
  gap: 15px;
  
  &:not(:last-child)::after {
    content: '';
    width: 60px;
    height: 2px;
    background: ${props => props.completed ? '#667eea' : '#e2e8f0'};
    margin-left: 30px;
  }
`;

const StepCircle = styled.div<{ active?: boolean; completed?: boolean }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  
  ${props => props.completed && `
    background: #667eea;
    color: white;
  `}
  
  ${props => props.active && !props.completed && `
    background: #667eea;
    color: white;
  `}
  
  ${props => !props.active && !props.completed && `
    background: #f7fafc;
    border: 2px solid #e2e8f0;
    color: #a0aec0;
  `}
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
`;

const StepLabel = styled.span<{ active?: boolean; completed?: boolean }>`
  font-weight: 600;
  color: ${props => props.active || props.completed ? '#2d3748' : '#a0aec0'};
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

// Recording Section (Step 1)
const RecordingCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 30px;
  text-align: center;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 768px) {
    padding: 24px;
    border-radius: 16px;
    margin-bottom: 24px;
    min-height: 320px;
  }
`;

const RecordingTitle = styled.h2`
  font-size: 1.8rem;
  color: #2d3748;
  margin-bottom: 15px;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 12px;
  }
`;

const RecordingInstructions = styled.p`
  color: #718096;
  margin-bottom: 40px;
  font-size: 1.1rem;
  max-width: 500px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 30px;
    line-height: 1.5;
  }
`;

const TranscriberContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`;

// Transcript Display
const TranscriptSection = styled.div`
  margin-top: 30px;
  padding: 25px;
  background: #f7fafc;
  border-radius: 15px;
  border-left: 4px solid #667eea;
  text-align: left;
`;

const TranscriptTitle = styled.h3`
  color: #2d3748;
  margin-bottom: 15px;
  font-size: 1.2rem;
`;

const TranscriptText = styled.p`
  color: #4a5568;
  line-height: 1.7;
  font-size: 1rem;
  white-space: pre-wrap;
  margin-bottom: 20px;
`;

const AudioPlayer = styled.audio`
  width: 100%;
`;

const ContinueButton = styled.button`
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 15px 40px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 30px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  
  @media (max-width: 768px) {
    padding: 16px 32px;
    font-size: 1rem;
    margin-top: 24px;
    min-height: 48px; /* Better touch target */
    
    &:hover {
      transform: none; /* Disable hover effects on mobile */
    }
  }
`;

// Form Section (Step 2)
const FormCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    padding: 24px;
    border-radius: 16px;
    margin-bottom: 24px;
  }
`;

const FormTitle = styled.h2`
  font-size: 1.8rem;
  color: #2d3748;
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const FormSubtitle = styled.p`
  color: #718096;
  margin-bottom: 30px;
  font-size: 1rem;
  
  @media (max-width: 768px) {
    margin-bottom: 24px;
    font-size: 0.9rem;
  }
`;

const AIGeneratedLabel = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 8px;
`;

const LoadingState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding: 60px;
  color: #667eea;
  font-size: 1.1rem;
  font-weight: 500;
`;

const LoadingSpinner = styled.div`
  width: 24px;
  height: 24px;
  border: 3px solid #f3f4f6;
  border-top: 3px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
  
  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 8px;
  font-size: 1rem;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 6px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  border: 2px solid #cbd5e0;
  border-radius: 10px;
  font-size: 1rem;
  background-color: #ffffff;
  color: #2d3748;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  &:hover {
    border-color: #a0aec0;
  }
  
  &::placeholder {
    color: #718096;
  }
  
  @media (max-width: 768px) {
    padding: 16px;
    font-size: 16px; /* Prevents zoom on iOS */
    border-radius: 8px;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 15px;
  border: 2px solid #cbd5e0;
  border-radius: 10px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  background-color: #ffffff;
  color: #2d3748;
  transition: all 0.3s ease;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  &:hover {
    border-color: #a0aec0;
  }
  
  &::placeholder {
    color: #718096;
  }
  
  @media (max-width: 768px) {
    padding: 16px;
    font-size: 16px; /* Prevents zoom on iOS */
    border-radius: 8px;
    min-height: 100px;
  }
`;

const TagInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 15px;
  border: 2px solid #cbd5e0;
  border-radius: 10px;
  min-height: 60px;
  background-color: #ffffff;
  transition: all 0.3s ease;
  
  &:focus-within {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  &:hover {
    border-color: #a0aec0;
  }
`;

const TagItem = styled.span`
  background: #667eea;
  color: white;
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RemoveTag = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1.2rem;
  line-height: 1;
  
  &:hover {
    opacity: 0.7;
  }
`;

const TagInputField = styled.input`
  border: none;
  outline: none;
  flex: 1;
  min-width: 150px;
  font-size: 1rem;
  background-color: transparent;
  color: #2d3748;
  
  &::placeholder {
    color: #718096;
  }
`;

// Submit Section
const SubmitCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
`;

const BackButton = styled.button`
  background: transparent;
  color: #667eea;
  border: 2px solid #667eea;
  padding: 16px 30px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f7fafc;
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 18px 40px;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

// Status messages
const StatusMessage = styled.div<{ type: 'success' | 'error' | 'info' }>`
  padding: 15px 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  font-weight: 500;
  
  ${props => props.type === 'success' && `
    background: #f0fff4;
    border: 1px solid #9ae6b4;
    color: #22543d;
  `}
  
  ${props => props.type === 'error' && `
    background: #fed7d7;
    border: 1px solid #feb2b2;
    color: #742a2a;
  `}
  
  ${props => props.type === 'info' && `
    background: #ebf8ff;
    border: 1px solid #90cdf4;
    color: #2a4365;
  `}
  
  @media (max-width: 768px) {
    padding: 12px 16px;
    border-radius: 8px;
    margin-bottom: 16px;
    font-size: 0.9rem;
  }
`;

interface AISuggestions {
  title: string;
  summary: string;
  tags: string[];
}

export default function Record() {
  // Stepper state
  const [currentStep, setCurrentStep] = useState(1);
  
  // Recording data
  const [transcript, setTranscript] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [hasRecording, setHasRecording] = useState(false);
  
  // AI suggestions
  const [aiSuggestions, setAISuggestions] = useState<AISuggestions | null>(null);
  const [isGeneratingSuggestions, setIsGeneratingSuggestions] = useState(false);
  
  // Form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [status, setStatus] = useState<{type: 'success' | 'error' | 'info', message: string} | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTranscriptReady = (newTranscript: string, newAudioUrl: string) => {
    setTranscript(newTranscript);
    setAudioUrl(newAudioUrl);
    setHasRecording(true);
    setStatus({ type: 'success', message: 'Perfect! Your pitch has been recorded and transcribed.' });
  };

  const generateAISuggestions = async () => {
    setIsGeneratingSuggestions(true);
    
    try {
      const response = await fetch('/api/analyze-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          content: transcript,
          type: 'pitch'
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setAISuggestions({
          title: data.suggestions.title,
          summary: data.suggestions.summary,
          tags: data.suggestions.tags
        });
        
        // Auto-populate form fields
        setTitle(data.suggestions.title);
        setDescription(data.suggestions.summary);
        setTags(data.suggestions.tags);
        
        setStatus({ type: 'success', message: 'AI suggestions generated! Feel free to edit them as needed.' });
      } else {
        throw new Error(data.error || 'Failed to generate suggestions');
      }
    } catch (error) {
      console.error('Error generating AI suggestions:', error);
      setStatus({ 
        type: 'error', 
        message: 'Unable to generate AI suggestions. Please fill out the form manually.' 
      });
      
      // Set basic suggestions as fallback
      const firstSentence = transcript.split(/[.!?]/)[0]?.trim();
      if (firstSentence && firstSentence.length > 10 && firstSentence.length < 100) {
        setTitle(firstSentence);
      }
      setDescription(transcript.substring(0, 200) + '...');
    } finally {
      setIsGeneratingSuggestions(false);
    }
  };

  const handleContinueToForm = async () => {
    setCurrentStep(2);
    await generateAISuggestions();
  };

  const addTag = (tag: string) => {
    if (tag.trim() && !tags.includes(tag.trim())) {
      setTags([...tags, tag.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(tagInput);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      setStatus({ type: 'error', message: 'Please add a title for your pitch.' });
      return;
    }

    if (!transcript.trim()) {
      setStatus({ type: 'error', message: 'No transcript available. Please record your pitch first.' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: 'info', message: 'Submitting your pitch...' });

    try {
      const response = await fetch('/api/submit-pitch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          transcript: transcript.trim(),
          audioUrl: audioUrl,
          tags: tags
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit pitch');
      }

      const data = await response.json();
      
      if (data.success) {
        setStatus({ 
          type: 'success', 
          message: 'Pitch submitted successfully! 🎉 Your idea is now live on the platform.' 
        });
        
        // Reset form after successful submission
        setTimeout(() => {
          setCurrentStep(1);
          setTranscript('');
          setAudioUrl('');
          setHasRecording(false);
          setTitle('');
          setDescription('');
          setTags([]);
          setAISuggestions(null);
          setStatus(null);
        }, 3000);
      } else {
        throw new Error(data.error || 'Failed to submit pitch');
      }
    } catch (error) {
      console.error('Error submitting pitch:', error);
      setStatus({ 
        type: 'error', 
        message: `Failed to submit pitch: ${error instanceof Error ? error.message : 'Unknown error'}` 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToRecording = () => {
    setCurrentStep(1);
    setAISuggestions(null);
    setStatus(null);
  };

  return (
    <>
      <Head>
        <title>Record Your Pitch - Be the Catalyst</title>
        <meta name="description" content="Share your bold idea with the community. Record a 60-second pitch and spark your next collaboration." />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <GlobalStyle />
      
      <div className={geistSans.variable}>
        {/* Header */}
        <MobileNavigation 
          currentPage="/record"
          primaryButton={{ href: '/explore', text: '👀 Explore Pitches', variant: 'secondary' }}
        />

        {/* Main Content */}
        <Main>
          <Container>
            {/* Page Header */}
            <PageHeader>
              <PageTitle>Record Your Pitch</PageTitle>
              <PageSubtitle>
                Share your bold idea with the community. Our AI will help you create the perfect pitch.
              </PageSubtitle>
            </PageHeader>

            {/* Stepper */}
            <StepperContainer>
              <StepperNav>
                <Step completed={currentStep > 1} active={currentStep === 1}>
                  <StepCircle completed={currentStep > 1} active={currentStep === 1}>
                    {currentStep > 1 ? '✓' : '1'}
                  </StepCircle>
                  <StepLabel completed={currentStep > 1} active={currentStep === 1}>
                    Record Your Pitch
                  </StepLabel>
                </Step>
                <Step active={currentStep === 2}>
                  <StepCircle active={currentStep === 2}>
                    2
                  </StepCircle>
                  <StepLabel active={currentStep === 2}>
                    Complete Details
                  </StepLabel>
                </Step>
              </StepperNav>
            </StepperContainer>

            {status && (
              <StatusMessage type={status.type}>
                {status.message}
              </StatusMessage>
            )}

            {/* Step 1: Recording */}
            {currentStep === 1 && (
              <RecordingCard>
                <RecordingTitle>🎙️ Record Your Pitch</RecordingTitle>
                <RecordingInstructions>
                  Share your idea in 60 seconds or less. Don&apos;t worry about being perfect – our AI will help you polish it in the next step.
                </RecordingInstructions>
                
                <TranscriberContainer>
                  <Transcriber 
                    onTranscriptReady={handleTranscriptReady}
                    inline={true}
                  />
                </TranscriberContainer>

                {transcript && (
                  <TranscriptSection>
                    <TranscriptTitle>📝 Your Pitch Transcript:</TranscriptTitle>
                    <TranscriptText>{transcript}</TranscriptText>
                    {audioUrl && (
                      <AudioPlayer controls>
                        <source src={audioUrl} type="audio/webm" />
                        <source src={audioUrl} type="audio/wav" />
                        Your browser does not support the audio element.
                      </AudioPlayer>
                    )}
                  </TranscriptSection>
                )}

                {hasRecording && (
                  <ContinueButton onClick={handleContinueToForm}>
                    ✨ Continue to AI Enhancement
                  </ContinueButton>
                )}
              </RecordingCard>
            )}

            {/* Step 2: Form with AI Suggestions */}
            {currentStep === 2 && (
              <>
                {isGeneratingSuggestions ? (
                  <FormCard>
                    <LoadingState>
                      <LoadingSpinner />
                      Analyzing your pitch with AI...
                    </LoadingState>
                  </FormCard>
                ) : (
                  <FormCard>
                    <FormTitle>🤖 AI-Enhanced Pitch Details</FormTitle>
                    <FormSubtitle>
                      Our AI has analyzed your pitch and generated suggestions below. Feel free to edit them to match your vision perfectly.
                    </FormSubtitle>
                    
                    <FormGroup>
                      <AIGeneratedLabel>
                        ✨ AI Generated
                      </AIGeneratedLabel>
                      <Label htmlFor="title">Pitch Title *</Label>
                      <Input
                        id="title"
                        type="text"
                        placeholder="AI will suggest a catchy title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </FormGroup>

                    <FormGroup>
                      <AIGeneratedLabel>
                        ✨ AI Generated
                      </AIGeneratedLabel>
                      <Label htmlFor="description">Pitch Summary</Label>
                      <TextArea
                        id="description"
                        placeholder="AI will create a compelling summary..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </FormGroup>

                    <FormGroup>
                      <AIGeneratedLabel>
                        ✨ AI Generated
                      </AIGeneratedLabel>
                      <Label>Tags</Label>
                      <TagInput>
                        {tags.map(tag => (
                          <TagItem key={tag}>
                            {tag}
                            <RemoveTag onClick={() => removeTag(tag)}>×</RemoveTag>
                          </TagItem>
                        ))}
                        <TagInputField
                          placeholder="Add more tags..."
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyPress={handleTagInputKeyPress}
                        />
                      </TagInput>
                    </FormGroup>
                  </FormCard>
                )}

                {!isGeneratingSuggestions && (
                  <SubmitCard>
                    <ButtonGroup>
                      <BackButton onClick={handleBackToRecording} disabled={isSubmitting}>
                        ← Back to Recording
                      </BackButton>
                      <SubmitButton onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? '📤 Publishing...' : '🚀 Publish Your Pitch'}
                      </SubmitButton>
                    </ButtonGroup>
                  </SubmitCard>
                )}
              </>
            )}
          </Container>
        </Main>
      </div>
    </>
  );
} 