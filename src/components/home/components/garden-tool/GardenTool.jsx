import React from 'react'
import gardenToolBanner from '@/assets/images/gardenTool.png'
import FarmEquipments from '../farm-equipmemts/FarmEquipments'

const GardenTool = () => {
  return (
    <div>
        <FarmEquipments 
        bannerImage={gardenToolBanner}
        title="Garden Tools"
        equipmentImage={null}

        />
    </div>
  )
}

export default GardenTool