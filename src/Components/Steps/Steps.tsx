import './Steps.scss'

export type objProperties = {
    id: number;
    title: string;
    text1: string;
    text2: string;
    rtl?: boolean;
    pic: string;
}
type StepPropsType = {
    stepProp: objProperties
}

const Steps = ({ stepProp }: StepPropsType) => {
  return (
    <div className={`${stepProp.rtl ? 'steps rtl' : 'steps'}`}>
        <div className="steps__left">
            <h2 className="steps__leftTitle">
                {stepProp.id}.{stepProp.title}
            </h2>
            <div className="steps__leftBody">
                <p>{stepProp.text1}</p> <br />
                <p>{stepProp.text2}</p>
            </div>
        </div>
        <div className="steps__right">
            {stepProp.pic ? (
                <img src={stepProp.pic} alt="pic" /> 
            ) : (
                null
            )}
        </div>
    </div>
  )
}

export default Steps