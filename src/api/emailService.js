// Email service for sending order notifications

const BUSINESS_EMAIL = "miraculousmunchies1@gmail.com";
const API_URL = import.meta.env.PROD ? '/api/send-email' : 'http://localhost:3000/api/send-email';

// Format order details into email body
const formatOrderEmail = (order, customerInfo) => {
  const itemsList = order.items
    .map(item => `• ${item.quantity}x ${item.name} - R${(item.price * item.quantity).toFixed(2)}`)
    .join('\n');

  const discountInfo = order.discount_amount > 0 
    ? `\nDiscount (${order.referral_code_used}): -R${order.discount_amount.toFixed(2)}`
    : '';

  const emailBody = `
New Order Received - MM-${order.id}

CUSTOMER DETAILS:
Name: ${customerInfo.customer_name}
Email: ${customerInfo.customer_email}
Phone: ${customerInfo.customer_phone}
${customerInfo.delivery_address ? `Delivery Address: ${customerInfo.delivery_address}` : 'Collection: In-store pickup'}

ORDER ITEMS:
${itemsList}

PAYMENT SUMMARY:
Subtotal: R${order.subtotal.toFixed(2)}
Delivery Fee: R${order.delivery_fee.toFixed(2)}${discountInfo}
Total: R${order.total.toFixed(2)}

Fulfillment Type: ${order.fulfillment_type === 'delivery' ? 'Delivery' : 'Collection'}
Payment Status: ${order.payment_status}
Payment Reference: MM-${order.id}

Order Status: ${order.order_status}
Timestamp: ${new Date().toLocaleString()}
  `;

  return emailBody;
};

// Send order notification email to business
export const sendOrderNotificationEmail = async (order, customerInfo) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: BUSINESS_EMAIL,
        subject: `New Order - MM-${order.id} from ${customerInfo.customer_name}`,
        body: formatOrderEmail(order, customerInfo),
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Failed to send order notification:', error);
      return false;
    }

    console.log('✅ Order notification email sent to', BUSINESS_EMAIL);
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
};

// Send order confirmation email to customer
export const sendOrderConfirmationEmail = async (order, customerEmail) => {
  try {
    const emailBody = `
Thank you for your order!

Order Number: MM-${order.id}
Total Amount: R${order.total.toFixed(2)}

Payment Reference: MM-${order.id}

Bank Details:
Bank: FNB
Account Name: Miraculous Munchies
Account Number: 62845678901
Branch Code: 250655

Your order will be ${order.fulfillment_type === 'delivery' ? 'delivered to your address' : 'ready for collection at our store'}.

Thank you for ordering from Miraculous Munchies!
    `;

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: customerEmail,
        subject: `Order Confirmation - MM-${order.id}`,
        body: emailBody,
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Failed to send confirmation email:', error);
      return false;
    }

    console.log('✅ Order confirmation email sent to', customerEmail);
    return true;
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
    return false;
  }
};
