 class PaymentSubject {
    $observers = new Set();

    notify(data) {
        this.$observers.forEach(observer => observer.update(data))
    }

    unsubscribe(obserable) {
        this.$observers.delete(obserable)
    }

    subscribe(obserable) {
        this.$observers.add(obserable)
    }
}

module.exports = PaymentSubject