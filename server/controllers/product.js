import Product from "../models/Product.js";
import Comment from "../models/Comment.js";

import cloudinary from "cloudinary";

export const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate("createdBy");
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const addProduct = async (req, res, next) => {
  try {
    // Upload Thumbnail

    const thumbnailPromise = new Promise((resolve) => {
      setTimeout(() => {
        const response1 = cloudinary.uploader.upload(
          req.files["thumbnail"][0].path,
          {
            public_id: req.files["thumbnail"][0].filename,
          }
        );
        response1
          .then((data) => {
            resolve(data.secure_url);
          })
          .catch((err) => {
            console.log(err);
          });
      }, 100);
    });

    const galleryPromises = req.files["gallery"].map((item, index) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const response2 = cloudinary.uploader.upload(
            req.files["gallery"][index].path,
            {
              public_id: req.files["gallery"][index].filename,
            }
          );

          response2.then((data) => {
            resolve(data.secure_url);
          });
        }, index + 1 * 500);
      });
    });
    Promise.all([thumbnailPromise, ...galleryPromises])
      .then(async (results) => {
        const newProduct = new Product({
          name: req.body.name,
          tagline: req.body.tagline,
          description: req.body.description,
          createdBy: req.user.id,
          pricing: req.body.pricing,
          thumbnail: results[0],
          gallery: results.slice(1),
          link: req.body.link,
          youtubeLink: req.body.youtubeLink,
          createdBy: req.user.id,
          ambassadorProgram: req.body.ambassadorProgram,
          makers: req.body.makers,
          topics: req.body.topics,
          role: req.body.role,
        });

        const savedProduct = await newProduct.save();

        const newComment = new Comment({
          text: req.body.firstComment,
          user: req.user.id,
          type: "product",
          product: savedProduct._id,
        });
        const savedComment = await newComment.save();
        res.status(200).json({
          message: "Product Added Successfully",
        });
        // Run next piece of code here
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
// File not Updating
export const updateProduct = async (req, res, next) => {
  try {
    // Upload Thumbnail
    let thumbnailPromise;
    let galleryPromises;

    if (req.files["thumbnail"] && req.files["gallery"]) {
      thumbnailPromise = new Promise((resolve) => {
        setTimeout(() => {
          const response1 = cloudinary.uploader.upload(
            req.files["thumbnail"][0].path,
            {
              public_id: req.files["thumbnail"][0].filename,
            }
          );
          response1
            .then((data) => {
              resolve(data.secure_url);
            })
            .catch((err) => {
              console.log(err);
            });
        }, 100);
      });
      galleryPromises = req.files["gallery"]?.map((item, index) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            const response2 = cloudinary.uploader.upload(
              req.files["gallery"][index].path,
              {
                public_id: req.files["gallery"][index].filename,
              }
            );

            response2.then((data) => {
              resolve(data.secure_url);
            });
          }, index + 1 * 500);
        });
      });
    }

    if (thumbnailPromise && galleryPromises) {
      Promise.all([thumbnailPromise, ...galleryPromises])
        .then(async (results) => {
          Product.findByIdAndUpdate(
            req.params.id,
            {
              name: req.body.name,
              tagline: req.body.tagline,
              description: req.body.description,
              createdBy: req.user.id,
              thumbnail: results[0],
              gallery: results.slice(1),
              pricing: req.body.pricing,
              link: req.body.link,
              youtubeLink: req.body.youtubeLink,
              createdBy: req.user.id,
              ambassadorProgram: req.body.ambassadorProgram,
              makers: req.body.makers,
              topics: req.body.topics,
              role: req.body.role,
            },
            async (err, result) => {
              if (err) throw err;
              const resu = await Product.findById(req.params.id);
              res.status(201).json(resu);
            }
          );
          // Run next piece of code here
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
    } else {
      Product.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          tagline: req.body.tagline,
          description: req.body.description,
          createdBy: req.user.id,
          pricing: req.body.pricing,
          link: req.body.link,
          youtubeLink: req.body.youtubeLink,
          createdBy: req.user.id,
          ambassadorProgram: req.body.ambassadorProgram,
          makers: req.body.makers,
          topics: req.body.topics,
          role: req.body.role,
        },
        async (err, result) => {
          if (err) throw err;
          const resu = await Product.findById(req.params.id);
          res.status(201).json(resu);
        }
      );
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate("createdBy");
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getAllNewProducts = async (req, res, next) => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7); // Subtract 7 days from the current date

  try {
    const products = await Product.find({
      createdOn: { $gte: oneWeekAgo },
    }).exec();

    res.status(200).json(products);
  } catch (error) {
    console.error("Error retrieving products:", error);
    throw error;
  }
};

export const getAmbassadorProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ isAmbassador: true });
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getMyProducts = async (req, res, next) => {
  try {
    const id = req.params.id || req.user.id;
    const products = await Product.find({ createdBy: id });
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
export const getMyAmbassadors = async (req, res, next) => {
  try {
    const id = req.user.id;
    const products = await Product.find({ createdBy: id }).populate(
      "ambassadors"
    );

    const allAmbassadors = [];
    for (const product of products) {
      allAmbassadors.push(...product.ambassadors);
    }
    res.status(200).json(allAmbassadors);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getProductsByTopic = async (req, res, next) => {
  try {
    const topic = req.params.id;
    const products = await Product.find();
    const filteredProducts = products.filter((product) => {
      if (product.topics.includes(topic)) return product;
    });
    res.status(200).json(filteredProducts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const likeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (product.upvotes.includes(req.body.userId)) {
      var ind = product.upvotes.indexOf(req.body.userId);
      product.upvotes.splice(ind, 1);
    } else {
      product.upvotes.push(req.body.userId);
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, {
      upvotes: product.upvotes,
    });

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const commentProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const newComment = new Comment({
      text: req.body.text,
      user: req.user.id,
      product: id,
      parentComment: req.body.parentComment,
      type: "product",
    });
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      product: req.params.id,
      type: "product",
    }).populate("user");
    res.status(200).json(comments);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
