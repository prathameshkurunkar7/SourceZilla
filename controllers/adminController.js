const express = require('express');
const mongoose = require('mongoose');
const HttpError = require('../models/http-error');
const Post = mongoose.model('Post');
const Categories = mongoose.model('Categories');
const User = mongoose.model('User');
const PrivateGroups = mongoose.model('PrivateGroup');
const Companies = mongoose.model('Company');
const Experiences = mongoose.model('InterviewExperience');

const { deleteFile } = require('../models/db');
const authenticate = require('../middlewares/authenticate');
const restricted = require('../middlewares/restricted');

const router = express.Router();

router.get('/spamposts', authenticate, restricted, async (req, res, next) => {

    let spamPosts;
    try {
        spamPosts = await Post.aggregate([{ $match: { spamFlag: true } }]);
    } catch (err) {
        const error = new HttpError('Could not find any Spam posts', 500);
        return next(error);
    }

    res.status(200).json({ spamPosts });

});

//
router.get('/spamexperiences', authenticate, restricted, async (req, res, next) => {

    let spamExperience;
    try {
        spamExperience = await Experiences.aggregate([{ $match: { spamFlag: true } }]);
    } catch (err) {
        const error = new HttpError('Could not find any Spam Experience', 500);
        return next(error);
    }

    res.status(200).json({ spamExperience });

});

router.get('/spamcategories', authenticate, restricted, async (req, res, next) => {

    let spamcategories;
    try {
        spamcategories = await Categories.aggregate([{ $match: { spamFlag: true } }]);
    } catch (err) {
        const error = new HttpError('Could not find any Spam categories', 500);
        return next(error);
    }

    res.status(200).json({ spamcategories });
});

//
router.get('/spamcompanies', authenticate, restricted, async (req, res, next) => {

    let spamCompany;
    try {
        spamCompany = await Companies.aggregate([{ $match: { spamFlag: true } }]);
    } catch (err) {
        const error = new HttpError('Could not find any Spam Compnay', 500);
        return next(error);
    }

    res.status(200).json({ spamCompany });
});

router.patch('/revivepost', authenticate, restricted, async (req, res, next) => {

    const { postId } = req.body;

    try {
        await Post.findByIdAndUpdate(postId, { spamFlag: false, $set: { "reports": [] } });
    } catch (err) {
        const error = new HttpError('Could Not Revive the Spam Post', 500);
        return next(error);
    }

    res.status(201).json({ 'message': 'The Post has been unmarked from spam content.' })

});

//
router.patch('/reviveexperience', authenticate, restricted, async (req, res, next) => {

    const { experienceId } = req.body;

    try {
        await Experiences.findByIdAndUpdate(experienceId, { spamFlag: false, $set: { "reports": [] } });
    } catch (err) {
        const error = new HttpError('Could Not Revive the Spam experience', 500);
        return next(error);
    }

    res.status(201).json({ 'message': 'The experience has been unmarked from spam content.' })

});

router.delete('/deletepost/:postId', authenticate, restricted, async (req, res, next) => {

    const { postId } = req.params;

    let spampost;
    try {
        spampost = await Post.findByIdAndDelete(postId);
    } catch (err) {
        const error = new HttpError('Could Not Delete the post', 500);
        return next(error);
    }


    if (spampost.uploads) {
        deleteFile(next, spampost.uploads)
    }

    try {
        await User.findByIdAndUpdate(spampost.postBy, { $pull: { myPosts: spampost._id } });
    } catch (err) {
        const error = new HttpError('Could not Delete the post from User', 500);
        return next(error);
    }

    if (spampost.accessibility === 'private') {
        try {
            await PrivateGroups.findByIdAndUpdate(spampost.privateGroup, { $pull: { posts: spampost._id } });
        } catch (err) {
            const error = new HttpError('Could not Delete the post from Categories', 500);
            return next(error);
        }
    }
    else {
        try {
            await Categories.findByIdAndUpdate(spampost.category, { $pull: { posts: spampost._id } });
        } catch (err) {
            const error = new HttpError('Could not Delete the post from Categories', 500);
            return next(error);
        }
    }

    res.status(200).json({ 'message': 'Post is deleted successfully' });
});

//
// router.delete('/deleteexperience/:experienceId', authenticate, restricted, async (req, res, next) => {

//     const { experienceId } = req.params;

//     let spamExperience;
//     try {
//         spamExperience = await Experiences.findByIdAndDelete(experienceId);
//     } catch (err) {
//         const error = new HttpError('Could Not Delete the post', 500);
//         return next(error);
//     }


//     if (spamExperience.uploads) {
//         deleteFile(next, spamExperience.uploads)
//     }

//     try {
//         await User.findByIdAndUpdate(spamExperience.interviewExperienceBy, { $pull: { myInterviewExperience: spamExperience._id } });
//     } catch (err) {
//         const error = new HttpError('Could not Delete the Experience from User', 500);
//         return next(error);
//     }

//     try {
//         await Companies.findByIdAndUpdate(spamExperience.company, { $pull: { interviewExperience: spamExperience._id } });
//     } catch (err) {
//         const error = new HttpError('Could not Delete the Experience from Company', 500);
//         return next(error);
//     }

//     res.status(200).json({ 'message': 'interview Experience is deleted successfully' });
// });

router.patch('/revivecategory', authenticate, restricted, async (req, res, next) => {

    const { categoryId } = req.body;

    try {
        await Categories.findByIdAndUpdate(categoryId, { spamFlag: false, $set: { "reports": [] } });
    } catch (err) {
        const error = new HttpError('Could Not Revive the Spam category', 500);
        console.log(err);
        return next(error);
    }

    res.status(201).json({ 'message': 'The category has been unmarked from spam content.' })

});

//
router.patch('/revivecompany', authenticate, restricted, async (req, res, next) => {

    const { companyId } = req.body;

    try {
        await Companies.findByIdAndUpdate(companyId, { spamFlag: false, $set: { "reports": [] } });
    } catch (err) {
        const error = new HttpError('Could Not Revive the Spam company', 500);
        console.log(err);
        return next(error);
    }

    res.status(201).json({ 'message': 'The company has been unmarked from spam content.' })

});

router.delete('/deletecategory/:categoryId', authenticate, restricted, async (req, res, next) => {

    const { categoryId } = req.params;

    let spamcategory;

    try {
        spamcategory = await Categories.findByIdAndDelete(categoryId);
    } catch (err) {
        const error = new HttpError('Could Not Delete the Category', 500);
        return next(error);
    }

    let spamposts;

    try {
        spamposts = await Post.find({ '_id': { $in: spamcategory.posts } })
    } catch (err) {
        const error = new HttpError('Unrecognized Error', 500);
        return next(error);
    }

    let users;
    try {
        users = await User.find({});
    } catch (err) {
        const error = new HttpError('Unrecognized Error', 500);
        return next(error);
    }

    await Promise.all(users.map(async (user) => {
        if (user.categoriesFollowed.includes(categoryId)) {
            try {
                await User.findByIdAndUpdate(user._id, { $pull: { categoriesFollowed: categoryId } });
            } catch (err) {
                const error = new HttpError('Encountered some error while deleting category');
                return next(error);
            }
        }
    }))

    await Promise.all(spamposts.map(async (spampost) => {
        await deleteFile(next, spampost.uploads);
        await deletePostFromUser(next, spampost.postBy, spampost._id);
    }))

    try {
        await Post.remove({ _id: { $in: spamcategory.posts } })
    } catch (err) {
        const error = new HttpError('Could Not Delete posts from Posts collection', 500);
        return next(error);
    }

    res.status(200).json({ 'message': 'All deletions successful' });
});

//
router.delete('/deleteexperience/:companyId', authenticate, restricted, async (req, res, next) => {

    const { companyId } = req.params;

    let spamCompnay;

    try {
        spamCompnay = await Companies.findByIdAndDelete(companyId);
    } catch (err) {
        const error = new HttpError('Could Not Delete the company', 500);
        return next(error);
    }

    let spamExperiences;

    try {
        spamExperiences = await Experiences.find({ '_id': { $in: spamCompnay.interviewExperience } })
    } catch (err) {
        const error = new HttpError('Unrecognized Error', 500);
        return next(error);
    }

    let users;
    try {
        users = await User.find({});
    } catch (err) {
        const error = new HttpError('Unrecognized Error', 500);
        return next(error);
    }

    await Promise.all(spamExperiences.map(async (spamExperience) => {
        await deleteFile(next, spamExperience.uploads);
        await deleteExperienceFromUser(next, spamExperience.interviewExperienceBy, spamExperience._id);
    }))

    try {
        await Experiences.remove({ _id: { $in: spamCompnay.interviewExperience } })
    } catch (err) {
        const error = new HttpError('Could Not Delete interview Experience from Posts collection', 500);
        return next(error);
    }

    res.status(200).json({ 'message': 'All deletions successful' });
});


//function call in /deletecategory
async function deletePostFromUser(next, userId, postId) {
    try {
        await User.findByIdAndUpdate(userId, { $pull: { myPosts: postId } });
    } catch (err) {
        const error = new HttpError(`Could not delete posts from User's posts`, 500)
        return next(error);
    }
}

//
async function deleteExperienceFromUser(next, userId, experienceId) {
    try {
        await User.findByIdAndUpdate(userId, { $pull: { myInterviewExperience: experienceId } });
    } catch (err) {
        const error = new HttpError(`Could not delete interview experience from User's experiences`, 500)
        return next(error);
    }
}


module.exports = router;