// // server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const Post = require('./Pastmodel');
// const PostDetail = require('./PostDetails')


// // Create an Express app
// const app = express();

// // Middleware to parse JSON data
// app.use(bodyParser.json());
// app.use(cors());

// // Connect to MongoDB (replace 'mongodb://localhost:27017/career-guidance' with your MongoDB URI)
// mongoose.connect('mongodb+srv://dianaduumbu:B9IxDaNmdydBZc4h@cluster.aolcy.mongodb.net/careerdev?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('Connected to MongoDB'))
// .catch(err => console.error('Failed to connect to MongoDB:', err));



// // Check for successful connection
// mongoose.connection.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// // API routes

// // Get all posts (Home page)
// app.get('/api/posts', async (req, res) => {
//   try {
//     const posts = await Post.find();
//     res.json(posts);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch posts' });
//   }
// });

// // Get a single post by ID (PostDetails page)
// app.get('/api/posts/:id', async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (!post) {
//       return res.status(404).json({ message: 'Post not found' });
//     }
//     res.json(post);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch post' });
//   }
// });

// // Create a new post
// app.post('/api/posts', async (req, res) => {
//   const { title, content, author } = req.body;

//   try {
//     const newPost = new Post({ title, content, author });
//     await newPost.save();
//     res.status(201).json(newPost);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to create post' });
//   }
// });

// // Update an existing post
// app.put('/api/posts/:id', async (req, res) => {
//   try {
//     const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!updatedPost) {
//       return res.status(404).json({ message: 'Post not found' });
//     }
//     res.json(updatedPost);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to update post' });
//   }
// });

// // Delete a post
// app.delete('/api/posts/:id', async (req, res) => {
//   try {
//     const deletedPost = await Post.findByIdAndDelete(req.params.id);
//     if (!deletedPost) {
//       return res.status(404).json({ message: 'Post not found' });
//     }
//     res.json({ message: 'Post deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to delete post' });
//   }
// });
// app.post('/api/posts/:id/details', async (req, res) => {
//   const { extraDetail, moreInfo, paragraphs } = req.body;

//   try {
//     const post = await Post.findById(req.params.id);
//     if (!post) {
//       return res.status(404).json({ message: 'Post not found' });
//     }

//     const postDetail = new PostDetail({
//       postId: req.params.id,  // Linking to the post
//       title: post.title,      // Copying the title from the Post
//       paragraphs,             // The paragraphs provided in the body
//       extraDetail,
//       moreInfo,
//     });
//     await postDetail.save();
//     res.status(201).json(postDetail);
//   } catch (err) {
//     res.status(400).json({ message: 'Error creating post detail', error: err.message });
//   }
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Post = require('./Pastmodel'); // Ensure you have the Post model
const PostDetail = require('./PostDetails');

// const paragraphs = req.body.paragraphs;
// Create an Express app
const app = express();

// Middleware to parse JSON data
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB (replace with your MongoDB URI)
mongoose.connect('mongodb+srv://dianaduumbu:B9IxDaNmdydBZc4h@cluster.aolcy.mongodb.net/careerdev?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB:', err));

// Check for successful connection
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// API routes

// Get all posts (Home page)
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
});

// Get a single post by ID (PostDetails page)
app.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch post' });
  }
});

// Create a new post
app.post('/api/posts', async (req, res) => {
  const { title, content, author } = req.body;

  try {
    const newPost = new Post({ title, content, author });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create post' });
  }
});

// Update an existing post
app.put('/api/posts/:id', async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update post' });
  }
});

// Delete a post
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete post' });
  }
});

app.post('/api/posts/:id/details', async (req, res) => {
  const { extraDetail, moreInfo } = req.body;

  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Create the post detail with title and date
    const postDetail = new PostDetail({
      postId: req.params.id,   // Associating PostDetail with the post via the postId
      title: post.title,       // Set the title from the associated post
      // content: post.content,   // Add content from the post model
      date: new Date(),  
      paragraphs: post.paragraphs,  // Set paragraphs from the associated post
      extraDetail,
      moreInfo,
    });

    // Save the PostDetail
    await postDetail.save();
    res.status(201).json(postDetail);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Fetch details for a specific post
app.get('/api/posts/:id/details', async (req, res) => {
  try {
    const details = await PostDetail.findOne({ postId: req.params.id });
    if (!details) {
      return res.status(404).json({ message: 'Post details not found' });
    }
    res.json(details);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch post details' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
