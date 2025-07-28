import Head from "next/head";
import styled, { createGlobalStyle } from "styled-components";
import { Geist } from "next/font/google";
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
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

const Main = styled.main`
  padding: 40px 0 80px;
  
  @media (max-width: 768px) {
    padding: 20px 0 60px;
  }
`;

// Hero Section
const HeroSection = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 80px 0;
  margin: -40px -20px 60px -20px;
  
  @media (max-width: 768px) {
    margin: -20px -16px 40px -16px;
    padding: 60px 0;
  }
  
  @media (max-width: 480px) {
    margin: -20px -16px 32px -16px;
    padding: 48px 0;
  }
`;

const HeroContent = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  opacity: 0.9;
  line-height: 1.6;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

// Content Sections
const Section = styled.section`
  background: white;
  padding: 60px 40px;
  border-radius: 20px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    padding: 40px 20px;
    border-radius: 16px;
    margin-bottom: 30px;
  }
  
  @media (max-width: 480px) {
    padding: 24px 16px;
    border-radius: 12px;
    margin-bottom: 24px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #2d3748;
  margin-bottom: 30px;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
    margin-bottom: 20px;
  }
`;

const SectionContent = styled.div`
  max-width: 700px;
  margin: 0 auto;
  color: #4a5568;
  line-height: 1.8;
  font-size: 1.1rem;
  
  p {
    margin-bottom: 20px;
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.6;
  }
`;

// Mission Section
const MissionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 40px;
  
  @media (max-width: 768px) {
    gap: 20px;
    margin-top: 30px;
  }
`;

const MissionCard = styled.div`
  text-align: center;
  padding: 30px 20px;
  
  @media (max-width: 768px) {
    padding: 20px 15px;
  }
`;

const MissionIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }
`;

const MissionTitle = styled.h3`
  font-size: 1.25rem;
  color: #2d3748;
  margin-bottom: 15px;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const MissionText = styled.p`
  color: #718096;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

// Stats Section
const StatsSection = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 60px 40px;
  border-radius: 20px;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    padding: 40px 20px;
    border-radius: 16px;
    margin-bottom: 30px;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  text-align: center;
  
  @media (max-width: 768px) {
    gap: 30px;
  }
`;

const StatCard = styled.div``;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const StatLabel = styled.div`
  font-size: 1.1rem;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

// Team Section
const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 40px;
  
  @media (max-width: 768px) {
    gap: 20px;
    margin-top: 30px;
  }
`;

const TeamCard = styled.div`
  text-align: center;
  padding: 20px;
`;

const TeamAvatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 2rem;
  margin: 0 auto 20px;
  
  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
    font-size: 1.5rem;
  }
`;

const TeamName = styled.h4`
  font-size: 1.2rem;
  color: #2d3748;
  margin-bottom: 8px;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const TeamRole = styled.p`
  color: #667eea;
  font-weight: 500;
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const TeamBio = styled.p`
  color: #718096;
  font-size: 0.9rem;
  line-height: 1.5;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

// CTA Section
const CTASection = styled.section`
  background: #f7fafc;
  padding: 60px 40px;
  border-radius: 20px;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 40px 20px;
    border-radius: 16px;
  }
`;

const CTATitle = styled.h2`
  font-size: 2rem;
  color: #2d3748;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const CTAText = styled.p`
  font-size: 1.1rem;
  color: #718096;
  margin-bottom: 30px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const CTAButton = styled.a<{ variant?: 'primary' | 'secondary' }>`
  padding: 15px 30px;
  border-radius: 25px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-block;
  
  ${props => props.variant === 'primary' ? `
    background: #ff6b6b;
    color: white;
    &:hover {
      background: #ff5252;
      transform: translateY(-2px);
    }
  ` : `
    background: #667eea;
    color: white;
    &:hover {
      background: #5a67d8;
      transform: translateY(-2px);
    }
  `}
  
  &:active {
    transform: scale(0.98);
  }
  
  @media (max-width: 768px) {
    padding: 12px 24px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
      transform: none;
    }
  }
  
  @media (max-width: 480px) {
    padding: 14px 20px;
    min-height: 48px;
    font-size: 0.9rem;
  }
`;

export default function About() {
  return (
    <>
      <Head>
        <title>About - Be the Catalyst</title>
        <meta name="description" content="Learn about Catalyst - the platform connecting creators and sparking creative collaborations." />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <GlobalStyle />
      
      <div className={geistSans.variable}>
        <MobileNavigation 
          currentPage="/about"
          primaryButton={{ href: '/record', text: '🎤 Record Pitch', variant: 'primary' }}
        />

        <Main>
          {/* Hero Section */}
          <HeroSection>
            <Container>
              <HeroContent>
                <HeroTitle>About Catalyst</HeroTitle>
                <HeroSubtitle>
                  We believe every great idea deserves a chance to become reality. 
                  Catalyst is the platform where creators share bold visions and find their perfect collaborators.
                </HeroSubtitle>
              </HeroContent>
            </Container>
          </HeroSection>

          <Container>
            {/* Mission Section */}
            <Section>
              <SectionTitle>Our Mission</SectionTitle>
              <SectionContent>
                <p>
                  Too many brilliant ideas never see the light of day. They get stuck in the creator&apos;s mind, 
                  lacking the right team, resources, or connections to bring them to life. We&apos;re changing that.
                </p>
                <p>
                  Catalyst transforms how creative collaboration happens. By making it simple to share ideas 
                  through voice pitches and connecting creators with potential collaborators, we&apos;re building 
                  a world where inspiration quickly becomes action.
                </p>
              </SectionContent>
              
              <MissionGrid>
                <MissionCard>
                  <MissionIcon>🚀</MissionIcon>
                  <MissionTitle>Amplify Ideas</MissionTitle>
                  <MissionText>
                    Help creators get unstuck by sharing their vision with the right audience
                  </MissionText>
                </MissionCard>
                <MissionCard>
                  <MissionIcon>🤝</MissionIcon>
                  <MissionTitle>Enable Connections</MissionTitle>
                  <MissionText>
                    Make it easy to find collaborators who share your passion and complement your skills
                  </MissionText>
                </MissionCard>
                <MissionCard>
                  <MissionIcon>⚡️</MissionIcon>
                  <MissionTitle>Spark Action</MissionTitle>
                  <MissionText>
                    Turn inspiration into tangible projects with tools for collaboration and progress
                  </MissionText>
                </MissionCard>
              </MissionGrid>
            </Section>

            {/* Stats Section */}
            {/* <StatsSection>
              <Container>
                <SectionTitle style={{ color: 'white', marginBottom: '40px' }}>
                  Building a Community of Creators
                </SectionTitle>
                <StatsGrid>
                  <StatCard>
                    <StatNumber>500+</StatNumber>
                    <StatLabel>Pitches Shared</StatLabel>
                  </StatCard>
                  <StatCard>
                    <StatNumber>150+</StatNumber>
                    <StatLabel>Collaborations Formed</StatLabel>
                  </StatCard>
                  <StatCard>
                    <StatNumber>50+</StatNumber>
                    <StatLabel>Projects Launched</StatLabel>
                  </StatCard>
                  <StatCard>
                    <StatNumber>24hrs</StatNumber>
                    <StatLabel>Avg. Response Time</StatLabel>
                  </StatCard>
                </StatsGrid>
              </Container>
            </StatsSection> */}

            {/* How It Started Section */}
            <Section>
              <SectionTitle>How It Started</SectionTitle>
              <SectionContent>
                <p>
                  Catalyst began with a simple observation: the best creative projects happen when the right 
                  people find each other at the right time. But in our disconnected world, brilliant minds 
                  often work in isolation, unaware of others who could help bring their ideas to life.
                </p>
                <p>
                  We started with voice because there&apos;s something powerful about hearing someone&apos;s passion 
                  for their idea. A 60-second pitch captures enthusiasm, personality, and vision in ways 
                  that text alone never could. From that simple foundation, we&apos;ve built a platform that 
                  makes creative collaboration feel natural and exciting.
                </p>
                <p>
                  Today, Catalyst is a growing community of creators, builders, designers, researchers, 
                  and dreamers who believe in the power of collaboration to make great ideas reality.
                </p>
              </SectionContent>
            </Section>

            {/* Team Section */}
            <Section>
              <SectionTitle>Built by the Community</SectionTitle>
              <SectionContent>
                <p>
                  Catalyst is built by creators, for creators. Our core team grew out of the community itself, 
                  and we continue to develop new features based on what our users need most.
                </p>
              </SectionContent>
              
              <TeamGrid>
                <TeamCard>
                  <TeamAvatar>🌟</TeamAvatar>
                  <TeamName>The Community</TeamName>
                  <TeamRole>Product Development</TeamRole>
                  <TeamBio>
                    Every feature, every improvement comes from listening to our creators and building what they need.
                  </TeamBio>
                </TeamCard>
                <TeamCard>
                  <TeamAvatar>🛠</TeamAvatar>
                  <TeamName>Core Contributors</TeamName>
                  <TeamRole>Platform Development</TeamRole>
                  <TeamBio>
                    Volunteer developers, designers, and strategists who believe in democratizing creative collaboration.
                  </TeamBio>
                </TeamCard>
                <TeamCard>
                  <TeamAvatar>💡</TeamAvatar>
                  <TeamName>Early Adopters</TeamName>
                  <TeamRole>Vision & Feedback</TeamRole>
                  <TeamBio>
                    The brave creators who shared the first pitches and helped shape what Catalyst could become.
                  </TeamBio>
                </TeamCard>
              </TeamGrid>
            </Section>

            {/* Values Section */}
            <Section>
              <SectionTitle>Our Values</SectionTitle>
              <SectionContent>
                <p><strong>Build in Public:</strong> We believe transparency fosters trust and better products. Our development process, challenges, and successes are shared openly with the community.</p>
                
                <p><strong>Inclusive Collaboration:</strong> Great ideas come from everywhere. We&apos;re committed to creating a platform where creators from all backgrounds can connect and thrive.</p>
                
                <p><strong>Action Over Perfection:</strong> We encourage creators to share early-stage ideas and iterate based on community feedback. Progress beats perfection.</p>
                
                <p><strong>Community First:</strong> Every decision we make prioritizes the needs and experience of our creative community over short-term metrics.</p>
              </SectionContent>
            </Section>

            {/* CTA Section */}
            <CTASection>
              <CTATitle>Ready to Be the Catalyst?</CTATitle>
              <CTAText>
                Join our community of creators who are turning bold ideas into reality through meaningful collaborations.
              </CTAText>
              <CTAButtons>
                <CTAButton href="/record" variant="primary">
                  🎤 Share Your Idea
                </CTAButton>
                <CTAButton href="/explore" variant="secondary">
                  👀 Explore Pitches
                </CTAButton>
              </CTAButtons>
            </CTASection>
          </Container>
        </Main>
      </div>
    </>
  );
} 