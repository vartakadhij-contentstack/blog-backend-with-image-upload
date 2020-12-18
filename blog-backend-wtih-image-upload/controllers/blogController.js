const fs = require("fs");
const path = require("path");
const Blog = require("../models/Blog");
const sendErrorMessage = require("../helpers/sendError");
const AppError = require("../helpers/appErrorClass");
const sendResponse = require("../helpers/sendResponse");
const fileName = path.join(__dirname,"..","data","blogs.json");

const blogs = JSON.parse(fs.readFileSync(fileName,"utf-8"));

const verifyPostRequest = (req,res,next)=>{
    const requiredProperties = ["blogAuthor","blogHeader","blogContent"];
    let result = requiredProperties.every((key)=>{
        return req.body[key];
    })

    if(!result){
        sendErrorMessage(new AppError(400,
            "Unsuccessful",
            "Request Body is not valid"),
        req,
        res
        )
    }
    else{
        next();
    }
}

const getAllBlogs = (req,res,next) => {
    sendResponse(200,"Successful",[blogs],req,res);
}

const createBlog = (req,res,next) => {
    let newBlog = new Blog(
        req.body.blogAuthor,req.body.blogHeader,req.body.blogContent,req.files);
    blogs.push(newBlog);
    fs.writeFile(fileName,JSON.stringify(blogs,null,2), (err)=>{
        if(err){
            sendErrorMessage(
                new AppError(500,"Internal Error","Error in completing request"),
                req,
                res
                );
        return err;
        }
        sendResponse(201,"Successful",[newBlog],req,res);
    });
}

const getBlogById = (req,res,next)=>{
    let result = blogs.filter((blog)=>{
        return blog.blogId == req.params.blogId;
    });
    if(!result[0]){
        sendErrorMessage(new AppError(400,"Unsuccessful","Blog not found"),req,res);
    }
    sendResponse(200,"Successful",result,req,res);
}

const deleteBlogById = (req,res,next) =>{
    let result = blogs.filter((blog)=>{
        return blog.blogId == req.params.blogId;
    });
    if(!result[0]){
        sendErrorMessage(new AppError(400,"Unsuccessful","Blog not found"),req,res);
    }

    let index = blogs.findIndex((blog)=>{
        return blog.blogId == req.params.blogId;
    });
    if(index !== -1){
        let deletedBlog = blogs.splice(index,1);
        fs.unlink(path.join(__dirname,"..","blogImages",
        deletedBlog[0].blogBannerImage[0].filename), (err=>{
            if(err){
                sendErrorMessage(new AppError(400,"Unsuccessful","Error in removing file")
                ,req
                ,res)
            }
        }));
        fs.writeFile(fileName,JSON.stringify(blogs,null,2), (err)=>{
            if(err){
                sendErrorMessage(
                    new AppError(500,"Internal Error","Error in completing request"),
                    req,
                    res
                    );
            return err;
            }
            sendResponse(200,"Successful",[deletedBlog],req,res);
        });
    }
}

module.exports.getAllBlogs = getAllBlogs;
module.exports.createBlog = createBlog;
module.exports.verifyPostRequest = verifyPostRequest;
module.exports.getBlogById = getBlogById;
module.exports.deleteBlogById = deleteBlogById;