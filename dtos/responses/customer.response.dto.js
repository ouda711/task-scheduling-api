function buildDtos(customer) {
    if(customer == null)
        return {};
    return {
        customer : {
            id: customer.id,
            first_name: customer.first_name,
            middle_name: customer.middle_name,
            last_name: customer.last_name,
            phone_number: customer.phone_number,
            gender: customer.gender,
            age: customer.age,
            access_code: customer.access_code,
            registration: customer.registration
        }
    }
}

module.exports = {
    buildDtos
}