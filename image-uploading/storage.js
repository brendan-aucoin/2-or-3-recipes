// this ended up not having much use in the production build.
// but if you were to deploy the app in a different way then this is what you would want to do.
const multer = require('multer');

// storage strategy
// how files get stored
const storage = multer.diskStorage({
    // you store files in the uploads folder on the backend side
    destination:function(req,file,cb){
        cb(null,'./uploads/')
    },
    // you want a unique filename (what if you had burger.jpg twice, you don't wanna overwrite one)
    filename:function(req,file,cb){
        // use Date.now for a unique filename
        cb(null,`${file.originalname}:${Date.now()}`);
    }
});

// you only want to accept files of type jpeg,jpg,and png
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

// 1024*1024*5 is 5mb
const upload = multer({
    storage:storage,
    limits:{
        fileSize:1024*1024*5
    },
    fileFilter:fileFilter
    
})


module.exports = upload;