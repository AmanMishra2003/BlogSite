module.exports = {
    showBlogPage : (req,res)=>{
        res.render('Blog/blogPage')
    },
    showUserPost : (req,res)=>{
        res.render('Blog/userPost')
    }
}