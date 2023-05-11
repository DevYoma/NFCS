import './BoardCount.scss';

type ProgressBarProp = {
    width?: number;
    backgroundColor: string;
    teamName: string; // progress bar name
    teamNumber: number;
    percent: number;
    border?: string;
    opacity: number;
}

const BoardCount = ({ width, backgroundColor, teamName, teamNumber, percent, border, opacity }: ProgressBarProp) => {
  return (
    <div className="boardCount">
        <p className="boardCount__teamName">{teamName}: {teamNumber}</p>
        <div className="boardCount__progressBar" style={{
            border: border,
            height: "inherit", 
            background: "rgba(153, 153, 153, 0.1)"
        }}>
            <div className="boardCount__progressBarInner" 
                style={{
                    width: `${percent}%`, 
                    backgroundColor: `${backgroundColor}`,
                    // opacity: `${opacity}%`,
                }}
            >
            </div>
        </div>
    </div>
  )
}

export default BoardCount