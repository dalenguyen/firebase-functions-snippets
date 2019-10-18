const request = require('request-promise');
const moment = require('moment');

exports.orderPizza = functions.https.onRequest((request, response) => {
  const order = request.order; // The order of the user.
  return orderReceived(order);
});

// Sends a welcome email to the given user.
async function orderReceived(order) {

  await orderToSlack(`
    ===========================
    Order No. ${order.orderId}
    Created at: ${moment.unix(order.created_at).format('MM/DD/YYYY HH:MM')}
    ***************************
    Product: ${order.product}
    Quantity: ${order.qty}
    SKU: ${order.sku}
    ---------------------------
    Comments: ${order.ingredients}
    ***************************
    Price: $${order.price}
    Discount: $${order.discount}
    ---------------------------
    Total: $${order.total}
    ***************************
    Name: ${order.name}
    E-mail: ${order.email}
    Delivery to: ${order.address}
    ===========================
  `);
  return null;

}

// Helper function that posts notifications to Slack
function orderToSlack(slackMessage) {

  return request({
    method: 'POST',
    uri: slackWebhook,
    body: {
    text: slackMessage,
    channel: '#orders',
    username: `Daniel`,
    icon_emoji: ':pizza:'
    },
    json: true
  });

}