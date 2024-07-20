import { requestPayment } from "@portone/browser-sdk/v2";
import { v4 } from 'uuid';
import { writePaymentResult } from './firebase';

export async function productsPayment(products, form, price) {
  const paymentId = v4();
  const orderName = `${form.senderName}님의 ${products[0].name}${products.length > 1 ? ` 외 ${products.length-1}개` : ''}`
  const response = await requestPayment({
    storeId: process.env.REACT_APP_PORTONE_STORE_ID,
    channelKey: process.env.REACT_APP_PORTONE_CHANNEL_KEY,
    paymentId,
    orderName,
    totalAmount: price,
    currency: 'CURRENCY_KRW',
    payMethod: "CARD",
  })

  if (response.code != null) return alert(response.message);

  // 테스트용 검증코드 나중에 백엔드로!!
  const paymentResponse = await fetch(
    `https://api.portone.io/payments/${paymentId}`,
    { headers: 
      { Authorization: `PortOne ${process.env.REACT_APP_PORTONE_API_SECRET}` } 
    },
  );

  if (!paymentResponse.ok) throw new Error(`paymentResponse: ${await paymentResponse.json()}`);
  await writePaymentResult({paymentId, userInfo: form, products });
  return true;
}