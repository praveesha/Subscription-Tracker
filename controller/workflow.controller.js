import { createRequire } from 'module';
const require = createRequire(import .meta.url);
const { serve } = require('@upstash/workflow/express');

import Subscription from '../models/subscription.model.js';
import dayjs from 'dayjs';

const REMINDERS = [7, 5, 2, 1];

export const sendReminders = serve(async (context) => {
    const { subscriptionId } = context.requestPayload;
    const subscription = await fetchSubscription(context, subscriptionId);

    if (!subscription || subscription.status != 'active') return;

    const renewalDate = dayjs(subscription.renewalDate);

    //instead of the default date object in express, we're using a dayjs object to ensure that the advance date and times are taken in to consideration during the comparison
    if (renewalDate.isBefore(dayjs())) {
        console.log(`Renewal date has passed for the subscription of ID ${ subscriptionId }. Stopping the workflow.`);
        return; 
    }

    for (const daysBefore of REMINDERS) {
        const reminderDate = renewalDate.subtract(daysBefore, 'day');

        if (reminderDate.isAfter(dayjs())) {
            await sleepUntilReminder(context, `Reminder: ${ daysBefore } days before the renewal date`, reminderDate);
        }

        await triggerReminder(context, `Reminder for ${daysBefore} days before`);
    }
});

const fetchSubscription = async(context, subscriptionId) => {
    return await context.run('get subscription', async  () => {
        return Subscription.findById(subscriptionId).populate('user', 'name email');
    })
}

const sleepUntilReminder = async (context, label, date) => {
     console.log(`Sleeping until the reminder at  ${date}`);
     await context.sleepUntil(label, date.toDate());
}

const triggerReminder = async (context, label) => {
    return await context.run(label, () => {
        console.log(`Triggering ${ label } reminder`);
        //send email, push notification, sms
    })
}