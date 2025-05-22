import type { RenderArgsType } from '@bandit-network/react'
import { Campaign } from '@bandit-network/react'

import React from 'react'

import Card from '@/components/common/Card'

import { Segment } from '../Segment'

const CustomCampaign = ({ campaignId, onAction }: { campaignId: number; onAction: () => void }) => {
  return (
    <Card className="w-full !pb-10">
      <Campaign
        campaignId={campaignId}
        key={campaignId}
        render={(args: RenderArgsType) => {
          const { isLoading, campaign, openApp } = args

          if (isLoading) return <div>Loading...</div>
          return (
            <div>
              <div className="mt-2 flex items-center justify-between md:items-end">
                <h1 className="text-2xl text-primary">{campaign.profile?.name}</h1>
                <p className="text-offWhite">
                  HODLers: {campaign.participantsCount ? campaign.participantsCount : '0'}
                </p>
              </div>
              <p className="mb-6 text-center text-xs text-offWhite md:text-left">{campaign.profile?.description}</p>
              {campaign &&
                campaign?.segments.map(({ id, actions }) => (
                  <Segment
                    key={id}
                    actions={actions}
                    openApp={openApp}
                    onActionComplete={onAction} // Notify parent of action completion
                  />
                ))}
            </div>
          )
        }}
      />
    </Card>
  )
}

export default CustomCampaign
