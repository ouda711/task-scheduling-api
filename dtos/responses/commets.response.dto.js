const UserDto = require('./user.response.dto');
const PageMetaDto = require('./paginator.reponse.dto');

function buildPagedList(comments, page, pageSize, totalCommentsCount, basePath, includeUser = false, includeTask = false) {
    return {
        success: true,
        page_meta: PageMetaDto.build(comments.length, page, pageSize, totalCommentsCount, basePath),
        ...buildDtos(comments, includeUser, includeTask)
    }
}

function buildDtos(comments, includeUser = false, includeTask = false) {
    if (comments == null)
        return {comments: []};
    return {
        comments: comments.map(comment => buildDto(comment, includeUser, includeTask))
    };
}

function buildDto(comment, includeUser = false, includeTask = false) {
    const summary = {
        id: comment.id,
        content: comment.content,
    };

    if(includeTask && comment.task){
        summary.task = {
            id: comment.task.id,
            name: comment.task.title,
        }
    }

    if(includeUser && comment.user){
        summary.user = UserDto.buildOnlyForIdAndPhone(comment.user);
    }

    return summary;
}

function buildDetails(comment, includeUser = false, includeTask = false) {
    return {
        success: true,
        ...buildDto(comment, includeUser, includeTask),
        created_at: comment.createdAt,
        updatedAt: comment.updatedAt
    }
}


module.exports = {
    buildDtos, buildDto, buildDetails, buildPagedList
}