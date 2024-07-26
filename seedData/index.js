const mongoose = require('mongoose')
const Blog = require('../models/BlogModel')

mongoose.connect("mongodb://localhost:27017/blogSiteCodeSoft").then(()=>console.log("connected"))

const seedingData = async()=>{
    await Blog.deleteMany({})
    for (let index = 0; index < 10; index++) {
       const newBlog = await new Blog({
        image: {
                path: "https://res.cloudinary.com/dw3uvmlbu/image/upload/v1721897972/BlogSiteCodeSoft/BlogImage/xj6gf90cewg0y78yuud5.jpg",
                filename: "BlogSiteCodeSoft/BlogImage/xj6gf90cewg0y78yuud5",
        },
        category :"story",
        title :"lorem ipsum title",
        blogDate : new Date(),
        content :"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        views:10,
        author: "66a3be8c6fdc18e5f68efbb5"
       });
       await newBlog.save()
    }
}   

seedingData().then(()=>mongoose.connection.close())