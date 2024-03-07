import service from "../utils/request"

export function RankList() {
    return service({
        url: '/rank/list',
        method: 'get',
    })
}