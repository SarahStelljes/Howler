const { Schema, model, Types } = require('mongoose');

const validateEmail = function(email) {
    // used regexr to test this out with mutliple examples from https://en.wikipedia.org/wiki/Email_address#Local-part
    var re = /^((\S[^@])*|\w+)(\w+|\-|\-\w+)*@((\w+(\-*\w){1})|\w+)+\.\w{2,}?$/;
    return re.test(email)
};

const UserSchema = new Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [validateEmail, 'Please fill a valid email address'],
            match: [/^((\S[^@])*|\w+)(\w+|\-|\-\w+)*@((\w+(\-*\w){1})|\w+)+\.\w{2,}?$/, 'Please fill a valid email address']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

// get total count of friends
UserSchema.virtual('friendCount').get(function(){
    return this.friends.reduce(total);
});

// create user model using schema
const User = model('User', UserSchema);

// export model
module.exports = User;