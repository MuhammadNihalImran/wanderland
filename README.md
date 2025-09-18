# wanderland

**set up**

Run 'npm init –y'
'npm i ejs express mongodb mongoose'
and create file 'app.js' and import express , mongoose and build simple express app
like see image on 'set up.png'

**create model and schema**
create folder "models" and file "listing.js" and write
and go mongoose docs and see on schema in virtuals and read sentax 'set'
use to set default url of image if user not enter image
and import in 'app.js'
give error like :
"import Listing from "./models/listing.js";
^^^^^^^
SyntaxError: The requested module './models/listing.js' does not provide an export named 'default'"

means you not export default like module default Listing
and If you use this mode.export so import like import {Listing}

** create dumies data **
make folder "init" and make two file "data.js" and "index.js"
generate data from chatgpt and put in data.js

** Create Route Rest Api **
import path from path

make folder "views" and also make folder "listings" and file is "index.ejs"
and also make middleware is
"""
app.set("view engine", "ejs"); # for ejs
app.set("views", path.join(\_\_dirname, "views")); # path
app.use(express.urlencoded({ extended: true })); # request parser
app.use(methodOverride("\_method"));
"""

1. get route "/listings" and send data "index.ejs"
2. show get route "/listings/:id" and send data "show.ejs"
3. "index.ejs" button "new create" and route hit "/listings/new" and render "new.ejs" file
4. post route "/listings" from hit "new.ejs" file
5. create button in "show.ejs" and get request "/listings/:id/edit" edit from and redirect to put("/listings/:id")

**styling**
also use "ejs Mate" use to create multiple plate like navebar,footer jo hr page pr hi rehga

1. run "npm i ejs-mate" aand import in app.js
2. folder "layout" in "boilerplate.ejs" file and import where you want
3. folder public , css and file style.css and also write middelwear
   "app.use(express.static(path.join(\_\_dirname, "public")));"
4. make folder "includes" in views folder and create file "navbar.ejs" and class use sticky-top
5. create footer and style
6. Listings route styling
7. create new.ejs listing style and edit.ejs style ans show.ejs style

**middeleware**
middeleware is function to use get request and work in server then respone
common middleware:
. methodOverride
. bodyParser
. express.static
. express.urlencoded
thora in middleware k bare mein batana

1. excute any code
2. make change to the req and res object
3. end the req-res cycle
4. call the next middleware
   "define":
   `app.use(path,method)`
   `next()` use

create utitliy middleware and api token as Query String
express default error handler

"Form validation"

client side validation and server side validation

1. clinet go to boostrap website on validation style add style in form `nonvalidate` and make folder in public make js and add script.js
   also add script in "boilerpalte.ejs"
2. success and failure text: `invalid-feedback` if somene not fill tha blank then give msg
3. server side make folder "utils" and file "wrapAsync.js" like try and catch
4. make also file "ExpressError.js" and write code it
5. "error.js" to show better way on ui error
6. validation schema use `npm i joi` and go "joi.dev" read docs and write in "schema.js" file and use in "app.js" make middleware funation use in post route

"mongo realtions"

1. one to many : store a refrenece to the parent documnet insie child
2. handle deletion: use query meddleware

**NEW MODEL REVIEW**

1. in model folder "review.js" file and create schema
2. create review form in "show.ejs"
3. create review route in "app.js" and show review on "show.ejs"
4. delete review mongo $pull operator : remove also user listing data
5. listing delete so all related review also delete : write code in listing.js model

**signed Cookies**

1. use cookie-parser
2. router in use merge-pramas=true
   **Express session**
   install express sessions
   **connect flash**
3. install connect-flash
4. req.local
5. also cookie to expire the session
   **authentication vs authorization**
   "passport" use for node.js
6. npm i passport passport-local passport-local-mongoose
7. passport.initialize, passport.session ,passport.use(new.localstrtegy)

#MvC
apply mvc on Listing, reviews
apply router.route

re-style review rating use link "https://github.com/LunarLogic/starability?tab=readme-ov-file"
rating.css and add css

**image upload**

1. add in new.ejs form `enctype="multipart/form-data"` and input type="file"
2. use multer library `npm i multer`
3. third party servies "cloudinary"
4. multer store cloudinary `npm i cloudinary multer-store-cloudinary`
5. create cloudConfig.js file and import in listing.js
