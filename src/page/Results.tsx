import { useEffect, useState } from "react";
import {  PieChart, Vote, ListChecks } from 'lucide-react';
import { socket } from "../socket";
import {socket_2} from "../socket_2";
import { type Project } from "../type";

function Results() {
    const [votingData, setVotingData] = useState<Record<string, number>>({});
    const [votingData2, setVotingData2] = useState<Record<string, number>>({});
    // const [totalVotes, setTotalVotes] = useState(0);
  
    useEffect(() => {
      const handleUpdate = (data: { votingPolls: Record<string, number>; totalVotes: number }) => {
        setVotingData(data.votingPolls);
        // setTotalVotes(data.totalVotes);
      };

      socket.on('receive-vote', handleUpdate);
      socket.on('update', handleUpdate);
  
      return () => {
        socket.off('receive-vote');
        socket.off('update');
      };
    }, []);


    useEffect(() => {
        const handleUpdate_2 = (data: { votingPolls_2: Record<string, number>; totalVotes_2: number }) => {
          setVotingData2(data.votingPolls_2);
        //   setTotalVotes(data.totalVotes_2);
        };

        socket_2.on('receive-vote', handleUpdate_2);
        socket_2.on('update', handleUpdate_2);
    
        return () => {
          socket_2.off('receive-vote');
          socket_2.off('update');
        };
      }, []);

  

    //getAllProjects
    const getTopProjects = (projectList: Project[]) => {
      return Object.entries(votingData)
        .map(([id, votes]) => [id, votes] as [string, number])
        .sort(([, votesA], [, votesB]) => votesB - votesA)
        .map(([id]) => {
          const project = projectList.find(p => p.id === id);
          return project ? [project.id, votingData[project.id]] : null;
        })
        .filter((project): project is [string, number] => project !== null);

    };

    const getTopProjects2 = (projectList: Project[]) => {
        return Object.entries(votingData2)
          .map(([id, votes]) => [id, votes] as [string, number])
          .sort(([, votesA], [, votesB]) => votesB - votesA)
          .map(([id]) => {
            const project = projectList.find(p => p.id === id);
            return project ? [project.id, votingData2[project.id]] : null;
          })
          .filter((project): project is [string, number] => project !== null);
  
      };
  
    const VotingSection = ({ title, icon: Icon, projects }: { title: string; icon: typeof Vote; projects: Project[] }) => {
      const topProjects = getTopProjects(projects);
      const sectionVotes = topProjects.reduce((sum, [, votes]) => sum + votes, 0);
  
      return (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <Icon className="w-6 h-6 mr-2 text-indigo-600" />
            {title}
            <span className="ml-auto text-base font-normal text-gray-600">
              {sectionVotes} votes
            </span>
          </h2>
          <div className="space-y-6">
            {topProjects.map(([id, votes], index) => {
              const percentage = sectionVotes ? Math.round((votes / sectionVotes) * 100) : 0;
              const project = projects.find(p => p.id === id);
              return (
                <div key={id} className="relative">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {index + 1}. {project?.title}
                    </span>
                    <span className="text-sm font-semibold text-indigo-600">
                      {votes} votes ({percentage}%)
                    </span>
                  </div>
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-4 bg-indigo-600 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  {project?.budget && (
                    <div className="mt-1 text-xs text-gray-500">
                      งบประมาณ: {project.budget}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );
    };


    const VotingSection2 = ({ title, icon: Icon, projects }: { title: string; icon: typeof Vote; projects: Project[] }) => {
      const topProjects = getTopProjects2(projects);
      const sectionVotes = topProjects.reduce((sum, [, votes]) => sum + votes, 0);
  
      return (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <Icon className="w-6 h-6 mr-2 text-indigo-600" />
            {title}
            <span className="ml-auto text-base font-normal text-gray-600">
              {sectionVotes} votes
            </span>
          </h2>
          <div className="space-y-6">
            {topProjects.map(([id, votes], index) => {
              const percentage = sectionVotes ? Math.round((votes / sectionVotes) * 100) : 0;
              const project = projects.find(p => p.id === id);
              return (
                <div key={id} className="relative">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {index + 1}. {project?.title}
                    </span>
                    <span className="text-sm font-semibold text-indigo-600">
                      {votes} votes ({percentage}%)
                    </span>
                  </div>
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-4 bg-indigo-600 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  {project?.budget && (
                    <div className="mt-1 text-xs text-gray-500">
                      งบประมาณ: {project.budget}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );
    };





  return (
    <div className="max-w-5xl mx-auto">
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        ผลการโหวตทั้งหมด
      </h1>
      <div className="flex items-center justify-center gap-4 text-gray-600">
        <PieChart className="w-5 h-5" />
        {/* <p className="text-xl">
          จำนวนโหวตทั้งหมด: <span className="font-semibold">{totalVotes}</span>
        </p> */}
      </div>
    </div>

    <VotingSection 
      title="โครงการยอดนิยม" 
      icon={Vote} 
      projects={projectsSection1} 
    />

    <VotingSection2
      title="โครงการความคิดสร้างสรรค์" 
      icon={ListChecks} 
      projects={projectsSection2} 
    />
  </div>
);

}

const projectsSection1: Project[] = [
  {
    id: "html",
    title: "อุปกรณ์ต้นแบบวัดค่ากำลังส่งสถานีเสริม",
  },
  {
    id: "css",
    title:
      "อุปกรณ์ควบคุมไฟเตือนสิ่งกีดขวางบนสิ่งปลูกสร้างและอาคารสูง (Obstruction Lights)",
  },
  {
    id: "javascript",
    title:
      "เครื่องควบคุมระบบ Automatic Transfer Switches ระยะไกล และตรวจสอบเครื่องกำเนิดไฟฟ้า ปี ต่อเนื่อง 2566",
  },
  {
    id: "react",
    title: "LNB Protection Switch ปี 2566 ต่อเนื่อง 2567",
  },
  {
    id: "python",
    title: "ศึกษาความเป็นไปได้ โครงการ Radio Record System",
  },
  {
    id: "nodejs",
    title: "ระบบควบควบเครื่องปรับอากาศระยะไกล",
  },
  {
    id: "express",
    title:
      "โครงการศึกษาและทดสอบ การตรวจเช็คการออกอากาศ โดย Streaming สัญญาณภาพจากสถานีปลายทาง",
  },
  {
    id: "mongodb",
    title: "โครงการผู้ช่วยแจ้งเตือน ด้วยเสียง (Voice Notification Assistant)",
  },
  {
    id: "sql",
    title:
      "เครื่องจ่ายสัญญาณ 1 PPS (Distribution 1PPS signal) สำหรับเครื่องส่งสัญญาณโทรทัศน์ภาคพื้นดินในระบบดิจิตอล",
  },
  {
    id: "php",
    title: "โครงการ Dashbord Online",
  },
  {
    id: "laravel",
    title: "โครงการ Notification Sound System",
  },
  {
    id: "ruby",
    title: "โครงการ Temperature Control System for BUC",
  },
  {
    id: "rails",
    title: "โครงการ อุปกรณ์รวัดตรวจสอบอุณหภูมิของชุดคอมไบเนอร์",
  },
  {
    id: "django",
    title: "โครงการ PM 2.5",
  },
  {
    id: "flask",
    title: "ปลั๊กอัจฉริยะ",
  },
  {
    id: "docker",
    title:
      "ศึกษาความเป็นไปได้ของโครงการระบบรับรู้ความพร้อมใช้งานของสัญญาณดาวเทียมนําร่องทั่วโลก",
  },
  {
    id: "kubernetes",
    title: "โครงการจัดซื้อโปรแกรมออกแบบวงจรอิเล็กทรอนิกส์ Altium Designer",
  },
];

const projectsSection2: Project[] = [
    {
      id: "html",
      title: "อุปกรณ์ต้นแบบวัดค่ากำลังส่งสถานีเสริม",
    },
    {
      id: "css",
      title:
        "อุปกรณ์ควบคุมไฟเตือนสิ่งกีดขวางบนสิ่งปลูกสร้างและอาคารสูง (Obstruction Lights)",
    },
    {
      id: "javascript",
      title:
        "เครื่องควบคุมระบบ Automatic Transfer Switches ระยะไกล และตรวจสอบเครื่องกำเนิดไฟฟ้า ปี ต่อเนื่อง 2566",
    },
    {
      id: "react",
      title: "LNB Protection Switch ปี 2566 ต่อเนื่อง 2567",
    },
    {
      id: "python",
      title: "ศึกษาความเป็นไปได้ โครงการ Radio Record System",
    },
    {
      id: "nodejs",
      title: "ระบบควบควบเครื่องปรับอากาศระยะไกล",
    },
    {
      id: "express",
      title:
        "โครงการศึกษาและทดสอบ การตรวจเช็คการออกอากาศ โดย Streaming สัญญาณภาพจากสถานีปลายทาง",
    },
    {
      id: "mongodb",
      title: "โครงการผู้ช่วยแจ้งเตือน ด้วยเสียง (Voice Notification Assistant)",
    },
    {
      id: "sql",
      title:
        "เครื่องจ่ายสัญญาณ 1 PPS (Distribution 1PPS signal) สำหรับเครื่องส่งสัญญาณโทรทัศน์ภาคพื้นดินในระบบดิจิตอล",
    },
    {
      id: "php",
      title: "โครงการ Dashbord Online",
    },
    {
      id: "laravel",
      title: "โครงการ Notification Sound System",
    },
    {
      id: "ruby",
      title: "โครงการ Temperature Control System for BUC",
    },
    {
      id: "rails",
      title: "โครงการ อุปกรณ์รวัดตรวจสอบอุณหภูมิของชุดคอมไบเนอร์",
    },
    {
      id: "django",
      title: "โครงการ PM 2.5",
    },
    {
      id: "flask",
      title: "ปลั๊กอัจฉริยะ",
    },
    {
      id: "docker",
      title:
        "ศึกษาความเป็นไปได้ของโครงการระบบรับรู้ความพร้อมใช้งานของสัญญาณดาวเทียมนําร่องทั่วโลก",
    },
    {
      id: "kubernetes",
      title: "โครงการจัดซื้อโปรแกรมออกแบบวงจรอิเล็กทรอนิกส์ Altium Designer",
    },
  ];
export default Results;
