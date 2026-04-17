/**
 * Medi Queue — بيانات تجريبية (عربي)
 * عيادات، أطباء، مستخدمون للدخول التجريبي
 */

const clinicsData = [
  { id: 1, name: 'عيادة النخيل الطبية', address: 'الرياض — حي الملقا', phone: '0112345678' },
  { id: 2, name: 'مركز الوفاء الصحي', address: 'جدة — حي الزهراء', phone: '0123456789' },
  { id: 3, name: 'مجمع الشفاء الطبي', address: 'الدمام — الكورنيش', phone: '0134567890' },
];

const doctorsData = [
  {
    id: 1,
    name: 'د. خالد العتيبي',
    specialty: 'أمراض القلب',
    clinicId: 1,
    rating: 4.9,
    price: 200,
    currency: 'ر.س',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
    about:
      'استشاري أمراض قلب مع أكثر من 15 عاماً من الخبرة في تشخيص وعلاج أمراض الشرايين وضغط الدم وفشل القلب.',
    slots: ['09:00', '10:30', '13:00', '15:30'],
    userEmail: 'doctor@mediq.local',
  },
  {
    id: 2,
    name: 'د. نورة الشمري',
    specialty: 'الجلدية',
    clinicId: 2,
    rating: 4.8,
    price: 180,
    currency: 'ر.س',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
    about:
      'أخصائية جلدية تعنى بالأمراض الجلدية المزمنة والتجميل الدقيق، مع اهتمام بوقاية سرطان الجلد.',
    slots: ['09:30', '11:00', '14:00', '16:00'],
    userEmail: 'doctor2@mediq.local',
  },
  {
    id: 3,
    name: 'د. سارة القحطاني',
    specialty: 'طب الأطفال',
    clinicId: 1,
    rating: 4.7,
    price: 150,
    currency: 'ر.س',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
    about:
      'طبيبة أطفال تركز على النمو والتطور والتطعيمات ومتابعة الحالات المزمنة لدى الأطفال.',
    slots: ['08:30', '10:00', '12:30', '15:00'],
    userEmail: 'doctor3@mediq.local',
  },
  {
    id: 4,
    name: 'د. فيصل الدوسري',
    specialty: 'المخ والأعصاب',
    clinicId: 3,
    rating: 4.9,
    price: 250,
    currency: 'ر.س',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop',
    about:
      'استشاري أعصاب بخبرة في الصداع النصفي والصرع واضطرابات النوم والذاكرة.',
    slots: ['10:00', '11:30', '14:30', '16:30'],
    userEmail: 'doctor4@mediq.local',
  },
  {
    id: 5,
    name: 'د. هند المطيري',
    specialty: 'الباطنة',
    clinicId: 2,
    rating: 4.6,
    price: 160,
    currency: 'ر.س',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop',
    about:
      'طبيبة باطنية للكشف المبكر عن أمراض السكري والغدة الدرقية والجهاز الهضمي.',
    slots: ['08:00', '10:30', '13:30', '17:00'],
    userEmail: 'doctor5@mediq.local',
  },
];

const specialties = ['الكل', 'أمراض القلب', 'الجلدية', 'طب الأطفال', 'المخ والأعصاب', 'الباطنة'];

/** حسابات جاهزة للتجربة (كلمة المرور: 123456) */
const seedAccounts = [
  {
    id: 'u-patient-1',
    email: 'patient@mediq.local',
    password: '123456',
    name: 'محمد المريض',
    phone: '0500000001',
    role: 'patient',
  },
  {
    id: 'u-doctor-1',
    email: 'doctor@mediq.local',
    password: '123456',
    name: 'د. خالد العتيبي',
    phone: '0500000002',
    role: 'doctor',
    doctorId: 1,
  },
  {
    id: 'u-admin-1',
    email: 'admin@mediq.local',
    password: '123456',
    name: 'مدير النظام',
    phone: '0500000099',
    role: 'admin',
  },
];

function getClinicById(id) {
  return clinicsData.find((c) => c.id === id) || null;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { clinicsData, doctorsData, specialties, seedAccounts, getClinicById };
}
