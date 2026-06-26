export enum QuoteStatus {
  NEW = "NEW",
  IN_REVIEW = "IN_REVIEW",
  NEEDS_INFO = "NEEDS_INFO",
  COMPLETED = "COMPLETED",
}

export interface CreateQuoteRequest {
  customer: string;
  project: string;
  estimatedValue: number;
}

export interface UpdateStatusRequest {
  status: QuoteStatus;
}

export interface AnalyzeQuoteResponse {
  risk: string;
  confidence: number;
  missingItems: string[];
}