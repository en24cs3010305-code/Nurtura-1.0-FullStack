import React, { useState } from 'react';
import { useBaby } from '../../contexts/BabyContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { PageHeader } from '../../components/common/PageHeader';
import { Baby } from '../../types';
import {
  Baby as BabyIcon,
  Plus,
  Edit2,
  Calendar,
  Scale,
  Ruler,
  AlertTriangle,
  Phone,
  Shield,
  Heart,
  CheckCircle2,
  Trash2
} from 'lucide-react';

export const MyBabiesPage: React.FC = () => {
  const { babies, selectedBaby, setSelectedBabyId, addNewBaby, updateCurrentBaby, deleteBabyProfile } = useBaby();

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingBaby, setEditingBaby] = useState<Baby | null>(null);

  // Add form fields
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [dob, setDob] = useState('2026-05-15');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [birthWeight, setBirthWeight] = useState('3.3');
  const [birthHeight, setBirthHeight] = useState('50');
  const [headCirc, setHeadCirc] = useState('35');
  const [allergies, setAllergies] = useState('None');
  const [emergencyPhone, setEmergencyPhone] = useState('+1 (555) 987-6543');

  const handleCreateBaby = async (e: React.FormEvent) => {
    e.preventDefault();
    await addNewBaby({
      parentId: 'user-parent-1',
      name,
      gender,
      dateOfBirth: dob,
      ageText: 'Newborn',
      bloodGroup,
      birthWeightKg: Number(birthWeight),
      birthHeightCm: Number(birthHeight),
      headCircumferenceCm: Number(headCirc),
      currentWeightKg: Number(birthWeight),
      currentHeightCm: Number(birthHeight),
      allergies: allergies.split(',').map((s) => s.trim()),
      medicalHistory: [],
      avatarUrl: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=256',
      emergencyContact: {
        name: 'Parent Emergency',
        relationship: 'Parent',
        phone: emergencyPhone
      }
    });
    setAddModalOpen(false);
    setName('');
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBaby) return;
    await updateCurrentBaby({
      name: editingBaby.name,
      currentWeightKg: editingBaby.currentWeightKg,
      currentHeightCm: editingBaby.currentHeightCm
    });
    setEditModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="My Babies"
        subtitle="Manage and switch infant profiles, birth records, and emergency health details."
        actions={
          <Button size="sm" onClick={() => setAddModalOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
            Add Baby Profile
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {babies.map((baby) => {
          const isSelected = selectedBaby?.id === baby.id;
          return (
            <Card
              key={baby.id}
              className={`space-y-6 relative border-2 transition-all ${
                isSelected
                  ? 'border-sage-500 shadow-medium ring-2 ring-sage-400/20'
                  : 'border-transparent hover:border-stone-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={baby.avatarUrl || 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=256'}
                    alt={baby.name}
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-sage-300"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-heading font-bold text-nurturaText-primary dark:text-cream-100">
                        {baby.name}
                      </h3>
                      {isSelected && (
                        <span className="px-2 py-0.5 rounded-full bg-sage-100 text-sage-800 text-[10px] font-bold border border-sage-300">
                          Active Profile
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-nurturaText-secondary">
                      {baby.ageText} • Born {baby.dateOfBirth}
                    </p>
                    <p className="text-[11px] font-mono text-stone-400 mt-0.5">
                      Blood Group: {baby.bloodGroup} • Gender: {baby.gender}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      setEditingBaby(baby);
                      setEditModalOpen(true);
                    }}
                    className="p-2 rounded-xl text-stone-400 hover:text-sage-600 hover:bg-sage-50 transition-colors"
                    title="Edit baby details"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  {babies.length > 1 && (
                    <button
                      onClick={async () => {
                        if (window.confirm(`Are you sure you want to remove ${baby.name}'s profile?`)) {
                          await deleteBabyProfile(baby.id);
                        }
                      }}
                      className="p-2 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete profile"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-3 p-3 rounded-2xl bg-stone-50 dark:bg-darkBg-surface border border-stone-100 dark:border-darkBg-border text-center text-xs">
                <div>
                  <span className="text-[10px] text-stone-400 block">Current Weight</span>
                  <span className="font-heading font-bold text-nurturaText-primary dark:text-cream-100">
                    {baby.currentWeightKg} kg
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block">Current Length</span>
                  <span className="font-heading font-bold text-nurturaText-primary dark:text-cream-100">
                    {baby.currentHeightCm} cm
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block">Birth Weight</span>
                  <span className="font-heading font-bold text-nurturaText-primary dark:text-cream-100">
                    {baby.birthWeightKg} kg
                  </span>
                </div>
              </div>

              {/* Allergies & Medical History */}
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2 text-stone-600 dark:text-stone-300">
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Allergies: </span>
                    <span>{baby.allergies.join(', ') || 'None identified'}</span>
                  </div>
                </div>

                {baby.medicalHistory.length > 0 && (
                  <div className="flex items-start gap-2 text-stone-600 dark:text-stone-300">
                    <Shield className="w-4 h-4 text-sage-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold">Medical History: </span>
                      <span>{baby.medicalHistory.join(', ')}</span>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-2 text-stone-600 dark:text-stone-300">
                  <Phone className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Emergency Contact: </span>
                    <span>{baby.emergencyContact.name} ({baby.emergencyContact.phone})</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-2 border-t border-stone-100 dark:border-darkBg-border flex justify-between items-center">
                <span className="text-[11px] text-stone-400">Pediatrician: {baby.pediatricianName || 'Dr. Sharma'}</span>
                {!isSelected ? (
                  <Button size="sm" variant="soft" onClick={() => setSelectedBabyId(baby.id)}>
                    Switch to this Profile
                  </Button>
                ) : (
                  <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Selected in Dashboard
                  </span>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Add Baby Modal */}
      <Modal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} title="Add Baby Profile" maxWidth="lg">
        <form onSubmit={handleCreateBaby} className="space-y-4">
          <Input
            label="Baby's Full Name"
            placeholder="Aarav Sharma"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-600">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full bg-white dark:bg-darkBg-surface border border-stone-200 dark:border-darkBg-border rounded-xl text-sm py-2.5 px-3"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <Input
              label="Date of Birth"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Input
              label="Birth Weight (kg)"
              type="number"
              step="0.01"
              value={birthWeight}
              onChange={(e) => setBirthWeight(e.target.value)}
              required
            />
            <Input
              label="Birth Length (cm)"
              type="number"
              step="0.1"
              value={birthHeight}
              onChange={(e) => setBirthHeight(e.target.value)}
              required
            />
            <Input
              label="Head Circ (cm)"
              type="number"
              step="0.1"
              value={headCirc}
              onChange={(e) => setHeadCirc(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Blood Group"
              placeholder="O+, A+, etc."
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
            />
            <Input
              label="Known Allergies"
              placeholder="None or peanuts, dairy..."
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
            />
          </div>

          <Input
            label="Emergency Contact Phone"
            placeholder="+1 (555) 987-6543"
            value={emergencyPhone}
            onChange={(e) => setEmergencyPhone(e.target.value)}
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" type="button" onClick={() => setAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Baby Record</Button>
          </div>
        </form>
      </Modal>

      {/* Edit Baby Modal */}
      {editingBaby && (
        <Modal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} title={`Edit ${editingBaby.name}`}>
          <form onSubmit={handleSaveEdit} className="space-y-4">
            <Input
              label="Baby's Name"
              value={editingBaby.name}
              onChange={(e) => setEditingBaby({ ...editingBaby, name: e.target.value })}
              required
            />
            <Input
              label="Current Weight (kg)"
              type="number"
              step="0.01"
              value={editingBaby.currentWeightKg}
              onChange={(e) => setEditingBaby({ ...editingBaby, currentWeightKg: Number(e.target.value) })}
              required
            />
            <Input
              label="Current Length (cm)"
              type="number"
              step="0.1"
              value={editingBaby.currentHeightCm}
              onChange={(e) => setEditingBaby({ ...editingBaby, currentHeightCm: Number(e.target.value) })}
              required
            />
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="ghost" type="button" onClick={() => setEditModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Updates</Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
