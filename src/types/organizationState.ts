import IOrganization from "./organization";
import { dataStatus } from "./redux";

interface organizationState {
    error: string | null;
    status: dataStatus;
    organizations: IOrganization[] | null;

}

export default organizationState