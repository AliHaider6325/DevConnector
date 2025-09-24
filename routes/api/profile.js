import express from 'express'
import {auth} from '../../middleware/auth.js'
import Profile from '../../models/Profile.js'
import User from '../../models/User.js';
import {check,validationResult} from 'express-validator'
import request from 'request';
import config from 'config';


const router = express.Router();

// route:POST api/profile/me
//desc:check user's profile
//access:Private

router.get('/me',auth,async(req,res)=>{
    try{
const profile = await Profile.findOne({ user: req.user.id })
  .populate('user', ['name', 'avatar']);
        if(!profile){
            return res.status(400).json({msg:'There is no profile for this user'})
        }
        res.json(profile);



    }catch(err){
        console.log(err.message);
        res.status(500).send("server error")
    }
})

// route:POST api/profile
//desc:create or update user profile
//access:Private
router.post('/',[auth,[check('status','Status is required').not().isEmpty(),
check('skills','Skills is required').not().isEmpty()
]],
async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    } 

    const{
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body;

     //Build profile object
    const profileFeilds = {};
    profileFeilds.user =req.user.id;
    if(company) profileFeilds.company = company;
    if(website) profileFeilds.website = website;
    if(location) profileFeilds.location = location;
    if(bio) profileFeilds.bio = bio;
    if(status) profileFeilds.status = status;
    if(githubusername) profileFeilds.githubusername = githubusername;
    if(skills) {
        profileFeilds.skills = skills.split(',').map(skill =>{
        return skill.trim();
    })}
    //Build social object
    profileFeilds.social={}
    if(youtube) profileFeilds.social.youtube=youtube;
    if(twitter) profileFeilds.social.twitter=twitter;
    if(facebook) profileFeilds.social.facebook=facebook;
    if(linkedin) profileFeilds.social.linkedin=linkedin;
    if(instagram) profileFeilds.social.instagram=instagram;
    try{
        let profile = await Profile.findOne({user:req.user.id})
        if(profile){
            profile = await Profile.findOneAndUpdate(
                {user:req.user.id},
                {$set:profileFeilds},
                {new:true} //.
            )
            return res.json(profile);
        }
        //Create
        profile = new Profile(profileFeilds);
        await profile.save();
        res.json(profile);
    }
    catch(err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
})


// route:Get api/profile
//desc:Get all profiles
//access:public

router.get('/',async(req,res)=>{
    try {
        const profiles = await Profile.find().populate('user', ['name','avatar']);
        if(profiles) res.json(profiles);
        else res.json("NO profile");

    } 
    catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
})


// route:Get api/profile/user/:user_id
//desc:Get profiles by user id
//access:public

router.get('/user/:user_id',async(req,res)=>{
    try {
        const profile = await Profile.findOne({user:req.params.user_id}).populate('user', ['name','avatar']);
        if(!profile) res.status(400).json({msg:"No profile found!"});
        res.json(profile);

    } 
    catch (err) {
        console.log(err.message);
        if(err.kind == 'ObjectId'){
            res.status(400).json({msg:"No profile found!"});
        }
        res.status(500).send("Server Error");
    }
})

// route:DELETE api/profile
//desc:delete profile,user & posts
//access:private

router.delete('/',auth,async(req,res)=>{
    try {
        //@todo remove user posts
        //Remove profile
        await Profile.findOneAndDelete({user:req.user.id})
        await User.findOneAndDelete({_id:req.user.id})

        res.json({msg:"User Deleted"})
 
    } 
    catch (err) {
        console.log(err.message);
        if(err.kind == 'ObjectId'){
            res.status(400).json({msg:"No profile found!"});
        }
        res.status(500).send("Server Error");
    }
})

// route:put api/profile/experience
//desc:Add profile experience
//access:private 
router.put('/experience',[auth,[
    check('title','Title is required').not().isEmpty(),
    check('company','Company is required').not().isEmpty(),
    check('from','From date is required').not().isEmpty(),
]],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    const newExp = { title, company, location, from, to, current, description };

    try {
        const profile = await Profile.findOne({user:req.user.id});
        profile.experience.unshift(newExp);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});  // ✅ Close PUT route here


// route:delete api/profile/experience/:exp_id
//desc:Delete profile experience
//access:private 
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' });
    }

    // Find index of experience to remove
    const removeIndex = profile.experience
      .map(item => item.id)
      .indexOf(req.params.exp_id);

    if (removeIndex === -1) {
      return res.status(400).json({ msg: 'Experience not found' });
    }

    // Remove experience
    profile.experience.splice(removeIndex, 1);
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// route:put api/profile/education
//desc:Add profile education
//access:private 
router.put('/education',[auth,[
    check('school','School is required').not().isEmpty(),
    check('degree','Degree date is required').not().isEmpty(),
]],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;

    const newEdu = { school,degree,fieldofstudy, from, to, current, description };

    try {
        const profile = await Profile.findOne({user:req.user.id});
        profile.education.unshift(newEdu);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});


// route:delete api/profile/education/:exp_id
//desc:Delete profile education
//access:private 
router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' });
    }

    // Find index of experience to remove
    const removeIndex = profile.education
      .map(item => item.id)
      .indexOf(req.params.edu_id);

    if (removeIndex === -1) {
      return res.status(400).json({ msg: 'Education not found' });
    }

    // Remove experience
    profile.education.splice(removeIndex, 1);
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// route:delete api/profile/github/:username
//desc:GET user repos from github
//access:public

router.get("/github/:username", (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "githubClientId"
      )}&client_secret=${config.get("githubSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };

    request(options, (error, response, body) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server error" });
      }

      if (response.statusCode !== 200) {
        return res.status(400).json({ msg: "No GitHub profile found" });
      }

      res.json(JSON.parse(body)); // ✅ Use Express res
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});




export default router;