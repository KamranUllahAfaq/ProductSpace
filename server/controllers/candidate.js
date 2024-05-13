import Candidate from "../models/Candidate.js";
import Job from "../models/Job.js";
import nodemailer from "nodemailer";
import fs from "fs";
import cloudinary from "cloudinary";

export const addCandidate = async (req, res, next) => {
  try {
    var base64String = "";
    if (req.file) {
      var resumeData = "";

      // Upload Thumbnail
      if (req.file) {
        const response1 = cloudinary.uploader.upload(req.file.path, {
          public_id: req.file.filename,
        });
        response1
          .then(async (data) => {
            resumeData = data.secure_url;
            const newApplicant = new Candidate({
              name: req.body.name,
              email: req.body.email,
              gender: req.body.gender,
              age: req.body.age,
              country: req.body.country,
              city: req.body.city,
              studying: req.body.studying,
              coomute: req.body.commute,
              responsibilities: req.body.responsibilities,
              companyName: req.body.companyName,
              coverLetter: req.body.coverLetter,
              job: req.body.job,
              appliedBy: req.user.id,
              cv: resumeData,
            });
            const saveApplicant = await newApplicant.save();

            res.status(200).json({ message: "Application Added Successfully" });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getAllJobCandidates = async (req, res, next) => {
  try {
    const id = req.user.id;
    const candidates = await Candidate.find({ job: req.params.id }).populate({
      path: "appliedBy",
    });
    // console.log(Jobs);
    res.status(200).json(candidates);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getCandidate = async (req, res, next) => {
  try {
    const Candidates = await Candidate.findById(req.params.id);
    // console.log(Jobs);
    res.status(200).json(Candidates);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const selectCandidate = async (req, res, next) => {
  try {
    // Update candidate status to "Accepted" in the database
    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      { status: "Accepted" },
      { new: true }
    );
    console.log(candidate);
    const job = await Job.findById(req.body.jobId);
    console.log(job);
    const mail = {
      email: candidate.email,
      html: `
        <h3>Congratulations</h3>
        <p>You have been shortlisted for the position you applied on Product Space Job Platform</p>
        <h3>
          Message
          <h3></h3>
          <p>
          Job: ${job.title}
          Company: ${job.companyName}
          </p>
        </h3>
        `,
    };
    var transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });
    var mailOptions = {
      from: `Product Space`,
      to: mail.email,
      subject: "Shortlisted Candidate",
      html: mail.html,
    };
    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        res.status(200).json("DONE");
      }
    });
  } catch (error) {
    console.error("Error updating candidate status or sending email:", error);
  }
};
export const rejectCandidate = async (req, res, next) => {
  try {
    // Update candidate status to "Accepted" in the database
    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      { status: "Rejected" },
      { new: true }
    );
    const job = await Job.findById(req.body.jobId);
    console.log(job);
    const mail = {
      email: candidate.email,
      html: `
        <h3>Sorry</h3>
        <p>Unfortunately We have decided to move on with other candidates</p>
        <h3>
          Message
          <h3></h3>
          <p>
          Job: ${job.title}
          Company: ${job.companyName}
          </p>
        </h3>
        `,
    };
    var transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });
    var mailOptions = {
      from: `Product Space`,
      to: mail.email,
      subject: "Regret Mail",
      html: mail.html,
    };
    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).json("DONE");
      }
    });
  } catch (error) {
    console.error("Error updating candidate status or sending email:", error);
  }
};
