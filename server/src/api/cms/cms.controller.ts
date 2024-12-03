import { Request, Response } from 'express';
import CMSData from './cms.model';

// Function to get CMS data
export const getCMSData = async (req: Request, res: Response) => {
    try {
        const cmsData = await CMSData.findOne();
        if (!cmsData) {
            return res.status(404).json({ message: 'CMS data not found' });
        }
        res.status(200).json(cmsData);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Function to create or update CMS data
export const createOrUpdateCMSData = async (req: Request, res: Response) => {
    try {
        const existingCMSData = await CMSData.findOne();
        if (existingCMSData) {
            // Update existing CMS data
            existingCMSData.set(req.body);
            const updatedCMSData = await existingCMSData.save();
            return res.status(200).json(updatedCMSData);
        } else {
            // Create new CMS data
            const newCMSData = new CMSData(req.body);
            const savedCMSData = await newCMSData.save();
            return res.status(201).json(savedCMSData);
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};