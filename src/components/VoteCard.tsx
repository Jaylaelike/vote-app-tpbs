import { type FC } from 'react';
import { type Project } from '../type';

interface VotingCardProps {
  project: Project;
  votes: number;
  totalVotes: number;
  onVote: () => void;
  hasVoted: boolean;
}

const VotingCard: FC<VotingCardProps> = ({ project, votes, totalVotes, onVote, hasVoted }) => {
  const percentage = totalVotes ? Math.round((votes / totalVotes) * 100) : 0;

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg ${
        hasVoted ? 'cursor-default' : 'cursor-pointer hover:scale-[1.02]'
      }`}
      onClick={hasVoted ? undefined : onVote}
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{project.title}</h3>
      {project.budget && (
        <p className="text-sm text-gray-600 mb-3">
          งบประมาณโดยประมาณ: {project.budget}
        </p>
      )}
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
              {percentage}%
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-indigo-600">
              {votes} votes
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-100">
          <div
            style={{ width: `${percentage}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500 transition-all duration-500"
          />
        </div>
      </div>
    </div>
  );
};

export default VotingCard;