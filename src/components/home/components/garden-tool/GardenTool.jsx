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
            viewAllLink="/product-category/garden-lawn-care"
        />
    </div>
    );
};

export default GardenTool;