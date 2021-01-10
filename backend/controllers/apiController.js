
const multer = require('multer')
const RecipeModel = require('./../Recipe');

// storage strategy
// how files get stored
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
});

const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        // accept
        cb(null,true);
    }
    else{
        // reject
        cb(null,false);
    }
    
}

// const upload = multer({dest:'./uploads'});
// 1024*1024*5 is 5mb
const upload = multer({
    storage:storage,
    limits:{
        fileSize:1024*1024*5
    },
    fileFilter:fileFilter
    
})

module.exports = function(app,urlencodedParser){
    app.post('/test',async (req,res)=>{
        let recipe = {
            name:"Cury",
            author:"Brendan",
            picture:"corgi.jpg",
            ingredients:[],
            prepTime:"20000",
            cookTime:"1",
            servings:"2",
            calories:"50",
            tags:[],
            instructions:[]
        };

        let testRecipe = new RecipeModel(recipe);

        await testRecipe.save();
        res.json(testRecipe);
    })

    app.get("/test1",(req,res)=>{
        RecipeModel.find({},(err,data)=>{
            if(err){throw err}
            console.log(data)
        })
    })



    app.post("/upload-recipe",urlencodedParser,upload.single('recipeImage'),(req,res)=>{
        // console.log("DOOGG")
        const recipeContent = JSON.parse(req.body.content);
        delete recipeContent.selectedFile;
        delete recipeContent.allTags;

        const savedRecipe = {
            ...recipeContent,
            picture:req.file.path

        }

        // console.log("Object = " + savedRecipe);
        console.log(savedRecipe);
        let newRecipe = new RecipeModel(savedRecipe);
        newRecipe.save();
    });


    app.get('/get-all-recipes',(req,res)=>{
        RecipeModel.find({},(err,data)=>{
            if(err){throw err}
            console.log(data);
            res.json(data);
        })
    })
}




/*
    Product Schema
    const productSchema = mongoose.Schema.Types.ObjectId,
    name:{type:String,required:true},
    price:{type:Number,required:true},
    productImage: {type:String,required:true}

*/


/*
to get the image to show it 
you cant GET /uploads/corgi.jpg
*/