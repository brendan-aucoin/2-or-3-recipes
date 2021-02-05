const RecipeModel = require('../schemas/Recipe');
// const upload = require('../image-uploading/storage.js'); //not used in production build
const path = require('path');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const multer = require('multer');
const bodyParser = require('body-parser');

//setting up the image storage
cloudinary.config({
    cloud_name: 'du03nd2uf',
    api_key:'288238154484171',
    api_secret:'juagTlxexFlStzfLBxMttnJd1Mk'
});
const upload = multer();

//set up the body parser
const urlencodedParser = bodyParser.urlencoded({extended:false})

// all of the routes for this app.
module.exports = function(app){    
    /*
        the function where you add a new recipe to the database
        you need the upload.single as the middleware, as well as the url parser
    */
    app.post("/upload-recipe",urlencodedParser,upload.single('recipeImage'),(req,res)=>{
        // take the requests body and convert it from a string to a js object to send to the database
        const recipeContent = JSON.parse(req.body.content);

        // you dont wanna include certain state properties in the data base 
        //delete all the unwanted properties from the state
        const deleteProperties = JSON.parse(req.body.deleteProperties);
        deleteProperties.forEach(property=>delete recipeContent[property]);


        // take all the properties that are meant to be numbers and convert them from strings to numbers. (prepTime, cookTime , ...)
        const convertToNumberProperties = JSON.parse(req.body.convertToNumberProperties);
        convertToNumberProperties.forEach(property=>convertStringToNumber(recipeContent,property))

        // if the picture was valid
        if(req.file && (req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png' || req.file.mimetype === 'image/jpg')){
            // upload the picture through cloudinary and save it
            const picturePromise = uploadPicture(req);
            picturePromise.then(pic=>{
                saveRecipe(recipeContent,pic);
            })
            res.send("Uploaded a recipe with a picture");
        }
        // upload a recipe where the picture is null
        else{
            saveRecipe(recipeContent,null);
            res.send("Uploaded a recipe without a picture");
        }
    });

   
    //finds all the documents in the db and sends them to the frontend.
    app.get('/get-all-recipes',(req,res)=>{
        RecipeModel.find({},(err,data)=>{
            if(err){throw err}
            res.json(data);
        })
    });

    // will get one specific document based on the ID that is passed through the route parameters
    app.get('/get-recipe/:recipeID',(req,res)=>{
        RecipeModel.findById((req.params.recipeID)).then(doc=>{
            res.json({recipe:doc})
        }).catch(err=>{
            console.log(err);
        })
    });

    //any url will give you index.html becuase that is our frontend entry point
    app.get('*',function(req,res){
        res.sendFile(path.join(__dirname,'my-app/build','index.html'))
    });
}



/*
    given an object (a recipe) convert a specific property of that object to a number.
    a valid number cannot be negative
*/
const convertStringToNumber = (object,property)=>{
    const newNumber = Number(object[property]);
    object[property] = (newNumber && newNumber>=0) ? newNumber :null;
}

/*
    saves a recipe to the db.
    if it has a pic it will include the pictures url in the document,
    if not then it sets the picture to null
*/
const saveRecipe = (recipeContent,pic)=>{
    const savedRecipe = {
        ...recipeContent,
        date:new Date(),
    }
    if(pic){
        savedRecipe.picture = pic.url
        savedRecipe.securePicture = pic.secure_url
    }
    else{
        savedRecipe.picture =null
    }
    // save the new recipe you made to the database
    let newRecipe = new RecipeModel(savedRecipe);
    newRecipe.save();
}

/*
    uploads a picture via cloudinary and streamify
*/
const uploadPicture = async (req)=>{
    let tempPicture = {};
    let streamUpload = (req)=>{
        return new Promise((resolve,reject)=>{
            let stream = cloudinary.uploader.upload_stream(
                (error,result)=>{
                    if(result){
                        resolve(result);
                    }
                    else{
                        reject(error);
                    }
                }
            );
            streamifier.createReadStream(req.file.buffer).pipe(stream);
        })
    };

   async function upload(req){
       result = await streamUpload(req);
       return result
   } 

    return upload(req);

}