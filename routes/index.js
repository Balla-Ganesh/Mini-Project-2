var express = require('express');
var router = express.Router();

const { findOne } = require("../models/company_info");
const company = require('../models/company_info');
const company_info = require("../models/post_info")

const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Set the destination folder for temporary file uploads
const fs = require('fs');

var user = null;

// Configure Cloudinary with your account credentials
cloudinary.config({
  cloud_name: 'dhvfcolmy',
  api_key: '454654121462876',
  api_secret: 'e1I7cPr6fDgmojR52d7c2fv2kN0'
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Placement Pre-Preparation' });
});

router.get('/companies', async function (req, res) {
  try {
    const allCompanies = await company.find();
    res.render('companies', { title: 'Welcome to companies page', allCompanies, req: req });
  }
  catch (error) {
    next(error);
  }
});

router.get('/getInfo', async function (req, res) {
  try {
    const allInfo = await company_info.find();
    res.render('companiesInfo', { title: 'Welcome to companies page', allInfo, req: req });
  }
  catch (error) {
    next(error);
  }
});

router.get('/getInfo/:company', async function (req, res,next) {
  try {
    const company = req.params.company;
    console.log("Companey Name: "+company);
    const allInfo = await company_info.find({company_name : company});
    console.log("success");
    res.render('companiesInfo', { title: 'Welcome to companies page', allInfo, req: req });
  }
  catch (error) {
    next(error);
  }
});

router.get('/oneCompany/:name', async function (req, res) {
  try {
    const name = req.params.name;
    console.log(name);
    const Info = await company.findOne({ name: name });
    res.render('company', { title: 'Welcome to companies page', Info, req: req });
  }
  catch (error) {
    // next(error);
    console.log("error");
  }
});

// router.post('searchCompany', async function(req,res){
//   try{
//     const name = req.body;
//     const info = await company.findOne({name: name});
//     res.render('company', {title: 'Welocme to companies Page', Info, req:req});
//   }
//   catch(error){
//     console.log("error");
//   }
// });

router.get('getCompanyinfo/:name', async function(req,res){
  try {
    const name = req.params.name;
    const Info = await company.findOne({ name: name });
    res.render('company', { title: 'Welcome to companies page', Info, req: req });
  }
  catch (error) {
    // next(error);
    console.log("error");
  }
});

router.get('/admin',function(req,res){
  res.render('admin',{title:'Admin Page'});
});

router.get('/signOut',function(req,res){
  user = null;
  res.render('index', { title: 'Placement Pre-Preparation', user});
});

router.post('/admin',function(req,res){
  const {username , password} = req.body;
  console.log(req.body);
  console.log(username);
  console.log(password);
  if(username == "admin" && password == "admin"){
    user = { username: "admin" };
  }
  else{
    user = null;
  }
  res.render('index', { title: 'Placement Pre-Preparation', user });
});

router.get('/addCompanies', function (req, res) {
  res.render('addCompanies', { title: "Companies Adding Page" });
});


router.post('/addCompanies', upload.single('image'), async function (req, res,next) {
  try {
    const { name, year, products, info, url } = req.body;
    const img = req.file;
    const cloudinaryResult = await cloudinary.uploader.upload(img.path, { folder: 'company-logos' });
    const newCompany = new company({
      name: name,
      year: year,
      products: products,
      info: info,
      url: url,
      image: cloudinaryResult.secure_url // Store the Cloudinary image URL
    });
    await newCompany.save();
    fs.unlinkSync(img.path);
    console.log("Success");
    res.render('index', { title: 'Placement Pre-Preparation', user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error occurred while saving the company to the database');
  }
});


// router.post('/addCompanies', async function (req, res) {
//   try {
//     const { name, year, products, info, url ,img} = req.body;
//     const newCompany = new company({
//       name: name,
//       year: year,
//       products: products,
//       info: info,
//       url: url
//     });
//     const entry = await company.findOne({ name });
//     if (entry) {
//       console.log("Error");
//       res.status(500).send('Company already exists');
//     }
//     else {
//       try {
//         await newCompany.save();
//         console.log("saved successfully");
//         console.log(newCompany.name);
//         console.log(newCompany.year);
//         console.log(newCompany.products);
//         console.log(newCompany.info);
//         console.log(newCompany.url);
//       } catch (err) {
//         console.error(err);
//         res.status(500).send('Error occurred while saving the company to the database');
//       }
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error occurred while finding duplicates');
//   }
// });

router.get('/post_info', function (req, res) {
  res.render('post_info', { title: "Post Info Page" });
});

router.get('/post_info/:company', function (req, res) {
  const company = req.params.company;
  console.log(company);
  res.render('post_info', { title: "Post Info Page" , company});
});

router.post('/post_info', async function (req, res, next) {
  try {
    const { roll_no, name, year, department, email, phone_no, company_name, company_role, company_requirments, exam_pattern, tech1, tech2, hr, inputs } = req.body;
    const newInfo = new company_info({
      roll_no: roll_no,
      name: name,
      year: year,
      department: department,
      email: email,
      phone_no: phone_no,
      company_name: company_name,
      company_role: company_role,
      company_requirments: company_requirments,
      exam_pattern: exam_pattern,
      tech1: tech1,
      tech2: tech2,
      hr: hr,
      inputs: inputs
    });
    try {
      await newInfo.save();
      console.log("Success");
      res.render('post_info', { title: "Post Info Page" });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error occurred while saving the company info to the database');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error occurred while finding duplicates');
  }
});

module.exports = router;
