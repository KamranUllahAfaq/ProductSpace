import Job from "../models/Job.js";
import fs from "fs";
import cloudinary from "cloudinary";

export const addJob = async (req, res, next) => {
  try {
    var thumbnailData = "";

    // Upload Thumbnail
    if (req.file) {
      const response1 = cloudinary.uploader.upload(req.file.path, {
        public_id: req.file.filename,
      });
      response1
        .then(async (data) => {
          thumbnailData = data.secure_url;
          const newJob = new Job({
            title: req.body.title,
            companyName: req.body.companyName,
            companyTagline: req.body.companyTagline,
            location: req.body.location,
            categories: req.body.categories,
            link: req.body.link,
            contactEmail: req.body.contactEmail,
            createdBy: req.user.id,
            logo: thumbnailData,
            description: req.body.description,
            requirements: req.body.requirements,
          });
          const savedJob = await newJob.save();

          res.status(200).json({ message: "Job Added Successfully" });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateJob = async (req, res, next) => {
  try {
    var thumbnailData = "";

    // Upload Thumbnail
    if (req.file) {
      const response1 = cloudinary.uploader.upload(req.file.path, {
        public_id: req.file.filename,
      });
      response1
        .then(async (data) => {
          thumbnailData = data.secure_url;
          const newJob = Job.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            companyName: req.body.companyName,
            companyTagline: req.body.companyTagline,
            location: req.body.location,
            categories: req.body.categories,
            link: req.body.link,
            contactEmail: req.body.contactEmail,
            createdBy: req.user.id,
            logo: thumbnailData,
            description: req.body.description,
            requirements: req.body.requirements,
          });

          res.status(200).json({ message: "Job Updated Successfully" });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getAllJobs = async (req, res, next) => {
  try {
    const Jobs = await Job.find().populate("createdBy");
    res.status(200).json(Jobs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getJob = async (req, res, next) => {
  try {
    const Jobs = await Job.findById(req.params.id);
    res.status(200).json(Jobs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const job = await Job.findByIdAndDelete(id);
    res.status(200).json(job);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getMyJobs = async (req, res, next) => {
  try {
    const Jobs = await Job.find({ createdBy: req.params.id });
    res.status(200).json(Jobs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
