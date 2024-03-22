import useFetchUserDetail from "../../hooks/useFetchUserDetail";
import "./UserDetails.scss";
import { useParams } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams();
    const { user, error, loading } = useFetchUserDetail(id);

    if (loading) {
    return <p>Loading...</p>;
    }

    if (error) {
    return <p>Error: {error}</p>;
    }

    return (
      <div className="userDetails">
        {user ? (
          <div>
            <h2>User Details</h2>
            <p>Name: {user.name}</p>{" "}
            <img src={user.img} alt={user.id} />
            {/* Assuming 'name' is a field in your user document */}
            {/* Render other user details */}
          </div>
        ) : (
          <p>User not found</p>
        )}
      </div>
    );

};

export default UserDetails;
