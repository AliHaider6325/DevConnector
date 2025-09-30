import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    text:{
        type:String,
        require:true
    },
    name:{
        type:String
    },
    avatar:{
        type:String
    },
    likes:[
        {
            user:{
                type:Schema.Types.ObjectId,
                ref:'users'
            }
        }
    ],
    comments:[
        {
            user:{
                type:Schema.Types.ObjectId,
                ref:'users'
            },
            text:{
                type:String,
                requred:true
            },
             name:{
                type:String
                },
            avatar:{
                type:String
            },
            date:{
                type:Date,
                default:Date.now
            }

        }
    ],
    date:{
        type:Date,
        default:Date.now
    }
})

export default mongoose.model("post", postSchema);
