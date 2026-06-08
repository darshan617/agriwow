import React from 'react'
import gardenToolBanner from '@/assets/images/gardenTool.png'
import FarmEquipments from '../farm-equipmemts/FarmEquipments'

const GardenTool = ({ gardeningToolsData, viewAllLink = "/product-category/garden-tools" }) => {
  return (
    <div>
        <FarmEquipments 
            bannerImage={gardenToolBanner}
            title="Garden Tools"
            farmEquipmentsData={gardeningToolsData}
            viewAllLink={viewAllLink}
        />
    </div>
    );
};

export default GardenTool;