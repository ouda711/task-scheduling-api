exports.buildSimpleSuccess = () => {
    return {success: true}
};

exports.buildSimpleSuccessWithMessages = (messages) => {
    let response = {success: true};
    if (typeof messages === "string")
        response.full_messages = [messages];
    else if (messages instanceof Array)
        response.full_messages = messages;
    else if (messages instanceof Object)
        response.full_messages = Object.values(messages)

    return response;
};

exports.buildWithErrorMessages = (messages) => {
    let response = { success: false };
    response.errors = [];

    if(typeof messages === "string")
        response.full_messages = [messages];
    else if(messages instanceof Array)
        response.full_messages = messages;
    else if(messages instanceof Object){
        response.errors = messages;
        response.full_messages = Object.values(messages);
    }
    return response;
}

function populateResponseWithMessages(response, success, messages) {
    if (response === null)
        response = {};

    response.success = !!success;

    if (typeof messages === "string")
        response.full_messages = [messages];
    else if (messages instanceof Array)
        response.full_messages = messages;
    else if (messages instanceof Object)
        response.full_messages = Object.values(messages);

    return response;
}

exports.buildWithDtoAndMessages = (dto, messages) => {
    return populateResponseWithMessages(dto, true, messages);
};

exports.buildSuccessWithDto = (dto) => {
    return populateResponseWithMessages(dto, true, null);
};
exports.buildSimpleSuccess = () => {
    return {success: true}
};