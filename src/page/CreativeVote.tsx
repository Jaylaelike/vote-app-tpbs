import { useState, useEffect } from "react";
import { BarChart3, Download } from "lucide-react";
import VotingCard from "../components/VoteCard";
import { socket } from "../socket";
import { type Project } from "../type";

function CreativeVote() {
  const [hasVoted, setHasVoted] = useState(false);
  const [totalVotes, setTotalVotes] = useState(0);
  const [votingData, setVotingData] = useState<Record<string, number>>({});

  useEffect(() => {
    socket.on("receive-vote", (data) => {
      updatePolls(data);
    });

    socket.on("update", (data) => {
      updatePolls(data);
    });

    return () => {
      socket.off("receive-vote");
      socket.off("update");
    };
  }, []);

  const updatePolls = (data: {
    votingPolls: Record<string, number>;
    totalVotes: number;
  }) => {
    setVotingData(data.votingPolls);
    setTotalVotes(data.totalVotes);
  };

  const handleVote = (id: string) => {
    if (hasVoted) return;
    socket.emit("send-vote", id);
    setHasVoted(true);
  };

  const exportToCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Project,Votes,Percentage\n";

    projects.forEach((project) => {
      const votes = votingData[project.id] || 0;
      const percentage = totalVotes
        ? Math.round((votes / totalVotes) * 100)
        : 0;
      csvContent += `"${project.title}",${votes},${percentage}%\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "voting_results.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const projects: Project[] = [
    {
      id: "html",
      title: "อุปกรณ์ต้นแบบวัดค่ากำลังส่งสถานีเสริม",
    },
    {
      id: "css",
      title: "อุปกรณ์ควบคุมไฟเตือนสิ่งกีดขวางบนสิ่งปลูกสร้างและอาคารสูง",
    },
    {
      id: "javascript",
      title: "ระบบควบคุมเครื่องปรับอากาศระยะไกล",
    },
    {
      id: "react",
      title: "ผู้ช่วยเเจ้งเตือนอัจฉริยะ (Voice Notification Assistant )",
    },
    {
      id: "python",
      title: "Temperature Control System for BUC",
    },
    {
      id: "nodejs",
      title: "โครงการ PM 2.5 ",
    },
    {
      id: "express",
      title:
        "การฟื้นฟูแบตเตอรี่เก่าของเครื่องสำรองไฟฟ้าด้วยวิธีพัลส์กระแสร่วมกับการจัดเรียงคู่แบบขนาน",
    },
    {
      id: "mongodb",
      title: "ศึกษาความเป็นไปได้ โครงการ Radio Recoder System",
    },
    {
      id: "sql",
      title: "ระบบรับรู้ความพร้อมใช้งานของสัญญาณดาวเทียมนำร่องทั่วโลก",
    },
    {
      id: "php",
      title: "Smart Plung",
    },
    {
      id: "laravel",
      title:
        "โครงการเครื่องมอนิเตอร์การชาร์จแบตเตอรี่ 24 Volt (24 Volt Battery Charge Analyzer)",
    },
    {
      id: "ruby",
      title: "เครื่องวัดอุณหภูมิเครื่อง Combiner ",
    },
    {
      id: "rails",
      title: "DSE7320 to LAN",
    },
    {
      id: "django",
      title: "IRD Reboot box",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          โหวตโครงการยอดนิยม
        </h1>
        <div className="flex items-center justify-center gap-4 text-gray-600">
          <BarChart3 className="w-5 h-5" />
          <p className="text-xl">
            คะแนนโหวตทั้งหมด:{" "}
            <span className="font-semibold">{totalVotes}</span>
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <VotingCard
            key={project.id}
            project={project}
            votes={votingData[project.id] || 0}
            totalVotes={totalVotes}
            onVote={() => handleVote(project.id)}
            hasVoted={hasVoted}
          />
        ))}
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={exportToCSV}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm transition-colors duration-200"
        >
          <Download className="w-5 h-5 mr-2" />
          Export to CSV
        </button>
      </div>
    </div>
  );
}

export default CreativeVote;
