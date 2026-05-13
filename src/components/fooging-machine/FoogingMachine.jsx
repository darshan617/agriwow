import React from 'react'
import FarmEquipments from '../farm-equipmemts/FarmEquipments'
import foogingMachineBanner from '@/assets/images/fooging-bg.png'
import styles from '@/components/fooging-machine/FoogingMachine.module.css'
import foogingMachineEquip from '@/assets/images/fooging-eqip.png'

const FoogingMachine = () => {
  return (
    <div>
      <FarmEquipments 
        title={<span style={{ color: '#000',textShadow: 'none' }}>Fogging Machine</span>}
        bannerImage={foogingMachineBanner}
        equipmentImage={null}
        leftImage={foogingMachineEquip}
        leftAlt="Fogging machine equipment"
        leftImageClassName={styles.foogingMachineEquip}
      />
    </div>
  );
};

export default FoogingMachine;