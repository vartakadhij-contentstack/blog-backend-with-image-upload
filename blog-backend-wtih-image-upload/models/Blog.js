const uniqid = require("uniqid");

class Blog{
    constructor(blogAuthor,blogHeader,blogContent,blogBannerImage){
        this.blogId = uniqid();
        this.blogAuthor = blogAuthor;
        this.blogHeader = blogHeader;
        this.blogContent = blogContent;
        this.blogBannerImage = blogBannerImage;
    }
}

module.exports = Blog;