import AmbassadorApplicant from "../models/AmbassadorApplicant.js";
import Product from "../models/Product.js";
import nodemailer from "nodemailer";
import fs from "fs";
import cloudinary from "cloudinary";

export const addApplicant = async (req, res, next) => {
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
            const newApplicant = new AmbassadorApplicant({
              name: req.body.name,
              email: req.body.email,
              gender: req.body.gender,
              age: req.body.age,
              country: req.body.country,
              city: req.body.city,
              reason: req.body.reason,
              languageLevel: req.body.languageLevel,
              preferredLanguage: req.body.preferredLanguage,
              isAmbassador: req.body.isAmbassador,
              nameOfCommunity: req.body.nameOfCommunity,
              studying: req.body.studying,
              product: req.body.product,
              websites: req.body.websites,
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

export const getAllApplicant = async (req, res, next) => {
  try {
    const id = req.user.id;
    const AmbassadorApplicants = await AmbassadorApplicant.find({}).populate({
      path: "product",
      populate: {
        path: "createdBy",
      },
    });
    const filterApplicants = AmbassadorApplicants.filter((app, index) => {
      const appId = app.product.createdBy._id.toString();

      return appId.includes(id);
    });
    res.status(200).json(filterApplicants);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getApplicant = async (req, res, next) => {
  try {
    const AmbassadorApplicants = await AmbassadorApplicant.findById(
      req.params.id
    );
    res.status(200).json(AmbassadorApplicants);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const selectApplicant = async (req, res, next) => {
  const { productId, userId } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $addToSet: { ambassadors: userId } }, // Use $addToSet to avoid duplicate user IDs
      { new: true }
    );

    if (!updatedProduct) {
      res.status(200).json({ message: "Ambassador Already Added" });
    }
    const ambassador = await AmbassadorApplicant.findByIdAndUpdate(
      req.params.id,
      { status: "Selected" },
      { new: true }
    );

    next();
  } catch (error) {
    console.error("Error adding user ID to the ambassadors array:", error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteApplication = async (req, res, next) => {
  try {
    const updatedApplicant = await AmbassadorApplicant.findByIdAndDelete(
      req.params.id
    );
    res.status(200).json({ message: "Ambassador Added Successfully" });
  } catch (error) {
    console.error("Error adding user ID to the ambassadors array:", error);
  }
};

export const getAmbassadorsProducts = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const products = await Product.find({ ambassadors: userId });
    res.status(200).json(products);
  } catch (error) {
    // Handle the error appropriately
    console.error("Error retrieving products:", error);
    throw error;
  }
};

export const selectCandidateMail = async (req, res, next) => {
  try {
    const mail = {
      email: req.body.email,
      html: `
      <h3>Congratulations</h3>
      <p>You are selected for the ambassador program you applied on Product Space</p>
      <h3>
        Message
        <h3></h3>
        <p>
         Product: ${req.body.productName}
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
      subject: "Ambassador Acceptance Mail",
      html: mail.html,
    };
    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).json({ message: "Ambassador Added Successfully" });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
