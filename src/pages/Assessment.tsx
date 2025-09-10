import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { psychometricQuestions, technicalQuestions, AssessmentSection } from "@/data/questions";

interface Answers {
  [key: string]: string;
}

const Assessment = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState<AssessmentSection>("psychometric");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const currentQuestions = currentSection === "psychometric" ? psychometricQuestions : technicalQuestions;
  const totalQuestions = psychometricQuestions.length + technicalQuestions.length;
  const answeredQuestions = Object.keys(answers).length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  const handleAnswer = (value: string) => {
    const questionId = `${currentSection}_${currentQuestion}`;
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else if (currentSection === "psychometric") {
      setCurrentSection("technical");
      setCurrentQuestion(0);
    } else {
      // Save answers to localStorage and navigate to results
      localStorage.setItem('assessmentAnswers', JSON.stringify(answers));
      navigate('/results');
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    } else if (currentSection === "technical") {
      setCurrentSection("psychometric");
      setCurrentQuestion(psychometricQuestions.length - 1);
    }
  };

  const questionId = `${currentSection}_${currentQuestion}`;
  const currentAnswer = answers[questionId];
  const question = currentQuestions[currentQuestion];

  const sectionTitle = currentSection === "psychometric" 
    ? "Psychometric Assessment" 
    : "Technical & Aptitude Assessment";

  const canProceed = !!currentAnswer;

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Compliance Automation Specialist Assessment
          </h1>
          <p className="text-muted-foreground mb-4">{sectionTitle}</p>
          <div className="max-w-md mx-auto">
            <Progress value={progress} className="mb-2" />
            <p className="text-sm text-muted-foreground">
              {answeredQuestions} of {totalQuestions} questions completed
            </p>
          </div>
        </div>

        {/* Question Card */}
        <Card className="max-w-2xl mx-auto animate-fade-in">
          <CardHeader>
            <CardTitle className="text-xl">
              Question {currentQuestion + 1} of {currentQuestions.length}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <h3 className="text-lg font-medium leading-relaxed">
              {question.question}
            </h3>

            <RadioGroup
              value={currentAnswer || ""}
              onValueChange={handleAnswer}
              className="space-y-3"
            >
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label 
                    htmlFor={option.value}
                    className="flex-1 cursor-pointer font-medium"
                  >
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {/* Navigation */}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentSection === "psychometric" && currentQuestion === 0}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={!canProceed}
                className="flex items-center gap-2 bg-assessment-blue hover:bg-assessment-blue/90"
              >
                {currentSection === "technical" && currentQuestion === currentQuestions.length - 1 
                  ? "View Results" 
                  : "Next"
                }
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Assessment;