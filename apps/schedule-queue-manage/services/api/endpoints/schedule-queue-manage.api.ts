import { environments } from "@/environments";
import { api } from "@/services/api";
import { NetSuiteError } from "@workspace/services/api";
import { useMutation, useQuery, useQueryClient } from "react-query";

interface GetDeploymentStateResponse {
    script: string
    deployment: string
    scriptType: string
    lastExecutedDate: string
    lastExecutedBy: string
    lastExecutionStatus: string
}

async function getDeploymentState(deploymentId: string){
    return api.get<GetDeploymentStateResponse>(environments.api_schedule_queue_manage, {
        scheduleQueueManager: deploymentId
    })
}

export const useGetDeploymentState = (deploymentId: string) => {
    const queryClient = useQueryClient()

    const { data, isLoading, refetch, isRefetching  } = useQuery({
        queryKey: [`get-deployment-state-${deploymentId}`],
        queryFn: () => getDeploymentState(deploymentId),
    })

    return {
        data, 
        loadingData: isLoading || isRefetching,
        refetch
    }
}

export interface RunDeploymentStateResponse {
    status: 'error' | 'success' | 'warning'
    message: string
}

interface RunDeploymentStateBody {
    scheduleQueueManager: string
}

async function runDeploymentState(body: RunDeploymentStateBody){
    return api.post<RunDeploymentStateResponse, RunDeploymentStateBody>(environments.api_schedule_queue_manage, body)
}

export const useRunDeploymentState = (deploymentId: string) => {
    const { mutate: execute, isLoading } = useMutation<RunDeploymentStateResponse, NetSuiteError, RunDeploymentStateBody>({
        mutationFn: runDeploymentState,
        mutationKey: [`run-deployment-state-${deploymentId}`],
    })

    return {
        execute,
        loading: isLoading
    }
}