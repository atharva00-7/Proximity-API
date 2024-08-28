const express = require("express");
const router = express.Router();

const {postSchool} = require('../controllers/postSchools');
const {getSchools} = require('../controllers/getSchools');

router.get('/listSchools',getSchools);
router.post('/addSchool',postSchool);
module.exports = router;