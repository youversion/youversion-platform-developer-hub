import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import InviteMemberModal, { PlatformMember, PlatformMemberRole } from '@/components/platform/InviteMemberModal';
import { useToast } from '@/hooks/use-toast';

const Profiles: React.FC = () => {
  const { user, organization } = useAuth();
  const { toast } = useToast();

  // Temporary switch until backend sends account type
  const [accountType, setAccountType] = React.useState<'organization' | 'individual'>(organization ? 'organization' : 'individual');
  const isIndividual = accountType === 'individual';

  const [orgName, setOrgName] = React.useState<string>(organization?.name || user?.name || '');
  const [address, setAddress] = React.useState<string>('');
  const [profitDesignation, setProfitDesignation] = React.useState<'Non Profit' | 'For Profit'>('Non Profit');
  const [savingProfile, setSavingProfile] = React.useState(false);

  const [members, setMembers] = React.useState<PlatformMember[]>([]);
  const [inviteOpen, setInviteOpen] = React.useState(false);

  const handleSaveProfile = async () => {
    setSavingProfile(true);
    try {
      toast({ title: 'Saved', description: `${isIndividual ? 'Individual' : 'Organization'} details updated.` });
    } finally {
      setSavingProfile(false);
    }
  };

  const handleInviteAdd = (member: PlatformMember) => {
    setMembers(prev => [...prev, member]);
    toast({ title: 'Member invited', description: `${member.firstName} ${member.lastName} has been added.` });
  };

  const updateMemberRole = (id: string, role: PlatformMemberRole) => {
    const target = members.find(m => m.id === id);
    setMembers(prev => prev.map(m => m.id === id ? { ...m, role } : m));
    if (target) {
      toast({
        title: 'Role updated',
        description: `New role ${role} was saved for ${target.firstName} ${target.lastName}.`,
      });
    }
  };

  const removeMember = (id: string) => {
    setMembers(prev => prev.filter(m => m.id !== id));
  };

  const getInitials = () => {
    const name = user?.name || '';
    const parts = name.trim().split(' ');
    return parts.slice(0, 2).map(p => p[0]?.toUpperCase() || '').join('');
  };

  return (
    <div className="container py-12">
        <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl font-semibold">Platform Profiles</h1>
            <div className="flex items-center gap-2">
              <Label className="text-sm">Account Type</Label>
              <Select value={accountType} onValueChange={(v) => setAccountType(v as 'organization' | 'individual')}>
                <SelectTrigger className="w-40 h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="organization">Organization</SelectItem>
                  <SelectItem value="individual">Individual</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Manage your account preferences and configuration</p>

          <Card>
            <CardHeader>
              <CardTitle>YouVersion Profile</CardTitle>
              <CardDescription>Edit your YouVersion login credentials on Bible.com</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-semibold">
                    {getInitials() || 'U'}
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">{user?.name || 'Name Last'}</div>
                    <div className="text-muted-foreground">{user?.email || 'name@host.com'}</div>
                  </div>
                </div>
                <Button asChild>
                  <a href="https://bible.com/profile" target="_blank" rel="noreferrer">Edit on Bible.com</a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{isIndividual ? 'Individual Profile' : 'Organization Profile'}</CardTitle>
              <CardDescription>
                {isIndividual ? 'Update your individual information and contact details' : "Update your organization's information and contact details"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="orgName">{isIndividual ? 'Full Name' : 'Organization Name'}</Label>
                  <Input id="orgName" value={orgName} onChange={(e) => setOrgName(e.target.value)} placeholder={isIndividual ? 'Your Name' : 'Organization Name'} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address Lookup</Label>
                  <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Search or enter address" />
                </div>

                <div className="space-y-2 max-w-sm">
                  <Label htmlFor="profit">Profit Designation</Label>
                  <Select value={profitDesignation} onValueChange={(v) => setProfitDesignation(v as any)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Non Profit">Non Profit</SelectItem>
                      <SelectItem value="For Profit">For Profit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleSaveProfile} disabled={savingProfile} className="mt-2 w-24">{savingProfile ? 'Saving...' : 'Save'}</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{isIndividual ? 'Individual Members' : 'Org Members'}</CardTitle>
              <CardDescription>
                {isIndividual ? 'Add others to your individual account to help with your YouVersion Platform applications.' : 'Add others to your organization to help with your YouVersion Platform applications.'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Button onClick={() => setInviteOpen(true)}>Invite New Member</Button>
              </div>

              {members.length === 0 ? (
                <div className="text-sm text-muted-foreground">No members have been added yet.</div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>First name</TableHead>
                        <TableHead>Last name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead className="text-right">Remove</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {members.map((m) => (
                        <TableRow key={m.id}>
                          <TableCell>{m.firstName}</TableCell>
                          <TableCell>{m.lastName}</TableCell>
                          <TableCell>{m.email}</TableCell>
                          <TableCell className="max-w-[160px]">
                            <Select value={m.role} onValueChange={(v) => updateMemberRole(m.id, v as PlatformMemberRole)}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Owner">Owner</SelectItem>
                                <SelectItem value="Developer">Developer</SelectItem>
                                <SelectItem value="Member">Member</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              size="sm"
                              variant="stroked"
                              className="border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                              onClick={() => removeMember(m.id)}
                            >
                              Remove
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

      <InviteMemberModal open={inviteOpen} onOpenChange={setInviteOpen} onAdd={handleInviteAdd} />
    </div>
  );
};

export default Profiles;


