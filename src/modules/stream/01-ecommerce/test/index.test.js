const {expect, desc, describe } = require('@jest/globals')

const Payment = require("../src/events/payment");
const Marketing = require("../src/observers/marketing");
const Shipment = require("../src/observers/shipment");
const PaymentSubject = require("../src/subjects/paymentSubject");

describe('Test Suite for Boserver Pattern', () => {
    test('$PaymentSubject notify observers', () => {
        const subject = new PaymentSubject()
        const observer = {
            update: jest.fn()
        }
        const data = 'hello world'
        const expected = data;
        subject.subscribe(observer)
        subject.notify(data);

        expect(observer.update).toBeCalledWith(expected);
    })
    test('$PaymentSubject should not notify unsubscribed observers', () => {
        const subject = new PaymentSubject()
        const observer = {
            update: jest.fn()
        }
        const data = 'hello world'

        subject.subscribe(observer)
        subject.unsubscribe(observer)
        subject.notify(data);

        expect(observer.update).not.toHaveBeenCalled();
    })
    test('$Payment should notify subject after a credit card transaction', () => {
        const subject = new PaymentSubject();
        const payment = new Payment(subject);

        const paymentSubjectNotifierSpy = jest.spyOn(
            subject,
            subject.notify.name,
        )

        const data = { userName: 'erick', id: 3}
        payment.creditCard(data);

        expect(paymentSubjectNotifierSpy).toBeCalledWith(data);
    })
    test('$All should notify subscribers after a credit card payment', () => {
        const subject = new PaymentSubject();
        const shipment = new Shipment();
        const marketing = new Marketing();

        const shipmentUpdateFnSpy = jest.spyOn(
            shipment, shipment.update.name
        )
        const marketingUpdateFnSpy = jest.spyOn(
            marketing, marketing.update.name
        )

        subject.subscribe(shipment)
        subject.subscribe(marketing)

        const payment = new Payment(subject);
        const data = {
            id: 4,
            userName: 'mary'
        }
        payment.creditCard(data);

        expect(shipmentUpdateFnSpy).toBeCalledWith(data);
        expect(marketingUpdateFnSpy).toBeCalledWith(data);
    })
})