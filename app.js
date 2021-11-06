
const express = require('express');
const webPush = require('web-push');
const path = require('path');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client')));

require('dotenv').config({ path: 'variables.env' });

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webPush.setVapidDetails('mailto:test@example.com', publicVapidKey, privateVapidKey);
app.post('/subscribe', (req, res) => {
	const subscription = req.body.subscription;
	res.status(201).json({});
	const payload = JSON.stringify({
		title: '1 chút thông báo',
		name: req.body.name
	});
	webPush.sendNotification(subscription, payload);
	setTimeout(() => {
		webPush.sendNotification(subscription, payload);
		setTimeout(() => { webPush.sendNotification(subscription, payload); 
		}, 5000);
	}, 5000);
	
});
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), () => {
	console.log(`Express running → http://localhost:${app.get('port')}`);
});