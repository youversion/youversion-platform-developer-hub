import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export type PlatformMemberRole = 'Owner' | 'Developer' | 'Member';

export interface PlatformMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: PlatformMemberRole;
}

interface InviteMemberModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (member: PlatformMember) => void;
}

const InviteMemberModal: React.FC<InviteMemberModalProps> = ({ open, onOpenChange, onAdd }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<PlatformMemberRole>('Owner');
  const [saving, setSaving] = useState(false);

  const reset = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setRole('Owner');
  };

  const handleAdd = async () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim()) return;
    setSaving(true);
    try {
      const id = (globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`);
      onAdd({ id, firstName: firstName.trim(), lastName: lastName.trim(), email: email.trim(), role });
      reset();
      onOpenChange(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!saving) onOpenChange(o); }}>
      <DialogContent className="sm:max-w-[460px]">
        <DialogHeader>
          <DialogTitle>Platform Member</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={role} onValueChange={(v) => setRole(v as PlatformMemberRole)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Owner">Owner</SelectItem>
                <SelectItem value="Developer">Developer</SelectItem>
                <SelectItem value="Member">Member</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="stroked" type="button" onClick={() => onOpenChange(false)} disabled={saving}>Cancel</Button>
            <Button type="button" onClick={handleAdd} disabled={saving || !firstName || !lastName || !email}>{saving ? 'Adding...' : 'Add'}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteMemberModal;


