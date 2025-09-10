export type AssessmentSection = "psychometric" | "technical";

export interface QuestionOption {
  value: string;
  text: string;
  score?: number;
}

export interface Question {
  id: string;
  question: string;
  options: QuestionOption[];
  category: string;
  type: "interest" | "personality" | "cognitive" | "motivation" | "logical" | "numerical" | "programming" | "domain";
}

export const psychometricQuestions: Question[] = [
  {
    id: "interest_1",
    question: "How interested are you in understanding and working with regulatory compliance frameworks?",
    category: "Interest Scale",
    type: "interest",
    options: [
      { value: "5", text: "Extremely interested - I find compliance frameworks fascinating", score: 5 },
      { value: "4", text: "Very interested - I enjoy learning about regulations", score: 4 },
      { value: "3", text: "Moderately interested - It seems useful to know", score: 3 },
      { value: "2", text: "Slightly interested - Not my main passion but okay", score: 2 },
      { value: "1", text: "Not interested - I find regulations boring", score: 1 }
    ]
  },
  {
    id: "interest_2",
    question: "How much do you enjoy automating repetitive processes and tasks?",
    category: "Interest Scale",
    type: "interest",
    options: [
      { value: "5", text: "I love it - automation excites me greatly", score: 5 },
      { value: "4", text: "I enjoy it - automation is very appealing", score: 4 },
      { value: "3", text: "It's okay - I see the value in automation", score: 3 },
      { value: "2", text: "Slightly appealing - but not my preferred work", score: 2 },
      { value: "1", text: "Not appealing - I prefer manual processes", score: 1 }
    ]
  },
  {
    id: "personality_1",
    question: "When working on detailed tasks, I prefer to:",
    category: "Personality Compatibility",
    type: "personality",
    options: [
      { value: "5", text: "Follow structured processes and double-check everything", score: 5 },
      { value: "4", text: "Create checklists and methodically work through them", score: 4 },
      { value: "3", text: "Balance structure with some flexibility", score: 3 },
      { value: "2", text: "Work more intuitively with minimal structure", score: 2 },
      { value: "1", text: "Avoid overly detailed work when possible", score: 1 }
    ]
  },
  {
    id: "personality_2",
    question: "How do you typically respond to changing regulations or requirements?",
    category: "Personality Compatibility", 
    type: "personality",
    options: [
      { value: "5", text: "I adapt quickly and see it as an opportunity to improve", score: 5 },
      { value: "4", text: "I adjust well after understanding the rationale", score: 4 },
      { value: "3", text: "I manage the change but need some time to adjust", score: 3 },
      { value: "2", text: "I find frequent changes somewhat stressful", score: 2 },
      { value: "1", text: "I prefer stable, unchanging requirements", score: 1 }
    ]
  },
  {
    id: "cognitive_1",
    question: "When solving complex problems, I tend to:",
    category: "Cognitive Style",
    type: "cognitive",
    options: [
      { value: "5", text: "Break them down systematically into smaller parts", score: 5 },
      { value: "4", text: "Analyze patterns and use logical frameworks", score: 4 },
      { value: "3", text: "Combine analytical thinking with creative approaches", score: 3 },
      { value: "2", text: "Rely more on intuition and creative solutions", score: 2 },
      { value: "1", text: "Prefer collaborative brainstorming over solo analysis", score: 1 }
    ]
  },
  {
    id: "motivation_1",
    question: "When facing a challenging learning curve, I typically:",
    category: "Motivation",
    type: "motivation",
    options: [
      { value: "5", text: "Persist through difficulties and view them as growth opportunities", score: 5 },
      { value: "4", text: "Stay committed with occasional breaks to recharge", score: 4 },
      { value: "3", text: "Work through it but sometimes feel discouraged", score: 3 },
      { value: "2", text: "Need external motivation to push through challenges", score: 2 },
      { value: "1", text: "Tend to avoid or postpone difficult learning tasks", score: 1 }
    ]
  },
  {
    id: "motivation_2",
    question: "What motivates you most in your work?",
    category: "Motivation",
    type: "motivation",
    options: [
      { value: "5", text: "Mastering complex skills and continuous improvement", score: 5 },
      { value: "4", text: "Solving problems and making processes more efficient", score: 4 },
      { value: "3", text: "Contributing to team success and organizational goals", score: 3 },
      { value: "2", text: "Recognition and advancement opportunities", score: 2 },
      { value: "1", text: "Stable routine and predictable tasks", score: 1 }
    ]
  }
];

export const technicalQuestions: Question[] = [
  {
    id: "logical_1",
    question: "If all compliance reports must be submitted monthly, and automated reports reduce submission time by 75%, how much time is saved if manual reporting takes 20 hours per month?",
    category: "Logical Reasoning",
    type: "logical",
    options: [
      { value: "15", text: "15 hours", score: 5 },
      { value: "10", text: "10 hours", score: 1 },
      { value: "5", text: "5 hours", score: 1 },
      { value: "12", text: "12 hours", score: 1 }
    ]
  },
  {
    id: "logical_2",
    question: "In a compliance automation system: IF risk_score > 8 AND manual_review = False, THEN flag_for_review = True. What happens when risk_score = 9 and manual_review = False?",
    category: "Logical Reasoning",
    type: "logical",
    options: [
      { value: "flag_true", text: "flag_for_review = True", score: 5 },
      { value: "flag_false", text: "flag_for_review = False", score: 1 },
      { value: "no_action", text: "No action taken", score: 1 },
      { value: "error", text: "System error", score: 1 }
    ]
  },
  {
    id: "numerical_1",
    question: "A compliance team processes 500 transactions daily. With automation, they can increase capacity by 40%. How many transactions can they process per day with automation?",
    category: "Numerical Ability",
    type: "numerical", 
    options: [
      { value: "700", text: "700 transactions", score: 5 },
      { value: "600", text: "600 transactions", score: 1 },
      { value: "750", text: "750 transactions", score: 1 },
      { value: "540", text: "540 transactions", score: 1 }
    ]
  },
  {
    id: "programming_1",
    question: "What does this Python code snippet do?\n\nfor transaction in transactions:\n    if transaction['amount'] > threshold:\n        flag_transaction(transaction)",
    category: "Programming Basics",
    type: "programming",
    options: [
      { value: "flags_high", text: "Flags transactions above a certain amount threshold", score: 5 },
      { value: "calculates_total", text: "Calculates total transaction amounts", score: 1 },
      { value: "sorts_transactions", text: "Sorts transactions by amount", score: 1 },
      { value: "deletes_transactions", text: "Deletes high-value transactions", score: 1 }
    ]
  },
  {
    id: "programming_2",
    question: "In RPA (Robotic Process Automation), what is the primary purpose of a 'bot'?",
    category: "Programming Basics",
    type: "programming",
    options: [
      { value: "automate_tasks", text: "Automate repetitive, rule-based tasks", score: 5 },
      { value: "analyze_data", text: "Perform complex data analysis", score: 2 },
      { value: "chat_users", text: "Chat with users and customers", score: 1 },
      { value: "manage_servers", text: "Manage server infrastructure", score: 1 }
    ]
  },
  {
    id: "domain_1",
    question: "What is the primary purpose of SOX (Sarbanes-Oxley) compliance?",
    category: "Domain Knowledge",
    type: "domain",
    options: [
      { value: "financial_reporting", text: "Ensure accurate financial reporting and corporate governance", score: 5 },
      { value: "data_privacy", text: "Protect customer data privacy", score: 2 },
      { value: "employee_safety", text: "Ensure workplace safety standards", score: 1 },
      { value: "environmental", text: "Monitor environmental compliance", score: 1 }
    ]
  },
  {
    id: "domain_2",
    question: "In compliance automation, what does GRC typically stand for?",
    category: "Domain Knowledge", 
    type: "domain",
    options: [
      { value: "governance_risk_compliance", text: "Governance, Risk, and Compliance", score: 5 },
      { value: "general_reporting_controls", text: "General Reporting Controls", score: 1 },
      { value: "global_regulatory_changes", text: "Global Regulatory Changes", score: 1 },
      { value: "government_requirements_code", text: "Government Requirements Code", score: 1 }
    ]
  },
  {
    id: "domain_3",
    question: "Which tool is commonly used for compliance automation and monitoring?",
    category: "Domain Knowledge",
    type: "domain", 
    options: [
      { value: "multiple_tools", text: "All of the above (RPA platforms, GRC software, Python scripts)", score: 5 },
      { value: "rpa_only", text: "Only RPA platforms like UiPath", score: 3 },
      { value: "grc_only", text: "Only GRC software like ServiceNow", score: 3 },
      { value: "python_only", text: "Only Python automation scripts", score: 2 }
    ]
  }
];