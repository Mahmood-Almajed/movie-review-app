const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema(
    {
      text: {
        type: String,
        required: true
      },
      rating: {
        type: Number,
        required: true
      },
      author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true }
  );




//movies Schema

const  moviesSchema = new mongoose.Schema({

    title:{
    type:String,
    required:true,
    },
    genre:{
        type:String,
        required:true,
        enum:['Action', 'Comedy','Darama','Horror','Sci-Fi']
    },
    
    description:{
    
    type:String,
    required:true,
    
    },
    director:{
    
        type:String
    },
    releaseDate:{
     type:Date
    
        
    },
    
     author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
     reviews:[reviewsSchema],
    
    },    { timestamps: true }
    );
    
    const Movie =mongoose.model('Movie', moviesSchema);
    module.exports=Movie