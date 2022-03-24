const PageMetaDto = require('./paginator.reponse.dto');
const TaskDto = require('./task.response.dto');

function buildPagedList(agents, page, pageSize, totalResourceCount, basePath) {
    return {
        success: true,
        page_meta: PageMetaDto.build(agents.length, page, pageSize, totalResourceCount, basePath),
        ...buildDtos(agents)
    }
}

function buildDtos(agents) {
    return {
        agents: agents.map(agent => buildDto(agent))
    }
}

function buildDto(agent) {
    return {
        id: agent.id,
        personel_first_name: agent.personel_first_name,
        personel_last_name: agent.personel_last_name,
        personel_other_name: agent.personel_other_name,
        created_at: agent.createdAt,
        updated_at: agent.updatedAt,
    }
}

module.exports = {
    buildDto, buildPagedList, buildDtos
}