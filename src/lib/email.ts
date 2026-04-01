function _p(): string {
  const c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let p = '';
  for (let i = 0; i < 8; i++) p += c.charAt(Math.floor(Math.random() * c.length));
  return p;
}

function _t(x: { firstName: string; middleName?: string; lastName: string; studentId: string; temporaryPassword: string }): string {
  const n = x.middleName ? `${x.firstName} ${x.middleName} ${x.lastName}` : `${x.firstName} ${x.lastName}`;
  return `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px"><div style="background:#8b1a2b;color:white;padding:20px;text-align:center;border-radius:8px 8px 0 0"><h1 style="margin:0">Faculty Evaluation System</h1><p style="margin:5px 0 0 0">Account Credentials</p></div><div style="background:#f9f9f9;padding:20px;border-radius:0 0 8px 8px"><p>Dear <strong>${n}</strong>,</p><p>Your account for the Faculty Evaluation System has been created. Here are your login credentials:</p><div style="background:white;padding:15px;border-radius:8px;margin:15px 0"><p><strong>Username/Student ID:</strong> ${x.studentId}</p><p><strong>Temporary Password:</strong> ${x.temporaryPassword}</p></div><p><strong>Important:</strong> You will be required to change your password upon first login.</p><p style="color:#666;font-size:12px;margin-top:20px">This is an automated message. Please do not reply to this email.</p></div></div>`;
}

async function _e(p: { to: string; subject: string; html: string }): Promise<{ success: boolean }> {
  console.log(`[MAIL] ${p.to} | ${p.subject}`);
  return { success: true };
}

export { _p as generateTemporaryPassword, _e as sendEmail, _t as getPreRegistrationEmailTemplate };
