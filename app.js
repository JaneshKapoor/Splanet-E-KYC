// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb+srv://Janesh:Janesh%40123@splanet.scp1nc4.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// MongoDB schema for the form data
const formSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    shopName: { type: String, required: true },
    websiteUrl: String,
    categories: [String],
    aadharNumber: { type: String, required: true }
});

const FormModel = mongoose.model('Form', formSchema);

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Render the form
app.get('/', (req, res) => {
    res.render('index');
});
// app.get('/success', (req, res) => {
//     res.render('success');
// });
// In app.get('/success', (req, res) => { ... });

app.get('/success', (req, res) => {
    const aadharNumber = req.query.aadharnumber; // Retrieve the aadharNumber from query parameters
    res.render('success', { aadharNumber: aadharNumber }); // Pass aadharNumber to the EJS template
});


// Handle form submissions
app.post('/submitForm', async(req, res) => {
    try {
        const formData = req.body;

        // Save the form data to MongoDB
        const formEntry = new FormModel(formData);
        await formEntry.save();
// 

        res.redirect('/success?aadharnumber=' + encodeURIComponent(formEntry.aadharNumber));
// res.send('Form submitted successfully');
        // res.redirect('/success');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});