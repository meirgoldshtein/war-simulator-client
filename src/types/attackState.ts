import { IAttack } from "./attack"
import { dataStatus } from "./redux"

interface attackState {
    error: string | null
    status: dataStatus
    attacks: IAttack[] | null
}

export default attackState