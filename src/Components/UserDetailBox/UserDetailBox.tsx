import './UserDetailBox.scss';

type UserDetailBoxProp = {
    label: string;
    detail: string;
}

const UserDetailBox = ({ label, detail }: UserDetailBoxProp) => {
  return (
    <div className="userDetailBox">
      <p>{label}</p>
      <div className="userDetailBox__detail">{detail}</div>
    </div>
  )
}

export default UserDetailBox