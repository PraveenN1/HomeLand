import express, { application } from 'express';
import { _response } from './responseModel.js';

const router = express.Router();

//Route to save the responses from the customer
router.post("/:id", async(req, res) => {
    const {id}=req.params;
    try{
        if(!req.body.name || !req.body.phone || !req.body.email){
            return res.status(400).send('Missing Fields');
        }
        const newResponse={
            id:id,
            name:req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            message:req.body.message,
        };
        const __response = await _response.create(newResponse);
        return res.status(201).send(__response);
    }
    catch{(error)=>console.log(error)}
    res.status(500).send(error);
})

router.post('/signup',(req,res)=>{
    User.create(req.body)
    .then(data=>res.json(data))
    .catch(err=>res.json(err))
})

router

export default router;