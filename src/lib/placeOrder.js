import { supabase } from "@/lib/supabase";

export async function placeOrder({
  customerInfo,
  fulfillmentType,
  subtotal,
  deliveryFee,
  discountAmount,
  total,
  discount,
  items,
}) {
  // CREATE ORDER
  const { data: order, error: orderError } =
    await supabase
      .from("mm_orders")
      .insert([
        {
          customer_name: customerInfo.customer_name,
          customer_email: customerInfo.customer_email,
          customer_phone: customerInfo.customer_phone,
          delivery_address:
            customerInfo.delivery_address,
          fulfillment_type: fulfillmentType,
          subtotal,
          delivery_fee: deliveryFee,
          discount_amount: discountAmount,
          total,
          payment_method: "eft",
          payment_status: "pending",
          order_status: "received",
          referral_code_used:
            discount?.referral_code || "",
        },
      ])
      .select()
      .single();

  if (orderError) throw orderError;

  // CREATE ORDER ITEMS
  const orderItems = items.map((item) => ({
    order_id: order.id,
    product_id: item.id || null,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
  }));

  const { error: itemsError } = await supabase
    .from("mm_order_items")
    .insert(orderItems);

  if (itemsError) throw itemsError;

  return order;
}