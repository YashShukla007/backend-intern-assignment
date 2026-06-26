import { prisma } from "../config/prisma";
import { QuoteStatus } from "@prisma/client";
import { CreateQuoteRequest } from "../types/quote.types";

export class QuoteRepository {
  async create(data: CreateQuoteRequest) {
    return prisma.quoteRequest.create({
      data: {
        customer: data.customer,
        project: data.project,
        estimatedValue: data.estimatedValue,
      },
    });
  }

  async findById(id: string) {
    return prisma.quoteRequest.findUnique({
      where: {
        id,
      },
      include: {
        analysis: true,
      },
    });
  }

  async findAll() {
    return prisma.quoteRequest.findMany({
      orderBy: {
        createdDate: "desc",
      },
    });
  }

  async updateStatus(id: string, status: QuoteStatus) {
    return prisma.quoteRequest.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  }

  async saveAnalysis(
    quoteId: string,
    analysis: {
      risk: string;
      confidence: number;
      missingItems: string[];
    }
  ) {
    return prisma.analysisResult.create({
      data: {
        quoteId,
        risk: analysis.risk,
        confidence: analysis.confidence,
        missingItems: analysis.missingItems.join(", "),
      },
    });
  }
}