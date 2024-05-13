import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/Users.js";
import { OAuth2Client } from "google-auth-library";
import nodemailer from "nodemailer";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const register = async (req, res, next) => {
  try {
    const { name, email, password, image } = req.body;
    const salt = await bcrypt.genSalt(10);
    // bcrypt.hash(myPlaintextPassword, saltRounds);
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: passwordHash,
      image,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ message: "User does not exists" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentials" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token: token, user: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const { id } = req.user; // Assuming you have middleware that verifies the user's authentication and sets the userId in the request object

    // Find the user in the database
    const user = await User.findById(id);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the current password with the stored password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid current password" });
    }

    // Generate a new salt and hash the new password
    const salt = await bcrypt.genSalt(10);
    const newPasswordHash = await bcrypt.hash(newPassword, salt);

    // Update the user's password
    user.password = newPasswordHash;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const generateRandomPassword = () => {
  const length = 8; // Desired length of the password
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";

  // Generate a random character from the specified characters
  const getRandomCharacter = () => {
    return characters.charAt(Math.floor(Math.random() * characters.length));
  };

  // Add a random character to the password
  const addCharacter = () => {
    password += getRandomCharacter();
  };

  // Add a random number to the password
  const addNumber = () => {
    password += Math.floor(Math.random() * 10);
  };

  // Add a random character and number to the password
  addCharacter();
  addNumber();

  // Add remaining characters to fulfill the desired length
  for (let i = 2; i < length; i++) {
    const randomFunction = Math.floor(Math.random() * 2)
      ? addCharacter
      : addNumber;
    randomFunction();
  }

  return password;
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    // Find the user in the database based on the provided email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const plainTextPassword = generateRandomPassword(); // Generate a random password

    // Update the user's password with the plain text password
    user.password = await bcrypt.hash(plainTextPassword, 10);
    await user.save();

    // Send the password details to the user's email
    const mail = {
      email: req.body.email,
      html: `
        <h3>Forgot Password</h3>
        <p>Here are your sign in details</p>
        <h3>
          Message
          <h3></h3>
          <p>
           Email : ${req.body.email}, password: ${plainTextPassword}
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
      subject: "Forgot Password Credentials",
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
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const googleLogin = async (req, res, next) => {
  try {
    const { token } = req.body;

    // Verify the Google ID token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { name, email, picture } = ticket.getPayload();

    // Check if the user with the given email already exists in your system
    let user = await User.findOne({ email });

    if (!user) {
      // If the user doesn't exist, create a new user
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(email + process.env.JWT_SECRET, salt);

      user = new User({
        name,
        email,
        password,
        image: picture,
      });

      await user.save();
    }

    // Generate a JWT token for the user
    const token1 = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.status(200).json({ token1, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
