const express = require("express");
const userController = require("../../../controller/user.controller");
const passport = require("passport");
const sendMail = require("../../../utilse/nodemailer");
const exportpdfmake = require("../../../utilse/pdfcrate");

const router = express.Router();

router.post("/useradd", userController.register);
router.post("/login", userController.login);
router.post("/get-newtoken", userController.generateNewToken);
router.post("/logout", userController.logout);

//http://localhost:5000/api/v1/users/googlelogin
router.get('/googlelogin', passport.authenticate('google', { scope: ['profile','email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  console.log("Successful authentication");
  res.send("okkk");
});

//http://localhost:5000/api/v1/users/facebooklogin

router.get('/facebooklogin', passport.authenticate('facebook'));
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
  console.log("Successful authentication");
  res.send("okkk");
});


// router.post('/sendemail', async (req, res) => {
//   const { to, subject, text, html } = req.body;

//   console.log(req.body);

//   try {
//       await sendMail(to, subject, text, html);
//       res.status(200).send('Email sent successfully!');
//   } catch (error) {
//       res.status(500).send('Error sending email');
//   }
// });

router.get(
  '/pdfmake',
  exportpdfmake
)



module.exports = router;
