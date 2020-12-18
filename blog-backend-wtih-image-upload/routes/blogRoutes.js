const express = require("express");
const multer = require("multer");
const upload = multer({dest: "./blogImages"});
const { 
    getAllBlogs, 
    createBlog, 
    verifyPostRequest, 
    getBlogById,
    deleteBlogById, 
 } = require("../controllers/blogController");

const router = express.Router();

router.route("/blogs").get(getAllBlogs).post(upload.any(),(req,res,next)=>{
    next();
},verifyPostRequest,createBlog);
router.route("/blogs/:blogId").get(getBlogById).delete(deleteBlogById);

module.exports = router;