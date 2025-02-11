'use client'

import React, { Fragment, useCallback, useMemo, useState } from "react";

import { Form, FormProps, Separator, Skeleton } from "@workspace/ui/components";
import { useSearchParams } from "next/navigation";
import { RunDeploymentStateResponse, useGetDeploymentState, useRunDeploymentState } from "@/services/api/endpoints/schedule-queue-manage.api";
import { cn } from "@workspace/ui/lib/utils";
import { useAlert } from "@workspace/ui/hooks";

const ScheduleQueueManagePage: React.FC = () => {
  const searchParams = useSearchParams()
  const scheduleQueueManager = searchParams.get('scheduleQueueManager') ?? ''

  const [runState, setRunState] = useState<RunDeploymentStateResponse>()

  const { alert } = useAlert()
  const { data, loadingData, refetch } = useGetDeploymentState(scheduleQueueManager)
  const { execute, loading: executing } = useRunDeploymentState(scheduleQueueManager)

  const runDeployment = useCallback(() => {
    execute({scheduleQueueManager: scheduleQueueManager}, {
      onError: err => alert({
        title: err.code,
        message: [err.message]
      }),
      onSuccess(data){
        setRunState(data)
      }
    })
  }, [scheduleQueueManager])

  const refresh = useCallback(() => {
    refetch().then(() => {
      setRunState(undefined)
    })
  }, [refetch])

  const actions = useMemo<FormProps['actions']>(() => {
    return [
      {id: 'execute', label: 'Execute', onClick: runDeployment, disabled: !data},
      {id: 'refresh', label: 'Refresh', onClick: refresh, variant: 'outline', disabled: !data}
    ]
  }, [runDeployment, refresh, data])

  return (
      <div className="w-dvw h-dvh">
          <Form
              actions={actions}
              submitLabel="New"
              contentClassname="h-full"
          >
            <div className="grid grid-rows-[max-content_max-content_minmax(250px,max-content)] h-full">
              <div className="w-full">
                {!loadingData ? (
                  <section className={cn(
                    'w-full px-3 py-2 rounded-md bg-light-neutral-30',
                    'text-base text-light-neutral-190/80 font-sans',
                    'grid grid-flow-col grid-rows-[repeat(4,minmax(0,auto))] grid-cols-[repeat(2, minmax(0, max-content))] gap-y-5 gap-x-16 lg:grid-rows-[repeat(3,minmax(0,auto))] lg:grid-cols-[repeat(3, minmax(0, max-content))] lg:gap-x-24 lg:grid-flow-row',
                    'shadow-[0_0_4px_1px] shadow-light-neutral-50'
                  )}>
                    {data ? (
                      <Fragment>
                        <h2 className="font-bold col-span-2 lg:col-span-3">Deployment Details</h2>

                        <DeploymentDetailsItem label="Script" content={data.script}/>

                        <DeploymentDetailsItem label="Script Type" content={data.scriptType}/>

                        <DeploymentDetailsItem label="Deployment" content={data.deployment}/>

                        <DeploymentDetailsItem label="Last Executed By" content={data.lastExecutedBy}/>

                        <DeploymentDetailsItem label="Last Executed Date" content={data.lastExecutedDate}/>

                        <DeploymentDetailsItem label="Last Execution Status" content={data.lastExecutionStatus}/>
                      </Fragment>
                    ) : ( <h2 className=" text-center text-light-neutral-80 font-bold col-span-2 row-span-4 self-center">No details were found for deployment id {scheduleQueueManager}</h2> )}
                  </section>
                ) : <Skeleton className="w-full h-28"/>}
              </div>

              <Separator className="bg-transparent"/>

              {!loadingData && !executing ? (
              <section
                className={cn(
                  'w-full px-3 py-2 rounded-md bg-light-neutral-30',
                  'text-base text-light-neutral-190/80 font-sans',
                  'grid grid-rows-[auto_1fr] gap-y-5 gap-x-8',
                  'shadow-[0_0_4px_0px] shadow-light-brand-120',
                  {'shadow-light-success-120': runState?.status === 'success'},
                  {'shadow-light-danger-120': runState?.status === 'error'},
                  {'hidden': !data}
                )}
              >
                {/* <h2 className="font-bold">
                  Execution log:
                </h2>
                 */}
                <div className="flex flex-col justify-center items-center text-center text-lg text-light-neutral-100">
                  {!runState ? (
                  <Fragment>
                    <p className="m-0">
                      No current attempt to run this deployment. 
                    </p>

                    <p className="m-0">
                      If you want to queue this deployment, click 
                      <span className="font-bold">
                        {' '}Execute
                      </span>. 
                    </p>

                    <p className="m-0">
                      Read Deployment Details before you try to run it.
                    </p>
                  </Fragment>
                  ) : (
                    <Fragment>
                      <h3 
                        className={cn(
                          'self-stretch capitalize font-semibold',
                          {'text-light-success-120': runState.status === 'success'},
                          {'text-light-danger-120': runState.status === 'error'}
                        )}
                      >
                        {' '}{runState.status}
                      </h3>

                      <p className="m-0">{runState.message}</p>
                    </Fragment>
                  )}
                </div>
              </section>
              ) : <Skeleton />}
            </div>
          </Form>
      </div>
  )
}

interface DeploymentDetailsItemProps {
  label: string
  content: string
  className?: string
}

const DeploymentDetailsItem: React.FC<DeploymentDetailsItemProps> = ({
  label,
  content,
  className
}) => (
  <div 
    className={cn("text-xs font-semibold flex flex-col", className)}
  >
    {label}:
    
    <span 
      className="mt-1 text-sm font-normal text-light-neutral-100"
    >
      {content}
    </span>
  </div>
)

export default ScheduleQueueManagePage