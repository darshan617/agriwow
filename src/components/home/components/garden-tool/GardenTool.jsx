import React from 'react'
import gardenToolBanner from '@/assets/images/gardenTool.png'
import FarmEquipments from '../farm-equipmemts/FarmEquipments'

const GardenTool = ({ gardeningToolsData }) => {
  return (
    <div>
        <FarmEquipments 
            bannerImage={gardenToolBanner}
            title="Garden Tools"
            farmEquipmentsData={gardeningToolsData}
        />
    </div>
    );
};

export default GardenTool;