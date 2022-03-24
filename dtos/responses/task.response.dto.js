const PageMetaDto = require('./paginator.reponse.dto');
const UserDto = require('./user.response.dto');
const AgentDto = require('./agent.response.dto');
const CommentsDto = require('./commets.response.dto');
const CustomersDto = require('./customer.response.dto');

function buildPagedList(tasks, page, pageSize, totalResourcesCount, basePath) {
    return {
        success: true,
        page_meta: PageMetaDto.build(tasks.length, page, pageSize, totalResourcesCount, basePath),
        ...buildDtos(tasks)
    }
}

function buildDtos(tasks) {
    return {
        tasks: tasks.map(task => buildDto(task))
    };
}

function buildDto(task) {
    return {
        id: task.id,
        title: task.title,
        assigned: task.assigned,
        task_status: task.status,
        deferred: task.deferred,
        in_progress: task.in_progress,
        complete: task.complete,
        ...CustomersDto.buildDtos(task.Customer),
        created_at: task.createdAt,
        updated_at: task.updated_at,
        comments_count: task.Comments ? task.Comments.length : task.comments_count || 0
    };
}

function buildDetails(task, includeCommentUser, includeCommentTaskSummary) {
    let task_result = buildDto(task);
    task_result.title = task.title;
    task_result.comments_count = task.comments_count;
    task_result = {...task_result, ...CommentsDto.buildDtos(task.Comments, includeCommentUser, includeCommentTaskSummary)};
    task_result = {...task_result, ...AgentDto.buildDtos(task.Agents)}
    return {
        success: true,
        ...task_result
    }
}

module.exports = {
    buildPagedList, buildDetails, buildDtos, buildDto
}