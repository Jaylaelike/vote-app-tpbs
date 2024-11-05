// import { useState, useEffect } from 'react';
// import { BarChart3, Download } from 'lucide-react';
// import VotingCard from './components/VoteCard';
// import { socket } from './socket';
// import { type Project } from './type';

// function App() {
//   const [hasVoted, setHasVoted] = useState(false);
//   const [totalVotes, setTotalVotes] = useState(0);
//   const [votingData, setVotingData] = useState<Record<string, number>>({});

//   useEffect(() => {
//     socket.on('receive-vote', (data) => {
//       updatePolls(data);
//     });

//     socket.on('update', (data) => {
//       updatePolls(data);
//     });

//     return () => {
//       socket.off('receive-vote');
//       socket.off('update');
//     };
//   }, []);

//   const updatePolls = (data: { votingPolls: Record<string, number>; totalVotes: number }) => {
//     setVotingData(data.votingPolls);
//     setTotalVotes(data.totalVotes);
//   };

//   const handleVote = (id: string) => {
//     if (hasVoted) return;
//     socket.emit('send-vote', id);
//     setHasVoted(true);
//   };

//   const exportToCSV = () => {
//     let csvContent = "data:text/csv;charset=utf-8,";
//     csvContent += "Project,Votes,Percentage\n";

//     projects.forEach((project) => {
//       const votes = votingData[project.id] || 0;
//       const percentage = totalVotes ? Math.round((votes / totalVotes) * 100) : 0;
//       csvContent += `"${project.title}",${votes},${percentage}%\n`;
//     });

//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "voting_results.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const projects: Project[] = [
//     {
//       id: 'html',
//       title: 'อุปกรณ์ต้นแบบวัดค่ากำลังส่งสถานีเสริม',
//       budget: '9,000 บาท'
//     },
//     {
//       id: 'css',
//       title: 'อุปกรณ์ควบคุมไฟเตือนสิ่งกีดขวางบนสิ่งปลูกสร้างและอาคารสูง (Obstruction Lights)',
//     },
//     {
//       id: 'javascript',
//       title: 'เครื่องควบคุมระบบ Automatic Transfer Switches ระยะไกล และตรวจสอบเครื่องกำเนิดไฟฟ้า ปี ต่อเนื่อง 2566'
//     },
//     {
//       id: 'react',
//       title: 'LNB Protection Switch ปี 2566 ต่อเนื่อง 2567'
//     },
//     {
//       id: 'python',
//       title: 'ศึกษาความเป็นไปได้ โครงการ Radio Record System'
//     },
//     {
//       id: 'nodejs',
//       title: 'ระบบควบควบเครื่องปรับอากาศระยะไกล'
//     },
//     {
//       id: 'express',
//       title: 'โครงการศึกษาและทดสอบ การตรวจเช็คการออกอากาศ โดย Streaming สัญญาณภาพจากสถานีปลายทาง'
//     },
//     {
//       id: 'mongodb',
//       title: 'โครงการผู้ช่วยแจ้งเตือน ด้วยเสียง (Voice Notification Assistant)'
//     },
//     {
//       id: 'sql',
//       title: 'เครื่องจ่ายสัญญาณ 1 PPS (Distribution 1PPS signal) สำหรับเครื่องส่งสัญญาณโทรทัศน์ภาคพื้นดินในระบบดิจิตอล'
//     },
//     {
//       id: 'php',
//       title: 'โครงการ Dashbord Online'
//     },
//     {
//       id: 'laravel',
//       title: 'โครงการ Notification Sound System'
//     },
//     {
//       id: 'ruby',
//       title: 'โครงการ Temperature Control System for BUC'
//     },
//     {
//       id: 'rails',
//       title: 'โครงการ อุปกรณ์รวัดตรวจสอบอุณหภูมิของชุดคอมไบเนอร์'
//     },
//     {
//       id: 'django',
//       title: 'โครงการ PM 2.5'
//     },
//     {
//       id: 'flask',
//       title: 'ปลั๊กอัจฉริยะ'
//     },
//     {
//       id: 'docker',
//       title: 'ศึกษาความเป็นไปได้ของโครงการระบบรับรู้ความพร้อมใช้งานของสัญญาณดาวเทียมนําร่องทั่วโลก'
//     },
//     {
//       id: 'kubernetes',
//       title: 'โครงการจัดซื้อโปรแกรมออกแบบวงจรอิเล็กทรอนิกส์ Altium Designer'
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-5xl mx-auto">
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">
//             โหวตโครงการที่คุณชื่นชอบ
//           </h1>
//           <div className="flex items-center justify-center gap-4 text-gray-600">
//             <BarChart3 className="w-5 h-5" />
//             <p className="text-xl">
//               คะแนนโหวตทั้งหมด: <span className="font-semibold">{totalVotes}</span>
//             </p>
//           </div>
//         </div>

//         <div className="grid gap-6 md:grid-cols-2">
//           {projects.map((project) => (
//             <VotingCard
//               key={project.id}
//               project={project}
//               votes={votingData[project.id] || 0}
//               totalVotes={totalVotes}
//               onVote={() => handleVote(project.id)}
//               hasVoted={hasVoted}
//             />
//           ))}
//         </div>

//         <div className="mt-12 text-center">
//           <button
//             onClick={exportToCSV}
//             className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm transition-colors duration-200"
//           >
//             <Download className="w-5 h-5 mr-2" />
//             Export to CSV
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigating';
import CreativeVote from './page/CreativeVote';
import Results from './page/Results';
import About from './page/About';
import PopularVote from './page/PopularVote';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <Navigation />
        <div className="py-12 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<CreativeVote />} />
            <Route path="/vote2" element={<PopularVote />} />
            <Route path="/results" element={<Results />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;