const webpush = require('web-push');

(async () => {

  webpush.setGCMAPIKey(process.env.FIREBASE_SERVER_API_KEY);
  webpush.setVapidDetails(
    `mailto:${process.env.EMAIL_FOR_SUBJECT}`,
    process.env.FIREBASE_WEB_PUSH_PUBLIC_VAPID_KEY,
    process.env.FIREBASE_WEB_PUSH_PRIVATE_VAPID_KEY
  );

  // This is the output of calling JSON.stringify on a PushSubscription you receive on your client
  // Copy paste the console log of push subscription from the receiver client here
  const pushSubscription = {
    endpoint: '...',
    keys: {
      auth: '...',
      p256dh: '...'
    }
  };

  const notificationPayload = {
    notification: {
      title: 'Session is about the start 🏃‍♀️',
      body: '"Community Interaction" by Gino Giraffe is starting in Hall 3.',
      icon: 'assets/pwa/manifest-icon-192.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
      },
      actions: []
    }
  };

  try {
    // Send the push notification
    await webpush.sendNotification(pushSubscription, JSON.stringify(notificationPayload));
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }

})();
