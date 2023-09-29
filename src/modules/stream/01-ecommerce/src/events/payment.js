class Payment {
   constructor(subject) {
    this.paymentSubject = subject
   }

   creditCard({id ,userName, age}) {
    console.log(`\na payment ocurred from ${userName}`)
    this.paymentSubject.notify({id, userName});
   }
}

module.exports = Payment