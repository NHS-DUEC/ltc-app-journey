// ########################################################
// External dependancies
// ########################################################
const express = require('express');
const { set } = require('lodash');
const router = express.Router();

router.use('/components', require('./lib/routes/components'));
router.use('/', require('./lib/routes/misc'));


// ########################################################
// Your routes beneath here
// ########################################################

// router.use('/version-1', require('./routes/version-1'));



// web route 1: No known health issues -> Location Age Sex -> Topics -> As is weird question page -> End
// web route 2: HAS known health issues, symptom today NOT related -> Location Age Sex -> Topics -> Enhanced weird question page -> End
// web route 3: HAS known health issues, symptom today is related, HAS been to A&E -> Location Age Sex -> End (call 111)
// web route 4: HAS known health issues, symptom today is related, has NOT been to A&E, HAS a care plan -> Location Age Sex -> End (call 111)
// web route 5: HAS known health issues, symptom today is related, has NOT been to A&E, has NOT got a care plan -> Location Age Sex -> Topics -> Enhanced weird question page -> End

router.post('/version-1/web-known-health-issues', (req, res, next) => {


  // Make a variable and give it the value from 'knownHealthIssues'
  const knownHealthIssues = req.session.data['known-health-issues'];

  if (knownHealthIssues == 'yes') {

    // Send user to related-symptoms page
    res.redirect('/version-1/web-related-symptoms');

  } else if (knownHealthIssues == 'no') {

    // Send user to as-is route (route 1) - ask their location 
    res.redirect('/version-1/web-where-are-you-now-1');

  } else {

    // Send user to as-is route (route 1) - ask their location 
    res.redirect('/version-1/web-where-are-you-now-1');

  }

  
  next()
});

router.post('/version-1/web-related-symptoms', (req, res, next) => {


  // Make a variable and give it the value from 'related-symptoms'
  const relatedSymptoms = req.session.data['related-symptoms'];

  if (relatedSymptoms == 'yes') {

    // Send user to related-symptoms page 
    res.redirect('/version-1/web-a-e-visit');

  } else if (relatedSymptoms == 'no') {

    // Send user to enhanced route (web route 2) - ask their location 
    res.redirect('/version-1/web-where-are-you-now-2');

  } else {

    // Send user to enhanced route (web route 2) - ask their location 
    res.redirect('/version-1/web-where-are-you-now-2');

  }

 
  next()
});

router.post('/version-1/web-a-e-visit', (req, res, next) => {


  // Make a variable and give it the value from 'A-E-visit'
  const aeVisit = req.session.data['A-E-visit'];

  if (aeVisit == 'yes') {

    // Send user to route 3: call 111 (skip Care plan question)
    res.redirect('/version-1/web-call-111-now-3');

  } else if (aeVisit == 'no') {

    // Send user to enhanced route - ask their location 
    res.redirect('/version-1/web-care-plan');

  } else {

    // Send user to enhanced route - ask their location 
    res.redirect('/version-1/web-care-plan');

  }

  
  next()
});

router.post('/version-1/web-care-plan', (req, res, next) => {


  // Make a variable and give it the value from 'care-plan'
  const carePlan = req.session.data['care-plan'];

  if (carePlan == 'yes') {

    // Send user to early exit (route 4) - ask them call 111
    res.redirect('/version-1/web-call-111-now-4');

  } else if (carePlan == 'no') {

    // Send user to enhanced route (route 5) - ask their location + show enhanced weird question page
    res.redirect('/version-1/web-where-are-you-now-5');

  } else {

    // Send user to enhanced route (route 5) - ask their location + show enhanced weird question page
    res.redirect('/version-1/web-where-are-you-now-5');

  }

  
});


router.post('/version-1/web-is-it-your-home-postcode-3', (req, res, next) => {


  // Make a variable and give it the value from 'is-home-postcode'
  const isHomePostcode = req.session.data['is-home-postcode'];
 

  if (isHomePostcode == 'yes') {

    // Send user to age page route 3
    res.redirect('/version-1/web-what-is-your-age-3');
   
  } else if (isHomePostcode == 'no') {

    // Send user to enter home postcode route 3
    res.redirect('/version-1/web-what-is-your-home-postcode-3');

  } else {

    // Send user to enter home postcode route 3
    res.redirect('/version-1/web-what-is-your-home-postcode-3');

  }

  
});

router.post('/version-1/web-is-it-your-home-postcode-4', (req, res, next) => {


  // Make a variable and give it the value from 'is-home-postcode'
  const isHomePostcode = req.session.data['is-home-postcode'];

  if (isHomePostcode == 'yes') {

    // Send user to age page route 4
    res.redirect('/version-1/web-what-is-your-age-4');

  } else if (isHomePostcode == 'no') {

    // Send user to enter home postcode route 4
    res.redirect('/version-1/web-what-is-your-home-postcode-4');

  } else {

    // Send user to enter home postcode route 4
    res.redirect('/version-1/web-what-is-your-home-postcode-4');

  }

  
});

router.post('/version-1/web-where-are-you-now-3', (req, res, next) => {

  // Make a variable and give it the value from 'CurrentPostcode3'
  var currentPostcode = req.session.data['CurrentPostcode3'];
  
  

  // Direct user to next page ask this is their home postcode route 3
  res.redirect('/version-1/web-is-it-your-home-postcode-3');

});

router.post('/version-1/web-where-are-you-now-4', (req, res, next) => {

  // Make a variable and give it the value from 'CurrentPostcode4'
  var currentPostcode = req.session.data['CurrentPostcode4'];
  
  

  // Direct user to next page ask this is their home postcode route 4
  res.redirect('/version-1/web-is-it-your-home-postcode-4');

});

router.post('/version-1/web-what-is-your-home-postcode-3', (req, res, next) => {

  // Make a variable and give it the value from 'HomePostcode'
  var homePostcode = req.session.data['HomePostcode'];
  
  

  // Direct user to next page to ask their age route 3
  res.redirect('/version-1/web-what-is-your-age-3');

});

router.post('/version-1/web-what-is-your-home-postcode-4', (req, res, next) => {

  // Make a variable and give it the value from 'HomePostcode'
  var homePostcode = req.session.data['HomePostcode'];
  
  

  // Direct user to next page to ask their age route 4
  res.redirect('/version-1/web-what-is-your-age-4');

});




router.post('/version-1/web-what-is-your-age-3', (req, res, next) => {

  // Make a variable and give it the value from 'UserInfoAge'
  var userAge = req.session.data['UserInfoAge'];
  
  

  // Direct user to next page ask this is their phone number route 3
  res.redirect('/version-1/web-what-is-your-phone-number-3');

  
});

router.post('/version-1/web-what-is-your-age-4', (req, res, next) => {

  // Make a variable and give it the value from 'UserInfo.Age.Age'
  var userAge = req.session.data['UserInfoAge'];
  
  

  // Direct user to next page ask this is their phone number route 4
  res.redirect('/version-1/web-what-is-your-phone-number-4');

  
});


router.post('/version-1/web-what-is-your-phone-number-3', (req, res, next) => {

  // Make a variable and give it the value from 'TelephoneNumber'
  var phoneNumber = req.session.data['TelephoneNumber'];
  
  
  // Make a variable and give it the value from 'is-home-postcode'
  const isHomePostcode = req.session.data['is-home-postcode'];

  if (isHomePostcode == 'yes') {

   // Direct user to next page check details route 3y - same postcodes
  res.redirect('/version-1/web-check-details-3-y');

  } else if (isHomePostcode == 'no') {

    // Direct user to next page check details route 3n - different postcodes
   res.redirect('/version-1/web-check-details-3-n');
  } else {

     // Direct user to next page check details route 3n - different postcodes
   res.redirect('/version-1/web-check-details-3-n');
  }
});


router.post('/version-1/web-what-is-your-phone-number-4', (req, res, next) => {

  // Make a variable and give it the value from 'TelephoneNumber'
  var phoneNumber = req.session.data['TelephoneNumber'];
  
  
  // Make a variable and give it the value from 'is-home-postcode'
  const isHomePostcode = req.session.data['is-home-postcode'];

  if (isHomePostcode == 'yes') {

   // Direct user to next page check details route 4y - same postcodes
  res.redirect('/version-1/web-check-details-4-y');

  } else if (isHomePostcode == 'no') {

    // Direct user to next page check details route 4n - different postcodes
   res.redirect('/version-1/web-check-details-4-n');

  } else {

     // Direct user to next page check details route 4n - different postcodes
   res.redirect('/version-1/web-check-details-4-n');
  }

});















// ########################################################
module.exports = router;
// ########################################################
