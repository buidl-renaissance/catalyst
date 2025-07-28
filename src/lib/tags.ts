// Standard tags that are always available
export const STANDARD_TAGS = [
  "🌱 CleanTech",
  "🎮 Gaming", 
  "🎨 Art",
  "🤖 AI/ML",
  "📚 Education",
  "🌊 Ocean",
  "💸 Needs Funding",
  "🔥 Needs Dev",
  "🎨 Needs Design"
] as const;

export type StandardTag = typeof STANDARD_TAGS[number];

// Function to check if a tag is a standard tag
export function isStandardTag(tag: string): tag is StandardTag {
  return STANDARD_TAGS.includes(tag as StandardTag);
}

// Function to get all available tags (standard + custom)
export function getAllTags(existingTags: string[] = []): string[] {
  const uniqueTags = [...new Set([...STANDARD_TAGS, ...existingTags])];
  return uniqueTags.sort((a, b) => {
    // Sort standard tags first, then custom tags
    const aIsStandard = isStandardTag(a);
    const bIsStandard = isStandardTag(b);
    
    if (aIsStandard && !bIsStandard) return -1;
    if (!aIsStandard && bIsStandard) return 1;
    
    return a.localeCompare(b);
  });
}

// Function to validate and clean tags
export function validateTags(tags: string[]): string[] {
  return tags
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0)
    .filter((tag, index, array) => array.indexOf(tag) === index); // Remove duplicates
}

// Function to suggest tags based on content
export function suggestTags(content: string): string[] {
  const suggestions: string[] = [];
  const lowerContent = content.toLowerCase();
  
  // Check for standard tag matches
  if (lowerContent.includes('clean') || lowerContent.includes('sustain') || lowerContent.includes('green') || lowerContent.includes('environment')) {
    suggestions.push('🌱 CleanTech');
  }
  
  if (lowerContent.includes('game') || lowerContent.includes('play') || lowerContent.includes('entertainment')) {
    suggestions.push('🎮 Gaming');
  }
  
  if (lowerContent.includes('art') || lowerContent.includes('creative') || lowerContent.includes('design') || lowerContent.includes('visual')) {
    suggestions.push('🎨 Art');
  }
  
  if (lowerContent.includes('ai') || lowerContent.includes('machine learning') || lowerContent.includes('artificial intelligence') || lowerContent.includes('algorithm')) {
    suggestions.push('🤖 AI/ML');
  }
  
  if (lowerContent.includes('learn') || lowerContent.includes('education') || lowerContent.includes('school') || lowerContent.includes('teach')) {
    suggestions.push('📚 Education');
  }
  
  if (lowerContent.includes('ocean') || lowerContent.includes('marine') || lowerContent.includes('sea') || lowerContent.includes('water')) {
    suggestions.push('🌊 Ocean');
  }
  
  // Check for needs
  if (lowerContent.includes('fund') || lowerContent.includes('money') || lowerContent.includes('investment') || lowerContent.includes('capital')) {
    suggestions.push('💸 Needs Funding');
  }
  
  if (lowerContent.includes('developer') || lowerContent.includes('programmer') || lowerContent.includes('engineer') || lowerContent.includes('code')) {
    suggestions.push('🔥 Needs Dev');
  }
  
  if (lowerContent.includes('designer') || lowerContent.includes('ui') || lowerContent.includes('ux') || lowerContent.includes('visual')) {
    suggestions.push('🎨 Needs Design');
  }
  
  return suggestions;
} 