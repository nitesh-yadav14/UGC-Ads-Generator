import { Request, Response } from "express";
import * as Sentry from "@sentry/node";
import { prisma } from "../configs/prisma.js";

// get user credit
export const getUserCredits = async (req: Request, res: Response) => {
  try {
    const { userId } = (req as any).auth();

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.json({ credits: 0 });
    }

    res.json({ credits: user.credits });

  } catch (error: any) {
    Sentry.captureException(error);
    res.status(500).json({ message: error.code || error.message });
  }
};

// get all user projects
export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const { userId } = (req as any).auth();

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const projects = await prisma.project.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    res.json({ projects });

  } catch (error: any) {
    Sentry.captureException(error);
    res.status(500).json({ message: error.code || error.message });
  }
};

// get project by id
export const getProjectById = async (req: Request, res: Response) => {
  try {
    const { userId } = (req as any).auth();
    const { projectId } = req.params;

    const project = await prisma.project.findFirst({
      where: { id: projectId, userId },
    });

    if (!project) {
      return res.status(404).json({ message: "project not found" });
    }

    res.json({ project });

  } catch (error: any) {
    Sentry.captureException(error);
    res.status(500).json({ message: error.code || error.message });
  }
};

// publish & unpublish
export const toggleProjectPublic = async (req: Request, res: Response) => {
  try {
    const { userId } = (req as any).auth();
    const { projectId } = req.params;

    const project = await prisma.project.findFirst({
      where: { id: projectId, userId },
    });

    if (!project) {
      return res.status(404).json({ message: "project not found" });
    }

    if (!project.generatedImage && !project.generatedVideo) {
      return res.status(404).json({ message: "Video or Image not generated" });
    }

    await prisma.project.update({
      where: { id: projectId },
      data: { isPublished: !project.isPublished },
    });

    res.json({ isPublished: !project.isPublished });

  } catch (error: any) {
    Sentry.captureException(error);
    res.status(500).json({ message: error.code || error.message });
  }
};