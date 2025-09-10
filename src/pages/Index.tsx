import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Users, 
  Clock, 
  CheckCircle2,
  PlayCircle,
  BarChart3,
  Zap
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Psychometric Analysis",
      description: "Comprehensive personality and cognitive style assessment"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Technical Aptitude",
      description: "Evaluate logical reasoning, programming, and domain knowledge"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "WISCAR Framework",
      description: "Will, Interest, Skill, Cognitive readiness, Ability to learn, Real-world alignment"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Career Guidance",
      description: "Personalized recommendations and learning pathways"
    }
  ];

  const stats = [
    { label: "Assessment Duration", value: "20-30 min", icon: <Clock className="w-5 h-5" /> },
    { label: "Question Types", value: "15 Questions", icon: <CheckCircle2 className="w-5 h-5" /> },
    { label: "Career Paths", value: "5+ Roles", icon: <Users className="w-5 h-5" /> },
    { label: "Success Rate", value: "94% Accuracy", icon: <TrendingUp className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-6 bg-assessment-blue/10 text-assessment-blue border-assessment-blue/20">
            <Zap className="w-4 h-4 mr-2" />
            AI-Powered Career Assessment
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Compliance Automation Specialist
            <span className="block text-assessment-blue">Readiness Assessment</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
            Discover your potential for a career in compliance automation. Get personalized insights, 
            career recommendations, and a tailored learning roadmap based on the WISCAR framework.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg"
              onClick={() => navigate('/assessment')}
              className="bg-assessment-blue hover:bg-assessment-blue/90 text-white px-8 py-4 text-lg font-semibold flex items-center gap-3 transition-all hover:scale-105"
            >
              <PlayCircle className="w-6 h-6" />
              Start Assessment
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              onClick={() => navigate('/about')}
              className="px-8 py-4 text-lg"
            >
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-gradient-card border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center text-assessment-blue mb-2">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Comprehensive Assessment Components
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gradient-card border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 bg-assessment-blue/10 rounded-xl flex items-center justify-center text-assessment-blue mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* About Section */}
        <Card className="max-w-4xl mx-auto mt-16 bg-gradient-card border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">About the Role</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              <strong>Compliance Automation Specialists</strong> are at the forefront of regulatory technology, 
              combining deep compliance knowledge with automation expertise to streamline regulatory 
              processes, reduce manual errors, and enhance organizational efficiency.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h4 className="font-semibold text-foreground mb-3">Key Responsibilities:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-assessment-green mt-0.5 flex-shrink-0" />
                    Automate compliance monitoring and reporting
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-assessment-green mt-0.5 flex-shrink-0" />
                    Develop risk assessment automation tools
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-assessment-green mt-0.5 flex-shrink-0" />
                    Implement GRC software solutions
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-assessment-green mt-0.5 flex-shrink-0" />
                    Design compliance workflow automation
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-3">Industries:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-assessment-blue mt-0.5 flex-shrink-0" />
                    Financial Services & Banking
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-assessment-blue mt-0.5 flex-shrink-0" />
                    Healthcare & Life Sciences
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-assessment-blue mt-0.5 flex-shrink-0" />
                    Technology & Software
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-assessment-blue mt-0.5 flex-shrink-0" />
                    Manufacturing & Energy
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
