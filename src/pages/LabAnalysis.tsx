
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, AlertTriangle, CheckCircle, TrendingUp, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const LabAnalysis: React.FC = () => {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);

  const mockLabResults = {
    summary: "Analysis of blood work dated March 15, 2024",
    criticalFindings: [
      {
        parameter: "Vitamin D",
        value: "18 ng/mL",
        normalRange: "30-100 ng/mL",
        status: "low",
        severity: "moderate",
        recommendation: "Supplement with 2000 IU daily and increase sun exposure"
      },
      {
        parameter: "Iron",
        value: "45 μg/dL",
        normalRange: "60-170 μg/dL",
        status: "low",
        severity: "mild",
        recommendation: "Include iron-rich foods like spinach, lean meat, and legumes"
      }
    ],
    normalFindings: [
      {
        parameter: "Vitamin B12",
        value: "450 pg/mL",
        normalRange: "200-900 pg/mL",
        status: "normal"
      },
      {
        parameter: "Folate",
        value: "12 ng/mL",
        normalRange: "3-20 ng/mL",
        status: "normal"
      },
      {
        parameter: "Total Cholesterol",
        value: "180 mg/dL",
        normalRange: "<200 mg/dL",
        status: "optimal"
      }
    ],
    nutritionalRecommendations: [
      {
        nutrient: "Vitamin D",
        currentIntake: "Low",
        targetIntake: "2000 IU daily",
        foodSources: ["Fatty fish", "Fortified milk", "Egg yolks", "Mushrooms"],
        supplementNeeded: true
      },
      {
        nutrient: "Iron",
        currentIntake: "Insufficient",
        targetIntake: "18 mg daily",
        foodSources: ["Lean red meat", "Spinach", "Lentils", "Quinoa"],
        supplementNeeded: false
      }
    ],
    riskAssessment: {
      cardiovascular: "Low risk",
      diabetes: "Low risk",
      osteoporosis: "Elevated risk due to low Vitamin D",
      anemia: "Mild risk due to low iron"
    },
    researchCitations: [
      {
        title: "Vitamin D deficiency and health outcomes",
        journal: "New England Journal of Medicine",
        year: "2023",
        url: "https://nejm.org/vitamin-d-study"
      },
      {
        title: "Iron deficiency in young adults",
        journal: "American Journal of Clinical Nutrition",
        year: "2023",
        url: "https://ajcn.org/iron-deficiency"
      }
    ]
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      toast.success(`File "${file.name}" uploaded successfully`);
    }
  };

  const handleAnalyze = async () => {
    if (!uploadedFile) {
      toast.error("Please upload a lab report first");
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisResults(mockLabResults);
      setIsAnalyzing(false);
      toast.success("Lab analysis completed!");
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'low': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'normal': return 'text-green-600 bg-green-50';
      case 'optimal': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'moderate': return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'mild': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default: return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Lab Report Analysis</h1>
            <p className="text-gray-600">Upload your lab reports for AI-powered nutritional insights</p>
          </div>
          <Button onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>

        {!analysisResults ? (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Upload Lab Report
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <div className="space-y-2">
                  <Label htmlFor="lab-upload" className="cursor-pointer">
                    <div className="text-lg font-medium text-gray-900">
                      Click to upload your lab report
                    </div>
                    <div className="text-sm text-gray-600">
                      Supports PDF, JPG, PNG files up to 10MB
                    </div>
                  </Label>
                  <Input
                    id="lab-upload"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </div>

              {uploadedFile && (
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium text-blue-900">{uploadedFile.name}</div>
                      <div className="text-sm text-blue-600">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isAnalyzing ? 'Analyzing...' : 'Analyze Report'}
                  </Button>
                </div>
              )}

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-medium text-yellow-900 mb-2">Important Notes:</h3>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>• Your data is encrypted and secure</li>
                  <li>• Analysis will be reviewed by certified professionals</li>
                  <li>• Critical findings will trigger immediate expert consultation</li>
                  <li>• This analysis is for educational purposes only</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Analysis Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{analysisResults.summary}</p>
              </CardContent>
            </Card>

            {/* Critical Findings */}
            {analysisResults.criticalFindings.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <AlertTriangle className="h-5 w-5" />
                    Critical Findings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysisResults.criticalFindings.map((finding, index) => (
                      <div key={index} className="border border-red-200 rounded-lg p-4 bg-red-50">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {getSeverityIcon(finding.severity)}
                            <h3 className="font-semibold text-red-900">{finding.parameter}</h3>
                          </div>
                          <Badge className={getStatusColor(finding.status)}>
                            {finding.status.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          <div>
                            <span className="text-sm text-gray-600">Your Value: </span>
                            <span className="font-medium">{finding.value}</span>
                          </div>
                          <div>
                            <span className="text-sm text-gray-600">Normal Range: </span>
                            <span className="font-medium">{finding.normalRange}</span>
                          </div>
                        </div>
                        <div className="bg-white p-3 rounded border">
                          <h4 className="font-medium text-gray-900 mb-1">Recommendation:</h4>
                          <p className="text-sm text-gray-700">{finding.recommendation}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Normal Findings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  Normal Findings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analysisResults.normalFindings.map((finding, index) => (
                    <div key={index} className="border border-green-200 rounded-lg p-4 bg-green-50">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-green-900">{finding.parameter}</h3>
                        <Badge className={getStatusColor(finding.status)}>
                          {finding.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="text-sm text-green-800">
                        <div>Value: {finding.value}</div>
                        <div>Range: {finding.normalRange}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Nutritional Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Personalized Nutrition Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {analysisResults.nutritionalRecommendations.map((rec, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-lg">{rec.nutrient}</h3>
                        {rec.supplementNeeded && (
                          <Badge variant="secondary">Supplement Recommended</Badge>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Current Intake:</h4>
                          <p className="text-gray-700">{rec.currentIntake}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Target Intake:</h4>
                          <p className="text-gray-700">{rec.targetIntake}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Food Sources:</h4>
                        <div className="flex flex-wrap gap-2">
                          {rec.foodSources.map((food, foodIndex) => (
                            <Badge key={foodIndex} variant="outline">{food}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Risk Assessment */}
            <Card>
              <CardHeader>
                <CardTitle>Health Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(analysisResults.riskAssessment).map(([condition, risk], index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h3 className="font-semibold capitalize mb-2">{condition.replace(/([A-Z])/g, ' $1').trim()}</h3>
                      <Badge 
                        className={
                          risk.includes('Low') ? 'bg-green-100 text-green-800' :
                          risk.includes('Elevated') ? 'bg-orange-100 text-orange-800' :
                          'bg-red-100 text-red-800'
                        }
                      >
                        {risk}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Research Citations */}
            <Card>
              <CardHeader>
                <CardTitle>Supporting Research</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analysisResults.researchCitations.map((citation, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900 mb-1">{citation.title}</h3>
                          <p className="text-sm text-gray-600">{citation.journal} ({citation.year})</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Expert Review Notice */}
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">Expert Review Required</h3>
                    <p className="text-sm text-blue-800 mb-3">
                      Due to critical findings in your lab results, this analysis has been forwarded to 
                      Dr. Sarah Johnson, RD for immediate review. You will receive a follow-up within 24 hours.
                    </p>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Schedule Emergency Consultation
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default LabAnalysis;
