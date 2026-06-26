import { QuoteRepository } from "../repositories/quote.repository";
import { AnalysisClient } from "../clients/analysis.client";
import { AppError } from "../utils/app-error";

import {
  CreateQuoteRequest,
  QuoteStatus,
} from "../types/quote.types";

export class QuoteService {
  private repository = new QuoteRepository();
  private analysisClient = new AnalysisClient();

  async createQuote(data: CreateQuoteRequest) {
    return await this.repository.create(data);
  }

  async getQuoteById(id: string) {
    return await this.repository.findById(id);
  }

  async getAllQuotes() {
    return await this.repository.findAll();
  }

  async analyzeQuote(id: string) {
    // Check if quote exists
    const quote = await this.repository.findById(id);

    if (!quote) {
      throw new AppError("Quote not found", 404);
    }

    // Prevent duplicate analysis
    if (quote.analysis) {
      throw new AppError("Quote has already been analyzed", 400);
    }

    // Call mocked AI service
    const analysis = await this.analysisClient.analyzeQuote();

    // Save analysis in database
    await this.repository.saveAnalysis(id, analysis);

    // Return updated quote with analysis
    return await this.repository.findById(id);
  }

  async updateStatus(id: string, status: QuoteStatus) {
    const quote = await this.repository.findById(id);

    if (!quote) {
      throw new AppError("Quote not found", 404);
    }

    return await this.repository.updateStatus(id, status);
  }
}