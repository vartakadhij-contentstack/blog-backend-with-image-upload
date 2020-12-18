# blog-backend-with-image-upload

This is a repository for blog backend with image upload (using file system).

The application contains endpoints for the following operations:
1. Get all blogs
2. Get a blog by id
3. Create a blog
4. Delete a blog by id

Make sure that you install all the dependencies by running the ```npm install``` command.

# Run the application

For running the application, you can use the ```npm run dev``` command. Make sure that you have **Nodemon** installed on your machine.
If not, then you can simply use the ```node app.js``` command to run the application.

# API End points

# 1. Get all blogs

For this, use the ```/blogdata/blogs``` end point with a GET request to get all the existing blogs.

# 2. Get a blog by id

For this, use the ```/blogdata/blogs/:blogId``` end point with a GET request and provide a valid blogId (blogId of an existing blog) in the **Params** for a valid request.

# 3. Create a blog

For this, use the ```/blogdata/blogs``` end point with a POST request. For a valid request, provide the details inside the **Body** as a *form-data*.
In that, change the **Key** type of the first field from the default *Text* to *File* and enter the fieldname. Provide the **Value** of the first field as the Image File that is to be uploaded for that particualr blog. Set the **Content Type** of the first field as *multipart/form-data*.

The next 3 fields should be set as type *Text*. The **Key** to be passed in those 3 field should be as follows for a valid request:
1. blogAuthor
2. blogHeader
3. blogContent

Set the **Content Type** as *application/json* for those 3 fields.

 # 4. Delete a blog by id

For this, use the ```blogdata/blogs/:blogId``` end point with a DELETE request and provide a valid blogId (blogId of an existing blog) in the **Params** for a valid request.

All the above requests should be made using the **Postman** application.
