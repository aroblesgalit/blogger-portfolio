const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        default: "john doe"
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate: [({ length }) => length >= 6, "Password should be longer."]
    },
    email: {
        type: String,
        trim: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
        lowercase: true,
        default: "johndoe@email.com"
    },
    phone: {
        type: Number,
        trim: true,
        match:[/\d{10}/],
        default: 5555555555
    },
    about: {
        type: String,
        trim: true,
        default: "Here's my story..."
    },
    socialMedias: {
        type: Array
    },
    imgHome: {
        type: String,
        trim: true,
        default: "https://via.placeholder.com/900x1230"
    },
    imgAboutTop: {
        type: String,
        trim: true,
        default: "https://via.placeholder.com/900x700"
    },
    imgAboutBot: {
        type: String,
        trim: true,
        default: "https://via.placeholder.com/900x700"
    }
});

userSchema.pre("save", async function save(next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified("password")) {
        return next();
    }
    try {
        // Generate salt
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        // Hash the password along with the new salt
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err);
    }
});

userSchema.methods.validatePassword = async function validatePassword(data) {
    return bcrypt.compare(data, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;