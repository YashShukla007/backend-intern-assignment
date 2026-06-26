import { AnalyzeQuoteResponse } from "../types/quote.types";

export class AnalysisClient {
  async analyzeQuote(): Promise<AnalyzeQuoteResponse> {
    // Simulate external AI API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      risk: "LOW",
      confidence: 92,
      missingItems: [
        "Signed NDA",
        "Technical Specification Document",
      ],
    };
  }
}