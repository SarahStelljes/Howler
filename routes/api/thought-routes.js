const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    updateThought,
    removeReaction,
    addReaction,
    deleteThought,
    createThought
} = require('../../controllers/thought-controller');

// GET all, POST at /api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

// GET one, PUT
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought);

// DELETE thought
router
    .route('/:userId/:thoughtId')
    .delete(deleteThought);

// reactions
router
    .route('/:thoughtId/reactions')
    .put(addReaction);

// reaction deletetion
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;