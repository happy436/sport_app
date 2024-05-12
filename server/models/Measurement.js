import { Schema, model } from "mongoose";

const measurementSchema = new Schema({
	height:{
        type:Number,
        require:true,
    },
	weight:{
        type:Number,
        require:true,
    },
	shoulders:{
        type:Number,
        require:true,
    },
	chest:{
        type:Number,
        require:true,
    },
	left_biceps:{
        type:Number,
        require:true,
    },
	right_biceps:{
        type:Number,
        require:true,
    },
	waist:{
        type:Number,
        require:true,
    },
	butt:{
        type:Number,
        require:true,
    },
	left_thigh:{
        type:Number,
        require:true,
    },
	right_thigh:{
        type:Number,
        require:true,
    },
	left_gastrocnemius:{
        type:Number,
        require:true,
    },
	right_gastrocnemius:{
        type:Number,
        require:true,
    },
});

const Measurement = model("Measurement", measurementSchema);
export default Measurement;
