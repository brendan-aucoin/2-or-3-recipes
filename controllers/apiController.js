const RecipeModel = require('../schemas/Recipe');
// const upload = require('../image-uploading/storage.js');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const multer = require('multer');

cloudinary.config({
    cloud_name: 'du03nd2uf',
    api_key:'288238154484171',
    api_secret:'juagTlxexFlStzfLBxMttnJd1Mk'
});
const upload = multer();
var picture2 = {}
module.exports = function(app,urlencodedParser){    
    // the function where you add a new recipe to the database
    // you need the upload.single as the middleware
    app.post("/upload-recipe",urlencodedParser,upload.single('recipeImage'),(req,res)=>{
        // take the requests body and convert it from a string to a js object to send to the database
        const recipeContent = JSON.parse(req.body.content);

        // you dont wanna include certain state properties in the data base 
        const deleteProperties = JSON.parse(req.body.deleteProperties);
        deleteProperties.forEach(property=>delete recipeContent[property]);

        // changing the prep,cook time,servings,and calories to numbers
        const convertToNumberProperties = JSON.parse(req.body.convertToNumberProperties);
        convertToNumberProperties.forEach(property=>convertStringToNumber(recipeContent,property))

        
        if(req.file && (req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png' || req.file.mimetype === 'image/jpg')){
            const picturePromise = uploadPicture(req);
            picturePromise.then(pic=>{
                saveRecipe({
                    ...recipeContent,
                    picture:pic.url,
                    securePicture:pic.secure_url,
                    date:new Date()
                })
            })
            res.JSON({worked:"YES"});
        }
        else{
            saveRecipe({
                ...recipeContent,
                picture:null,
                date:new Date()
            })

            res.JSON({worked:"YES"});
        }

    });

    const saveRecipe = (savedRecipe)=>{
        // save the new recipe you made to the database
        let newRecipe = new RecipeModel(savedRecipe);
        newRecipe.save();
    }
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

    app.get('/get-all-recipes',(req,res)=>{
        RecipeModel.find({},(err,data)=>{
            if(err){throw err}
            res.json(data);
        })
    });

    app.get('/get-recipe/:recipeID',(req,res)=>{
        RecipeModel.findById((req.params.recipeID)).then(doc=>{
            res.json({recipe:doc})
        }).catch(err=>{
            console.log(err);
        })
    });
}


const convertStringToNumber = (object,property)=>{
    const newNumber = Number(object[property]);
    object[property] = (newNumber && newNumber>0) ? newNumber :null;
}