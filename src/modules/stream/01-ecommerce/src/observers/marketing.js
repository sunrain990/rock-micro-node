class Marketing {
     /*
    its important to remember that the function [update] is responsible of
    handling his errors/exceptions

    our subject won't have any await there (or something that might block any exection)
    our subject is the engine to send data to all observers
    */

    update({id, userName}) {
        
        console.log(`[${id}]: [marketing] will send an welcome email to [${userName}]`)
    }
}
module.exports = Marketing