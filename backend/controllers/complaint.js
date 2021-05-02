const Complaint = require('../models/complaint')
const ROLE = require('../role')
const canViewComplaint = require('../permissions/complaint')


// get all the complaints from the database
const getAll = async (req, res) => {

    const tempUser = {};
  
    if(req.user.role !== ROLE.ADMIN){
      tempUser['userId'] = req.user._id;
    }
    
    res.json(await Complaint.find(tempUser).select('title description status userId'))
  };

// create a new complaint
const create = (req, res) => {
  
    const complaint = new Complaint({
        title: req.body.title,
        description: req.body.description,
        status: 'pending',
        userId: req.user._id
    });
    
    complaint.validate(err=>{
      if(err){
        res.status(400).json(err)
      }else{
        complaint.save()
        .then(result => {
            res.status(201).json({ 
                message: "Created user successfully",
                result: result
            })
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
          });
      }
    })
};

// get one complaint from the database
const getOne = (req, res) => {
    Complaint.findById(req.params.complaintId, function (err, comp) {

      if (err){
        res.status(404).json({err: err})
      }else if (!canViewComplaint(req.user, comp.userId)) {
        res.status(403)
        return res.json({err: 'Not Allowed'})
      }
      else{
        res.json({
          title: comp.title,
          description: comp.description,
          status: comp.status,
          userId: comp.userId
        })
      }
  })
  };

// edit one complaint from the database
const edit = (req, res) => {
    Complaint.findByIdAndUpdate(req.params.complaintId,{status: req.body.status}, {new: true, runValidators: true}, function(err, result){
      if(err){
          res.json({err: err})
      }
      else{
          res.json({result: `Successfully updated the status to ${req.body.status}`})
      }
  })
  };

module.exports = {
    getAll,
    create,
    getOne,
    edit
}