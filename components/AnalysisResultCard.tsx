import React from 'react';
import { ShieldCheck, ShieldAlert, CircleHelp, Flag, Lightbulb, BarChart } from 'lucide-react';

const getVerdictStyles = (verdict) => {
  switch (verdict) {
    case 'Likely Real News':
      return {
        bgColor: 'bg-green-500/10',
        borderColor: 'border-green-500/50',
        textColor: 'text-green-400',
        icon: <ShieldCheck className="h-8 w-8 text-green-400" />,
      };
    case 'Likely Fake News':
      return {
        bgColor: 'bg-red-500/10',
        borderColor: 'border-red-500/50',
        textColor: 'text-red-400',
        icon: <ShieldAlert className="h-8 w-8 text-red-400" />,
      };
    case 'Uncertain':
    default:
      return {
        bgColor: 'bg-yellow-500/10',
        borderColor: 'border-yellow-500/50',
        textColor: 'text-yellow-400',
        icon: <CircleHelp className="h-8 w-8 text-yellow-400" />,
      };
  }
};

const AnalysisResultCard = ({ result }) => {
  const { verdict, confidence, explanation, red_flags } = result;
  const styles = getVerdictStyles(verdict);

  return (
    <div className={`rounded-2xl shadow-2xl p-6 md:p-8 border ${styles.borderColor} ${styles.bgColor} animate-fade-in`}>
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-4">
          {styles.icon}
          <h2 className={`text-2xl font-bold ${styles.textColor}`}>{verdict}</h2>
        </div>
        <div className="flex items-center gap-3 text-lg font-semibold text-gray-300">
            <BarChart className="h-6 w-6 text-gray-400"/>
            Confidence: <span className={styles.textColor}>{confidence.toFixed(0)}%</span>
        </div>
      </div>

      <div className="space-y-6">
       {/* <div>
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-200">
            <Lightbulb className="h-6 w-6 text-blue-400"/>
            Analysis Explanation
          </h3>
          <div className="bg-gray-900/60 p-4 rounded-lg border border-gray-700">
            <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{explanation}</p>
          </div>
        </div>*/}

        {red_flags && red_flags.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-200">
                <Flag className="h-6 w-6 text-red-400"/>
                Potential Red Flags
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {red_flags.map((flag, index) => (
                <li key={index} className="bg-red-900/30 text-red-300 py-2 px-4 rounded-full text-center text-sm font-medium">
                  {flag}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
       <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.5s ease-out forwards;
          }
        `}</style>
    </div>
  );
};

export default AnalysisResultCard;