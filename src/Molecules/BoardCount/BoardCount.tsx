import './BoardCount.scss';

type ProgressBarProp = {
    width?: number;
    backgroundColor: string;
    name: string; // progress bar name
    percent: number;
    border: string;
    opacity: number;
}

const BoardCount = ({ width, backgroundColor, name, percent, border, opacity }: ProgressBarProp) => {
  return (
    <div className="boardCount">
        {/* <div className="boardCount__header">
            <p>{name}</p>
        </div> */}
        <div className="boardCount__progressBar" style={{
            border: border,
            height: "inherit", 
            // background: "red",
        }}>
            <div className="boardCount__progressBarInner" 
                style={{
                    width: `${percent}%`, 
                    backgroundColor,
                    opacity: `${opacity}%`,
                    // border: "1px solid red",
                    // marginLeft: "40px"
                    // height: "100%"
                }}
            >
                <div>
                    {/* <p>350 Registered {name} Members</p> */}
                </div>
            </div>
        </div>
    </div>
  )
}

export default BoardCount