import Head from "next/head";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import { Geist } from "next/font/google";

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
    scroll-behavior: smooth;
  }
`;

// Animations
const waveform = keyframes`
  0%, 100% { height: 20px; }
  50% { height: 40px; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

// Layout Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Section = styled.section`
  padding: 80px 0;
  
  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

// Header
const Header = styled.header`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"><animate attributeName="opacity" values="0.1;0.3;0.1" dur="2s" repeatCount="indefinite"/></circle><circle cx="80" cy="30" r="1.5" fill="rgba(255,255,255,0.1)"><animate attributeName="opacity" values="0.1;0.4;0.1" dur="3s" repeatCount="indefinite"/></circle><circle cx="40" cy="70" r="1" fill="rgba(255,255,255,0.1)"><animate attributeName="opacity" values="0.1;0.5;0.1" dur="2.5s" repeatCount="indefinite"/></circle></svg>') repeat;
    pointer-events: none;
  }
`;

const HeroContent = styled.div`
  text-align: center;
  z-index: 1;
  position: relative;
`;

const MainHeading = styled.h1`
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const SubHeading = styled.p`
  font-size: 1.25rem;
  margin-bottom: 40px;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const CTAContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 60px;
  
  @media (max-width: 768px) {
    gap: 16px;
    margin-bottom: 40px;
  }
  
  @media (max-width: 480px) {
    gap: 12px;
    margin-bottom: 32px;
    flex-direction: column;
    align-items: center;
  }
`;

const CTAButton = styled.button<{ variant?: 'primary' | 'secondary' | 'tertiary' }>`
  padding: 15px 30px;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  
  ${props => props.variant === 'primary' && `
    background: #ff6b6b;
    color: white;
    &:hover {
      background: #ff5252;
      transform: translateY(-2px);
    }
  `}
  
  ${props => props.variant === 'secondary' && `
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.3);
    &:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
    }
  `}
  
  ${props => props.variant === 'tertiary' && `
    background: transparent;
    color: white;
    border: 2px solid white;
    &:hover {
      background: white;
      color: #667eea;
      transform: translateY(-2px);
    }
  `}
  
  &:active {
    transform: scale(0.98);
  }
  
  @media (max-width: 768px) {
    padding: 14px 24px;
    font-size: 1rem;
    min-height: 44px;
    
    &:hover {
      transform: none;
    }
  }
  
  @media (max-width: 480px) {
    padding: 12px 20px;
    font-size: 0.9rem;
    min-height: 48px;
  }
`;

const WaveformContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-top: 40px;
`;

const WaveformBar = styled.div<{ delay: number }>`
  width: 4px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 2px;
  animation: ${waveform} 1.5s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
`;

// How It Works Section
const HowItWorksSection = styled(Section)`
  background: #f8fafc;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 60px;
  color: #2d3748;
`;

const StepsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  margin-top: 60px;
`;

const StepCard = styled.div`
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const StepIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 20px;
`;

const StepTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #2d3748;
`;

const StepDescription = styled.p`
  color: #718096;
  line-height: 1.6;
`;

// Feed Preview Section
const FeedPreviewSection = styled(Section)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
`;

const FeedContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

const PitchCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: ${float} 6s ease-in-out infinite;
  
  &:nth-child(2) {
    animation-delay: -2s;
  }
  
  &:nth-child(3) {
    animation-delay: -4s;
  }
`;

const PitchTitle = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const PitchQuote = styled.p`
  font-style: italic;
  margin-bottom: 20px;
  opacity: 0.9;
  line-height: 1.5;
`;

const PitchSummary = styled.p`
  margin-bottom: 20px;
  font-size: 0.9rem;
  opacity: 0.8;
`;

const Tags = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background: rgba(255, 255, 255, 0.2);
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
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
`;

// Why It Matters Section
const WhyItMattersSection = styled(Section)`
  background: white;
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

const BenefitCard = styled.div`
  text-align: center;
  padding: 20px;
`;

const BenefitIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 15px;
`;

const BenefitText = styled.p`
  color: #4a5568;
  font-weight: 500;
`;

const TestimonialSection = styled.div`
  margin-top: 60px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`;

const TestimonialCard = styled.div`
  background: #f7fafc;
  padding: 30px;
  border-radius: 15px;
  border-left: 4px solid #667eea;
`;

const TestimonialText = styled.p`
  font-style: italic;
  color: #2d3748;
  margin-bottom: 15px;
  line-height: 1.6;
`;

const TestimonialAuthor = styled.p`
  color: #667eea;
  font-weight: 600;
`;

// Tools Section
const ToolsSection = styled(Section)`
  background: #f8fafc;
`;

const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

const ToolCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  text-align: center;
`;

const ToolIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 15px;
`;

const ToolTitle = styled.h4`
  margin-bottom: 10px;
  color: #2d3748;
`;

const ToolDescription = styled.p`
  color: #718096;
  font-size: 0.9rem;
`;

// Get Started Section
const GetStartedSection = styled(Section)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
`;

// Footer
const Footer = styled.footer`
  background: #2d3748;
  color: white;
  padding: 40px 0;
  text-align: center;
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const FooterLink = styled.a`
  color: #a0aec0;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: white;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const SocialLink = styled.a`
  color: #a0aec0;
  font-size: 1.5rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: #667eea;
  }
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>Be the Catalyst - Spark Creative Collaborations</title>
        <meta name="description" content="Listen to bold ideas. Read quick summaries. Respond to spark the next creative collaboration." />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <GlobalStyle />
      
      <div className={geistSans.variable}>
        {/* Hero Section */}
        <Header>
          <Container>
            <HeroContent>
              <MainHeading>Be the Catalyst.</MainHeading>
              <SubHeading>
                Listen to bold ideas. Read quick summaries. Respond to spark the next creative collaboration.
              </SubHeading>
              
              <CTAContainer>
                <CTAButton as="a" href="/record" variant="primary">
                  🎤 Record Your Pitch
                </CTAButton>
                <CTAButton as="a" href="/explore" variant="secondary">
                  👀 Explore Pitches
                </CTAButton>
                <CTAButton as="a" href="#how-it-works" variant="tertiary">
                  ⚡️ How It Works
                </CTAButton>
              </CTAContainer>
              
              <WaveformContainer>
                {[...Array(8)].map((_, i) => (
                  <WaveformBar key={i} delay={i * 0.1} />
                ))}
              </WaveformContainer>
            </HeroContent>
          </Container>
        </Header>

        {/* How It Works Section */}
        <HowItWorksSection id="how-it-works">
          <Container>
            <SectionTitle>How It Works</SectionTitle>
            <StepsContainer>
              <StepCard>
                <StepIcon>🗣</StepIcon>
                <StepTitle>Share Your Idea</StepTitle>
                <StepDescription>
                  Record a 60-second voice pitch. Tell us your idea, what you&apos;re building, or what you need help with.
                </StepDescription>
              </StepCard>
              
              <StepCard>
                <StepIcon>✍️</StepIcon>
                <StepTitle>We Summarize It</StepTitle>
                <StepDescription>
                  AI transcribes and summarizes your pitch into a clean, readable, and listenable format for the feed.
                </StepDescription>
              </StepCard>
              
              <StepCard>
                <StepIcon>⚡️</StepIcon>
                <StepTitle>Others Become the Catalyst</StepTitle>
                <StepDescription>
                  Community members respond, remix, or offer collaboration. Every idea becomes a potential team.
                </StepDescription>
              </StepCard>
            </StepsContainer>
          </Container>
        </HowItWorksSection>

        {/* Live Catalyst Feed Preview */}
        <FeedPreviewSection>
          <Container>
            <SectionTitle style={{ color: 'white' }}>Live Catalyst Feed Preview</SectionTitle>
            <FeedContainer>
              <PitchCard>
                <PitchTitle>
                  🎧 Mercedes P. | &quot;Culture Energy&quot;
                </PitchTitle>
                                 <PitchQuote>
                   &quot;What if clean energy infrastructure was led by Black-owned businesses and built into everyday community life—like barbershops and salons?&quot;
                 </PitchQuote>
                <PitchSummary>
                  Mercedes is working on a decentralized clean energy brand rooted in community-owned infrastructure and culture. She&apos;s looking for storytellers, hardware engineers, and grant partners.
                </PitchSummary>
                <Tags>
                  <Tag>🌱 CleanTech</Tag>
                  <Tag>🏘 Community</Tag>
                  <Tag>💸 Needs Funding</Tag>
                </Tags>
                <CatalystButton>⚡️ Be the Catalyst</CatalystButton>
              </PitchCard>
              
              <PitchCard>
                <PitchTitle>
                  🎮 Alex K. | &quot;Mindful Gaming&quot;
                </PitchTitle>
                                 <PitchQuote>
                   &quot;Gaming for mental health—what if we could measure stress reduction through play and create therapeutic game experiences?&quot;
                 </PitchQuote>
                 <PitchSummary>
                   Alex is developing games that promote mindfulness and track mental health metrics. Looking for psychology researchers and Unity developers.
                 </PitchSummary>
                <Tags>
                  <Tag>🎮 Gaming</Tag>
                  <Tag>🧠 Mental Health</Tag>
                  <Tag>🔥 Needs Dev</Tag>
                </Tags>
                <CatalystButton>⚡️ Be the Catalyst</CatalystButton>
              </PitchCard>
              
              <PitchCard>
                <PitchTitle>
                  🎨 Sara L. | &quot;Local Art Marketplace&quot;
                </PitchTitle>
                                 <PitchQuote>
                   &quot;Connecting local artists directly with their communities through an AR-enabled street art discovery app.&quot;
                 </PitchQuote>
                <PitchSummary>
                  Sara wants to help local artists monetize their work through augmented reality experiences. Seeking AR developers and community organizers.
                </PitchSummary>
                <Tags>
                  <Tag>🎨 Art</Tag>
                  <Tag>📱 AR/VR</Tag>
                  <Tag>🎨 Needs Design</Tag>
                </Tags>
                <CatalystButton>⚡️ Be the Catalyst</CatalystButton>
              </PitchCard>
            </FeedContainer>
          </Container>
        </FeedPreviewSection>

        {/* Why It Matters Section */}
        <WhyItMattersSection>
          <Container>
            <SectionTitle>Ideas die in silence. Let&apos;s build in public—together.</SectionTitle>
            <BenefitsGrid>
              <BenefitCard>
                <BenefitIcon>🚀</BenefitIcon>
                <BenefitText>Help creators get unstuck</BenefitText>
              </BenefitCard>
              <BenefitCard>
                <BenefitIcon>🤝</BenefitIcon>
                <BenefitText>Build projects from meaningful connections</BenefitText>
              </BenefitCard>
              <BenefitCard>
                <BenefitIcon>💡</BenefitIcon>
                <BenefitText>Turn inspiration into action</BenefitText>
              </BenefitCard>
              <BenefitCard>
                <BenefitIcon>👥</BenefitIcon>
                <BenefitText>Make it easy to find your people</BenefitText>
              </BenefitCard>
            </BenefitsGrid>
            
            <TestimonialSection>
              <TestimonialCard>
                <TestimonialText>
                  &quot;I pitched my idea, and two collaborators reached out in 24 hours.&quot;
                </TestimonialText>
                <TestimonialAuthor>— Jamie R., Founder</TestimonialAuthor>
              </TestimonialCard>
              <TestimonialCard>
                <TestimonialText>
                  &quot;It&apos;s like speed-dating for creative ideas.&quot;
                </TestimonialText>
                <TestimonialAuthor>— Morgan T., Designer</TestimonialAuthor>
              </TestimonialCard>
            </TestimonialSection>
          </Container>
        </WhyItMattersSection>

        {/* Tools Section */}
        <ToolsSection>
          <Container>
            <SectionTitle>Tools + What You Get</SectionTitle>
            <ToolsGrid>
              <ToolCard>
                <ToolIcon>📄</ToolIcon>
                <ToolTitle>Your Own Idea Page</ToolTitle>
                <ToolDescription>A dedicated space for your pitch with analytics and engagement tracking.</ToolDescription>
              </ToolCard>
              <ToolCard>
                <ToolIcon>🔔</ToolIcon>
                <ToolTitle>Real-time Notifications</ToolTitle>
                <ToolDescription>Get notified instantly when someone responds to your idea or wants to collaborate.</ToolDescription>
              </ToolCard>
              <ToolCard>
                <ToolIcon>🛠</ToolIcon>
                <ToolTitle>Collaboration Space</ToolTitle>
                <ToolDescription>Optional project cards to organize team formation and track progress.</ToolDescription>
              </ToolCard>
              <ToolCard>
                <ToolIcon>🏆</ToolIcon>
                <ToolTitle>Achievement Relics</ToolTitle>
                <ToolDescription>POAPs and digital relics to mark key moments in your creative journey.</ToolDescription>
              </ToolCard>
            </ToolsGrid>
          </Container>
        </ToolsSection>

        {/* Get Started Section */}
        <GetStartedSection>
          <Container>
            <SectionTitle style={{ color: 'white' }}>Got an idea? You&apos;re 60 seconds away from potential.</SectionTitle>
            <CTAContainer>
              <CTAButton as="a" href="/record" variant="primary">
                🎤 Record Your Pitch
              </CTAButton>
              <CTAButton as="a" href="/explore" variant="secondary">
                👀 Browse Feed
              </CTAButton>
              <CTAButton variant="tertiary">
                🧪 Try a Demo Pitch
              </CTAButton>
            </CTAContainer>
          </Container>
        </GetStartedSection>

        {/* Footer */}
        <Footer>
          <Container>
            <FooterLinks>
              <FooterLink href="#about">About</FooterLink>
              <FooterLink href="#faq">FAQ</FooterLink>
              <FooterLink href="#terms">Terms</FooterLink>
              <FooterLink href="#guidelines">Community Guidelines</FooterLink>
            </FooterLinks>
            <SocialLinks>
              <SocialLink href="#twitter">🐦</SocialLink>
              <SocialLink href="#discord">💬</SocialLink>
              <SocialLink href="#contact">📧</SocialLink>
            </SocialLinks>
            <p style={{ color: '#a0aec0', fontSize: '0.9rem' }}>
              Built by the Catalyst Community
            </p>
          </Container>
        </Footer>
      </div>
    </>
  );
}
