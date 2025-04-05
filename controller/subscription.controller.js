import { SERVER_URL } from "../config/env.js";
import Subscription from "../models/subscription.model.js";
import { workflowClient } from "../config/upstash.js";

export const createSubscription = async (req, res, next) => {
    try{
        const subscription = await Subscription.create({ 
            ...req.body, 
            user: req.user._id 
        });

        /*
        The 7th line assumes that u're using the auth middleware, that runs before your controller to:
        1. Verify the user's identity via a JWT token).
        2. Add a user object to the req (request) object.
        */

        //Creating the actual workflow object with the data input
        const {workflowRunId} = await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`, //workflow endpoint
            body: {
                subscriptionId: subscription.id
            },
            headers: {
                'content-type': 'application/json'
            },
            retries: 0
        })

        res.status(201).json({ success: true, data: subscription, workflowRunId });
    }
    catch (error) {
        //passes errors to the error handling middleware
        next(error);
    }
}

export const getUserSubscriptions = async (req, res, next) => {
    try{
        if (req.user.id !== req.params.id) {
            const error = new Error("You're not the owner of this account");
            error.status = 401;
            throw error;
        }

        const subscriptions = await Subscription.find({ user: req.params.id });
        
        res.status(200).json({ success: true, data: subscriptions });
    }
    catch(error){
        next(error);
    }
}