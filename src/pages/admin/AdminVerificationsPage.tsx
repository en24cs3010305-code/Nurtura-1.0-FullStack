import React, { useState, useEffect } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { PageHeader } from '../../components/common/PageHeader';
import { adminService } from '../../services/adminService';
import { User, DoctorVerificationStatus } from '../../types';
import { ShieldCheck, CheckCircle2, XCircle, FileText, AlertCircle, ExternalLink } from 'lucide-react';

export const AdminVerificationsPage: React.FC = () => {
  const [doctors, setDoctors] = useState<User[]>([]);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const loadDoctors = async () => {
    const allUsers = await adminService.getAllUsers();
    setDoctors(allUsers.filter((u) => u.role === 'doctor'));
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  const handleStatusChange = async (userId: string, status: DoctorVerificationStatus) => {
    await adminService.updateDoctorStatus(userId, status);
    setActionNotice(`Doctor application status updated to "${status.toUpperCase()}". Audit event logged.`);
    loadDoctors();
    setTimeout(() => setActionNotice(null), 4000);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Doctor Verification & Compliance"
        subtitle="Review medical board registration certificates, licenses, and hospital credentials"
      />

      {actionNotice && (
        <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-xs border border-emerald-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{actionNotice}</span>
        </div>
      )}

      <div className="space-y-4">
        {doctors.map((doc) => {
          const details = doc.doctorDetails;
          const status = details?.verificationStatus || 'pending';

          return (
            <Card key={doc.id} className="p-6 space-y-4 border-zinc-200">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={doc.avatar || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=256'}
                    alt={doc.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-zinc-200"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-heading font-bold text-zinc-900 dark:text-zinc-100">
                        {doc.name}
                      </h4>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                        status === 'pending' ? 'bg-amber-100 text-amber-800' :
                        status === 'rejected' ? 'bg-rose-100 text-rose-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500">
                      {details?.qualification} • {details?.specialization}
                    </p>
                    <p className="text-[11px] text-zinc-400 font-mono mt-0.5">
                      Registration No: {details?.registrationNumber} • {details?.yearsOfExperience} Yrs Exp
                    </p>
                  </div>
                </div>

                <div className="text-xs text-zinc-500 text-right">
                  <p>Applied: {doc.createdAt.split('T')[0]}</p>
                  <p className="text-[11px] text-zinc-400">{doc.email}</p>
                </div>
              </div>

              {/* Document verification block */}
              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-darkBg-surface border border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                    Uploaded Credential: {details?.documentName || 'medical_board_document.pdf'}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-600 cursor-pointer hover:underline flex items-center gap-1">
                  Preview Document <ExternalLink className="w-3 h-3" />
                </span>
              </div>

              {/* Admin Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-zinc-100 dark:border-darkBg-border text-xs">
                <span className="text-zinc-400">Hospital: {details?.clinicOrHospital}</span>

                <div className="flex items-center gap-2">
                  {status !== 'approved' && (
                    <Button
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                      onClick={() => handleStatusChange(doc.id, 'approved')}
                      leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
                    >
                      Approve Doctor
                    </Button>
                  )}
                  {status !== 'rejected' && (
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleStatusChange(doc.id, 'rejected')}
                      leftIcon={<XCircle className="w-3.5 h-3.5" />}
                    >
                      Reject Application
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleStatusChange(doc.id, 'documents_required')}
                  >
                    Request Documents
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
