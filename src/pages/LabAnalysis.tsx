import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileText, Upload } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast"
import * as pdfjsLib from 'pdfjs-dist';
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

interface AnalysisResults {
  criticalFindings: string[];
  deficiencies: string[];
  recommendations: string[];
  researchCitations: any[];
}

const LabAnalysis: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const extractTextFromPDF = useCallback(async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async () => {
        try {
          const typedArray = new Uint8Array(reader.result as ArrayBuffer);
          const pdf = await pdfjsLib.getDocument(typedArray).promise;
          let fullText = "";

          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items
              .map(item => {
                // Type guard to check if item has 'str' property
                if ('str' in item) {
                  return item.str;
                }
                return '';
              })
              .join(" ");
            fullText += pageText + "\n";
          }

          resolve(fullText);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsArrayBuffer(file);
    });
  }, []);

  const analyzeLabReport = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please upload a lab report to analyze.",
      })
      return;
    }

    setIsLoading(true);
    try {
      const extractedText = await extractTextFromPDF(file);
      console.log("Extracted Text:", extractedText);

      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 2000));

      const mockAnalysisResults: AnalysisResults = {
        criticalFindings: ["Elevated glucose levels", "Possible vitamin D deficiency"],
        deficiencies: ["Vitamin D", "Iron"],
        recommendations: ["Consult endocrinologist", "Increase vitamin D intake", "Iron supplements"],
        researchCitations: [
          {
            title: "Vitamin D and Glucose Levels",
            source: "Journal of Endocrinology",
            year: 2022,
            link: "https://www.example.com/vitamin-d-glucose"
          },
          {
            title: "Iron Deficiency Anemia",
            source: "The Lancet",
            year: 2023,
            link: "https://www.example.com/iron-deficiency"
          }
        ]
      };

      setAnalysisResults(mockAnalysisResults);
      toast({
        title: "Analysis Complete",
        description: "AI analysis of your lab report is complete.",
      })
    } catch (error: any) {
      console.error("Error analyzing lab report:", error);
      toast({
        title: "Analysis Failed",
        description: "An error occurred during the analysis. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false);
    }
  };

  const renderAnalysisResults = () => {
    if (!analysisResults) return null;

    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-500" />
            AI Analysis Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Critical Findings */}
          {Array.isArray(analysisResults.criticalFindings) && analysisResults.criticalFindings.length > 0 && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="font-semibold text-red-800 mb-2">⚠️ Critical Findings - Expert Review Required</h4>
              <ul className="list-disc list-inside space-y-1">
                {analysisResults.criticalFindings.map((finding: string, index: number) => (
                  <li key={index} className="text-red-700">{finding}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Deficiencies */}
          {Array.isArray(analysisResults.deficiencies) && analysisResults.deficiencies.length > 0 && (
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <h4 className="font-semibold text-orange-800 mb-2">📉 Nutritional Deficiencies Detected</h4>
              <ul className="list-disc list-inside space-y-1">
                {analysisResults.deficiencies.map((deficiency: string, index: number) => (
                  <li key={index} className="text-orange-700">{deficiency}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Recommendations */}
          {Array.isArray(analysisResults.recommendations) && analysisResults.recommendations.length > 0 && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">💡 Nutritional Recommendations</h4>
              <ul className="list-disc list-inside space-y-1">
                {analysisResults.recommendations.map((rec: string, index: number) => (
                  <li key={index} className="text-green-700">{rec}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Research Citations */}
          {Array.isArray(analysisResults.researchCitations) && analysisResults.researchCitations.length > 0 && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">📚 Research Citations</h4>
              <div className="space-y-2">
                {analysisResults.researchCitations.map((citation: any, index: number) => (
                  <div key={index} className="text-blue-700">
                    <p className="font-medium">{citation.title}</p>
                    <p className="text-sm">{citation.source} - {citation.year}</p>
                    {citation.link && (
                      <a href={citation.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">
                        View Study
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Expert Review Status */}
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">👩‍⚕️ Expert Review Status</h4>
            <p className="text-gray-600">
              {(Array.isArray(analysisResults.criticalFindings) && analysisResults.criticalFindings.length > 0) ||
               (Array.isArray(analysisResults.deficiencies) && analysisResults.deficiencies.length > 0)
                ? "Your results have been sent to our certified nutritionists for review. You'll receive an email within 24 hours."
                : "Your results look normal. Continue following your personalized nutrition plan."}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Lab Report Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex items-center space-x-2">
              <Label htmlFor="upload">
                Upload Lab Report (PDF):
              </Label>
              <Input
                type="file"
                id="upload"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf"
              />
              <Button variant="outline" asChild>
                <label htmlFor="upload" className="cursor-pointer">
                  <Upload className="h-4 w-4 mr-2" />
                  Choose File
                </label>
              </Button>
              {file && <span className="text-gray-500">{file.name}</span>}
            </div>
            <Button onClick={analyzeLabReport} disabled={isLoading}>
              {isLoading ? "Analyzing..." : "Analyze Report"}
            </Button>
          </div>
          {renderAnalysisResults()}
        </CardContent>
      </Card>
    </div>
  );
};

export default LabAnalysis;
