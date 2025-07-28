import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

interface MobileNavigationProps {
  currentPage?: string;
  primaryButton?: {
    href: string;
    text: string;
    variant?: 'primary' | 'secondary';
  };
}

// Header Components
const Header = styled.header`
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 16px 0;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95);
  
  @media (max-width: 768px) {
    padding: 12px 0;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 800;
  color: #667eea;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: #764ba2;
  }
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

// Desktop Navigation
const DesktopNavLinks = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

// Mobile Navigation
const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 12px;
  border-radius: 8px;
  transition: all 0.3s ease;
  min-height: 44px;
  min-width: 44px;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #f7fafc;
  }
  
  &:active {
    background-color: #edf2f7;
  }
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const HamburgerLine = styled.div<{ isOpen: boolean; position: 'top' | 'middle' | 'bottom' }>`
  width: 24px;
  height: 3px;
  background-color: #4a5568;
  margin: 2px 0;
  transition: all 0.3s ease;
  border-radius: 2px;
  
  ${({ isOpen, position }) => {
    if (!isOpen) return '';
    
    switch (position) {
      case 'top':
        return 'transform: rotate(45deg) translate(6px, 6px);';
      case 'middle':
        return 'opacity: 0;';
      case 'bottom':
        return 'transform: rotate(-45deg) translate(6px, -6px);';
      default:
        return '';
    }
  }}
`;

const MobileNavOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: all 0.3s ease;
  z-index: 999;
  backdrop-filter: blur(4px);
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileNavMenu = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 300px;
  background: white;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '100%')});
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  overflow-y: auto;
  
  @media (max-width: 480px) {
    width: 100%;
  }
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileNavHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8fafc;
  
  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const MobileNavClose = styled.button`
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #4a5568;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.3s ease;
  min-height: 44px;
  min-width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #f7fafc;
    color: #2d3748;
  }
  
  &:active {
    background-color: #edf2f7;
  }
`;

const MobileNavLinks = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  @media (max-width: 768px) {
    padding: 16px;
  }
`;

// Shared Link Styles
const NavLink = styled(Link)<{ isActive?: boolean }>`
  color: ${({ isActive }) => (isActive ? '#667eea' : '#4a5568')};
  text-decoration: none;
  font-weight: ${({ isActive }) => (isActive ? '600' : '500')};
  transition: all 0.3s ease;
  padding: 16px 20px;
  border-radius: 12px;
  display: block;
  font-size: 1.1rem;
  
  &:hover {
    color: #667eea;
    background-color: #f7fafc;
  }
  
  &:active {
    background-color: #edf2f7;
  }
  
  @media (max-width: 768px) {
    padding: 14px 16px;
    font-size: 1rem;
    min-height: 44px;
    display: flex;
    align-items: center;
  }
`;

const PrimaryButton = styled(Link)`
  background: #ff6b6b;
  color: white;
  text-decoration: none;
  padding: 16px 24px;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-block;
  text-align: center;
  margin-top: 16px;
  
  &:hover {
    background: #ff5252;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    padding: 14px 20px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 12px;
    
    &:hover {
      transform: none;
    }
  }
`;

const SecondaryButton = styled(Link)`
  background: #667eea;
  color: white;
  text-decoration: none;
  padding: 16px 24px;
  border-radius: 25px;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-block;
  text-align: center;
  margin-top: 16px;
  
  &:hover {
    background: #5a67d8;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    padding: 14px 20px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 12px;
    
    &:hover {
      transform: none;
    }
  }
`;

const MobileNavigation: React.FC<MobileNavigationProps> = ({ 
  currentPage,
  primaryButton = { href: '/record', text: '🎤 Record Pitch', variant: 'primary' }
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { href: '/', text: 'Home' },
    { href: '/explore', text: 'Explore' },
    { href: '/about', text: 'About' },
  ];

  const ButtonComponent = primaryButton.variant === 'secondary' ? SecondaryButton : PrimaryButton;

  return (
    <>
      <Header>
        <Container>
          <Nav>
            <Logo href="/">⚡️ Catalyst</Logo>
            
            {/* Desktop Navigation */}
            <DesktopNavLinks>
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  isActive={currentPage === link.href}
                >
                  {link.text}
                </NavLink>
              ))}
              <ButtonComponent href={primaryButton.href}>
                {primaryButton.text}
              </ButtonComponent>
            </DesktopNavLinks>

            {/* Mobile Menu Button */}
            <MobileMenuButton onClick={toggleMenu} aria-label="Toggle mobile menu">
              <HamburgerLine isOpen={isMenuOpen} position="top" />
              <HamburgerLine isOpen={isMenuOpen} position="middle" />
              <HamburgerLine isOpen={isMenuOpen} position="bottom" />
            </MobileMenuButton>
          </Nav>
        </Container>
      </Header>

      {/* Mobile Navigation Overlay and Menu */}
      <MobileNavOverlay isOpen={isMenuOpen} onClick={closeMenu} />
      <MobileNavMenu isOpen={isMenuOpen}>
        <MobileNavHeader>
          <Logo href="/" onClick={closeMenu}>⚡️ Catalyst</Logo>
          <MobileNavClose onClick={closeMenu} aria-label="Close menu">×</MobileNavClose>
        </MobileNavHeader>
        <MobileNavLinks>
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              isActive={currentPage === link.href}
              onClick={closeMenu}
            >
              {link.text}
            </NavLink>
          ))}
          <ButtonComponent href={primaryButton.href} onClick={closeMenu}>
            {primaryButton.text}
          </ButtonComponent>
        </MobileNavLinks>
      </MobileNavMenu>
    </>
  );
};

export default MobileNavigation; 