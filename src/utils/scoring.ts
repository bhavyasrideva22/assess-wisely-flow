import { psychometricQuestions, technicalQuestions } from "@/data/questions";

export interface WISCARScore {
  dimension: string;
  score: number;
}

export interface ScoreBreakdown {
  category: string;
  score: number;
}

export interface CareerPath {
  title: string;
  description: string;
  match: number;
}

export interface LearningStep {
  phase: string;
  skills: string[];
}

export interface AssessmentResults {
  overallScore: number;
  recommendation: "Yes" | "Maybe" | "No";
  summary: string;
  wiscar: WISCARScore[];
  breakdown: ScoreBreakdown[];
  careerPaths: CareerPath[];
  learningPath: LearningStep[];
  strengths: string[];
  improvements: string[];
  nextSteps: string;
}

export const calculateResults = (answers: Record<string, string>): AssessmentResults => {
  // Calculate psychometric scores
  const psychometricScores = calculatePsychometricScores(answers);
  const technicalScores = calculateTechnicalScores(answers);
  
  // Calculate WISCAR dimensions
  const wiscarScores = calculateWISCARScores(psychometricScores, technicalScores);
  
  // Calculate overall score (weighted average)
  const overallScore = Math.round(
    (psychometricScores.overall * 0.6) + (technicalScores.overall * 0.4)
  );
  
  // Determine recommendation
  const recommendation = getRecommendation(overallScore, wiscarScores);
  
  // Generate insights
  const insights = generateInsights(overallScore, psychometricScores, technicalScores, wiscarScores);
  
  return {
    overallScore,
    recommendation,
    summary: generateSummary(recommendation, overallScore),
    wiscar: wiscarScores,
    breakdown: [
      { category: "Interest & Motivation", score: psychometricScores.interest },
      { category: "Personality Fit", score: psychometricScores.personality },
      { category: "Cognitive Style", score: psychometricScores.cognitive },
      { category: "Technical Aptitude", score: technicalScores.overall },
      { category: "Domain Knowledge", score: technicalScores.domain }
    ],
    careerPaths: generateCareerPaths(overallScore, psychometricScores, technicalScores),
    learningPath: generateLearningPath(recommendation, technicalScores),
    strengths: insights.strengths,
    improvements: insights.improvements,
    nextSteps: insights.nextSteps
  };
};

const calculatePsychometricScores = (answers: Record<string, string>) => {
  const psychQuestions = psychometricQuestions;
  let interestTotal = 0, personalityTotal = 0, cognitiveTotal = 0, motivationTotal = 0;
  let interestCount = 0, personalityCount = 0, cognitiveCount = 0, motivationCount = 0;
  
  psychQuestions.forEach((question, index) => {
    const answer = answers[`psychometric_${index}`];
    if (answer) {
      const score = parseInt(answer);
      
      switch (question.type) {
        case "interest":
          interestTotal += score;
          interestCount++;
          break;
        case "personality":
          personalityTotal += score;
          personalityCount++;
          break;
        case "cognitive":
          cognitiveTotal += score;
          cognitiveCount++;
          break;
        case "motivation":
          motivationTotal += score;
          motivationCount++;
          break;
      }
    }
  });
  
  const interest = interestCount > 0 ? Math.round((interestTotal / interestCount) * 20) : 0;
  const personality = personalityCount > 0 ? Math.round((personalityTotal / personalityCount) * 20) : 0;
  const cognitive = cognitiveCount > 0 ? Math.round((cognitiveTotal / cognitiveCount) * 20) : 0;
  const motivation = motivationCount > 0 ? Math.round((motivationTotal / motivationCount) * 20) : 0;
  
  return {
    interest,
    personality,
    cognitive,
    motivation,
    overall: Math.round((interest + personality + cognitive + motivation) / 4)
  };
};

const calculateTechnicalScores = (answers: Record<string, string>) => {
  const techQuestions = technicalQuestions;
  let logicalTotal = 0, numericalTotal = 0, programmingTotal = 0, domainTotal = 0;
  let logicalCount = 0, numericalCount = 0, programmingCount = 0, domainCount = 0;
  
  techQuestions.forEach((question, index) => {
    const answer = answers[`technical_${index}`];
    if (answer) {
      const option = question.options.find(opt => opt.value === answer);
      if (option && option.score) {
        const score = option.score;
        
        switch (question.type) {
          case "logical":
            logicalTotal += score;
            logicalCount++;
            break;
          case "numerical":
            numericalTotal += score;
            numericalCount++;
            break;
          case "programming":
            programmingTotal += score;
            programmingCount++;
            break;
          case "domain":
            domainTotal += score;
            domainCount++;
            break;
        }
      }
    }
  });
  
  const logical = logicalCount > 0 ? Math.round((logicalTotal / logicalCount) * 20) : 0;
  const numerical = numericalCount > 0 ? Math.round((numericalTotal / numericalCount) * 20) : 0;
  const programming = programmingCount > 0 ? Math.round((programmingTotal / programmingCount) * 20) : 0;
  const domain = domainCount > 0 ? Math.round((domainTotal / domainCount) * 20) : 0;
  
  return {
    logical,
    numerical,
    programming,
    domain,
    overall: Math.round((logical + numerical + programming + domain) / 4)
  };
};

const calculateWISCARScores = (psychScores: any, techScores: any): WISCARScore[] => {
  return [
    { dimension: "Will", score: psychScores.motivation },
    { dimension: "Interest", score: psychScores.interest },
    { dimension: "Skill", score: techScores.overall },
    { dimension: "Cognitive Readiness", score: psychScores.cognitive },
    { dimension: "Ability to Learn", score: Math.round((psychScores.motivation + psychScores.cognitive) / 2) },
    { dimension: "Real-World Alignment", score: techScores.domain }
  ];
};

const getRecommendation = (overallScore: number, wiscarScores: WISCARScore[]): "Yes" | "Maybe" | "No" => {
  const avgWiscar = wiscarScores.reduce((sum, score) => sum + score.score, 0) / wiscarScores.length;
  
  if (overallScore >= 75 && avgWiscar >= 70) return "Yes";
  if (overallScore >= 60 && avgWiscar >= 55) return "Maybe";
  return "No";
};

const generateSummary = (recommendation: string, score: number): string => {
  switch (recommendation) {
    case "Yes":
      return `Excellent! You demonstrate strong aptitude and alignment for a career as a Compliance Automation Specialist. Your score of ${score}% indicates you have the right combination of technical skills, regulatory interest, and personality traits to thrive in this role.`;
    case "Maybe":
      return `Good potential! Your score of ${score}% shows you have foundational strengths for compliance automation work. With focused development in key areas, you could become well-suited for this career path.`;
    case "No":
      return `While your current score of ${score}% suggests this may not be your optimal career path right now, consider exploring related roles or building foundational skills before reassessing your fit for compliance automation.`;
    default:
      return "";
  }
};

const generateCareerPaths = (overallScore: number, psychScores: any, techScores: any): CareerPath[] => {
  const paths = [
    {
      title: "Compliance Automation Specialist",
      description: "Automate regulatory reporting and compliance monitoring",
      match: Math.min(95, overallScore + 5)
    },
    {
      title: "Risk Analyst with Automation Focus", 
      description: "Analyze risks using automated tools and frameworks",
      match: Math.min(90, Math.round((techScores.logical + psychScores.cognitive) * 0.9))
    },
    {
      title: "RegTech Consultant",
      description: "Advise organizations on regulatory technology solutions", 
      match: Math.min(85, Math.round((techScores.domain + psychScores.overall) * 0.8))
    },
    {
      title: "Process Automation Engineer",
      description: "Design and implement automated business processes",
      match: Math.min(80, Math.round((techScores.programming + techScores.logical) * 0.8))
    }
  ];
  
  return paths.sort((a, b) => b.match - a.match);
};

const generateLearningPath = (recommendation: string, techScores: any): LearningStep[] => {
  const basePath = [
    {
      phase: "Foundation (1-3 months)",
      skills: ["Compliance fundamentals", "Basic Python programming", "Introduction to RPA concepts"]
    },
    {
      phase: "Intermediate (3-6 months)", 
      skills: ["Advanced automation tools", "GRC software training", "Real-world compliance projects"]
    },
    {
      phase: "Advanced (6-12 months)",
      skills: ["Industry certifications", "Portfolio development", "Practical experience/internship"]
    }
  ];
  
  if (recommendation === "No" || techScores.overall < 40) {
    basePath.unshift({
      phase: "Prerequisites (1-2 months)",
      skills: ["Basic computer literacy", "Analytical thinking development", "Regulatory awareness building"]
    });
  }
  
  return basePath;
};

const generateInsights = (overallScore: number, psychScores: any, techScores: any, wiscarScores: WISCARScore[]) => {
  const strengths = [];
  const improvements = [];
  
  // Analyze strengths
  if (psychScores.interest >= 80) strengths.push("Strong genuine interest in compliance and automation");
  if (psychScores.personality >= 75) strengths.push("Excellent personality fit for detail-oriented compliance work");
  if (techScores.logical >= 80) strengths.push("Outstanding logical reasoning and problem-solving abilities");
  if (techScores.domain >= 70) strengths.push("Good foundational knowledge of compliance concepts");
  if (psychScores.motivation >= 75) strengths.push("High motivation and persistence for challenging work");
  
  // Analyze improvements  
  if (techScores.programming < 60) improvements.push("Develop stronger programming and automation skills");
  if (techScores.domain < 50) improvements.push("Build deeper knowledge of compliance frameworks and regulations");
  if (psychScores.cognitive < 60) improvements.push("Enhance analytical thinking and structured problem-solving approaches");
  if (techScores.numerical < 60) improvements.push("Strengthen numerical analysis and quantitative reasoning skills");
  if (psychScores.motivation < 60) improvements.push("Build resilience and persistence for long-term skill development");
  
  // Default messages if no specific areas identified
  if (strengths.length === 0) {
    strengths.push("Willingness to learn and grow in a new field");
  }
  if (improvements.length === 0) {
    improvements.push("Continue building on your existing foundation");
  }
  
  const nextSteps = overallScore >= 70 
    ? "Consider enrolling in compliance automation courses and seeking entry-level opportunities or internships in the field."
    : "Focus on building foundational skills through online courses, practice projects, and networking with professionals in compliance and automation.";
  
  return { strengths, improvements, nextSteps };
};