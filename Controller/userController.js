var moment = require("moment");
const User = require("../models/customerSchema");






//l1
const user_index_get = (req, res) => {
    // result ==> array of objects
    User.find()
      .then((result) => {
        res.render("index", { arr: result, moment: moment });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const user_edit_get =(req, res) => {
    User.findById(req.params.id)
    .then((result) => {
      res.render("user/edit", { obj: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const user_view_get = (req, res) => {
    // result ==> object
    User.findById(req.params.id)
      .then((result) => {
        res.render("user/view", { obj: result, moment: moment });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const user_search_post = (req, res) => {
    const searchText = req.body.searchText.trim()
     User.find({$or: [
       {firseName:searchText},
       {lastName:searchText}]})
       .then((result) => {
         res.render("user/search", { arr: result });
       })
       .catch((err) => {
         console.log(err);
       });
   }

  const user_delete = (req, res) => {
    User.deleteOne({_id: req.params.id})
      .then((result) => {
        res.redirect("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const user_edit_put = (req, res) => {
  
    User.updateOne({_id: req.params.id},req.body)
    .then((result) => {
      res.redirect("/home");
      console.log(result)
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const user_add_get = (req, res) => {
    res.render("user/add");
  }

const user_add_post = (req, res) => {
    User
      .create(req.body)
      .then(() => {
        res.redirect("/home")
      })
      .catch((err) => {
        console.log(err);
      });
  }

  module.exports ={user_edit_get,
    user_index_get,
    user_view_get,
    user_search_post,
    user_delete,
    user_edit_put,
    user_add_get,
    user_add_post,}
    