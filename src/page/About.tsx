import { Info, Mail, Globe } from 'lucide-react';

function About() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-indigo-100 rounded-full mb-4">
            <Info className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            เกี่ยวกับระบบโหวต
          </h1>
          <p className="text-gray-600">
            ระบบโหวตโครงการถูกพัฒนาขึ้นเพื่อรวบรวมความคิดเห็นและการมีส่วนร่วมในการตัดสินใจเลือกโครงการที่จะดำเนินการ
          </p>
        </div>

        <div className="space-y-6">
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">วิธีการใช้งาน</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>เลือกโครงการที่คุณสนใจโดยคลิกที่การ์ดโครงการ</li>
              <li>คุณสามารถโหวตได้เพียง 1 ครั้งต่อเซสชัน</li>
              <li>ดูผลโหวตได้ที่แท็บ "ผลโหวต"</li>
              <li>ดาวน์โหลดผลโหวตเป็นไฟล์ CSV ได้</li>
            </ul>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">ติดต่อเรา</h2>
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <Mail className="w-5 h-5 mr-2" />
                <span>support@example.com</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Globe className="w-5 h-5 mr-2" />
                <span>www.example.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;