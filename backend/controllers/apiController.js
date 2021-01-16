const RecipeModel = require('./../Recipe');
const upload = require('./../storage.js');


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

        
        // if the user didnt include a file then just input null for the database image path
        let picture = req.file ? req.file.path : null;
        // on the database it turned \\(correct) to \(incorrect) so to fix you replace \\ with / ie: uploads\\dog.jpg => uploads/dog.jpg
        if(picture){
            picture = picture.replace("\\",'/');
        }

        // create a new object with the content from the requests body, the picture path, and the date
        const savedRecipe = {
            ...recipeContent,
            picture:picture,
            date:new Date()
        }

        console.log(savedRecipe);
        
        // save the new recipe you made to the database
        let newRecipe = new RecipeModel(savedRecipe);
        newRecipe.save();
    });


    app.get('/get-all-recipes',(req,res)=>{
        RecipeModel.find({},(err,data)=>{
            if(err){throw err}
            // console.log(data);
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


    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
      });
}


const convertStringToNumber = (object,property)=>{
    const newNumber = Number(object[property]);
    object[property] = (newNumber && newNumber>0) ? newNumber :null;
}