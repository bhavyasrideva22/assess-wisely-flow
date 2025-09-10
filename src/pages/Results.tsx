import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  TrendingUp, 
  TrendingDown, 
  CheckCircle2, 
  AlertCircle, 
  Brain, 
  Target, 
  Lightbulb,
  BookOpen,
  ArrowLeft,
  Download
} from "lucide-react";
import { calculateResults, AssessmentResults } from "@/utils/scoring";

const Results = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<AssessmentResults | null>(null);

  useEffect(() => {
    const answersData = localStorage.getItem('assessmentAnswers');
    if (!answersData) {
      navigate('/');
      return;
    }
    
    const answers = JSON.parse(answersData);
    const calculatedResults = calculateResults(answers);
    setResults(calculatedResults);
  }, [navigate]);

  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-assessment-blue mx-auto mb-4"></div>
          <p className="text-muted-foreground">Calculating your results...</p>
        </div>
      </div>
    );
  }

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case "Yes": return "bg-accent";
      case "Maybe": return "bg-secondary";  
      case "No": return "bg-destructive";
      default: return "bg-muted";
    }
  };

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case "Yes": return <CheckCircle2 className="w-5 h-5" />;
      case "Maybe": return <AlertCircle className="w-5 h-5" />;
      case "No": return <TrendingDown className="w-5 h-5" />;
      default: return <Target className="w-5 h-5" />;
    }
  };

  const COLORS = ['hsl(222, 47%, 11%)', 'hsl(142, 71%, 45%)', 'hsl(35, 91%, 62%)', 'hsl(262, 83%, 58%)', 'hsl(220, 9%, 46%)'];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Your Assessment Results
          </h1>
          <p className="text-xl text-muted-foreground">
            Compliance Automation Specialist Readiness Report
          </p>
        </div>

        {/* Overall Recommendation */}
        <Card className="max-w-4xl mx-auto mb-8 bg-gradient-card border-0 shadow-lg">
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              {getRecommendationIcon(results.recommendation)}
              <Badge 
                className={`${getRecommendationColor(results.recommendation)} text-white px-6 py-2 text-lg font-semibold`}
              >
                {results.recommendation}
              </Badge>
            </div>
            <CardTitle className="text-2xl mb-2">
              Overall Confidence Score: {results.overallScore}%
            </CardTitle>
            <Progress value={results.overallScore} className="max-w-md mx-auto" />
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground text-lg leading-relaxed">
              {results.summary}
            </p>
          </CardContent>
        </Card>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* WISCAR Framework */}
          <Card className="bg-gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                WISCAR Framework Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {results.wiscar.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.dimension}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div 
                          className="h-2 bg-primary rounded-full transition-all"
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold">{item.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Score Breakdown */}
          <Card className="bg-gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-accent" />
                Score Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {results.breakdown.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.category}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div 
                          className="h-2 bg-accent rounded-full transition-all"
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold">{item.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Career Guidance */}
          <Card className="bg-gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-secondary" />
                Top Career Paths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {results.careerPaths.map((path, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div>
                      <h4 className="font-semibold">{path.title}</h4>
                      <p className="text-sm text-muted-foreground">{path.description}</p>
                    </div>
                    <Badge variant="secondary" className="ml-2">
                      {path.match}% match
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Learning Path */}
          <Card className="bg-gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-muted" />
                Recommended Learning Path
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {results.learningPath.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{step.phase}</h4>
                      <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                        {step.skills.map((skill, skillIndex) => (
                          <li key={skillIndex} className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-current" />
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Insights */}
        <Card className="max-w-4xl mx-auto mt-8 bg-gradient-card border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Detailed Insights & Next Steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                Strengths
              </h3>
              <ul className="space-y-2">
                {results.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Target className="w-5 h-5 text-secondary" />
                Areas for Improvement
              </h3>
              <ul className="space-y-2">
                {results.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-lg mb-3">Next Steps</h3>
              <p className="text-muted-foreground leading-relaxed">
                {results.nextSteps}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="max-w-4xl mx-auto mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
          <Button
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90"
          >
            <Download className="w-4 h-4" />
            Download Report
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate('/assessment')}
            className="flex items-center gap-2"
          >
            Retake Assessment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;