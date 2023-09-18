import mongoose from "mongoose"

// Defining contact schema.
const contactSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    dob: {
        type: Date,
    },
    dateOfCreation: {
        type: Date,
        default: Date.now,
    }

});

// Creating and exporting the Contact model.
export default mongoose.model("Contact", contactSchema);