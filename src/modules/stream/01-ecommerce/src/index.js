const Payment = require("./events/payment");
const Marketing = require("./observers/marketing");
const Shipment = require("./observers/shipment");
const PaymentSubject = require("./subjects/paymentSubject");

const subject = new PaymentSubject();

const marketing = new Marketing();
subject.subscribe(marketing);

const shipment = new Shipment();
subject.subscribe(shipment);

const payment = new Payment(subject);
payment.creditCard({id: 1, userName: 'erick', age: 27})

subject.unsubscribe(marketing);


payment.creditCard({id: 2, userName: 'wendy', age: 30})