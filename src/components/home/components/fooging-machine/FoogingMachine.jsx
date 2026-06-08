import React from 'react'
import FarmEquipments from '../farm-equipmemts/FarmEquipments'
import foogingMachineBanner from '@/assets/images/fooging-bg.png'

const FoogingMachine = ({ foogingMachineData, viewAllLink = "/product-category/fogging-machines" }) => {
  return (
    <div>
      <FarmEquipments 
        title={<span style={{ color: '#000',textShadow: 'none' }}>Fogging Machine</span>}
        bannerImage={foogingMachineBanner}
        farmEquipmentsData={foogingMachineData}
        viewAllLink={viewAllLink}
      />
    </div>
  );
};

export default FoogingMachine;