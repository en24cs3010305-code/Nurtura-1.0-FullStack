import React, { useState, useEffect } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { PageHeader } from '../../components/common/PageHeader';
import { familyService } from '../../services/familyService';
import { FamilyAccessMember } from '../../types';
import { Users, UserPlus, Trash2, Mail, Shield, CheckCircle2 } from 'lucide-react';

export const FamilyAccessPage: React.FC = () => {
  const [members, setMembers] = useState<FamilyAccessMember[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [relationship, setRelationship] = useState('Grandparent');
  const [accessType, setAccessType] = useState<'view_only' | 'daily_logging' | 'limited_caregiver'>('daily_logging');

  const loadMembers = async () => {
    const list = await familyService.getMembers();
    setMembers(list);
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    await familyService.inviteMember({
      parentId: 'user-parent-1',
      name,
      email,
      relationship,
      accessType
    });
    setModalOpen(false);
    setName('');
    setEmail('');
    loadMembers();
  };

  const handleRevoke = async (id: string) => {
    await familyService.revokeAccess(id);
    loadMembers();
  };

  const getAccessBadge = (type: FamilyAccessMember['accessType']) => {
    switch (type) {
      case 'daily_logging':
        return { label: 'Daily Activity Logging', color: 'bg-emerald-100 text-emerald-800' };
      case 'view_only':
        return { label: 'View-Only Access', color: 'bg-stone-100 text-stone-700' };
      case 'limited_caregiver':
        return { label: 'Limited Caregiver Access', color: 'bg-amber-100 text-amber-800' };
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Family & Caregiver Access"
        subtitle="Authorize family members, partners, or caregivers with granular activity tracking permissions"
        actions={
          <Button size="sm" onClick={() => setModalOpen(true)} leftIcon={<UserPlus className="w-4 h-4" />}>
            Invite Family Member
          </Button>
        }
      />

      {/* Permission Descriptions Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 space-y-2">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
            Daily Activity Logging
          </span>
          <h4 className="text-xs font-heading font-bold text-nurturaText-primary dark:text-cream-100">
            Co-Parents & Primary Guardians
          </h4>
          <p className="text-[11px] text-nurturaText-secondary leading-snug">
            Can record feedings, sleep naps, and diaper changes, as well as view all clinical growth percentiles.
          </p>
        </Card>

        <Card className="p-4 space-y-2">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 text-stone-700">
            View-Only Access
          </span>
          <h4 className="text-xs font-heading font-bold text-nurturaText-primary dark:text-cream-100">
            Grandparents & Distant Family
          </h4>
          <p className="text-[11px] text-nurturaText-secondary leading-snug">
            Can follow milestone updates, growth photos, and timeline celebrations without editing medical logs.
          </p>
        </Card>

        <Card className="p-4 space-y-2">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
            Limited Caregiver Access
          </span>
          <h4 className="text-xs font-heading font-bold text-nurturaText-primary dark:text-cream-100">
            Nannies & Babysitters
          </h4>
          <p className="text-[11px] text-nurturaText-secondary leading-snug">
            Can log daytime bottle amounts and nap wakeups during duty hours without viewing private medical history.
          </p>
        </Card>
      </div>

      {/* Authorized Members List */}
      <div className="space-y-4">
        <h3 className="text-base font-heading font-bold text-nurturaText-primary dark:text-cream-100">
          Authorized Members ({members.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {members.map((m) => {
            const badge = getAccessBadge(m.accessType);

            return (
              <Card key={m.id} className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${badge.color}`}>
                        {badge.label}
                      </span>
                      <span className="text-[10px] text-stone-400 capitalize">
                        Status: {m.status}
                      </span>
                    </div>
                    <h4 className="text-sm font-heading font-bold text-nurturaText-primary dark:text-cream-100 mt-1">
                      {m.name}
                    </h4>
                    <p className="text-xs text-nurturaText-secondary">{m.relationship} • {m.email}</p>
                  </div>

                  <button
                    onClick={() => handleRevoke(m.id)}
                    className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                    title="Revoke access"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-[11px] text-stone-400 border-t border-stone-100 dark:border-darkBg-border pt-2 flex items-center justify-between">
                  <span>Invited on: {m.invitedAt}</span>
                  <span className="text-emerald-600 font-medium">Active Authorization</span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Invite Member Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Invite Family Member or Caregiver">
        <form onSubmit={handleInvite} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="David Jenkins or Eleanor"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="family@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Relationship"
              placeholder="Partner, Grandmother, Nanny..."
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              required
            />

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-600">Access Level</label>
              <select
                value={accessType}
                onChange={(e) => setAccessType(e.target.value as any)}
                className="w-full bg-white dark:bg-darkBg-surface border border-stone-200 dark:border-darkBg-border rounded-xl text-xs py-2.5 px-3"
              >
                <option value="daily_logging">Daily Activity Logging</option>
                <option value="view_only">View-Only Access</option>
                <option value="limited_caregiver">Limited Caregiver</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" type="button" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Send Invitation Link</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
