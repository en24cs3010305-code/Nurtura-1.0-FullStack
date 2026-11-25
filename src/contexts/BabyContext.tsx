import React, { createContext, useContext, useState, useEffect } from 'react';
import { Baby } from '../types';
import { babyService } from '../services/babyService';

interface BabyContextType {
  babies: Baby[];
  selectedBaby: Baby | null;
  setSelectedBabyId: (id: string) => void;
  refreshBabies: () => Promise<void>;
  addNewBaby: (babyData: Omit<Baby, 'id'>) => Promise<Baby>;
  updateCurrentBaby: (updates: Partial<Baby>) => Promise<void>;
  deleteBabyProfile: (id: string) => Promise<void>;
}

const BabyContext = createContext<BabyContextType | undefined>(undefined);

export const BabyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [babies, setBabies] = useState<Baby[]>([]);
  const [selectedBabyId, setSelectedBabyIdState] = useState<string>('');

  const loadBabies = async () => {
    const list = await babyService.getBabies();
    setBabies(list);
    if (list.length > 0 && !selectedBabyId) {
      setSelectedBabyIdState(list[0].id);
    }
  };

  useEffect(() => {
    loadBabies();
  }, []);

  const setSelectedBabyId = (id: string) => {
    setSelectedBabyIdState(id);
  };

  const selectedBaby = babies.find((b) => b.id === selectedBabyId) || (babies.length > 0 ? babies[0] : null);

  const addNewBaby = async (data: Omit<Baby, 'id'>) => {
    const created = await babyService.createBaby(data);
    await loadBabies();
    setSelectedBabyIdState(created.id);
    return created;
  };

  const updateCurrentBaby = async (updates: Partial<Baby>) => {
    if (!selectedBaby) return;
    const updated = await babyService.updateBaby(selectedBaby.id, updates);
    setBabies((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
  };

  const deleteBabyProfile = async (id: string) => {
    await babyService.deleteBaby(id);
    await loadBabies();
  };

  return (
    <BabyContext.Provider
      value={{
        babies,
        selectedBaby,
        setSelectedBabyId,
        refreshBabies: loadBabies,
        addNewBaby,
        updateCurrentBaby,
        deleteBabyProfile
      }}
    >
      {children}
    </BabyContext.Provider>
  );
};

export const useBaby = () => {
  const context = useContext(BabyContext);
  if (!context) throw new Error('useBaby must be used within a BabyProvider');
  return context;
};
