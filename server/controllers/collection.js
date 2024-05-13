import Collection from "../models/Collection.js";

export const getCollection = async (req, res, next) => {
  try {
    const { id } = req.params;
    const collection = await Collection.findById(id)
      .populate("createdBy")
      .populate("products");
    res.status(200).json(collection);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getUserCollections = async (req, res, next) => {
  try {
    const { id } = req.params;
    const collection = await Collection.find({ createdBy: id })
      .populate("createdBy")
      .populate("products");
    res.status(200).json(collection);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const addCollection = async (req, res, next) => {
  try {
    const newCollection = new Collection({
      title: req.body.title,
      tagline: req.body.tagline,
      createdBy: req.user.id,
      products: req.body.products,
    });
    const savedCollection = await newCollection.save();

    res.status(200).json({
      message: "Collection Added Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
// File not Updating
export const addIntoCollection = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedCollection = await Collection.findByIdAndUpdate(
      id,
      {
        $addToSet: { products: req.body.productId },
        UpdatedOn: new Date(),
      },
      { new: true }
    );

    if (!updatedCollection) {
      throw new Error("Collection not found");
    }

    res.status(200).json({ message: "Collection Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateCollection = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedCollection = await Collection.findByIdAndUpdate(
      id,
      {
        $addToSet: { products: req.body.productId },
        UpdatedOn: new Date(),
      },
      { new: true }
    );

    if (!updatedCollection) {
      throw new Error("Collection not found");
    }

    res.status(200).json({ message: "Collection Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
export const getAllCollections = async (req, res, next) => {
  try {
    const collections = await Collection.find()
      .populate("createdBy")
      .populate("products");
    res.status(200).json(collections);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
