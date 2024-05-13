import User from "../models/Users.js";
import Product from "../models/Product.js";
import fs from "fs";
import cloudinary from "cloudinary";
export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("name image followers");
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = (req, res, next) => {
  const body = req.body;
  const id = req.user.id || body.id;
  User.findByIdAndUpdate(
    id,
    {
      name: body.name,
      headline: body.headline,
      phone: body.phone,
      job: body.job,
      company: body.company,
      about: body.about,
      gender: body.gender,
    },
    async (err, result) => {
      if (err) throw err;
      const resu = await User.findById(id);
      res.status(201).json(resu);
    }
  );
};

export const saveImage = (req, res, next) => {
  const id = req.user.id;

  if (req.file) {
    try {
      const response1 = cloudinary.uploader.upload(req.file.path, {
        public_id: req.file.filename,
      });
      response1
        .then((data) => {
          var thumbnailData = data.secure_url;
          User.findByIdAndUpdate(
            id,
            { image: thumbnailData },
            (err, result) => {
              if (err) throw err;
              User.findById(id, (err, result1) => {
                res.json(result1);
              });
            }
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error.message);
    }
  } else {
    res.json({ message: "Image File Not Found" });
  }
};
export const getUserFollowers = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const followers = await Promise.all(
      user.followers.map((id) => User.findById(id))
    );
    const formattedfollowers = followers.map(
      ({ _id, firstName, lastName, image }) => {
        return {
          _id,
          firstName,
          lastName,
          image,
        };
      }
    );

    res.status(200).json(formattedfollowers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const followUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (user.followers.includes(req.user.id)) {
      var ind = user.followers.indexOf(req.user.id);
      user.followers.splice(ind, 1);
    } else {
      user.followers.push(req.user.id);
    }

    const updatedUser = await User.findByIdAndUpdate(id, {
      followers: user.followers,
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getAllFollowedProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ upvotes: req.params.id }).exec();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getAllFollowedUsers = async (req, res, next) => {
  try {
    const users = await User.find({ followers: req.params.id }).exec();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getAllFollowers = async (req, res, next) => {
  try {
    const users = await User.findById(req.params.id).populate("followers");
    const followers = await User.find({ _id: { $in: users.followers } });
    res.status(200).json(followers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
