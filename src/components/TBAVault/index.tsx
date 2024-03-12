import VaultCard from '@/components/common/VaultCard'

const TBAVault = () => (
  <VaultCard title="props3">
    <div className="title">
      <div className="justify-center pb-1">
        <span className="card-title">
          <b>
            <span className="text-yellow">VAULT #3:</span> TBD
          </b>
        </span>
      </div>
    </div>

    <div className="body">
      <div className="pt-2" style={{ borderTop: '1px solid #fbc216' }}>
        <div className="md-8">
          <div className="row">
            <div className="pb-0">
              <span>Coming later...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </VaultCard>
)

export default TBAVault
