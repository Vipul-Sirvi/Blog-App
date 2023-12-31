import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("home.ejs", {blogPost : blog});
});

app.get("/new_blog_form", (req, res) => {
    res.render("new_blog_form.ejs", {blogPost : blog});
});

app.post("/submit", (req, res) => {
    blog.push(req.body);
    res.render("home.ejs", {blogPost : blog});
})

app.get("/blog/:id", (req, res) => {

    let id = req.params["id"];
    let { title, content} = blog[id];
    res.render("blog.ejs", {
        blogPost : blog,
        blogTitle : title,
        blogContent : content,
        i : id,
    })

});

app.get("/editBlog/:id", (req, res) => {
    const id = req.params.id;
    const {title, content} = blog[id];
    res.render("editblog.ejs", {
        id, title, content, blogPost : blog
    })
});

app.post("/update/:id", (req, res) => {
    const id = req.params.id;
    blog[id].title = req.body.title;
    blog[id].content = req.body.content;
    res.render("blog.ejs", {
        blogTitle : blog[id].title, 
        blogContent: blog[id].content, 
        blogPost : blog,
        i : id,
    })
})

app.get("/delete/:id", (req, res) => {
    //console.log(req.params.id);
    blog.splice(req.params.id, 1);
    //console.log(blog);
    res.render("home.ejs", {
        blogPost : blog,
    })
})

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});

let blog = [
    { 
        title : "The Art of Effective Time Management",
        content : "In a world filled with distractions, mastering time management is crucial for productivity. Explore proven techniques, such as the Pomodoro Technique and time blocking, to enhance your efficiency and achieve your goals."  
    },

    {
        title : "Navigating the Gig Economy: A Freelancer's Guide",
        content : "The gig economy offers unprecedented opportunities for freelancers. Discover tips on building a strong online presence, setting competitive rates, and effectively marketing your skills to thrive in the dynamic world of freelancing."
    },

    {
        title : "Embracing Mindfulness in a Fast-Paced World",
        content : "In the hustle and bustle of modern life, practicing mindfulness has become essential for mental well-being. Learn simple mindfulness exercises and techniques to reduce stress, increase focus, and enhance overall life satisfaction."
    },

    {
        title : "Unlocking Creativity: Overcoming Creative Blocks",
        content : "Every creative individual encounters blocks at some point. Explore strategies to overcome creative hurdles, including changing perspectives, embracing constraints, and fostering a conducive environment for innovation."
    },

    {
        title : "The Power of Networking: Building Professional Relationships",
        content : "Networking is a powerful tool for career growth and personal development. Discover the art of effective networking, whether online or offline, and learn how meaningful connections can open doors to new opportunities."
    }

];