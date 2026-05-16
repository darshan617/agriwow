import React from 'react'
import FarmEquipments from '../farm-equipmemts/FarmEquipments'
import foogingMachineBanner from '@/assets/images/fooging-bg.png'
import styles from '@/components/home/components/fooging-machine/FoogingMachine.module.css'

const FoogingMachine = () => {
  return (
    <div>
      <FarmEquipments 
        title={<span style={{ color: '#000',textShadow: 'none' }}>Fogging Machine</span>}
        bannerImage={foogingMachineBanner}className={styles.foogingMachineBannerBg}
        equipmentImage={null}
      />
    </div>
  );
};

export default FoogingMachine;