import { createHash } from 'crypto';

type _O = Record<string, 'asc' | 'desc'>;
type _W = { [k: string]: any; NOT?: Record<string, any> };
type _F = { where?: _W; orderBy?: _O; include?: Record<string, boolean>; take?: number };

const _s = new Map<string, any[]>();
const _k = new Map<string, string>();
const _a = '0f8e2c4a6b1d9e7f3a5c8b2d4e6f0a1b';
const _v = '7c3d9e1f5a8b2c6d0e4f7a9b1c3d5e8f';

function _h(p: string): string {
  return createHash('sha256').update(p + _a).digest('hex').substring(0, 12);
}

function _r<T>(n: string): T[] {
  if (!_s.has(n)) _s.set(n, []);
  return _s.get(n)! as T[];
}

function _w<T>(n: string, d: T[]): void {
  _s.set(n, d);
  _k.set(n, _h(JSON.stringify(d)));
}

function _m(i: any, w: _W): boolean {
  for (const [k, v] of Object.entries(w)) {
    if (k === 'NOT') {
      if (typeof v === 'object' && v !== null) {
        for (const [nk, nv] of Object.entries(v)) { if (i[nk] === nv) return false; }
      }
      continue;
    }
    if (typeof v === 'object' && v !== null && v.in) {
      if (!v.in.includes(i[k])) return false;
    } else {
      if (i[k] !== v) return false;
    }
  }
  return true;
}

function _o(items: any[], ob?: _O): any[] {
  if (!ob) return items;
  const s = [...items];
  const e = Object.entries(ob);
  s.sort((a, b) => {
    for (const [f, d] of e) {
      const va = a[f], vb = b[f];
      if (va == null && vb == null) continue;
      if (va == null) return 1;
      if (vb == null) return -1;
      let c = 0;
      if (typeof va === 'string' && typeof vb === 'string') c = va.localeCompare(vb);
      else if (typeof va === 'number' && typeof vb === 'number') c = va - vb;
      else c = new Date(va).getTime() - new Date(vb).getTime();
      if (c !== 0) return d === 'desc' ? -c : c;
    }
    return 0;
  });
  return s;
}

function _i<T extends Record<string, any>>(items: T[], inc?: Record<string, boolean>): any[] {
  if (!inc) return items;
  return items.map(item => {
    const r = { ...item };
    for (const [rel, inc2] of Object.entries(inc)) {
      if (!inc2) continue;
      switch (rel) {
        case 'student': { const u = _r<any>('users').find(u => u.id === item.studentId); if (u) r.student = u; break; }
        case 'subject': { const s = _r<any>('subjects').find(s => s.id === item.subjectId); if (s) r.subject = s; break; }
        case 'faculty': { const f = _r<any>('faculties').find(f => f.id === item.facultyId || f.id === item.instructorId); if (f) r.faculty = f; break; }
        case 'instructor': { const f = _r<any>('faculties').find(f => f.id === item.instructorId); if (f) r.instructor = f; break; }
        case 'user': { const u = _r<any>('users').find(u => u.id === item.userId); if (u) r.user = u; break; }
      }
    }
    return r;
  });
}

function _g(): string {
  const t = Date.now().toString(36);
  const r = Math.random().toString(36).substring(2, 10);
  const c = (Math.random() * 10000 | 0).toString(36);
  return `${t}${r}${c}`;
}

function _c<T extends { id: string }>(n: string) {
  return Object.freeze({
    findMany(opts?: _F): any[] {
      let items = _r<T>(n) as any[];
      if (opts?.where) items = items.filter(i => _m(i, opts.where!));
      items = _o(items, opts?.orderBy);
      if (opts?.take) items = items.slice(0, opts.take);
      items = _i(items, opts?.include);
      return items;
    },
    findFirst(opts?: _F): T | null {
      let items = _r<T>(n) as any[];
      if (opts?.where) items = items.filter(i => _m(i, opts.where!));
      items = _o(items, opts?.orderBy);
      items = _i(items, opts?.include);
      return items.length > 0 ? items[0] : null;
    },
    findUnique(opts: { where: Record<string, any> }): T | null {
      const items = _r<T>(n) as any[];
      const found = items.find(item => {
        for (const [k, v] of Object.entries(opts.where)) { if (item[k] !== v) return false; }
        return true;
      });
      if (!found) return null;
      return opts.include ? _i([found], opts.include)[0] as T : found as T;
    },
    count(opts?: { where?: _W }): number {
      let items = _r<T>(n) as any[];
      if (opts?.where) items = items.filter(i => _m(i, opts.where!));
      return items.length;
    },
    create(opts: { data: any }): T {
      const items = _r<T>(n);
      const ni = {
        ...opts.data,
        id: opts.data.id || _g(),
        createdAt: opts.data.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as T;
      items.push(ni);
      _w(n, items);
      return ni;
    },
    update(opts: { where: { id: string }; data: any }): T | null {
      const items = _r<T>(n);
      const idx = items.findIndex((item: any) => item.id === opts.where.id);
      if (idx === -1) return null;
      items[idx] = { ...items[idx], ...opts.data, updatedAt: new Date().toISOString() };
      _w(n, items);
      return opts.include ? _i([items[idx]], opts.include)[0] as T : items[idx] as T;
    },
    updateMany(opts: { where?: _W; data: any }): number {
      const items = _r<T>(n);
      let c = 0;
      for (let i = 0; i < items.length; i++) {
        const item = items[i] as any;
        if (!opts.where || _m(item, opts.where)) {
          items[i] = { ...items[i], ...opts.data, updatedAt: new Date().toISOString() };
          c++;
        }
      }
      _w(n, items);
      return c;
    },
    delete(opts: { where: { id: string } }): T | null {
      const items = _r<T>(n);
      const idx = items.findIndex((item: any) => item.id === opts.where.id);
      if (idx === -1) return null;
      const del = items.splice(idx, 1)[0];
      _w(n, items);
      return del as T;
    },
    deleteMany(opts: { where?: _W }): number {
      let items = _r<T>(n);
      const orig = items.length;
      items = opts?.where ? items.filter(item => !_m(item, opts.where!)) : [];
      _w(n, items);
      return orig - items.length;
    },
  });
}

const _init = () => {
  const _u = _r<any>('users');
  if (_u.length === 0) {
    _u.push({
      id: _g(), username: 'admin', password: 'admin123', fullName: 'System Administrator',
      firstName: 'System', middleName: '', lastName: 'Administrator',
      email: 'admin@cnsc.edu.ph', role: 'admin', studentId: null, isFirstLogin: false,
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    });
    _w('users', _u);
  }
  const _t = _r<any>('settings');
  if (_t.length === 0) {
    _t.push({
      id: _g(), evaluationOpen: true, currentSemester: '1st Semester', currentSchoolYear: '2024-2025',
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    });
    _w('settings', _t);
  }
};

const _db = Object.freeze({
  user: _c('users'),
  faculty: _c('faculties'),
  subject: _c('subjects'),
  enrollment: _c('enrollments'),
  evaluation: _c('evaluations'),
  preRegisteredStudent: _c('preRegisteredStudents'),
  settings: _c('settings'),
});

_init();

export { _db as db };
